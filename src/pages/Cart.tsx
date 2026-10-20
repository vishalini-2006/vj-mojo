// import { useEffect, useState } from "react";
// import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
// import { Link } from "react-router-dom";
// import { toast } from "sonner";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { resolveImageSrc, setImgFallback } from "@/utils/imageFallback";
// import { buildProductImageUrl } from "@/utils/productImages";

// const API_LINK = import.meta.env.VITE_API_LINK;

// const Cart = () => {

//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {

//     try {

//       const user = JSON.parse(localStorage.getItem("user"));

//       const res = await axios.get(
//         `${API_LINK}/cart/${user.id}`
//       );

//       const formatted = res.data.map((p) => ({
//         product: {
//           id: p.id,
//           name: p.name,
//           price: Number(p.price),
//           image: buildProductImageUrl(p.images) || "",
//           brand: p.category
//         },
//         quantity: p.quantity
//       }));

//       setItems(formatted);

//     } catch (err) {
//       console.log(err);
//     }

//   };

//   const updateQty = async (productId, newQty) => {

//     const user = JSON.parse(localStorage.getItem("user"))

//     await axios.put(`${API_LINK}/cart/update`, {
//       user_id: user.id,
//       product_id: productId,
//       quantity: newQty
//     })

//     fetchCart()

//   }

//   const navigate = useNavigate();


//   const getTotal = () => {
//     return items.reduce(
//       (total, item) => total + item.product.price * item.quantity,
//       0
//     );
//   };

//   if (items.length === 0) {

//     return (
//       <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 pb-20">

//         <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />

//         <h2 className="text-xl font-bold">
//           Your Cart is Empty
//         </h2>

//         <p className="text-sm text-muted-foreground normal-case">
//           Add some awesome parts!
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

//     <div className="px-4 py-5 pb-48">

//       <h1 className="text-2xl font-bold mb-4">
//         My Cart
//       </h1>

//       <div className="space-y-3">

//         {items.map(({ product, quantity }) => (

//           <div
//             key={product.id}
//             className="flex gap-3 rounded-lg border border-border bg-card p-3"
//           >

//             <Link
//               to={`/product/${product.id}`}
//               className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-secondary"
//             >
//               <img
//                 src={resolveImageSrc(product.image, product.id, 160, 160)}
//                 className="h-full w-full object-cover"
//                 onError={(e) => setImgFallback(e, product.id, 160, 160)}
//               />
//             </Link>

//             <div className="flex flex-1 flex-col justify-between">

//               <div>

//                 <p className="text-xs text-primary">
//                   {product.brand}
//                 </p>

//                 <p className="text-sm font-medium">
//                   {product.name}
//                 </p>

//               </div>

//               <div className="flex justify-between items-center">

//                 <span className="text-sm font-bold">
//                   ₹{(product.price * quantity).toLocaleString()}
//                 </span>
//                 <button
//                   onClick={() => updateQty(product.id, quantity - 1)}
//                   className="rounded-md border border-border p-1"
//                 >
//                   <Minus className="h-3.5 w-3.5" />
//                 </button>

//                 <span className="text-sm">
//                   Qty : {quantity}
//                 </span>
//                 <button
//                   onClick={() => updateQty(product.id, quantity + 1)}
//                   className="rounded-md border border-border p-1"
//                 >
//                   <Plus className="h-3.5 w-3.5" />
//                 </button>

//                 <button
//                   onClick={() => updateQty(product.id, 0)}
//                   className="ml-1 rounded-md p-1 text-destructive"
//                 >
//                   <Trash2 className="h-3.5 w-3.5" />
//                 </button>
//               </div>


//             </div>

//           </div>

//         ))}

//       </div>

//       {/* Order Summary */}

//       <div className="fixed bottom-16 left-0 right-0 border-t border-border bg-card px-4 py-4">

//         <div className="flex justify-between text-base mb-3">

//           <span>Total</span>

//           <span className="font-bold">
//             ₹{getTotal().toLocaleString()}
//           </span>

//         </div>

//         <button
//   onClick={() => navigate("/checkout")}
//   className="w-full rounded-lg bg-brand-gradient py-3 text-sm font-bold text-primary-foreground"
// >
//   Proceed to Checkout
// </button>

//       </div>

//     </div>

//   );

// };

// export default Cart;

import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CheckCircle2, Circle, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { resolveImageSrc, setImgFallback } from "@/utils/imageFallback";
import { buildProductImageUrl } from "@/utils/productImages";
import { useCartStore } from "@/store/cartStore";

const API_LINK = import.meta.env.VITE_API_LINK;

const Cart = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user.id) return;
      
      const res = await axios.get(`${API_LINK}/cart/${user.id}`);
      const formatted = res.data.map((p: any) => ({
        product: {
          id: p.id,
          name: p.name,
          price: Number(p.price),
          originalPrice: Number(p.price) * 1.25, // Mocking original price like screenshot
          image: buildProductImageUrl(p.images) || "",
          brand: p.category,
          rating: p.average_rating ? Number(p.average_rating) : 0,
          ratingCount: p.rating_count ? Number(p.rating_count) : 0,
        },
        quantity: p.quantity
      }));
      setItems(formatted);
      // Auto-select all items by default on load
      setSelectedItems(formatted.map((i: any) => i.product.id));

      // 🔄 Sync with global cart store so BottomNav badge is accurate
      useCartStore.getState().setCartItems(formatted);
    } catch (err) {
      console.log(err);
    }
  };

  const updateQty = async (productId: number, newQty: number) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    await axios.put(`${API_LINK}/cart/update`, {
      user_id: user.id,
      product_id: productId,
      quantity: newQty
    });
    fetchCart();
  };

  const toggleSelection = (productId: number) => {
    setSelectedItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(i => i.product.id));
    }
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getSelectedTotal = () => {
    return items
      .filter(item => selectedItems.includes(item.product.id))
      .reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  if (items.length === 0) {
    return (
      <div className="px-4 py-5 pb-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
          <h2 className="text-xl font-bold">Your Cart is Empty</h2>
          <p className="text-sm text-muted-foreground normal-case">Add some awesome parts!</p>
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
    <div className="px-4 py-5 pb-56 md:px-8 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Cart</h1>
        <button onClick={toggleSelectAll} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          {selectedItems.length === items.length ? (
            <CheckCircle2 className="h-5 w-5 text-primary fill-primary text-white" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
          All
        </button>
      </div>

      <div className="space-y-4">
        {items.map(({ product, quantity }) => (
          <div
            key={product.id}
            className="flex items-start gap-3 rounded-xl border border-primary/30 bg-[#f9ebf3]/30 p-3 transition-colors hover:border-primary/50 relative"
          >
            <button onClick={() => toggleSelection(product.id)} className="shrink-0 mt-6">
              {selectedItems.includes(product.id) ? (
                <CheckCircle2 className="h-5 w-5 text-primary fill-primary text-white" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </button>

            <Link
              to={`/product/${product.id}`}
              className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-white border border-border p-1 flex items-center justify-center"
            >
              <img
                src={resolveImageSrc(product.image, product.id, 160, 160)}
                className="h-full w-full object-contain"
                onError={(e) => setImgFallback(e, product.id, 160, 160)}
              />
            </Link>

            <div className="flex flex-1 flex-col min-w-0 h-full justify-between">
              <div>
                <span className="text-[10px] font-medium text-primary uppercase tracking-wider mb-0.5 block truncate">{product.brand}</span>
                <span className="text-sm font-semibold leading-tight mb-1 line-clamp-2">{product.name}</span>
                


                <div className="flex items-center gap-1.5 mb-2">
                  <span className="font-bold text-sm">₹{product.price.toLocaleString()}</span>
                  <span className="text-[11px] text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Actions row inline */}
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQty(product.id, quantity - 1)}
                    className="rounded-md bg-white border border-border p-1 hover:bg-muted text-foreground shadow-sm"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-xs font-semibold w-4 text-center">{quantity}</span>
                  <button
                    onClick={() => updateQty(product.id, quantity + 1)}
                    className="rounded-md bg-white border border-border p-1 hover:bg-muted text-foreground shadow-sm"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>

                <button
                  onClick={() => updateQty(product.id, 0)}
                  className="text-destructive p-1.5 rounded-md hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary Bottom Bar */}
      <div className="fixed bottom-14 md:bottom-0 left-0 right-0 border-t border-border bg-card px-4 py-4 z-40 md:relative md:mt-10 md:bg-transparent md:border-none md:p-0 md:max-w-md md:ml-auto">
        <div className="flex justify-between text-sm text-muted-foreground mb-1.5">
          <span>Cart Total</span>
          <span>₹{getTotal().toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold text-base mb-4 text-foreground">
          <span>Selected ({selectedItems.length} items)</span>
          <span className="text-primary">₹{getSelectedTotal().toLocaleString()}</span>
        </div>

        <button
          disabled={selectedItems.length === 0}
          onClick={() => navigate("/checkout")}
          className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
        >
          {selectedItems.length > 0
            ? `Proceed to Checkout (${selectedItems.length} items)`
            : "Select items to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;