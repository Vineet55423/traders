import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxGalleryItemProps {
  title: string;
  img: string;
  span: string;
  aspect: string;
  index: number;
}

export function ParallaxGalleryItem({ title, img, span, aspect, index }: ParallaxGalleryItemProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Calculate different parallax speeds based on index
  const yOffset = (index % 2 === 0) ? 50 : -50;
  const y = useTransform(scrollYProgress, [0, 1], [-yOffset, yOffset]);

  return (
    <motion.div 
      ref={ref}
      style={{ y }}
      className={`relative rounded-2xl overflow-hidden group border border-white/10 ${span} ${aspect}`}
    >
      <img src={img} alt={title} className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
      <span className="absolute bottom-6 left-6 font-mono text-xs tracking-widest uppercase text-gray-300 z-10">{title}</span>
    </motion.div>
  );
}
