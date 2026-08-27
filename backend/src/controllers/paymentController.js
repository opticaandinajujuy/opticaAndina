const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const Product = require('../models/Product');
const Order = require('../models/Order');

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

async function createPreference(req, res, next) {
  try {
    const { productId, quantity, buyerName, buyerPhone } = req.body;

    const product = await Product.findById(productId);
    if (!product || !product.active) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    if (!product.price || product.price <= 0) {
      return res.status(400).json({ message: 'Este producto no tiene precio configurado' });
    }

    const qty = Number.isInteger(quantity) && quantity > 0 ? quantity : 1;

    if (product.stock < qty) {
      return res.status(400).json({ message: 'No hay stock suficiente para esta compra' });
    }
    const frontendUrl = process.env.FRONTEND_URL;
    const backendUrl = process.env.BACKEND_URL;
    // Mercado Pago rechaza auto_return/notification_url cuando apuntan a localhost
    // (no puede validarlas ni notificarlas) — solo se envían en producción (https).
    const isPublicUrl = frontendUrl?.startsWith('https://');

    const order = await Order.create({
      product: product._id,
      productName: product.name,
      quantity: qty,
      unitPrice: product.price,
      total: product.price * qty,
      payerName: buyerName,
      payerPhone: buyerPhone,
    });

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [
          {
            id: String(product._id),
            title: product.name,
            quantity: qty,
            unit_price: product.price,
            currency_id: 'ARS',
            picture_url: product.images?.[0],
          },
        ],
        back_urls: {
          success: `${frontendUrl}/pago/exito`,
          failure: `${frontendUrl}/pago/error`,
          pending: `${frontendUrl}/pago/pendiente`,
        },
        payer: {
          name: buyerName,
          phone: { number: buyerPhone },
        },
        ...(isPublicUrl && { auto_return: 'approved' }),
        ...(backendUrl?.startsWith('https://') && {
          notification_url: `${backendUrl}/api/payments/webhook`,
        }),
        external_reference: String(order._id),
      },
    });

    order.mpPreferenceId = result.id;
    await order.save();

    res.json({ initPoint: result.init_point });
  } catch (error) {
    next(error);
  }
}

async function handleWebhook(req, res, next) {
  try {
    const topic = req.query.type || req.query.topic || req.body?.type;
    const paymentId = req.query['data.id'] || req.body?.data?.id;

    if (topic !== 'payment' || !paymentId) {
      return res.sendStatus(200);
    }

    const payment = new Payment(client);
    const result = await payment.get({ id: paymentId });

    const order = await Order.findById(result.external_reference);
    if (order) {
      const wasApproved = order.status === 'approved';

      order.status = result.status;
      order.mpPaymentId = String(result.id);
      // no pisa nombre/teléfono ya cargados por el comprador con datos vacíos
      // que a veces devuelve Mercado Pago según el medio de pago usado
      const mpName = [result.payer?.first_name, result.payer?.last_name].filter(Boolean).join(' ');
      const mpPhone = [result.payer?.phone?.area_code, result.payer?.phone?.number]
        .filter(Boolean)
        .join(' ');
      if (mpName) order.payerName = mpName;
      if (result.payer?.email) order.payerEmail = result.payer.email;
      if (mpPhone) order.payerPhone = mpPhone;
      await order.save();

      // descuenta stock una sola vez, cuando el pago pasa a aprobado por primera vez
      // (Mercado Pago puede reenviar el mismo webhook más de una vez). El $gte hace
      // que la resta sea atómica: si dos compras del último producto se aprueban casi
      // al mismo tiempo, la segunda no puede dejar el stock en negativo — en ese caso
      // se marca el pedido como "oversold" para que se resuelva a mano.
      if (order.status === 'approved' && !wasApproved) {
        const updated = await Product.updateOne(
          { _id: order.product, stock: { $gte: order.quantity } },
          { $inc: { stock: -order.quantity } }
        );
        if (updated.modifiedCount === 0) {
          order.oversold = true;
          await order.save();
        }
      }
    }

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

module.exports = { createPreference, handleWebhook };
