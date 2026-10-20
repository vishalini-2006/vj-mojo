// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { resolveImageSrc, setImgFallback } from "@/utils/imageFallback";
// import { buildProductImageUrl } from "@/utils/productImages";

// const API_LINK = import.meta.env.VITE_API_LINK;
// const PRODUCT_IMAGE_BASE = "https://xiadot.com/vkautoparts/uploads/products/";

// const OrderDetails = () => {
//   const { id } = useParams();
//   const [data, setData] = useState<any>(null);

//   // Review states
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

//   useEffect(() => {
//     fetchDetails();
//   }, []);

//   const fetchDetails = async () => {
//     try {
//       const res = await axios.get(`${API_LINK}/orders/details/${id}`);
//       setData(res.data);
//       console.log(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Submit Review
//   const submitReview = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user") || "{}");

//       if (!rating || !selectedProductId) {
//         alert("Please select rating first");
//         return;
//       }

//       await axios.post(`${API_LINK}/reviews`, {
//         user_id: user.id,
//         product_id: selectedProductId,
//         order_id: data.order.id,
//         rating,
//         comment
//       });

//       alert("Review submitted successfully ⭐");

//       setRating(0);
//       setComment("");
//       setSelectedProductId(null);

//     } catch (error) {
//       console.log(error);
//       alert("Failed to submit review");
//     }
//   };

//   if (!data) return <p className="p-4">Loading...</p>;

//   const { order, items } = data;

//   return (
//     <div className="px-4 py-5 pb-20">

//       <h1 className="text-xl font-bold mb-4">
//         Order Details
//       </h1>

//       {/* Order Info */}
//       <div className="border p-4 rounded-lg mb-4">
//         <p><b>Order:</b> {order.order_number}</p>
//         <p><b>Status:</b> {order.status}</p>
//         <p><b>Total:</b> ₹{order.total_amount}</p>
//         <p><b>Payment:</b> {order.payment_method}</p>
//       </div>

//       {/* Products */}
//       <div className="space-y-3">

//         {items.map((item: any) => (

//           <div
//             key={item.id}
//             className="border p-4 rounded-lg"
//           >

//             <div className="flex gap-3">

//               <img
//                 src={resolveImageSrc(
//                   buildProductImageUrl(item.images ?? item.image_url ?? item.image) ||
//                     (typeof item.image_url === "string" && item.image_url.trim()
//                       ? `${PRODUCT_IMAGE_BASE}${item.image_url.trim()}`
//                       : ""),
//                   item.id,
//                   160,
//                   160
//                 )}
//                 className="h-20 w-20 object-cover rounded"
//                 onError={(e) => setImgFallback(e, item.id, 160, 160)}
//               />

//               <div className="flex-1">

//                 <p className="font-medium">{item.name}</p>

//                 <p className="text-sm text-muted-foreground">
//                   Qty: {item.quantity}
//                 </p>

//                 <p className="text-sm font-semibold">
//                   ₹{item.price}
//                 </p>

//               </div>
//             </div>

//             {/* Review Card */}
//             {order.status === "delivered" && (
//               <div className="mt-4 border rounded-lg p-4 bg-white">

//                 <h2 className="font-semibold mb-3">
//                   Rate Your Order
//                 </h2>

//                 {/* Stars */}
//                 <div className="flex gap-2 text-2xl mb-4">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <button
//                       key={star}
//                       onClick={() => {
//                         setRating(star);
//                         setSelectedProductId(item.product_id);
//                       }}
//                       className={
//                         star <= rating
//                           ? "text-yellow-500"
//                           : "text-gray-300"
//                       }
//                     >
//                       ★
//                     </button>
//                   ))}
//                 </div>

//                 {/* Review Text */}
//                 <textarea
//                   placeholder="Write your review here..."
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   className="w-full rounded-lg border p-3 text-sm outline-none"
//                   rows={4}
//                 />

//                 {/* Submit Button */}
//                 <button
//                   onClick={submitReview}
//                   className="mt-4 w-full rounded-lg bg-primary py-3 text-white font-semibold"
//                 >
//                   Submit Review
//                 </button>

//               </div>
//             )}

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// };

// export default OrderDetails;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { resolveImageSrc, setImgFallback } from "@/utils/imageFallback";
// import { buildProductImageUrl } from "@/utils/productImages";

// const API_LINK = import.meta.env.VITE_API_LINK;
// const PRODUCT_IMAGE_BASE = "https://xiadot.com/vkautoparts/uploads/products/";

// const OrderDetails = () => {
//   const { id } = useParams();
//   const [data, setData] = useState<any>(null);

//   // Review states — one per item
//   const [ratings, setRatings] = useState<{ [productId: number]: number }>({});
//   const [comments, setComments] = useState<{ [productId: number]: string }>({});
//   const [submittedItems, setSubmittedItems] = useState<Set<number>>(new Set());

//   useEffect(() => {
//     fetchDetails();
//   }, []);

//   const fetchDetails = async () => {
//     try {
//       const res = await axios.get(`${API_LINK}/orders/details/${id}`);
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const submitReview = async (productId: number) => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user") || "{}");
//       const rating = ratings[productId] || 0;

//       if (!rating) {
//         alert("Please select a rating first");
//         return;
//       }

//       await axios.post(`${API_LINK}/reviews`, {
//         user_id: user.id,
//         product_id: productId,
//         order_id: data.order.id,
//         rating,
//         comment: comments[productId] || ""
//       });

//       alert("Review submitted successfully ⭐");

//       // Mark this item as submitted
//       setSubmittedItems((prev) => new Set(prev).add(productId));

//       // Clear this item's review state
//       setRatings((prev) => { const n = { ...prev }; delete n[productId]; return n; });
//       setComments((prev) => { const n = { ...prev }; delete n[productId]; return n; });

//     } catch (error: any) {
//       console.error("Review error:", error.response?.data);
//       const msg = error.response?.data?.message || "Failed to submit review";
//       alert(msg);
//     }
//   };

//   if (!data) return <p className="p-4">Loading...</p>;

//   const { order, items } = data;

//   return (
//     <div className="px-4 py-5 pb-20">

//       <h1 className="text-xl font-bold mb-4">Order Details</h1>

//       {/* Order Info */}
//       <div className="border p-4 rounded-lg mb-4">
//         <p><b>Order:</b> {order.order_number}</p>
//         <p><b>Status:</b> {order.status}</p>
//         <p><b>Total:</b> ₹{order.total_amount}</p>
//         <p><b>Payment:</b> {order.payment_method}</p>
//       </div>

//       {/* Products */}
//       <div className="space-y-3">
//         {items.map((item: any) => (
//           <div key={item.id} className="border p-4 rounded-lg">

//             <div className="flex gap-3">
//               <img
//                 src={resolveImageSrc(
//                   buildProductImageUrl(item.images ?? item.image_url ?? item.image) ||
//                     (typeof item.image_url === "string" && item.image_url.trim()
//                       ? `${PRODUCT_IMAGE_BASE}${item.image_url.trim()}`
//                       : ""),
//                   item.id,
//                   160,
//                   160
//                 )}
//                 className="h-20 w-20 object-cover rounded"
//                 onError={(e) => setImgFallback(e, item.id, 160, 160)}
//               />
//               <div className="flex-1">
//                 <p className="font-medium">{item.name}</p>
//                 <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
//                 <p className="text-sm font-semibold">₹{item.price}</p>
//               </div>
//             </div>

//             {/* Review Card — shown only for delivered orders */}
//             {order.status === "delivered" && (
//               <div className="mt-4 border rounded-lg p-4 bg-white">

//                 {submittedItems.has(item.product_id) ? (
//                   <p className="text-green-600 font-medium text-sm text-center py-2">
//                     ✅ Review submitted for this item!
//                   </p>
//                 ) : (
//                   <>
//                     <h2 className="font-semibold mb-3">Rate Your Order</h2>

//                     {/* Stars — independent per item */}
//                     <div className="flex gap-2 text-2xl mb-4">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <button
//                           key={star}
//                           onClick={() =>
//                             setRatings((prev) => ({ ...prev, [item.product_id]: star }))
//                           }
//                           className={
//                             star <= (ratings[item.product_id] || 0)
//                               ? "text-yellow-500"
//                               : "text-gray-300"
//                           }
//                         >
//                           ★
//                         </button>
//                       ))}
//                     </div>

//                     {/* Comment — independent per item */}
//                     <textarea
//                       placeholder="Write your review here..."
//                       value={comments[item.product_id] || ""}
//                       onChange={(e) =>
//                         setComments((prev) => ({ ...prev, [item.product_id]: e.target.value }))
//                       }
//                       className="w-full rounded-lg border p-3 text-sm outline-none"
//                       rows={4}
//                     />

//                     <button
//                       onClick={() => submitReview(item.product_id)}
//                       className="mt-4 w-full rounded-lg bg-primary py-3 text-white font-semibold"
//                     >
//                       Submit Review
//                     </button>
//                   </>
//                 )}

//               </div>
//             )}

//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default OrderDetails;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { resolveImageSrc, setImgFallback } from "@/utils/imageFallback";
// import { buildProductImageUrl } from "@/utils/productImages";
// import { ArrowLeft } from "lucide-react";

// const API_LINK = import.meta.env.VITE_API_LINK;
// const PRODUCT_IMAGE_BASE = "https://xiadot.com/vkautoparts/uploads/products/";

// const OrderDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState<any>(null);

//   // Review states — one per item
//   const [ratings, setRatings] = useState<{ [productId: number]: number }>({});
//   const [comments, setComments] = useState<{ [productId: number]: string }>({});
//   const [submittedItems, setSubmittedItems] = useState<Set<number>>(new Set());

//   useEffect(() => {
//     fetchDetails();
//   }, []);

//   const fetchDetails = async () => {
//     try {
//       const res = await axios.get(`${API_LINK}/orders/details/${id}`);
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const submitReview = async (productId: number) => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user") || "{}");
//       const rating = ratings[productId] || 0;

//       if (!rating) {
//         alert("Please select a rating first");
//         return;
//       }

//       await axios.post(`${API_LINK}/reviews`, {
//         user_id: user.id,
//         product_id: productId,
//         order_id: data.order.id,
//         rating,
//         comment: comments[productId] || ""
//       });

//       alert("Review submitted successfully ⭐");

//       setSubmittedItems((prev) => new Set(prev).add(productId));
//       setRatings((prev) => { const n = { ...prev }; delete n[productId]; return n; });
//       setComments((prev) => { const n = { ...prev }; delete n[productId]; return n; });

//     } catch (error: any) {
//       console.error("Review error:", error.response?.data);
//       const msg = error.response?.data?.message || "Failed to submit review";
//       alert(msg);
//     }
//   };

//   if (!data) return <p className="p-4">Loading...</p>;

//   const { order, items } = data;

//   return (
//     <div className="px-4 py-5 pb-20">

//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-4"
//       >
//         <ArrowLeft className="h-4 w-4" />
//         Back
//       </button>

//       <h1 className="text-xl font-bold mb-4">Order Details</h1>

//       {/* Order Info */}
//       <div className="border p-4 rounded-lg mb-4">
//         <p><b>Order:</b> {order.order_number}</p>
//         <p><b>Status:</b> {order.status}</p>
//         <p><b>Total:</b> ₹{order.total_amount}</p>
//         <p><b>Payment:</b> {order.payment_method}</p>
//       </div>

//       {/* Products */}
//       <div className="space-y-3">
//         {items.map((item: any) => (
//           <div key={item.id} className="border p-4 rounded-lg">

//             <div className="flex gap-3">
//               <img
//                 src={resolveImageSrc(
//                   buildProductImageUrl(item.images ?? item.image_url ?? item.image) ||
//                     (typeof item.image_url === "string" && item.image_url.trim()
//                       ? `${PRODUCT_IMAGE_BASE}${item.image_url.trim()}`
//                       : ""),
//                   item.id,
//                   160,
//                   160
//                 )}
//                 className="h-20 w-20 object-cover rounded"
//                 onError={(e) => setImgFallback(e, item.id, 160, 160)}
//               />
//               <div className="flex-1">
//                 <p className="font-medium">{item.name}</p>
//                 <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
//                 <p className="text-sm font-semibold">₹{item.price}</p>
//               </div>
//             </div>

//             {/* Review Card — shown only for delivered orders */}
//             {order.status === "delivered" && (
//               <div className="mt-4 border rounded-lg p-4 bg-white">

//                 {submittedItems.has(item.product_id) ? (
//                   <p className="text-green-600 font-medium text-sm text-center py-2">
//                     ✅ Review submitted for this item!
//                   </p>
//                 ) : (
//                   <>
//                     <h2 className="font-semibold mb-3">Rate Your Order</h2>

//                     <div className="flex gap-2 text-2xl mb-4">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <button
//                           key={star}
//                           onClick={() =>
//                             setRatings((prev) => ({ ...prev, [item.product_id]: star }))
//                           }
//                           className={
//                             star <= (ratings[item.product_id] || 0)
//                               ? "text-yellow-500"
//                               : "text-gray-300"
//                           }
//                         >
//                           ★
//                         </button>
//                       ))}
//                     </div>

//                     <textarea
//                       placeholder="Write your review here..."
//                       value={comments[item.product_id] || ""}
//                       onChange={(e) =>
//                         setComments((prev) => ({ ...prev, [item.product_id]: e.target.value }))
//                       }
//                       className="w-full rounded-lg border p-3 text-sm outline-none"
//                       rows={4}
//                     />

//                     <button
//                       onClick={() => submitReview(item.product_id)}
//                       className="mt-4 w-full rounded-lg bg-primary py-3 text-white font-semibold"
//                     >
//                       Submit Review
//                     </button>
//                   </>
//                 )}

//               </div>
//             )}

//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default OrderDetails;

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { resolveImageSrc, setImgFallback } from "@/utils/imageFallback";
import { buildProductImageUrl } from "@/utils/productImages";
import { ArrowLeft } from "lucide-react";

const API_LINK = import.meta.env.VITE_API_LINK;
const PRODUCT_IMAGE_BASE = "https://xiadot.com/vkautoparts/uploads/products/";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);

  // Review states — one per order+product key
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [submittedItems, setSubmittedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`${API_LINK}/orders/details/${id}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitReview = async (productId: number) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const reviewKey = `${data.order.id}_${productId}`;
      const rating = ratings[reviewKey] || 0;

      if (!rating) {
        alert("Please select a rating first");
        return;
      }

      await axios.post(`${API_LINK}/reviews`, {
        user_id: user.id,
        product_id: productId,
        order_id: data.order.id,
        rating,
        comment: comments[reviewKey] || ""
      });

      alert("Review submitted successfully ⭐");

      setSubmittedItems((prev) => new Set(prev).add(reviewKey));
      setRatings((prev) => { const n = { ...prev }; delete n[reviewKey]; return n; });
      setComments((prev) => { const n = { ...prev }; delete n[reviewKey]; return n; });

    } catch (error: any) {
      console.error("Review error:", error.response?.data);
      const msg = error.response?.data?.message || "Failed to submit review";
      alert(msg);
    }
  };

  if (!data) return <p className="p-4">Loading...</p>;

  const { order, items } = data;

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

      <h1 className="text-xl font-bold mb-4">Order Details</h1>

      {/* Order Info */}
      <div className="border p-4 rounded-lg mb-4">
        <p><b>Order:</b> {order.order_number}</p>
        <p><b>Status:</b> {order.status}</p>
        <p><b>Total:</b> ₹{order.total_amount}</p>
        <p><b>Payment:</b> {order.payment_method}</p>
      </div>

      {/* Products */}
      <div className="space-y-3">
        {items.map((item: any) => {
          const reviewKey = `${order.id}_${item.product_id}`;
          return (
            <div key={item.id} className="border p-4 rounded-lg">

              <div className="flex gap-3">
                <img
                  src={resolveImageSrc(
                    buildProductImageUrl(item.images ?? item.image_url ?? item.image) ||
                      (typeof item.image_url === "string" && item.image_url.trim()
                        ? `${PRODUCT_IMAGE_BASE}${item.image_url.trim()}`
                        : ""),
                    item.id,
                    160,
                    160
                  )}
                  className="h-20 w-20 object-cover rounded"
                  onError={(e) => setImgFallback(e, item.id, 160, 160)}
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  <p className="text-sm font-semibold">₹{item.price}</p>
                </div>
              </div>

              {/* Review Card — shown only for delivered orders */}
              {order.status === "delivered" && (
                <div className="mt-4 border rounded-lg p-4 bg-white">

                  {submittedItems.has(reviewKey) ? (
                    <p className="text-green-600 font-medium text-sm text-center py-2">
                      ✅ Review submitted for this item!
                    </p>
                  ) : (
                    <>
                      <h2 className="font-semibold mb-3">Rate Your Order</h2>

                      <div className="flex gap-2 text-2xl mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() =>
                              setRatings((prev) => ({ ...prev, [reviewKey]: star }))
                            }
                            className={
                              star <= (ratings[reviewKey] || 0)
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }
                          >
                            ★
                          </button>
                        ))}
                      </div>

                      <textarea
                        placeholder="Write your review here..."
                        value={comments[reviewKey] || ""}
                        onChange={(e) =>
                          setComments((prev) => ({ ...prev, [reviewKey]: e.target.value }))
                        }
                        className="w-full rounded-lg border p-3 text-sm outline-none"
                        rows={4}
                      />

                      <button
                        onClick={() => submitReview(item.product_id)}
                        className="mt-4 w-full rounded-lg bg-primary py-3 text-white font-semibold"
                      >
                        Submit Review
                      </button>
                    </>
                  )}

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default OrderDetails;