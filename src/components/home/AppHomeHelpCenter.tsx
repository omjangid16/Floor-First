import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HelpCircle, ArrowRight } from "lucide-react";

const AppHomeHelpCenter = () => {
  return (
    <div className="px-4 pb-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-card border border-border rounded-2xl p-5 shadow-luxury"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
            <HelpCircle className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-foreground mb-1">Help Center</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Need assistance? Our team is here to help you choose the perfect flooring.
            </p>
            <Link
              to="/help-center"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Go to Help Center <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AppHomeHelpCenter;
