import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getBrands } from '../../services/brandService.js';

function LogosCarousel() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    getBrands()
      .then(({ data }) => setBrands(data))
      .catch(() => {});
  }, []);

  if (brands.length === 0) return null;

  const track = [...brands, ...brands];
  const duration = brands.length * 3;

  return (
    <section className="overflow-hidden border-t border-sage-100 bg-white py-8">
      <motion.div
        className="flex w-max items-center"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {track.map((brand, i) => (
          <div key={`${brand._id}-${i}`} className="flex shrink-0 items-center px-8">
            <img
              src={brand.logoUrl}
              alt={brand.name || 'Marca'}
              className="h-12 w-auto object-contain transition duration-300 hover:scale-125"
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default LogosCarousel;
