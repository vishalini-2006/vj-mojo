import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Search as SearchIcon, X, Camera, Upload, Sparkles, ScanSearch, AlertCircle, ArrowLeft } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { buildProductImageUrl } from "@/utils/productImages";

const SearchPage = () => {
  const API_LINK = import.meta.env.VITE_API_LINK;
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const navigate = useNavigate();

  const [query, setQuery] = useState(urlQuery);
  const [results, setResults] = useState([]);
  const [isVisualResults, setIsVisualResults] = useState(false);

  // Visual search states
  const [showVisualModal, setShowVisualModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [visualSearchLoading, setVisualSearchLoading] = useState(false);
  const [visualError, setVisualError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(urlQuery);
    if (urlQuery.length >= 2) {
      fetchProducts(urlQuery);
    }
  }, [urlQuery]);

  const fetchProducts = async (searchTerm: string) => {
    if (!searchTerm || searchTerm.length < 2) return;
    try {
      const res = await axios.get(`${API_LINK}/products/search?q=${searchTerm}`);
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];

      const formatted = data.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: Number(p.price),
        originalPrice: null,
        image: p.image_url ? `https://xiadot.com/vkautoparts/uploads/${p.image_url}` : "",
        brand: p.category || "Generic",
        rating: 4.5,
        reviews: 10,
        inStock: true,
      }));

      setResults(formatted);
      setIsVisualResults(false);
    } catch (e) {
      console.error("Search failed", e);
    }
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleImageFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setVisualError("Please select a valid image file (JPG, PNG, etc.)");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setCapturedImage(previewUrl);
    setVisualError(null);
    setVisualSearchLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(`${API_LINK}/visual-search`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const products = res.data.products || [];

      const formatted = products.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: Number(p.price),
        originalPrice: null,
        image: p.image_url ? `https://xiadot.com/vkautoparts/uploads/${p.image_url}` : "",
        brand: p.category || "Generic",
        rating: 4.5,
        reviews: 10,
        inStock: true,
      }));

      setResults(formatted);
      setIsVisualResults(true);
      setQuery("");
      setVisualSearchLoading(false);
      setShowVisualModal(false);

    } catch (err: any) {
      console.error("Visual search error:", err);
      setVisualSearchLoading(false);
      setVisualError(
        err?.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageFile(file);
  };

  const resetVisualSearch = () => {
    setShowVisualModal(false);
    setCapturedImage(null);
    setVisualSearchLoading(false);
    setVisualError(null);
  };

  return (
    <div className="px-4 py-5 pb-20">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <h1 className="mb-4 text-2xl font-bold">Search</h1>

      {/* Search input with camera icon */}
      <div className="relative mb-5">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsVisualResults(false);
            fetchProducts(e.target.value);
          }}
          placeholder="Search parts, brands, part numbers..."
          className="w-full rounded-lg border border-border bg-card py-3 pl-10 pr-20 text-sm"
        />

        <button
          onClick={() => { resetVisualSearch(); setShowVisualModal(true); }}
          className="absolute right-8 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 transition-colors"
          title="Search by image"
        >
          <Camera className="h-5 w-5" />
        </button>

        {(query || isVisualResults) && (
          <button
            onClick={() => { setQuery(""); setResults([]); setIsVisualResults(false); }}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Visual Search hint banner */}
      {!query && !isVisualResults && (
        <button
          onClick={() => { resetVisualSearch(); setShowVisualModal(true); }}
          className="mb-5 flex w-full items-center gap-3 rounded-lg border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-sm text-primary transition-colors hover:bg-primary/10"
        >
          <ScanSearch className="h-5 w-5 shrink-0" />
          <span className="text-left">
            <span className="font-semibold">Search by photo</span>
            <span className="ml-1 text-muted-foreground">— capture or upload any auto part</span>
          </span>
        </button>
      )}

      {/* Visual results label */}
      {isVisualResults && results.length > 0 && (
        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1">
            <ScanSearch className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Visually similar products</span>
          </div>
          <span className="text-xs text-muted-foreground">{results.length} found</span>
        </div>
      )}

      {query.length >= 2 && !isVisualResults && (
        <p className="mb-3 text-sm text-muted-foreground">
          {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
        </p>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {results.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {query.length >= 2 && !isVisualResults && results.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg font-semibold text-muted-foreground">No results found</p>
        </div>
      )}

      {/* Visual Search Modal */}
      {showVisualModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-md rounded-t-2xl bg-card p-5 shadow-2xl sm:rounded-2xl">

            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <ScanSearch className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h2 className="text-base font-bold">Visual Search</h2>
                  <p className="text-xs text-muted-foreground">Find similar parts by photo</p>
                </div>
              </div>
              <button onClick={resetVisualSearch} className="rounded-full p-1 hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            {capturedImage && (
              <div className="mb-4 overflow-hidden rounded-xl border border-border bg-muted/30">
                <div className="relative">
                  <img
                    src={capturedImage}
                    alt="Selected part"
                    className={`h-48 w-full object-contain transition-opacity ${visualSearchLoading ? "opacity-50" : "opacity-100"}`}
                  />
                  {visualSearchLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <div className="relative flex h-16 w-16 items-center justify-center">
                        <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                        <div className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-primary" />
                        <Sparkles className="h-6 w-6 text-primary" />
                      </div>
                      <div className="rounded-full bg-card/90 px-4 py-1.5 backdrop-blur-sm">
                        <p className="text-sm font-medium text-foreground">🔍 Finding similar parts...</p>
                      </div>
                    </div>
                  )}
                  {!visualSearchLoading && (
                    <button
                      onClick={() => { setCapturedImage(null); setVisualError(null); }}
                      className="absolute right-2 top-2 rounded-full bg-card/80 p-1 backdrop-blur-sm hover:bg-card"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {!visualSearchLoading && visualError && (
              <div className="mb-4 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{visualError}</p>
              </div>
            )}

            {!visualSearchLoading && (
              <>
                {!capturedImage && (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={`mb-4 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 transition-colors ${dragOver ? "border-primary bg-primary/10" : "border-border bg-muted/30 hover:border-primary/50 hover:bg-primary/5"}`}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm font-medium">Drag & drop an image here</p>
                    <p className="text-xs text-muted-foreground">or choose an option below</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => cameraInputRef.current?.click()}
                    className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-primary/5 active:scale-95"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Camera className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Take Photo</span>
                    <span className="text-center text-xs text-muted-foreground">Use your camera</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-primary/5 active:scale-95"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Upload className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Upload Image</span>
                    <span className="text-center text-xs text-muted-foreground">From your gallery</span>
                  </button>
                </div>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  💡 Tip: Capture a clear, well-lit photo of the part for best results
                </p>
              </>
            )}

            <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileInput} />
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;