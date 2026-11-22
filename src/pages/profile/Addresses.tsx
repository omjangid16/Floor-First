import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, MapPin, Trash2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import emptyAddress from "@/assets/empty-address.jpg";

type Address = {
  id: string;
  label: string;
  recipient_name: string;
  phone: string | null;
  line1: string;
  line2: string | null;
  city: string;
  emirate: string | null;
  is_default: boolean;
};

const blankForm = {
  label: "Home",
  recipient_name: "",
  phone: "",
  line1: "",
  line2: "",
  city: "Dubai",
  emirate: "Dubai",
};

const Addresses = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState(blankForm);

  const load = () => {
    if (!user) return;
    setLoading(true);
    Promise.resolve(
      supabase
        .from("addresses")
        .select("*")
        .eq("user_id", user.id)
        .order("is_default", { ascending: false })
        .order("created_at", { ascending: false }),
    )
      .then(({ data, error }) => {
        if (!error) setAddresses((data ?? []) as Address[]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, [user]);

  const handleAdd = async () => {
    if (!user) return;
    if (!form.recipient_name.trim() || !form.line1.trim()) {
      toast({ title: "Missing details", description: "Please add a recipient name and address line.", variant: "destructive" });
      return;
    }

    setBusy(true);
    const isFirst = addresses.length === 0;

    const { error } = await supabase.from("addresses").insert({
      user_id: user.id,
      label: form.label,
      recipient_name: form.recipient_name.trim(),
      phone: form.phone.trim() || null,
      line1: form.line1.trim(),
      line2: form.line2.trim() || null,
      city: form.city.trim() || "Dubai",
      emirate: form.emirate.trim() || null,
      is_default: isFirst,
    });

    setBusy(false);

    if (error) {
      toast({ title: "Could not save address", description: error.message, variant: "destructive" });
      return;
    }

    setForm(blankForm);
    setShowForm(false);
    toast({ title: "Address saved", description: "Your delivery address has been added." });
    load();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("addresses").delete().eq("id", id);
    if (error) {
      toast({ title: "Could not delete", description: error.message, variant: "destructive" });
      return;
    }
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast({ title: "Address removed" });
  };

  const handleDefault = async (id: string) => {
    setBusy(true);
    await supabase.from("addresses").update({ is_default: false }).eq("user_id", user!.id);
    const { error } = await supabase.from("addresses").update({ is_default: true }).eq("id", id);
    setBusy(false);
    if (error) {
      toast({ title: "Could not update", description: error.message, variant: "destructive" });
      return;
    }
    load();
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent";

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-card sticky top-0 z-10 flex items-center justify-between h-14 px-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Link to="/profile" className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
          <h1 className="text-base font-bold text-foreground">Addresses</h1>
        </div>
        {user && (
          <button
            onClick={() => setShowForm((v) => !v)}
            className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center"
            aria-label="Add new address"
          >
            <Plus className="w-5 h-5 text-accent" />
          </button>
        )}
      </div>

      {showForm && user && (
        <div className="px-4 pt-4">
          <div className="bg-card rounded-2xl border border-border p-4 shadow-sm space-y-3">
            <p className="text-sm font-bold text-foreground">New delivery address</p>

            <div className="grid grid-cols-2 gap-3">
              <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Label" className={inputClass} />
              <input value={form.recipient_name} onChange={(e) => setForm({ ...form, recipient_name: e.target.value })} placeholder="Recipient name" className={inputClass} />
            </div>

            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone (optional)" className={inputClass} />
            <input value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} placeholder="Address line 1" className={inputClass} />
            <input value={form.line2} onChange={(e) => setForm({ ...form, line2: e.target.value })} placeholder="Address line 2 (optional)" className={inputClass} />

            <div className="grid grid-cols-2 gap-3">
              <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" className={inputClass} />
              <input value={form.emirate} onChange={(e) => setForm({ ...form, emirate: e.target.value })} placeholder="Emirate" className={inputClass} />
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={handleAdd}
                disabled={busy}
                className="flex-1 py-3 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                Save Address
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-5 py-3 rounded-xl bg-card border border-border text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {!user ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="w-32 h-32 rounded-2xl overflow-hidden mb-5">
            <img src={emptyAddress} alt="No addresses" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-1">You're not signed in</h2>
          <p className="text-sm text-muted-foreground mb-6">Sign in to save and manage your delivery addresses.</p>
          <Link to="/sign-in" className="px-6 py-3 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
            Sign In
          </Link>
        </div>
      ) : addresses.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="w-32 h-32 rounded-2xl overflow-hidden mb-5">
            <img src={emptyAddress} alt="No addresses" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-1">No addresses saved</h2>
          <p className="text-sm text-muted-foreground mb-6">Add a delivery address so we can ship your orders to the right place.</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Add New Address
          </button>
        </div>
      ) : (
        <div className="px-4 py-4 space-y-3">
          {addresses.map((address) => (
            <div key={address.id} className="bg-card rounded-2xl border border-border p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-foreground">{address.label}</p>
                    {address.is_default && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-foreground mt-1">{address.recipient_name}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                    {[address.line1, address.line2, address.city, address.emirate].filter(Boolean).join(", ")}
                  </p>
                  {address.phone && <p className="text-xs text-muted-foreground mt-0.5">{address.phone}</p>}
                </div>
              </div>

              <div className="flex gap-2 mt-3 pt-3 border-t border-border/50">
                {!address.is_default && (
                  <button
                    onClick={() => handleDefault(address.id)}
                    disabled={busy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:bg-muted transition-colors disabled:opacity-60"
                  >
                    <Star className="w-3.5 h-3.5" />
                    Make default
                  </button>
                )}
                <button
                  onClick={() => handleDelete(address.id)}
                  className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-destructive hover:bg-destructive/5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;
