import { useEffect, useState } from 'react';
import { Plus, X, Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import BrandForm from '../../components/admin/BrandForm.jsx';
import { confirmAction, toastSuccess, toastError } from '../../lib/toast.js';
import { getBrands, createBrand, updateBrand, deleteBrand } from '../../services/brandService.js';

function AdminBrands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBrand, setEditingBrand] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const { data } = await getBrands({ all: 'true' });
      setBrands(data);
    } catch (error) {
      toastError('No pudimos cargar las marcas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const openCreate = () => {
    setEditingBrand(null);
    setFormOpen(true);
  };

  const openEdit = (brand) => {
    setEditingBrand(brand);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingBrand(null);
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editingBrand) {
        await updateBrand(editingBrand._id, data);
      } else {
        await createBrand(data);
      }
      await fetchBrands();
      closeForm();
      toastSuccess(editingBrand ? 'Marca actualizada' : 'Marca agregada');
    } catch (error) {
      toastError(error.response?.data?.message || 'No pudimos guardar la marca');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (brand) => {
    const result = await confirmAction({
      title: `¿Eliminar "${brand.name || 'esta marca'}"?`,
      text: 'Esta acción no se puede deshacer.',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#c0392b',
    });
    if (!result.isConfirmed) return;

    try {
      await deleteBrand(brand._id);
      setBrands((prev) => prev.filter((b) => b._id !== brand._id));
      toastSuccess('Marca eliminada');
    } catch (error) {
      toastError('No pudimos eliminar la marca');
    }
  };

  const handleMove = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= brands.length) return;

    const current = brands[index];
    const target = brands[targetIndex];

    const reordered = [...brands];
    reordered[index] = target;
    reordered[targetIndex] = current;
    setBrands(reordered);

    try {
      await Promise.all([
        updateBrand(current._id, { order: targetIndex }),
        updateBrand(target._id, { order: index }),
      ]);
    } catch (error) {
      toastError('No pudimos cambiar el orden');
      fetchBrands();
    }
  };

  return (
    <AdminLayout title="Marcas">
      <div className="mb-5 flex justify-end">
        <button
          onClick={openCreate}
          className="flex items-center gap-1.5 rounded-full bg-sage-700 px-4 py-2.5 font-heading text-sm font-semibold text-bone transition hover:bg-sage-800"
        >
          <Plus size={16} /> Nueva marca
        </button>
      </div>

      {loading ? (
        <p className="py-12 text-center text-sm text-sage-500">Cargando marcas...</p>
      ) : brands.length === 0 ? (
        <p className="rounded-xl border border-dashed border-sage-200 py-12 text-center text-sm text-sage-500">
          Todavía no cargaste ninguna marca.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-sage-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-sage-50 text-xs uppercase tracking-wide text-sage-500">
              <tr>
                <th className="px-4 py-3 font-medium">Orden</th>
                <th className="px-4 py-3 font-medium">Logo</th>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-100">
              {brands.map((brand, index) => (
                <tr key={brand._id} className="transition hover:bg-sage-50/60">
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleMove(index, -1)}
                        disabled={index === 0}
                        aria-label="Subir"
                        className="rounded p-1 text-sage-500 hover:bg-sage-100 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        onClick={() => handleMove(index, 1)}
                        disabled={index === brands.length - 1}
                        aria-label="Bajar"
                        className="rounded p-1 text-sage-500 hover:bg-sage-100 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex h-12 w-20 items-center justify-center rounded-lg border border-sage-100 bg-white p-1">
                      <img src={brand.logoUrl} alt={brand.name} className="max-h-full max-w-full object-contain" />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-sage-800">{brand.name || '—'}</td>
                  <td className="px-4 py-3">
                    {brand.active ? (
                      <span className="rounded-full bg-sage-100 px-2.5 py-1 text-xs font-medium text-sage-700">
                        Visible
                      </span>
                    ) : (
                      <span className="rounded-full bg-sage-50 px-2.5 py-1 text-xs font-medium text-sage-400">
                        Oculta
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(brand)}
                        aria-label="Editar"
                        className="rounded-lg p-2 text-sage-500 transition hover:bg-sage-100 hover:text-sage-800"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(brand)}
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
      )}

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-sage-900/40 p-3 backdrop-blur-sm sm:p-4">
          <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl bg-white shadow-xl">
            <div className="flex shrink-0 items-center justify-between border-b border-sage-100 px-5 py-4 sm:px-6">
              <h2 className="font-heading text-lg font-bold text-sage-900">
                {editingBrand ? 'Editar marca' : 'Nueva marca'}
              </h2>
              <button
                onClick={closeForm}
                aria-label="Cerrar"
                className="rounded-full p-1.5 text-sage-400 hover:bg-sage-50 hover:text-sage-700"
              >
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-5 sm:px-6">
              <BrandForm
                brand={editingBrand}
                onSubmit={handleSubmit}
                onCancel={closeForm}
                submitting={submitting}
              />
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminBrands;
