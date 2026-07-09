import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { CheckCircle2, ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

export default function Course() {
  return (
    <div
      className="min-h-screen text-foreground font-sans relative"
      style={{ backgroundImage: "url('/bg.png')", backgroundSize: '100% auto', backgroundPosition: 'center -150px', backgroundAttachment: 'fixed' }}
    >
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 p-6 pt-8">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 relative">
            <div className="flex items-center space-x-1 z-10">
              <Link to="/" className="text-3xl font-serif text-white tracking-wide flex items-start">
                T<span className="text-xl font-sans mt-0.5 ml-0.5">4</span>Trader
              </Link>
            </div>

            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center gap-16 bg-white/10 backdrop-blur-md border border-white/10 px-12 py-2.5 rounded-full shadow-lg z-10">
              <Link to="/" className="text-sm font-medium hover:text-white transition-colors text-white/70">Home</Link>
              <Link to="/course" className="text-sm font-medium text-white hover:text-white transition-colors">Course</Link>
              <Link to="/#team" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Team</Link>
              <Link to="/#faq" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Help</Link>
              <Link to="/#contact" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Contact</Link>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4 z-10">
              <Link to="/login" className="text-xs md:text-sm font-medium bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 md:px-6 md:py-3 rounded-full text-white/80 hover:text-white transition-colors shadow-lg">Register/Login</Link>
              <Link to="/free-trial">
                <Button variant="outline" className="px-4 py-2 md:px-6 md:py-3 h-auto text-xs md:text-sm bg-transparent border-white/40 text-white hover:bg-white/10 rounded-full font-medium transition-colors">Free Trial</Button>
              </Link>
            </div>
          </div>
        </nav>

        <div className="pt-32">
          {/* Courses Section */}
          <section id="course" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">LEARN TRADING WITH <span className="text-primary">INDUSTRY PROFESSIONALS</span></h2>
                <p className="text-gray-400 max-w-2xl mx-auto">Choose the learning path that matches your experience. Whether you're just starting or looking to master advanced trading strategies.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "SMC (Smart Money Concepts)",
                    desc: "Trade the way institutions do — map liquidity, spot order blocks, and time entries around smart-money footprints instead of retail indicators.",
                    features: ["Institutional Trading", "Liquidity Mapping", "Order Blocks", "High-Probability Entries"]
                  },
                  {
                    title: "Price Action",
                    desc: "Strip away the indicators and learn to read the chart itself — candle by candle, structure by structure.",
                    features: ["Pure Chart Reading", "Candlestick Mastery", "Market Structure", "Precision Entries"]
                  },
                  {
                    title: "Psychology of Market",
                    desc: "The strategy is rarely the problem. Build the emotional discipline and decision-making habits that keep you consistent under pressure.",
                    features: ["Emotional Discipline", "Trader Mindset", "Decision Making", "Consistent Performance"]
                  },
                  {
                    title: "Risk Management",
                    desc: "Protect your capital first, grow it second. Master position sizing and risk-to-reward so no single trade can hurt you.",
                    features: ["Capital Protection", "Position Sizing", "Risk-to-Reward", "Loss Control"]
                  },
                  {
                    title: "Advanced Concept (MSNR)",
                    desc: "For traders ready to go beyond the basics — a multi-confirmation framework for precision execution in any market condition.",
                    features: ["Advanced Market Analysis", "MSNR Strategy", "Multi-Confirmation Setup", "Precision Execution"]
                  }
                ].map((course, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative h-full group"
                  >
                    <div className="animated-border-box-glow"></div>
                    <div className="animated-border-box"></div>
                    <GlassCard glow className="relative z-10 flex flex-col h-full bg-transparent border-0 shadow-none hover:shadow-none hover:border-transparent">
                      <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-400 mb-6 flex-grow">{course.desc}</p>
                      <ul className="space-y-3 mb-8">
                        {course.features.map((item, j) => (
                          <li key={j} className="flex items-center text-sm text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full justify-between group mt-auto">
                        Enroll Now
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="relative rounded-2xl overflow-hidden h-48 md:h-64 group cursor-pointer border border-white/10">
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors z-10" />
                  <img src="/offline_training.png" alt="Offline Training" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-2xl font-bold mb-2">Offline Classroom Training</h3>
                    <p className="text-sm text-gray-300">Experience classroom learning with direct mentor interaction, live discussions, and practical market sessions.</p>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden h-48 md:h-64 group cursor-pointer border border-white/10">
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors z-10" />
                  <img src="/online_classes.png" alt="Online Live Classes" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-2xl font-bold mb-2">Online Live Classes</h3>
                    <p className="text-sm text-gray-300">Attend live sessions from anywhere with complete access to recordings and study material.</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 md:mt-24 flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-12 md:pt-16">
                <div className="max-w-xl text-center md:text-left">
                  <h3 className="text-3xl font-bold mb-4 border border-white/20 inline-block px-6 py-3 rounded-full text-gray-300 bg-white/5">Not sure where to start?</h3>
                  <p className="text-gray-400 mt-6 mb-8">Take a free counseling session and our experts will recommend the perfect course for your experience level.</p>
                  <Link to="/consultation">
                    <Button variant="outline" className="rounded-full px-6 py-6 group text-white border-white/20 hover:bg-white/10 w-full sm:w-auto">
                      Book Free Consultation <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                <div className="text-[12rem] font-light text-primary/20 opacity-50 select-none hidden md:block">?</div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer / Contact */}
        <footer id="contact" className="bg-[#020703] border-t border-white/10 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-bold tracking-tighter mb-6">
                <span className="text-white">T4</span><span className="text-primary font-light">Traders</span>
              </div>
              <p className="text-gray-500 text-sm mb-6">Your pathway to professional trading. Master the markets with our disciplined four-part method.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors">
                  <span className="sr-only">Twitter</span>
                  {/* SVG Icon Placeholder */}
                  <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white">Programs</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-primary transition-colors">Beginner Program</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Intermediate Course</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Advanced Strategies</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Offline Bootcamps</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link to="/#about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/#team" className="hover:text-primary transition-colors">Our Team</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
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
            <p>&copy; {new Date().getFullYear()} T4 Traders. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-400">Privacy Policy</a>
              <a href="#" className="hover:text-gray-400">Terms of Service</a>
              <a href="#" className="hover:text-gray-400">Risk Warning</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
