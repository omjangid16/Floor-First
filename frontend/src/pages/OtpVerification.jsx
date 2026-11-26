import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    toast
  } = useToast();
  const phone = location.state?.phone || "+971 XX XXX XXXX";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef([]);
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  const handleChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < 6) {
      toast({
        title: "Error",
        description: "Please enter the full OTP.",
        variant: "destructive"
      });
      return;
    }
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("hasSeenIntro", "true");
    toast({
      title: "Verified!",
      description: "Welcome to Floor First."
    });
    navigate("/");
  };
  const handleResend = () => {
    setCountdown(30);
    toast({
      title: "OTP Resent",
      description: "A new code has been sent to your phone."
    });
  };
  return <main className="min-h-screen bg-card flex flex-col px-6 pt-12 pb-8">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="w-full max-w-sm mx-auto flex-1 flex flex-col">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-8">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Header */}
        <h1 className="text-2xl font-bold text-foreground mb-2">Verify OTP</h1>
        <p className="text-sm text-muted-foreground mb-8">
          We've sent a 6-digit code to <span className="font-semibold text-foreground">{phone}</span>
        </p>

        {/* OTP Inputs */}
        <div className="flex gap-3 mb-8 justify-center">
          {otp.map((digit, i) => <input key={i} ref={el => {
          inputRefs.current[i] = el;
        }} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={e => handleChange(i, e.target.value)} onKeyDown={e => handleKeyDown(i, e)} className="w-12 h-14 rounded-xl border-2 border-border bg-background text-center text-xl font-bold text-foreground focus:border-accent focus:ring-0 outline-none transition-colors" />)}
        </div>

        {/* Resend */}
        <div className="text-center mb-8">
          {countdown > 0 ? <p className="text-sm text-muted-foreground">
              Resend code in <span className="font-semibold text-foreground">{countdown}s</span>
            </p> : <button onClick={handleResend} className="text-sm font-semibold text-accent">
              Resend OTP
            </button>}
        </div>

        {/* Verify Button */}
        <button onClick={handleVerify} className="w-full py-4 rounded-2xl bg-foreground text-card text-base font-semibold hover:opacity-90 transition-opacity">
          Verify & Continue
        </button>
      </motion.div>
    </main>;
};
export default OtpVerification;