import { motion } from "framer-motion";

interface GlitchHoverCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  active?: boolean;
}

export function GlitchHoverCard({
  children,
  className = "",
  style = {},
  active = false,
}: GlitchHoverCardProps) {
  return (
    <motion.div
      initial={{
        y: "-30%",
      }}
      animate={{
        y: active ? 0 : "0%",
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
      className={`relative overflow-hidden transition-colors duration-300 ${className} ${
        active ? "bg-primary/5" : ""
      }`}
      style={style}
    >
      <div
        className="absolute left-0 top-0 w-1 bg-primary transition-all duration-300"
        style={{
          height: active ? "100%" : "0%",
        }}
      />

      {children}
    </motion.div>
  );
}