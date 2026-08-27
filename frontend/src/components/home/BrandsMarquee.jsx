import { motion } from 'framer-motion';

const brands = [
  'Gitano',
  'Praia',
  'R61',
  'Adriana Costantini',
  'Lavanett',
  'Eleve',
  'Mito Gafas',
  'Natalia Oreiro',
  'Valeria Mazza',
  'Reff',
  'Cylent',
  'Dacil',
];

function BrandsMarquee() {
  const track = [...brands, ...brands];
  const duration = brands.length * 2.4;

  return (
    <section className="overflow-hidden border-t border-sage-600 bg-sage-500 py-7">
      <motion.div
        className="flex w-max items-center"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {track.map((name, i) => (
          <span key={`${name}-${i}`} className="flex shrink-0 items-center gap-8 px-4">
            <span className="font-heading text-lg font-semibold tracking-wide text-bone/90 transition duration-300 hover:text-mustard-300 md:text-xl">
              {name}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-mustard-400/70" />
          </span>
        ))}
      </motion.div>
    </section>
  );
}

export default BrandsMarquee;
