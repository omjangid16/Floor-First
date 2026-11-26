import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";
const DesktopCTA = () => {
  return <section className="py-10 bg-card">
      <div className="max-w-[1280px] mx-auto px-6 xl:px-8">
        <motion.div initial={{
        opacity: 0,
        y: 16
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="relative bg-foreground rounded-2xl overflow-hidden">
          <div className="px-10 py-12 flex items-center justify-between">
            <div className="max-w-lg">
              <h2 className="text-2xl font-bold text-card tracking-tight mb-2">
                Ready to transform your space?
              </h2>
              <p className="text-sm text-card/60 leading-relaxed">
                Talk to our interior designers for personalized recommendations and an instant quote.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link to="/calculator" className="inline-flex items-center gap-2 bg-card text-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                <Calculator className="w-4 h-4" /> Get Estimate
              </Link>
              <Link to="/get-quote" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                Book Free Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default DesktopCTA;