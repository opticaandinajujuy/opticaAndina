import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import QuoteTable from '../../components/admin/QuoteTable.jsx';
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
      Swal.fire({
        icon: 'error',
        title: 'No pudimos cargar las consultas',
        confirmButtonColor: '#4f6b58',
      });
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
    try {
      await updateQuoteStatus(quote._id, nextStatus);
      setQuotes((prev) =>
        prev.map((q) => (q._id === quote._id ? { ...q, status: nextStatus } : q))
      );
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'No pudimos actualizar el estado',
        confirmButtonColor: '#4f6b58',
      });
    }
  };

  return (
    <AdminLayout title="Consultas y presupuestos">
      <div className="mb-5 flex gap-2">
        {[
          { value: 'all', label: 'Todas' },
          { value: 'pending', label: 'Pendientes' },
          { value: 'attended', label: 'Atendidas' },
        ].map((opt) => (
          <button
            key={opt.value}
            onClick={() => setStatus(opt.value)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              status === opt.value
                ? 'border-sage-700 bg-sage-700 text-white'
                : 'border-sage-200 text-sage-600 hover:border-sage-400'
            }`}
          >
            {opt.label}
          </button>
        ))}
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
