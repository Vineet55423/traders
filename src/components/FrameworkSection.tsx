
import { motion } from "framer-motion";

const pillars = [
  {
    id: 1,
    tag: "TIMING",
    title: "Read price before you read headlines.",
    description:
      "Candlestick structure, volume confirmation, and session timing — the raw inputs that tell you when a move is actually starting, not just when it's already visible.",
  },
  {
    id: 2,
    tag: "TREND",
    title: "Trade with the current, not against it.",
    description:
      "Multi-timeframe trend mapping, moving average confluence, and structure breaks — so you know which direction has the odds, before you open a position.",
  },
  {
    id: 3,
    tag: "TRIGGER",
    title: "Rules decide. You just execute.",
    description:
      "Rules-based entry and exit triggers with pre-defined risk per trade — removing the split-second emotional decisions that cost most beginners their edge.",
  },
  {
    id: 4,
    tag: "TARGET",
    title: "Know your exit before your entry.",
    description:
      "Position sizing, scaling out, and portfolio-level targets — the discipline layer that turns single winning trades into a compounding, repeatable process.",
  },
];

const FrameworkSection = () => {
  return (
    <section className="min-h-screen bg-[#001008] px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mb-16 max-w-[620px]"
        >
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#baff00]"
          >
            The Framework
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[34px] font-bold leading-[0.98] tracking-[-0.035em] sm:text-[42px] lg:text-[48px]"
          >
            Four pillars. One repeatable
            <br className="hidden sm:block" /> process for reading any
            <br className="hidden sm:block" /> market.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 max-w-[440px] text-[13px] leading-[1.55] text-[#8e9b94]"
          >
            T4 isn't a slogan — it's the sequence every course, drill, and live
            session is built around, in order.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <div className="space-y-8">
          {pillars.map((pillar) => (
            // OUTER DIV
            <motion.div
              key={pillar.id}
              initial={{
                opacity: 0,
                y: 200,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.6,
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* INNER DIV */}
              <motion.div
                initial={{
                  borderColor: "#24352c",
                  boxShadow: "0 0 0px rgba(168, 230, 0, 0)",
                }}
                whileInView={{
                  borderColor: "#a8e600",
                  boxShadow:
                    "0 0 12px rgba(168,230,0,0.35), 0 0 35px rgba(168,230,0,0.15)",
                }}
                viewport={{
                  once: false,
                  amount: 0.8,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="
        relative flex min-h-[210px] items-center
        overflow-hidden rounded-[20px]
        border bg-[#06110b]
        px-7 py-9
        sm:px-10 lg:px-12
      "
              >
                <div className="relative z-10 flex w-full flex-col gap-7 sm:flex-row sm:items-center">
                  {/* T1 / T2 / T3 / T4 */}
                  <div className="w-[140px] shrink-0">
                    <motion.span
                      initial={{
                        color: "#06110b",
                      }}
                      whileInView={{
                        color: "#baff00",
                      }}
                      viewport={{
                        once: false,
                        amount: 0.8,
                      }}
                      transition={{
                        color: {
                          duration: 0.5,
                          delay: 0.35,
                          ease: "easeOut",
                        },
                      }}
                      className="
              inline-block
              font-serif
              text-[80px]
              leading-none
              tracking-[-0.08em]
              [-webkit-text-stroke:1px_#344139]
              sm:text-[92px]
            "
                    >
                      T
                      <span className="text-[55%] align-baseline">
                        {pillar.id}
                      </span>
                    </motion.span>
                  </div>

                  {/* Content */}
                  <div className="max-w-[750px]">
                    <span
                      className="
              mb-5 inline-flex rounded-full
              border border-[#668800]
              bg-[#263b00]
              px-4 py-1
              text-[8px] font-extrabold
              uppercase tracking-[0.16em]
              text-[#baff00]
            "
                    >
                      {pillar.tag}
                    </span>

                    <h3 className="text-[22px] font-bold leading-tight text-[#f2f5f2] sm:text-[26px]">
                      {pillar.title}
                    </h3>

                    <p className="mt-3 max-w-[720px] text-[12px] leading-[1.65] text-[#89958f] sm:text-[13px]">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrameworkSection;
