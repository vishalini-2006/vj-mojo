const CACHE_KEY = "vk_products_cache";
const CACHE_TTL = 30 * 60 * 1000;

interface CacheEntry {
  timestamp: number;
  all: any[];
}

export const getCachedProducts = (): any[] | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL) return null;
    return entry.all;
  } catch {
    return null;
  }
};

export const setCachedProducts = (products: any[]) => {
  try {
    const entry: CacheEntry = { timestamp: Date.now(), all: products };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // storage full or unavailable - ignore
  }
};

export const getCachedOfferProducts = (offerId: string | null): any[] | null => {
  if (!offerId) return null;
  const all = getCachedProducts();
  if (!all) return null;
  return all.filter((p) => String(p.offer_id) === String(offerId));
};
