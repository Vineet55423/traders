import { supabase } from "../lib/supabase";

export default function GoogleAuthButton() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google sign-in error:", error.message);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="w-full flex items-center justify-center gap-3 border border-white/10 rounded-lg py-2.5 px-4 text-sm font-medium text-white bg-white/5 hover:bg-white/10 transition-colors"
    >
      <svg className="w-5 h-5" viewBox="0 0 48 48">
        <path
          fill="#FFC107"
          d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l6-6C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.8-.4-3.5z"
        />
        <path
          fill="#FF3D00"
          d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3 0 5.8 1.1 7.9 3l6-6C34.5 5.1 29.5 3 24 3 16 3 9 7.6 6.3 14.7z"
        />
        <path
          fill="#4CAF50"
          d="M24 45c5.4 0 10.3-1.8 14.1-5l-6.5-5.5C29.5 36 26.9 37 24 37c-5.3 0-9.7-3.4-11.3-8l-6.6 5.1C9 40.4 16 45 24 45z"
        />
        <path
          fill="#1976D2"
          d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.5 5.5C41.4 35.6 45 30.5 45 24c0-1.4-.1-2.8-.4-3.5z"
        />
      </svg>
      Continue with Google
    </button>
  );
}
