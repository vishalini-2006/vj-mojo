import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { resolveCategoryImageSrc, setImgFallback } from "@/utils/imageFallback";

const SubCategories = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_LINK = import.meta.env.VITE_API_LINK;

  const [parent, setParent] = useState<any>(null);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubCategories();
  }, [id]);

  const fetchSubCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_LINK}/categories/with-children`);
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      const found = data.find((c: any) => String(c.id) === String(id));
      if (found) {
        setParent(found);
        setSubcategories(found.subcategories || []);
      }
    } catch {
      setSubcategories([]);
    }
    setLoading(false);
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

      <h1 className="mb-4 text-2xl font-bold">
        {parent ? parent.name : "Sub Categories"}
      </h1>

      {loading ? (
        <div className="py-16 text-center">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      ) : subcategories.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-muted-foreground">No sub-categories found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
          {subcategories.map((sub: any) => (
            <Link
              key={sub.id}
              to={`/products?category=${sub.id}`}
              className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/30"
            >
              <div className="aspect-square w-full overflow-hidden bg-[hsl(var(--product-image-bg))]">
                <img
                  src={resolveCategoryImageSrc(sub?.image, sub.id)}
                  alt={sub.name}
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                  onError={(e) => setImgFallback(e, sub.id)}
                />
              </div>
              <div className="h-9 flex items-center justify-center px-2">
                <p className="text-[13px] font-semibold text-center text-foreground truncate w-full">
                  {sub.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubCategories;
