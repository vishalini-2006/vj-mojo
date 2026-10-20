import type { SyntheticEvent } from "react";

const BASE_URL = "https://xiadot.com/vkautoparts";

export const getPlaceholderImage = (
  seed: string | number,
  width = 400,
  height = 400
) => {
  const safeSeed = encodeURIComponent(String(seed ?? "placeholder"));
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" fill="#9ca3af" font-family="Arial" font-size="14" text-anchor="middle" dominant-baseline="middle">${safeSeed}</text></svg>`
  )}`;
};

export const resolveImageSrc = (
  src: string | undefined | null,
  seed: string | number,
  width?: number,
  height?: number
) => {
  if (typeof src === "string") {
    const trimmed = src.trim();
    const lower = trimmed.toLowerCase();

    const looksInvalid =
      trimmed.length === 0 ||
      lower.includes("null") ||
      lower.includes("undefined");

    if (!looksInvalid) {
      if (trimmed.startsWith("http")) {
        return trimmed;
      }

      // ✅ Handles category images: /vkautoparts/uploads/Categories/...
      if (trimmed.startsWith("/vkautoparts")) {
        return `https://xiadot.com${trimmed}`;
      }

      // ✅ Handles product images: /uploads/products/...
      if (trimmed.startsWith("/uploads")) {
        return `${BASE_URL}${trimmed}`;
      }

      return `${BASE_URL}/uploads/${trimmed}`;
    }
  }

  return getPlaceholderImage(seed, width, height);
};

export const resolveCategoryImageSrc = (
  src: string | undefined | null,
  seed: string | number,
  width?: number,
  height?: number
) => {
  if (typeof src === "string") {
    const trimmed = src.trim();
    const lower = trimmed.toLowerCase();

    const looksInvalid =
      trimmed.length === 0 ||
      lower.includes("null") ||
      lower.includes("undefined");

    if (!looksInvalid) {
      if (trimmed.startsWith("http")) {
        return trimmed;
      }

      // ✅ Full path from DB: /vkautoparts/uploads/Categories/honda-logo.webp
      if (trimmed.startsWith("/vkautoparts")) {
        return `https://xiadot.com${trimmed}`;
      }

      // ✅ Just filename: honda-logo.webp
      return `https://xiadot.com/vkautoparts/uploads/Categories/${trimmed}`;
    }
  }

  return getPlaceholderImage(seed, width, height);
};

export const setImgFallback = (
  e: SyntheticEvent<HTMLImageElement, Event>,
  seed: string | number,
  width?: number,
  height?: number
) => {
  const target = e.currentTarget;
  target.onerror = null;
  target.src = getPlaceholderImage(seed, width, height);
};