import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { GlassCard } from "../components/ui/GlassCard";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { StrobeText } from "../components/StrobeText";
import { MagneticIcon } from "../components/MagneticIcon";
import { Navbar } from "../components/Navbar";
import FrameworkSection from "../components/FrameworkSection";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

console.log(supabase);

export default function Home() {
  // const methodRef = useRef<HTMLDivElement>(null);
  // const [methodActive, setMethodActive] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".project-card") as HTMLElement[];
    const section = document.getElementById("section-5");

    if (!section || cards.length === 0) return;

    // Stagger initial z-index so later cards sit on top
    cards.forEach((card, i) => {
      gsap.set(card, { y: i === 0 ? "0%" : "110%", zIndex: i + 1 });
    });

    // Add extra scroll distance so the last card stays on screen before unpinning
    const extraReadTime = 1;
    const numAnimatedCards = cards.length - 1;
    const totalScroll = (numAnimatedCards + extraReadTime) * 100;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${totalScroll}%`,
      pin: section, // pins the section while cards cycle through
      scrub: 0.5, // ties progress directly to scroll position
      onUpdate: (self) => {
        const progress = self.progress;
        const perCard = 1 / (numAnimatedCards + extraReadTime);

        cards.forEach((card, i) => {
          if (i === 0) {
            gsap.set(card, { y: "0%", zIndex: 1 });
          } else {
            const start = (i - 1) * perCard;
            const p = Math.max(0, Math.min(1, (progress - start) / perCard));
            const yVal = (1 - p) * 130; // slides from 130% down to 0%
            gsap.set(card, { y: `${yVal}%`, zIndex: i + 1 });
          }
        });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const navigate = useNavigate();

  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       setMethodActive(entry.isIntersecting);
  //     },
  //     {
  //       threshold: 0.4,
  //     },
  //   );

  //   if (methodRef.current) {
  //     observer.observe(methodRef.current);
  //   }

  //   return () => observer.disconnect();
  // }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen text-foreground font-sans relative page-hero-bg">
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <Navbar session={session} handleLogout={handleLogout} isHome={true} />

         {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex flex-col items-center justify-center pt-12 pb-8 md:pt-24 md:pb-32 overflow-hidden"
        >
          <div className="relative z-10 text-center px-2 md:px-4 max-w-5xl mx-auto mt-16 pointer-events-none">
            <h1 className="text-4xl sm:text-5xl md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] font-['Belgin'] tracking-tight leading-[1] mb-6 md:mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              <StrobeText text="TRADE" className="text-accent" delay={0.2} />{" "}
              <StrobeText text="ON YOUR" className="text-white" delay={0.5} />
              <br />
              <StrobeText text="OWN" className="text-accent" delay={1.0} />{" "}
              <StrobeText text="TERMS" className="text-white" delay={1.3} />
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-gray-300 max-w-2xl mx-auto mb-2 md:mb-6 text-xs md:text-sm drop-shadow-md"
            >
              T4 traders teach a disciplined and four- part method -Timing,
              Trend ,Trigger and Target. Read by 12000+ Students to read markets
              , manage risks and stop guessing .
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 pointer-events-auto"
            >
              {/* Start Learning */}
              <Link
                to="/course"
                className="w-[190px] sm:w-auto flex justify-center"
              >
                <Button className="w-full sm:w-auto h-10 md:h-[50px] rounded-full bg-white text-black hover:bg-gray-100 flex items-center justify-center px-5 md:px-6 text-sm md:text-base font-medium gap-2 group shadow-xl hover:shadow-2xl transition-all">
                  <span>Start Learning</span>

                  <span className="flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full bg-[#83d483] group-hover:bg-[#91df91] transition-colors">
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-[#113816]" />
                  </span>
                </Button>
              </Link>

              {/* Free Trial */}
              <Link
                to="/free-trial"
                className="w-[190px] sm:w-auto flex justify-center"
              >
                <Button
                  variant="outline"
                  className="w-auto px-5 md:px-6 h-10 md:h-[44px] text-xs md:text-sm rounded-full border border-white text-white hover:bg-white/10 font-medium bg-black/20 backdrop-blur-sm"
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
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
            className="flex w-max whitespace-nowrap text-gray-500 font-mono font-bold uppercase tracking-widest text-sm"
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="flex items-center space-x-12 pr-12">
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
          className="py-4 md:py-16 relative bg-white/5 backdrop-blur-sm border-b border-white/5"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8 divide-x divide-white/10 text-center">
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

        <FrameworkSection />

        {/* features section Section */}
        <section
          id="features"
          className="py-6 md:py-24 relative overflow-hidden bg-black/40 border-y border-white/5 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto p-7 md:px-10">
            <div className="grid md:grid-cols-2 gap-4 md:gap-16 items-center">
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
                    <div className="absolute -left-[38px] top-1.5 w-3 h-6 bg-primary rounded-sm shadow-[0_0_10px_rgba(50,205,50,0.5)]"></div>
                    <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                    <p className="text-gray-400">
                      To empower aspiring traders with practical knowledge and
                      confidence to make informed trading decisions.
                    </p>
                  </div>
                  <div className="relative mt-8">
                    <div className="absolute -left-[38px] top-1.5 w-3 h-6 bg-red-600 rounded-sm shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
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
                className="relative rounded-2xl overflow-hidden border border-white/10 w-full aspect-[21/9] md:aspect-auto md:h-full"
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
          className="py-6 md:py-24 relative overflow-hidden bg-black/2 border-b border-white/5 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto p-7 md:px-10">
            <div className="mb-6 md:mb-16">
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
                  aspect: "aspect-[16/10] md:aspect-[21/9]",
                },
                {
                  title: "Dashboard & screener setup",
                  img: "/dashboard_screener.png",
                  span: "lg:col-span-2",
                  aspect: "aspect-[16/10] md:aspect-[21/9]",
                },
                {
                  title: "Momentum & signal drills",
                  img: "/dashboard_screener.png",
                  span: "lg:col-span-2",
                  aspect: "aspect-[16/10] md:aspect-[21/9]",
                },
                {
                  title: "Paired trade review",
                  img: "/paired_review.png",
                  span: "lg:col-span-2",
                  aspect: "aspect-[16/10] md:aspect-[21/9]",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl overflow-hidden group border border-white/10 w-full aspect-[21/9] md:aspect-[21/9] ${item.span}`}
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

        {/* Review Section */}
        <section
          id="review"
          className="py-6 md:py-24 relative overflow-hidden border-b border-white/5"
        >
          <div className="max-w-7xl mx-auto p-7 md:px-10 mb-6 md:mb-16">
            <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">
              Student Review
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
                transition={{
                  repeat: Infinity,
                  duration: 40,
                  ease: "linear",
                  repeatType: "reverse",
                }}
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
        <section
          id="team"
          className="py-16 md:py-32 relative overflow-hidden bg-black"
        >
          <div className="max-w-4xl mx-auto px-6 md:px-10 relative z-10">
            <div className="text-center mb-16">
              <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">
                The Experts Behind T4
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Meet Our <span className="text-primary">Mentors</span>
              </h2>
            </div>

            {/* Split Screen Accordion Container */}
            <div className="group flex flex-col md:flex-row w-full h-[600px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#0a0a0a]">
              {/* Member 1 (Left / Top) */}
              <div className="group/member w-full h-1/2 md:w-1/2 md:h-full group-hover:h-0 md:group-hover:h-full md:group-hover:w-0 hover:!h-full md:hover:!w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] relative overflow-hidden cursor-pointer border-b md:border-b-0 md:border-r border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                <img
                  src="https://i.pravatar.cc/800?img=11"
                  alt="Rahul Sharma"
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-70 group-hover/member:opacity-100 group-hover/member:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-end">
                  <div className="transform md:translate-y-16 group-hover/member:translate-y-0 transition-transform duration-700">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 whitespace-nowrap">
                      Rahul Sharma
                    </h3>
                    <p className="text-primary font-mono text-sm tracking-wider uppercase mb-6 whitespace-nowrap">
                      Senior Price Action Expert
                    </p>

                    <div className="opacity-0 group-hover/member:opacity-100 transition-opacity duration-700 md:delay-100 max-w-md h-0 group-hover/member:h-auto overflow-hidden">
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                        Master of pure price action. Rahul simplifies complex
                        market structures into highly actionable, rules-based
                        strategies. He has been helping students since 2018 with
                        a focus on risk management.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Member 2 (Right / Bottom) */}
              <div className="group/member w-full h-1/2 md:w-1/2 md:h-full group-hover:h-0 md:group-hover:h-full md:group-hover:w-0 hover:!h-full md:hover:!w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] relative overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                <img
                  src="https://i.pravatar.cc/800?img=12"
                  alt="Ananya Desai"
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-70 group-hover/member:opacity-100 group-hover/member:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-end">
                  <div className="transform md:translate-y-16 group-hover/member:translate-y-0 transition-transform duration-700">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 whitespace-nowrap">
                      Ananya Desai
                    </h3>
                    <p className="text-primary font-mono text-sm tracking-wider uppercase mb-6 whitespace-nowrap">
                      Options & Derivatives
                    </p>

                    <div className="opacity-0 group-hover/member:opacity-100 transition-opacity duration-700 md:delay-100 max-w-md h-0 group-hover/member:h-auto overflow-hidden">
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                        Specializes in delta-neutral and directional options
                        strategies. She helps students manage risk while
                        maximizing leverage using systematic trading algorithms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="py-6 md:py-24 relative border-t border-white/10"
        >
          <div className="max-w-3xl mx-auto p-7 md:px-10">
            <div className="text-center mb-6 md:mb-16">
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

        {/* Footer / Contact */}
        <footer
          id="footer"
          className="bg-[#020703] border-t border-white/10 pt-10 md:pt-16 pb-6 md:pb-8"
        >
          <div className="max-w-7xl mx-auto p-7 md:px-10 grid md:grid-cols-6 gap-8 md:gap-12 mb-4 md:mb-12">
            <div className="md:col-span-4">
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

            {/* <div>
              <h4 className="font-bold mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
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
            </div> */}

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
