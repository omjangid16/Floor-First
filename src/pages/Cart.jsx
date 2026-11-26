import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CreditCard, CheckCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

const Cart = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    toggleInstallation,
    clearCart,
    totalPrice,
  } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState("cart");
  const [submitting, setSubmitting] = useState(false);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState("");
  const [formData, setFormData] = useState({
    name: user?.fullName || user?.user_metadata?.full_name || "",
    email: user?.email || "",
    phone: user?.phone || user?.user_metadata?.phone || "",
    address: "",
    city: "Dubai",
    notes: "",
  });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (user) {
        const orderData = await api.post("/orders", {
          items: items.map((i) => ({
            product_id: i.product.id,
            product_name: i.product.name,
            image: i.product.image || "",
            area: i.area,
            quantity: i.quantity || 1,
            unit_price: i.product.pricePerSqft,
            installation: i.includeInstallation,
          })),
          subtotal: totalPrice,
          total: totalPrice,
          shippingAddress: {
            recipient_name: formData.name,
            phone: formData.phone,
            line1: formData.address,
            city: formData.city,
          },
          customerInfo: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
          notes: formData.notes,
        });

        if (orderData?.orderNumber) {
          setConfirmedOrderNumber(orderData.orderNumber);
        }
      }

      clearCart();
      setStep("confirmation");
    } catch (error) {
      toast({
        title: "Could not place order",
        description: error.message || "Failed to submit your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (step === "confirmation") {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 rounded-full gradient-accent flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-accent-foreground" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground font-body mb-2">
            Order #{confirmedOrderNumber || `FF-2026-${Math.floor(Math.random() * 9000 + 1000)}`}
          </p>
          <p className="text-muted-foreground font-body mb-8">
            Our team will contact you within 24 hours to schedule installation and finalize details.
          </p>
          <Link
            to="/products"
            className="gradient-accent text-accent-foreground px-8 py-3.5 rounded-lg font-body font-bold inline-block hover:opacity-90 transition-opacity"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">
            Your Cart is Empty
          </h1>
          <p className="text-muted-foreground font-body mb-6">
            Browse our premium flooring collection to get started.
          </p>
          <Link
            to="/products"
            className="gradient-accent text-accent-foreground px-8 py-3.5 rounded-lg font-body font-bold inline-block hover:opacity-90 transition-opacity"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container-luxury py-8 lg:py-12">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-sm transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>

        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
          {step === "cart" ? "Shopping Cart" : "Checkout Details"}
        </h1>

        {step === "cart" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  className="bg-card rounded-xl border border-border p-6 shadow-luxury"
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg bg-secondary shrink-0 overflow-hidden">
                      {item.product.image && (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-xs text-accent font-body font-bold uppercase">
                            {item.product.category}
                          </p>
                          <h3 className="font-display font-bold text-foreground">
                            {item.product.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground font-body">
                            Area:
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  Math.max(5, item.area - 5)
                                )
                              }
                              className="w-7 h-7 rounded bg-secondary flex items-center justify-center hover:bg-sand-dark transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-16 text-center font-body font-semibold text-foreground">
                              {item.area} sqft
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.area + 5)
                              }
                              className="w-7 h-7 rounded bg-secondary flex items-center justify-center hover:bg-sand-dark transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.includeInstallation}
                            onChange={() => toggleInstallation(item.product.id)}
                            className="w-4 h-4 accent-burnt-orange"
                          />
                          <span className="text-sm font-body text-muted-foreground">
                            Installation
                          </span>
                        </label>

                        <div className="ml-auto">
                          <span className="font-display font-bold text-foreground">
                            AED{" "}
                            {(
                              item.product.pricePerSqft * item.area +
                              (item.includeInstallation ? item.area * 25 : 0)
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-luxury h-fit sticky top-28">
              <h3 className="font-display font-bold text-foreground text-lg mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between text-sm font-body"
                  >
                    <span className="text-muted-foreground">
                      {item.product.name} ({item.area} sqft)
                    </span>
                    <span className="text-foreground">
                      AED{" "}
                      {(item.product.pricePerSqft * item.area).toLocaleString()}
                    </span>
                  </div>
                ))}
                {items.some((i) => i.includeInstallation) && (
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-muted-foreground">Installation</span>
                    <span className="text-foreground">
                      AED{" "}
                      {items
                        .filter((i) => i.includeInstallation)
                        .reduce((sum, i) => sum + i.area * 25, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between font-display font-bold text-lg text-foreground">
                  <span>Total</span>
                  <span>AED {totalPrice.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground font-body mt-1">
                  VAT inclusive
                </p>
              </div>

              <button
                onClick={() => setStep("details")}
                className="w-full gradient-accent text-accent-foreground py-3.5 rounded-lg font-body font-bold hover:opacity-90 transition-opacity"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        {step === "details" && (
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handlePlaceOrder} className="space-y-5">
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
                    Phone *
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
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                  Email *
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

              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                  Delivery Address *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                  Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notes: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none resize-none"
                  placeholder="Installation scheduling preferences, access instructions, etc."
                />
              </div>

              <div className="bg-secondary rounded-xl p-6">
                <h3 className="font-display font-bold text-foreground mb-3">
                  Order Total: AED {totalPrice.toLocaleString()}
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  Payment will be processed upon delivery or installation. Our team will contact you to confirm.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep("cart")}
                  className="flex-1 border border-border text-foreground py-3.5 rounded-lg font-body font-bold hover:bg-secondary transition-colors"
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 gradient-accent text-accent-foreground py-3.5 rounded-lg font-body font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <CreditCard className="w-5 h-5" />
                  {submitting ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
