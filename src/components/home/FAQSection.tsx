import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How long does flooring installation take?",
    a: "Most residential projects are completed within 2–5 days depending on the area size and flooring type. Commercial projects are scheduled to minimize business disruption.",
  },
  {
    q: "Do you provide free site visits and quotations?",
    a: "Yes, we offer complimentary site visits across Dubai & Abu Dhabi. Our experts will measure, assess, and provide a detailed quotation at no cost.",
  },
  {
    q: "What warranty do you offer on installation?",
    a: "We provide up to a 5-year warranty on installation workmanship, plus manufacturer warranties on materials that can extend up to a lifetime depending on the product.",
  },
  {
    q: "Can I see samples before ordering?",
    a: "Absolutely. You can request free samples delivered to your doorstep, or visit our showroom to see and feel our full range of flooring options.",
  },
  {
    q: "Do you handle furniture moving and old floor removal?",
    a: "Yes, we offer furniture movement and old floor removal as add-on services. These can be selected during the quotation process for a hassle-free experience.",
  },
];

/* ── Mobile card ── */
export const AppHomeFAQ = () => (
  <div className="px-4 py-2">
    <div className="bg-card border border-border rounded-xl p-4 shadow-luxury">
      <h3 className="text-base font-bold text-foreground mb-3">Frequently Asked Questions</h3>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-m-${i}`} className="border-border">
            <AccordionTrigger className="text-xs font-semibold text-foreground py-3 hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-[11px] text-muted-foreground leading-relaxed pb-3">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </div>
);

/* ── Desktop section ── */
export const DesktopFAQ = () => (
  <section className="py-16 bg-secondary">
    <div className="max-w-[800px] mx-auto px-6 xl:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">FAQ</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-card rounded-xl border border-border shadow-luxury p-6"
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-d-${i}`} className="border-border">
              <AccordionTrigger className="text-sm font-semibold text-foreground py-4 hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default DesktopFAQ;
