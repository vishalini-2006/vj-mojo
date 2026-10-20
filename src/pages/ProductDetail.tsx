// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// import { useCartStore } from "@/store/cartStore";
// import { ShoppingCart, Heart, Star, ChevronLeft, Truck, Shield, Check } from "lucide-react";
// import { toast } from "sonner";
// import ProductCard from "@/components/ProductCard";
// import { resolveImageSrc, setImgFallback } from "@/utils/imageFallback";
// import { buildProductImageUrl, buildProductImageUrls } from "@/utils/productImages";

// const API_LINK = import.meta.env.VITE_API_LINK;

// const ProductDetail = () => {
//   const { id } = useParams();

//   const [product, setProduct] = useState(null);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [related, setRelated] = useState([]);
//   const [CartProducts, setCartProducts] = useState();
//   const [isAddingToCart, setIsAddingToCart] = useState(false);

//   const { addToCart, toggleWishlist, isInWishlist } = useCartStore();

//   useEffect(() => {
//     fetchProduct();
//   }, [id]);

//   const addToCartBackend = async () => {
//     await axios.post(`${API_LINK}/cart`, {
//       user_id: user.id,
//       product_id: product.id,
//     });
//   };

//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get(`${API_LINK}/products/${id}`);
//       const p = res.data;

//       const formatted = {
//         id: p.id,
//         name: p.name,
//         price: Number(p.price),
//         originalPrice: p.mrp ? Number(p.mrp) : null,
//         image: buildProductImageUrl(p.images) || "",
//         images: p.images,
//         brand: p.category || "Generic",
//         partNumber: p.sku || "N/A",
//         rating: 4.5,
//         reviews: 12,
//         description: p.description || "No description available.",
//         inStock: p.stock > 0,
//         category: p.category,
//       };

//       setProduct(formatted);
//       setActiveImageIndex(0);

//       fetchRelated(p.category, p.id);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchRelated = async (category, productId) => {
//     try {
//       const res = await axios.get(`${API_LINK}/products`);

//       const formatted = res.data
//         .filter((p) => p.category === category && p.id !== productId)
//         .slice(0, 4)
//         .map((p) => ({
//           id: p.id,
//           name: p.name,
//           price: Number(p.price),
//           originalPrice: p.mrp ? Number(p.mrp) : null,
//           image: buildProductImageUrl(p.images) || "",
//           brand: p.category || "Generic",
//           rating: 4.5,
//           reviews: 10,
//           inStock: p.stock > 0,
//         }));

//       setRelated(formatted);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     console.log(product);
//   }, [id]);

//   const fetchWishlist = async () => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     const res = await axios.get(`${API_LINK}/wishlist/${user.id}`);

//     setProduct(res.data);
//   };

//   const fetchCart = async () => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     const res = await axios.get(`${API_LINK}/cart/${user.id}`);

//     setCartProducts(res.data);
//   };

//   if (!product) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center pb-20">
//         <p className="text-muted-foreground">Product not found</p>
//       </div>
//     );
//   }

//   const wishlisted = isInWishlist(product.id);

//   const gallery = buildProductImageUrls(product.images ?? product.image).filter(Boolean);
//   const mainImage =
//     gallery.length > 0
//       ? gallery[Math.min(activeImageIndex, gallery.length - 1)]
//       : product.image;

//   const discount = product.originalPrice
//     ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//     : 0;

//   const user = JSON.parse(localStorage.getItem("user"));

//   return (
//     <div className="pb-24">

//       {/* Back button */}
//       <div className="px-4 py-3">
//         <Link
//           to="/products"
//           className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
//         >
//           <ChevronLeft className="h-4 w-4" /> Back
//         </Link>
//       </div>

//       {/* Image */}
//       <div className="mb-6">
//         <div className="aspect-square overflow-hidden bg-white">
//           <img
//             src={resolveImageSrc(mainImage, product.id)}
//             alt={product.name}
//             className="h-full w-full object-contain"
//             onError={(e) => setImgFallback(e, product.id)}
//           />
//         </div>

//         {gallery.length > 1 && (
//           <div className="mt-3 flex gap-2 overflow-x-auto px-4">
//             {gallery.map((src, idx) => (
//               <button
//                 key={`${product.id}-thumb-${idx}`}
//                 type="button"
//                 onClick={() => setActiveImageIndex(idx)}
//                 className={`h-16 w-16 shrink-0 overflow-hidden rounded border bg-white ${
//                   idx === activeImageIndex ? "border-primary" : "border-border"
//                 }`}
//               >
//                 <img
//                   src={resolveImageSrc(src, `${product.id}-thumb-${idx}`, 160, 160)}
//                   alt={product.name}
//                   className="h-full w-full object-cover"
//                   onError={(e) =>
//                     setImgFallback(e, `${product.id}-thumb-${idx}`, 160, 160)
//                   }
//                 />
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Details */}
//       <div className="px-4 py-9">
//         <p className="text-xs font-semibold uppercase tracking-wider text-primary">
//           {product.brand}
//         </p>

//         <h1 className="mt-1 text-xl font-bold normal-case">
//           {product.name}
//         </h1>

//         <p className="mt-0.5 text-xs text-muted-foreground normal-case">
//           Part No: {product.partNumber}
//         </p>

//         <div className="mt-2 flex items-center gap-2 mb-7">
//           <div className="flex items-center gap-1">
//             <Star className="h-4 w-4 fill-primary text-primary" />
//             <span className="text-sm font-semibold">{product.rating}</span>
//           </div>

//           <span className="text-sm text-muted-foreground">
//             ({product.reviews} reviews)
//           </span>
//         </div>

//         <div className="mt-3 flex items-baseline gap-2">
//           <span className="text-2xl font-bold mb-4">
//             ₹{product.price.toLocaleString()}
//           </span>

//           {product.originalPrice && (
//             <>
//               <span className="text-base text-muted-foreground line-through mb-6">
//                 ₹{product.originalPrice.toLocaleString()}
//               </span>

//               <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
//                 {discount}% OFF
//               </span>
//             </>
//           )}
//         </div>

//         {product.inStock ? (
//           <p className="mt-2 flex items-center gap-1 text-sm text-success normal-case">
//             <Check className="h-4 w-4" /> In Stock
//           </p>
//         ) : (
//           <p className="mt-2 text-sm font-medium text-destructive normal-case">
//             Out of Stock
//           </p>
//         )}

//         {/* Features */}
//         <div className="mt-7 flex gap-4">
//           <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
//             <Truck className="h-3.5 w-3.5" /> Free Delivery
//           </div>

//           <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
//             <Shield className="h-3.5 w-3.5" /> Genuine Part
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mt-5">
//           <h2 className="text-sm font-bold">Description</h2>
//           <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground normal-case">
//             {product.description}
//           </p>
//         </div>
//       </div>

//       {/* Related Products */}
//       {related.length > 0 && (
//         <section className="px-4 py-9 mb-9">
//           <h2 className="mb-8 text-base font-bold">
//             Related Products
//           </h2>

//           <div className="grid grid-cols-2 gap-3 gap-x-6 gap-y-6">
//             {related.map((p) => (
//               <ProductCard key={p.id} product={p} />
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Sticky bottom bar */}
//       <div className="fixed bottom-16 left-0 right-0 z-30 border-t border-border bg-card/95 px-4 py-3 backdrop-blur-lg">
//         <div className="flex gap-3">

//           <button
//             onClick={() => {
//               if (!user?.id) {
//                 toast.error("Please login to add to wishlist");
//                 return;
//               }

//               toggleWishlist(product.id);

//               toast(
//                 wishlisted
//                   ? "Removed from wishlist"
//                   : "Added to wishlist"
//               );
//             }}
//           >
//             <Heart
//               className={`h-5 w-5 ${wishlisted ? "fill-primary" : ""}`}
//             />
//           </button>

//           <button
//             onClick={async () => {
//               if (!product.inStock) return;
//               if (isAddingToCart) return;

//               if (!user?.id) {
//                 toast.error("Please login to add to cart");
//                 return;
//               }

//               setIsAddingToCart(true);

//               try {
//                 await addToCartBackend();
//                 addToCart(product);
//                 toast.success("Added to cart!");
//               } catch {
//                 toast.error("Failed to add to cart");
//               } finally {
//                 setIsAddingToCart(false);
//               }
//             }}
//             disabled={!product.inStock || isAddingToCart}
//             className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-gradient py-2.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
//           >
//             {isAddingToCart ? (
//               <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
//             ) : (
//               <ShoppingCart className="h-5 w-5" />
//             )}

//             {isAddingToCart ? "Adding..." : "Add to Cart"}
//           </button>

//         </div>
//       </div>

//     </div>
//   );
// };

// export default ProductDetail;

import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, Heart, Star, ChevronLeft, Truck, Shield, Check } from "lucide-react";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";
import { resolveImageSrc, setImgFallback } from "@/utils/imageFallback";
import { buildProductImageUrl, buildProductImageUrls } from "@/utils/productImages";

const API_LINK = import.meta.env.VITE_API_LINK;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [related, setRelated] = useState([]);
  const [CartProducts, setCartProducts] = useState();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { addToCart, toggleWishlist, isInWishlist } = useCartStore();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const addToCartBackend = async () => {
    await axios.post(`${API_LINK}/cart`, {
      user_id: user.id,
      product_id: product.id,
    });
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_LINK}/products/${id}`);
      const p = res.data;

      const formatted = {
        id: p.id,
        name: p.name,
        price: Number(p.price),
        originalPrice: p.mrp ? Number(p.mrp) : null,
        image: buildProductImageUrl(p.images) || "",
        images: p.images,
        brand: p.category || "Generic",
        partNumber: p.sku || "N/A",
        rating: 4.5,
        reviews: 12,
        description: p.description || "No description available.",
        inStock: p.stock > 0,
        category: p.category,
      };

      setProduct(formatted);
      setActiveImageIndex(0);

      fetchRelated(p.category, p.id);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRelated = async (category, productId) => {
    try {
      const res = await axios.get(`${API_LINK}/products`);

      const formatted = res.data
        .filter((p) => p.category === category && p.id !== productId)
        .slice(0, 4)
        .map((p) => ({
          id: p.id,
          name: p.name,
          price: Number(p.price),
          originalPrice: p.mrp ? Number(p.mrp) : null,
          image: buildProductImageUrl(p.images) || "",
          brand: p.category || "Generic",
          rating: 4.5,
          reviews: 10,
          inStock: p.stock > 0,
        }));

      setRelated(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(product);
  }, [id]);

  const fetchWishlist = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.get(`${API_LINK}/wishlist/${user.id}`);
    setProduct(res.data);
  };

  const fetchCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.get(`${API_LINK}/cart/${user.id}`);
    setCartProducts(res.data);
  };

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pb-20">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  const gallery = buildProductImageUrls(product.images ?? product.image).filter(Boolean);
  const mainImage =
    gallery.length > 0
      ? gallery[Math.min(activeImageIndex, gallery.length - 1)]
      : product.image;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="pb-24">

      {/* Back button */}
      <div className="px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
      </div>

      {/* Image */}
      <div className="mb-6">
        <div className="aspect-square overflow-hidden bg-white">
          <img
            src={resolveImageSrc(mainImage, product.id)}
            alt={product.name}
            className="h-full w-full object-contain"
            onError={(e) => setImgFallback(e, product.id)}
          />
        </div>

        {gallery.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto px-4">
            {gallery.map((src, idx) => (
              <button
                key={`${product.id}-thumb-${idx}`}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`h-16 w-16 shrink-0 overflow-hidden rounded border bg-white ${
                  idx === activeImageIndex ? "border-primary" : "border-border"
                }`}
              >
                <img
                  src={resolveImageSrc(src, `${product.id}-thumb-${idx}`, 160, 160)}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  onError={(e) =>
                    setImgFallback(e, `${product.id}-thumb-${idx}`, 160, 160)
                  }
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="px-4 py-9">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {product.brand}
        </p>

        <h1 className="mt-1 text-xl font-bold normal-case">
          {product.name}
        </h1>

        <p className="mt-0.5 text-xs text-muted-foreground normal-case">
          Part No: {product.partNumber}
        </p>

        <div className="mt-2 flex items-center gap-2 mb-7">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-semibold">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviews} reviews)
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold mb-4">
            ₹{product.price.toLocaleString()}
          </span>

          {product.originalPrice && (
            <>
              <span className="text-base text-muted-foreground line-through mb-6">
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                {discount}% OFF
              </span>
            </>
          )}
        </div>

        {product.inStock ? (
          <p className="mt-2 flex items-center gap-1 text-sm text-success normal-case">
            <Check className="h-4 w-4" /> In Stock
          </p>
        ) : (
          <p className="mt-2 text-sm font-medium text-destructive normal-case">
            Out of Stock
          </p>
        )}

        {/* Features */}
        <div className="mt-7 flex gap-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Truck className="h-3.5 w-3.5" /> Free Delivery
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5" /> Genuine Part
          </div>
        </div>

        {/* Description */}
        <div className="mt-5">
          <h2 className="text-sm font-bold">Description</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground normal-case">
            {product.description}
          </p>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="px-4 py-9 mb-9">
          <h2 className="mb-8 text-base font-bold">
            Related Products
          </h2>
          <div className="grid grid-cols-2 gap-3 gap-x-6 gap-y-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky bottom bar */}
      <div className="fixed bottom-16 left-0 right-0 z-30 border-t border-border bg-card/95 px-4 py-3 backdrop-blur-lg">
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (!user?.id) {
                toast.error("Please login to add to wishlist");
                return;
              }
              toggleWishlist(product.id);
              toast(wishlisted ? "Removed from wishlist" : "Added to wishlist");
            }}
          >
            <Heart className={`h-5 w-5 ${wishlisted ? "fill-primary" : ""}`} />
          </button>

          <button
            onClick={async () => {
              if (!product.inStock) return;
              if (isAddingToCart) return;
              if (!user?.id) {
                toast.error("Please login to add to cart");
                return;
              }
              setIsAddingToCart(true);
              try {
                await addToCartBackend();
                addToCart(product);
                toast.success("Added to cart!");
              } catch {
                toast.error("Failed to add to cart");
              } finally {
                setIsAddingToCart(false);
              }
            }}
            disabled={!product.inStock || isAddingToCart}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-gradient py-2.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {isAddingToCart ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
            ) : (
              <ShoppingCart className="h-5 w-5" />
            )}
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductDetail;