import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#020703]">
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* SVG Candlestick Pattern at top */}
      <div className="absolute top-0 left-0 right-0 h-64 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="candlesticks" x="0" y="0" width="120" height="200" patternUnits="userSpaceOnUse">
              {/* Green candle 1 */}
              <line x1="20" y1="40" x2="20" y2="100" stroke="#22c55e" strokeWidth="2" />
              <rect x="15" y="50" width="10" height="40" fill="#22c55e" />
              
              {/* Green candle 2 */}
              <line x1="60" y1="20" x2="60" y2="80" stroke="#22c55e" strokeWidth="2" />
              <rect x="55" y="30" width="10" height="30" fill="#22c55e" />
              
              {/* Green candle 3 */}
              <line x1="100" y1="60" x2="100" y2="120" stroke="#22c55e" strokeWidth="2" />
              <rect x="95" y="70" width="10" height="35" fill="#22c55e" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#candlesticks)" />
        </svg>
      </div>

      {/* Animated Glowing Orbs */}
      <motion.div 
        className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.9, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]"
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 100, -50, 0],
          scale: [1, 1.1, 0.8, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-[10%] left-[30%] w-[600px] h-[600px] rounded-full bg-primary/15 blur-[150px]"
        animate={{
          x: [0, 50, -100, 0],
          y: [0, -100, 50, 0],
          scale: [1, 0.9, 1.2, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
