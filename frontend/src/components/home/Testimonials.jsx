import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials.js';
import { fadeInUp, scrollViewport, staggerChildren } from '../../hooks/useScrollAnimation.js';

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=%C3%93ptica+Andina+San+Salvador+de+Jujuy+rese%C3%B1as';

function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-bone py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={scrollViewport}
          variants={fadeInUp}
          className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mustard-600">
              Opiniones
            </span>
            <h2 className="mt-2 font-heading text-4xl font-bold leading-tight text-sage-900 md:text-5xl">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-sage-600 underline underline-offset-4 transition hover:text-sage-900"
          >
            Ver más en Google
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={scrollViewport}
          variants={staggerChildren}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between rounded-2xl border border-sage-100 bg-white p-6 shadow-sm"
            >
              <div>
                <Quote size={22} className="mb-3 text-mustard-400" />
                <p className="text-sm leading-relaxed text-sage-700">{testimonial.text}</p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-sage-100 pt-4">
                <p className="font-heading text-sm font-semibold text-sage-900">
                  {testimonial.name}
                </p>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-mustard-400 text-mustard-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
