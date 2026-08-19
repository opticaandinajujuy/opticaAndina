import { useEffect, useState } from 'react';
import { animate } from 'framer-motion';

function Counter({ value, suffix = '', duration = 1.6, trigger }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [trigger, value, duration]);

  return <span>{display}{suffix}</span>;
}

export default Counter;
