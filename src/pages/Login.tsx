import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "../components/ui/Button";
import { supabase } from "../lib/supabase";
import { Eye, EyeOff } from "lucide-react";
import GoogleAuthButton from "../components/GoogleAuthButton";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (resetLoading) return;

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      toast.error("Please enter your email first.");
      return;
    }

    try {
      setResetLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Password reset link sent.");
    } finally {
      setResetLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        throw error;
      }

      const { data: sessionId, error: rpcError } = await supabase.rpc(
        "update_active_session",
        {
          p_device_name: navigator.userAgent,
        },
      );

      if (rpcError) {
        await supabase.auth.signOut();
        throw rpcError;
      }

      if (typeof sessionId !== "string" || !sessionId) {
        await supabase.auth.signOut();
        throw new Error("Failed to establish session. Please try again.");
      }

      localStorage.setItem("active_session_id", sessionId);

      navigate("/");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
            />
          </div>

          <div className="relative">
            <label className="block text-sm text-gray-400 mb-1">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 pr-10 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter your password"
                disabled={loading}
              />
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
              disabled={resetLoading}
            >
              {resetLoading ? "Sending..." : "Forgot Password?"}
            </button>
          </div>

         <Button type="submit" className="w-full mt-6" disabled={loading}>
            {loading ? "Logging In..." : "Login"}
          </Button>
        </form>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
        <GoogleAuthButton />

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
