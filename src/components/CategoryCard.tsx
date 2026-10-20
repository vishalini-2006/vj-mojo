import { Link } from "react-router-dom";
import { resolveCategoryImageSrc, setImgFallback } from "@/utils/imageFallback";

const CategoryCard = ({ category }) => {

  return (
    <Link to={`/products?category=${category.id}`}>
      <div className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/30">

        {/* Image — fixed aspect ratio so all images same height */}
        <div className="aspect-square w-full overflow-hidden bg-[hsl(var(--product-image-bg))]">
          <img
            src={resolveCategoryImageSrc(category?.image, category.id)}
            alt={category.name}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            onError={(e) => setImgFallback(e, category.id)}
          />
        </div>

        {/* Fixed height label area */}
        <div className="h-9 flex items-center justify-center px-2">
          <p className="text-[13px] font-semibold text-center text-foreground truncate w-full">
            {category.name}
          </p>
        </div>

      </div>
    </Link>
  );
};

export default CategoryCard;