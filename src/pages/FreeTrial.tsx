import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { ArrowLeft, Send } from 'lucide-react';

export default function FreeTrial() {
  return (
    <div
      className="min-h-screen text-foreground font-sans relative flex flex-col"
      style={{ backgroundImage: "url('/bg.png')", backgroundSize: '100% auto', backgroundPosition: 'center -150px', backgroundAttachment: 'fixed' }}
    >
      <div className="absolute inset-0 bg-black/70 z-0 pointer-events-none"></div>

      {/* Navigation */}
      <nav className="relative z-50 p-6 pt-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4">
          <Link to="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <div className="text-3xl font-serif text-white tracking-wide flex items-start">
            T<span className="text-xl font-sans mt-0.5 ml-0.5">4</span>rader
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Request a <span className="text-primary">Free Trial</span></h1>
            <p className="text-gray-400">Experience the T4 Method with no obligations. Fill out the form below and our team will grant you access to a sample session.</p>
          </div>

          <GlassCard className="p-8 md:p-12 bg-white/5 border-white/10 shadow-2xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-primary/50 text-white transition-colors placeholder-gray-600"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-primary/50 text-white transition-colors placeholder-gray-600"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-300">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-primary/50 text-white transition-colors placeholder-gray-600"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="experience" className="text-sm font-medium text-gray-300">Trading Experience</label>
                <select
                  id="experience"
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-primary/50 text-gray-300 transition-colors"
                  required
                >
                  <option value="" disabled selected>Select your experience level</option>
                  <option value="beginner">Beginner (0-1 years)</option>
                  <option value="intermediate">Intermediate (1-3 years)</option>
                  <option value="advanced">Advanced (3+ years)</option>
                </select>
              </div>

              <Button type="submit" className="w-full py-4 text-lg mt-8 group flex items-center justify-center">
                Submit Request
                <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
