import { motion } from 'framer-motion';

interface StrobeTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export function StrobeText({ text, delay = 0, className = '' }: StrobeTextProps) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.08,
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}
