import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Al Maktoum",
    role: "Villa Owner, Dubai Hills",
    text: "Floor First transformed our entire villa with Italian marble. The craftsmanship and attention to detail were exceptional. Highly recommend!",
    rating: 5,
  },
  {
    name: "Ahmed Khalifa",
    role: "Office Manager, DIFC",
    text: "Professional team, on-time delivery, and premium quality SPC flooring. Our office looks stunning and the acoustic improvement is remarkable.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Interior Designer",
    text: "I've partnered with Floor First on 12+ projects. Their product range and installation quality consistently exceed client expectations.",
    rating: 5,
  },
];

/* ── Mobile card ── */
export const AppHomeTestimonials = () => (
  <div className="px-4 py-2">
    <div className="bg-card border border-border rounded-xl p-4 shadow-luxury">
      <h3 className="text-base font-bold text-foreground mb-3">What Our Clients Say</h3>
      <div className="flex flex-col gap-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="bg-secondary rounded-lg p-3"
          >
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="w-3 h-3 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">"{t.text}"</p>
            <p className="text-xs font-semibold text-foreground">{t.name}</p>
            <p className="text-[10px] text-muted-foreground">{t.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Desktop section ── */
export const DesktopTestimonials = () => (
  <section className="py-16 bg-secondary">
    <div className="max-w-[1280px] mx-auto px-6 xl:px-8">
      <div className="text-center mb-10">
        <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Testimonials</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">What Our Clients Say</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl p-6 shadow-luxury border border-border relative"
          >
            <Quote className="w-8 h-8 text-accent/15 absolute top-4 right-4" />
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{t.text}"</p>
            <div>
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default DesktopTestimonials;
