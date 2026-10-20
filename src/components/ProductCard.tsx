import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { resolveImageSrc, setImgFallback } from "@/utils/imageFallback";
import axios from "axios";

interface ProductCardProps {
  product: Product;
}
// Note: This component is used in multiple places, so it handles its own wishlist state and cart interactions.
const ProductCard = ({ product }: ProductCardProps) => {
  const API_LINK = import.meta.env.VITE_API_LINK;

  const { addToCart, toggleWishlist } = useCartStore();

  const [wishlisted, setWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    checkWishlist();
  }, []);

  const checkWishlist = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user?.id) return;

      const res = await axios.get(
        `${API_LINK}/wishlist/${user.id}`
      );

      const wishlistItems = Array.isArray(res.data) ? res.data : [];

      const exists = wishlistItems.some(
        (item: any) => item.id === product.id
      );

      setWishlisted(exists);

    } catch (error) {
      console.error(error);
    }
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const addToCartBackend = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user?.id) {
      toast.error("Please login to add to cart");
      return;
    }

    if (isAddingToCart) return;

    setIsAddingToCart(true);

    try {
      await axios.post(`${API_LINK}/cart`, {
        user_id: user.id,
        product_id: product.id,
      });

      addToCart(product);
      toast.success("Added to cart!");

    } catch {
      toast.error("Failed to add to cart");

    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/30">

      {/* Wishlist */}
      <button
        onClick={(e) => {
          e.preventDefault();

          const user = JSON.parse(localStorage.getItem("user") || "{}");

          if (!user?.id) {
            toast.error("Please login to add to wishlist");
            return;
          }

          toggleWishlist(product.id);
          setWishlisted(!wishlisted);

          toast(
            wishlisted
              ? "Removed from wishlist"
              : "Added to wishlist"
          );
        }}
        className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-1.5 backdrop-blur-sm transition-colors hover:bg-white"
      >
        <Heart
          className={`h-3.5 w-3.5 ${
            wishlisted
              ? "fill-primary text-primary"
              : "text-muted-foreground"
          }`}
        />
      </button>

      {/* Discount Badge */}
      {discount > 0 && (
        <span className="absolute left-2 top-2 z-10 rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
          -{discount}%
        </span>
      )}

      {/* Product Image */}
      <Link
        to={`/product/${product.id}`}
        className="block shrink-0"
      >
        <div className="aspect-[4/3] w-full overflow-hidden bg-[hsl(var(--product-image-bg))]">
          <img
            src={resolveImageSrc(product.image, product.id)}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            onError={(e) => setImgFallback(e, product.id)}
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-col gap-1 p-3">

        <p className="text-[9px] font-medium uppercase tracking-widest text-primary truncate">
          {product.brand}
        </p>

        <Link to={`/product/${product.id}`}>
          <h3 className="line-clamp-2 text-sm font-normal leading-snug text-foreground normal-case">
            {product.name}
          </h3>
        </Link>

        {product.reviews > 0 && (
          <div className="flex items-center gap-0.5">
            <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-normal text-muted-foreground">
              {product.rating}
            </span>
          </div>
        )}

        <div className="mt-auto pt-2 flex items-center justify-between gap-2">

          <div className="flex flex-col">
            <span className="text-xl font-bold leading-tight text-foreground">
              ₹{product.price.toLocaleString()}
            </span>

            {product.originalPrice && (
              <span className="text-[11px] font-normal text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={() => {
              if (!product.inStock) return;
              addToCartBackend();
            }}
            disabled={!product.inStock || isAddingToCart}
            className="shrink-0 rounded-xl bg-primary p-2 text-white shadow-sm transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-40"
          >
            {isAddingToCart ? (
              <span className="block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
          </button>
        </div>

        {!product.inStock && (
          <p className="text-[11px] font-medium text-destructive">
            Out of Stock
          </p>
        )}

      </div>
    </div>
  );
};

export default ProductCard;
