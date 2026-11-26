import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HelpCircle, ArrowRight } from "lucide-react";
const AppHomeHelpCenter = () => {
  return <div className="px-4 pb-6">
      <motion.div initial={{
      opacity: 0,
      y: 8
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true
    }}>
        <div className="bg-card border border-border rounded-xl p-4 shadow-luxury">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
              <HelpCircle className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-foreground mb-1">Need Help?</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
                Our experts will help you choose the perfect flooring for your space.
              </p>
              <Link to="/help-center" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-bold hover:opacity-90 transition-opacity">
                Help Center <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>;
};
export default AppHomeHelpCenter;