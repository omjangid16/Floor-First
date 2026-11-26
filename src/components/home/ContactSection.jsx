import { useState } from "react";
import { Phone, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const ContactSection = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    project: "",
    message: ""
  });
  const handleSubmit = e => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours."
    });
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      project: "",
      message: ""
    });
  };
  return <section className="py-20 lg:py-28 bg-background">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Let's Talk
            </h2>
            <p className="text-lg text-muted-foreground font-body mb-8 leading-relaxed">
              Got a project on your mind? Let's discuss about the details.
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <p className="text-sm font-body font-semibold text-foreground mb-1">Call Us</p>
                <a href="tel:+971551667112" className="text-lg font-display font-bold text-foreground hover:text-accent transition-colors">
                  +971 55 166 7112
                </a>
              </div>
              <div>
                <p className="text-sm font-body font-semibold text-foreground mb-1">Email Us</p>
                <a href="mailto:hello@staging.floorfirst.ae" className="text-lg font-display font-bold text-foreground hover:text-accent transition-colors">
                  hello@staging.floorfirst.ae
                </a>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-1.5">First Name</label>
                  <input type="text" value={formData.firstName} onChange={e => setFormData({
                  ...formData,
                  firstName: e.target.value
                })} className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-1.5">Last Name</label>
                  <input type="text" value={formData.lastName} onChange={e => setFormData({
                  ...formData,
                  lastName: e.target.value
                })} className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Email *</label>
                <input type="email" required value={formData.email} onChange={e => setFormData({
                ...formData,
                email: e.target.value
              })} className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Phone Number *</label>
                <input type="tel" required value={formData.phone} onChange={e => setFormData({
                ...formData,
                phone: e.target.value
              })} className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Project</label>
                <select value={formData.project} onChange={e => setFormData({
                ...formData,
                project: e.target.value
              })} className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all">
                  <option value="">- Select -</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="renovation">Renovation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Your Message *</label>
                <textarea required rows={4} value={formData.message} onChange={e => setFormData({
                ...formData,
                message: e.target.value
              })} className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-none" placeholder="Your Message" />
              </div>

              <button type="submit" className="gradient-accent text-accent-foreground px-8 py-3.5 rounded-lg font-body font-bold text-base hover:opacity-90 transition-opacity inline-flex items-center gap-2">
                SUBMIT <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;