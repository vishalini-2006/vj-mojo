// import { useEffect, useState } from "react";
// import axios from "axios";
// import ProductCard from "@/components/ProductCard";
// import { Heart } from "lucide-react";
// import { Link } from "react-router-dom";
// import { buildProductImageUrl } from "@/utils/productImages";

// const API_LINK = import.meta.env.VITE_API_LINK;

// const Wishlist = () => {

//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   const fetchWishlist = async () => {

//     try {

//       const user = JSON.parse(localStorage.getItem("user"));

//       if (!user) return;

//       const res = await axios.get(
//         `${API_LINK}/wishlist/${user.id}`
//       );

//       const raw = Array.isArray(res.data) ? res.data : res.data ? [res.data] : [];

//       const formatted = raw.map((p: any) => ({
//         id: p.id,
//         name: p.name,
//         price: Number(p.price),
//         originalPrice: p.mrp ? Number(p.mrp) : null,
//         image: buildProductImageUrl(p.images) || "",
//         brand: p.category || "Generic",
//         rating: 4.5,
//         reviews: 10,
//         inStock: p.stock > 0,
//       }));

//       const aggregated = Array.from(
//         formatted
//           .reduce((acc: Map<string, any>, p: any) => {
//             const key = String(p.id ?? "");
//             if (!key) return acc;

//             const existing = acc.get(key);
//             if (existing) {
//               acc.set(key, { ...existing, quantity: (existing.quantity ?? 1) + 1 });
//             } else {
//               acc.set(key, { ...p, quantity: 1 });
//             }

//             return acc;
//           }, new Map())
//           .values()
//       );

//       setProducts(aggregated);

//     } catch (err) {
//       console.error(err);
//     }

//   };

//   if (products.length === 0) {
//     return (
//       <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 pb-20">
//         <Heart className="h-16 w-16 text-muted-foreground/30" />

//         <h2 className="text-xl font-bold">
//           Wishlist is Empty
//         </h2>

//         <p className="text-sm text-muted-foreground normal-case">
//           Save items you love!
//         </p>

//         <Link
//           to="/products"
//           className="rounded-lg bg-brand-gradient px-6 py-2.5 text-sm font-semibold text-primary-foreground"
//         >
//           Browse Products
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="px-4 py-5 pb-20">

//       <h1 className="mb-4 text-2xl font-bold">
//         My Wishlist
//       </h1>

//       <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

//         {products.map((product: any) => (
//           <div key={product.id} className="relative">
//             <ProductCard product={product} />
//             {product.quantity > 1 && (
//               <div className="absolute left-2 top-2 z-20 rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
//                 x{product.quantity}
//               </div>
//             )}
//           </div>
//         ))}

//       </div>

//     </div>
//   );
// };

// export default Wishlist;

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { Heart, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { buildProductImageUrl } from "@/utils/productImages";

const API_LINK = import.meta.env.VITE_API_LINK;

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;
      const res = await axios.get(`${API_LINK}/wishlist/${user.id}`);
      const raw = Array.isArray(res.data) ? res.data : res.data ? [res.data] : [];
      const formatted = raw.map((p: any) => ({
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
      const aggregated = Array.from(
        formatted.reduce((acc: Map<string, any>, p: any) => {
          const key = String(p.id ?? "");
          if (!key) return acc;
          const existing = acc.get(key);
          if (existing) {
            acc.set(key, { ...existing, quantity: (existing.quantity ?? 1) + 1 });
          } else {
            acc.set(key, { ...p, quantity: 1 });
          }
          return acc;
        }, new Map()).values()
      );
      setProducts(aggregated);
    } catch (err) {
      console.error(err);
    }
  };

if (products.length === 0) {
  return (
    <div className="px-4 py-5 pb-20">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Heart className="h-16 w-16 text-muted-foreground/30" />
        <h2 className="text-xl font-bold">Wishlist is Empty</h2>
        <p className="text-sm text-muted-foreground normal-case">Save items you love!</p>
        <Link
          to="/products"
          className="rounded-lg bg-brand-gradient px-6 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}

  return (
    <div className="px-4 py-5 pb-20">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <h1 className="mb-4 text-2xl font-bold">My Wishlist</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {products.map((product: any) => (
          <div key={product.id} className="relative">
            <ProductCard product={product} />
            {product.quantity > 1 && (
              <div className="absolute left-2 top-2 z-20 rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                x{product.quantity}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;