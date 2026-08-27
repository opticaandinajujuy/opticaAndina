import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import QuoteTable from '../../components/admin/QuoteTable.jsx';
import QuoteEditForm from '../../components/admin/QuoteEditForm.jsx';
import { confirmAction, toastSuccess, toastError } from '../../lib/toast.js';
import {
  getQuotes,
  updateQuoteStatus,
  updateQuote,
  deleteQuote,
} from '../../services/quoteService.js';

function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');
  const [editingQuote, setEditingQuote] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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

  const handleEditSubmit = async (data) => {
    setSubmitting(true);
    try {
      const { data: updated } = await updateQuote(editingQuote._id, data);
      setQuotes((prev) => prev.map((q) => (q._id === updated._id ? updated : q)));
      setEditingQuote(null);
      toastSuccess('Consulta actualizada');
    } catch (error) {
      toastError('No pudimos guardar los cambios');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (quote) => {
    const result = await confirmAction({
      title: `¿Eliminar la consulta de "${quote.name}"?`,
      text: 'Esta acción no se puede deshacer.',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#c0392b',
    });
    if (!result.isConfirmed) return;

    try {
      await deleteQuote(quote._id);
      setQuotes((prev) => prev.filter((q) => q._id !== quote._id));
      toastSuccess('Consulta eliminada');
    } catch (error) {
      toastError('No pudimos eliminar la consulta');
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
                active ? 'border-sage-500 text-white' : 'border-sage-200 text-sage-600 hover:border-sage-400'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="quote-status-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-sage-500"
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
        <QuoteTable
          quotes={filtered}
          onToggleStatus={handleToggleStatus}
          onEdit={setEditingQuote}
          onDelete={handleDelete}
        />
      )}

      {editingQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-sage-900/40 p-3 backdrop-blur-sm sm:p-4">
          <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl bg-white shadow-xl">
            <div className="flex shrink-0 items-center justify-between border-b border-sage-100 px-5 py-4 sm:px-6">
              <h2 className="font-heading text-lg font-bold text-sage-900">Editar consulta</h2>
              <button
                onClick={() => setEditingQuote(null)}
                aria-label="Cerrar"
                className="rounded-full p-1.5 text-sage-400 hover:bg-sage-50 hover:text-sage-700"
              >
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-5 sm:px-6">
              <QuoteEditForm
                quote={editingQuote}
                onSubmit={handleEditSubmit}
                onCancel={() => setEditingQuote(null)}
                submitting={submitting}
              />
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminQuotes;
