// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import { useEffect } from "react";

// import AppHeader from "@/components/AppHeader";
// import BottomNav from "@/components/BottomNav";

// import Index from "./pages/Index";
// import Categories from "./pages/Categories";
// import Products from "./pages/Products";
// import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
// import SearchPage from "./pages/SearchPage";
// import Wishlist from "./pages/Wishlist";
// import NotFound from "./pages/NotFound";

// import Login from "./pages/Login";
// import Register from "./pages/Register";

// import PrivateRoute from "./components/PrivateRoute";
// import Checkout from "./pages/Checkout";
// import OrderSuccess from "./pages/OrderSuccess";
// import Profile from "./pages/Profile";
// import Settings from "./pages/Settings";
// import Orders from "./pages/Orders";
// import OrderDetails from "./pages/OrderDetails";

// const queryClient = new QueryClient();

// const ScrollToTop = () => {
//   const { pathname } = useLocation();
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);
//   return null;
// };

// /* Hides header and bottom nav on auth pages */
// const hideOnRoutes = ["/login", "/register"];

// const Layout = ({ children }: { children: React.ReactNode }) => {
//   const { pathname } = useLocation();
//   const isAuthPage = hideOnRoutes.includes(pathname);

//   return (
//     <>
//       {!isAuthPage && <AppHeader />}
//       <main className="min-h-screen">{children}</main>
//       {!isAuthPage && <BottomNav />}
//     </>
//   );
// };

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />

//       <BrowserRouter basename="/vkautoparts">
//         <ScrollToTop />

//         <Layout>
//           <Routes>

//             {/* PUBLIC ROUTES */}
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />

//             {/* PROTECTED ROUTES */}
//             <Route element={<PrivateRoute />}>
//               <Route path="/" element={<Index />} />
//               <Route path="/categories" element={<Categories />} />
//               <Route path="/products" element={<Products />} />
//               <Route path="/product/:id" element={<ProductDetail />} />
//               <Route path="/cart" element={<Cart />} />
//               <Route path="/search" element={<SearchPage />} />
//               <Route path="/wishlist" element={<Wishlist />} />
//               <Route path="/checkout" element={<Checkout />} />
//               <Route path="/order-success" element={<OrderSuccess />} />
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/settings" element={<Settings />} />
//               <Route path="/orders" element={<Orders />} />
//               <Route path="/order/:id" element={<OrderDetails />} />
//             </Route>

//             <Route path="*" element={<NotFound />} />

//           </Routes>
//         </Layout>

//       </BrowserRouter>

//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

import Index from "./pages/Index";
import Categories from "./pages/Categories";
import SubCategories from "./pages/SubCategories";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import SearchPage from "./pages/SearchPage";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";

import Login from "./pages/Login";
import Register from "./pages/Register";

import PrivateRoute from "./components/PrivateRoute";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Disputes from "./pages/Disputes";
import Offers from "./pages/Offers";
import Wallet from "./pages/Wallet";
import Returns from "./pages/Returns";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/* Hides header and bottom nav on auth pages */
const hideOnRoutes = ["/login", "/register"];

import { useCartStore } from "@/store/cartStore";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const isAuthPage = hideOnRoutes.includes(pathname);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.id) {
      useCartStore.getState().fetchCart(user.id);
    }
  }, []);

  return (
    <>
      {!isAuthPage && <AppHeader />}
      <main className="min-h-screen">{children}</main>
      {!isAuthPage && <BottomNav />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter basename="/vkautoparts" future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />

        <Layout>
          <Routes>

            {/* PUBLIC ROUTES */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:id" element={<SubCategories />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/search" element={<SearchPage />} />

            {/* PROTECTED ROUTES */}
            <Route element={<PrivateRoute />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/disputes" element={<Disputes />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/returns" element={<Returns />} />
            </Route>

            <Route path="*" element={<NotFound />} />

          </Routes>
        </Layout>

      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;