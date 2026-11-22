import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import emptyOrders from "@/assets/empty-orders.jpg";

type OrderRow = {
  id: string;
  status: string;
  subtotal: number;
  total: number;
  currency: string;
  placed_at: string;
  order_items: { id: string; product_name: string; area: number; quantity: number }[];
};

const statusStyles: Record<string, string> = {
  processing: "bg-amber-100 text-amber-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.resolve(
      supabase
        .from("orders")
        .select("id, status, subtotal, total, currency, placed_at, order_items(id, product_name, area, quantity)")
        .eq("user_id", user.id)
        .order("placed_at", { ascending: false }),
    )
      .then(({ data, error }) => {
        if (!error) setOrders((data ?? []) as unknown as OrderRow[]);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const emptyCopy = !user
    ? { title: "Sign in to see your orders", body: "Create a free account to keep track of everything you buy." }
    : loading
      ? { title: "Loading your orders…", body: "Fetching your order history." }
      : { title: "No orders yet", body: "Your order history will appear here once you make a purchase." };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-card sticky top-0 z-10 flex items-center gap-3 h-14 px-4 border-b border-border">
        <Link to="/profile" className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
        <h1 className="text-base font-bold text-foreground">My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="w-32 h-32 rounded-2xl overflow-hidden mb-5">
            <img src={emptyOrders} alt="No orders" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-1">{emptyCopy.title}</h2>
          <p className="text-sm text-muted-foreground mb-6">{emptyCopy.body}</p>
          <div className="flex gap-3">
            {!user && (
              <Link to="/sign-in" className="px-6 py-3 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                Sign In
              </Link>
            )}
            <Link to="/products" className="px-6 py-3 rounded-xl bg-card border border-border text-foreground text-sm font-semibold hover:bg-muted transition-colors">
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="px-4 py-4 space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="bg-card rounded-2xl border border-border p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground">
                    Order #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.placed_at).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-1 rounded-full capitalize ${
                    statusStyles[order.status] ?? "bg-muted text-muted-foreground"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-border/50 space-y-1.5">
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3">
                    <p className="text-xs text-foreground truncate">{item.product_name}</p>
                    <p className="text-xs text-muted-foreground shrink-0">
                      {item.area} sqft · ×{item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                <p className="text-sm font-bold text-foreground">
                  {order.currency} {Number(order.total).toFixed(2)}
                </p>
                <button className="flex items-center gap-1 text-xs font-semibold text-accent">
                  View details
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
