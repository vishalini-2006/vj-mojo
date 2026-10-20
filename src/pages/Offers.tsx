import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { formatProduct } from "@/utils/productFormatter";

const offers = [
  { label: "99%",         image: `${import.meta.env.BASE_URL}offers/offer_99_off.png` },
  { label: "Flash Sale",  image: `${import.meta.env.BASE_URL}offers/offer_flash_sale.png` },
  { label: "15% OFF",     image: `${import.meta.env.BASE_URL}offers/offer_15_off.png` },
  { label: "Diwali Sale", image: `${import.meta.env.BASE_URL}offers/offer_diwali.png` },
];

const Offers = () => {
  const API_LINK = import.meta.env.VITE_API_LINK;
  const IMG_LINK = import.meta.env.VITE_IMAGE_LINK;
  const navigate = useNavigate();

  const [products, setProducts] = useState<any[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_LINK}/products`);
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setProducts(data.map((p: any) => formatProduct(p, IMG_LINK)));
    } catch {
      setProducts([]);
    }
  };

  const offerProducts = products.filter((p) => p.originalPrice);

  return (
    <div className="px-4 py-5 pb-20">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <h1 className="mb-4 text-2xl font-bold">Offers</h1>

      {/* Offer circles */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide mb-4">
        {offers.map((offer) => (
          <div
            key={offer.label}
            className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group"
            style={{ minWidth: 72 }}
            onClick={() => setSelectedOffer(selectedOffer === offer.label ? null : offer.label)}
          >
            <div
              className={`relative rounded-full overflow-hidden transition-transform group-hover:scale-105 ${
                selectedOffer === offer.label ? "ring-2 ring-primary ring-offset-2" : ""
              }`}
              style={{
                width: 68,
                height: 68,
                border: "3px solid #c9a227",
                boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
              }}
            >
              <img
                src={offer.image}
                alt={offer.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full"
                style={{
                  width: 14,
                  height: 14,
                  background: "radial-gradient(circle, #f5d020, #c9a227)",
                  border: "1.5px solid #fff",
                }}
              />
            </div>
            <span className="text-[11px] font-semibold text-center text-gray-700 leading-tight">
              {offer.label}
            </span>
          </div>
        ))}
      </div>

      {/* Offer products */}
      {selectedOffer !== null && offerProducts.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-500 mb-3">
            {selectedOffer} Products
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {offerProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {selectedOffer !== null && offerProducts.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-sm text-gray-400">No offer products found</p>
        </div>
      )}
    </div>
  );
};

export default Offers;
