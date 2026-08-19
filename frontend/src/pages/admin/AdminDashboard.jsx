import { Link } from 'react-router-dom';
import { Glasses, MessageSquareText } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout.jsx';

function AdminDashboard() {
  return (
    <AdminLayout title="Bienvenida">
      <div className="flex flex-wrap gap-4">
        <Link
          to="/admin/productos"
          className="flex w-full max-w-xs items-center gap-4 rounded-2xl border border-sage-100 bg-white p-6 shadow-sm transition hover:border-sage-300 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mustard-100 text-mustard-600">
            <Glasses size={22} />
          </div>
          <div>
            <p className="font-heading text-sm font-semibold text-sage-800">Productos</p>
            <p className="text-xs text-sage-500">Crear, editar y ocultar productos del catálogo</p>
          </div>
        </Link>

        <Link
          to="/admin/consultas"
          className="flex w-full max-w-xs items-center gap-4 rounded-2xl border border-sage-100 bg-white p-6 shadow-sm transition hover:border-sage-300 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage-100 text-sage-700">
            <MessageSquareText size={22} />
          </div>
          <div>
            <p className="font-heading text-sm font-semibold text-sage-800">Consultas</p>
            <p className="text-xs text-sage-500">Ver presupuestos y marcar consultas atendidas</p>
          </div>
        </Link>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
