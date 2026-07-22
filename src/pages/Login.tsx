import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { supabase } from "../lib/supabase";
import {
  generateSessionId,
  saveActiveSession,
  saveLocalSessionId,
} from "../lib/session";

// 1. Import the icons from lucide-react
import { Eye, EyeOff } from "lucide-react"; 

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // 2. Add the state to track password visibility
  const [showPassword, setShowPassword] = useState(false); 

  const handleForgotPassword = async () => {
    const cleanEmail = email.trim().toLowerCase();

    console.log("Reset Email:", cleanEmail);

    if (!cleanEmail) {
      alert("Please enter your email first.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: "http://localhost:5173/reset-password",
    });

    console.log("Reset Error:", error);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Password reset link sent.");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    // Generate unique session id
    const sessionId = generateSessionId();

    // Save locally
    saveLocalSessionId(sessionId);

    // Save in database
    try {
      await saveActiveSession(data.user.id, sessionId);
    } catch (err) {
      console.error("Session Save Error:", err);
      alert("Unable to create login session.");
      return;
    }

    alert("Login Successful!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-4 py-12 page-cover-bg">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0"></div>
      <div className="relative z-10 w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#0a180f]/80 border border-primary/20 shadow-[0_0_30px_rgba(50,205,50,0.1)]">
        <h2 className="text-3xl font-bold text-center mb-6">
          <span className="text-primary">Welcome</span> Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            
            {/* 3. Wrap input and button in a relative div */}
            <div className="relative">
              <input
                // 4. Dynamically change the type based on state
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // Added pr-10 so the text doesn't go behind the icon
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 pr-10 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter your password"
              />
              {/* 5. The absolute positioned toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <Button type="submit" className="w-full mt-6" disabled={loading}>
            {loading ? "Logging In..." : "Login"}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-xs text-gray-500 hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}