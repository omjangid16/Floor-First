import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, Sparkles, Play } from "lucide-react";
import heroImage from "@/assets/hero-flooring.jpg";

const DesktopHero = () => {
  return (
    <section className="relative overflow-hidden bg-card">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="max-w-7xl mx-auto px-8 xl:px-12 relative">
        <div className="grid grid-cols-2 gap-16 items-center min-h-[560px] py-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 gradient-accent text-accent-foreground rounded-full px-4 py-1.5 mb-7 shadow-glow-accent"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-bold tracking-wide">10% Off First Order</span>
            </motion.div>

            <h1 className="text-5xl xl:text-[3.5rem] font-extrabold text-foreground leading-[1.08] mb-6 tracking-tight">
              Premium Flooring
              <br />
              <span className="font-display italic text-muted-foreground font-bold">for Modern Spaces</span>
            </h1>

            <p className="text-base text-muted-foreground max-w-md mb-9 leading-relaxed">
              Dubai's trusted flooring partner. Browse 70K+ sqft of installed excellence across residential, commercial, and industrial spaces.
            </p>

            <div className="flex items-center gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2.5 gradient-walnut text-primary-foreground px-7 py-3.5 rounded-xl text-sm font-bold hover:shadow-luxury-lg transition-all duration-300"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/calculator"
                className="inline-flex items-center gap-2 border-2 border-border text-foreground px-6 py-3 rounded-xl text-sm font-semibold hover:bg-muted hover:border-muted-foreground/20 transition-all duration-200"
              >
                <Calculator className="w-4 h-4" /> Get Estimate
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-10 mt-12 pt-8 border-t border-border/60">
              {[
                { value: "70K+", label: "Sqft Installed" },
                { value: "68+", label: "Projects Done" },
                { value: "10+", label: "Years Experience" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <p className="text-3xl font-extrabold text-foreground tracking-tight">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-luxury-xl">
              <img
                src={heroImage}
                alt="Premium flooring showroom"
                className="w-full h-full object-cover"
              />
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-foreground/10 via-transparent to-transparent" />
            </div>

            {/* Floating badge - glass effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-5 -left-5 glass-card rounded-2xl shadow-luxury-xl border border-border/50 px-6 py-4"
            >
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Free Consultation</p>
              <p className="text-sm font-bold text-foreground mt-0.5 flex items-center gap-1.5">
                Book Today <ArrowRight className="w-3.5 h-3.5 text-accent" />
              </p>
            </motion.div>

            {/* Play button overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute top-5 right-5 w-12 h-12 rounded-full glass-card border border-card/30 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            >
              <Play className="w-5 h-5 text-foreground fill-foreground ml-0.5" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DesktopHero;
