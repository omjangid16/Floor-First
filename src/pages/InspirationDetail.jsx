import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, Clock, User } from "lucide-react";
const articles = [{
  id: "1",
  title: "DDA Approvals for Interior Renovation — Step-by-Step Guide (2026)",
  date: "November 26, 2025",
  category: "General",
  readTime: "8 min read",
  author: "Floor First Team",
  content: `
      <h2>Understanding DDA Approvals</h2>
      <p>If you're planning an interior renovation in Dubai, understanding the Dubai Development Authority (DDA) approval process is essential. This guide walks you through every step to ensure your project meets all regulatory requirements.</p>
      
      <h3>Step 1: Documentation</h3>
      <p>Gather all necessary documents including property ownership papers, architectural drawings, and contractor licenses. Ensure your chosen flooring contractor has valid trade licenses for Dubai operations.</p>
      
      <h3>Step 2: NOC from Building Management</h3>
      <p>Before any renovation work begins, obtain a No Objection Certificate (NOC) from your building management. This is mandatory for all interior works including flooring replacement.</p>
      
      <h3>Step 3: Submit Application</h3>
      <p>Submit your renovation application through the Dubai Municipality online portal. Include detailed specifications of flooring materials, installation methods, and timelines.</p>
      
      <h3>Step 4: Inspection & Approval</h3>
      <p>After submission, a building inspector will review your plans. Approval typically takes 5-10 working days for standard renovations.</p>
      
      <h3>Tips for Flooring Projects</h3>
      <ul>
        <li>Always choose materials rated for Dubai's climate conditions</li>
        <li>Ensure your contractor carries proper insurance</li>
        <li>Keep all approval documents on-site during renovation</li>
        <li>Schedule noise-generating work during permitted hours (8 AM - 6 PM)</li>
      </ul>
    `
}, {
  id: "2",
  title: "Office Fit-Out Cost in Dubai (2026 Guide) – Complete Price Breakdown & Sq Ft Rates",
  date: "November 25, 2025",
  category: "General",
  readTime: "12 min read",
  author: "Floor First Team",
  content: `
      <h2>Office Fit-Out Costs Explained</h2>
      <p>Planning an office fit-out in Dubai requires careful budgeting. Flooring typically represents 15-25% of total fit-out costs. Here's a comprehensive breakdown of what to expect in 2026.</p>
      
      <h3>Budget Categories</h3>
      <p><strong>Economy (AED 60-120/sqft):</strong> Laminate or PVC roll flooring. Suitable for small offices and co-working spaces.</p>
      <p><strong>Mid-Range (AED 120-250/sqft):</strong> SPC vinyl planks or carpet tiles. The most popular choice for corporate offices.</p>
      <p><strong>Premium (AED 250-500/sqft):</strong> Engineered wood or porcelain tiles. Ideal for executive areas and reception lobbies.</p>
      <p><strong>Luxury (AED 500+/sqft):</strong> Natural marble, hardwood, or designer resin flooring. For flagship offices and luxury brands.</p>
      
      <h3>Installation Costs</h3>
      <p>Professional installation ranges from AED 15-45/sqft depending on material type and complexity. Herringbone and chevron patterns cost 20-30% more than straight lay.</p>
      
      <h3>Hidden Costs to Consider</h3>
      <ul>
        <li>Subfloor preparation and leveling</li>
        <li>Moisture barrier installation</li>
        <li>Skirting and trim work</li>
        <li>Furniture moving and protection</li>
        <li>Waste disposal fees</li>
      </ul>
    `
}, {
  id: "3",
  title: "BOQ for Kitchen Renovation in Dubai (10 sqm) — Joinery, Appliances, Plumbing & Tiles",
  date: "November 22, 2025",
  category: "General",
  readTime: "10 min read",
  author: "Floor First Team",
  content: `
      <h2>Kitchen Renovation BOQ</h2>
      <p>A Bill of Quantities (BOQ) is essential for any kitchen renovation. Here's a detailed breakdown for a standard 10 sqm kitchen in Dubai.</p>
      
      <h3>Flooring (10 sqm)</h3>
      <p>Anti-slip porcelain tiles (R10 rating recommended): AED 1,500-3,500</p>
      <p>Installation with waterproofing: AED 800-1,200</p>
      <p>Grout and sealant: AED 200-400</p>
      
      <h3>Why Anti-Slip Tiles Matter</h3>
      <p>Kitchen floors are exposed to water, oil, and food spills daily. We recommend minimum R10-rated tiles for residential kitchens and R11 for commercial kitchens.</p>
      
      <h3>Popular Kitchen Flooring Choices</h3>
      <ul>
        <li>Porcelain tiles with wood look — warm aesthetic, easy maintenance</li>
        <li>Natural stone tiles — premium feel, requires sealing</li>
        <li>SPC vinyl — waterproof, warm underfoot, budget-friendly</li>
        <li>Cement look tiles — modern industrial aesthetic</li>
      </ul>
    `
}, {
  id: "4",
  title: "How to Choose the Right Flooring for Dubai's Climate",
  date: "November 18, 2025",
  category: "Guide",
  readTime: "7 min read",
  author: "Floor First Team",
  content: `
      <h2>Dubai's Climate & Flooring</h2>
      <p>Dubai's extreme temperatures and humidity levels make flooring selection crucial. The right choice will last decades; the wrong one may fail within years.</p>
      
      <h3>Key Considerations</h3>
      <p><strong>Heat Resistance:</strong> Floor temperatures can exceed 60°C on exposed surfaces. SPC vinyl and porcelain tiles handle heat exceptionally well.</p>
      <p><strong>Humidity:</strong> Indoor humidity fluctuations can cause solid wood to warp. Engineered wood with multi-layer construction performs far better.</p>
      <p><strong>UV Exposure:</strong> Intense sunlight can fade certain materials. Look for UV-resistant coatings and light-stable pigments.</p>
      
      <h3>Best Performers in Dubai</h3>
      <ul>
        <li>SPC Vinyl — Unaffected by temperature and humidity</li>
        <li>Porcelain Tiles — Virtually indestructible in any climate</li>
        <li>Engineered Wood — Stable construction resists warping</li>
        <li>Natural Stone — Stays cool underfoot in summer</li>
      </ul>
    `
}, {
  id: "5",
  title: "SPC vs LVT: Which Vinyl Flooring is Right for You?",
  date: "November 15, 2025",
  category: "Comparison",
  readTime: "6 min read",
  author: "Floor First Team",
  content: `
      <h2>SPC vs LVT Comparison</h2>
      <p>Both SPC (Stone Polymer Composite) and LVT (Luxury Vinyl Tile) are excellent flooring choices, but they serve different needs.</p>
      
      <h3>SPC Vinyl</h3>
      <p>Rigid stone-based core makes it extremely durable and waterproof. Better for areas with heavy traffic and temperature variations. Click-lock installation makes it DIY-friendly.</p>
      
      <h3>LVT</h3>
      <p>Flexible vinyl construction offers superior comfort underfoot. Better sound absorption and slightly warmer feel. Available in glue-down and click-lock variants.</p>
      
      <h3>Quick Comparison</h3>
      <ul>
        <li>Durability: SPC wins (rigid core)</li>
        <li>Comfort: LVT wins (flexible, warmer)</li>
        <li>Water resistance: Both excellent</li>
        <li>Price: SPC slightly higher</li>
        <li>Installation: SPC easier (always click-lock)</li>
      </ul>
    `
}, {
  id: "6",
  title: "Top 10 Flooring Trends for 2026 in the UAE",
  date: "November 10, 2025",
  category: "Trends",
  readTime: "9 min read",
  author: "Floor First Team",
  content: `
      <h2>2026 Flooring Trends</h2>
      <p>The UAE flooring market is evolving rapidly. Here are the top trends we're seeing across residential and commercial projects.</p>
      
      <h3>Top Trends</h3>
      <ol>
        <li><strong>Herringbone Everything</strong> — From wood to vinyl to tile, herringbone patterns dominate</li>
        <li><strong>Large Format Tiles</strong> — 120x60cm and larger for seamless, modern floors</li>
        <li><strong>Warm Neutrals</strong> — Honey oak, warm beige, and sand tones replace cool greys</li>
        <li><strong>Terrazzo Revival</strong> — Both real and porcelain terrazzo are trending</li>
        <li><strong>SPC Vinyl Growth</strong> — Now the fastest-growing segment in UAE</li>
        <li><strong>Biophilic Design</strong> — Natural materials and organic patterns</li>
        <li><strong>Dark Drama</strong> — Smoked oak and charcoal finishes for statement floors</li>
        <li><strong>Outdoor Living</strong> — Composite decking for Dubai's expanding outdoor spaces</li>
        <li><strong>Smart Flooring</strong> — Heated floors and integrated LED systems</li>
        <li><strong>Sustainability</strong> — Bamboo, reclaimed wood, and recycled materials</li>
      </ol>
    `
}];
const InspirationDetail = () => {
  const {
    id
  } = useParams();
  const article = articles.find(a => a.id === id);
  if (!article) {
    return <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">Article Not Found</h1>
          <Link to="/inspiration" className="text-accent font-body font-semibold">← Back to Inspiration</Link>
        </div>
      </main>;
  }
  return <main className="min-h-screen bg-background">
      <section className="gradient-walnut py-12 lg:py-16">
        <div className="container-luxury">
          <Link to="/inspiration" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground font-body text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Inspiration
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-xs text-primary-foreground/50 font-body mb-3">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
            <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> {article.category}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {article.author}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground leading-tight max-w-3xl">
            {article.title}
          </h1>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-luxury max-w-3xl">
          <div className="prose prose-lg max-w-none font-body text-foreground
              prose-headings:font-display prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-li:text-muted-foreground
              prose-strong:text-foreground
              prose-ul:space-y-1 prose-ol:space-y-1" dangerouslySetInnerHTML={{
          __html: article.content
        }} />

          <div className="mt-12 pt-8 border-t border-border">
            <div className="bg-card rounded-xl border border-border p-6 shadow-luxury">
              <h3 className="font-display font-bold text-foreground text-lg mb-2">Need Expert Advice?</h3>
              <p className="text-sm font-body text-muted-foreground mb-4">Our flooring specialists can help you make the right choice for your project.</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/get-quote" className="gradient-accent text-accent-foreground px-5 py-2.5 rounded-lg font-body font-semibold text-sm hover:opacity-90 transition-opacity">
                  Get Free Quote
                </Link>
                <Link to="/calculator" className="bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg font-body font-semibold text-sm hover:bg-sand-dark transition-colors">
                  Try Calculator
                </Link>
                <Link to="/help-center" className="bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg font-body font-semibold text-sm hover:bg-sand-dark transition-colors">
                  Chat with AI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>;
};
export default InspirationDetail;