import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Building2, ArrowRight } from "lucide-react";

const projects = [
  { id: "1", title: "Villa Al Barari Renovation", location: "Al Barari, Dubai", type: "Residential", area: "2,500 sqft", flooring: "Engineered Oak Herringbone" },
  { id: "2", title: "DIFC Office Tower Fit-Out", location: "DIFC, Dubai", type: "Commercial", area: "15,000 sqft", flooring: "SPC Vinyl & Carpet Tiles" },
  { id: "3", title: "Jebel Ali Warehouse Coating", location: "Jebel Ali, Dubai", type: "Industrial", area: "50,000 sqft", flooring: "Heavy-Duty Epoxy System" },
  { id: "4", title: "Jumeirah Beach Hotel Suite", location: "Jumeirah, Dubai", type: "Hospitality", area: "800 sqft", flooring: "Italian Marble Flooring" },
  { id: "5", title: "Dubai Mall Retail Store", location: "Downtown Dubai", type: "Retail", area: "3,200 sqft", flooring: "Polished Porcelain Tiles" },
  { id: "6", title: "Fitness First Gym Flooring", location: "JLT, Dubai", type: "Sports", area: "8,000 sqft", flooring: "Rubber Sports Surface" },
];

const OurWorks = () => {
  return (
    <main className="min-h-screen bg-background">
      <section className="gradient-walnut py-16 lg:py-24">
        <div className="container-luxury">
          <p className="text-primary-foreground/50 font-body text-sm mb-2">Portfolio</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground">Our Works</h1>
          <p className="text-primary-foreground/60 font-body mt-4 max-w-2xl text-lg">
            Explore our completed projects across residential, commercial, industrial, and hospitality sectors.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl border border-border p-6 shadow-luxury hover-lift"
              >
                <div className="h-48 bg-secondary rounded-lg mb-5 flex items-center justify-center">
                  <Building2 className="w-12 h-12 text-muted-foreground/20" />
                </div>
                <span className="text-xs font-body font-bold text-accent uppercase tracking-wider">{project.type}</span>
                <h3 className="text-xl font-display font-bold text-foreground mt-1 mb-3">{project.title}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-muted-foreground font-body flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {project.location}
                  </p>
                  <p className="text-sm text-muted-foreground font-body">Area: {project.area}</p>
                  <p className="text-sm text-muted-foreground font-body">Flooring: {project.flooring}</p>
                </div>
                <Link
                  to={`/our-works/${project.id}`}
                  className="inline-flex items-center gap-1 text-accent font-body font-medium text-sm hover:gap-2 transition-all"
                >
                  View Project <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default OurWorks;
