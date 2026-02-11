import { motion } from "framer-motion";
import { Layers, FolderCheck, CalendarClock } from "lucide-react";

const stats = [
  { icon: Layers, value: "70K+", label: "Sqm Installed" },
  { icon: FolderCheck, value: "68+", label: "Projects Completed" },
  { icon: CalendarClock, value: "10+", label: "Years of Experience" },
];

const AppHomeStats = () => {
  return (
    <div className="px-4 py-5">
      <div className="bg-card border border-border rounded-2xl p-5 shadow-luxury">
        <h3 className="text-base font-bold text-foreground mb-4">Confidence Statistics</h3>
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-accent" />
              </div>
              <p className="text-lg font-bold text-foreground leading-none">{s.value}</p>
              <p className="text-[11px] text-muted-foreground font-medium leading-tight">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppHomeStats;
