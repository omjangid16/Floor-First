import { Link } from "react-router-dom";
import { ArrowLeft, Heart, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/hooks/useWishlist";
import { products } from "@/data/products";
import emptyWishlist from "@/assets/empty-wishlist.jpg";

const Wishlist = () => {
  const { user } = useAuth();
  const { ids, loading, toggle } = useWishlist();
  const saved = products.filter((p) => ids.includes(p.id));

  const emptyCopy = !user
    ? { title: "Sign in to save products", body: "Create a free account to keep your favourite flooring here." }
    : loading
      ? { title: "Loading your wishlist…", body: "Fetching the products you saved." }
      : { title: "Your wishlist is empty", body: "Save your favourite products here to find them easily later." };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-card sticky top-0 z-10 flex items-center gap-3 h-14 px-4 border-b border-border">
        <Link to="/profile" className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
        <h1 className="text-base font-bold text-foreground">Wishlist</h1>
        {saved.length > 0 && (
          <span className="ml-auto text-xs font-semibold text-muted-foreground">
            {saved.length} saved
          </span>
        )}
      </div>

      {saved.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="w-32 h-32 rounded-2xl overflow-hidden mb-5">
            <img src={emptyWishlist} alt="Empty wishlist" className="w-full h-full object-cover" />
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
              Browse Products
            </Link>
          </div>
        </div>
      ) : (
        <div className="px-4 py-4 grid grid-cols-2 gap-3">
          {saved.map((product) => (
            <div key={product.id} className="relative bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
              <Link to={`/products/${product.id}`} className="block">
                <div className="aspect-square bg-muted relative">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Heart className="w-8 h-8 text-muted-foreground/40" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-foreground line-clamp-2 leading-snug">{product.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{product.material}</p>
                  <p className="text-sm font-bold text-accent mt-1.5">
                    AED {product.pricePerSqft}
                    <span className="text-[10px] font-medium text-muted-foreground">/sqft</span>
                  </p>
                </div>
              </Link>
              <button
                onClick={() => toggle(product.id)}
                aria-label={`Remove ${product.name} from wishlist`}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-card/90 border border-border flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
