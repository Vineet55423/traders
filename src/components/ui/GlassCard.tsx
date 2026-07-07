import React from 'react';
import { cn } from './Button';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface GlassCardProps extends HTMLMotionProps<'div'> {
  glow?: boolean;
  children?: React.ReactNode;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative rounded-2xl bg-[#0a180f]/60 backdrop-blur-md border border-white/5 p-6',
          glow && 'shadow-[0_0_30px_rgba(50,205,50,0.1)] hover:shadow-[0_0_40px_rgba(50,205,50,0.2)] hover:border-primary/30 transition-all duration-300',
          className
        )}
        {...props}
      >
        {glow && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}
        <div className="relative z-10 h-full flex flex-col">{children}</div>
      </motion.div>
    );
  }
);
GlassCard.displayName = 'GlassCard';
