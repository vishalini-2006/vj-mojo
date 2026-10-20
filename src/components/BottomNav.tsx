// import { Link, useLocation } from "react-router-dom";
// import { Home, Search, Grid3X3, ShoppingCart, Heart } from "lucide-react";
// import { useCartStore } from "@/store/cartStore";

// const navItems = [
//   { path: "/", icon: Home, label: "Home" },
//   { path: "/categories", icon: Grid3X3, label: "Categories" },
//   { path: "/search", icon: Search, label: "Search" },
//   { path: "/wishlist", icon: Heart, label: "Wishlist" },
//   { path: "/cart", icon: ShoppingCart, label: "Cart" },
// ];

// const BottomNav = () => {
//   const location = useLocation();
//   const itemCount = useCartStore((s) => s.getItemCount());

//   return (
//     <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-[#191951] backdrop-blur-lg safe-area-bottom">
//       <div className="flex items-center justify-around py-2">
//         {navItems.map(({ path, icon: Icon, label }) => {
//           const isActive = location.pathname === path;
//           return (
//             <Link
//               key={path}
//               to={path}
//               className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs transition-colors ${
//                 isActive ? "text-primary" : "text-muted-foreground"
//               }`}
//             >
//               <div className="relative">
//                 <Icon className="h-5 w-5" />
//                 {label === "Cart" && itemCount > 0 && (
//                   <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-primary-foreground">
//                     {itemCount > 9 ? "9+" : itemCount}
//                   </span>
//                 )}
//               </div>
//               <span className="font-medium">{label}</span>
//               {isActive && (
//                 <span className="absolute -top-0.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary" />
//               )}
//             </Link>
//           );
//         })}
//       </div>
//     </nav>
//   );
// };

// export default BottomNav;

import { Link, useLocation } from "react-router-dom";
import { Home, Grid3X3, ShoppingCart, Heart, Search } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const BottomNav = () => {
  const location = useLocation();
  const itemCount = useCartStore((s) => s.getItemCount());

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("user");

  // Show Wishlist & Cart only when logged in
  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/categories", icon: Grid3X3, label: "Categories" },
    { path: "/search", icon: Search, label: "Search" },
    ...(isLoggedIn
      ? [
          { path: "/wishlist", icon: Heart, label: "Wishlist" },
          { path: "/cart", icon: ShoppingCart, label: "Cart" },
        ]
      : []),
  ];

  return (
    /* ✅ WHITE bottom nav with light top border — exactly like Glamzy */
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white safe-area-bottom shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs transition-colors ${
                /* ✅ Active = pink (primary), Inactive = gray — like Glamzy's bottom nav */
                isActive ? "text-primary" : "text-gray-400"
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {label === "Cart" && itemCount > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-white">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </div>
              <span className="font-medium">{label}</span>
              {isActive && (
                /* ✅ Pink underline indicator for active tab */
                <span className="absolute -top-0.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;