// import { useState, useEffect } from "react";
// import axios from "axios";

// import CategoryCard from "@/components/CategoryCard";

// const CATEGORY_IMAGE_BASE = import.meta.env.VITE_IMAGE_LINK + "uploads/Category/";



// const Categories = () => {

//   const API_LINK = import.meta.env.VITE_API_LINK;

//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     console.log("Fetching categories from API...");
//     try {
//       const res = await axios.get(`${API_LINK}/categories`);
//       console.log("Raw category response:", res.data);

//       const formattedCategories = res.data.map((c) => ({
//         id: c.id,
//         name: c.name,
//         image: c.image ? `${CATEGORY_IMAGE_BASE}${c.image}` : ""
//       }));
//       console.log("Fetched categories:", formattedCategories);
//       setCategories(formattedCategories);

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="px-4 py-5 pb-20">
//       <h1 className="mb-4 text-2xl font-bold mb-8">All Categories</h1>

//       <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
//         {categories.map((cat) => (
//           <CategoryCard key={cat.id} category={cat} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Categories;

// import { useState, useEffect } from "react";
// import axios from "axios";

// import CategoryCard from "@/components/CategoryCard";

// const Categories = () => {

//   const API_LINK = import.meta.env.VITE_API_LINK;

//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${API_LINK}/categories`);
      
//       const formattedCategories = res.data.map((c) => ({
//         id: c.id,
//         name: c.name,
//         // ✅ DB already stores full path like /vkautoparts/uploads/Categories/honda-logo.webp
//         // resolveCategoryImageSrc in CategoryCard handles the full URL building
//         image: c.image || ""
//       }));

//       setCategories(formattedCategories);

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="px-4 py-5 pb-20">
//       <h1 className="mb-4 text-2xl font-bold mb-8">All Categories</h1>

//       <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
//         {categories.map((cat) => (
//           <CategoryCard key={cat.id} category={cat} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Categories;

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { resolveCategoryImageSrc, setImgFallback } from "@/utils/imageFallback";

const Categories = () => {
  const API_LINK = import.meta.env.VITE_API_LINK;
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_LINK}/categories/with-children`);
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setCategories(data);
    } catch (error) {
      console.error(error);
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

      <h1 className="mb-4 text-2xl font-bold mb-8">All Categories</h1>
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
        {categories.map((cat: any) => (
          <div
            key={cat.id}
            className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/30 cursor-pointer"
            onClick={() => navigate(`/categories/${cat.id}`)}
          >
            <div className="aspect-square w-full overflow-hidden bg-[hsl(var(--product-image-bg))]">
              <img
                src={resolveCategoryImageSrc(cat?.image, cat.id)}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                onError={(e) => setImgFallback(e, cat.id)}
              />
            </div>
            <div className="h-9 flex items-center justify-center px-2">
              <p className="text-[13px] font-semibold text-center text-foreground truncate w-full">
                {cat.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;