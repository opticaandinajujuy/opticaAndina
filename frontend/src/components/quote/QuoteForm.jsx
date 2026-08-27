import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Paperclip, X, Clock, ShieldCheck, FileText } from 'lucide-react';
import { quoteSchema } from '../../schemas/quoteSchema.js';
import { createQuote } from '../../services/quoteService.js';
import { toastSuccess, toastError, toastWarning } from '../../lib/toast.js';
import { fadeInUp, scrollViewport, staggerChildren } from '../../hooks/useScrollAnimation.js';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import Logo from '../ui/Logo.jsx';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_SIZE = 5 * 1024 * 1024;

const trustPoints = [
  { icon: Clock, text: 'Te respondemos a la brevedad' },
  { icon: ShieldCheck, text: 'Consultá gratis, sin compromiso' },
  { icon: Paperclip, text: 'Podés adjuntar tu receta al toque' },
];

function QuoteForm() {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: { consultationType: 'otro' },
  });

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!ALLOWED_TYPES.includes(selected.type)) {
      setFileError('Formato no permitido. Usá jpg, png o pdf.');
      setFile(null);
      return;
    }
    if (selected.size > MAX_SIZE) {
      setFileError('El archivo no puede superar los 5MB.');
      setFile(null);
      return;
    }

    setFileError('');
    setFile(selected);
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => formData.append(key, value));
      if (file) formData.append('recipe', file);

      await createQuote(formData);

      reset();
      setFile(null);

      toastSuccess('¡Consulta enviada! Te contactaremos pronto.');
    } catch (error) {
      toastError('No pudimos enviar tu consulta. Probá de nuevo en unos minutos.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="presupuesto" className="relative overflow-hidden bg-mustard-50 py-24">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-mustard-300/30 blur-3xl"
      />
      <div className="pointer-events-none absolute -bottom-64 -left-64 opacity-[0.08]">
        <Logo className="h-[60rem] w-[60rem] -rotate-12" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-[1fr_1.15fr] md:items-center md:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={scrollViewport}
          variants={staggerChildren}
        >
          <motion.span
            variants={fadeInUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-mustard-600"
          >
            Presupuesto
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-2 font-heading text-4xl font-bold leading-[1.05] text-sage-900 md:text-6xl"
          >
            Contanos qué necesitás
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 max-w-md text-base leading-relaxed text-sage-700/80">
            Completá tus datos y, si ya tenés una receta, adjuntala para agilizar la consulta.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-9 space-y-4">
            {trustPoints.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-500 text-white">
                  <Icon size={16} />
                </div>
                <span className="font-heading text-sm font-medium text-sage-800">{text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={scrollViewport}
          variants={fadeInUp}
          className="relative"
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: -8 }}
            viewport={scrollViewport}
            transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.3 }}
            className="absolute -left-4 -top-4 z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-500 text-white shadow-lg md:-left-6 md:-top-6"
          >
            <FileText size={22} />
          </motion.div>

          <form
            onSubmit={handleSubmit(onSubmit, () =>
              toastWarning('Completá los campos obligatorios')
            )}
            className="space-y-4 rounded-3xl bg-white p-6 shadow-xl shadow-mustard-900/10 md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-sage-700">Nombre</label>
                <Input {...register('name')} placeholder="Tu nombre" />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-sage-700">Teléfono</label>
                <Input {...register('phone')} placeholder="388 4123456" />
                {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-sage-700">
                Tipo de consulta
              </label>
              <select
                {...register('consultationType')}
                className="w-full rounded-lg border border-sage-200 bg-white px-4 py-2.5 text-sm focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
              >
                <option value="sol">Lentes de sol</option>
                <option value="contacto">Lentes de contacto</option>
                <option value="receta">Lentes recetados</option>
                <option value="otro">Otra consulta</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-sage-700">Mensaje</label>
              <textarea
                {...register('message')}
                rows={4}
                placeholder="Contanos brevemente qué estás buscando"
                className="w-full rounded-lg border border-sage-200 bg-white px-4 py-2.5 text-sm focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-sage-700">
                Adjuntar receta <span className="font-normal text-sage-400">(opcional)</span>
              </label>
              {file ? (
                <div className="flex items-center justify-between rounded-lg border border-sage-200 bg-sage-50 px-4 py-2.5 text-sm text-sage-700">
                  <span className="truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    aria-label="Quitar archivo"
                    className="text-sage-400 hover:text-sage-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-sage-300 px-4 py-2.5 text-sm text-sage-500 transition hover:border-sage-500 hover:text-sage-700">
                  <Paperclip size={16} />
                  Subir imagen o PDF (máx. 5MB)
                  <input
                    type="file"
                    accept="image/jpeg,image/png,application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
              {fileError && <p className="mt-1 text-xs text-red-600">{fileError}</p>}
            </div>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? 'Enviando...' : 'Enviar consulta'}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default QuoteForm;
