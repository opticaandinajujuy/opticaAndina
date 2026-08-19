import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { Plus, Search, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import ProductTable from '../../components/admin/ProductTable.jsx';
import ProductForm from '../../components/admin/ProductForm.jsx';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../services/productService.js';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await getProducts();
      setProducts(data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'No pudimos cargar los productos',
        confirmButtonColor: '#4f6b58',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === 'all' || p.category === category;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  const openCreate = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, data);
      } else {
        await createProduct(data);
      }
      await fetchProducts();
      closeForm();
      Swal.fire({
        icon: 'success',
        title: editingProduct ? 'Producto actualizado' : 'Producto creado',
        confirmButtonColor: '#4f6b58',
        timer: 1600,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'No pudimos guardar el producto',
        text: error.response?.data?.message,
        confirmButtonColor: '#4f6b58',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (product) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: `¿Eliminar "${product.name}"?`,
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#c0392b',
      cancelButtonColor: '#4f6b58',
    });

    if (!result.isConfirmed) return;

    try {
      await deleteProduct(product._id);
      await fetchProducts();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'No pudimos eliminar el producto',
        confirmButtonColor: '#4f6b58',
      });
    }
  };

  return (
    <AdminLayout title="Productos">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-sage-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar producto..."
              className="pl-9"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-sage-200 bg-white px-4 py-2.5 text-sm focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
          >
            <option value="all">Todas las categorías</option>
            <option value="sol">Sol</option>
            <option value="contacto">Contacto</option>
            <option value="receta">Receta</option>
          </select>
        </div>

        <Button onClick={openCreate} className="flex items-center gap-1.5">
          <Plus size={16} /> Nuevo producto
        </Button>
      </div>

      {loading ? (
        <p className="py-12 text-center text-sm text-sage-500">Cargando productos...</p>
      ) : (
        <ProductTable products={filtered} onEdit={openEdit} onDelete={handleDelete} />
      )}

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-sage-900/40 p-4 backdrop-blur-sm md:items-center">
          <div className="my-8 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold text-sage-900">
                {editingProduct ? 'Editar producto' : 'Nuevo producto'}
              </h2>
              <button
                onClick={closeForm}
                aria-label="Cerrar"
                className="rounded-full p-1.5 text-sage-400 hover:bg-sage-50 hover:text-sage-700"
              >
                <X size={18} />
              </button>
            </div>
            <ProductForm
              product={editingProduct}
              onSubmit={handleSubmit}
              onCancel={closeForm}
              submitting={submitting}
            />
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminProducts;
