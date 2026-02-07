import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Users, Award, TrendingUp, MapPin, Phone, Mail } from "lucide-react";

const stats = [
  { value: "70K+", label: "Sqft Installed" },
  { value: "30+", label: "Team Members" },
  { value: "10+", label: "Years Experience" },
  { value: "68", label: "Sites Executed" },
];

const values = [
  { icon: Shield, title: "Quality First", description: "We source only the finest materials from certified global manufacturers, ensuring every floor meets international quality standards." },
  { icon: Users, title: "Expert Team", description: "Our certified installers bring 10+ years of experience in residential, commercial, and industrial flooring projects across the UAE." },
  { icon: Award, title: "Trusted Brand", description: "Recognized as Dubai's premier flooring company with partnerships across top developers, architects, and interior designers." },
  { icon: TrendingUp, title: "Innovation Driven", description: "From SPC vinyl to epoxy systems, we stay ahead with the latest flooring technology and sustainable solutions." },
];

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      <section className="gradient-walnut py-16 lg:py-24">
        <div className="container-luxury">
          <p className="text-primary-foreground/50 font-body text-sm mb-2">Our Story</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground max-w-3xl">
            Dubai's Premier Flooring & Interior Solutions Company
          </h1>
          <p className="text-primary-foreground/60 font-body mt-6 max-w-2xl text-lg leading-relaxed">
            Floor First is a premium flooring solutions company headquartered in Dubai. We provide end-to-end flooring services — from expert consultation and material selection to professional installation and maintenance.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <p className="text-4xl md:text-5xl font-display font-bold text-accent mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-body">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container-luxury">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-8 shadow-luxury border border-border hover-lift">
                <v.icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-display font-bold text-foreground mb-3">{v.title}</h3>
                <p className="text-muted-foreground font-body leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-luxury text-center">
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">Ready to Transform Your Space?</h2>
          <p className="text-muted-foreground font-body mb-8 max-w-lg mx-auto">Get a free consultation with our flooring experts and discover the perfect solution for your project.</p>
          <Link to="/get-quote" className="gradient-accent text-accent-foreground px-8 py-4 rounded-lg font-body font-bold text-base inline-block hover:opacity-90 transition-opacity">
            Get Free Quote
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
