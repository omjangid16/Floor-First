import { motion } from "framer-motion";

const clients = [
  "Emaar Properties",
  "DAMAC",
  "Sobha Realty",
  "Meraas",
  "Nakheel",
  "Aldar Properties",
];

/* ── Mobile card ── */
export const AppHomeTrustedBy = () => (
  <div className="px-4 py-2">
    <div className="bg-card border border-border rounded-xl p-4 shadow-luxury">
      <h3 className="text-base font-bold text-foreground mb-3">Trusted By Industry Leaders</h3>
      <div className="grid grid-cols-3 gap-2">
        {clients.map((c, i) => (
          <motion.div
            key={c}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="h-12 rounded-lg bg-secondary border border-border flex items-center justify-center px-2"
          >
            <span className="text-[10px] font-semibold text-muted-foreground text-center leading-tight">{c}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Desktop section ── */
export const DesktopTrustedBy = () => (
  <section className="py-12 bg-background">
    <div className="max-w-[1280px] mx-auto px-6 xl:px-8">
      <p className="text-center text-sm text-muted-foreground mb-6 uppercase tracking-wider">
        Trusted by leading developers & designers across the UAE
      </p>
      <div className="grid grid-cols-6 gap-4">
        {clients.map((c, i) => (
          <motion.div
            key={c}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="h-16 rounded-xl bg-card border border-border flex items-center justify-center px-4 hover:shadow-luxury transition-shadow"
          >
            <span className="text-xs font-semibold text-muted-foreground text-center">{c}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default DesktopTrustedBy;
