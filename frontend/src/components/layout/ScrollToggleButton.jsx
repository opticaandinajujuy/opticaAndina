import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp } from 'lucide-react';

function ScrollToggleButton() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY < window.innerHeight * 0.5);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (atTop) {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      aria-label={atTop ? 'Bajar' : 'Volver arriba'}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 left-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-sage-500 text-white shadow-lg shadow-sage-900/20 md:bottom-6 md:left-6"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={atTop ? 'down' : 'up'}
          initial={{ opacity: 0, y: atTop ? -6 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: atTop ? 6 : -6 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          {atTop ? <ArrowDown size={24} /> : <ArrowUp size={24} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export default ScrollToggleButton;
