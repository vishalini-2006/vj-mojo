import { useEffect, useState } from "react";
import axios from "axios";
import { RotateCcw, ArrowLeft, PackageOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_LINK = import.meta.env.VITE_API_LINK;

const Returns = () => {
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
      // Only show delivered orders — these are eligible for return
      const delivered = res.data.filter(
        (o: any) => o.status?.toLowerCase() === "delivered"
      );
      setOrders(delivered);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-sm text-muted-foreground">Loading returns...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] pb-20 px-4">
        <PackageOpen className="h-16 w-16 text-muted-foreground/30 mb-3" />
        <h2 className="text-lg font-semibold">No Returns Available</h2>
        <p className="text-sm text-muted-foreground text-center mt-1">
          Only delivered orders are eligible for return. You have no delivered
          orders yet.
        </p>
        <button
          onClick={() => navigate("/orders")}
          className="mt-4 text-sm text-primary underline underline-offset-2"
        >
          View My Orders
        </button>
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

      <h1 className="text-2xl font-bold mb-1">My Returns</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Delivered orders eligible for return
      </p>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-border rounded-lg p-4 bg-card"
          >
            {/* Top */}
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold">{order.order_number}</span>
              <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-600 capitalize">
                {order.status}
              </span>
            </div>

            {/* Details */}
            <div className="text-sm text-muted-foreground space-y-1 mb-3">
              <p>Total: ₹{Number(order.total_amount).toLocaleString()}</p>
              <p>Payment: {order.payment_method}</p>
              <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
            </div>

            {/* Return Action */}
            <button
              onClick={() => navigate("/disputes", { state: { orderId: order.id } })}
              className="flex items-center gap-2 text-sm font-medium text-primary border border-primary/40 rounded-lg px-3 py-2 hover:bg-primary/5 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Request Return / Dispute
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Returns;
