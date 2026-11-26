import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-flooring.jpg";
const DesktopHero = () => {
  return <section className="bg-background py-6">
      <div className="max-w-[1280px] mx-auto px-6 xl:px-8">
        <div className="grid grid-cols-5 gap-5 items-stretch" style={{
        minHeight: 400
      }}>
          {/* Left Content - 3 cols */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.4
        }} className="col-span-3 relative rounded-2xl overflow-hidden">
            <img src={heroImage} alt="Premium flooring showroom" className="w-full h-full object-cover absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
            <div className="relative z-10 p-10 flex flex-col justify-end h-full">
              <div className="inline-flex items-center gap-2 bg-card/15 backdrop-blur-sm border border-card/20 rounded-full px-3 py-1 mb-4 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="text-card text-xs font-semibold">10% Off First Order</span>
              </div>

              <h1 className="text-4xl xl:text-5xl font-extrabold text-card leading-[1.1] mb-3 tracking-tight">
                Premium Flooring
                <br />
                for Modern Spaces
              </h1>

              <p className="text-sm text-card/70 max-w-md mb-6 leading-relaxed">
                Dubai's trusted flooring partner. Browse 70K+ sqft of installed excellence across residential, commercial, and industrial spaces.
              </p>

              <div className="flex items-center gap-3">
                <Link to="/products" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/calculator" className="inline-flex items-center gap-2 bg-card/15 backdrop-blur-sm border border-card/30 text-card px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-card/25 transition-colors">
                  <Calculator className="w-4 h-4" /> Get Estimate
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Side - 2 cols with stacked cards */}
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.4,
          delay: 0.1
        }} className="col-span-2 flex flex-col gap-5">
            {/* Stats card */}
            <div className="bg-card rounded-2xl border border-border p-6 flex-1 flex flex-col justify-center">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Why Floor First</h3>
              <div className="grid grid-cols-3 gap-4">
                {[{
                value: "70K+",
                label: "Sqft Installed"
              }, {
                value: "68+",
                label: "Projects Done"
              }, {
                value: "10+",
                label: "Years Exp."
              }].map(stat => <div key={stat.label} className="text-center">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</p>
                  </div>)}
              </div>
            </div>

            {/* Free consultation card */}
            <Link to="/get-quote" className="group bg-foreground rounded-2xl p-6 flex-1 flex flex-col justify-center hover:opacity-95 transition-opacity">
              <p className="text-accent text-xs font-semibold uppercase tracking-wider mb-2">Free Consultation</p>
              <h3 className="text-xl font-bold text-card mb-2">Book a Free Visit</h3>
              <p className="text-sm text-card/60 mb-4">Get expert advice from our team at your location.</p>
              <span className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold group-hover:gap-2.5 transition-all">
                Book Today <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default DesktopHero;