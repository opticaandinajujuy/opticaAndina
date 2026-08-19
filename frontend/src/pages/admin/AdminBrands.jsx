import { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import BrandTable from '../../components/admin/BrandTable.jsx';
import BrandForm from '../../components/admin/BrandForm.jsx';
import Button from '../../components/ui/Button.jsx';
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
      const { data } = await getBrands();
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
    if (editingBrand) {
      const result = await confirmAction({
        title: '¿Guardar los cambios?',
        text: `Se va a actualizar "${editingBrand.name}".`,
        confirmButtonText: 'Guardar cambios',
        icon: 'question',
      });
      if (!result.isConfirmed) return;
    }

    setSubmitting(true);
    try {
      if (editingBrand) {
        await updateBrand(editingBrand._id, data);
      } else {
        await createBrand(data);
      }
      await fetchBrands();
      closeForm();
      toastSuccess(editingBrand ? 'Marca actualizada' : 'Marca creada');
    } catch (error) {
      toastError(error.response?.data?.message || 'No pudimos guardar la marca');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (brand) => {
    const result = await confirmAction({
      title: `¿Eliminar "${brand.name}"?`,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#c0392b',
    });

    if (!result.isConfirmed) return;

    try {
      await deleteBrand(brand._id);
      await fetchBrands();
      toastSuccess('Marca eliminada');
    } catch (error) {
      toastError('No pudimos eliminar la marca');
    }
  };

  return (
    <AdminLayout title="Marcas">
      <div className="mb-5 flex justify-end">
        <Button onClick={openCreate} className="flex items-center gap-1.5">
          <Plus size={16} /> Nueva marca
        </Button>
      </div>

      {loading ? (
        <p className="py-12 text-center text-sm text-sage-500">Cargando marcas...</p>
      ) : (
        <BrandTable brands={brands} onEdit={openEdit} onDelete={handleDelete} />
      )}

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-sage-900/40 p-3 backdrop-blur-sm sm:p-4">
          <div className="flex max-h-[90vh] w-full max-w-md flex-col rounded-2xl bg-white shadow-xl">
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
