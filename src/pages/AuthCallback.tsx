import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function AuthCallback() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    console.log("AuthCallback effect fired. loading:", loading, "session:", session);

    if (loading) return;
    if (hasRun.current) return;

    const finishLogin = async () => {
      if (!session) {
        console.log("No session found — redirecting to login");
        navigate("/login", { replace: true });
        return;
      }

      hasRun.current = true;
      console.log("Session found, calling update_active_session RPC...");

      try {
        const { data: sessionId, error: rpcError } = await supabase.rpc(
          "update_active_session",
          {
            p_device_name: navigator.userAgent,
          },
        );

        console.log("RPC result:", { sessionId, rpcError });

        if (rpcError) {
          await supabase.auth.signOut();
          throw rpcError;
        }

        if (typeof sessionId !== "string" || !sessionId) {
          await supabase.auth.signOut();
          throw new Error("Failed to establish session. Please try again.");
        }

        localStorage.setItem("active_session_id", sessionId);

        navigate("/", { replace: true });
      } catch (err) {
        console.log("Caught error in AuthCallback:", err);
        const message =
          err instanceof Error ? err.message : "Something went wrong.";
        toast.error(message);
        navigate("/login", { replace: true });
      }
    };

    finishLogin();
  }, [session, loading, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500">Signing you in...</p>
    </div>
  );
}