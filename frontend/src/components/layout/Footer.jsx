import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import { contactContent } from '../../data/contactContent.js';
import { buildWhatsappLink } from '../../lib/whatsapp.js';

const FACEBOOK_URL = 'https://www.facebook.com/opticandinajujuy/';

const socialLinks = [
  { icon: MessageCircle, label: 'WhatsApp', href: buildWhatsappLink('Hola! Quisiera hacer una consulta.') },
  { icon: Instagram, label: 'Instagram', href: import.meta.env.VITE_INSTAGRAM_URL },
  { icon: Facebook, label: 'Facebook', href: FACEBOOK_URL },
];

function Footer() {
  return (
    <footer className="bg-sage-500 text-bone">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between md:px-8">
        <Link to="/">
          <Logo className="h-16 w-auto [filter:drop-shadow(0_0_2px_rgba(250,248,243,1))_drop-shadow(0_0_10px_rgba(250,248,243,0.9))]" />
        </Link>

        {/* mobile: iconos sociales animados, centrados debajo del logo */}
        <div className="flex items-center gap-4 md:hidden">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <motion.a
              key={label}
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.9 }}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-bone transition-colors hover:bg-mustard-400 hover:text-sage-900"
            >
              <Icon size={19} />
            </motion.a>
          ))}
        </div>

        {/* desktop: links de texto */}
        <div className="hidden text-sm text-bone/90 md:flex md:items-center md:gap-6">
          <a
            href={socialLinks[0].href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition hover:text-bone"
          >
            <MessageCircle size={15} /> WhatsApp
          </a>
          <a
            href={socialLinks[1].href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition hover:text-bone"
          >
            <Instagram size={15} /> {contactContent.instagramHandle}
          </a>
          <a
            href={socialLinks[2].href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition hover:text-bone"
          >
            <Facebook size={15} /> Facebook
          </a>
        </div>
      </div>

      <div className="border-t border-white/15 py-4 text-center text-xs text-bone/70">
        © {new Date().getFullYear()} Óptica Andina. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
