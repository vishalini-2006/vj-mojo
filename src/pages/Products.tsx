import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { buildProductImageUrl } from "@/utils/productImages";
import { getCachedOfferProducts, getCachedProducts, setCachedProducts } from "@/utils/productCache";
import { ChevronLeft } from "lucide-react";

const formatProduct = (p: any) => ({
  id: p.id,
  name: p.name,
  price: Number(p.price),
  originalPrice: p.mrp ? Number(p.mrp) : null,
  image: buildProductImageUrl(p.images) || "",
  brand: p.category || "Generic",
  rating: 4.5,
  reviews: 10,
  inStock: p.stock > 0,
  category: String(p.category_id ?? "")
});

const Products = () => {

  const API_LINK = import.meta.env.VITE_API_LINK;
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const offerFilter = searchParams.get("offer");

  const stateOfferProducts: any[] | null =
    location.state?.offerId === String(offerFilter ?? "")
      ? (location.state?.offerProducts ?? null)
      : null;

  const [products, setProducts] = useState<any[]>(() => {
    // 1. Offer page nav state (fastest, already formatted upstream)
    if (stateOfferProducts && stateOfferProducts.length > 0) return stateOfferProducts;

    // 2. Offer cache
    if (offerFilter) {
      const cached = getCachedOfferProducts(offerFilter);
      if (cached && cached.length > 0) return cached.map(formatProduct);
    }

    // 3. Plain "All Products" cache — show instantly instead of blank screen
    if (!offerFilter && !categoryFilter) {
      const cachedAll = getCachedProducts();
      if (cachedAll && cachedAll.length > 0) return cachedAll.map(formatProduct);
    }

    return [];
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [openFilter, setOpenFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState("category");

  const [sortOption, setSortOption] = useState(null);
  const [priceRange, setPriceRange] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [draftSortOption, setDraftSortOption] = useState(null);
  const [draftPriceRange, setDraftPriceRange] = useState(null);
  const [draftSelectedCategories, setDraftSelectedCategories] = useState([]);

  useEffect(() => {
    // Only show the loading state when we truly have nothing to show yet.
    const hasInstantData =
      (stateOfferProducts && stateOfferProducts.length > 0) ||
      (offerFilter && (getCachedOfferProducts(offerFilter)?.length ?? 0) > 0) ||
      (!offerFilter && !categoryFilter && (getCachedProducts()?.length ?? 0) > 0);

    setLoading(!hasInstantData);

    fetchProducts();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter, offerFilter]);

  const fetchProducts = async () => {
    const currentOffer = searchParams.get("offer");
    const currentCategory = searchParams.get("category");

    setError(false);
    const maxAttempts = 3;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        let url = `${API_LINK}/products`;
        if (currentCategory) {
          url = `${API_LINK}/products?category=${currentCategory}`;
        } else if (currentOffer) {
          url = `${API_LINK}/products?offer=${currentOffer}`;
        }
        const res = await axios.get(url);
        const raw = Array.isArray(res.data) ? res.data : res.data?.data || [];

        if (!currentOffer && !currentCategory) {
          setCachedProducts(raw);
        }

        // Silent background refresh: only update UI if data actually changed,
        // so an already-visible cached list doesn't flicker/re-render needlessly.
        const formatted = raw.map(formatProduct);
        setProducts((prev) =>
          JSON.stringify(prev) === JSON.stringify(formatted) ? prev : formatted
        );
        setError(false);
        setLoading(false);
        return;
      } catch (err) {
        if (attempt === maxAttempts - 1) {
          const haveInstant =
            (stateOfferProducts && stateOfferProducts.length > 0) ||
            (currentOffer && (getCachedOfferProducts(currentOffer)?.length ?? 0) > 0) ||
            (!currentOffer && !currentCategory && (getCachedProducts()?.length ?? 0) > 0);
          if (!haveInstant) {
            setError(true);
          }
          setLoading(false);
        } else {
          await new Promise((r) => setTimeout(r, 800));
        }
      }
    }
  };

  const fetchCategories = async () => {
    const res = await axios.get(`${API_LINK}/categories`);
    const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
    setCategories(data);
  };

  let filtered = [...products];

  if (selectedCategories.length > 0) {
    filtered = filtered.filter((p) =>
      selectedCategories.includes(String(p.category))
    );
  }

  if (priceRange === "0-500") {
    filtered = filtered.filter((p) => p.price <= 500);
  }
  if (priceRange === "500-1000") {
    filtered = filtered.filter((p) => p.price >= 500 && p.price <= 1000);
  }
  if (priceRange === "1000+") {
    filtered = filtered.filter((p) => p.price >= 1000);
  }

  if (sortOption === "low-high") {
    filtered.sort((a, b) => a.price - b.price);
  }
  if (sortOption === "high-low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  const categoryName =
    selectedCategories.length > 0 ? "Filtered Products" : "All Products";

  const toggleCategory = (id) => {
    const normalized = String(id ?? "");
    if (!normalized) return;
    setSelectedCategories((prev) =>
      prev.includes(normalized)
        ? prev.filter((c) => c !== normalized)
        : [...prev, normalized]
    );
  };

  const toggleDraftCategory = (id) => {
    const normalized = String(id ?? "");
    if (!normalized) return;
    setDraftSelectedCategories((prev) =>
      prev.includes(normalized)
        ? prev.filter((c) => c !== normalized)
        : [...prev, normalized]
    );
  };

  const openFilterDrawer = () => {
    setDraftSortOption(sortOption);
    setDraftPriceRange(priceRange);
    setDraftSelectedCategories(selectedCategories);
    setActiveFilter("category");
    setOpenFilter(true);
  };

  const clearDraftFilters = () => {
    setDraftSortOption(null);
    setDraftPriceRange(null);
    setDraftSelectedCategories([]);
  };

  const clearAllFilters = () => {
    setSortOption(null);
    setPriceRange(null);
    setSelectedCategories([]);
    clearDraftFilters();
    setOpenFilter(false);
  };

  const applyDraftFilters = () => {
    setSortOption(draftSortOption);
    setPriceRange(draftPriceRange);
    setSelectedCategories(draftSelectedCategories);
    setOpenFilter(false);
  };

  return (
    <div className="px-4 py-5 pb-20">

      {/* Back button */}
      <div className="mb-2">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-2xl font-bold">{categoryName}</h1>
          <p className="text-sm text-muted-foreground normal-case">
            {filtered.length} products found
          </p>
        </div>
        <button
          onClick={openFilterDrawer}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
        >
          Filter
        </button>
      </div>

      {openFilter && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenFilter(false)}
            aria-label="Close filters"
          />
          <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-background text-foreground shadow-xl">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <h2 className="text-base font-semibold">Filters</h2>
                <button
                  type="button"
                  className="rounded-md px-2 py-1 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setOpenFilter(false)}
                >
                  Close
                </button>
              </div>

              <div className="flex flex-1 overflow-hidden">
                <div className="w-32 shrink-0 border-r border-border bg-card/40">
                  <button
                    type="button"
                    onClick={() => setActiveFilter("category")}
                    className={`w-full px-4 py-3 text-left text-sm ${
                      activeFilter === "category"
                        ? "bg-background font-semibold text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    Category
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveFilter("sort")}
                    className={`w-full px-4 py-3 text-left text-sm ${
                      activeFilter === "sort"
                        ? "bg-background font-semibold text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    Sort
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveFilter("price")}
                    className={`w-full px-4 py-3 text-left text-sm ${
                      activeFilter === "price"
                        ? "bg-background font-semibold text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    Price
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-4">
                  {activeFilter === "category" && (
                    <div className="space-y-3">
                      {categories.map((c: { id?: string | number; name: string }) => (
                        <label key={c.id ?? c.name} className="flex items-center gap-3 text-sm">
                          <input
                            type="checkbox"
                            checked={draftSelectedCategories.includes(String(c.id ?? ""))}
                            onChange={() => toggleDraftCategory(c.id)}
                            className="h-4 w-4"
                          />
                          <span className="text-foreground">{c.name ?? "Category"}</span>
                        </label>
                      ))}
                      {categories.length === 0 && (
                        <p className="text-sm text-muted-foreground">No categories</p>
                      )}
                    </div>
                  )}

                  {activeFilter === "sort" && (
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 text-sm">
                        <input
                          type="radio"
                          name="sort"
                          checked={draftSortOption === "low-high"}
                          onChange={() => setDraftSortOption("low-high")}
                        />
                        <span>Price: Low to High</span>
                      </label>
                      <label className="flex items-center gap-3 text-sm">
                        <input
                          type="radio"
                          name="sort"
                          checked={draftSortOption === "high-low"}
                          onChange={() => setDraftSortOption("high-low")}
                        />
                        <span>Price: High to Low</span>
                      </label>
                    </div>
                  )}

                  {activeFilter === "price" && (
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 text-sm">
                        <input
                          type="radio"
                          name="price"
                          checked={draftPriceRange === "0-500"}
                          onChange={() => setDraftPriceRange("0-500")}
                        />
                        <span>0 - 500</span>
                      </label>
                      <label className="flex items-center gap-3 text-sm">
                        <input
                          type="radio"
                          name="price"
                          checked={draftPriceRange === "500-1000"}
                          onChange={() => setDraftPriceRange("500-1000")}
                        />
                        <span>500 - 1000</span>
                      </label>
                      <label className="flex items-center gap-3 text-sm">
                        <input
                          type="radio"
                          name="price"
                          checked={draftPriceRange === "1000+"}
                          onChange={() => setDraftPriceRange("1000+")}
                        />
                        <span>1000+</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-border px-4 py-4 pb-24">
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="rounded-lg border border-border bg-background py-2.5 text-sm font-semibold text-foreground"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={applyDraftFilters}
                  className="rounded-lg bg-brand-gradient py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {loading && filtered.length === 0 ? (
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse space-y-2">
              <div className="aspect-square w-full rounded-lg bg-muted" />
              <div className="h-3 w-3/4 rounded bg-muted" />
              <div className="h-3 w-1/2 rounded bg-muted" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!loading && error && filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg font-semibold text-muted-foreground">
            Something went wrong while loading products.
          </p>
          <button
            onClick={() => {
              setLoading(true);
              fetchProducts();
            }}
            className="mt-4 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg font-semibold text-muted-foreground">
            No products found
          </p>
        </div>
      )}

    </div>
  );
};

export default Products;