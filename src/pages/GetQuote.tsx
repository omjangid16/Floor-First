import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Send, Phone, Mail, MapPin } from "lucide-react";

const GetQuote = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", projectType: "", area: "", flooringType: "", budget: "", timeline: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Quote Request Sent!", description: "Our team will prepare your personalized quote within 24 hours." });
    setFormData({ name: "", email: "", phone: "", projectType: "", area: "", flooringType: "", budget: "", timeline: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="gradient-walnut py-16 lg:py-24">
        <div className="container-luxury">
          <p className="text-primary-foreground/50 font-body text-sm mb-2">Free Consultation</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground">Get Your Free Quote</h1>
          <p className="text-primary-foreground/60 font-body mt-4 max-w-2xl text-lg">
            Tell us about your project and receive a detailed quote within 24 hours. No obligation, completely free.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">Full Name *</label>
                    <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">Phone *</label>
                    <input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-1.5">Email *</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">Project Type</label>
                    <select value={formData.projectType} onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none">
                      <option value="">Select</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="industrial">Industrial</option>
                      <option value="renovation">Renovation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">Approximate Area (sqft)</label>
                    <input type="text" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none" placeholder="e.g., 500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-1.5">Preferred Flooring Type</label>
                  <select value={formData.flooringType} onChange={(e) => setFormData({ ...formData, flooringType: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none">
                    <option value="">Not Sure / Need Advice</option>
                    <option value="tile">Tile Flooring</option>
                    <option value="stone">Stone Flooring</option>
                    <option value="wood">Wooden Flooring</option>
                    <option value="vinyl">Vinyl & SPC</option>
                    <option value="carpet">Carpet Flooring</option>
                    <option value="resin">Resin Flooring</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-1.5">Additional Details</label>
                  <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none resize-none"
                    placeholder="Tell us about your project requirements, timeline, and any specific preferences..." />
                </div>
                <button type="submit" className="gradient-accent text-accent-foreground px-8 py-3.5 rounded-lg font-body font-bold text-base hover:opacity-90 transition-opacity inline-flex items-center gap-2">
                  Submit Quote Request <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6 shadow-luxury">
                <h3 className="font-display font-bold text-foreground text-lg mb-4">Contact Us Directly</h3>
                <div className="space-y-4">
                  <a href="tel:+971551667112" className="flex items-center gap-3 text-sm font-body text-muted-foreground hover:text-accent transition-colors">
                    <Phone className="w-5 h-5 text-accent" /> +971 55 166 7112
                  </a>
                  <a href="mailto:hello@floorfirst.ae" className="flex items-center gap-3 text-sm font-body text-muted-foreground hover:text-accent transition-colors">
                    <Mail className="w-5 h-5 text-accent" /> hello@floorfirst.ae
                  </a>
                  <div className="flex items-start gap-3 text-sm font-body text-muted-foreground">
                    <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>B3, Warehouse 10, Jebel Ali Industrial Area 1, Dubai, UAE</span>
                  </div>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-6">
                <h4 className="font-display font-semibold text-foreground mb-3">What happens next?</h4>
                <div className="space-y-3">
                  {["We review your project details", "A flooring expert contacts you", "We schedule a free site visit", "You receive a detailed quote"].map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full gradient-accent text-accent-foreground text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="text-sm font-body text-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GetQuote;
