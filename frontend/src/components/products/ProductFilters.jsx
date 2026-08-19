const categories = [
  { value: 'all', label: 'Todos' },
  { value: 'sol', label: 'Lentes de sol' },
  { value: 'contacto', label: 'Lentes de contacto' },
  { value: 'receta', label: 'Lentes recetados' },
];

function ProductFilters({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
            value === cat.value
              ? 'border-sage-700 bg-sage-700 text-white'
              : 'border-sage-200 text-sage-600 hover:border-sage-400'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export default ProductFilters;
