import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import { buildWhatsappLink } from '../../lib/whatsapp.js';

const FACEBOOK_URL = 'https://www.facebook.com/opticandinajujuy/';

const links = [
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
];

function Navbar({ overlay = false }) {
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolledPast(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [overlay]);

  // en modo overlay (sobre el video del Hero) el texto arranca claro y
  // se oscurece al scrollear; en las demás páginas el fondo siempre es
  // claro, así que el navbar es oscuro desde el arranque
  const scrolled = !overlay || scrolledPast;

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 hidden w-full md:block ${
        scrolled
          ? 'border-b border-sage-100 bg-white/95 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      } transition-all duration-300`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
        <Link to="/" className="shrink-0">
          <motion.div whileHover={{ scale: 1.05, rotate: -2 }} whileTap={{ scale: 0.95 }}>
            <Logo className="h-16 w-auto" />
          </motion.div>
        </Link>

        <nav className="flex items-center gap-9">
          {links.map((link) => (
            <Link
              key={link.href}
              to={`/${link.href}`}
              className={`group relative font-heading text-sm font-medium transition-colors ${
                scrolled ? 'text-sage-700 hover:text-sage-900' : 'text-bone hover:text-mustard-200'
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-mustard-400 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <motion.a
            href={import.meta.env.VITE_INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram de Óptica Andina"
            whileHover={{ scale: 1.15, rotate: 8 }}
            whileTap={{ scale: 0.9 }}
            className={`transition-colors ${
              scrolled ? 'text-sage-600 hover:text-sage-900' : 'text-bone hover:text-mustard-200'
            }`}
          >
            <Instagram size={20} strokeWidth={1.75} />
          </motion.a>
          <motion.a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook de Óptica Andina"
            whileHover={{ scale: 1.15, rotate: 8 }}
            whileTap={{ scale: 0.9 }}
            className={`transition-colors ${
              scrolled ? 'text-sage-600 hover:text-sage-900' : 'text-bone hover:text-mustard-200'
            }`}
          >
            <Facebook size={20} strokeWidth={1.75} />
          </motion.a>
          <motion.a
            href={buildWhatsappLink('Hola! Quisiera hacer una consulta.')}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-mustard-400 px-5 py-2.5 font-heading text-sm font-semibold text-sage-900 shadow-sm transition-colors hover:bg-mustard-500"
          >
            Escribinos
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;
