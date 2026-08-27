const Order = require('../models/Order');
const Product = require('../models/Product');

async function getOrders(req, res, next) {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && status !== 'all') filter.status = status;

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(48, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Order.countDocuments(filter),
    ]);

    res.json({ items, total, page, pages: Math.ceil(total / limit) || 1 });
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  try {
    const { status, payerName, payerEmail, payerPhone } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });

    const wasApproved = order.status === 'approved';

    if (status) order.status = status;
    if (payerName !== undefined) order.payerName = payerName;
    if (payerEmail !== undefined) order.payerEmail = payerEmail;
    if (payerPhone !== undefined) order.payerPhone = payerPhone;

    // si se marca como aprobado a mano (ej: probando en local, donde el webhook
    // de Mercado Pago no puede avisar), descuenta el stock igual que el webhook
    if (order.status === 'approved' && !wasApproved) {
      const updated = await Product.updateOne(
        { _id: order.product, stock: { $gte: order.quantity } },
        { $inc: { stock: -order.quantity } }
      );
      order.oversold = updated.modifiedCount === 0;
    }

    await order.save();
    res.json(order);
  } catch (error) {
    next(error);
  }
}

async function deleteOrder(req, res, next) {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json({ message: 'Pedido eliminado' });
  } catch (error) {
    next(error);
  }
}

module.exports = { getOrders, updateOrder, deleteOrder };
