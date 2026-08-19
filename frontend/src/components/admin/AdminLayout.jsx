import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import { useAuthStore } from '../../store/useAuthStore.js';

function AdminLayout({ title, children }) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-sage-50/40">
      <header className="border-b border-sage-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/admin" className="flex items-center gap-2">
            <Logo className="h-9 w-9" />
            <span className="font-heading text-sm font-semibold text-sage-800">
              Panel admin
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/admin/productos"
              className="font-heading text-sm font-medium text-sage-600 transition hover:text-sage-900"
            >
              Productos
            </Link>
            <Link
              to="/admin/consultas"
              className="font-heading text-sm font-medium text-sage-600 transition hover:text-sage-900"
            >
              Consultas
            </Link>
            {user?.email && (
              <span className="hidden text-xs text-sage-400 md:inline">{user.email}</span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-sage-500 transition hover:bg-sage-100 hover:text-sage-800"
            >
              <LogOut size={15} /> Salir
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {title && (
          <h1 className="mb-6 font-heading text-2xl font-bold text-sage-900">{title}</h1>
        )}
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
