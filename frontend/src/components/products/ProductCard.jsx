import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, CreditCard } from 'lucide-react';
import { formatPrice } from '../../lib/utils.js';
import { buildProductInquiryLink } from '../../lib/whatsapp.js';
import { optimizedImage } from '../../lib/cloudinaryTransform.js';
import { createPaymentPreference } from '../../services/paymentService.js';
import { toastError } from '../../lib/toast.js';
import BuyerInfoModal from './BuyerInfoModal.jsx';

const categoryLabels = {
  sol: 'Lentes de sol',
  contacto: 'Lentes de contacto',
  receta: 'Lentes recetados',
  accesorios: 'Accesorios para anteojos',
};

function ProductCard({ product }) {
  const [buying, setBuying] = useState(false);
  const [showBuyerModal, setShowBuyerModal] = useState(false);

  const openBuyerModal = (e) => {
    e.preventDefault();
    setShowBuyerModal(true);
  };

  const handleBuy = async ({ buyerName, buyerPhone }) => {
    setBuying(true);
    try {
      const { data } = await createPaymentPreference(product._id, buyerName, buyerPhone);
      window.location.href = data.initPoint;
    } catch (error) {
      toastError(
        error.response?.data?.message || 'No pudimos iniciar el pago, probá de nuevo.'
      );
      setBuying(false);
    }
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-sage-100 bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-sage-900/10"
    >
      <Link to={`/productos/${product._id}`} className="block overflow-hidden bg-white">
        <div className="aspect-square w-full overflow-hidden">
          {product.images?.[0] ? (
            <img
              src={optimizedImage(product.images[0], 500)}
              alt={product.name}
              loading="lazy"
              className={`h-full w-full transition duration-500 ease-out group-hover:scale-105 ${
                product.category === 'contacto' ? 'object-contain p-4' : 'object-cover'
              }`}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sage-300">
              Sin imagen
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-mustard-600">
          {categoryLabels[product.category]}
        </span>
        <Link to={`/productos/${product._id}`}>
          <h3 className="line-clamp-2 font-heading text-sm font-semibold text-sage-900">
            {product.name}
          </h3>
        </Link>
        {product.price ? (
          <p className="font-heading text-base font-bold text-sage-800">
            {formatPrice(product.price)}
          </p>
        ) : (
          <p className="text-xs text-sage-400">Consultar precio</p>
        )}

        <div className="mt-auto flex flex-col gap-1.5">
          {product.price && product.stock > 0 && (
            <motion.button
              type="button"
              onClick={openBuyerModal}
              disabled={buying}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center justify-center gap-1.5 rounded-full bg-sage-700 py-2 text-xs font-semibold text-bone transition-colors hover:bg-sage-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CreditCard size={14} /> {buying ? 'Redirigiendo...' : 'Comprar'}
            </motion.button>
          )}
          {product.price && product.stock === 0 && (
            <span className="flex items-center justify-center rounded-full bg-sage-50 py-2 text-xs font-semibold text-sage-400">
              Sin stock
            </span>
          )}
          <motion.a
            href={buildProductInquiryLink(product.name)}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center gap-1.5 rounded-full border border-sage-200 py-2 text-xs font-semibold text-sage-700 transition-colors hover:border-sage-500 hover:bg-sage-50"
          >
            <MessageCircle size={14} /> Consultar
          </motion.a>
        </div>
      </div>

      {showBuyerModal && (
        <BuyerInfoModal
          onSubmit={handleBuy}
          onClose={() => setShowBuyerModal(false)}
          submitting={buying}
        />
      )}
    </motion.div>
  );
}

export default ProductCard;
