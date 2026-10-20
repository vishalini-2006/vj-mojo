// import { Search, Bell, X, User, LogOut, Settings } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { resolveImageSrc, setImgFallback } from "@/utils/imageFallback";
// import { buildProductImageUrl } from "@/utils/productImages";

// const AppHeader = () => {
//   const API_LINK = import.meta.env.VITE_API_LINK;
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));
//   const firstLetter =
//     user?.name?.charAt(0).toUpperCase() ||
//     user?.email?.charAt(0).toUpperCase() ||
//     "U";

//   const [searchTerm,   setSearchTerm]   = useState("");
//   const [suggestions,  setSuggestions]  = useState([]);
//   const [history,      setHistory]      = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [openProfile,  setOpenProfile]  = useState(false);

//   const searchRef = useRef(null);

//   /* Close dropdown when clicking outside */
//   useEffect(() => {
//     const handler = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   /* Load history when dropdown opens */
//   useEffect(() => {
//     if (dropdownOpen) {
//       const saved = JSON.parse(localStorage.getItem("searchHistory")) || [];
//       setHistory(saved);
//     }
//   }, [dropdownOpen]);

//   /* Debounced suggestions */
//   useEffect(() => {
//     if (searchTerm.length < 2) { setSuggestions([]); return; }
//     const timer = setTimeout(() => fetchSuggestions(searchTerm), 300);
//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   const logout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const fetchSuggestions = async (term) => {
//     try {
//       const res = await axios.get(`${API_LINK}/products/suggestions?q=${term}`);
//       setSuggestions(res.data);
//     } catch {
//       setSuggestions([]);
//     }
//   };

//   const saveHistory = (term) => {
//     const existing = JSON.parse(localStorage.getItem("searchHistory")) || [];
//     const updated = [term, ...existing.filter((i) => i !== term)].slice(0, 5);
//     localStorage.setItem("searchHistory", JSON.stringify(updated));
//     setHistory(updated);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!searchTerm.trim()) return;
//     saveHistory(searchTerm);
//     navigate(`/search?q=${searchTerm}`);
//     setDropdownOpen(false);
//     setSuggestions([]);
//   };

//   const handleSuggestionClick = (item) => {
//     item.type === "product"
//       ? navigate(`/product/${item.id}`)
//       : navigate(`/products?category=${item.id}`);
//     setDropdownOpen(false);
//     setSuggestions([]);
//   };

//   const handleHistoryClick = (term) => {
//     setSearchTerm(term);
//     navigate(`/search?q=${term}`);
//     setDropdownOpen(false);
//   };

//   const showDropdown =
//     dropdownOpen && (suggestions.length > 0 || (history.length > 0 && searchTerm.length === 0));

//   return (
//     <header className="sticky top-0 z-40 border-b border-border bg-[#191951] backdrop-blur-lg">

//       {/* ── Single row: Logo | Search (flex-1) | Icons ────────────────── */}
//       <div className="flex items-center gap-3 px-4 py-3.5">

//         {/* Logo — shrink-0 so it never gets squeezed */}
//         <Link to="/" className="shrink-0 font-display font-bold text-base leading-none">
//           <span className="text-gradient">VK</span>
//           <span className="text-foreground"> AUTO</span>
//         </Link>

//         {/* Search — takes all remaining space */}
//         <div ref={searchRef} className="relative flex-1 min-w-0 max-w-2xl mx-auto">
//           <form
//             onSubmit={handleSearch}
//             className="flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1.5"
//           >
//             <Search className="h-3.5 w-3.5 shrink-0 text-white/50" />
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="flex-1 min-w-0 bg-transparent outline-none text-xs text-white placeholder:text-white/40"
//               value={searchTerm}
//               onChange={(e) => { setSearchTerm(e.target.value); setDropdownOpen(true); }}
//               onFocus={() => setDropdownOpen(true)}
//             />
//             {searchTerm && (
//               <button type="button" onClick={() => { setSearchTerm(""); setSuggestions([]); }}>
//                 <X className="h-3 w-3 text-white/50" />
//               </button>
//             )}
//           </form>

//           {/* Dropdown */}
//           {showDropdown && (
//             <div className="absolute left-0 right-0 top-full mt-1 bg-card border border-border shadow-lg rounded-lg overflow-hidden z-50">
//               {suggestions.length > 0 ? (
//                 <>
//                   {suggestions.map((item) => (
//                     <div
//                       key={item.id}
//                       onClick={() => handleSuggestionClick(item)}
//                       className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-muted"
//                     >
//                       <img
//                         src={resolveImageSrc(
//                           buildProductImageUrl(item.images ?? item.image_url) ||
//                             `${import.meta.env.IMAGE_LINK}uploads/${item.image_url}`,
//                           `${item.type}-${item.id}`
//                         )}
//                         className="h-8 w-8 object-cover rounded shrink-0"
//                         onError={(e) => setImgFallback(e, `${item.type}-${item.id}`, 80, 80)}
//                       />
//                       <div className="flex-1 text-sm truncate">{item.name}</div>
//                       <span className="text-xs text-muted-foreground shrink-0">{item.type}</span>
//                     </div>
//                   ))}
//                   <div
//                     onClick={() => { saveHistory(searchTerm); navigate(`/search?q=${searchTerm}`); setDropdownOpen(false); }}
//                     className="px-3 py-2.5 text-xs text-primary cursor-pointer hover:bg-muted border-t"
//                   >
//                     View all results for "{searchTerm}"
//                   </div>
//                 </>
//               ) : history.length > 0 && searchTerm.length === 0 ? (
//                 <>
//                   <div className="px-3 py-2 text-xs text-muted-foreground border-b">
//                     Recent Searches
//                   </div>
//                   {history.map((item, index) => (
//                     <div
//                       key={index}
//                       onClick={() => handleHistoryClick(item)}
//                       className="flex items-center gap-2 px-3 py-2.5 cursor-pointer hover:bg-muted text-sm"
//                     >
//                       🕘 {item}
//                     </div>
//                   ))}
//                   <div
//                     onClick={() => { localStorage.removeItem("searchHistory"); setHistory([]); }}
//                     className="text-xs text-red-500 px-3 py-2 cursor-pointer hover:bg-muted"
//                   >
//                     Clear History
//                   </div>
//                 </>
//               ) : null}
//             </div>
//           )}
//         </div>

//         {/* Action icons — shrink-0 so they never get squeezed */}
//         <div className="flex items-center gap-2.5 shrink-0">

//           {/* Bell */}
//           <button className="relative text-white/70 hover:text-white">
//             <Bell className="h-[18px] w-[18px]" />
//             <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
//           </button>

//           {/* Avatar */}
//           <div className="relative">
//             <button
//               onClick={() => setOpenProfile(!openProfile)}
//               className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs"
//             >
//               {firstLetter}
//             </button>

//             {openProfile && (
//               <div className="absolute right-0 mt-2 w-40 rounded-lg border border-border bg-card shadow-lg z-50">
//                 <Link
//                   to="/profile"
//                   className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-muted"
//                   onClick={() => setOpenProfile(false)}
//                 >
//                   <User className="h-4 w-4" /> Profile
//                 </Link>
//                 <Link
//                   to="/settings"
//                   className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-muted"
//                   onClick={() => setOpenProfile(false)}
//                 >
//                   <Settings className="h-4 w-4" /> Settings
//                 </Link>
//                 <button
//                   onClick={logout}
//                   className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-muted"
//                 >
//                   <LogOut className="h-4 w-4" /> Logout
//                 </button>
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </header>
//   );
// };

// export default AppHeader;

import { Search, Bell, X, User, LogOut, Settings } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { resolveImageSrc, setImgFallback } from "@/utils/imageFallback";
import { buildProductImageUrl } from "@/utils/productImages";
import logoImg from "@/assets/logo.png";

const AppHeader = () => {
  const API_LINK = import.meta.env.VITE_API_LINK;
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const firstLetter =
    user?.name?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "U";

  const [searchTerm,   setSearchTerm]   = useState("");
  const [suggestions,  setSuggestions]  = useState([]);
  const [history,      setHistory]      = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openProfile,  setOpenProfile]  = useState(false);

  const searchRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (dropdownOpen) {
      const saved = JSON.parse(localStorage.getItem("searchHistory")) || [];
      setHistory(saved);
    }
  }, [dropdownOpen]);

  useEffect(() => {
    if (searchTerm.length < 2) { setSuggestions([]); return; }
    const timer = setTimeout(() => fetchSuggestions(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const fetchSuggestions = async (term) => {
    try {
      const res = await axios.get(`${API_LINK}/products/suggestions?q=${term}`);
      setSuggestions(res.data);
    } catch {
      setSuggestions([]);
    }
  };

  const saveHistory = (term) => {
    const existing = JSON.parse(localStorage.getItem("searchHistory")) || [];
    const updated = [term, ...existing.filter((i) => i !== term)].slice(0, 5);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
    setHistory(updated);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    saveHistory(searchTerm);
    navigate(`/search?q=${searchTerm}`);
    setDropdownOpen(false);
    setSuggestions([]);
  };

  const handleSuggestionClick = (item) => {
    item.type === "product"
      ? navigate(`/product/${item.id}`)
      : navigate(`/products?category=${item.id}`);
    setDropdownOpen(false);
    setSuggestions([]);
  };

  const handleHistoryClick = (term) => {
    setSearchTerm(term);
    navigate(`/search?q=${term}`);
    setDropdownOpen(false);
  };

  const showDropdown =
    dropdownOpen && (suggestions.length > 0 || (history.length > 0 && searchTerm.length === 0));

  return (
    /* ✅ WHITE header with bottom shadow — exactly like Glamzy */
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white shadow-sm">

      <div className="flex items-center gap-3 px-4 py-3">

        {/* Logo — Image */}
        <Link to="/" className="shrink-0">
          <img src={logoImg} alt="VK MOJO" className="h-12 w-auto object-contain" />
        </Link>

        {/* Search — ✅ Light gray rounded pill like Glamzy */}
        <div ref={searchRef} className="relative flex-1 min-w-0 max-w-2xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 rounded-full bg-gray-100 border border-gray-200 px-3 py-2"
          >
            <Search className="h-3.5 w-3.5 shrink-0 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 min-w-0 bg-transparent outline-none text-xs text-gray-700 placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setDropdownOpen(true); }}
              onFocus={() => setDropdownOpen(true)}
            />
            {searchTerm && (
              <button type="button" onClick={() => { setSearchTerm(""); setSuggestions([]); }}>
                <X className="h-3 w-3 text-gray-400" />
              </button>
            )}
          </form>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-100 shadow-lg rounded-lg overflow-hidden z-50">
              {suggestions.length > 0 ? (
                <>
                  {suggestions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSuggestionClick(item)}
                      className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-pink-50"
                    >
                      <img
                        src={
                          item.type === "category"
                            ? `https://xiadot.com/vkautoparts/uploads/Categories/${item.image_url}`
                            : buildProductImageUrl(item.images ?? item.image_url) ||
                              `https://xiadot.com/vkautoparts/uploads/${item.image_url}`
                        }
                        className="h-8 w-8 object-cover rounded shrink-0"
                        onError={(e) => setImgFallback(e, `${item.type}-${item.id}`, 80, 80)}
                      />
                      <div className="flex-1 text-sm text-gray-700 truncate">{item.name}</div>
                      <span className="text-xs text-gray-400 shrink-0">{item.type}</span>
                    </div>
                  ))}
                  <div
                    onClick={() => { saveHistory(searchTerm); navigate(`/search?q=${searchTerm}`); setDropdownOpen(false); }}
                    className="px-3 py-2.5 text-xs text-primary cursor-pointer hover:bg-pink-50 border-t border-gray-100"
                  >
                    View all results for "{searchTerm}"
                  </div>
                </>
              ) : history.length > 0 && searchTerm.length === 0 ? (
                <>
                  <div className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100">
                    Recent Searches
                  </div>
                  {history.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleHistoryClick(item)}
                      className="flex items-center gap-2 px-3 py-2.5 cursor-pointer hover:bg-pink-50 text-sm text-gray-700"
                    >
                      🕘 {item}
                    </div>
                  ))}
                  <div
                    onClick={() => { localStorage.removeItem("searchHistory"); setHistory([]); }}
                    className="text-xs text-red-400 px-3 py-2 cursor-pointer hover:bg-pink-50"
                  >
                    Clear History
                  </div>
                </>
              ) : null}
            </div>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-3 shrink-0">

          {user ? (
            /* Avatar — logged in user */
            <div className="relative">
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-xs shadow-sm"
              >
                {firstLetter}
              </button>

              {openProfile && (
                <div className="absolute right-0 mt-2 w-40 rounded-lg border border-gray-100 bg-white shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-pink-50"
                    onClick={() => setOpenProfile(false)}
                  >
                    <User className="h-4 w-4" /> Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-pink-50"
                    onClick={() => setOpenProfile(false)}
                  >
                    <Settings className="h-4 w-4" /> Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-pink-50"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Login button — not logged in */
            <Link
              to="/login"
              className="flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors"
            >
              <User className="h-3.5 w-3.5" />
              Login
            </Link>
          )}

        </div>
      </div>
    </header>
  );
};

export default AppHeader;
