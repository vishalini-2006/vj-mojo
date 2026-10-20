import { buildProductImageUrl } from "@/utils/productImages";

export const formatProduct = (p: any, IMG_LINK: string) => ({
  id: p.id,
  name: p.name,
  price: Number(p.price),
  originalPrice: p.mrp ? Number(p.mrp) : null,
  image: buildProductImageUrl(p.images) || "",
  brand: p.category || "Generic",
  rating: p.average_rating ? Number(p.average_rating) : 0,
  reviews: p.rating_count ? Number(p.rating_count) : 0,
  inStock: p.stock > 0
});