import { motion } from 'framer-motion';
import { MapPin, Clock, Instagram, ArrowUpRight, CreditCard } from 'lucide-react';
import { contactContent } from '../../data/contactContent.js';
import { fadeInUp, scrollViewport, staggerChildren } from '../../hooks/useScrollAnimation.js';
import { buildWhatsappLink } from '../../lib/whatsapp.js';
import PaymentMethods from './PaymentMethods.jsx';
import Logo from '../ui/Logo.jsx';

const infoItems = [
  {
    icon: MapPin,
    title: 'Dirección',
    content: <p className="text-sm text-sage-600">{contactContent.address}</p>,
  },
  {
    icon: Clock,
    title: 'Horarios',
    content: contactContent.hours.map((h) => (
      <p key={h.days} className="text-sm text-sage-600">
        {h.days}: {h.time}
      </p>
    )),
  },
  {
    icon: Instagram,
    title: 'Instagram',
    content: (
      <a
        href={import.meta.env.VITE_INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-sage-600 hover:text-sage-900"
      >
        {contactContent.instagramHandle}
      </a>
    ),
  },
];

function ContactSection() {
  return (
    <section id="contacto" className="mx-auto max-w-6xl px-6 py-20 md:px-8">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={scrollViewport}
        variants={fadeInUp}
        className="mb-12"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mustard-600">
          Hablemos
        </span>
        <h2 className="mt-2 font-heading text-4xl font-bold leading-tight text-sage-900 md:text-5xl">
          Estamos para ayudarte a ver mejor
        </h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 md:items-stretch">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={scrollViewport}
          variants={staggerChildren}
          className="flex h-full flex-col justify-between gap-7 rounded-3xl border border-sage-100 bg-white p-8"
        >
          <div className="space-y-6">
            {infoItems.map(({ icon: Icon, title, content }) => (
              <motion.div key={title} variants={fadeInUp} className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-sage-800">{title}</p>
                  {content}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp}>
            <div className="mb-2 flex items-center gap-2">
              <CreditCard size={15} className="text-sage-500" />
              <p className="font-heading text-sm font-semibold text-sage-800">Medios de pago</p>
            </div>
            <PaymentMethods />
          </motion.div>
        </motion.div>

        <motion.a
          href={buildWhatsappLink('Hola! Quisiera hacer una consulta.')}
          target="_blank"
          rel="noreferrer"
          initial="hidden"
          whileInView="show"
          viewport={scrollViewport}
          variants={fadeInUp}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-sage-700 to-sage-900 p-8 text-bone"
        >
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-mustard-400/20 blur-3xl"
          />
          <div className="pointer-events-none absolute -bottom-10 -right-10 opacity-[0.08]">
            <Logo className="h-56 w-56 rotate-12" />
          </div>

          <div className="relative">
            <ArrowUpRight
              size={22}
              className="mb-6 text-mustard-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
            <p className="font-heading text-3xl font-bold leading-tight md:text-4xl">
              Coordinemos tu visita al local
            </p>
            <p className="mt-3 text-sm text-sage-100/80">{contactContent.address}</p>
          </div>
          <span className="relative mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-mustard-400 px-6 py-3 font-heading text-sm font-semibold text-sage-900 transition group-hover:bg-mustard-300">
            Escribinos por WhatsApp
          </span>
        </motion.a>
      </div>
    </section>
  );
}

export default ContactSection;
