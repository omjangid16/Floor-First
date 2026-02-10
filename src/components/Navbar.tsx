import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Phone, ChevronDown, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  {
    label: "Products",
    path: "/products",
    submenu: [
      { label: "Tile Flooring", path: "/products?type=tile" },
      { label: "Stone Flooring", path: "/products?type=stone" },
      { label: "Wooden Flooring", path: "/products?type=wood" },
      { label: "Vinyl & SPC", path: "/products?type=vinyl" },
      { label: "Resin Flooring", path: "/products?type=resin" },
      { label: "Carpet Flooring", path: "/products?type=carpet" },
      { label: "Outdoor & Deck", path: "/products?type=outdoor" },
      { label: "Rubber & Sports", path: "/products?type=rubber" },
    ],
  },
  { label: "Services", path: "/services" },
  { label: "Inspiration", path: "/inspiration" },
  { label: "Calculator", path: "/calculator" },
  { label: "Our Works", path: "/our-works" },
];

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { totalItems } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="hidden lg:block sticky top-0 z-50 bg-primary backdrop-blur-md border-b border-walnut-light/20">
      <div className="container-luxury flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-xl lg:text-2xl font-display font-bold text-primary-foreground tracking-tight">
              FLOOR FIRST
            </span>
            <span className="text-[10px] lg:text-xs text-primary-foreground/60 tracking-[0.2em] uppercase font-body">
              Dubai's Premium Flooring
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => item.submenu && setOpenSubmenu(item.label)}
              onMouseLeave={() => setOpenSubmenu(null)}
            >
              <Link
                to={item.path}
                className={`px-3 xl:px-4 py-2 text-sm font-body font-medium transition-colors rounded-md flex items-center gap-1 ${
                  isActive(item.path)
                    ? "text-accent"
                    : "text-primary-foreground/80 hover:text-primary-foreground"
                }`}
              >
                {item.label}
                {item.submenu && <ChevronDown className="w-3 h-3" />}
              </Link>

              {item.submenu && openSubmenu === item.label && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute top-full left-0 w-56 bg-card rounded-lg shadow-luxury-lg border border-border py-2 mt-1"
                >
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.label}
                      to={sub.path}
                      className="block px-4 py-2.5 text-sm font-body text-foreground hover:bg-secondary hover:text-accent transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link
            to="/get-quote"
            className="hidden md:inline-flex items-center gap-2 gradient-accent text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-body font-semibold hover:opacity-90 transition-opacity"
          >
            Get Quote
          </Link>

          <Link to="/cart" className="relative p-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          <Link to="/sign-in" className="hidden md:flex items-center gap-1.5 px-3 py-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-body font-medium">
            <User className="w-4 h-4" /> Sign In
          </Link>

          <a href="tel:+971551667112" className="hidden md:flex p-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            <Phone className="w-5 h-5" />
          </a>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-primary-foreground"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-primary border-t border-walnut-light/20 overflow-hidden"
          >
            <nav className="container-luxury py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-3 text-primary-foreground/80 hover:text-primary-foreground font-body text-base transition-colors"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
              <Link
                to="/get-quote"
                onClick={() => setIsMobileOpen(false)}
                className="block mx-4 mt-3 text-center gradient-accent text-accent-foreground px-5 py-3 rounded-lg font-body font-semibold"
              >
                Get Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
