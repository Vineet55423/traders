export interface Course {
  id: string;
  title: string;
  desc: string;
  features: string[];
  price: number;
}

export const courses: Course[] = [
  {
    id: "smc",
    title: "SMC (Smart Money Concepts)",
    desc: "Trade the way institutions do — map liquidity, spot order blocks, and time entries around smart-money footprints instead of retail indicators.",
    features: [
      "Institutional Trading",
      "Liquidity Mapping",
      "Order Blocks",
      "High-Probability Entries",
    ],
    price: 9999,
  },
  {
    id: "price-action",
    title: "Price Action",
    desc: "Strip away the indicators and learn to read the chart itself — candle by candle, structure by structure.",
    features: [
      "Pure Chart Reading",
      "Candlestick Mastery",
      "Market Structure",
      "Precision Entries",
    ],
    price: 9999,
  },
  {
    id: "psychology",
    title: "Psychology of Market",
    desc: "The strategy is rarely the problem. Build the emotional discipline and decision-making habits that keep you consistent under pressure.",
    features: [
      "Emotional Discipline",
      "Trader Mindset",
      "Decision Making",
      "Consistent Performance",
    ],
    price: 9999,
  },
  {
    id: "risk-management",
    title: "Risk Management",
    desc: "Protect your capital first, grow it second. Master position sizing and risk-to-reward so no single trade can hurt you.",
    features: [
      "Capital Protection",
      "Position Sizing",
      "Risk-to-Reward",
      "Loss Control",
    ],
    price: 9999,
  },
  {
    id: "advanced-msnr",
    title: "Advanced Concept (MSNR)",
    desc: "For traders ready to go beyond the basics — a multi-confirmation framework for precision execution in any market condition.",
    features: [
      "Advanced Market Analysis",
      "MSNR Strategy",
      "Multi-Confirmation Setup",
      "Precision Execution",
    ],
    price: 9999,
  },
];
