import { Link, useLocation } from "react-router-dom";
import { Home, Grid3X3, Calculator, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";

const tabs = [
  { label: "Home", path: "/", icon: Home },
  { label: "Categories", path: "/categories", icon: Grid3X3 },
  { label: "Calculator", path: "/calculator", icon: Calculator },
  { label: "Cart", path: "/cart", icon: ShoppingCart },
  { label: "Profile", path: "/welcome", icon: User },
];

const MobileBottomNav = () => {
  const location = useLocation();
  const { totalItems } = useCart();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card/90 backdrop-blur-2xl border-t border-border/50">
      <div className="flex items-center justify-around h-[68px] max-w-md mx-auto">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          return (
            <Link
              key={tab.label}
              to={tab.path}
              className="flex flex-col items-center gap-1 px-3 py-1.5 relative transition-colors"
            >
              <div className="relative">
                {active && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -inset-1.5 rounded-xl bg-accent/10"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <tab.icon className={`w-5 h-5 relative z-10 transition-colors ${active ? "text-accent stroke-[2.5]" : "text-muted-foreground"}`} />
                {tab.label === "Cart" && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 gradient-accent text-accent-foreground text-[9px] font-bold rounded-full flex items-center justify-center shadow-glow-accent">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium transition-colors ${active ? "text-accent font-bold" : "text-muted-foreground"}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
      <div className="h-safe-area-bottom" />
    </nav>
  );
};

export default MobileBottomNav;
