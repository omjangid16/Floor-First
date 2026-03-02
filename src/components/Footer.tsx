import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, ArrowRight } from "lucide-react";
import floorFirstLogo from "@/assets/floor-first-logo.png";

const footerLinks = {
  Products: [
    { label: "Tile Flooring", path: "/products?type=tile" },
    { label: "Stone Flooring", path: "/products?type=stone" },
    { label: "Wooden Flooring", path: "/products?type=wood" },
    { label: "Vinyl & SPC", path: "/products?type=vinyl" },
    { label: "Carpet Flooring", path: "/products?type=carpet" },
    { label: "Outdoor & Deck", path: "/products?type=outdoor" },
  ],
  Company: [
    { label: "About Us", path: "/about" },
    { label: "Our Works", path: "/our-works" },
    { label: "Inspiration", path: "/inspiration" },
    { label: "Services", path: "/services" },
    { label: "Help Center", path: "/help-center" },
    { label: "Contact", path: "/contact" },
  ],
  Tools: [
    { label: "Flooring Calculator", path: "/calculator" },
    { label: "Get a Quote", path: "/get-quote" },
    { label: "Size Guide", path: "/calculator" },
    { label: "Care Tips", path: "/help-center" },
  ],
};

const Footer = () => {
  return (
    <footer className="gradient-walnut text-primary-foreground">
      {/* Newsletter strip */}
      <div className="border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-8 xl:px-12 py-8 flex items-center justify-between">
          <div>
            <h3 className="font-display text-xl font-bold italic">Stay in the loop</h3>
            <p className="text-sm text-primary-foreground/40 mt-1">Get exclusive offers and flooring tips delivered to your inbox.</p>
          </div>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-primary-foreground/10 border border-primary-foreground/10 rounded-xl px-5 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/30 w-64 focus:outline-none focus:border-accent/50 transition-colors"
            />
            <button className="gradient-accent text-accent-foreground px-5 py-2.5 rounded-xl text-sm font-bold hover:shadow-glow-accent transition-all flex items-center gap-2">
              Subscribe <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 xl:px-12 py-16">
        <div className="grid grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src={floorFirstLogo} alt="Floor First" className="h-9 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-sm text-primary-foreground/40 leading-relaxed mb-7 max-w-xs">
              Premium flooring solutions for residential, commercial, and industrial spaces across the UAE.
            </p>

            <div className="space-y-3 mb-7">
              <a href="tel:+971551667112" className="flex items-center gap-3 text-sm text-primary-foreground/50 hover:text-accent transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                +971 55 166 7112
              </a>
              <a href="mailto:hello@floorfirst.ae" className="flex items-center gap-3 text-sm text-primary-foreground/50 hover:text-accent transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                hello@floorfirst.ae
              </a>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/50">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/5 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Jebel Ali Industrial Area 1, Dubai, UAE</span>
              </div>
            </div>

            <div className="flex gap-2">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-200">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold text-primary-foreground/70 uppercase tracking-[0.15em] mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-primary-foreground/40 hover:text-accent transition-colors hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-primary-foreground/8">
        <div className="max-w-7xl mx-auto px-8 xl:px-12 py-6 flex items-center justify-between">
          <p className="text-xs text-primary-foreground/25">© 2026 Floor First Dubai. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-primary-foreground/25 hover:text-primary-foreground/50 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-primary-foreground/25 hover:text-primary-foreground/50 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
