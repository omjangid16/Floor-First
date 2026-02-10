import { Link } from "react-router-dom";
import { Percent, Search } from "lucide-react";
import logo from "@/assets/floor-first-logo.png";

const AppHomeHero = () => {
  return (
    <div className="px-4 pt-4 pb-2">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="Floor First" className="h-8 w-auto object-contain" />
          <div>
            <h1 className="text-base font-bold text-foreground leading-tight">Floor First</h1>
            <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Dubai's Premium Flooring</p>
          </div>
        </div>
        <Link
          to="/products"
          className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
        >
          <Search className="w-5 h-5 text-foreground" />
        </Link>
      </div>

      {/* Offer Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-foreground p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-card/10 flex items-center justify-center shrink-0">
            <Percent className="w-5 h-5 text-card" />
          </div>
          <div className="flex-1">
            <p className="text-card font-bold text-sm">10% Off First Order</p>
            <p className="text-card/60 text-xs mt-0.5">On all orders above AED 5,000</p>
          </div>
          <Link
            to="/products"
            className="shrink-0 px-4 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-semibold"
          >
            Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppHomeHero;
