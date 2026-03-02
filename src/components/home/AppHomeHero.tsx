import { Link } from "react-router-dom";
import { Percent, Search } from "lucide-react";
import { motion } from "framer-motion";
import floorFirstLogo from "@/assets/floor-first-logo.png";

const AppHomeHero = () => {
  return (
    <div className="px-4 pt-4 pb-2">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <img src={floorFirstLogo} alt="Floor First" className="h-7 w-auto object-contain" />
          <div>
            <h1 className="text-base font-bold text-foreground leading-tight">Floor First</h1>
            <p className="text-[9px] text-muted-foreground uppercase tracking-[0.15em] font-medium">Dubai's Premium Flooring</p>
          </div>
        </div>
        <Link
          to="/products"
          className="w-10 h-10 rounded-xl bg-muted/70 flex items-center justify-center hover:bg-muted transition-colors"
        >
          <Search className="w-5 h-5 text-foreground" />
        </Link>
      </div>

      {/* Offer Banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative overflow-hidden rounded-2xl gradient-walnut p-5 shadow-luxury-lg">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-accent/15 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
              <Percent className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-primary-foreground font-bold text-sm">10% Off First Order</p>
              <p className="text-primary-foreground/50 text-xs mt-0.5">On all orders above AED 5,000</p>
            </div>
            <Link
              to="/products"
              className="shrink-0 px-5 py-2.5 rounded-xl gradient-accent text-accent-foreground text-xs font-bold shadow-glow-accent"
            >
              Shop
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AppHomeHero;
