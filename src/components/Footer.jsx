import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import floorFirstLogo from "@/assets/floor-first-logo.png";
const footerLinks = {
  Products: [{
    label: "Tile Flooring",
    path: "/products?type=tile"
  }, {
    label: "Stone Flooring",
    path: "/products?type=stone"
  }, {
    label: "Wooden Flooring",
    path: "/products?type=wood"
  }, {
    label: "Vinyl & SPC",
    path: "/products?type=vinyl"
  }, {
    label: "Carpet Flooring",
    path: "/products?type=carpet"
  }, {
    label: "Outdoor & Deck",
    path: "/products?type=outdoor"
  }],
  Company: [{
    label: "About Us",
    path: "/about"
  }, {
    label: "Our Works",
    path: "/our-works"
  }, {
    label: "Inspiration",
    path: "/inspiration"
  }, {
    label: "Services",
    path: "/services"
  }, {
    label: "Help Center",
    path: "/help-center"
  }, {
    label: "Contact",
    path: "/contact"
  }],
  Tools: [{
    label: "Flooring Calculator",
    path: "/calculator"
  }, {
    label: "Get a Quote",
    path: "/get-quote"
  }, {
    label: "Size Guide",
    path: "/calculator"
  }, {
    label: "Care Tips",
    path: "/help-center"
  }]
};
const Footer = () => {
  return <footer className="bg-foreground text-card">
      <div className="max-w-7xl mx-auto px-8 xl:px-12 py-14">
        <div className="grid grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-5">
              <img src={floorFirstLogo} alt="Floor First" className="h-8 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-sm text-card/50 leading-relaxed mb-6 max-w-xs">
              Premium flooring solutions for residential, commercial, and industrial spaces across the UAE.
            </p>

            <div className="space-y-2.5 mb-6">
              <a href="tel:+971551667112" className="flex items-center gap-2.5 text-sm text-card/60 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" /> +971 55 166 7112
              </a>
              <a href="mailto:hello@floorfirst.ae" className="flex items-center gap-2.5 text-sm text-card/60 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" /> hello@floorfirst.ae
              </a>
              <div className="flex items-start gap-2.5 text-sm text-card/60">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Jebel Ali Industrial Area 1, Dubai, UAE</span>
              </div>
            </div>

            <div className="flex gap-2">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => <a key={i} href="#" className="w-8 h-8 rounded-lg bg-card/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Icon className="w-4 h-4" />
                </a>)}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => <div key={title}>
              <h4 className="text-xs font-bold text-card/80 uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => <li key={link.label}>
                    <Link to={link.path} className="text-sm text-card/50 hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>)}
              </ul>
            </div>)}
        </div>
      </div>

      <div className="border-t border-card/10">
        <div className="max-w-7xl mx-auto px-8 xl:px-12 py-5 flex items-center justify-between">
          <p className="text-xs text-card/30">© 2026 Floor First Dubai. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-card/30 hover:text-card/60 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-card/30 hover:text-card/60 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;