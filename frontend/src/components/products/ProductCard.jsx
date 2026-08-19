import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { formatPrice } from '../../lib/utils.js';
import { buildProductInquiryLink } from '../../lib/whatsapp.js';

const categoryLabels = {
  sol: 'Lentes de sol',
  contacto: 'Lentes de contacto',
  receta: 'Lentes recetados',
};

function ProductCard({ product }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-sage-100 bg-white transition hover:shadow-lg hover:shadow-sage-900/5"
    >
      <Link to={`/productos/${product._id}`} className="block overflow-hidden bg-sage-50">
        <div className="aspect-square w-full overflow-hidden">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
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
          <h3 className="font-heading text-sm font-semibold text-sage-900">{product.name}</h3>
        </Link>
        {product.price ? (
          <p className="font-heading text-base font-bold text-sage-800">
            {formatPrice(product.price)}
          </p>
        ) : (
          <p className="text-xs text-sage-400">Consultar precio</p>
        )}

        <a
          href={buildProductInquiryLink(product.name)}
          target="_blank"
          rel="noreferrer"
          className="mt-2 flex items-center justify-center gap-1.5 rounded-full border border-sage-200 py-2 text-xs font-semibold text-sage-700 transition hover:border-sage-500 hover:bg-sage-50"
        >
          <MessageCircle size={14} /> Consultar por WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

export default ProductCard;
