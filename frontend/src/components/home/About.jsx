import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, HeartHandshake, GraduationCap } from 'lucide-react';
import { aboutContent } from '../../data/aboutContent.js';
import { fadeInUp, scrollViewport, staggerChildren } from '../../hooks/useScrollAnimation.js';
import Counter from '../ui/Counter.jsx';

const valueIcons = {
  Confianza: ShieldCheck,
  'Atención personalizada': HeartHandshake,
  'Profesionales capacitados': GraduationCap,
};

const OWNER_PHOTO_URL =
  'https://res.cloudinary.com/wf4comu9/image/upload/v1787859076/fotoDue%C3%B1a.jpg';

function About() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px', amount: 0.3 });

  return (
    <section id="nosotros" className="relative overflow-hidden bg-sage-500 py-24">
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
        className="relative mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[360px_1fr] md:items-center md:gap-14 md:px-8"
      >
        <motion.img
          variants={fadeInUp}
          src={OWNER_PHOTO_URL}
          alt="Dueña de Óptica Andina"
          className="h-64 w-full rounded-3xl object-cover shadow-xl sm:h-80 md:h-[26rem]"
        />

        <div>
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

          <motion.p
            variants={fadeInUp}
            className="mt-5 max-w-lg text-base font-medium leading-relaxed text-mustard-200"
          >
            7 años acompañando a las familias jujeñas. Más de 20 años de
            experiencia, brindando confianza, calidad y atención
            personalizada.
          </motion.p>

          <div className="mt-10 grid gap-10 sm:grid-cols-[auto_1fr] sm:items-end sm:gap-12">
            <motion.div ref={statsRef} variants={fadeInUp} className="flex gap-10 sm:gap-12">
              <div>
                <p className="font-heading text-6xl font-extrabold leading-none text-mustard-400 md:text-7xl">
                  <Counter value={aboutContent.yearsInBusiness} trigger={statsInView} />
                </p>
                <p className="mt-2 max-w-[9rem] text-sm leading-snug text-sage-200/80">
                  años como Óptica Andina
                </p>
              </div>
              <div>
                <p className="font-heading text-6xl font-extrabold leading-none text-bone md:text-7xl">
                  <Counter value={aboutContent.yearsOfExperience} suffix="+" trigger={statsInView} />
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
            className="mt-10 flex flex-wrap gap-3 border-t border-white/10 pt-8"
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
        </div>
      </motion.div>
    </section>
  );
}

export default About;
