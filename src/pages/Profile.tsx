import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import profileHeaderBg from "@/assets/profile-header-bg.jpg";

const profileMenuItems = [
  { label: "My Account", icon: User, path: "/profile/account", description: "View & edit personal details" },
  { label: "My Orders", icon: Package, path: "/profile/orders", description: "Track your order history" },
  { label: "Wishlist", icon: Heart, path: "/profile/wishlist", description: "Your saved products" },
  { label: "Address", icon: MapPin, path: "/profile/addresses", description: "Manage delivery addresses" },
  { label: "Settings", icon: Settings, path: "/profile/settings", description: "Notifications & preferences" },
];

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("hasSeenIntro");
    localStorage.removeItem("isLoggedIn");
    navigate("/welcome");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Profile header with real image */}
      <div className="relative">
        <div className="h-32 overflow-hidden">
          <img src={profileHeaderBg} alt="Profile banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary/80" />
        </div>
        <div className="relative -mt-10 px-5 pb-5">
          <div className="flex items-end gap-4">
            <div className="w-16 h-16 rounded-full bg-card border-4 border-card flex items-center justify-center shadow-lg">
              <User className="w-7 h-7 text-accent" />
            </div>
            <div className="pb-1">
              <h1 className="text-lg font-bold text-foreground">My Profile</h1>
              <p className="text-sm text-muted-foreground">Manage your account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="px-4 py-4">
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
          {profileMenuItems.map((item, i) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-4 px-5 py-4 hover:bg-muted/50 active:bg-muted transition-colors ${
                i < profileMenuItems.length - 1 ? "border-b border-border/50" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </Link>
          ))}
        </div>

        {/* Logout */}
        <div className="mt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-4 bg-card rounded-2xl border border-border shadow-sm hover:bg-destructive/5 active:bg-destructive/10 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-destructive" />
            </div>
            <p className="text-sm font-semibold text-destructive">Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
