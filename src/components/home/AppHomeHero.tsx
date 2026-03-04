import { Link } from "react-router-dom";
import { Percent, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-flooring.jpg";

const AppHomeHero = () => {
  return (
    <div className="px-4 pt-3 pb-2 space-y-3">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link
          to="/products"
          className="block relative rounded-2xl overflow-hidden h-44 md:h-56"
        >
          <img
            src={heroImg}
            alt="Premium Flooring"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <h1 className="text-xl md:text-2xl font-bold text-card leading-tight">
              Premium Flooring
            </h1>
            <p className="text-xs md:text-sm text-card/80 mt-1">Dubai's trusted flooring experts</p>
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-card text-foreground text-xs font-semibold">
              Shop Now <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Offer Strip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Link
          to="/products"
          className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-accent/5 border border-accent/15"
        >
          <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
            <Percent className="w-4 h-4 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">10% Off First Order</p>
            <p className="text-[11px] text-muted-foreground">On all orders above AED 5,000</p>
          </div>
          <ArrowRight className="w-4 h-4 text-accent shrink-0" />
        </Link>
      </motion.div>
    </div>
  );
};

export default AppHomeHero;
