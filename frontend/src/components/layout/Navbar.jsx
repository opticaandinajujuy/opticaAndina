import { useEffect, useState } from 'react';
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
      className={`sticky top-0 z-50 hidden w-full md:block ${
        scrolled
          ? 'bg-bone/90 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      } transition-all duration-300`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
        <a href="#" className="shrink-0">
          <Logo className="h-11 w-11" withLabel labelClassName="text-sm tracking-wide" />
        </a>

        <nav className="flex items-center gap-9">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-heading text-sm font-medium text-sage-700 transition hover:text-sage-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={import.meta.env.VITE_INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram de Óptica Andina"
            className="text-sage-600 transition hover:text-sage-900"
          >
            <Instagram size={20} strokeWidth={1.75} />
          </a>
          <a
            href={buildWhatsappLink('Hola! Quisiera hacer una consulta.')}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-mustard-400 px-5 py-2.5 font-heading text-sm font-semibold text-sage-900 shadow-sm transition hover:bg-mustard-500"
          >
            Escribinos
          </a>
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;
