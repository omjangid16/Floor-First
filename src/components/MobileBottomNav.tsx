import { Link, useLocation } from "react-router-dom";
import { Home, Grid3X3, Calculator, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const tabs = [
  { label: "Home", path: "/", icon: Home },
  { label: "Categories", path: "/products", icon: Grid3X3 },
  { label: "Calculator", path: "/calculator", icon: Calculator },
  { label: "Cart", path: "/cart", icon: ShoppingCart },
  { label: "Account", path: "/sign-in", icon: User },
];

const MobileBottomNav = () => {
  const location = useLocation();
  const { totalItems } = useCart();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card border-t border-border shadow-luxury-lg">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            to={tab.path}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 relative transition-colors ${
              isActive(tab.path) ? "text-accent" : "text-muted-foreground"
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label === "Cart" && totalItems > 0 && (
              <span className="absolute -top-0.5 right-1 w-4 h-4 bg-accent text-accent-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <span className="text-[10px] font-body font-semibold">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
