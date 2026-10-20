export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  description: string;
  compatibility: string[];
  partNumber: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  image: string;
}

export const categories: Category[] = [
  { id: "engine", name: "Engine Parts", icon: "⚙️", count: 245, image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop" },
  { id: "brakes", name: "Brakes", icon: "🛑", count: 189, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=200&fit=crop" },
  { id: "electrical", name: "Electrical", icon: "⚡", count: 312, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=300&h=200&fit=crop" },
  { id: "suspension", name: "Suspension", icon: "🔧", count: 156, image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=300&h=200&fit=crop" },
  { id: "filters", name: "Filters", icon: "🌀", count: 98, image: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=300&h=200&fit=crop" },
  { id: "body", name: "Body Parts", icon: "🚗", count: 276, image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=200&fit=crop" },
  { id: "exhaust", name: "Exhaust", icon: "💨", count: 87, image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=300&h=200&fit=crop" },
  { id: "cooling", name: "Cooling System", icon: "❄️", count: 134, image: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=300&h=200&fit=crop" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "High Performance Brake Pad Set",
    brand: "Brembo",
    category: "brakes",
    price: 2499,
    originalPrice: 3299,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 234,
    inStock: true,
    description: "Premium ceramic brake pads for superior stopping power and reduced dust. Designed for high-performance vehicles.",
    compatibility: ["Toyota Camry 2018-2024", "Honda Accord 2019-2024", "Hyundai Sonata 2020-2024"],
    partNumber: "BRM-BP-4521",
  },
  {
    id: "2",
    name: "LED Headlight Assembly",
    brand: "Philips",
    category: "electrical",
    price: 4599,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 189,
    inStock: true,
    description: "Crystal clear LED headlight assembly with DRL. Plug and play installation.",
    compatibility: ["Maruti Swift 2018-2024", "Maruti Baleno 2019-2024"],
    partNumber: "PHL-HL-7832",
  },
  {
    id: "3",
    name: "Engine Oil Filter Premium",
    brand: "Bosch",
    category: "filters",
    price: 349,
    image: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 567,
    inStock: true,
    description: "High-efficiency oil filter that removes 99% of contaminants for engine longevity.",
    compatibility: ["Universal fit - Most 4-cylinder engines"],
    partNumber: "BSH-OF-1122",
  },
  {
    id: "4",
    name: "Sport Shock Absorber Set",
    brand: "Monroe",
    category: "suspension",
    price: 6799,
    originalPrice: 8999,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 143,
    inStock: true,
    description: "Gas-charged sport shock absorbers for improved handling and comfort.",
    compatibility: ["Honda City 2017-2024", "Toyota Yaris 2018-2024"],
    partNumber: "MNR-SA-3345",
  },
  {
    id: "5",
    name: "Timing Belt Kit",
    brand: "Gates",
    category: "engine",
    price: 3299,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 312,
    inStock: false,
    description: "Complete timing belt kit with tensioner and water pump for hassle-free replacement.",
    compatibility: ["Volkswagen Polo 2015-2024", "Skoda Rapid 2016-2024"],
    partNumber: "GTS-TB-5567",
  },
  {
    id: "6",
    name: "Stainless Steel Exhaust Muffler",
    brand: "Borla",
    category: "exhaust",
    price: 8499,
    originalPrice: 10999,
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 89,
    inStock: true,
    description: "Performance exhaust muffler with deep tone. T-304 stainless steel construction.",
    compatibility: ["Universal fit - 2.5 inch inlet"],
    partNumber: "BRL-EX-7789",
  },
  {
    id: "7",
    name: "Radiator Coolant Hose Set",
    brand: "Continental",
    category: "cooling",
    price: 1299,
    image: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 76,
    inStock: true,
    description: "Premium EPDM rubber coolant hoses resistant to heat and pressure.",
    compatibility: ["Tata Nexon 2020-2024", "Tata Harrier 2019-2024"],
    partNumber: "CNT-CH-2234",
  },
  {
    id: "8",
    name: "Chrome Side Mirror Cover",
    brand: "AutoStyle",
    category: "body",
    price: 1899,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=400&fit=crop",
    rating: 4.1,
    reviews: 45,
    inStock: true,
    description: "Premium chrome mirror covers for a stylish upgrade. Easy clip-on installation.",
    compatibility: ["Mahindra XUV700 2021-2024", "Mahindra Thar 2020-2024"],
    partNumber: "ATS-MC-9912",
  },
  {
    id: "9",
    name: "Spark Plug Iridium Set (4pcs)",
    brand: "NGK",
    category: "engine",
    price: 1599,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 890,
    inStock: true,
    description: "Iridium spark plugs for improved fuel efficiency and engine performance.",
    compatibility: ["Most 4-cylinder petrol engines"],
    partNumber: "NGK-SP-4401",
  },
  {
    id: "10",
    name: "Cabin Air Filter",
    brand: "Mann",
    category: "filters",
    price: 599,
    image: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 234,
    inStock: true,
    description: "Activated carbon cabin filter for clean and fresh air inside your car.",
    compatibility: ["Hyundai Creta 2020-2024", "Kia Seltos 2019-2024"],
    partNumber: "MNN-CF-6678",
  },
];

export const brands = ["Brembo", "Philips", "Bosch", "Monroe", "Gates", "Borla", "Continental", "AutoStyle", "NGK", "Mann"];
