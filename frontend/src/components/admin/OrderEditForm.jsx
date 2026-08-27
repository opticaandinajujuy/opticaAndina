import { useState } from 'react';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';

const statusOptions = [
  { value: 'pending', label: 'Pendiente' },
  { value: 'approved', label: 'Aprobado' },
  { value: 'in_process', label: 'En proceso' },
  { value: 'rejected', label: 'Rechazado' },
  { value: 'cancelled', label: 'Cancelado' },
];

function OrderEditForm({ order, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState({
    status: order.status,
    payerName: order.payerName || '',
    payerEmail: order.payerEmail || '',
    payerPhone: order.payerPhone || '',
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <p className="text-sm font-medium text-sage-800">{order.productName}</p>
        <p className="text-xs text-sage-500">Cantidad: {order.quantity}</p>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-sage-700">Estado</label>
        <select
          value={form.status}
          onChange={handleChange('status')}
          className="w-full rounded-lg border border-sage-200 bg-white px-4 py-2.5 text-sm focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-sage-700">Nombre del comprador</label>
        <Input value={form.payerName} onChange={handleChange('payerName')} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-sage-700">Email</label>
          <Input value={form.payerEmail} onChange={handleChange('payerEmail')} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-sage-700">Teléfono</label>
          <Input value={form.payerPhone} onChange={handleChange('payerPhone')} />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-5 py-2.5 font-heading text-sm font-semibold text-sage-600 transition hover:bg-sage-50"
        >
          Cancelar
        </button>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>
    </form>
  );
}

export default OrderEditForm;
