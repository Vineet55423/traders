import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { GlassCard } from "../components/ui/GlassCard";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { StrobeText } from "../components/StrobeText";
import { GlitchHoverCard } from "../components/GlitchHoverCard";
import { MagneticIcon } from "../components/MagneticIcon";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const methodRef = useRef<HTMLDivElement>(null);
  const [methodActive, setMethodActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setMethodActive(entry.isIntersecting);
      },
      {
        threshold: 0.4,
      },
    );

    if (methodRef.current) {
      observer.observe(methodRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen text-foreground font-sans relative"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "100% auto",
        backgroundPosition: "center -150px",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 p-6 pt-8">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 relative">
            <div className="flex items-center space-x-1 z-10">
              <div className="text-3xl font-serif text-white tracking-wide flex items-start">
                T<span className="text-xl font-sans mt-0.5 ml-0.5">4</span>
                Trader
              </div>
            </div>

            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center gap-16 bg-white/10 backdrop-blur-md border border-white/10 px-12 py-2.5 rounded-full shadow-lg z-10">
              <a
                href="#home"
                className="text-sm font-medium hover:text-white transition-colors text-white"
              >
                Home
              </a>
              <Link
                to="/course"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                Course
              </Link>
              <a
                href="#about"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#faq"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                Help
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4 z-10">
              <Link
                to="/login"
                className="text-xs md:text-sm font-medium bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 md:px-6 md:py-3 rounded-full text-white/80 hover:text-white transition-colors shadow-lg"
              >
                Register/Login
              </Link>
              <Link to="/free-trial">
                <Button
                  variant="outline"
                  className="px-4 py-2 md:px-6 md:py-3 h-auto text-xs md:text-sm bg-transparent border-white/40 text-white hover:bg-white/10 rounded-full font-medium transition-colors"
                >
                  Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-32 overflow-hidden"
        >
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
            <h1 className="text-5xl sm:text-[4.5rem] md:text-[6.5rem] font-serif tracking-tight leading-[1.1] mb-6 md:mb-8">
              <StrobeText text="TRADE" className="text-accent" delay={0.2} />{" "}
              <StrobeText text="ON YOUR" className="text-white" delay={0.5} />
              <br />
              <StrobeText text="OWN" className="text-accent" delay={1.0} />{" "}
              <StrobeText text="TERMS" className="text-white" delay={1.3} />
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-6 text-white max-w-xl mx-auto text-sm md:text-sm leading-relaxed font-sans font-light opacity-90"
            >
              T4 traders teach a disciplined and four- part method -Timing,
              <br className="hidden md:block" />
              Trend ,Trigger and Target. Read by 12000+ Students to read
              <br className="hidden md:block" />
              markets , manage risks and stop guessing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:space-x-4 space-x-0"
            >
              <Link to="/course" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto px-1.5 py-1.5 h-[52px] rounded-full bg-white text-black hover:bg-gray-100 flex items-center justify-between sm:justify-start pl-6 font-medium border-0 gap-3 group shadow-xl hover:shadow-2xl !transition-all">
                  Start Learning
                  <span className="w-[40px] h-[40px] rounded-full bg-[#83d483] flex items-center justify-center border-0 group-hover:bg-[#91df91] transition-colors shadow-none text-[#113816]">
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
              </Link>
              <Link to="/free-trial" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full px-8 h-[52px] rounded-full border border-white text-white hover:bg-white/10 font-medium bg-black/20 backdrop-blur-sm"
                >
                  Free Trial
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Ticker Tape */}
          <div className="absolute bottom-10 left-0 right-0 z-10 overflow-hidden flex py-4 border-y border-white/5 bg-background/50 backdrop-blur-sm">
            <motion.div
              animate={{ x: [10, -500] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex space-x-8 whitespace-nowrap text-sm tracking-widest font-mono"
            >
              {[
                {
                  sym: "NIFTY 50",
                  price: "24,812.30",
                  dir: "up",
                  chg: "+0.64%",
                },
                { sym: "SENSEX", price: "81,547.15", dir: "up", chg: "+0.58%" },
                {
                  sym: "BANKNIFTY",
                  price: "52,304.80",
                  dir: "down",
                  chg: "-0.21%",
                },
                {
                  sym: "RELIANCE",
                  price: "2,981.40",
                  dir: "up",
                  chg: "+1.12%",
                },
                { sym: "TCS", price: "3,845.60", dir: "down", chg: "-0.34%" },
                {
                  sym: "HDFCBANK",
                  price: "1,672.25",
                  dir: "up",
                  chg: "+0.87%",
                },
                { sym: "INFY", price: "1,504.90", dir: "down", chg: "-0.12%" },
                {
                  sym: "ICICIBANK",
                  price: "1,238.55",
                  dir: "up",
                  chg: "+0.46%",
                },
              ].map((t, i) => (
                <span key={i} className="flex items-center space-x-2">
                  <strong className="text-white">{t.sym}</strong>
                  <span
                    className={t.dir === "up" ? "text-primary" : "text-red-500"}
                  >
                    {t.price} {t.dir === "up" ? "▲" : "▼"} {t.chg}
                  </span>
                </span>
              ))}
              {[
                {
                  sym: "NIFTY 50",
                  price: "24,812.30",
                  dir: "up",
                  chg: "+0.64%",
                },
                { sym: "SENSEX", price: "81,547.15", dir: "up", chg: "+0.58%" },
                {
                  sym: "BANKNIFTY",
                  price: "52,304.80",
                  dir: "down",
                  chg: "-0.21%",
                },
                {
                  sym: "RELIANCE",
                  price: "2,981.40",
                  dir: "up",
                  chg: "+1.12%",
                },
                { sym: "TCS", price: "3,845.60", dir: "down", chg: "-0.34%" },
                {
                  sym: "HDFCBANK",
                  price: "1,672.25",
                  dir: "up",
                  chg: "+0.87%",
                },
                { sym: "INFY", price: "1,504.90", dir: "down", chg: "-0.12%" },
                {
                  sym: "ICICIBANK",
                  price: "1,238.55",
                  dir: "up",
                  chg: "+0.46%",
                },
              ].map((t, i) => (
                <span key={i + 8} className="flex items-center space-x-2">
                  <strong className="text-white">{t.sym}</strong>
                  <span
                    className={t.dir === "up" ? "text-primary" : "text-red-500"}
                  >
                    {t.price} {t.dir === "up" ? "▲" : "▼"} {t.chg}
                  </span>
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Word Marquee Section */}
        <section className="py-6 border-b border-white/5 overflow-hidden">
          <motion.div
            animate={{ x: [-100, 1000] }}
            transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
            className="flex space-x-12 whitespace-nowrap text-gray-500 font-mono font-bold uppercase tracking-widest text-sm"
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="flex items-center space-x-12">
                <span>SMC</span>
                <span className="text-primary text-xs">✦</span>
                <span>Price Action</span>
                <span className="text-primary text-xs">✦</span>
                <span>Psychology of Market</span>
                <span className="text-primary text-xs">✦</span>
                <span>Risk Management</span>
                <span className="text-primary text-xs">✦</span>
                <span>Advanced Concept (MSNR)</span>
                <span className="text-primary text-xs">✦</span>
              </span>
            ))}
          </motion.div>
        </section>

        {/* Stats Section */}
        <section
          id="stats"
          className="py-16 relative bg-white/5 backdrop-blur-sm border-b border-white/5"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 divide-x divide-white/10 text-center">
              {[
                { num: "12,400+", label: "Students trained" },
                { num: "4.8/5", label: "Average course rating" },
                { num: "6 yrs", label: "Track record" },
                { num: "3/wk", label: "Live trading sessions" },
              ].map((stat, i) => (
                <div key={i} className="px-2 md:px-4">
                  <div className="text-3xl md:text-5xl font-serif text-primary font-medium mb-2 md:mb-3">
                    {stat.num}
                  </div>
                  <div className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 font-mono leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Method Section */}
        <section
          id="method"
          ref={methodRef}
          className="py-24 relative border-b border-white/5"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-16">
              <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">
                The framework
              </span>

              <h2 className="text-3xl md:text-5xl font-bold max-w-2xl">
                Four pillars. One repeatable process for reading any market.
              </h2>

              <p className="text-gray-400 mt-4 max-w-md">
                T4 isn't a slogan — it's the sequence every course, drill, and
                live session is built around, in order.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  num: "T1",
                  tag: "Timing",
                  title: "Read price before you read headlines.",
                  desc: "Candlestick structure, volume confirmation, and session timing — the raw inputs that tell you when a move is actually starting, not just when it's already visible.",
                },
                {
                  num: "T2",
                  tag: "Trend",
                  title: "Trade with the current, not against it.",
                  desc: "Multi-timeframe trend mapping, moving average confluence, and structure breaks — so you know which direction has the odds, before you open a position.",
                },
                {
                  num: "T3",
                  tag: "Trigger",
                  title: "Rules decide. You just execute.",
                  desc: "Rules-based entry and exit triggers with pre-defined risk per trade — removing the split-second emotional decisions that cost most beginners their edge.",
                },
                {
                  num: "T4",
                  tag: "Target",
                  title: "Know your exit before your entry.",
                  desc: "Position sizing, scaling out, and portfolio-level targets — the discipline layer that turns single winning trades into a compounding, repeatable process.",
                },
              ].map((method, i) => (
                <GlitchHoverCard
                  key={i}
                  active={methodActive}
                  className="sticky grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 items-center py-8 md:py-12 px-4 md:px-6 rounded-2xl text-center md:text-left bg-black/80 backdrop-blur-md shadow-[0_-10px_25px_rgba(0,0,0,0.1)] border border-white/10 group"
                  style={{
                    top: `calc(100px + ${i * 40}px)`,
                    zIndex: i + 10,
                  }}
                >
                  <div
                    className="text-[4rem] md:text-[7rem] font-serif font-bold text-transparent transition-all duration-500"
                    style={{
                      WebkitTextStroke: methodActive
                        ? "0"
                        : "1px rgba(255,255,255,0.2)",
                    }}
                  >
                    <span
                      className={`transition-colors duration-500 ${
                        methodActive ? "text-primary" : "text-transparent"
                      }`}
                    >
                      {method.num}
                    </span>
                  </div>

                  <div>
                    <span className="text-primary font-mono text-xs tracking-widest uppercase mb-3 block">
                      {method.tag}
                    </span>

                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      {method.title}
                    </h3>

                    <p className="text-gray-400 max-w-xl">{method.desc}</p>
                  </div>
                </GlitchHoverCard>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-24 relative overflow-hidden bg-black/40 border-y border-white/5 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 flex">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  EMPOWERING{" "}
                  <span className="text-gray-400 font-light">
                    THE NEXT GENERATION OF
                  </span>{" "}
                  <span className="text-accent">TRADERS</span>
                </h2>
                <p className="text-gray-400 mb-20 leading-relaxed">
                  T4 Traders is a professional trading education institute
                  dedicated to helping individuals understand financial markets
                  through practical, structured, and industry-focused learning.
                </p>

                <div className="space-y-8 relative pl-8 border-l border-white/10">
                  <div className="relative">
                    <div className="absolute -left-[41px] top-1 w-4 h-8 bg-primary rounded-sm shadow-[0_0_10px_rgba(50,205,50,0.5)]"></div>
                    <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                    <p className="text-gray-400">
                      To empower aspiring traders with practical knowledge and
                      confidence to make informed trading decisions.
                    </p>
                  </div>
                  <div className="relative mt-8">
                    <div className="absolute -left-[41px] top-1 w-4 h-8 bg-red-600 rounded-sm shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
                    <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
                    <p className="text-gray-400">
                      To become one of the most trusted trading education
                      institutes by delivering high-quality learning experiences
                      and measurable student success.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video md:aspect-auto md:h-full"
              >
                <img
                  src="/about_trading.png"
                  alt="Trading Session"
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section
          id="gallery"
          className="py-24 relative overflow-hidden bg-black/40 border-b border-white/5 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-16">
              <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">
                Inside T4
              </span>
              <h2 className="text-3xl md:text-5xl font-bold max-w-2xl">
                Less webinar, more trading floor.
              </h2>
              <p className="text-gray-400 mt-4 max-w-md">
                Cohorts meet live. Screens stay open. This is what a session
                actually looks like.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "Live chart walkthroughs",
                  img: "/chart_walkthroughs.png",
                  span: "lg:col-span-2",
                  aspect: "aspect-[21/9]",
                },
                {
                  title: "Dashboard & screener setup",
                  img: "/dashboard_screener.png",
                  span: "lg:col-span-2",
                  aspect: "aspect-[21/9]",
                },
                {
                  title: "Momentum & signal drills",
                  img: "/dashboard_screener.png",
                  span: "lg:col-span-2",
                  aspect: "aspect-[21/9]",
                },
                {
                  title: "Paired trade review",
                  img: "/paired_review.png",
                  span: "lg:col-span-2",
                  aspect: "aspect-[21/9]",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl overflow-hidden group border border-white/10 ${item.span} ${item.aspect}`}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                  <span className="absolute bottom-6 left-6 font-mono text-xs tracking-widest uppercase text-gray-300 z-10">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section
          id="results"
          className="py-24 relative overflow-hidden border-b border-white/5"
        >
          <div className="max-w-7xl mx-auto px-4 mb-16">
            <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">
              Student results
            </span>
            <h2 className="text-3xl md:text-5xl font-bold max-w-2xl">
              Confidence, not certainty. That's what a system gives you.
            </h2>
          </div>

          <div className="relative w-full overflow-hidden flex flex-col gap-6 py-4">
            {[
              [
                {
                  q: "The order block concepts in SMC stopped me from chasing every breakout. That alone paid for the course.",
                  n: "Karan V.",
                  r: "SMC",
                },
                {
                  q: "First time a trading course actually explained when to exit, not just when to enter.",
                  n: "Meera S.",
                  r: "Risk Management",
                },
                {
                  q: "The live desk sessions inside SMC are worth it alone — watching a trade plan happen in real time.",
                  n: "Aditya R.",
                  r: "SMC",
                },
                {
                  q: "I finally have a written process I follow instead of reacting to every candle.",
                  n: "Simran K.",
                  r: "Price Action",
                },
              ],
              [
                {
                  q: "Price Action made chart reading click in a way three YouTube channels never did.",
                  n: "Farhan A.",
                  r: "Price Action",
                },
                {
                  q: "Risk Management changed my position sizing completely. Fewer, better trades now.",
                  n: "Neha J.",
                  r: "Risk Management",
                },
                {
                  q: "The Psychology of Market module fixed more of my trading than any strategy course did.",
                  n: "Vikram T.",
                  r: "Psychology of Market",
                },
                {
                  q: "MSNR is dense, but it's the first advanced course that didn't feel like recycled basics.",
                  n: "Ananya D.",
                  r: "Advanced Concept (MSNR)",
                },
              ],
            ].map((row, i) => (
              <motion.div
                key={i}
                animate={{ x: i % 2 === 0 ? [0, -1000] : [-1000, 0] }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                className="flex gap-6 w-max"
              >
                {[...row, ...row].map((t, j) => (
                  <GlassCard
                    key={j}
                    className="w-[85vw] md:w-[420px] p-6 md:p-8 bg-white/5 border-white/10 shrink-0 shadow-lg flex flex-col justify-between whitespace-normal"
                  >
                    <p className="font-serif italic text-base md:text-lg leading-relaxed text-gray-200 mb-6 md:mb-8">
                      "{t.q}"
                    </p>
                    <div className="font-mono text-xs tracking-widest uppercase text-gray-400 mt-auto">
                      {t.n} ·{" "}
                      <span className="text-primary font-bold">{t.r}</span>
                    </div>
                  </GlassCard>
                ))}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 overflow-hidden">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Meet Our <span className="text-primary">Team</span>
            </h2>

            <h3 className="text-xl font-semibold mb-6 text-gray-400 border-b border-white/10 pb-2">
              Teaching Mentors
            </h3>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {[1, 2].map((i) => (
                <GlassCard key={i} className="flex items-center space-x-6">
                  <div className="w-24 h-24 rounded-full bg-white/10 flex-shrink-0 border-2 border-primary/50 overflow-hidden">
                    <img
                      src={`https://i.pravatar.cc/150?img=${i + 10}`}
                      alt="Mentor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Rahul Sharma</h4>
                    <p className="text-primary text-sm mb-2">
                      Senior Trading Mentor
                    </p>
                    <p className="text-gray-400 text-xs">
                      Such a good vibe got from this Coaching experience I have
                      got from this Coaching. Helping students since 2018.
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-6 text-gray-400 border-b border-white/10 pb-2">
              Technical Team
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <GlassCard key={i} className="text-center p-4">
                  <div className="w-20 h-20 rounded-full bg-white/10 mx-auto mb-4 border border-white/20 overflow-hidden">
                    <img
                      src={`https://i.pravatar.cc/150?img=${i + 20}`}
                      alt="Tech Member"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-sm">Tech Member {i}</h4>
                  <p className="text-gray-500 text-xs">Support Analyst</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 relative border-t border-white/10">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">
                Questions
              </span>
              <h2 className="text-3xl md:text-5xl font-bold">
                Before you start.
              </h2>
            </div>

            <div className="space-y-2">
              {[
                {
                  q: "Do I need any trading experience to start?",
                  a: "No. Price Action assumes zero experience and builds up from how to read a candle to your first rules-based trade plan.",
                },
                {
                  q: "Which markets does the T4 Method apply to?",
                  a: "The framework is built and taught using NSE and BSE equity and derivatives examples, but the same four-pillar process applies to any liquid market.",
                },
                {
                  q: "Is this financial advice?",
                  a: "No. T4 Traders provides trading education only. Trading involves risk, and nothing taught in these courses guarantees profit.",
                },
                {
                  q: "Can I upgrade to a higher track later?",
                  a: "Yes — most students start with Price Action and add SMC, Risk Management, or the Advanced Concept course once they've decided trading is worth the deeper commitment.",
                },
                {
                  q: "How do live sessions work?",
                  a: "Live sessions run three times a week during market hours, streamed to the student portal, with recordings available within an hour for anyone who misses one.",
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="group border-b border-white/10 [&_summary::-webkit-details-marker]:hidden cursor-pointer bg-white/5 rounded-lg px-6"
                >
                  <summary className="flex items-center justify-between py-6 text-lg font-medium outline-none">
                    {faq.q}
                    <span className="relative ml-4 shrink-0 transition duration-300 group-open:-rotate-180 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 opacity-70"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="pb-6 text-gray-400 leading-relaxed group-open:animate-fadeIn">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section
          id="final-cta"
          className="py-32 relative text-center overflow-hidden border-t border-white/5"
        >
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="flex space-x-12 whitespace-nowrap mb-16 opacity-30"
            >
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className="text-4xl md:text-[6rem] font-serif italic text-white font-light"
                >
                  Start the T4 Method ✦ Trade with a system ✦
                </span>
              ))}
            </motion.div>

            <Link to="/course">
              <Button className="px-10 py-6 h-auto text-lg rounded-full bg-primary text-black hover:bg-primary/90 font-bold tracking-wide">
                Start the T4 Method
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer / Contact */}
        <footer
          id="contact"
          className="bg-[#020703] border-t border-white/10 pt-16 pb-8"
        >
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-bold tracking-tighter mb-6">
                <span className="text-white">T4</span>
                <span className="text-primary font-light">Traders</span>
              </div>
              <p className="text-gray-500 text-sm mb-6">
                Your pathway to professional trading. Master the markets with
                our disciplined four-part method.
              </p>
              <div className="flex space-x-4">
                <MagneticIcon href="#">
                  <span className="sr-only">Twitter</span>
                  <div className="w-4 h-4 bg-gray-400 rounded-sm group-hover:bg-primary transition-colors"></div>
                </MagneticIcon>
                <MagneticIcon href="#">
                  <span className="sr-only">LinkedIn</span>
                  <div className="w-4 h-4 bg-gray-400 rounded-sm group-hover:bg-primary transition-colors"></div>
                </MagneticIcon>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white">Programs</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Beginner Program
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Intermediate Course
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Advanced Strategies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Offline Bootcamps
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <a
                    href="#about"
                    className="hover:text-primary transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#team"
                    className="hover:text-primary transition-colors"
                  >
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white">Contact Us</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li className="flex items-start">
                  <MapPin className="w-4 h-4 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span>123 Trading Street, Financial District, NY 10004</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                  <span>support@t4traders.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} T4 Traders. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-400">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-400">
                Terms of Service
              </a>
              <a href="#" className="hover:text-gray-400">
                Risk Warning
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
