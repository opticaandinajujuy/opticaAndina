import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getBrands } from '../../services/brandService.js';

function BrandsCarousel() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    let active = true;
    getBrands({ activeOnly: 'true' })
      .then(({ data }) => {
        if (active) setBrands(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  if (brands.length === 0) return null;

  const track = [...brands, ...brands];
  const duration = Math.max(brands.length * 3, 12);

  return (
    <section className="border-y border-sage-100 bg-white py-8">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-wide text-sage-400">
          Marcas con las que trabajamos
        </p>
      </div>

      <div className="group relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

        <motion.div
          className="flex w-max items-center gap-14"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration, ease: 'linear', repeat: Infinity }}
          style={{ animationPlayState: 'running' }}
        >
          {track.map((brand, i) => (
            <div
              key={`${brand._id}-${i}`}
              className="flex h-12 w-28 shrink-0 items-center justify-center grayscale transition duration-300 hover:grayscale-0"
            >
              <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default BrandsCarousel;
