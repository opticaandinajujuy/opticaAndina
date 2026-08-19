import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { fadeInUp, staggerChildren } from '../../hooks/useScrollAnimation.js';

function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-gradient-to-b from-sage-900 via-sage-800 to-sage-700 md:min-h-[88vh]">
      {/* decorative glow */}
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-mustard-400/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-[-10%] h-72 w-72 rounded-full bg-sage-300/10 blur-3xl" />

      <motion.div
        variants={staggerChildren}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-start px-6 md:px-8"
      >
        <motion.span
          variants={fadeInUp}
          className="mb-5 inline-flex items-center rounded-full border border-mustard-300/40 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-mustard-200"
        >
          7 años de trayectoria · +20 años de experiencia en el rubro
        </motion.span>

        <motion.h1
          variants={fadeInUp}
          className="max-w-2xl font-heading text-4xl font-bold leading-tight text-bone md:text-6xl"
        >
          Tu mirada, con la claridad que se merece
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mt-5 max-w-lg text-base leading-relaxed text-sage-100/85 md:text-lg"
        >
          Lentes de sol, de contacto y recetados, elegidos con atención
          personalizada por profesionales del rubro óptico en el corazón de
          San Salvador de Jujuy.
        </motion.p>

        <motion.div variants={fadeInUp} className="mt-9 flex flex-wrap gap-4">
          <a
            href="#catalogo"
            className="rounded-full bg-mustard-400 px-7 py-3.5 font-heading text-sm font-semibold text-sage-900 shadow-lg shadow-mustard-900/20 transition hover:bg-mustard-300"
          >
            Ver catálogo
          </a>
          <a
            href="#presupuesto"
            className="rounded-full border border-bone/30 px-7 py-3.5 font-heading text-sm font-semibold text-bone transition hover:bg-white/10"
          >
            Pedir presupuesto
          </a>
        </motion.div>
      </motion.div>

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
