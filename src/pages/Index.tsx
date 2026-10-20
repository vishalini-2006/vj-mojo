// import { useEffect, useState } from "react";
// import axios from "axios";

// import HeroSection from "@/components/HeroSection";
// import CategoryCard from "@/components/CategoryCard";
// import ProductCard from "@/components/ProductCard";
// import { formatProduct } from "@/utils/productFormatter";

// import { Link } from "react-router-dom";
// import { ArrowRight, Truck, Shield, Headphones, RotateCcw } from "lucide-react";

// const CATEGORY_IMAGE_BASE = "https://xiadot.com/vkautoparts/uploads/Category/";

// const features = [
//   { icon: Truck,      label: "Free Delivery", sub: "Above ₹999"      },
//   { icon: Shield,     label: "Genuine Parts",  sub: "100% Authentic"  },
//   { icon: RotateCcw,  label: "Easy Returns",   sub: "7-Day Return"    },
//   { icon: Headphones, label: "24/7 Support",   sub: "Always Here"     },
// ];

// /* Reusable section header */
// const SectionHeader = ({ title, to }: { title: string; to?: string }) => (
//   <div className="flex items-center justify-between mb-3">
//     <h2 className="text-sm font-semibold tracking-tight uppercase">{title}</h2>
//     {to && (
//       <Link
//         to={to}
//         className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
//       >
//         View All <ArrowRight className="h-3 w-3" />
//       </Link>
//     )}
//   </div>
// );

// const Index = () => {
//   const API_LINK = import.meta.env.VITE_API_LINK;
//   const IMG_LINK = import.meta.env.IMAGE_LINK;

//   const [categories, setCategories] = useState<any[]>([]);
//   const [products,   setProducts]   = useState<any[]>([]);

//   useEffect(() => {
//     fetchCategories();
//     fetchProducts();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res  = await axios.get(`${API_LINK}/categories`);
//       const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
//       setCategories(
//         data.map((c: any) => ({
//           ...c,
//           image: c?.image ? `${CATEGORY_IMAGE_BASE}${c.image}` : "",
//         }))
//       );
//     } catch {
//       setCategories([]);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const res  = await axios.get(`${API_LINK}/products`);
//       const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
//       setProducts(data.map((p: any) => formatProduct(p, IMG_LINK)));
//     } catch {
//       setProducts([]);
//     }
//   };

//   const featuredProducts = products.filter((p) => p.originalPrice).slice(0, 4);
//   const topCategories    = categories.slice(0, 6);

//   return (
//     <div className="pb-20 space-y-5">

//       {/* Hero */}
//       <HeroSection />

//       {/* Feature strip — smaller, cleaner blocks (Req 5) */}
//       <section className="px-3">
//         <div className="grid grid-cols-4 gap-2">
//           {features.map(({ icon: Icon, label, sub }) => (
//             <div
//               key={label}
//               className="flex flex-col items-center gap-1 rounded-lg bg-card border border-border px-2 py-3 text-center"
//             >
//               <div className="rounded-full bg-primary/10 p-1.5">
//                 <Icon className="h-4 w-4 text-primary" />
//               </div>
//               <p className="text-[11px] font-semibold leading-tight">{label}</p>
//               <p className="text-[9px] text-muted-foreground leading-tight">{sub}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="px-3">
//         <SectionHeader title="Shop by Category" to="/categories" />
//         <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
//           {topCategories.map((cat: any) => (
//             <CategoryCard key={cat.id} category={cat} />
//           ))}
//         </div>
//       </section>

//       {/* Hot Deals */}
//       <section className="px-3">
//         <SectionHeader title="🔥 Hot Deals" to="/products" />
//         <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
//           {featuredProducts.map((product: any) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </section>

//       {/* Popular Products */}
//       <section className="px-3">
//         <SectionHeader title="Popular Products" />
//         <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
//           {products.slice(0, 6).map((product: any) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </section>

//     </div>
//   );
// };

// export default Index;

// import { useEffect, useState } from "react";
// import axios from "axios";

// import HeroSection from "@/components/HeroSection";
// import CategoryCard from "@/components/CategoryCard";
// import ProductCard from "@/components/ProductCard";
// import { formatProduct } from "@/utils/productFormatter";

// import { Link } from "react-router-dom";
// import { ArrowRight, Truck, Shield, Headphones, RotateCcw } from "lucide-react";

// const CATEGORY_IMAGE_BASE = "https://xiadot.com/vkautoparts/uploads/Category/";

// const features = [
//   { icon: Truck,      label: "Free Delivery", sub: "Above ₹999"      },
//   { icon: Shield,     label: "Genuine Parts",  sub: "100% Authentic"  },
//   { icon: RotateCcw,  label: "Easy Returns",   sub: "7-Day Return"    },
//   { icon: Headphones, label: "24/7 Support",   sub: "Always Here"     },
// ];

// /* ✅ Exact Glamzy color: #96206c (deep magenta-purple) */
// const GLAMZY_COLOR = "#96206c";
// const GLAMZY_DARK  = "#7a1a58"; /* slightly darker shade for gradient depth */

// /* Section header with exact Glamzy color */
// const SectionHeader = ({ title, to }: { title: string; to?: string }) => (
//   <div
//     className="flex items-center justify-between mb-3 px-3 py-2 rounded-lg"
//     style={{ background: `linear-gradient(135deg, ${GLAMZY_DARK}, ${GLAMZY_COLOR})` }}
//   >
//     <h2 className="text-sm font-semibold tracking-tight uppercase text-white">{title}</h2>
//     {to && (
//       <Link
//         to={to}
//         className="flex items-center gap-1 text-xs font-medium text-yellow-300 hover:text-yellow-200"
//       >
//         View All <ArrowRight className="h-3 w-3" />
//       </Link>
//     )}
//   </div>
// );

// const Index = () => {
//   const API_LINK = import.meta.env.VITE_API_LINK;
//   const IMG_LINK = import.meta.env.VITE_IMAGE_LINK;

//   const [categories, setCategories] = useState<any[]>([]);
//   const [products,   setProducts]   = useState<any[]>([]);

//   useEffect(() => {
//     fetchCategories();
//     fetchProducts();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res  = await axios.get(`${API_LINK}/categories`);
//       const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
//       setCategories(
//         data.map((c: any) => ({
//           ...c,
//           image: c?.image ? `${CATEGORY_IMAGE_BASE}${c.image}` : "",
//         }))
//       );
//     } catch {
//       setCategories([]);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const res  = await axios.get(`${API_LINK}/products`);
//       const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
//       setProducts(data.map((p: any) => formatProduct(p, IMG_LINK)));
//     } catch {
//       setProducts([]);
//     }
//   };

//   const featuredProducts = products.filter((p) => p.originalPrice).slice(0, 4);
//   const topCategories    = categories.slice(0, 6);

//   return (
//     <div className="pb-20 space-y-5">

//       {/* Hero */}
//       <HeroSection />

//       {/* ✅ Feature strip — exact Glamzy color #96206c */}
//       <section className="px-3">
//         <div
//           className="grid grid-cols-4 rounded-xl overflow-hidden"
//           style={{ background: `linear-gradient(135deg, ${GLAMZY_DARK}, ${GLAMZY_COLOR})` }}
//         >
//           {features.map(({ icon: Icon, label, sub }, index) => (
//             <div
//               key={label}
//               className={`flex flex-col items-center gap-1 px-2 py-3 text-center ${
//                 index !== features.length - 1 ? "border-r border-white/20" : ""
//               }`}
//             >
//               <div className="rounded-full bg-white/20 p-1.5">
//                 <Icon className="h-4 w-4 text-white" />
//               </div>
//               <p className="text-[11px] font-semibold leading-tight text-white">{label}</p>
//               <p className="text-[9px] text-white/70 leading-tight">{sub}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="px-3">
//         <SectionHeader title="Shop by Category" to="/categories" />
//         <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
//           {topCategories.map((cat: any) => (
//             <CategoryCard key={cat.id} category={cat} />
//           ))}
//         </div>
//       </section>

//       {/* Hot Deals */}
//       <section className="px-3">
//         <SectionHeader title="🔥 Hot Deals" to="/products" />
//         <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
//           {featuredProducts.map((product: any) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </section>

//       {/* Popular Products */}
//       <section className="px-3">
//         <SectionHeader title="Popular Products" />
//         <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
//           {products.slice(0, 6).map((product: any) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </section>

//     </div>
//   );
// };

// export default Index;

import { useEffect, useState } from "react";
import axios from "axios";

import HeroSection from "@/components/HeroSection";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { formatProduct } from "@/utils/productFormatter";
import { resolveImageSrc, resolveCategoryImageSrc, setImgFallback } from "@/utils/imageFallback";
import { getCachedOfferProducts, setCachedProducts } from "@/utils/productCache";

import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Truck, Shield, Headphones, RotateCcw } from "lucide-react";

const CATEGORY_IMAGE_BASE = import.meta.env.VITE_IMAGE_LINK ;

const features = [
  { icon: Truck,      label: "Free Delivery", sub: "Above ₹999"      },
  { icon: Shield,     label: "Genuine Parts",  sub: "100% Authentic"  },
  { icon: RotateCcw,  label: "Easy Returns",   sub: "7-Day Return"    },
  { icon: Headphones, label: "24/7 Support",   sub: "Always Here"     },
];

const GLAMZY_COLOR = "#96206c";
const GLAMZY_DARK  = "#7a1a58";

/* ✅ P4: SectionHeader is now a simple row — just title + link
   No heavy full-width gradient banner box.
   Left border accent gives identity without boxing everything in. */
const SectionHeader = ({ title, to }: { title: string; to?: string }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      {/* Left accent bar instead of full gradient background */}
      <div
        className="w-1 h-6 rounded-full"
        style={{ background: `linear-gradient(180deg, ${GLAMZY_DARK}, ${GLAMZY_COLOR})` }}
      />
      {/* P2: text-lg font-bold kept */}
      <h2 className="text-lg font-bold tracking-tight uppercase text-foreground">{title}</h2>
    </div>
    {to && (
      <Link
        to={to}
        className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80"
      >
        View All <ArrowRight className="h-3 w-3" />
      </Link>
    )}
  </div>
);

const Index = () => {
  const API_LINK = import.meta.env.VITE_API_LINK;
  const IMG_LINK = import.meta.env.VITE_IMAGE_LINK;

  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [products,   setProducts]   = useState<any[]>([]);
  const [offers,     setOffers]     = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchOffers();
    fetchAllProductsForCache();
  }, []);

  const fetchAllProductsForCache = async () => {
    try {
      const res  = await fetch(`${API_LINK}/products`);
      const json = await res.json();
      const data = Array.isArray(json) ? json : json?.data || [];
      if (data.length > 0) {
        setCachedProducts(data);
      }
    } catch {
      // background populate - ignore
    }
  };

  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${API_LINK}/offers`);
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setOffers(data);
    } catch {
      setOffers([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const res  = await axios.get(`${API_LINK}/categories/with-children`);
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setCategories(data);
    } catch {
      setCategories([]);
    }
  };

  const fetchProducts = async () => {
    try {
      const res  = await axios.get(`${API_LINK}/products?limit=12`);
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setProducts(data.map((p: any) => formatProduct(p, IMG_LINK)));
    } catch {
      setProducts([]);
    }
  };

  const featuredProducts = products.filter((p) => p.originalPrice).slice(0, 4);

  const handleOfferClick = (offerId: any) => {
    const cached = getCachedOfferProducts(String(offerId));
    const instant = cached && cached.length > 0
      ? cached.map((p: any) => formatProduct(p, IMG_LINK))
      : null;
    navigate(`/products?offer=${offerId}`, { state: instant ? { offerProducts: instant, offerId: String(offerId) } : undefined });
  };

  return (
    /* P1: space-y-6 kept */
    <div className="pb-24 space-y-6">

      {/* Hero */}
      <HeroSection />

      {/* Offers Section */}
      {offers.length > 0 && (
        <section className="px-4">
          <SectionHeader title="OFFERS" />
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {offers.map((offer: any) => {
              // Map DB offers to static images
              let staticImage = resolveImageSrc(offer.image, offer.id);
              const name = offer.name?.toLowerCase() || "";
              if (name.includes("99")) staticImage = `${import.meta.env.BASE_URL}offers/offer_99_off.png`;
              else if (name.includes("flash")) staticImage = `${import.meta.env.BASE_URL}offers/offer_flash_sale.png`;
              else if (name.includes("15")) staticImage = `${import.meta.env.BASE_URL}offers/offer_15_off.png`;
              else if (name.includes("diwali")) staticImage = `${import.meta.env.BASE_URL}offers/offer_diwali.png`;

              return (
                <div
                  key={offer.id}
                  className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group"
                  style={{ minWidth: 72 }}
                  onClick={() => handleOfferClick(offer.id)}
                >
                  <div className="relative w-[70px] h-[70px] group-hover:scale-105 transition-transform duration-200">
                    <div className="w-full h-full rounded-full border-[2.5px] border-[#eab308] p-[3px] bg-transparent">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white">
                        <img
                          src={staticImage}
                          alt={offer.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                          onError={(e) => setImgFallback(e, offer.id)}
                        />
                      </div>
                    </div>
                    {/* Small star badge indicator */}
                    <div className="absolute -bottom-0.5 -left-1 bg-[#eab308] rounded-full p-[3px] flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-[#ca8a04]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                  </div>
                  <span className="text-[12px] font-medium text-center text-foreground leading-tight mt-1">
                    {offer.name}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Feature strip */}
      {/* ✅ P4: added px-4 so strip doesn't touch screen edges — breathes */}
      <section className="px-4">
        <div
          className="grid grid-cols-4 rounded-xl overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${GLAMZY_DARK}, ${GLAMZY_COLOR})` }}
        >
          {features.map(({ icon: Icon, label, sub }, index) => (
            <div
              key={label}
              /* P1: px-2 py-3 kept */
              className={`flex flex-col items-center gap-1 px-2 py-3 text-center ${
                index !== features.length - 1 ? "border-r border-white/20" : ""
              }`}
            >
              <div className="rounded-full bg-white/20 p-1.5">
                <Icon className="h-4 w-4 text-white" />
              </div>
              {/* P2: text-xs font-semibold kept */}
              <p className="text-xs font-semibold leading-tight text-white">{label}</p>
              {/* P2: text-[10px] font-normal kept */}
              <p className="text-[10px] font-normal text-white/70 leading-tight">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories — horizontal scroll row */}
      <section className="px-4">
        <SectionHeader title="Shop by Category" to="/categories" />

        {/* Main categories — one horizontal row */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((cat: any) => (
            <div
              key={cat.id}
              className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer group"
              style={{ minWidth: 72 }}
              onClick={() => navigate(`/categories/${cat.id}`)}
            >
              <div
                className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-border group-hover:border-primary/50 transition-all duration-200"
              >
                <img
                  src={resolveCategoryImageSrc(cat.image, cat.id)}
                  alt={cat.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  onError={(e) => setImgFallback(e, cat.id)}
                />
              </div>
              <span className="text-[11px] font-semibold text-center text-foreground leading-tight max-w-[72px]">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Hot Deals */}
      {/* P1: px-4 gap-4 kept */}
      <section className="px-4">
        <SectionHeader title="🔥 Hot Deals" to="/products" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {featuredProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Popular Products */}
      {/* P1: px-4 gap-4 kept */}
      <section className="px-4">
        <SectionHeader title="Popular Products" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {products.slice(0, 6).map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Index;