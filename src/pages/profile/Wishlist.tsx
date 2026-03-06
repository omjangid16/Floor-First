import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import emptyWishlist from "@/assets/empty-wishlist.jpg";

const Wishlist = () => (
  <div className="min-h-screen bg-muted/30">
    <div className="bg-card sticky top-0 z-10 flex items-center gap-3 h-14 px-4 border-b border-border">
      <Link to="/profile" className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </Link>
      <h1 className="text-base font-bold text-foreground">Wishlist</h1>
    </div>
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="w-32 h-32 rounded-2xl overflow-hidden mb-5">
        <img src={emptyWishlist} alt="Empty wishlist" className="w-full h-full object-cover" />
      </div>
      <h2 className="text-lg font-bold text-foreground mb-1">Your wishlist is empty</h2>
      <p className="text-sm text-muted-foreground mb-6">Save your favourite products here to find them easily later.</p>
      <Link to="/products" className="px-6 py-3 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
        Browse Products
      </Link>
    </div>
  </div>
);

export default Wishlist;
