import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import { buildWhatsappLink } from '../../lib/whatsapp.js';

const links = [
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 hidden w-full md:block ${
        scrolled
          ? 'bg-bone/90 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      } transition-all duration-300`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
        <Link to="/" className="shrink-0">
          <motion.div whileHover={{ scale: 1.05, rotate: -2 }} whileTap={{ scale: 0.95 }}>
            <Logo className="h-16 w-16" withLabel labelClassName="text-sm tracking-wide" />
          </motion.div>
        </Link>

        <nav className="flex items-center gap-9">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative font-heading text-sm font-medium text-sage-700 transition hover:text-sage-900"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-mustard-400 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
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
            className="text-sage-600 transition-colors hover:text-sage-900"
          >
            <Instagram size={20} strokeWidth={1.75} />
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
