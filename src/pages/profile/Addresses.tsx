import { Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import emptyAddress from "@/assets/empty-address.jpg";

const Addresses = () => (
  <div className="min-h-screen bg-muted/30">
    <div className="bg-card sticky top-0 z-10 flex items-center justify-between h-14 px-4 border-b border-border">
      <div className="flex items-center gap-3">
        <Link to="/profile" className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
        <h1 className="text-base font-bold text-foreground">Addresses</h1>
      </div>
      <button className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
        <Plus className="w-5 h-5 text-accent" />
      </button>
    </div>
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="w-32 h-32 rounded-2xl overflow-hidden mb-5">
        <img src={emptyAddress} alt="No addresses" className="w-full h-full object-cover" />
      </div>
      <h2 className="text-lg font-bold text-foreground mb-1">No addresses saved</h2>
      <p className="text-sm text-muted-foreground mb-6">Add a delivery address so we can ship your orders to the right place.</p>
      <button className="px-6 py-3 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
        Add New Address
      </button>
    </div>
  </div>
);

export default Addresses;
