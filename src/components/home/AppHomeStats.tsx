import { motion } from "framer-motion";
import { Layers, FolderCheck, CalendarClock } from "lucide-react";

const stats = [
  { icon: Layers, value: "70K+", label: "Sqm Installed" },
  { icon: FolderCheck, value: "68+", label: "Projects Done" },
  { icon: CalendarClock, value: "10+", label: "Years Exp." },
];

const AppHomeStats = () => {
  return (
    <div className="px-4 py-4">
      <div className="bg-card border border-border rounded-xl p-4 shadow-luxury">
        <h3 className="text-base font-bold text-foreground mb-3">Our Track Record</h3>
        <div className="grid grid-cols-3 gap-2">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex flex-col items-center text-center gap-1.5"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <s.icon className="w-4 h-4 text-accent" />
              </div>
              <p className="text-lg font-bold text-foreground leading-none">{s.value}</p>
              <p className="text-[10px] text-muted-foreground font-medium leading-tight">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppHomeStats;
