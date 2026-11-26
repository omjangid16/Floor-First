import { motion } from "framer-motion";
import { Truck, Wrench, Star, ShieldCheck } from "lucide-react";
const promises = [{
  title: "On Time Delivery",
  icon: Truck
}, {
  title: "Expert Install",
  icon: Wrench
}, {
  title: "Top Quality",
  icon: Star
}, {
  title: "Trusted Warranty",
  icon: ShieldCheck
}];
const AppHomePromise = () => {
  return <div className="px-4 py-4">
      <h2 className="text-base font-bold text-foreground mb-3">Our Promise</h2>

      <div className="grid grid-cols-2 gap-2.5">
        {promises.map((item, i) => <motion.div key={item.title} initial={{
        opacity: 0,
        y: 8
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        delay: i * 0.05
      }} className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border shadow-luxury">
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <item.icon className="w-4 h-4 text-accent" />
            </div>
            <p className="text-xs font-semibold text-foreground leading-tight">{item.title}</p>
          </motion.div>)}
      </div>
    </div>;
};
export default AppHomePromise;