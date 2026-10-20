// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Package } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const API_LINK = import.meta.env.VITE_API_LINK;

// const Orders = () => {

//   const [orders, setOrders] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user?.id) {
//       fetchOrders();
//     }
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(`${API_LINK}/orders/user/${user.id}`);
//       setOrders(res.data);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔥 Loading state
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <p className="text-sm text-muted-foreground">Loading orders...</p>
//       </div>
//     );
//   }

//   // 🔥 Empty state
//   if (orders.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] pb-20">
//         <Package className="h-16 w-16 text-muted-foreground/30 mb-3" />
//         <h2 className="text-lg font-semibold">No Orders Found</h2>
//         <p className="text-sm text-muted-foreground">
//           You haven't placed any orders yet
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="px-4 py-5 pb-20">

//       <h1 className="text-2xl font-bold mb-4">
//         My Orders
//       </h1>

//       <div className="space-y-3">

//         {orders.map((order) => (

//           <div
//             key={order.id}
//             onClick={() => navigate(`/order/${order.id}`)}
//             className="border border-border rounded-lg p-4 bg-card cursor-pointer hover:shadow-sm transition"
//           >

//             {/* Top */}
//             <div className="flex justify-between mb-2">
//               <span className="text-sm font-semibold">
//                 {order.order_number}
//               </span>

//               <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-600 capitalize">
//                 {order.status}
//               </span>
//             </div>

//             {/* Details */}
//             <div className="text-sm text-muted-foreground space-y-1">
//               <p>
//                 Total: ₹{Number(order.total_amount).toLocaleString()}
//               </p>
//               <p>Payment: {order.payment_method}</p>
//               <p>
//                 Date: {new Date(order.created_at).toLocaleDateString()}
//               </p>
//             </div>

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// };

// export default Orders;

import { useEffect, useState } from "react";
import axios from "axios";
import { Package, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_LINK = import.meta.env.VITE_API_LINK;

const Orders = () => {

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      fetchOrders();
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_LINK}/orders/user/${user.id}`);
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-sm text-muted-foreground">Loading orders...</p>
      </div>
    );
  }

  // 🔥 Empty state
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] pb-20">
        <Package className="h-16 w-16 text-muted-foreground/30 mb-3" />
        <h2 className="text-lg font-semibold">No Orders Found</h2>
        <p className="text-sm text-muted-foreground">
          You haven't placed any orders yet
        </p>
      </div>
    );
  }

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

      <h1 className="text-2xl font-bold mb-4">
        My Orders
      </h1>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            onClick={() => navigate(`/order/${order.id}`)}
            className="border border-border rounded-lg p-4 bg-card cursor-pointer hover:shadow-sm transition"
          >
            {/* Top */}
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold">
                {order.order_number}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-600 capitalize">
                {order.status}
              </span>
            </div>

            {/* Details */}
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Total: ₹{Number(order.total_amount).toLocaleString()}</p>
              <p>Payment: {order.payment_method}</p>
              <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Orders;