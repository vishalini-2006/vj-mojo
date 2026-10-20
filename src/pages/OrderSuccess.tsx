    // import { CheckCircle, ShoppingBag } from "lucide-react";
    // import { useNavigate } from "react-router-dom";

    // const OrderSuccess = () => {

    // const navigate = useNavigate();

    // return (

    //     <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center pb-20">

    //     <CheckCircle className="h-20 w-20 text-green-500 mb-4" />

    //     <h1 className="text-2xl font-bold mb-2">
    //         Order Placed Successfully
    //     </h1>

    //     <p className="text-sm text-muted-foreground mb-6 normal-case">
    //         Thank you for your purchase. Your order has been placed successfully.
    //     </p>

    //     <div className="flex gap-3">

    //         <button
    //         onClick={() => navigate("/orders")}
    //         className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted"
    //         >
    //         View Orders
    //         </button>

    //         <button
    //         onClick={() => navigate("/products")}
    //         className="flex items-center gap-2 rounded-lg bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground"
    //         >
    //         <ShoppingBag className="h-4 w-4" />
    //         Continue Shopping
    //         </button>

    //     </div>

    //     </div>

    // );

    // };

    // export default OrderSuccess;

import { CheckCircle, ShoppingBag, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center pb-20">

      {/* Back button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
      </div>

      <CheckCircle className="h-20 w-20 text-green-500 mb-4" />

      <h1 className="text-2xl font-bold mb-2">
        Order Placed Successfully
      </h1>

      <p className="text-sm text-muted-foreground mb-6 normal-case">
        Thank you for your purchase. Your order has been placed successfully.
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => navigate("/orders")}
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted"
        >
          View Orders
        </button>
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 rounded-lg bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <ShoppingBag className="h-4 w-4" />
          Continue Shopping
        </button>
      </div>

    </div>
  );
};

export default OrderSuccess;