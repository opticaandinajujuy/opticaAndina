import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { buyerSchema } from '../../schemas/buyerSchema.js';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import { toastWarning } from '../../lib/toast.js';

function BuyerInfoModal({ onSubmit, onClose, submitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(buyerSchema) });

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-sage-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-sage-900">Tus datos</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-full p-1.5 text-sage-400 hover:bg-sage-50 hover:text-sage-700"
          >
            <X size={18} />
          </button>
        </div>
        <p className="mb-5 text-sm text-sage-600">
          Necesitamos tu nombre y teléfono para coordinar la entrega antes de pasarte a Mercado Pago.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit, () => toastWarning('Completá los campos'))}
          className="space-y-4"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-sage-700">
              Nombre completo
            </label>
            <Input {...register('buyerName')} placeholder="Tu nombre y apellido" />
            {errors.buyerName && (
              <p className="mt-1 text-xs text-red-600">{errors.buyerName.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-sage-700">Teléfono</label>
            <Input {...register('buyerPhone')} placeholder="388 4123456" />
            {errors.buyerPhone && (
              <p className="mt-1 text-xs text-red-600">{errors.buyerPhone.message}</p>
            )}
          </div>

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Redirigiendo...' : 'Continuar a Mercado Pago'}
          </Button>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default BuyerInfoModal;
