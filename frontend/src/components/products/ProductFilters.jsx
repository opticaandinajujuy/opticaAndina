import { motion } from 'framer-motion';

const categories = [
  { value: 'sol', label: 'Anteojos para sol' },
  { value: 'contacto', label: 'Lentes de contacto' },
  { value: 'receta', label: 'Armazones para receta' },
  { value: 'accesorios', label: 'Accesorios para anteojos' },
  { value: 'liquidos_contacto', label: 'Líquidos para lentes de contacto' },
  { value: 'estuches_contacto', label: 'Estuches para lentes de contacto' },
  { value: 'outlet', label: 'Outlet' },
];

function ProductFilters({ value, onChange, layoutId = 'filter-pill' }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const active = value === cat.value;
        return (
          <motion.button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            whileTap={{ scale: 0.95 }}
            className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? 'border-sage-500 text-white'
                : 'border-sage-200 text-sage-600 hover:border-sage-400'
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-full bg-sage-500"
              />
            )}
            <span className="relative">{cat.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

export default ProductFilters;
