import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Glasses, MessageSquareText, ArrowRight } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import { getProducts } from '../../services/productService.js';
import { getQuotes } from '../../services/quoteService.js';

function AdminDashboard() {
  const [productCount, setProductCount] = useState(null);
  const [pendingCount, setPendingCount] = useState(null);

  useEffect(() => {
    getProducts({ limit: 1 })
      .then(({ data }) => setProductCount(data.total))
      .catch(() => {});
    getQuotes({ status: 'pending' })
      .then(({ data }) => setPendingCount(data.length))
      .catch(() => {});
  }, []);

  const cards = [
    {
      to: '/admin/productos',
      icon: Glasses,
      iconBg: 'bg-mustard-100 text-mustard-600',
      title: 'Productos',
      description: 'Crear, editar y ocultar productos del catálogo',
      count: productCount,
      countLabel: 'en el catálogo',
    },
    {
      to: '/admin/consultas',
      icon: MessageSquareText,
      iconBg: 'bg-sage-100 text-sage-700',
      title: 'Consultas',
      description: 'Ver presupuestos y marcar consultas atendidas',
      count: pendingCount,
      countLabel: 'pendientes',
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mustard-600">
          Bienvenida
        </span>
        <h1 className="mt-1 font-heading text-2xl font-bold text-sage-900 sm:text-3xl">
          Óptica Andina
        </h1>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {cards.map(({ to, icon: Icon, iconBg, title, description, count, countLabel }) => (
          <motion.div key={to} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
            <Link
              to={to}
              className="group flex h-full flex-col justify-between rounded-2xl border border-sage-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-sage-900/5"
            >
              <div className="flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}>
                  <Icon size={22} />
                </div>
                <ArrowRight
                  size={18}
                  className="text-sage-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-sage-500"
                />
              </div>

              <div className="mt-6">
                <p className="font-heading text-base font-semibold text-sage-900">{title}</p>
                <p className="mt-1 text-sm text-sage-500">{description}</p>
              </div>

              <div className="mt-5 border-t border-sage-100 pt-4">
                <span className="font-heading text-2xl font-bold text-sage-900">
                  {count === null ? '—' : count}
                </span>
                <span className="ml-1.5 text-xs text-sage-400">{countLabel}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
