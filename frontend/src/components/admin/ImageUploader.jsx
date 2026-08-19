import { useState } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { uploadImageToCloudinary } from '../../lib/cloudinary.js';

function ImageUploader({ images = [], onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFiles = async (fileList) => {
    setError('');
    setUploading(true);
    try {
      const files = Array.from(fileList);
      const uploaded = await Promise.all(files.map(uploadImageToCloudinary));
      onChange([...images, ...uploaded]);
    } catch (err) {
      setError('No se pudieron subir una o más imágenes. Probá de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (url) => {
    onChange(images.filter((img) => img !== url));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {images.map((url) => (
          <div key={url} className="group relative h-24 w-24 overflow-hidden rounded-lg border border-sage-200">
            <img src={url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(url)}
              className="absolute right-1 top-1 rounded-full bg-sage-900/70 p-1 text-white opacity-0 transition group-hover:opacity-100"
              aria-label="Quitar imagen"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-sage-300 text-sage-500 transition hover:border-sage-500 hover:text-sage-700">
          {uploading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <>
              <ImagePlus size={20} />
              <span className="text-[11px] font-medium">Agregar</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={uploading}
            onChange={(e) => e.target.files?.length && handleFiles(e.target.files)}
          />
        </label>
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default ImageUploader;
