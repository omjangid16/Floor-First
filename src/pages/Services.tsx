import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, Wrench, Settings, Paintbrush, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Compass,
    title: "Expert Consultation",
    description: "Our certified flooring consultants help you select the perfect material, finish, and pattern for your space. We consider traffic, climate, aesthetics, and budget to deliver personalized recommendations.",
    process: ["Initial Assessment", "Material Selection", "Budget Planning", "Design Mockup", "Final Proposal"],
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description: "Our experienced installation team handles every flooring type — from delicate marble slabs to heavy-duty epoxy systems. We ensure precision fitting, minimal disruption, and flawless finishes.",
    process: ["Site Preparation", "Subfloor Assessment", "Material Acclimatization", "Precision Installation", "Quality Inspection"],
  },
  {
    icon: Settings,
    title: "Maintenance & Care",
    description: "Extend the life of your floors with our professional maintenance services. We offer deep cleaning, polishing, re-coating, and repair services for all flooring types.",
    process: ["Condition Assessment", "Cleaning Plan", "Professional Treatment", "Protective Coating", "Maintenance Schedule"],
  },
  {
    icon: Paintbrush,
    title: "Custom Solutions",
    description: "From bespoke inlay patterns to custom-mixed epoxy colors, we bring your unique vision to life. Our design team works closely with architects and interior designers on special projects.",
    process: ["Design Brief", "Material Sourcing", "Prototype & Sample", "Custom Manufacturing", "Installation & Delivery"],
  },
];

const Services = () => {
  return (
    <main className="min-h-screen bg-background">
      <section className="gradient-walnut py-16 lg:py-24">
        <div className="container-luxury">
          <p className="text-primary-foreground/50 font-body text-sm mb-2">What we offer</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground">Our Services</h1>
          <p className="text-primary-foreground/60 font-body mt-4 max-w-2xl text-lg">
            End-to-end flooring solutions — from expert consultation to professional installation and ongoing maintenance.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-luxury space-y-12">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border p-8 lg:p-12 shadow-luxury"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <service.icon className="w-12 h-12 text-accent mb-4" />
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">{service.title}</h2>
                  <p className="text-muted-foreground font-body leading-relaxed mb-6">{service.description}</p>
                  <Link
                    to="/get-quote"
                    className="inline-flex items-center gap-2 gradient-accent text-accent-foreground px-6 py-3 rounded-lg font-body font-semibold hover:opacity-90 transition-opacity"
                  >
                    Book This Service <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="lg:w-72">
                  <h4 className="font-display font-semibold text-foreground mb-4">Our Process</h4>
                  <div className="space-y-3">
                    {service.process.map((step, j) => (
                      <div key={step} className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full gradient-accent text-accent-foreground text-xs font-bold flex items-center justify-center shrink-0">
                          {j + 1}
                        </span>
                        <span className="text-sm font-body text-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Services;
