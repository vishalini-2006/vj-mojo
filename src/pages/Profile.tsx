import { User, Mail, Phone, MapPin, ShoppingCart, Heart, Package, Edit, ChevronLeft, Share2, Wallet, RotateCcw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_LINK = import.meta.env.VITE_API_LINK;

const Profile = () => {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [address, setAddress] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    fetchAddress();
    fetchCartCount();
    fetchWishlistCount();
  }, []);

  const fetchAddress = async () => {
    try {
      const res = await axios.get(`${API_LINK}/address/${user.id}`);
      setAddress(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCartCount = async () => {
    try {
      const res = await axios.get(`${API_LINK}/cart/${user.id}`);
      setCartCount(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWishlistCount = async () => {
    try {
      const res = await axios.get(`${API_LINK}/wishlist/${user.id}`);
      setWishlistCount(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "VK MOJO",
          text: "Check out VK MOJO - Best auto parts store!",
          url: window.location.origin,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="px-4 py-5 pb-24">

      {/* Back + Title + Edit */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <h1 className="text-base font-bold">My Profile</h1>
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center gap-1 text-sm text-primary"
        >
          <Edit className="h-4 w-4" /> Edit
        </button>
      </div>

      {/* Profile Info */}
      <div className="rounded-lg border border-border bg-card p-5 space-y-4 mb-4">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-primary shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Name</p>
            <p className="text-sm font-semibold">{user.name || "Not Available"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-primary shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="text-sm font-semibold">{user.email || "Not Available"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-primary shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="text-sm font-semibold">{user.phone || "Not Available"}</p>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="rounded-lg border border-border bg-card p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-semibold">Delivery Address</h2>
          </div>
          <button
            onClick={() => navigate("/settings")}
            className="flex items-center gap-1 text-xs text-primary"
          >
            <Edit className="h-3.5 w-3.5" /> Edit
          </button>
        </div>
        {address ? (
          <p className="text-sm text-muted-foreground normal-case">
            {address.name}, {address.address}, {address.city} - {address.pincode}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">No address saved</p>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <Link
          to="/cart"
          className="flex flex-col items-center justify-center rounded-lg border border-border p-4 bg-card hover:border-primary/40 transition-colors"
        >
          <ShoppingCart className="h-5 w-5 text-primary mb-1" />
          <p className="text-sm font-semibold">{cartCount}</p>
          <p className="text-xs text-muted-foreground">Cart</p>
        </Link>
        <Link
          to="/wishlist"
          className="flex flex-col items-center justify-center rounded-lg border border-border p-4 bg-card hover:border-primary/40 transition-colors"
        >
          <Heart className="h-5 w-5 text-primary mb-1" />
          <p className="text-sm font-semibold">{wishlistCount}</p>
          <p className="text-xs text-muted-foreground">Wishlist</p>
        </Link>
        <Link
          to="/orders"
          className="flex flex-col items-center justify-center rounded-lg border border-border p-4 bg-card hover:border-primary/40 transition-colors"
        >
          <Package className="h-5 w-5 text-primary mb-1" />
          <p className="text-sm font-semibold">Orders</p>
        </Link>
      </div>

      {/* Menu Links */}
      <div className="space-y-3 mb-4">
        <Link to="/orders" className="flex items-center gap-3 rounded-lg border border-border p-4 bg-card text-sm hover:border-primary/40 transition-colors">
          <Package className="h-4 w-4 text-primary" /> My Orders
        </Link>
        <Link to="/returns" className="flex items-center gap-3 rounded-lg border border-border p-4 bg-card text-sm hover:border-primary/40 transition-colors">
          <RotateCcw className="h-4 w-4 text-primary" /> My Returns
        </Link>
        <Link to="/wishlist" className="flex items-center gap-3 rounded-lg border border-border p-4 bg-card text-sm hover:border-primary/40 transition-colors">
          <Heart className="h-4 w-4 text-primary" /> My Wishlist
        </Link>
        <Link to="/settings" className="flex items-center gap-3 rounded-lg border border-border p-4 bg-card text-sm hover:border-primary/40 transition-colors">
          <Edit className="h-4 w-4 text-primary" /> Account Settings
        </Link>
        <Link to="/wallet" className="flex items-center gap-3 rounded-lg border border-border p-4 bg-card text-sm hover:border-primary/40 transition-colors">
          <Wallet className="h-4 w-4 text-primary" /> My Wallet
        </Link>
        <button
          onClick={handleShare}
          className="w-full flex items-center gap-3 rounded-lg border border-border p-4 bg-card text-sm hover:border-primary/40 transition-colors text-left"
        >
          <Share2 className="h-4 w-4 text-primary" /> Share App
        </button>
      </div>

      {/* 24/7 Customer Support */}
      <div className="rounded-lg border border-border p-4 bg-card text-sm">
        <h3 className="font-semibold text-foreground mb-1">24/7 Customer Support</h3>
        <p className="text-sm text-muted-foreground normal-case mb-3">
          Need help with orders, payments, returns, or product issues?
        </p>
        <div className="space-y-1.5">
          <p className="text-sm text-muted-foreground">
            📞 Phone:{" "}
            <a href="tel:+916381624082" className="text-primary hover:underline">
              +91 63816 24082
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            📧 Email:{" "}
            <a href="mailto:yeshvanthiu@gmail.com" className="text-primary hover:underline">
              yeshvanthiu@gmail.com
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            💬 WhatsApp:{" "}
            <a
              href="https://wa.me/916381624082"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              +91 63816 24082
            </a>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Profile;