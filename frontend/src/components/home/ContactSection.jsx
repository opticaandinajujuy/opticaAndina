import { motion } from 'framer-motion';
import { MapPin, Clock, Instagram } from 'lucide-react';
import { contactContent } from '../../data/contactContent.js';
import { fadeInUp, scrollViewport } from '../../hooks/useScrollAnimation.js';
import { buildWhatsappLink } from '../../lib/whatsapp.js';
import MapEmbed from './MapEmbed.jsx';
import PaymentMethods from './PaymentMethods.jsx';

function ContactSection() {
  return (
    <section id="contacto" className="mx-auto max-w-6xl px-6 py-20 md:px-8">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={scrollViewport}
        variants={fadeInUp}
        className="mb-10 text-center"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-mustard-600">
          Contacto
        </span>
        <h2 className="mt-1 font-heading text-3xl font-bold text-sage-900">
          Visitanos o escribinos
        </h2>
      </motion.div>

      <div className="grid gap-10 md:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={scrollViewport}
          variants={fadeInUp}
          className="space-y-6"
        >
          <div className="flex items-start gap-3">
            <MapPin size={20} className="mt-0.5 shrink-0 text-sage-600" />
            <div>
              <p className="font-heading text-sm font-semibold text-sage-800">Dirección</p>
              <p className="text-sm text-sage-600">{contactContent.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock size={20} className="mt-0.5 shrink-0 text-sage-600" />
            <div>
              <p className="font-heading text-sm font-semibold text-sage-800">Horarios</p>
              {contactContent.hours.map((h) => (
                <p key={h.days} className="text-sm text-sage-600">
                  {h.days}: {h.time}
                </p>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Instagram size={20} className="mt-0.5 shrink-0 text-sage-600" />
            <div>
              <p className="font-heading text-sm font-semibold text-sage-800">Instagram</p>
              <a
                href={import.meta.env.VITE_INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-sage-600 hover:text-sage-900"
              >
                {contactContent.instagramHandle}
              </a>
            </div>
          </div>

          <div>
            <p className="mb-2 font-heading text-sm font-semibold text-sage-800">
              Medios de pago
            </p>
            <PaymentMethods />
          </div>

          <a
            href={buildWhatsappLink('Hola! Quisiera hacer una consulta.')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full bg-sage-700 px-6 py-3 font-heading text-sm font-semibold text-white transition hover:bg-sage-800"
          >
            Escribinos por WhatsApp
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={scrollViewport}
          variants={fadeInUp}
        >
          <MapEmbed />
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSection;
