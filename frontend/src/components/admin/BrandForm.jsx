import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { brandSchema } from '../../schemas/brandSchema.js';
import { uploadImageToCloudinary } from '../../lib/cloudinary.js';
import { toastWarning } from '../../lib/toast.js';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';

const emptyBrand = { name: '', logo: '', active: true, order: 0 };

function LogoUploader({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file) => {
    setError('');
    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      onChange(url);
    } catch (err) {
      setError('No se pudo subir el logo. Probá de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {value ? (
        <div className="group relative h-24 w-24 overflow-hidden rounded-lg border border-sage-200 bg-white">
          <img src={value} alt="" className="h-full w-full object-contain p-2" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-1 top-1 rounded-full bg-sage-900/70 p-1 text-white opacity-0 transition group-hover:opacity-100"
            aria-label="Quitar logo"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-sage-300 text-sage-500 transition hover:border-sage-500 hover:text-sage-700">
          {uploading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <>
              <ImagePlus size={20} />
              <span className="text-[11px] font-medium">Subir logo</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </label>
      )}
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function BrandForm({ brand, onSubmit, onCancel, submitting }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(brandSchema),
    defaultValues: emptyBrand,
  });

  useEffect(() => {
    reset(brand ? { ...emptyBrand, ...brand } : emptyBrand);
  }, [brand, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit, () =>
        toastWarning('Completá los campos obligatorios')
      )}
      className="space-y-5"
    >
      <div>
        <label className="mb-1.5 block text-sm font-medium text-sage-700">Nombre</label>
        <Input {...register('name')} placeholder="Ej: Ray-Ban" />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>

      <Controller
        control={control}
        name="logo"
        render={({ field }) => (
          <div>
            <label className="mb-1.5 block text-sm font-medium text-sage-700">Logo</label>
            <LogoUploader value={field.value} onChange={field.onChange} />
            {errors.logo && <p className="mt-1 text-xs text-red-600">{errors.logo.message}</p>}
          </div>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-sage-700">
            Orden <span className="font-normal text-sage-400">(menor = primero)</span>
          </label>
          <Input type="number" {...register('order')} placeholder="0" />
        </div>
        <div className="flex items-end pb-2.5">
          <label className="flex items-center gap-2 text-sm font-medium text-sage-700">
            <input type="checkbox" {...register('active')} className="h-4 w-4 rounded border-sage-300" />
            Visible en la landing
          </label>
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
          {submitting ? 'Guardando...' : 'Guardar marca'}
        </Button>
      </div>
    </form>
  );
}

export default BrandForm;
