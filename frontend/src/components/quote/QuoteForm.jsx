import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { Paperclip, X } from 'lucide-react';
import { quoteSchema } from '../../schemas/quoteSchema.js';
import { createQuote } from '../../services/quoteService.js';
import { fadeInUp, scrollViewport } from '../../hooks/useScrollAnimation.js';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_SIZE = 5 * 1024 * 1024;

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

      Swal.fire({
        icon: 'success',
        title: '¡Consulta enviada!',
        text: 'En breve nos pondremos en contacto con vos.',
        confirmButtonColor: '#4f6b58',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'No pudimos enviar tu consulta',
        text: 'Probá de nuevo en unos minutos.',
        confirmButtonColor: '#4f6b58',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="presupuesto" className="bg-sage-50/60 py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={scrollViewport}
        variants={fadeInUp}
        className="mx-auto max-w-2xl px-6 md:px-8"
      >
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-mustard-600">
            Presupuesto
          </span>
          <h2 className="mt-1 font-heading text-3xl font-bold text-sage-900">
            Contanos qué necesitás
          </h2>
          <p className="mt-2 text-sm text-sage-600">
            Completá tus datos y, si ya tenés una receta, adjuntala para agilizar la consulta.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-2xl border border-sage-100 bg-white p-6 shadow-sm md:p-8"
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
            <label className="mb-1.5 block text-sm font-medium text-sage-700">Email</label>
            <Input type="email" {...register('email')} placeholder="tu@email.com" />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
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
    </section>
  );
}

export default QuoteForm;
