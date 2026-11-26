import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, Lightbulb, Palette, ArrowRight, Calendar, Tag } from "lucide-react";
const articles = [{
  id: "1",
  title: "DDA Approvals for Interior Renovation — Step-by-Step Guide (2026)",
  date: "November 26, 2025",
  category: "General",
  icon: Book
}, {
  id: "2",
  title: "Office Fit-Out Cost in Dubai (2026 Guide) – Complete Price Breakdown & Sq Ft Rates",
  date: "November 25, 2025",
  category: "General",
  icon: Lightbulb
}, {
  id: "3",
  title: "BOQ for Kitchen Renovation in Dubai (10 sqm) — Joinery, Appliances, Plumbing & Tiles",
  date: "November 22, 2025",
  category: "General",
  icon: Palette
}, {
  id: "4",
  title: "How to Choose the Right Flooring for Dubai's Climate",
  date: "November 18, 2025",
  category: "Guide",
  icon: Book
}, {
  id: "5",
  title: "SPC vs LVT: Which Vinyl Flooring is Right for You?",
  date: "November 15, 2025",
  category: "Comparison",
  icon: Lightbulb
}, {
  id: "6",
  title: "Top 10 Flooring Trends for 2026 in the UAE",
  date: "November 10, 2025",
  category: "Trends",
  icon: Palette
}];
const Inspiration = () => {
  return <main className="min-h-screen bg-background">
      <section className="gradient-walnut py-16 lg:py-24">
        <div className="container-luxury">
          <p className="text-primary-foreground/50 font-body text-sm mb-2">The Floor Files</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground">
            Insights, Ideas & Inspiration!
          </h1>
          <p className="text-primary-foreground/60 font-body mt-4 max-w-2xl text-lg">
            Expert guides, design trends, and cost breakdowns to help you make informed flooring decisions.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => <motion.div key={article.id} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: i * 0.08
          }}>
                <Link to={`/inspiration/${article.id}`} className="group block bg-card rounded-xl overflow-hidden shadow-luxury hover-lift border border-border h-full">
                  <div className="h-48 bg-secondary flex items-center justify-center">
                    <article.icon className="w-12 h-12 text-muted-foreground/20" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-body mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
                      <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {article.category}</span>
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>)}
          </div>
        </div>
      </section>
    </main>;
};
export default Inspiration;