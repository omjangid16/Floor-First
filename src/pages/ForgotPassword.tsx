import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import floorFirstLogo from "@/assets/floor-first-logo.png";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast({ title: "Email Sent", description: "Check your inbox for a password reset link." });
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <img src={floorFirstLogo} alt="Floor First" className="h-10 w-auto object-contain mx-auto" />
          </Link>
          <h2 className="text-2xl font-display font-bold text-foreground mt-6">Reset Password</h2>
          <p className="text-sm text-muted-foreground font-body mt-1">
            {sent ? "We've sent you a reset link" : "Enter your email to reset your password"}
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-luxury">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-accent" />
              </div>
              <p className="text-sm font-body text-muted-foreground">
                We've sent a password reset link to <strong className="text-foreground">{email}</strong>. Check your inbox.
              </p>
              <Link to="/sign-in" className="inline-flex items-center gap-2 text-accent font-body font-semibold text-sm hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background font-body text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <button type="submit" className="w-full gradient-accent text-accent-foreground py-3 rounded-xl font-body font-bold text-sm hover:opacity-90 transition-opacity shadow-lg">
                Send Reset Link
              </button>
              <p className="text-center">
                <Link to="/sign-in" className="text-sm text-accent font-body font-semibold hover:underline">
                  Back to Sign In
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
