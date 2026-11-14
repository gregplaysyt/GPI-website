// Shared motion primitives, built from the GPI "Motion spec" panel:
//   - fade-up: y 24 -> 0, opacity 0 -> 1, 600ms, ease [0.22, 1, 0.36, 1]
//   - stagger: 0.08s between children, 0.05s delay, each child fades up
//   - counters: count up on first view, 1.2s ease-out
//   - reduced motion: keep opacity only, drop transforms and counters
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export const EASE = [0.22, 1, 0.36, 1];
export const VIEWPORT = { once: true, margin: '0px 0px -80px 0px' };

// Fade a block up as it scrolls into view.
export function Reveal({ children, className, style, delay = 0, ...rest }) {
  const reduce = useReducedMotion();
  const lift = typeof className === 'string' && className.includes('card');
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      whileHover={lift && !reduce ? { y: -4 } : undefined}
      viewport={VIEWPORT}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE, delay },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// A container whose children reveal one after another.
export function Stagger({ children, className, style, ...rest }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// One child inside a <Stagger>.
export function StaggerItem({ children, className, style, ...rest }) {
  const reduce = useReducedMotion();
  const lift = typeof className === 'string' && className.includes('card');
  return (
    <motion.div
      className={className}
      style={style}
      whileHover={lift && !reduce ? { y: -4 } : undefined}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// Count a number up from 0 when it first scrolls into view.
// Accepts a number, or a string like "300,000" and renders with commas.
export function CountUp({ to, duration = 1.2, prefix = '', suffix = '', ...rest }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT);
  const [value, setValue] = useState(0);

  const target = typeof to === 'number' ? to : parseFloat(String(to).replace(/[^0-9.]/g, '')) || 0;

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduce]);

  const formatted = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (
    <span ref={ref} {...rest}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
