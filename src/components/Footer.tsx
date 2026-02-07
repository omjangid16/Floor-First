import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";

const footerLinks = {
  "Tile Flooring": [
    { label: "Ceramic Tiles", path: "/products?type=tile&sub=ceramic" },
    { label: "Porcelain Tiles", path: "/products?type=tile&sub=porcelain" },
    { label: "Mosaic Tiles", path: "/products?type=tile&sub=mosaic" },
    { label: "Terrazzo Flooring", path: "/products?type=tile&sub=terrazzo" },
  ],
  "Wooden Flooring": [
    { label: "Solid Wood", path: "/products?type=wood&sub=solid" },
    { label: "Engineered Wood", path: "/products?type=wood&sub=engineered" },
    { label: "Laminate", path: "/products?type=wood&sub=laminate" },
    { label: "Parquet", path: "/products?type=wood&sub=parquet" },
  ],
  "More Flooring": [
    { label: "Vinyl & SPC", path: "/products?type=vinyl" },
    { label: "Stone Flooring", path: "/products?type=stone" },
    { label: "Resin Flooring", path: "/products?type=resin" },
    { label: "Carpet Flooring", path: "/products?type=carpet" },
    { label: "Outdoor & Deck", path: "/products?type=outdoor" },
    { label: "Rubber & Sports", path: "/products?type=rubber" },
  ],
  "Company": [
    { label: "About Us", path: "/about" },
    { label: "Our Works", path: "/our-works" },
    { label: "Inspiration", path: "/inspiration" },
    { label: "Services", path: "/services" },
    { label: "Help Center", path: "/help-center" },
    { label: "Contact", path: "/contact" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <h3 className="text-2xl font-display font-bold">FLOOR FIRST</h3>
              <p className="text-xs tracking-[0.2em] text-primary-foreground/50 uppercase font-body">
                Dubai's Premium Flooring
              </p>
            </Link>
            <p className="text-sm text-primary-foreground/60 font-body leading-relaxed mb-6">
              Premium flooring solutions for residential, commercial, and industrial spaces across the UAE.
            </p>

            <div className="space-y-3">
              <a href="tel:+971551667112" className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-accent transition-colors font-body">
                <Phone className="w-4 h-4" /> +971 55 166 7112
              </a>
              <a href="mailto:hello@floorfirst.ae" className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-accent transition-colors font-body">
                <Mail className="w-4 h-4" /> hello@floorfirst.ae
              </a>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/70 font-body">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>B3, Warehouse 10, Jebel Ali Industrial Area 1, Dubai, UAE</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-walnut-light/30 flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-walnut-light/30 flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-walnut-light/30 flex items-center justify-center hover:bg-accent transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-base mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-primary-foreground/60 hover:text-accent transition-colors font-body"
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

      <div className="border-t border-walnut-light/20">
        <div className="container-luxury py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40 font-body">
            © 2026 Floor First Dubai. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-primary-foreground/40 hover:text-primary-foreground/60 font-body transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-primary-foreground/40 hover:text-primary-foreground/60 font-body transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
