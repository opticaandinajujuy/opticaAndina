import { motion } from 'framer-motion';
import { ShieldCheck, HeartHandshake, GraduationCap } from 'lucide-react';
import { aboutContent } from '../../data/aboutContent.js';
import { fadeInUp, scrollViewport, staggerChildren } from '../../hooks/useScrollAnimation.js';
import Counter from '../ui/Counter.jsx';

const valueIcons = {
  Confianza: ShieldCheck,
  'Atención personalizada': HeartHandshake,
  'Profesionales capacitados': GraduationCap,
};

function About() {
  return (
    <section id="nosotros" className="relative overflow-hidden bg-sage-900 py-24">
      <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-heading text-[22vw] font-extrabold leading-none text-white/[0.03] md:text-[14vw]">
        ANDINA
      </span>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-mustard-400/10 blur-3xl"
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={scrollViewport}
        variants={staggerChildren}
        className="relative mx-auto max-w-6xl px-6 md:px-8"
      >
        <motion.span
          variants={fadeInUp}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-mustard-300"
        >
          Sobre nosotros
        </motion.span>
        <motion.h2
          variants={fadeInUp}
          className="mt-3 max-w-2xl font-heading text-4xl font-bold leading-[1.1] text-bone md:text-5xl"
        >
          {aboutContent.title}
        </motion.h2>

        <div className="mt-14 grid gap-12 md:grid-cols-[auto_1fr] md:items-end md:gap-16">
          <motion.div variants={fadeInUp} className="flex gap-10 sm:gap-16">
            <div>
              <p className="font-heading text-7xl font-extrabold leading-none text-mustard-400 md:text-8xl">
                <Counter value={aboutContent.yearsInBusiness} />
              </p>
              <p className="mt-2 max-w-[9rem] text-sm leading-snug text-sage-200/80">
                años como Óptica Andina
              </p>
            </div>
            <div>
              <p className="font-heading text-7xl font-extrabold leading-none text-bone md:text-8xl">
                <Counter value={aboutContent.yearsOfExperience} suffix="+" />
              </p>
              <p className="mt-2 max-w-[9rem] text-sm leading-snug text-sage-200/80">
                años de experiencia en el rubro óptico
              </p>
            </div>
          </motion.div>

          <motion.p variants={fadeInUp} className="max-w-md text-base leading-relaxed text-sage-100/85">
            {aboutContent.description}
          </motion.p>
        </div>

        <motion.div
          variants={fadeInUp}
          className="mt-12 flex flex-wrap gap-3 border-t border-white/10 pt-8"
        >
          {aboutContent.values.map((value) => {
            const Icon = valueIcons[value] ?? ShieldCheck;
            return (
              <motion.span
                key={value}
                whileHover={{ scale: 1.06, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-sage-100"
              >
                <Icon size={16} className="text-mustard-300" />
                {value}
              </motion.span>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default About;
