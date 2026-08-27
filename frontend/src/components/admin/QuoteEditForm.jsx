import { useState } from 'react';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';

const typeOptions = [
  { value: 'sol', label: 'Lentes de sol' },
  { value: 'contacto', label: 'Lentes de contacto' },
  { value: 'receta', label: 'Lentes recetados' },
  { value: 'otro', label: 'Otra consulta' },
];

function QuoteEditForm({ quote, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState({
    name: quote.name,
    phone: quote.phone,
    consultationType: quote.consultationType,
    message: quote.message,
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-sage-700">Nombre</label>
          <Input value={form.name} onChange={handleChange('name')} required />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-sage-700">Teléfono</label>
          <Input value={form.phone} onChange={handleChange('phone')} required />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-sage-700">Tipo de consulta</label>
        <select
          value={form.consultationType}
          onChange={handleChange('consultationType')}
          className="w-full rounded-lg border border-sage-200 bg-white px-4 py-2.5 text-sm focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
        >
          {typeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-sage-700">Mensaje</label>
        <textarea
          value={form.message}
          onChange={handleChange('message')}
          rows={4}
          required
          className="w-full rounded-lg border border-sage-200 bg-white px-4 py-2.5 text-sm focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
        />
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

export default QuoteEditForm;
