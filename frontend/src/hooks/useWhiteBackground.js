import { useEffect, useState } from 'react';

// mira los 4 bordes de la imagen para saber si tiene fondo blanco (foto de
// producto) o no (foto de estilo de vida) — así decidimos si se muestra
// completa (sin recortar) o llenando el contenedor.
export function useWhiteBackground(url) {
  const [isWhite, setIsWhite] = useState(false);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (cancelled) return;
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const w = img.naturalWidth - 1;
        const h = img.naturalHeight - 1;
        const corners = [
          [0, 0],
          [w, 0],
          [0, h],
          [w, h],
        ];
        const allWhite = corners.every(([x, y]) => {
          const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
          return r > 235 && g > 235 && b > 235;
        });
        setIsWhite(allWhite);
      } catch (error) {
        setIsWhite(false);
      }
    };
    img.onerror = () => setIsWhite(false);
    img.src = url;

    return () => {
      cancelled = true;
    };
  }, [url]);

  return isWhite;
}
