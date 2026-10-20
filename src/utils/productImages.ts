const PRODUCT_IMAGE_BASE = "https://xiadot.com/vkautoparts/uploads/";

type ImagesValue = unknown;

const parseImagesValue = (images: ImagesValue): string[] => {
  if (Array.isArray(images)) {
    return images
      .filter((x) => typeof x === "string")
      .map((x) => x.trim())
      .filter(Boolean);
  }

  if (typeof images === "string") {
    const trimmed = images.trim();
    if (!trimmed) return [];

    try {
      const parsed = JSON.parse(trimmed);
      return parseImagesValue(parsed);
    } catch {
      return [trimmed];
    }
  }

  return [];
};

export const buildProductImageUrls = (images: ImagesValue): string[] => {
  const arr = parseImagesValue(images);

  return arr
    .map((filename) => {
      if (filename.startsWith("http://") || filename.startsWith("https://")) return filename;
      return `${PRODUCT_IMAGE_BASE}${filename}`;
    })
    .filter(Boolean);
};

export const getFirstImageFilename = (images: ImagesValue): string | null => {
  const arr = parseImagesValue(images);
  return arr.length > 0 ? arr[0] : null;
};

export const buildProductImageUrl = (images: ImagesValue): string | null => {
  const filename = getFirstImageFilename(images);
  if (!filename) return null;
  if (filename.startsWith("http://") || filename.startsWith("https://")) return filename;
  return `${PRODUCT_IMAGE_BASE}${filename}`;
};
