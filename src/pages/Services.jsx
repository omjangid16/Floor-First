import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Compass,
  Wrench,
  Settings,
  Paintbrush,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";

// Image assets
import spaceResidential from "@/assets/space-residential.jpg";
import calcSpaceOffice from "@/assets/calc-space-office.jpg";
import calcSpaceWarehouse from "@/assets/calc-space-warehouse.jpg";
import catOutdoor from "@/assets/cat-outdoor.jpg";
import svcStairs from "@/assets/svc-stairs.jpg";
import svcBathroom from "@/assets/svc-bathroom.jpg";
import svcKitchen from "@/assets/svc-kitchen.jpg";
import shadeCementTiles from "@/assets/shade-cement-tiles.jpg";
import shadeParquet from "@/assets/shade-parquet.jpg";

const serviceList = [
  // Core Services
  {
    id: "residential",
    category: "core",
    title: "Residential Flooring",
    tagline: "Complete flooring solutions for homes and luxury villas",
    description:
      "Transform your villa, penthouse, or apartment with our comprehensive residential installation services. We specialize in marble, solid hardwood, herringbone parquet, porcelain tiles, and luxury SPC flooring tailored for UAE living.",
    image: spaceResidential,
    highlights: [
      "Custom layout and pattern alignment",
      "Acoustic underlayment & sound insulation",
      "Moisture barriers suited for Dubai humidity",
      "10-year craftsmanship warranty",
    ],
    duration: "2-5 Days",
  },
  {
    id: "commercial",
    category: "core",
    title: "Commercial Flooring",
    tagline: "Professional installations for offices, retail & corporate spaces",
    description:
      "High-performance commercial flooring installations designed for high footfall, minimal corporate downtime, and sophisticated aesthetics. Perfect for Dubai Media City, DIFC, and Business Bay workspaces.",
    image: calcSpaceOffice,
    highlights: [
      "Fast weekend and overnight installation options",
      "Heavy commercial duty certifications",
      "Modular carpet tiles & heavy-duty LVT click",
      "Access floor tile integration",
    ],
    duration: "Flexible Scheduling",
  },
  {
    id: "industrial",
    category: "core",
    title: "Industrial Flooring",
    tagline: "Heavy-duty warehouse and industrial facility solutions",
    description:
      "Heavy-duty seamless flooring systems engineered to endure forklift traffic, chemical exposure, thermal shock, and rigorous warehouse operations across UAE industrial zones.",
    image: calcSpaceWarehouse,
    highlights: [
      "High-build epoxy coatings & PU screeds",
      "Anti-slip traction texturing & safety demarcation",
      "Chemical and thermal shock resistance",
      "Joint sealing & slab crack repair",
    ],
    duration: "3-7 Days",
  },
  {
    id: "outdoor",
    category: "core",
    title: "Outdoor Flooring",
    tagline: "Weather-resistant decking and exterior stone pavers",
    description:
      "UV-resistant composite WPC decking, natural teak timber, and durable outdoor stone pavers built to withstand intense desert heat and sun exposure around pools, patios, and rooftop terraces.",
    image: catOutdoor,
    highlights: [
      "Subframe aluminum substructure framing",
      "Hidden fastener clips for seamless aesthetics",
      "Thermal expansion tolerance engineering",
      "Pool surround anti-slip treatment",
    ],
    duration: "3-5 Days",
  },

  // Featured & Add-On Services
  {
    id: "stairs",
    category: "addon",
    title: "Stair Cladding with Lighting",
    tagline: "Premium stair solutions with integrated LED illumination",
    description:
      "Elevate your staircase with custom-mitered stair nosing, stone or hardwood treads, and concealed low-voltage warm LED step profiles for a modern architectural focal point.",
    image: svcStairs,
    highlights: [
      "Concealed step channel LED integration",
      "Seamless mitered edge fabrication",
      "Flush transition with upper and lower floors",
      "Dimmer and smart motion sensor compatible",
    ],
    duration: "2-3 Days",
  },
  {
    id: "bathroom",
    category: "addon",
    title: "Bathroom Renovation",
    tagline: "Complete bathroom waterproofing and precision tile renovation",
    description:
      "End-to-end wet area refurbishment with multi-layer tanking waterproofing, large-format porcelain slabs, linear drainage slope design, and anti-slip finishes.",
    image: svcBathroom,
    highlights: [
      "Full tanking waterproofing membrane",
      "Precision linear drain grading",
      "Large-format porcelain slab handling",
      "Mold-resistant epoxy grout application",
    ],
    duration: "4-7 Days",
  },
  {
    id: "kitchen",
    category: "addon",
    title: "Kitchen Renovation",
    tagline: "Durable, stain-resistant, and stylish kitchen floors",
    description:
      "Spill-resistant, heat-tolerant, and easy-to-sanitize kitchen floors designed to coordinate flawlessly with cabinetry, backsplashes, and island counters.",
    image: svcKitchen,
    highlights: [
      "Heavy appliance impact resistance",
      "Zero-stain porcelain and luxury vinyl options",
      "Under-cabinet kick-plate flush edging",
      "Rapid turnaround for minimal kitchen downtime",
    ],
    duration: "2-4 Days",
  },
  {
    id: "surface-prep",
    category: "addon",
    title: "Surface Preparation & Screeding",
    tagline: "Expert floor leveling, grinding, and moisture mitigation",
    description:
      "The foundation of every flawless floor. We utilize laser leveling, diamond grinding, crack injection, and rapid-curing self-leveling cement screeds.",
    image: shadeCementTiles,
    highlights: [
      "Laser-guided subfloor tolerance checking",
      "Diamond disc substrate grinding",
      "Vapor barrier epoxy primer application",
      "Pumped self-leveling cementitious screed",
    ],
    duration: "1-2 Days",
  },
  {
    id: "restoration",
    category: "addon",
    title: "Floor Restoration & Polishing",
    tagline: "Professional diamond polishing and wood floor rejuvenation",
    description:
      "Breathe new life into dull marble, scuffed hardwood, or aged parquet. Our restoration specialists restore mirror gloss or natural satin finishes.",
    image: shadeParquet,
    highlights: [
      "Multi-stage diamond wet grinding for marble",
      "Dustless wood sanding & European polyurethanes",
      "Deep grout restoration and color resealing",
      "Protective stain and scratch sealing",
    ],
    duration: "1-3 Days",
  },
];

const categories = [
  { id: "all", label: "All Services" },
  { id: "core", label: "Core Installation" },
  { id: "addon", label: "Featured & Add-Ons" },
];

const Services = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type");
  const addonParam = searchParams.get("addon");

  const [activeCategory, setActiveCategory] = useState(() => {
    if (typeParam) return "core";
    if (addonParam) return "addon";
    return "all";
  });

  useEffect(() => {
    if (typeParam) {
      setActiveCategory("core");
    } else if (addonParam) {
      setActiveCategory("addon");
    }
  }, [typeParam, addonParam]);

  const targetId = typeParam || addonParam;

  const filteredServices = serviceList.filter((item) => {
    if (targetId) {
      return item.id === targetId;
    }
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="gradient-walnut py-16 lg:py-24">
        <div className="container-luxury">
          <p className="text-primary-foreground/50 font-body text-sm mb-2 uppercase tracking-wider font-semibold">
            Dubai's Trusted Flooring Experts
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground tracking-tight">
            Our Flooring Services
          </h1>
          <p className="text-primary-foreground/70 font-body mt-4 max-w-2xl text-lg leading-relaxed">
            From precision residential installations and commercial fitouts to
            integrated stair lighting and master stone restoration.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="container-luxury py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (targetId) {
                    window.history.pushState({}, "", "/services");
                  }
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id && !targetId
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "bg-muted/80 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {cat.label}
              </button>
            ))}
            {targetId && (
              <Link
                to="/services"
                className="px-4 py-2.5 rounded-full text-sm font-semibold bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
              >
                Showing single service · View all
              </Link>
            )}
          </div>

          <Link
            to="/get-quote"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          >
            Need a custom service quote? <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Services Grid */}
      <section className="container-luxury space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-2xl border border-border overflow-hidden shadow-luxury flex flex-col justify-between group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-accent text-accent-foreground shadow-sm">
                      {service.category === "core"
                        ? "Core Installation"
                        : "Specialty Service"}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h2 className="text-2xl font-bold font-display leading-tight">
                      {service.title}
                    </h2>
                    <p className="text-xs text-white/80 mt-1">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                {/* Details Content */}
                <div className="p-6 md:p-8">
                  <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    {service.highlights.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2.5 text-xs text-foreground font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 md:p-8 pt-0 border-t border-border/40 mt-auto flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Avg Timeline: {service.duration}</span>
                </div>

                <Link
                  to={`/get-quote?service=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center gap-2 gradient-accent text-accent-foreground px-5 py-2.5 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  Book Service <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Process & Quality Guarantee */}
      <section className="container-luxury mt-16">
        <div className="bg-muted/40 rounded-3xl border border-border p-8 lg:p-12">
          <div className="max-w-2xl mb-8">
            <h3 className="text-2xl font-display font-bold text-foreground">
              Our 5-Step Flawless Execution Guarantee
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Every project is managed by a dedicated project supervisor from initial subfloor laser scan to final client handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: "01",
                title: "On-Site Assessment",
                desc: "Laser measuring, moisture testing & subfloor scan",
              },
              {
                step: "02",
                title: "Material Curation",
                desc: "Samples delivered directly to your home or site",
              },
              {
                step: "03",
                title: "Substrate Prep",
                desc: "Surface grinding, screeding & moisture tanking",
              },
              {
                step: "04",
                title: "Precision Install",
                desc: "Master installers certified for your specific material",
              },
              {
                step: "05",
                title: "Final Handover",
                desc: "Snag-free signoff & warranty documentation",
              },
            ].map((p) => (
              <div
                key={p.step}
                className="bg-card rounded-2xl border border-border p-5 shadow-xs"
              >
                <span className="text-2xl font-bold font-display text-accent">
                  {p.step}
                </span>
                <h4 className="text-sm font-bold text-foreground mt-2">
                  {p.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
