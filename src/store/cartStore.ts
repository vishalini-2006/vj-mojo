import { create } from "zustand";
import axios from "axios";
import { Product } from "@/data/products";

const API_LINK = import.meta.env.VITE_API_LINK;

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  wishlist: string[];

  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  getTotal: () => number;
  getItemCount: () => number;

  toggleWishlist: (productId: string | number) => Promise<void>;
  isInWishlist: (productId: string | number) => boolean;

  fetchWishlist: (userId: string) => Promise<void>;
  setWishlist: (ids: string[]) => void;

  setCartItems: (items: any[]) => void;
  fetchCart: (userId: string) => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  wishlist: [],

  setCartItems: (items) => set({ items }),

  fetchCart: async (userId) => {
    try {
      const res = await axios.get(`${API_LINK}/cart/${userId}`);
      const formatted = res.data.map((p: any) => ({
        product: { id: p.id, name: p.name, price: Number(p.price) },
        quantity: p.quantity,
      }));
      set({ items: formatted });
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  },

  // 🛒 CART LOGIC
  addToCart: (product) => {
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }

      return { items: [...state.items, { product, quantity: 1 }] };
    });
  },

  removeFromCart: (productId) => {
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId),
    }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }

    set((state) => ({
      items: state.items.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  getTotal: () =>
    get().items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    ),

  getItemCount: () =>
    get().items.reduce((sum, i) => sum + i.quantity, 0),

  // ❤️ WISHLIST LOGIC (DB SYNC)

  setWishlist: (ids) => set({ wishlist: ids }),

  fetchWishlist: async (userId) => {
    try {
      const res = await axios.get(`${API_LINK}/wishlist/${userId}`);

      // convert DB response → array of product IDs
      const ids = res.data.map((item: any) =>
        String(item.product_id)
      );

      set({ wishlist: ids });
    } catch (err) {
      console.error("Wishlist fetch error:", err);
    }
  },

  toggleWishlist: async (productId) => {
    const normalizedProductId = String(productId);
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user?.id) return;

    const prevWishlist = get().wishlist;
    const updatedWishlist = prevWishlist.includes(normalizedProductId)
      ? prevWishlist.filter((id) => id !== normalizedProductId)
      : [...prevWishlist, normalizedProductId];

    // 🔥 Instant UI update
    set({ wishlist: updatedWishlist });

    try {
      await axios.post(`${API_LINK}/wishlist`, {
        user_id: user.id,
        product_id: normalizedProductId,
      });
    } catch (err) {
      console.error("Wishlist update failed:", err);

      // Revert optimistic update on failure
      set({ wishlist: prevWishlist });
    }
  },

  isInWishlist: (productId) =>
    get().wishlist.includes(String(productId)),
}));