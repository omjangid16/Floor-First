import { Link } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";

const MyOrders = () => (
  <div className="min-h-screen bg-muted/30">
    <div className="bg-card sticky top-0 z-10 flex items-center gap-3 h-14 px-4 border-b border-border">
      <Link to="/profile" className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </Link>
      <h1 className="text-base font-bold text-foreground">My Orders</h1>
    </div>
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Package className="w-7 h-7 text-muted-foreground" />
      </div>
      <h2 className="text-lg font-bold text-foreground mb-1">No orders yet</h2>
      <p className="text-sm text-muted-foreground mb-6">Your order history will appear here once you make a purchase.</p>
      <Link to="/products" className="px-6 py-3 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
        Start Shopping
      </Link>
    </div>
  </div>
);

export default MyOrders;
