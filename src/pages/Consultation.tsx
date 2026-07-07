
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function Consultation() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundImage: "url('/bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0"></div>
      <div className="relative z-10 w-full max-w-lg p-8 rounded-2xl bg-[#0a180f]/80 border border-primary/20 shadow-[0_0_30px_rgba(50,205,50,0.1)]">
        <h2 className="text-3xl font-bold text-center mb-2">Book a <span className="text-primary">Consultation</span></h2>
        <p className="text-gray-400 text-center mb-6 text-sm">Not sure where to start? Speak with our experts.</p>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">First Name</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" placeholder="First Name" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Last Name</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Last Name" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input type="email" className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Email Address" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Experience Level</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
              <option value="" disabled selected>Select your experience level</option>
              <option value="beginner" className="bg-[#0a180f]">Beginner</option>
              <option value="intermediate" className="bg-[#0a180f]">Intermediate</option>
              <option value="advanced" className="bg-[#0a180f]">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Message (Optional)</label>
            <textarea className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors h-24 resize-none" placeholder="How can we help you?"></textarea>
          </div>
          <Button type="button" className="w-full mt-4">Confirm Booking</Button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-gray-500 hover:text-white transition-colors">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
