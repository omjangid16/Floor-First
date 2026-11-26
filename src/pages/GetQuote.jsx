import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import api from "@/lib/api";

const GetQuote = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    area: "",
    flooringType: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.post("/quotes", formData);
      toast({
        title: "Quote Request Sent!",
        description: "Our team will prepare your personalized quote within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        area: "",
        flooringType: "",
        budget: "",
        timeline: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Could not send quote request",
        description: error.message || "Please check your information and try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="gradient-walnut py-16 lg:py-24">
        <div className="container-luxury">
          <p className="text-primary-foreground/50 font-body text-sm mb-2">
            Free Consultation
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground">
            Get Your Free Quote
          </h1>
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
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                      placeholder="+971 50 000 0000"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projectType: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none"
                    >
                      <option value="">Select project type</option>
                      <option value="residential">Residential Villa / Apartment</option>
                      <option value="commercial">Commercial Office</option>
                      <option value="retail">Retail / Showroom</option>
                      <option value="hospitality">Hotel / Restaurant</option>
                      <option value="industrial">Industrial / Warehouse</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                      Estimated Area (sqft)
                    </label>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          area: e.target.value,
                        })
                      }
                      placeholder="e.g. 1500"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                      Preferred Flooring
                    </label>
                    <select
                      value={formData.flooringType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          flooringType: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none"
                    >
                      <option value="">Select flooring type</option>
                      <option value="tile">Tile Flooring</option>
                      <option value="stone">Stone Flooring</option>
                      <option value="wood">Wooden Flooring</option>
                      <option value="vinyl">Vinyl & SPC</option>
                      <option value="resin">Resin Flooring</option>
                      <option value="not-sure">Not sure yet — need recommendation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          budget: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-10k">Under AED 10,000</option>
                      <option value="10k-25k">AED 10,000 - 25,000</option>
                      <option value="25k-50k">AED 25,000 - 50,000</option>
                      <option value="50k-100k">AED 50,000 - 100,000</option>
                      <option value="100k+">AED 100,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                      Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          timeline: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none"
                    >
                      <option value="">When do you need this?</option>
                      <option value="immediate">Immediately (within 1 week)</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="1-3-months">1-3 months</option>
                      <option value="planning">Just planning / getting quotes</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                    Project Details & Notes
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    placeholder="Tell us about the space, current condition, specific requirements, or any questions..."
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="gradient-accent text-accent-foreground px-8 py-4 rounded-lg font-body font-bold inline-flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? "Sending..." : "Submit Quote Request"}
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6 shadow-luxury">
                <h3 className="font-display font-bold text-foreground text-lg mb-4">
                  Need Help Choosing?
                </h3>
                <p className="text-muted-foreground font-body text-sm mb-6 leading-relaxed">
                  Our flooring consultants are available for on-site visits across Dubai and the UAE with physical samples.
                </p>
                <div className="space-y-4 font-body text-sm">
                  <div className="flex items-center gap-3 text-foreground">
                    <Phone className="w-4 h-4 text-accent" />
                    <span>+971 4 000 0000</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Mail className="w-4 h-4 text-accent" />
                    <span>consult@floorfirst.ae</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>Dubai Design District, Building 5</span>
                  </div>
                </div>
              </div>

              <div className="bg-secondary rounded-2xl p-6">
                <h4 className="font-display font-bold text-foreground mb-2">
                  What Happens Next?
                </h4>
                <ol className="space-y-3 font-body text-sm text-muted-foreground list-decimal list-inside">
                  <li>We review your project specs</li>
                  <li>A specialist calls within 24 hours</li>
                  <li>We send a detailed material & labor quote</li>
                  <li>Schedule an on-site sample visit</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GetQuote;
