import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface GlitchHoverCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function GlitchHoverCard({ children, className = '', style = {} }: GlitchHoverCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const glitchInterval = useRef<number | null>(null);

  const triggerGlitch = async () => {
    // Perform rapid horizontal shifts
    let count = 0;
    glitchInterval.current = window.setInterval(async () => {
      const shift = Math.random() > 0.5 ? 4 : -4;
      await controls.set({ x: shift });
      count++;
      if (count > 5) {
        if (glitchInterval.current !== null) {
          clearInterval(glitchInterval.current);
        }
        await controls.set({ x: 0 }); // reset
      }
    }, 55);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    triggerGlitch();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (glitchInterval.current !== null) {
      clearInterval(glitchInterval.current);
    }
    controls.set({ x: 0 });
  };

  useEffect(() => {
    return () => {
      if (glitchInterval.current !== null) {
        clearInterval(glitchInterval.current);
      }
    };
  }, []);

  return (
    <motion.div
      animate={controls}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-colors duration-300 ${className} ${isHovered ? 'bg-primary/5' : ''}`}
      style={style}
    >
      {/* Left accent bar mimicking the makedo-v2.html hover effect */}
      <div 
        className="absolute left-0 top-0 w-1 bg-primary transition-all duration-400 ease-out"
        style={{ height: isHovered ? '100%' : '0%' }}
      />
      {children}
    </motion.div>
  );
}
