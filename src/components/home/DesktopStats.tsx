import { motion } from "framer-motion";

const stats = [
  { value: "70K+", label: "Sqft Installed" },
  { value: "68+", label: "Projects Completed" },
  { value: "500+", label: "Happy Clients" },
  { value: "10+", label: "Years Experience" },
];

const DesktopStats = () => (
  <section className="py-16 bg-foreground">
    <div className="max-w-[1280px] mx-auto px-6 xl:px-8">
      <div className="grid grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="text-center"
          >
            <p className="text-4xl lg:text-5xl font-bold text-accent mb-2">{s.value}</p>
            <p className="text-sm text-primary-foreground/60">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default DesktopStats;
