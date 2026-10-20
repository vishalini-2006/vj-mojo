import { ChevronLeft, Wallet as WalletIcon, Plus, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Wallet = () => {
  const navigate = useNavigate();
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [amount, setAmount] = useState("");

  return (
    <div className="px-4 py-5 pb-24 min-h-screen bg-gray-50">

      {/* Back + Title */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
      </div>

      <h1 className="text-xl font-bold mb-5">My Wallet</h1>

      {/* Reward Card */}
      <div className="rounded-xl bg-pink-50 border border-pink-100 p-5 mb-4 flex items-start gap-3">
        <div className="mt-0.5">
          <Gift className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Your Reward</p>
          <p className="text-2xl font-bold text-primary">10% Discount</p>
        </div>
      </div>

      {/* Wallet Balance Card */}
      <div className="rounded-xl bg-white border border-border p-5 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <WalletIcon className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Wallet Balance</p>
            <p className="text-xl font-bold">₹0.00</p>
          </div>
        </div>
      </div>

      {/* Add Money Button */}
      <button
        onClick={() => setShowAddMoney(true)}
        className="w-full flex items-center justify-center gap-2 rounded-xl border border-border bg-white py-4 text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors"
      >
        <Plus className="h-4 w-4" /> Add Money
      </button>

      {/* Add Money Modal */}
      {showAddMoney && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center">
          <div className="bg-white w-full rounded-t-2xl p-6">
            <h2 className="text-base font-bold mb-4">Add Money to Wallet</h2>
            <div className="flex gap-2 mb-4">
              {[100, 200, 500, 1000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(String(preset))}
                  className={`flex-1 rounded-lg border py-2 text-sm font-semibold transition-colors ${
                    amount === String(preset)
                      ? "border-primary bg-pink-50 text-primary"
                      : "border-border text-foreground"
                  }`}
                >
                  ₹{preset}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-primary mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddMoney(false)}
                className="flex-1 rounded-lg border border-border py-3 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`₹${amount} added to wallet!`);
                  setShowAddMoney(false);
                  setAmount("");
                }}
                className="flex-1 rounded-lg bg-primary py-3 text-sm font-semibold text-white"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Wallet;
