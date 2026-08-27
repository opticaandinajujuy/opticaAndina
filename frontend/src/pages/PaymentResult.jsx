import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Clock, MessageCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import { toastSuccess, toastError, toastWarning } from '../lib/toast.js';
import { buildWhatsappLink } from '../lib/whatsapp.js';

const statusContent = {
  exito: {
    icon: CheckCircle2,
    iconClass: 'text-sage-600',
    title: '¡Pago aprobado!',
    text: 'Gracias por tu compra. En breve nos vamos a comunicar por WhatsApp para coordinar la entrega.',
    toast: () => toastSuccess('¡Pago aprobado!'),
    whatsappMessage: 'Hola! Acabo de hacer una compra en la web y quiero coordinar la entrega.',
  },
  error: {
    icon: XCircle,
    iconClass: 'text-red-500',
    title: 'No pudimos procesar el pago',
    text: 'Algo falló durante el pago. Podés intentarlo de nuevo o escribirnos por WhatsApp.',
    toast: () => toastError('El pago no se pudo procesar'),
    whatsappMessage: 'Hola! Tuve un problema pagando en la web, ¿me ayudan?',
  },
  pendiente: {
    icon: Clock,
    iconClass: 'text-mustard-500',
    title: 'Pago pendiente',
    text: 'Tu pago está siendo procesado. Te avisaremos por WhatsApp apenas se confirme.',
    toast: () => toastWarning('Tu pago está pendiente de confirmación'),
    whatsappMessage: 'Hola! Hice una compra en la web y quedó pendiente de aprobación, quería consultar.',
  },
};

function PaymentResult({ status }) {
  const { icon: Icon, iconClass, title, text, toast, whatsappMessage } = statusContent[status];

  useEffect(() => {
    toast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <>
      <Navbar />
      <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 py-20 text-center">
        <Icon size={56} className={iconClass} />
        <h1 className="mt-6 font-heading text-2xl font-bold text-sage-900">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-sage-600">{text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={buildWhatsappLink(whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-mustard-400 px-8 py-3 font-heading text-sm font-semibold text-sage-900 transition hover:bg-mustard-300"
          >
            <MessageCircle size={17} /> Coordinar por WhatsApp
          </a>
          <Link
            to="/"
            className="flex items-center justify-center rounded-full bg-sage-700 px-8 py-3 font-heading text-sm font-semibold text-bone transition hover:bg-sage-800"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PaymentResult;
