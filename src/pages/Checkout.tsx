// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import axios from "axios";

// const API_LINK = import.meta.env.VITE_API_LINK;

// interface CheckoutForm {
//   name: string;
//   phone: string;
//   address: string;
//   city: string;
//   pincode: string;
// }

// type PaymentMethod = "cod" | "online";

// const Checkout = () => {

//   const navigate = useNavigate();

//   const [form, setForm] = useState<CheckoutForm>({
//     name: "",
//     phone: "",
//     address: "",
//     city: "",
//     pincode: ""
//   });

//   const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   useEffect(() => {
//     fetchAddress();
//   }, []);

//   const fetchAddress = async () => {

//     try {

//       const res = await axios.get(
//         `${API_LINK}/address/${user.id}`
//       );

//       if (res.data) {
//         setForm({
//           name: res.data.name || "",
//           phone: res.data.phone || "",
//           address: res.data.address || "",
//           city: res.data.city || "",
//           pincode: res.data.pincode || ""
//         });
//       }

//     } catch (err) {
//       console.log(err);
//     }

//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {

//     const { name, value } = e.target;

//     setForm({
//       ...form,
//       [name]: value
//     });

//   };

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (!form.name || !form.phone || !form.address) {
//     toast.error("Please fill all required fields");
//     return;
//   }

//   try {

//     // 1. Save Address
//     await axios.post(`${API_LINK}/address`, {
//       user_id: user.id,
//       ...form
//     });

//     // 2. Fetch Cart Items
//     const cartRes = await axios.get(`${API_LINK}/cart/${user.id}`);

//     const items = cartRes.data.map((p: any) => ({
//       product_id: p.id,
//       quantity: p.quantity,
//       price: Number(p.price)
//     }));

//     const total = items.reduce(
//       (sum: number, item: any) => sum + item.price * item.quantity,
//       0
//     );

//     // 3. Create Order 🔥
//     await axios.post(`${API_LINK}/orders/create`, {
//       user_id: user.id,
//       address: form,
//       payment_method: paymentMethod,
//       items,
//       total
//     });

//     toast.success("Order placed successfully");

//     // 4. Redirect
//     if (paymentMethod === "online") {
//       const paymentRes = await axios.post(
//         `${API_LINK}/payment/create-order`,
//         {
//           amount: total
//         }
//       );

//       const order = paymentRes.data.order;

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: order.currency,
//         name: "VK MOJO",
//         description: "Order Payment",
//         order_id: order.id,

//         handler: function () {
//           toast.success("Payment Successful");
//           navigate("/order-success");
//         },

//         prefill: {
//           name: form.name,
//           contact: form.phone
//         },

//         theme: {
//           color: "#7c3aed"
//         }
//       };

//       const razor = new (window as any).Razorpay(options);
//       razor.open();

//     } else {
//       navigate("/order-success");
//     }
//   } catch (err) {
//     console.log(err);
//     toast.error("Failed to place order");
//   }
// };

//   return (

//     <div className="px-4 py-5 pb-20">

//       <h1 className="text-2xl font-bold mb-6">
//         Shipping Details
//       </h1>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         <input
//           name="name"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={handleChange}
//           className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//         />

//         <input
//           name="phone"
//           placeholder="Phone Number"
//           value={form.phone}
//           onChange={handleChange}
//           className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//         />

//         <textarea
//           name="address"
//           placeholder="Full Address"
//           value={form.address}
//           onChange={handleChange}
//           className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//         />

//         <div className="grid grid-cols-2 gap-3">

//           <input
//             name="city"
//             placeholder="City"
//             value={form.city}
//             onChange={handleChange}
//             className="rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//           />

//           <input
//             name="pincode"
//             placeholder="Pincode"
//             value={form.pincode}
//             onChange={handleChange}
//             className="rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//           />

//         </div>

//         {/* Payment Method */}

//         <div className="pt-4">

//           <h2 className="font-semibold mb-3">
//             Payment Method
//           </h2>

//           <div className="space-y-2">

//             <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 text-foreground">

//               <input
//                 type="radio"
//                 checked={paymentMethod === "cod"}
//                 onChange={() => setPaymentMethod("cod")}
//               />

//               Cash on Delivery

//             </label>

//             <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 text-foreground">

//               <input
//                 type="radio"
//                 checked={paymentMethod === "online"}
//                 onChange={() => setPaymentMethod("online")}
//               />

//               Online Payment

//             </label>

//           </div>

//         </div>

//         <button
//           type="submit"
//           className="w-full rounded-lg bg-brand-gradient py-3 text-sm font-bold text-primary-foreground"
//         >
//           Place Order
//         </button>

//       </form>

//     </div>

//   );

// };

// export default Checkout;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const API_LINK = import.meta.env.VITE_API_LINK;

interface CheckoutForm {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

type PaymentMethod = "cod" | "online";

const loadRazorpay = () =>
  new Promise<void>((resolve, reject) => {
    if ((window as any).Razorpay) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay"));
    document.body.appendChild(script);
  });

const Checkout = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<CheckoutForm>({
    name: "", phone: "", address: "", city: "", pincode: ""
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    try {
      const res = await axios.get(`${API_LINK}/address/${user.id}`);
      if (res.data) {
        setForm({
          name: res.data.name || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
          city: res.data.city || "",
          pincode: res.data.pincode || ""
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await axios.post(`${API_LINK}/address`, { user_id: user.id, ...form });
      const cartRes = await axios.get(`${API_LINK}/cart/${user.id}`);
      const items = cartRes.data.map((p: any) => ({
        product_id: p.id,
        quantity: p.quantity,
        price: Number(p.price)
      }));
      const total = items.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity, 0
      );
      await axios.post(`${API_LINK}/orders/create`, {
        user_id: user.id,
        address: form,
        payment_method: paymentMethod,
        items,
        total
      });
      toast.success("Order placed successfully");
      if (paymentMethod === "online") {
        const paymentRes = await axios.post(`${API_LINK}/payment/create-order`, { amount: total });
        const order = paymentRes.data.order;
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "VK MOJO",
          description: "Order Payment",
          order_id: order.id,
          handler: function () {
            toast.success("Payment Successful");
            navigate("/order-success");
          },
          prefill: { name: form.name, contact: form.phone },
          theme: { color: "#7c3aed" }
        };
        await loadRazorpay();
        const razor = new (window as any).Razorpay(options);
        razor.open();
      } else {
        navigate("/order-success");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="px-4 py-5 pb-20">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <h1 className="text-2xl font-bold mb-6">Shipping Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Full Name" value={form.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <input name="phone" placeholder="Phone Number" value={form.phone}
          onChange={handleChange}
          className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <textarea name="address" placeholder="Full Address" value={form.address}
          onChange={handleChange}
          className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <div className="grid grid-cols-2 gap-3">
          <input name="city" placeholder="City" value={form.city}
            onChange={handleChange}
            className="rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <input name="pincode" placeholder="Pincode" value={form.pincode}
            onChange={handleChange}
            className="rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {/* Payment Method */}
        <div className="pt-4">
          <h2 className="font-semibold mb-3">Payment Method</h2>
          <div className="space-y-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 text-foreground">
              <input type="radio" checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")} />
              Cash on Delivery
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 text-foreground">
              <input type="radio" checked={paymentMethod === "online"}
                onChange={() => setPaymentMethod("online")} />
              Online Payment
            </label>
          </div>
        </div>

        <button type="submit"
          className="w-full rounded-lg bg-brand-gradient py-3 text-sm font-bold text-primary-foreground"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;