import { Link } from 'react-router-dom';
import { Instagram, MapPin, MessageCircle } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import { contactContent } from '../../data/contactContent.js';
import { buildWhatsappLink } from '../../lib/whatsapp.js';

function Footer() {
  return (
    <footer className="bg-sage-900 text-sage-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <Logo className="h-20 w-20" />
          <span className="font-heading text-base font-semibold text-bone">Óptica Andina</span>
        </Link>

        <div className="flex flex-col gap-2 text-sm text-sage-300 md:flex-row md:gap-6">
          <span className="flex items-center gap-1.5">
            <MapPin size={15} /> {contactContent.address}
          </span>
          <a
            href={buildWhatsappLink('Hola! Quisiera hacer una consulta.')}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition hover:text-bone"
          >
            <MessageCircle size={15} /> WhatsApp
          </a>
          <a
            href={import.meta.env.VITE_INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition hover:text-bone"
          >
            <Instagram size={15} /> {contactContent.instagramHandle}
          </a>
        </div>
      </div>

      <div className="border-t border-sage-800 py-4 text-center text-xs text-sage-400">
        © {new Date().getFullYear()} Óptica Andina. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
