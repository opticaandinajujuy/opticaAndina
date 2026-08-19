import { Search } from 'lucide-react';

function ProductSearch({ value, onChange }) {
  return (
    <div className="relative w-full max-w-xs">
      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sage-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar por nombre..."
        className="w-full rounded-full border border-sage-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
      />
    </div>
  );
}

export default ProductSearch;
