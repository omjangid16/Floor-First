import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  ShoppingCart,
  X,
  Home,
  Grid3X3,
  Calculator,
  Compass,
  Briefcase,
  Info,
  Phone,
  User,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import floorFirstLogo from "@/assets/floor-first-logo.png";
import SearchAutocomplete from "@/components/SearchAutocomplete";

const menuItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Products", path: "/products", icon: Grid3X3 },
  { label: "Calculator", path: "/calculator", icon: Calculator },
  { label: "Inspiration", path: "/inspiration", icon: Compass },
  { label: "Our Works", path: "/our-works", icon: Briefcase },
  { label: "About", path: "/about", icon: Info },
  { label: "Contact", path: "/contact", icon: Phone },
];

const MobileHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

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

          {/* Right: Search + Cart */}
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
                <SearchAutocomplete
                  autoFocus
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSubmit={(q) => {
                    navigate(`/products?search=${encodeURIComponent(q)}`);
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  placeholder="Search flooring, tiles, marble..."
                  inputClassName="w-full h-10 pl-9 pr-4 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                />
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
