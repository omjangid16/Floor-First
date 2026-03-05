import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Grid3X3, Calculator, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const tabs = [
  { label: "Home", path: "/", icon: Home },
  { label: "Categories", path: "/categories", icon: Grid3X3 },
  { label: "Calculator", path: "/calculator", icon: Calculator },
  { label: "Cart", path: "/cart", icon: ShoppingCart },
  { label: "Profile", path: "/profile", icon: User },
];

const MobileBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!hasSeenIntro || !isLoggedIn) {
      navigate("/welcome");
    } else {
      navigate("/profile");
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card border-t border-border">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isProfile = tab.label === "Profile";
          return isProfile ? (
            <button
              key={tab.label}
              onClick={handleProfileClick}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 relative transition-colors ${
                isActive(tab.path) || isActive("/welcome") ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <tab.icon className={`w-5 h-5 ${isActive(tab.path) || isActive("/welcome") ? "stroke-[2.5]" : ""}`} />
              <span className={`text-[10px] font-medium ${isActive(tab.path) || isActive("/welcome") ? "font-bold" : ""}`}>
                {tab.label}
              </span>
            </button>
          ) : (
            <Link
              key={tab.label}
              to={tab.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 relative transition-colors ${
                isActive(tab.path) ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <tab.icon className={`w-5 h-5 ${isActive(tab.path) ? "stroke-[2.5]" : ""}`} />
              {tab.label === "Cart" && totalItems > 0 && (
                <span className="absolute -top-0.5 right-1 w-4 h-4 bg-accent text-accent-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className={`text-[10px] font-medium ${isActive(tab.path) ? "font-bold" : ""}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-bottom" />
    </nav>
  );
};

export default MobileBottomNav;
