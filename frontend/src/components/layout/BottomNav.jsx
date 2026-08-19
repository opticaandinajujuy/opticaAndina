import { AnimatePresence, motion } from 'framer-motion';
import { Glasses, FileText, Phone, Menu, X, Instagram, MapPin } from 'lucide-react';
import { useUiStore } from '../../store/useUiStore.js';
import Logo from '../ui/Logo.jsx';
import { buildWhatsappLink } from '../../lib/whatsapp.js';

const items = [
  { label: 'Catálogo', href: '#catalogo', icon: Glasses },
  { label: 'Presupuesto', href: '#presupuesto', icon: FileText },
  { label: 'Contacto', href: '#contacto', icon: Phone },
];

function BottomNav() {
  const open = useUiStore((state) => state.mobileMenuOpen);
  const toggle = useUiStore((state) => state.toggleMobileMenu);

  const closeAndGo = () => {
    if (open) toggle();
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggle}
            className="fixed inset-0 z-40 bg-sage-900/40 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-x-0 bottom-16 z-40 rounded-t-3xl bg-white p-6 shadow-2xl md:hidden"
          >
            <div className="mb-5 flex items-center justify-between">
              <Logo className="h-9 w-9" withLabel labelClassName="text-xs" />
              <button
                onClick={toggle}
                aria-label="Cerrar menú"
                className="rounded-full bg-sage-50 p-2 text-sage-700"
              >
                <X size={18} />
              </button>
            </div>

            <a
              href="#nosotros"
              onClick={closeAndGo}
              className="block border-b border-sage-100 py-3 font-heading text-base font-medium text-sage-800"
            >
              Nosotros
            </a>
            <a
              href="#contacto"
              onClick={closeAndGo}
              className="flex items-center gap-2 border-b border-sage-100 py-3 font-heading text-base font-medium text-sage-800"
            >
              <MapPin size={17} /> Av. General Alvear 1166, S. S. de Jujuy
            </a>
            <a
              href={import.meta.env.VITE_INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 py-3 font-heading text-base font-medium text-sage-800"
            >
              <Instagram size={17} /> @opticaandinajujuy
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t border-sage-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
        {items.map(({ label, href, icon: Icon }) => (
          <motion.a
            key={label}
            href={href}
            onClick={closeAndGo}
            whileTap={{ scale: 0.85 }}
            className="flex flex-1 flex-col items-center gap-1 py-2.5 text-sage-600 transition-colors active:text-sage-900"
          >
            <Icon size={22} strokeWidth={1.75} />
            <span className="text-[11px] font-medium">{label}</span>
          </motion.a>
        ))}
        <motion.button
          onClick={toggle}
          whileTap={{ scale: 0.85 }}
          className="flex flex-1 flex-col items-center gap-1 py-2.5 text-sage-600 transition-colors active:text-sage-900"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'close' : 'menu'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {open ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
            </motion.span>
          </AnimatePresence>
          <span className="text-[11px] font-medium">Más</span>
        </motion.button>
      </nav>
    </>
  );
}

export default BottomNav;
