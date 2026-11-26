import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Pencil, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";

const MyAccount = () => {
  const { toast } = useToast();
  const { user, updateCurrentUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
  });

  useEffect(() => {
    if (!user) return;
    setProfile({
      full_name: user.fullName || user.user_metadata?.full_name || "",
      phone: user.phone || user.user_metadata?.phone || "",
    });
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setBusy(true);

    try {
      if (updateCurrentUser) {
        const { error } = await updateCurrentUser({
          fullName: profile.full_name.trim(),
          phone: profile.phone.trim(),
        });
        if (error) throw error;
      } else {
        await api.put("/auth/profile", {
          fullName: profile.full_name.trim(),
          phone: profile.phone.trim(),
        });
      }

      toast({
        title: "Saved",
        description: "Your details have been updated.",
      });
      setEditing(false);
    } catch (error) {
      toast({
        title: "Could not save",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  const fields = [
    {
      label: "Full Name",
      value: profile.full_name || user?.fullName || "Not set",
      icon: User,
      key: "full_name",
    },
    {
      label: "Email",
      value: user?.email ?? "Not set",
      icon: Mail,
      key: null,
    },
    {
      label: "Phone",
      value: profile.phone || user?.phone || "Not set",
      icon: Phone,
      key: "phone",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-card sticky top-0 z-10 flex items-center gap-3 h-14 px-4 border-b border-border">
        <Link
          to="/profile"
          className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
        <h1 className="text-base font-bold text-foreground">My Account</h1>
        {user && (
          <button
            onClick={editing ? handleSave : () => setEditing(true)}
            disabled={busy}
            className="ml-auto w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center disabled:opacity-60"
            aria-label={editing ? "Save changes" : "Edit details"}
          >
            {editing ? (
              <Check className="w-5 h-5 text-accent" />
            ) : (
              <Pencil className="w-5 h-5 text-accent" />
            )}
          </button>
        )}
      </div>

      {!user ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-1">
            You're not signed in
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Sign in to view and edit your personal details.
          </p>
          <Link
            to="/sign-in"
            className="px-6 py-3 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Sign In
          </Link>
        </div>
      ) : (
        <div className="px-4 py-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center mb-3">
              <User className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-lg font-bold text-foreground">
              {profile.full_name || user.fullName || user.email?.split("@")[0]}
            </h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
            {fields.map((field, i) => (
              <div
                key={field.label}
                className={`flex items-center gap-4 px-5 py-4 ${
                  i < fields.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                <field.icon className="w-5 h-5 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{field.label}</p>
                  {editing && field.key ? (
                    <input
                      value={profile[field.key]}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          [field.key]: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent"
                    />
                  ) : (
                    <p className="text-sm font-medium text-foreground truncate">
                      {field.value}
                    </p>
                  )}
                </div>
                {editing && !field.key && (
                  <X className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>

          {editing && (
            <button
              onClick={() => setEditing(false)}
              className="mt-3 w-full py-3 rounded-xl bg-card border border-border text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MyAccount;
