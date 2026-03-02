import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";

const DesktopCTA = () => {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-8 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative gradient-walnut rounded-3xl overflow-hidden shadow-luxury-xl"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-accent/5 blur-2xl translate-y-1/2 -translate-x-1/4" />

          <div className="relative px-14 py-16 flex items-center justify-between">
            <div className="max-w-lg">
              <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">Let's Get Started</p>
              <h2 className="font-display text-4xl font-bold text-primary-foreground tracking-tight mb-4 italic leading-tight">
                Ready to transform your space?
              </h2>
              <p className="text-sm text-primary-foreground/50 leading-relaxed max-w-md">
                Talk to our interior designers for personalized recommendations and an instant quote. It's completely free.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/calculator"
                className="inline-flex items-center gap-2 bg-card text-foreground px-6 py-3.5 rounded-xl text-sm font-bold hover:shadow-luxury-lg transition-all duration-300"
              >
                <Calculator className="w-4 h-4" /> Get Estimate
              </Link>
              <Link
                to="/get-quote"
                className="inline-flex items-center gap-2 gradient-accent text-accent-foreground px-6 py-3.5 rounded-xl text-sm font-bold shadow-glow-accent hover:shadow-luxury-lg transition-all duration-300"
              >
                Book Free Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DesktopCTA;
