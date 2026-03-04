import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
  Home,
  Grid3X3,
  Calculator,
  Compass,
  Briefcase,
  Info,
  Phone,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  LogIn,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import floorFirstLogo from "@/assets/floor-first-logo.png";

const menuItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Products", path: "/products", icon: Grid3X3 },
  { label: "Calculator", path: "/calculator", icon: Calculator },
  { label: "Inspiration", path: "/inspiration", icon: Compass },
  { label: "Our Works", path: "/our-works", icon: Briefcase },
  { label: "About", path: "/about", icon: Info },
  { label: "Contact", path: "/contact", icon: Phone },
];

const profileItems = [
  { label: "My Account", icon: User, path: "/sign-in" },
  { label: "My Orders", icon: Package, path: "/sign-in" },
  { label: "Wishlist", icon: Heart, path: "/sign-in" },
  { label: "Addresses", icon: MapPin, path: "/sign-in" },
  { label: "Settings", icon: Settings, path: "/sign-in" },
];

const MobileHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`lg:hidden sticky top-0 z-50 bg-card transition-shadow duration-200 ${
          scrolled ? "shadow-luxury" : ""
        }`}
      >
        {/* Main row */}
        <div className="flex items-center justify-between h-14 px-4">
          {/* Left: Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-foreground hover:bg-muted transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Center: Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img src={floorFirstLogo} alt="Floor First" className="h-7 w-auto" />
          </Link>

          {/* Right: Search + Cart + Profile */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            <Link
              to="/cart"
              className="relative w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ShoppingCart className="w-[18px] h-[18px]" />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <User className="w-[18px] h-[18px]" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-52 bg-card rounded-xl border border-border shadow-luxury-lg overflow-hidden z-50"
                  >
                    <Link
                      to="/sign-in"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <LogIn className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Login / Sign Up</p>
                        <p className="text-[10px] text-muted-foreground">Access your account</p>
                      </div>
                    </Link>
                    <div className="h-px bg-border" />
                    <div className="py-1">
                      {profileItems.map((item) => (
                        <Link
                          key={item.label}
                          to={item.path}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <div className="h-px bg-border" />
                    <button
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/5 transition-colors w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Search slide-down */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-border"
            >
              <div className="px-4 py-2.5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search flooring, tiles, marble..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-9 pr-4 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Slide-in side menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-[61] w-[280px] bg-card shadow-luxury-lg flex flex-col lg:hidden"
            >
              {/* Menu header */}
              <div className="flex items-center justify-between h-14 px-4 border-b border-border">
                <img src={floorFirstLogo} alt="Floor First" className="h-6 w-auto" />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Login CTA */}
              <Link
                to="/sign-in"
                onClick={() => setMenuOpen(false)}
                className="mx-4 mt-4 mb-2 flex items-center gap-3 p-3 rounded-xl bg-accent/5 border border-accent/15"
              >
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">Login / Sign Up</p>
                  <p className="text-[10px] text-muted-foreground">For exclusive offers</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>

              {/* Nav items */}
              <nav className="flex-1 overflow-y-auto px-2 py-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    <item.icon className="w-[18px] h-[18px] text-muted-foreground" />
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Bottom CTA */}
              <div className="p-4 border-t border-border">
                <Link
                  to="/get-quote"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Get Free Quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileHeader;
