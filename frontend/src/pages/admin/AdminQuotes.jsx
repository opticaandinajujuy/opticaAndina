import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import QuoteTable from '../../components/admin/QuoteTable.jsx';
import { confirmAction, toastSuccess, toastError } from '../../lib/toast.js';
import { getQuotes, updateQuoteStatus } from '../../services/quoteService.js';

function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const { data } = await getQuotes();
      setQuotes(data);
    } catch (error) {
      toastError('No pudimos cargar las consultas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const filtered = useMemo(() => {
    if (status === 'all') return quotes;
    return quotes.filter((q) => q.status === status);
  }, [quotes, status]);

  const handleToggleStatus = async (quote) => {
    const nextStatus = quote.status === 'attended' ? 'pending' : 'attended';

    const result = await confirmAction({
      title: nextStatus === 'attended' ? '¿Marcar como atendida?' : '¿Marcar como pendiente?',
      text: `Consulta de ${quote.name}.`,
      confirmButtonText: 'Confirmar',
      icon: 'question',
    });
    if (!result.isConfirmed) return;

    try {
      await updateQuoteStatus(quote._id, nextStatus);
      setQuotes((prev) =>
        prev.map((q) => (q._id === quote._id ? { ...q, status: nextStatus } : q))
      );
      toastSuccess('Estado actualizado');
    } catch (error) {
      toastError('No pudimos actualizar el estado');
    }
  };

  return (
    <AdminLayout title="Consultas y presupuestos">
      <div className="mb-5 flex gap-2">
        {[
          { value: 'all', label: 'Todas' },
          { value: 'pending', label: 'Pendientes' },
          { value: 'attended', label: 'Atendidas' },
        ].map((opt) => {
          const active = status === opt.value;
          return (
            <motion.button
              key={opt.value}
              onClick={() => setStatus(opt.value)}
              whileTap={{ scale: 0.95 }}
              className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active ? 'border-sage-700 text-white' : 'border-sage-200 text-sage-600 hover:border-sage-400'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="quote-status-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-sage-700"
                />
              )}
              <span className="relative">{opt.label}</span>
            </motion.button>
          );
        })}
      </div>

      {loading ? (
        <p className="py-12 text-center text-sm text-sage-500">Cargando consultas...</p>
      ) : (
        <QuoteTable quotes={filtered} onToggleStatus={handleToggleStatus} />
      )}
    </AdminLayout>
  );
}

export default AdminQuotes;
