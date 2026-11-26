import { Link } from "react-router-dom";
import { ArrowLeft, Bell, Globe, Moon, Shield } from "lucide-react";
const settingsItems = [{
  label: "Notifications",
  description: "Push & email alerts",
  icon: Bell
}, {
  label: "Language",
  description: "English",
  icon: Globe
}, {
  label: "Appearance",
  description: "System default",
  icon: Moon
}, {
  label: "Privacy",
  description: "Data & permissions",
  icon: Shield
}];
const ProfileSettings = () => <div className="min-h-screen bg-muted/30">
    <div className="bg-card sticky top-0 z-10 flex items-center gap-3 h-14 px-4 border-b border-border">
      <Link to="/profile" className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </Link>
      <h1 className="text-base font-bold text-foreground">Settings</h1>
    </div>
    <div className="px-4 py-4">
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
        {settingsItems.map((item, i) => <button key={item.label} className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-muted/50 active:bg-muted transition-colors text-left ${i < settingsItems.length - 1 ? "border-b border-border/50" : ""}`}>
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
              <item.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          </button>)}
      </div>
    </div>
  </div>;
export default ProfileSettings;