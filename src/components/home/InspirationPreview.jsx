import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import blogDda from "@/assets/blog-dda-approval.jpg";
import blogOffice from "@/assets/blog-office-fitout.jpg";
import blogKitchen from "@/assets/blog-kitchen-boq.jpg";
const articles = [{
  title: "DDA Approvals for Interior Renovation — Step-by-Step Guide (2026)",
  date: "November 26, 2025",
  category: "General",
  image: blogDda
}, {
  title: "Office Fit-Out Cost in Dubai (2026 Guide) – Complete Price Breakdown & Sq Ft Rates",
  date: "November 25, 2025",
  category: "General",
  image: blogOffice
}, {
  title: "BOQ for Kitchen Renovation in Dubai (10 sqm) — Joinery, Appliances, Plumbing & Tiles",
  date: "November 22, 2025",
  category: "General",
  image: blogKitchen
}];
const CTABanner = () => <section className="py-0">
    <div className="container-luxury">
      <div className="gradient-walnut rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-2">
            Talk to our interior designers for your needs and instant quote. It's free.
          </h3>
        </div>
        <Link to="/get-quote" className="shrink-0 gradient-accent text-accent-foreground px-8 py-4 rounded-lg font-body font-bold text-base hover:opacity-90 transition-opacity">
          Book Free Quote
        </Link>
      </div>
    </div>
  </section>;
const InspirationPreview = () => {
  return <>
      <CTABanner />

      <section className="py-20 lg:py-28 bg-background">
        <div className="container-luxury">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-2">
              Insights, Ideas & Inspiration!
            </h2>
            <p className="text-muted-foreground font-body">The Floor Files</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {articles.map((article, i) => <motion.div key={i} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: i * 0.1
          }}>
                <Link to="/inspiration" className="group block bg-card rounded-xl overflow-hidden shadow-luxury hover-lift border border-border">
                  <div className="h-48 overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-body mb-3">
                      <span>{article.date}</span>
                      <span>/</span>
                      <span>{article.category}</span>
                    </div>
                    <h4 className="text-base font-display font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                      {article.title}
                    </h4>
                  </div>
                </Link>
              </motion.div>)}
          </div>

          <div className="text-center">
            <Link to="/inspiration" className="inline-flex items-center gap-2 text-accent font-body font-semibold hover:gap-3 transition-all">
              View All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>;
};
export default InspirationPreview;