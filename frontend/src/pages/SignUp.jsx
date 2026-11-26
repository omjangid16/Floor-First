import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Phone, Lock, AtSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import floorFirstLogo from "@/assets/floor-first-logo.png";
const SignUp = () => {
  const {
    toast
  } = useToast();
  const {
    signUp
  } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirm: ""
  });
  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast({
        title: "Error",
        description: "Please add your name and email address.",
        variant: "destructive"
      });
      return;
    }
    if (form.password.length < 6) {
      toast({
        title: "Error",
        description: "Please use a password of at least 6 characters.",
        variant: "destructive"
      });
      return;
    }
    if (form.password !== form.confirm) {
      toast({
        title: "Error",
        description: "Passwords don't match.",
        variant: "destructive"
      });
      return;
    }
    setBusy(true);
    const {
      error,
      needsConfirmation
    } = await signUp({
      fullName: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      username: form.username.trim(),
      password: form.password
    });
    setBusy(false);
    if (error) {
      toast({
        title: "Could not create account",
        description: error,
        variant: "destructive"
      });
      return;
    }
    if (needsConfirmation) {
      toast({
        title: "Check your inbox",
        description: `We sent a confirmation link to ${form.email.trim()}. Open it to finish setting up your account.`
      });
      navigate("/sign-in");
      return;
    }
    toast({
      title: "Welcome to Floor First",
      description: "Your account is ready."
    });
    navigate("/profile");
  };
  const fields = [{
    key: "name",
    label: "Full Name",
    type: "text",
    icon: User,
    placeholder: "John Doe"
  }, {
    key: "email",
    label: "Email Address",
    type: "email",
    icon: Mail,
    placeholder: "you@example.com"
  }, {
    key: "phone",
    label: "Phone Number",
    type: "tel",
    icon: Phone,
    placeholder: "+971 XX XXX XXXX"
  }, {
    key: "username",
    label: "Username",
    type: "text",
    icon: AtSign,
    placeholder: "johndoe"
  }];
  return <main className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <img src={floorFirstLogo} alt="Floor First" className="h-10 w-auto object-contain mx-auto" />
          </Link>
          <h2 className="text-2xl font-display font-bold text-foreground mt-6">Create Account</h2>
          <p className="text-sm text-muted-foreground font-body mt-1">Join the premium flooring experience</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-luxury space-y-4">
          {fields.map(f => <div key={f.key}>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">{f.label}</label>
              <div className="relative">
                <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type={f.type} value={form[f.key]} onChange={e => setForm({
              ...form,
              [f.key]: e.target.value
            })} placeholder={f.placeholder} className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background font-body text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-sm" />
              </div>
            </div>)}

          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type={show ? "text" : "password"} value={form.password} onChange={e => setForm({
              ...form,
              password: e.target.value
            })} placeholder="••••••••" className="w-full pl-10 pr-12 py-3 rounded-xl border border-border bg-background font-body text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-sm" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1.5">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type={show ? "text" : "password"} value={form.confirm} onChange={e => setForm({
              ...form,
              confirm: e.target.value
            })} placeholder="••••••••" className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background font-body text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-sm" />
            </div>
          </div>

          <button type="submit" disabled={busy} className="w-full gradient-accent text-accent-foreground py-3 rounded-xl font-body font-bold text-sm hover:opacity-90 transition-opacity shadow-lg mt-2 disabled:opacity-60">
            {busy ? "Creating account…" : "Create Account"}
          </button>

          <p className="text-center text-sm font-body text-muted-foreground">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-accent font-semibold hover:underline">Sign In</Link>
          </p>
        </form>
      </div>
    </main>;
};
export default SignUp;