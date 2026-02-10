import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const SignIn = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 9) {
      toast({ title: "Error", description: "Please enter a valid phone number.", variant: "destructive" });
      return;
    }
    toast({ title: "OTP Sent", description: "Check your phone for the verification code." });
    navigate("/otp-verification", { state: { phone } });
  };

  return (
    <main className="min-h-screen bg-card flex flex-col px-6 pt-16 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm mx-auto flex-1 flex flex-col"
      >
        {/* Logo */}
        <div className="mb-10">
          <div className="w-14 h-14 rounded-xl bg-foreground flex items-center justify-center mb-4">
            <span className="text-card text-lg font-bold">FF</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Log in or sign up
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your mobile number to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+971 XX XXX XXXX"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-border bg-background text-foreground text-base focus:border-accent focus:ring-0 outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-foreground text-card text-base font-semibold hover:opacity-90 transition-opacity"
          >
            Send OTP
          </button>

          <p className="text-xs text-center text-muted-foreground mt-4 leading-relaxed">
            By continuing, you agree to our{" "}
            <span className="text-foreground font-medium">Terms of Service</span> and{" "}
            <span className="text-foreground font-medium">Privacy Policy</span>
          </p>

          {/* Skip */}
          <div className="mt-auto pt-8 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Continue as guest
            </Link>
          </div>
        </form>
      </motion.div>
    </main>
  );
};

export default SignIn;
