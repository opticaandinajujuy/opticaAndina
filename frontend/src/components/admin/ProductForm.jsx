import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { productSchema } from '../../schemas/productSchema.js';
import { toastWarning } from '../../lib/toast.js';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import ImageUploader from './ImageUploader.jsx';

const emptyProduct = {
  name: '',
  description: '',
  category: 'sol',
  subcategory: '',
  price: '',
  measurements: '',
  features: [],
  sizes: [],
  images: [],
  active: true,
  stock: '',
};

function TagListField({ label, placeholder, value = [], onChange }) {
  const [draft, setDraft] = useState('');

  const addTag = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange([...value, trimmed]);
    setDraft('');
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-sage-700">{label}</label>
      <div className="flex gap-2">
        <Input
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTag();
            }
          }}
        />
        <Button type="button" onClick={addTag} className="whitespace-nowrap px-4 py-2.5 text-xs">
          Agregar
        </Button>
      </div>
      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          <AnimatePresence initial={false}>
            {value.map((tag, i) => (
              <motion.span
                key={`${tag}-${i}`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                whileHover={{ scale: 1.06 }}
                transition={{ type: 'spring', stiffness: 400, damping: 26 }}
                className="flex items-center gap-1.5 rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-700"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => onChange(value.filter((_, idx) => idx !== i))}
                  aria-label={`Quitar ${tag}`}
                >
                  <X size={12} />
                </button>
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function ProductForm({ product, onSubmit, onCancel, submitting }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: emptyProduct,
  });

  const category = watch('category');

  useEffect(() => {
    reset(product ? { ...emptyProduct, ...product } : emptyProduct);
  }, [product, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit, () =>
        toastWarning('Completá los campos obligatorios')
      )}
      className="space-y-5"
    >
      <div>
        <label className="mb-1.5 block text-sm font-medium text-sage-700">Nombre</label>
        <Input {...register('name')} placeholder="Ej: Ray-Ban Aviator Classic" />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-sage-700">Descripción</label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full rounded-lg border border-sage-200 bg-white px-4 py-2.5 text-sm focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-sage-700">Categoría</label>
          <select
            {...register('category')}
            className="w-full rounded-lg border border-sage-200 bg-white px-4 py-2.5 text-sm focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
          >
            <option value="sol">Anteojos para sol</option>
            <option value="contacto">Lentes de contacto</option>
            <option value="receta">Armazones para receta</option>
            <option value="accesorios">Accesorios para anteojos</option>
            <option value="liquidos_contacto">Líquidos para lentes de contacto</option>
            <option value="estuches_contacto">Estuches para lentes de contacto</option>
            <option value="outlet">Outlet</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-sage-700">Precio (opcional)</label>
          <Input
            type="number"
            step="0.01"
            min="0"
            onKeyDown={(e) => ['-', 'e', '+'].includes(e.key) && e.preventDefault()}
            {...register('price')}
            placeholder="0"
          />
        </div>
      </div>

      {category === 'accesorios' && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-sage-700">Tipo de accesorio</label>
          <select
            {...register('subcategory')}
            className="w-full rounded-lg border border-sage-200 bg-white px-4 py-2.5 text-sm focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
          >
            <option value="">Seleccionar...</option>
            <option value="panos">Paños</option>
            <option value="colgantes">Colgantes</option>
            <option value="liquidos">Líquidos (limpiador de lentes)</option>
          </select>
          {errors.subcategory && (
            <p className="mt-1 text-xs text-red-600">{errors.subcategory.message}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-sage-700">Stock (opcional)</label>
          <Input
            type="number"
            min="0"
            onKeyDown={(e) => ['-', 'e', '+', '.'].includes(e.key) && e.preventDefault()}
            {...register('stock')}
            placeholder="0"
          />
        </div>
        <div className="flex items-end pb-2.5">
          <label className="flex items-center gap-2 text-sm font-medium text-sage-700">
            <input type="checkbox" {...register('active')} className="h-4 w-4 rounded border-sage-300" />
            Visible en el catálogo
          </label>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-sage-700">Medidas</label>
        <Input
          {...register('measurements')}
          placeholder="Ej: ancho de puente 18mm, ancho de lente 52mm, largo de varilla 140mm"
        />
      </div>

      <Controller
        control={control}
        name="features"
        render={({ field }) => (
          <TagListField
            label="Características"
            placeholder="Ej: protección UV400"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="sizes"
        render={({ field }) => (
          <TagListField
            label="Talles disponibles"
            placeholder="Ej: S, M, L o una medida"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="images"
        render={({ field }) => (
          <div>
            <label className="mb-1.5 block text-sm font-medium text-sage-700">Imágenes</label>
            <ImageUploader images={field.value} onChange={field.onChange} />
          </div>
        )}
      />

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-5 py-2.5 font-heading text-sm font-semibold text-sage-600 transition hover:bg-sage-50"
        >
          Cancelar
        </button>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Guardando...' : 'Guardar producto'}
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;
