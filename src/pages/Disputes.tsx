// import { useEffect, useState } from "react";
// import axios from "axios";
// import { AlertTriangle, Plus, X, ChevronRight, MessageSquare, Loader2 } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// const API_LINK = import.meta.env.VITE_API_LINK;

// const statusColors: Record<string, string> = {
//   open: "bg-red-100 text-red-600",
//   investigating: "bg-amber-100 text-amber-700",
//   resolved: "bg-green-100 text-green-600",
//   closed: "bg-gray-100 text-gray-500",
// };

// const DISPUTE_SUBJECTS = [
//   "Wrong product received",
//   "Damaged product",
//   "Product not delivered",
//   "Duplicate order placed",
//   "Refund not received",
//   "Poor product quality",
//   "Seller not responding",
//   "Other",
// ];

// const Disputes = () => {
//   const [disputes, setDisputes] = useState<any[]>([]);
//   const [orders, setOrders] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [selectedDispute, setSelectedDispute] = useState<any>(null);

//   const [form, setForm] = useState({
//     orderId: "",
//     subject: "",
//     description: "",
//   });

//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const { toast } = useToast();

//   useEffect(() => {
//     if (user?.id) {
//       fetchDisputes();
//       fetchOrders();
//     }
//   }, []);

//   const fetchDisputes = async () => {
//     try {
//       const res = await axios.get(`${API_LINK}/disputes/user/${user.id}`);
//       setDisputes(res.data.disputes || res.data || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(`${API_LINK}/orders/user/${user.id}`);
//       setOrders(res.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!form.orderId || !form.subject || !form.description.trim()) {
//       toast({ title: "Please fill all fields", variant: "destructive" });
//       return;
//     }

//     setSubmitting(true);
//     try {
//       await axios.post(`${API_LINK}/disputes`, {
//         orderId: Number(form.orderId),
//         buyerId: user.id,
//         subject: form.subject,
//         description: form.description.trim(),
//       });
//       toast({ title: "Dispute submitted successfully" });
//       setForm({ orderId: "", subject: "", description: "" });
//       setShowForm(false);
//       fetchDisputes();
//     } catch (err) {
//       toast({ title: "Failed to submit dispute", variant: "destructive" });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
//       </div>
//     );
//   }

//   return (
//     <div className="px-4 py-5 pb-24">

//       {/* Header */}
//       <div className="flex items-center justify-between mb-5">
//         <div>
//           <h1 className="text-2xl font-bold">My Disputes</h1>
//           <p className="text-sm text-muted-foreground mt-0.5">
//             Raise and track your order disputes
//           </p>
//         </div>
//         <button
//           onClick={() => setShowForm(true)}
//           className="flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-xl shadow-sm hover:opacity-90 transition"
//         >
//           <Plus className="h-4 w-4" />
//           New
//         </button>
//       </div>

//       {/* New Dispute Form Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4 overflow-y-auto">
//           <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">

//             {/* Modal Header */}
//             <div className="flex items-center justify-between p-5 border-b border-border">
//               <h2 className="text-lg font-bold">Raise a Dispute</h2>
//               <button
//                 onClick={() => { setShowForm(false); setForm({ orderId: "", subject: "", description: "" }); }}
//                 className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="p-5 space-y-4">

//               {/* Order Select */}
//               <div>
//                 <label className="text-sm font-medium text-foreground mb-1.5 block">
//                   Select Order <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   value={form.orderId}
//                   onChange={(e) => setForm({ ...form, orderId: e.target.value })}
//                   className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
//                 >
//                   <option value="">-- Choose an order --</option>
//                   {orders.map((order) => (
//                     <option key={order.id} value={order.id}>
//                       {order.order_number} — ₹{Number(order.total_amount).toLocaleString()}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Subject Dropdown */}
//               <div>
//                 <label className="text-sm font-medium text-foreground mb-1.5 block">
//                   Subject <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   value={form.subject}
//                   onChange={(e) => setForm({ ...form, subject: e.target.value })}
//                   className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
//                 >
//                   <option value="">-- Select a subject --</option>
//                   {DISPUTE_SUBJECTS.map((s) => (
//                     <option key={s} value={s}>{s}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="text-sm font-medium text-foreground mb-1.5 block">
//                   Description <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   placeholder="Describe the issue in detail..."
//                   value={form.description}
//                   onChange={(e) => setForm({ ...form, description: e.target.value })}
//                   rows={4}
//                   className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={submitting}
//                 className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl text-sm hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
//               >
//                 {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
//                 {submitting ? "Submitting..." : "Submit Dispute"}
//               </button>

//             </div>
//           </div>
//         </div>
//       )}

//       {/* Dispute Detail Modal */}
//       {selectedDispute && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
//           <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">

//             <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card">
//               <h2 className="text-lg font-bold">Dispute Details</h2>
//               <button
//                 onClick={() => setSelectedDispute(null)}
//                 className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             <div className="p-5 space-y-5">

//               {/* Status + Order */}
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-muted-foreground">
//                   Order <span className="font-semibold text-foreground">#{selectedDispute.orderId || "N/A"}</span>
//                 </span>
//                 <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[selectedDispute.status] || statusColors.closed}`}>
//                   {selectedDispute.status}
//                 </span>
//               </div>

//               {/* Subject */}
//               <div>
//                 <p className="text-xs text-muted-foreground mb-1">Subject</p>
//                 <p className="text-sm font-semibold text-foreground">{selectedDispute.subject}</p>
//               </div>

//               {/* Description */}
//               <div>
//                 <p className="text-xs text-muted-foreground mb-1">Description</p>
//                 <p className="text-sm text-foreground leading-relaxed">{selectedDispute.description}</p>
//               </div>

//               {/* Dates */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-1">Opened</p>
//                   <p className="text-sm font-medium">
//                     {selectedDispute.createdAt
//                       ? new Date(selectedDispute.createdAt).toLocaleDateString()
//                       : "N/A"}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
//                   <p className="text-sm font-medium">
//                     {selectedDispute.updatedAt
//                       ? new Date(selectedDispute.updatedAt).toLocaleDateString()
//                       : "N/A"}
//                   </p>
//                 </div>
//               </div>

//               {/* Resolution (if any) */}
//               {selectedDispute.resolution && (
//                 <div className="bg-green-50 border border-green-200 rounded-xl p-4">
//                   <p className="text-xs font-semibold text-green-700 mb-1">Resolution</p>
//                   <p className="text-sm text-green-800 leading-relaxed">{selectedDispute.resolution}</p>
//                 </div>
//               )}

//             </div>
//           </div>
//         </div>
//       )}

//       {/* Disputes List */}
//       {disputes.length === 0 ? (
//         <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
//           <MessageSquare className="h-16 w-16 text-muted-foreground/30 mb-3" />
//           <h2 className="text-lg font-semibold">No Disputes Yet</h2>
//           <p className="text-sm text-muted-foreground mt-1">
//             Tap "New" to raise a dispute for an order
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {disputes.map((dispute) => (
//             <div
//               key={dispute.id}
//               onClick={() => setSelectedDispute(dispute)}
//               className="border border-border rounded-xl p-4 bg-card cursor-pointer hover:shadow-sm transition"
//             >
//               <div className="flex items-start justify-between gap-3">

//                 <div className="flex items-start gap-3 flex-1 min-w-0">
//                   {/* Icon */}
//                   <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${statusColors[dispute.status]?.split(" ")[0] || "bg-gray-100"}`}>
//                     <AlertTriangle className={`h-4 w-4 ${statusColors[dispute.status]?.split(" ")[1] || "text-gray-500"}`} />
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 flex-wrap">
//                       <p className="text-sm font-semibold text-foreground truncate">
//                         {dispute.subject}
//                       </p>
//                       <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${statusColors[dispute.status] || statusColors.closed}`}>
//                         {dispute.status}
//                       </span>
//                     </div>
//                     <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
//                       {dispute.description}
//                     </p>
//                     <p className="text-xs text-muted-foreground mt-1.5">
//                       Order #{dispute.orderId || "N/A"} •{" "}
//                       {dispute.createdAt
//                         ? new Date(dispute.createdAt).toLocaleDateString()
//                         : "N/A"}
//                     </p>
//                   </div>
//                 </div>

//                 <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//     </div>
//   );
// };

// export default Disputes;

import { useEffect, useState } from "react";
import axios from "axios";
import { AlertTriangle, Plus, X, ChevronRight, MessageSquare, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_LINK = import.meta.env.VITE_API_LINK;

const statusColors: Record<string, string> = {
  open: "bg-red-100 text-red-600",
  investigating: "bg-amber-100 text-amber-700",
  resolved: "bg-green-100 text-green-600",
  closed: "bg-gray-100 text-gray-500",
};

const DISPUTE_SUBJECTS = [
  "Wrong product received",
  "Damaged product",
  "Product not delivered",
  "Duplicate order placed",
  "Refund not received",
  "Poor product quality",
  "Seller not responding",
  "Other",
];

const Disputes = () => {
  const [disputes, setDisputes] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<any>(null);

  const [form, setForm] = useState({
    orderId: "",
    subject: "",
    description: "",
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { toast } = useToast();

  useEffect(() => {
    if (user?.id) {
      fetchDisputes();
      fetchOrders();
    }
  }, []);

  const fetchDisputes = async () => {
    try {
      const res = await axios.get(`${API_LINK}/disputes/user/${user.id}`);
      setDisputes(res.data.disputes || res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_LINK}/orders/user/${user.id}`);
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    if (!form.orderId || !form.subject || !form.description.trim()) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API_LINK}/disputes`, {
        orderId: Number(form.orderId),
        buyerId: user.id,
        subject: form.subject,
        description: form.description.trim(),
      });
      toast({ title: "Dispute submitted successfully" });
      setForm({ orderId: "", subject: "", description: "" });
      setShowForm(false);
      fetchDisputes();
    } catch (err) {
      toast({ title: "Failed to submit dispute", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="px-4 py-5 pb-24">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold">My Disputes</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Raise and track your order disputes
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-xl shadow-sm hover:opacity-90 transition"
        >
          <Plus className="h-4 w-4" />
          New
        </button>
      </div>

      {/* ✅ FIXED MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center pb-[67px]">
          
          <div className="bg-card border border-border rounded-t-2xl sm:rounded-2xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">

            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border shrink-0">
              <h2 className="text-lg font-bold">Raise a Dispute</h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setForm({ orderId: "", subject: "", description: "" });
                }}
                className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            {/* <div className="flex-1 overflow-y-auto p-5 space-y-4"> */}
            <div className="overflow-y-auto p-5 space-y-4 max-h-[60dvh]">

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Select Order <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.orderId}
                  onChange={(e) => setForm({ ...form, orderId: e.target.value })}
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm"
                >
                  <option value="">-- Choose an order --</option>
                  {orders.map((order) => (
                    <option key={order.id} value={order.id}>
                      {order.order_number} — ₹{Number(order.total_amount).toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm"
                >
                  <option value="">-- Select a subject --</option>
                  {DISPUTE_SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Describe the issue in detail..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm resize-none"
                />
              </div>

            </div>

            {/* ✅ Footer (always visible) */}
            <div className="shrink-0 p-5 pt-0 pb-[calc(20px+env(safe-area-inset-bottom))] border-t border-border bg-card">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? "Submitting..." : "Submit Dispute"}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Rest of your code remains SAME (no changes below) */}

      {disputes.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <MessageSquare className="h-16 w-16 text-muted-foreground/30 mb-3" />
          <h2 className="text-lg font-semibold">No Disputes Yet</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Tap "New" to raise a dispute for an order
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {disputes.map((dispute) => (
            <div
              key={dispute.id}
              onClick={() => setSelectedDispute(dispute)}
              className="border border-border rounded-xl p-4 bg-card cursor-pointer hover:shadow-sm transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${statusColors[dispute.status]?.split(" ")[0] || "bg-gray-100"}`}>
                    <AlertTriangle className={`h-4 w-4 ${statusColors[dispute.status]?.split(" ")[1] || "text-gray-500"}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold truncate">
                        {dispute.subject}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[dispute.status]}`}>
                        {dispute.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {dispute.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Order #{dispute.orderId} •{" "}
                      {new Date(dispute.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 text-muted-foreground mt-1" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Disputes;