import { getPlaceholderImage } from "@/utils/imageFallback";

const normalize = (name: unknown) =>
  String(name ?? "")
    .trim()
    .toLowerCase();

export const getStaticCategoryImage = (categoryName: unknown): string | null => {
  const key = normalize(categoryName);

  if (!key) return null;

  if (key === "bajaj") return getPlaceholderImage("category-bajaj", 600, 360);
  if (key === "hero") return getPlaceholderImage("category-hero", 600, 360);
  if (key === "flasher product" || key === "flasher")
    return getPlaceholderImage("category-flasher", 600, 360);
  if (key === "melody maker" || key === "melody")
    return getPlaceholderImage("category-melody-maker", 600, 360);

  return null;
};
