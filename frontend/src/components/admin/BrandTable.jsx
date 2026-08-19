import { Pencil, Trash2, EyeOff } from 'lucide-react';

function BrandTable({ brands, onEdit, onDelete }) {
  if (brands.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-sage-200 py-12 text-center text-sm text-sage-500">
        Todavía no cargaste ninguna marca.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-sage-100">
      <table className="w-full text-left text-sm">
        <thead className="bg-sage-50 text-xs uppercase tracking-wide text-sage-500">
          <tr>
            <th className="px-4 py-3 font-medium">Marca</th>
            <th className="px-4 py-3 font-medium">Orden</th>
            <th className="px-4 py-3 font-medium">Estado</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-sage-100">
          {brands.map((brand) => (
            <tr key={brand._id} className="transition hover:bg-sage-50/60">
              <td className="flex items-center gap-3 px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-sage-100 bg-white">
                  <img src={brand.logo} alt="" className="h-8 w-8 object-contain" />
                </div>
                <span className="font-medium text-sage-800">{brand.name}</span>
              </td>
              <td className="px-4 py-3 text-sage-600">{brand.order}</td>
              <td className="px-4 py-3">
                {brand.active ? (
                  <span className="rounded-full bg-sage-100 px-2.5 py-1 text-xs font-medium text-sage-700">
                    Activa
                  </span>
                ) : (
                  <span className="flex w-fit items-center gap-1 rounded-full bg-sage-50 px-2.5 py-1 text-xs font-medium text-sage-400">
                    <EyeOff size={12} /> Oculta
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(brand)}
                    aria-label="Editar"
                    className="rounded-lg p-2 text-sage-500 transition hover:bg-sage-100 hover:text-sage-800"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(brand)}
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

export default BrandTable;
