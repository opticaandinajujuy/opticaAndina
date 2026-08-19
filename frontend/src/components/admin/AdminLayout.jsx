import { Link, useNavigate } from 'react-router-dom';
import { LogOut, ExternalLink } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import { useAuthStore } from '../../store/useAuthStore.js';
import { confirmAction, toastSuccess } from '../../lib/toast.js';

function AdminLayout({ title, children }) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    const result = await confirmAction({
      title: '¿Cerrar sesión?',
      confirmButtonText: 'Cerrar sesión',
    });
    if (!result.isConfirmed) return;

    logout();
    toastSuccess('Sesión cerrada');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-sage-50/40">
      <header className="border-b border-sage-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <Link to="/admin" className="flex shrink-0 items-center gap-2">
            <Logo className="h-8 w-8 sm:h-9 sm:w-9" />
            <span className="hidden font-heading text-sm font-semibold text-sage-800 sm:inline">
              Panel admin
            </span>
          </Link>

          <nav className="flex min-w-0 flex-1 items-center gap-4 overflow-x-auto">
            <Link
              to="/admin/productos"
              className="shrink-0 font-heading text-sm font-medium text-sage-600 transition hover:text-sage-900"
            >
              Productos
            </Link>
            <Link
              to="/admin/consultas"
              className="shrink-0 font-heading text-sm font-medium text-sage-600 transition hover:text-sage-900"
            >
              Consultas
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium text-sage-500 transition hover:bg-sage-100 hover:text-sage-800 sm:px-3"
            >
              <ExternalLink size={15} /> <span className="hidden sm:inline">Ver sitio</span>
            </a>
            {user?.email && (
              <span className="hidden text-xs text-sage-400 lg:inline">{user.email}</span>
            )}
            <button
              onClick={handleLogout}
              aria-label="Cerrar sesión"
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium text-sage-500 transition hover:bg-sage-100 hover:text-sage-800 sm:px-3"
            >
              <LogOut size={15} /> <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {title && (
          <h1 className="mb-6 font-heading text-xl font-bold text-sage-900 sm:text-2xl">
            {title}
          </h1>
        )}
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
