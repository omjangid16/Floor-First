import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const { toast } = useToast();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Sign In", description: "Authentication requires Lovable Cloud. Enable it to proceed." });
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <h1 className="text-2xl font-display font-bold text-foreground">FLOOR FIRST</h1>
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-body">Dubai's Premium Flooring</p>
          </Link>
          <h2 className="text-2xl font-display font-bold text-foreground mt-6">Welcome Back</h2>
          <p className="text-sm text-muted-foreground font-body mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-luxury space-y-5">
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1.5">Email or Phone</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background font-body text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={show ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-border bg-background font-body text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
              />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-border accent-burnt-orange" />
              <span className="text-xs font-body text-muted-foreground">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-xs font-body font-semibold text-accent hover:underline">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="w-full gradient-accent text-accent-foreground py-3 rounded-xl font-body font-bold text-sm hover:opacity-90 transition-opacity shadow-lg">
            Sign In
          </button>

          <p className="text-center text-sm font-body text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-accent font-semibold hover:underline">Sign Up</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
