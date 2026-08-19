export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const staggerChildren = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

export const scrollViewport = { once: true, amount: 0.2 };
