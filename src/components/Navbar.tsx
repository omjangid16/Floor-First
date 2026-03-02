import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, ChevronDown, User, Search, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";
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

const Navbar = () => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { totalItems } = useCart();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path.split("?")[0]);
  };

  return (
    <header className="hidden lg:block sticky top-0 z-50 bg-card/90 backdrop-blur-2xl border-b border-border/60">
      <div className="max-w-7xl mx-auto px-8 xl:px-12">
        <div className="flex items-center justify-between h-[76px]">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 group">
            <img src={floorFirstLogo} alt="Floor First" className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
          </Link>

          {/* Center Nav */}
          <nav className="flex items-center gap-0.5">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.submenu && setOpenSubmenu(item.label)}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                <Link
                  to={item.path}
                  className={`px-3.5 py-2 text-[13px] font-medium transition-all duration-200 rounded-lg flex items-center gap-1 ${
                    isActive(item.path)
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.label}
                  {item.submenu && <ChevronDown className={`w-3 h-3 opacity-50 transition-transform duration-200 ${openSubmenu === item.label ? "rotate-180" : ""}`} />}
                </Link>

                {item.submenu && openSubmenu === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-80 glass-card rounded-2xl shadow-luxury-xl border border-border/60 py-2 mt-3"
                  >
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-card border-l border-t border-border/60" />
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.path}
                        className="flex items-center justify-between px-5 py-3.5 hover:bg-accent/5 transition-colors group mx-1 rounded-xl"
                      >
                        <div>
                          <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                            {sub.label}
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{sub.desc}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Link
              to="/products"
              className="w-10 h-10 rounded-xl hover:bg-muted/70 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              <Search className="w-[18px] h-[18px]" />
            </Link>

            <Link
              to="/cart"
              className="relative w-10 h-10 rounded-xl hover:bg-muted/70 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              <ShoppingCart className="w-[18px] h-[18px]" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center shadow-glow-accent"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            <Link
              to="/sign-in"
              className="w-10 h-10 rounded-xl hover:bg-muted/70 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              <User className="w-[18px] h-[18px]" />
            </Link>

            <div className="w-px h-6 bg-border/60 mx-2" />

            <Link
              to="/get-quote"
              className="inline-flex items-center gap-2 gradient-accent text-accent-foreground px-5 py-2.5 rounded-xl text-[13px] font-bold hover:shadow-glow-accent transition-all duration-300"
            >
              Get Quote
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
