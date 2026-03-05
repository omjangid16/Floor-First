import { Link } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Edit2 } from "lucide-react";

const MyAccount = () => (
  <div className="min-h-screen bg-muted/30">
    <div className="bg-card sticky top-0 z-10 flex items-center gap-3 h-14 px-4 border-b border-border">
      <Link to="/profile" className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </Link>
      <h1 className="text-base font-bold text-foreground">My Account</h1>
    </div>
    <div className="px-4 py-6">
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center mb-3">
          <User className="w-8 h-8 text-accent" />
        </div>
        <h2 className="text-lg font-bold text-foreground">Guest User</h2>
        <p className="text-sm text-muted-foreground">Complete your profile</p>
      </div>
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
        {[
          { label: "Full Name", value: "Not set", icon: User },
          { label: "Email", value: "Not set", icon: Mail },
          { label: "Phone", value: "Not set", icon: Phone },
        ].map((field, i) => (
          <div key={field.label} className={`flex items-center gap-4 px-5 py-4 ${i < 2 ? "border-b border-border/50" : ""}`}>
            <field.icon className="w-5 h-5 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">{field.label}</p>
              <p className="text-sm font-medium text-foreground">{field.value}</p>
            </div>
            <Edit2 className="w-4 h-4 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default MyAccount;
