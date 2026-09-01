import { useState } from 'react';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import ImageUploader from './ImageUploader.jsx';
import { toastWarning } from '../../lib/toast.js';

function BrandForm({ brand, onSubmit, onCancel, submitting }) {
  const [name, setName] = useState(brand?.name || '');
  const [images, setImages] = useState(brand?.logoUrl ? [brand.logoUrl] : []);

  const handleImagesChange = (next) => {
    // el logo es una sola imagen: si ya había una y se agrega otra, se queda con la última
    setImages(next.length > 1 ? [next[next.length - 1]] : next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!images[0]) {
      toastWarning('Subí el logo de la marca');
      return;
    }
    onSubmit({ name, logoUrl: images[0] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-sage-700">
          Nombre <span className="font-normal text-sage-400">(opcional)</span>
        </label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Ray-Ban" />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-sage-700">Logo</label>
        <ImageUploader images={images} onChange={handleImagesChange} />
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
