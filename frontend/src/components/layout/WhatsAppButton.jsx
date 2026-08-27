import { motion } from 'framer-motion';
import { buildWhatsappLink } from '../../lib/whatsapp.js';

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
      <path d="M16.02 3C9.1 3 3.48 8.62 3.48 15.54c0 2.5.7 4.83 1.9 6.82L3 29l6.8-2.32a12.4 12.4 0 0 0 6.22 1.67c6.92 0 12.54-5.62 12.54-12.54C28.56 8.62 22.94 3 16.02 3Zm0 22.6a10.3 10.3 0 0 1-5.4-1.52l-.39-.23-3.8 1.3 1.28-3.76-.25-.4a10.24 10.24 0 0 1-1.6-5.45c0-5.68 4.62-10.3 10.3-10.3s10.3 4.62 10.3 10.3-4.62 10.3-10.3 10.3Zm5.68-7.7c-.31-.16-1.85-.91-2.14-1.02-.29-.1-.5-.16-.71.16-.21.31-.81 1.02-1 1.23-.18.21-.37.23-.68.08-.31-.16-1.32-.49-2.51-1.56-.93-.83-1.56-1.85-1.74-2.16-.18-.31-.02-.48.14-.63.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.02-.55-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55l-.61-.01c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.22 3.39 5.38 4.76.75.32 1.34.52 1.8.66.76.24 1.44.21 1.99.13.61-.09 1.85-.76 2.11-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.37Z" />
    </svg>
  );
}

function WhatsAppButton() {
  return (
    <motion.a
      href={buildWhatsappLink('Hola! Quisiera hacer una consulta.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribinos por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-sage-500 text-white shadow-lg shadow-sage-900/20 md:bottom-6 md:right-6"
    >
      <motion.span
        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
        className="absolute inset-0 rounded-full bg-sage-500"
      />
      <WhatsAppIcon className="relative h-7 w-7" />
    </motion.a>
  );
}

export default WhatsAppButton;
