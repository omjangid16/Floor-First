import { motion } from "framer-motion";
import { ShieldCheck, Award, Leaf, Clock, BadgeCheck, Handshake } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "Licensed & Insured", desc: "Fully certified contractor" },
  { icon: Award, label: "ISO 9001 Certified", desc: "Quality management standard" },
  { icon: Leaf, label: "Eco-Friendly Options", desc: "Sustainable materials available" },
  { icon: Clock, label: "On-Time Guarantee", desc: "Project delivery commitment" },
  { icon: BadgeCheck, label: "5-Year Warranty", desc: "On installation workmanship" },
  { icon: Handshake, label: "Free Consultation", desc: "No-obligation site visit" },
];

/* ── Mobile card ── */
export const AppHomeTrustBadges = () => (
  <div className="px-4 py-2">
    <div className="bg-card border border-border rounded-xl p-4 shadow-luxury">
      <h3 className="text-base font-bold text-foreground mb-3">Why Choose Us</h3>
      <div className="grid grid-cols-3 gap-2">
        {badges.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="flex flex-col items-center text-center gap-1.5 p-2 rounded-lg bg-secondary"
          >
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <b.icon className="w-4 h-4 text-accent" />
            </div>
            <p className="text-[10px] font-semibold text-foreground leading-tight">{b.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Desktop section ── */
export const DesktopTrustBadges = () => (
  <section className="py-14 bg-card">
    <div className="max-w-[1280px] mx-auto px-6 xl:px-8">
      <div className="text-center mb-10">
        <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Our Promise</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Choose Floor First</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {badges.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col items-center text-center gap-2 p-5 rounded-xl bg-secondary border border-border"
          >
            <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center">
              <b.icon className="w-5 h-5 text-accent" />
            </div>
            <p className="text-sm font-semibold text-foreground">{b.label}</p>
            <p className="text-[11px] text-muted-foreground leading-snug">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default DesktopTrustBadges;
