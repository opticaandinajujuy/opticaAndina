import { Pencil, Trash2, EyeOff, AlertTriangle } from 'lucide-react';
import { formatPrice } from '../../lib/utils.js';

const categoryLabels = {
  sol: 'Sol',
  contacto: 'Contacto',
  receta: 'Receta',
  accesorios: 'Accesorios',
  liquidos_contacto: 'Líquidos',
  estuches_contacto: 'Estuches',
};

const LOW_STOCK_THRESHOLD = 3;

function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-sage-200 py-12 text-center text-sm text-sage-500">
        No hay productos que coincidan con la búsqueda.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-sage-100">
      <table className="w-full text-left text-sm">
        <thead className="bg-sage-50 text-xs uppercase tracking-wide text-sage-500">
          <tr>
            <th className="px-4 py-3 font-medium">Producto</th>
            <th className="px-4 py-3 font-medium">Categoría</th>
            <th className="px-4 py-3 font-medium">Precio</th>
            <th className="px-4 py-3 font-medium">Stock</th>
            <th className="px-4 py-3 font-medium">Estado</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-sage-100">
          {products.map((product) => (
            <tr key={product._id} className="transition hover:bg-sage-50/60">
              <td className="flex items-center gap-3 px-4 py-3">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt=""
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-lg bg-sage-100" />
                )}
                <span className="font-medium text-sage-800">{product.name}</span>
              </td>
              <td className="px-4 py-3 text-sage-600">{categoryLabels[product.category]}</td>
              <td className="px-4 py-3 text-sage-600">
                {product.price ? formatPrice(product.price) : '—'}
              </td>
              <td className="px-4 py-3">
                <span className="text-sage-600">{product.stock ?? '—'}</span>
                {product.stock === 0 && (
                  <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
                    <AlertTriangle size={11} /> Sin stock
                  </span>
                )}
                {product.stock > 0 && product.stock <= LOW_STOCK_THRESHOLD && (
                  <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-mustard-100 px-2 py-0.5 text-xs font-medium text-mustard-700">
                    <AlertTriangle size={11} /> Poco stock
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                {product.active ? (
                  <span className="rounded-full bg-sage-100 px-2.5 py-1 text-xs font-medium text-sage-700">
                    Activo
                  </span>
                ) : (
                  <span className="flex w-fit items-center gap-1 rounded-full bg-sage-50 px-2.5 py-1 text-xs font-medium text-sage-400">
                    <EyeOff size={12} /> Oculto
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    aria-label="Editar"
                    className="rounded-lg p-2 text-sage-500 transition hover:bg-sage-100 hover:text-sage-800"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(product)}
                    aria-label="Eliminar"
                    className="rounded-lg p-2 text-sage-500 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
