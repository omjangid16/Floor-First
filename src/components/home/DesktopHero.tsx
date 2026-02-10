import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-flooring.jpg";

const DesktopHero = () => {
  return (
    <section className="relative overflow-hidden bg-card">
      <div className="max-w-7xl mx-auto px-8 xl:px-12">
        <div className="grid grid-cols-2 gap-12 items-center min-h-[520px] py-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 py-1 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-accent text-xs font-semibold">10% Off First Order</span>
            </div>

            <h1 className="text-5xl xl:text-6xl font-extrabold text-foreground leading-[1.1] mb-5 tracking-tight">
              Premium Flooring
              <br />
              <span className="text-muted-foreground">for Modern Spaces</span>
            </h1>

            <p className="text-base text-muted-foreground max-w-md mb-8 leading-relaxed">
              Dubai's trusted flooring partner. Browse 70K+ sqft of installed excellence across residential, commercial, and industrial spaces.
            </p>

            <div className="flex items-center gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-foreground text-card px-6 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/calculator"
                className="inline-flex items-center gap-2 border-2 border-border text-foreground px-6 py-3 rounded-xl text-sm font-semibold hover:bg-muted transition-colors"
              >
                <Calculator className="w-4 h-4" /> Get Estimate
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-10 pt-8 border-t border-border">
              {[
                { value: "70K+", label: "Sqft Installed" },
                { value: "68+", label: "Projects Done" },
                { value: "10+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src={heroImage}
                alt="Premium flooring showroom"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-luxury-lg border border-border px-5 py-3">
              <p className="text-xs text-muted-foreground">Free Consultation</p>
              <p className="text-sm font-bold text-foreground">Book Today →</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DesktopHero;
