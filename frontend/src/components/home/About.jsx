import { motion } from 'framer-motion';
import { ShieldCheck, HeartHandshake, GraduationCap } from 'lucide-react';
import { aboutContent } from '../../data/aboutContent.js';
import { fadeInUp, scrollViewport, staggerChildren } from '../../hooks/useScrollAnimation.js';
import Logo from '../ui/Logo.jsx';

const valueIcons = {
  Confianza: ShieldCheck,
  'Atención personalizada': HeartHandshake,
  'Profesionales capacitados': GraduationCap,
};

function About() {
  return (
    <section id="nosotros" className="mx-auto max-w-6xl px-6 py-20 md:px-8">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={scrollViewport}
          variants={fadeInUp}
          className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-sage-700 to-sage-900"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-mustard-400/20 blur-3xl" />
          <Logo className="h-28 w-28 drop-shadow-xl" />

          <div className="absolute inset-x-6 bottom-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
              <p className="font-heading text-2xl font-bold text-bone">
                {aboutContent.yearsInBusiness}
              </p>
              <p className="text-[11px] text-sage-100/80">años como Óptica Andina</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
              <p className="font-heading text-2xl font-bold text-bone">
                {aboutContent.yearsOfExperience}+
              </p>
              <p className="text-[11px] text-sage-100/80">años de experiencia en el rubro</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={scrollViewport}
          variants={staggerChildren}
        >
          <motion.span
            variants={fadeInUp}
            className="text-xs font-semibold uppercase tracking-wide text-mustard-600"
          >
            Sobre nosotros
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-1 font-heading text-3xl font-bold text-sage-900"
          >
            {aboutContent.title}
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-sm leading-relaxed text-sage-600">
            {aboutContent.description}
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-8 space-y-4">
            {aboutContent.values.map((value) => {
              const Icon = valueIcons[value] ?? ShieldCheck;
              return (
                <div key={value} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                    <Icon size={18} />
                  </div>
                  <span className="font-heading text-sm font-medium text-sage-800">{value}</span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
