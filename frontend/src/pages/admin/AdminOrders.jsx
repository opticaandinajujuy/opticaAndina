import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle, Pencil, Trash2, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import OrderEditForm from '../../components/admin/OrderEditForm.jsx';
import { getOrders, updateOrder, deleteOrder } from '../../services/orderService.js';
import { confirmAction, toastSuccess, toastError } from '../../lib/toast.js';
import { formatPrice } from '../../lib/utils.js';
import { buildWhatsappLinkTo } from '../../lib/whatsapp.js';

const PAGE_SIZE = 10;

const statusFilters = [
  { value: 'all', label: 'Todos' },
  { value: 'pending', label: 'Pendientes' },
  { value: 'approved', label: 'Aprobados' },
  { value: 'in_process', label: 'En proceso' },
  { value: 'rejected', label: 'Rechazados' },
];

const statusBadge = {
  pending: 'bg-mustard-100 text-mustard-700',
  approved: 'bg-sage-100 text-sage-700',
  in_process: 'bg-mustard-100 text-mustard-700',
  rejected: 'bg-red-50 text-red-600',
  cancelled: 'bg-sage-100 text-sage-500',
};

const statusLabel = {
  pending: 'Pendiente',
  approved: 'Aprobado',
  in_process: 'En proceso',
  rejected: 'Rechazado',
  cancelled: 'Cancelado',
};

function formatDate(value) {
  return new Date(value).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [editingOrder, setEditingOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [status]);

  useEffect(() => {
    let active = true;
    setLoading(true);

    getOrders({ status, page, limit: PAGE_SIZE })
      .then(({ data }) => {
        if (!active) return;
        setOrders(data.items);
        setPages(data.pages);
        setTotal(data.total);
      })
      .catch(() => {
        if (active) toastError('No pudimos cargar los pedidos');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [status, page]);

  const handleEditSubmit = async (data) => {
    setSubmitting(true);
    try {
      const { data: updated } = await updateOrder(editingOrder._id, data);
      setOrders((prev) => prev.map((o) => (o._id === updated._id ? updated : o)));
      setEditingOrder(null);
      toastSuccess('Pedido actualizado');
    } catch (error) {
      toastError('No pudimos guardar los cambios');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (order) => {
    const result = await confirmAction({
      title: `¿Eliminar el pedido de "${order.productName}"?`,
      text: 'Esta acción no se puede deshacer.',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#c0392b',
    });
    if (!result.isConfirmed) return;

    try {
      await deleteOrder(order._id);
      setOrders((prev) => prev.filter((o) => o._id !== order._id));
      toastSuccess('Pedido eliminado');
    } catch (error) {
      toastError('No pudimos eliminar el pedido');
    }
  };

  return (
    <AdminLayout title="Pedidos">
      <div className="mb-5 flex flex-wrap gap-2">
        {statusFilters.map((opt) => {
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
                  layoutId="order-status-pill"
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
        <p className="py-12 text-center text-sm text-sage-500">Cargando pedidos...</p>
      ) : orders.length === 0 ? (
        <p className="rounded-xl border border-dashed border-sage-200 py-12 text-center text-sm text-sage-500">
          No hay pedidos que coincidan con el filtro.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-sage-100">
            <table className="w-full text-left text-sm">
              <thead className="bg-sage-50 text-xs uppercase tracking-wide text-sage-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Producto</th>
                  <th className="px-4 py-3 font-medium">Cantidad</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Comprador</th>
                  <th className="px-4 py-3 font-medium">Fecha</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3" />
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-100">
                {orders.map((order) => (
                  <tr key={order._id} className="align-top transition hover:bg-sage-50/60">
                    <td className="px-4 py-3 font-medium text-sage-800">{order.productName}</td>
                    <td className="px-4 py-3 text-sage-600">{order.quantity}</td>
                    <td className="px-4 py-3 font-medium text-sage-800">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-4 py-3 text-sage-600">
                      {order.payerName || order.payerEmail || order.payerPhone ? (
                        <>
                          <p>{order.payerName || 'Sin nombre'}</p>
                          <p className="text-xs text-sage-400">{order.payerEmail}</p>
                          {order.payerPhone && (
                            <p className="text-xs text-sage-400">{order.payerPhone}</p>
                          )}
                        </>
                      ) : (
                        <span className="text-xs text-sage-400">Sin datos aún</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-sage-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          statusBadge[order.status] || 'bg-sage-100 text-sage-700'
                        }`}
                      >
                        {statusLabel[order.status] || order.status}
                      </span>
                      {order.oversold && (
                        <span className="mt-1 flex w-fit items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
                          Sin stock real, resolver a mano
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {order.payerPhone && (
                        <a
                          href={buildWhatsappLinkTo(
                            order.payerPhone,
                            `Hola ${order.payerName || ''}! Te contacto por tu compra de "${order.productName}" para coordinar la entrega.`
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-sage-600 transition hover:bg-sage-100 hover:text-sage-900"
                        >
                          <MessageCircle size={14} /> WhatsApp
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingOrder(order)}
                          aria-label="Editar pedido"
                          className="rounded-lg p-2 text-sage-500 transition hover:bg-sage-100 hover:text-sage-800"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(order)}
                          aria-label="Eliminar pedido"
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

          {pages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-sage-200 text-sage-600 transition-colors hover:border-sage-400 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Página anterior"
              >
                <ChevronLeft size={16} />
              </motion.button>

              <span className="text-sm font-medium text-sage-600">
                Página {page} de {pages} · {total} pedidos
              </span>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                disabled={page === pages}
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-sage-200 text-sage-600 transition-colors hover:border-sage-400 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Página siguiente"
              >
                <ChevronRight size={16} />
              </motion.button>
            </div>
          )}
        </>
      )}

      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-sage-900/40 p-3 backdrop-blur-sm sm:p-4">
          <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl bg-white shadow-xl">
            <div className="flex shrink-0 items-center justify-between border-b border-sage-100 px-5 py-4 sm:px-6">
              <h2 className="font-heading text-lg font-bold text-sage-900">Editar pedido</h2>
              <button
                onClick={() => setEditingOrder(null)}
                aria-label="Cerrar"
                className="rounded-full p-1.5 text-sage-400 hover:bg-sage-50 hover:text-sage-700"
              >
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-5 sm:px-6">
              <OrderEditForm
                order={editingOrder}
                onSubmit={handleEditSubmit}
                onCancel={() => setEditingOrder(null)}
                submitting={submitting}
              />
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminOrders;
