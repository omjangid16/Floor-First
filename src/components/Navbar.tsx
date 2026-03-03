import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, ChevronDown, User, Search, ArrowRight, Package, Heart, MapPin, Settings, LogOut, LogIn } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import floorFirstLogo from "@/assets/floor-first-logo.png";

const navItems = [
  { label: "Home", path: "/" },
  {
    label: "Products",
    path: "/products",
    submenu: [
      { label: "Tile Flooring", path: "/products?type=tile", desc: "Ceramic, Porcelain & Mosaic" },
      { label: "Stone Flooring", path: "/products?type=stone", desc: "Marble, Granite & Slate" },
      { label: "Wooden Flooring", path: "/products?type=wood", desc: "Hardwood, Engineered & Parquet" },
      { label: "Vinyl & SPC", path: "/products?type=vinyl", desc: "LVT, SPC Click & WPC" },
      { label: "Resin Flooring", path: "/products?type=resin", desc: "Epoxy & Polyurethane" },
      { label: "Carpet Flooring", path: "/products?type=carpet", desc: "Wall-to-Wall & Tiles" },
      { label: "Outdoor & Deck", path: "/products?type=outdoor", desc: "Composite & Natural" },
      { label: "Rubber & Sports", path: "/products?type=rubber", desc: "Gym & Playground" },
    ],
  },
  { label: "Calculator", path: "/calculator" },
  { label: "Inspiration", path: "/inspiration" },
  { label: "Our Works", path: "/our-works" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const profileMenuItems = [
  { label: "My Account", icon: User, path: "/sign-in" },
  { label: "My Orders", icon: Package, path: "/sign-in" },
  { label: "Wishlist", icon: Heart, path: "/sign-in" },
  { label: "Addresses", icon: MapPin, path: "/sign-in" },
  { label: "Settings", icon: Settings, path: "/sign-in" },
];

const Navbar = () => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const location = useLocation();
  const profileRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path.split("?")[0]);
  };

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="hidden lg:block sticky top-0 z-50 bg-card border-b border-border">
      {/* Top bar */}
      <div className="border-b border-border">
        <div className="max-w-[1280px] mx-auto px-6 xl:px-8 flex items-center justify-between h-[64px]">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 mr-8">
            <img src={floorFirstLogo} alt="Floor First" className="h-9 w-auto object-contain" />
          </Link>

          {/* Search Bar - Noon style centered */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search flooring, tiles, marble..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 ml-8 shrink-0">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative w-10 h-10 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Profile with dropdown */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <User className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-card rounded-xl border border-border shadow-luxury-lg overflow-hidden z-50"
                  >
                    {/* Login CTA */}
                    <Link
                      to="/sign-in"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3.5 bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <LogIn className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Login / Sign Up</p>
                        <p className="text-[11px] text-muted-foreground">Access your account</p>
                      </div>
                    </Link>

                    <div className="h-px bg-border" />

                    {/* Menu Items */}
                    <div className="py-1">
                      {profileMenuItems.map((item) => (
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

                    <Link
                      to="/"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-px h-6 bg-border mx-2" />

            <Link
              to="/get-quote"
              className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground px-5 py-2.5 rounded-lg text-[13px] font-semibold hover:opacity-90 transition-opacity"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Nav links bar */}
      <div className="max-w-[1280px] mx-auto px-6 xl:px-8">
        <nav className="flex items-center gap-0.5 h-[44px]">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.submenu && setOpenSubmenu(item.label)}
              onMouseLeave={() => setOpenSubmenu(null)}
            >
              <Link
                to={item.path}
                className={`px-3 py-1.5 text-[13px] font-medium transition-colors rounded-md flex items-center gap-1 ${
                  isActive(item.path)
                    ? "text-accent"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {item.label}
                {item.submenu && <ChevronDown className="w-3 h-3 opacity-50" />}
              </Link>

              {item.submenu && openSubmenu === item.label && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 w-72 bg-card rounded-xl shadow-luxury-lg border border-border py-2 mt-1 z-50"
                >
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.label}
                      to={sub.path}
                      className="flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors group"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                          {sub.label}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{sub.desc}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
