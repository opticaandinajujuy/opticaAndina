import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { fadeInUp, staggerChildren } from '../../hooks/useScrollAnimation.js';

function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-sage-900 md:pt-24">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="scale-100 md:scale-125"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        src="https://res.cloudinary.com/dabikk5ei/video/upload/v1787160008/Video_Project_1_vlmomf.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-sage-900/85 via-sage-900/65 to-sage-900/90" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-sage-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-sage-900 to-transparent" />

      {/* decorative glow */}
      <motion.div
        animate={{ y: [0, 24, 0], x: [0, -12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-mustard-400/20 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 16, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-0 left-[-10%] h-72 w-72 rounded-full bg-sage-300/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-10 md:px-8 md:pt-0">
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          <motion.span
            variants={fadeInUp}
            className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-mustard-300/40 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-mustard-200"
          >
            Óptica Andina
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="max-w-2xl font-heading text-5xl font-extrabold leading-[0.98] text-bone md:text-7xl"
          >
            Tu mirada,
            <span className="block text-mustard-400">con la claridad</span>
            que se merece
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-lg text-base leading-relaxed text-sage-100/85 md:text-lg"
          >
            7 años como Óptica Andina y más de 20 años de experiencia en el
            rubro óptico, cuidando tu visión con atención personalizada en
            San Salvador de Jujuy.
          </motion.p>

          <motion.div variants={fadeInUp} className="mb-16 mt-9 flex flex-wrap gap-4 md:mb-8">
            <motion.a
              href="#catalogo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full bg-mustard-400 px-8 py-4 font-heading text-sm font-semibold text-sage-900 shadow-lg shadow-mustard-900/20 transition-colors hover:bg-mustard-300"
            >
              Ver catálogo
            </motion.a>
            <motion.a
              href="#presupuesto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full border border-bone/30 px-8 py-4 font-heading text-sm font-semibold text-bone transition-colors hover:bg-white/10"
            >
              Pedir presupuesto
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* mountain silhouette, echoes the logo mark */}
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full md:h-44"
      >
        <path
          d="M0 220 L0 140 L220 60 L360 130 L480 40 L620 120 L760 70 L900 150 L1080 55 L1220 125 L1440 70 L1440 220 Z"
          fill="#faf8f3"
          opacity="0.06"
        />
        <path
          d="M0 220 L0 170 L180 110 L340 165 L500 95 L660 160 L820 115 L980 175 L1160 100 L1320 165 L1440 130 L1440 220 Z"
          fill="#faf8f3"
        />
      </svg>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-bone/60 md:block"
      >
        <ArrowDown size={20} className="animate-bounce" />
      </motion.div>
    </section>
  );
}

export default Hero;
