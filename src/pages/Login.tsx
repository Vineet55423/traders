
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function Login() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundImage: "url('/bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0"></div>
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-[#0a180f]/80 border border-primary/20 shadow-[0_0_30px_rgba(50,205,50,0.1)]">
        <h2 className="text-3xl font-bold text-center mb-6"><span className="text-primary">Welcome</span> Back</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input type="email" className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input type="password" className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Enter your password" />
          </div>
          <Button type="button" className="w-full mt-6">Login</Button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
        </p>
        <div className="mt-4 text-center">
          <Link to="/" className="text-xs text-gray-500 hover:text-white transition-colors">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
