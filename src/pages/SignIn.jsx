import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import floorFirstLogo from "@/assets/floor-first-logo.png";
const GoogleMark = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} aria-hidden="true">
    <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
    <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
  </svg>;
const SignIn = () => {
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const {
    signIn,
    signInWithGoogle
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast({
        title: "Error",
        description: "Please enter your email and password.",
        variant: "destructive"
      });
      return;
    }
    setBusy(true);
    const {
      error
    } = await signIn(email.trim(), password);
    setBusy(false);
    if (error) {
      toast({
        title: "Could not sign you in",
        description: error,
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Welcome back",
      description: "You're signed in."
    });
    navigate("/profile");
  };
  const handleGoogle = async () => {
    const {
      error
    } = await signInWithGoogle();
    if (error) {
      toast({
        title: "Google sign-in failed",
        description: error,
        variant: "destructive"
      });
    }
  };
  return <main className="min-h-screen bg-card flex flex-col px-6 pt-16 pb-8">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="w-full max-w-sm mx-auto flex-1 flex flex-col">
        {/* Logo */}
        <div className="mb-8">
          <img src={floorFirstLogo} alt="Floor First" className="h-10 w-auto object-contain mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-1">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your Floor First account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-border bg-background text-foreground text-base focus:border-accent focus:ring-0 outline-none transition-colors" />
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input type={show ? "text" : "password"} autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-border bg-background text-foreground text-base focus:border-accent focus:ring-0 outline-none transition-colors" />
              <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end mb-5">
            <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Forgot password?
            </Link>
          </div>

          <button type="submit" disabled={busy} className="w-full py-4 rounded-2xl bg-foreground text-card text-base font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
            {busy ? "Signing in…" : "Sign In"}
          </button>

          <p className="text-xs text-center text-muted-foreground mt-4 leading-relaxed">
            By continuing, you agree to our{" "}
            <span className="text-foreground font-medium">Terms of Service</span> and{" "}
            <span className="text-foreground font-medium">Privacy Policy</span>
          </p>
        </form>

        {/* Providers */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="flex flex-col gap-3">
            <button type="button" onClick={handleGoogle} className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-white border border-[#747775] text-[#1F1F1F] text-sm font-medium hover:bg-neutral-50 transition-colors">
              <GoogleMark />
              Continue with Google
            </button>

            
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-auto pt-8 text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/sign-up" className="text-foreground font-semibold hover:underline">
              Create an account
            </Link>
          </p>
          <Link to="/" className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors">
            Continue as guest
          </Link>
        </div>
      </motion.div>
    </main>;
};
export default SignIn;