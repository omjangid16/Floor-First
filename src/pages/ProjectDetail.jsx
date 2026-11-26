import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Ruler, Layers, Calendar, CheckCircle2 } from "lucide-react";
const projects = [{
  id: "1",
  title: "Villa Al Barari Renovation",
  location: "Al Barari, Dubai",
  type: "Residential",
  area: "2,500 sqft",
  flooring: "Engineered Oak Herringbone",
  duration: "12 Days",
  year: "2025",
  description: "Complete flooring renovation of a luxury villa in Al Barari. The client wanted a warm, sophisticated feel throughout the living spaces. We installed premium European Oak herringbone across all ground floor areas, with natural stone in the bathrooms.",
  highlights: ["European Oak herringbone throughout living areas", "Natural marble in master bathroom", "Underfloor heating compatible installation", "Furniture removal and reinstallation included", "Custom skirting and transition strips"],
  materials: ["Engineered Oak", "Carrara Marble", "Waterproof Underlay"]
}, {
  id: "2",
  title: "DIFC Office Tower Fit-Out",
  location: "DIFC, Dubai",
  type: "Commercial",
  area: "15,000 sqft",
  flooring: "SPC Vinyl & Carpet Tiles",
  duration: "21 Days",
  year: "2025",
  description: "Large-scale office fit-out in Dubai International Financial Centre. The project required different flooring zones — SPC vinyl for common areas and premium carpet tiles for private offices and meeting rooms. Completed during off-hours to avoid business disruption.",
  highlights: ["SPC vinyl in reception and open plan areas", "Carpet tiles in 24 private offices", "Anti-static flooring in server room", "Zero business disruption — installed at night", "Acoustic underlay throughout"],
  materials: ["SPC Vinyl", "Carpet Tiles", "ESD Flooring"]
}, {
  id: "3",
  title: "Jebel Ali Warehouse Coating",
  location: "Jebel Ali, Dubai",
  type: "Industrial",
  area: "50,000 sqft",
  flooring: "Heavy-Duty Epoxy System",
  duration: "14 Days",
  year: "2024",
  description: "Industrial epoxy floor coating for a large logistics warehouse in Jebel Ali Free Zone. The client needed a chemical-resistant, anti-slip surface that could withstand heavy forklift traffic and pallet loading.",
  highlights: ["Heavy-duty epoxy with quartz aggregate", "Chemical and oil resistant surface", "Anti-slip texture in loading zones", "Line marking for traffic management", "10-year performance warranty"],
  materials: ["Epoxy Resin", "Quartz Aggregate", "PU Topcoat"]
}, {
  id: "4",
  title: "Jumeirah Beach Hotel Suite",
  location: "Jumeirah, Dubai",
  type: "Hospitality",
  area: "800 sqft",
  flooring: "Italian Marble Flooring",
  duration: "8 Days",
  year: "2025",
  description: "Premium marble installation in a renovated luxury hotel suite. Imported Italian Statuario marble was book-matched across the living area and bathroom, creating a seamless, high-end finish worthy of a 5-star property.",
  highlights: ["Book-matched Statuario marble", "Heated floor system integration", "Anti-slip treatment in wet areas", "Custom mosaic border details", "Lifetime warranty on stone"],
  materials: ["Statuario Marble", "Mosaic Border", "Heated Mat System"]
}, {
  id: "5",
  title: "Dubai Mall Retail Store",
  location: "Downtown Dubai",
  type: "Retail",
  area: "3,200 sqft",
  flooring: "Polished Porcelain Tiles",
  duration: "10 Days",
  year: "2024",
  description: "High-traffic retail flooring installation in Dubai Mall. Large format polished porcelain tiles were chosen for their durability and premium appearance. The installation was completed within a tight timeframe to meet the store's opening date.",
  highlights: ["120x60cm large format porcelain tiles", "Polished finish for premium retail look", "High-traffic rated (PEI 5)", "Completed within 10-day deadline", "After-hours installation"],
  materials: ["Porcelain Tile", "Flexible Adhesive", "Epoxy Grout"]
}, {
  id: "6",
  title: "Fitness First Gym Flooring",
  location: "JLT, Dubai",
  type: "Sports",
  area: "8,000 sqft",
  flooring: "Rubber Sports Surface",
  duration: "7 Days",
  year: "2025",
  description: "Specialized rubber flooring installation for a fitness center. Different zones required different specifications — heavy-duty rubber tiles for the free weights area, shock-absorbing surface for the cardio zone, and anti-slip rubber for the wet areas.",
  highlights: ["20mm heavy-duty rubber in weights area", "Shock-absorbing surface for cardio", "Anti-slip rubber in changing rooms", "Colour-coded zone marking", "Noise reduction of -65dB"],
  materials: ["EPDM Rubber Tiles", "SBR Rubber Roll", "PU Binder"]
}];
const ProjectDetail = () => {
  const {
    id
  } = useParams();
  const project = projects.find(p => p.id === id);
  if (!project) {
    return <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">Project Not Found</h1>
          <Link to="/our-works" className="text-accent font-body font-semibold">← Back to Our Works</Link>
        </div>
      </main>;
  }
  return <main className="min-h-screen bg-background">
      <section className="gradient-walnut py-12 lg:py-16">
        <div className="container-luxury">
          <Link to="/our-works" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground font-body text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Our Works
          </Link>
          <span className="inline-block text-xs font-body font-bold text-accent tracking-wider uppercase mb-3">
            {project.type}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-4">
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/60 font-body">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {project.location}</span>
            <span className="flex items-center gap-1.5"><Ruler className="w-4 h-4" /> {project.area}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {project.year}</span>
            <span className="flex items-center gap-1.5"><Layers className="w-4 h-4" /> {project.flooring}</span>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-luxury max-w-4xl">
          {/* Description */}
          <div className="mb-10">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Project Overview</h2>
            <p className="text-muted-foreground font-body leading-relaxed text-base">{project.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[{
            label: "Area",
            value: project.area,
            icon: Ruler
          }, {
            label: "Duration",
            value: project.duration,
            icon: Calendar
          }, {
            label: "Type",
            value: project.type,
            icon: Layers
          }, {
            label: "Location",
            value: project.location.split(",")[0],
            icon: MapPin
          }].map(item => <div key={item.label} className="bg-card rounded-xl border border-border p-4 shadow-luxury">
                <item.icon className="w-5 h-5 text-accent mb-2" />
                <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">{item.label}</p>
                <p className="text-sm font-display font-bold text-foreground">{item.value}</p>
              </div>)}
          </div>

          {/* Highlights */}
          <div className="mb-10">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Project Highlights</h2>
            <div className="space-y-3">
              {project.highlights.map(h => <div key={h} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground font-body">{h}</p>
                </div>)}
            </div>
          </div>

          {/* Materials Used */}
          <div className="mb-10">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Materials Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.materials.map(m => <span key={m} className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-body font-medium">
                  {m}
                </span>)}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-luxury">
            <h3 className="font-display font-bold text-foreground text-lg mb-2">Have a Similar Project?</h3>
            <p className="text-sm font-body text-muted-foreground mb-4">Let us help you plan your flooring project with the same attention to detail.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/get-quote" className="gradient-accent text-accent-foreground px-5 py-2.5 rounded-lg font-body font-semibold text-sm hover:opacity-90 transition-opacity">
                Get Free Quote
              </Link>
              <Link to="/calculator" className="bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg font-body font-semibold text-sm hover:bg-sand-dark transition-colors">
                Estimate Cost
              </Link>
              <Link to="/help-center" className="bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg font-body font-semibold text-sm hover:bg-sand-dark transition-colors">
                Talk to Expert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>;
};
export default ProjectDetail;