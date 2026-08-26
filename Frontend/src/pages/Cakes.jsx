import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiFilter,
  FiShoppingCart,
  FiHeart,
  FiChevronRight,
  FiStar,
  FiPackage,
  FiRefreshCw,
  FiEye,
} from "react-icons/fi";
import Navbar from "../components/layout/Navbar";
import CakeFilter from "../components/cakes/CakeFilter";
import FilterDrawer from "../components/cakes/FilterDrawer";
import ActiveFilterChips from "../components/cakes/ActiveFilterChips";
import ProductDetailModal from "../components/cakes/ProductDetailModal";

const defaultCakesData = [
  // Birthday Cakes
  {
    id: 1,
    name: "Chocolate Truffle Birthday Cake",
    category: "Birthday Cakes",
    price: 4500,
    rating: 4.9,
    flavors: ["Chocolate"],
    sizes: ["1 kg", "2 kg"],
    dietary: ["Eggless"],
    occasions: ["Birthday", "Party"],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    description: "Rich dark chocolate sponge layered with smooth chocolate ganache and birthday piping.",
  },
  {
    id: 2,
    name: "Strawberry Buttercream Birthday Cake",
    category: "Birthday Cakes",
    price: 3800,
    rating: 5.0,
    flavors: ["Strawberry", "Vanilla"],
    sizes: ["1 kg", "1.5 kg"],
    dietary: ["Eggless", "Nut-Free"],
    occasions: ["Birthday", "Party"],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
    description: "Fluffy vanilla sponge infused with fresh strawberry compote, berries, and buttercream.",
  },
  {
    id: 3,
    name: "Golden Vanilla Sprinkle Birthday Cake",
    category: "Birthday Cakes",
    price: 3200,
    rating: 4.8,
    flavors: ["Vanilla"],
    sizes: ["1 kg", "1.5 kg", "2 kg"],
    dietary: ["Nut-Free"],
    occasions: ["Birthday", "Party"],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    description: "Traditional celebration cake with festive rainbow sprinkles and golden vanilla sponge.",
  },
  {
    id: 4,
    name: "Mocha Espresso Birthday Velvet Cake",
    category: "Birthday Cakes",
    price: 4900,
    rating: 4.9,
    flavors: ["Coffee", "Chocolate"],
    sizes: ["1 kg", "1.5 kg"],
    dietary: ["Eggless", "Vegan"],
    occasions: ["Birthday", "Party"],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80",
    description: "Espresso-infused sponge layered with dark Belgian chocolate cream and cocoa dusting.",
  },
  {
    id: 5,
    name: "Butterscotch Crunch Birthday Cake",
    category: "Birthday Cakes",
    price: 4200,
    rating: 4.7,
    flavors: ["Butterscotch", "Vanilla"],
    sizes: ["1 kg", "2 kg"],
    dietary: ["Eggless"],
    occasions: ["Birthday", "Party"],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    description: "Praline crunch layers infused with rich butterscotch caramel sauce.",
  },
  {
    id: 6,
    name: "Red Velvet Heart Birthday Cake",
    category: "Birthday Cakes",
    price: 4600,
    rating: 4.9,
    flavors: ["Red Velvet", "Vanilla"],
    sizes: ["1 kg", "1.5 kg"],
    dietary: ["Eggless"],
    occasions: ["Birthday", "Party"],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80",
    description: "Classic crimson sponge layered with silky smooth cream cheese frosting.",
  },

  // Wedding Cakes
  {
    id: 7,
    name: "Royal Multi-Tier Wedding Cake",
    category: "Wedding Cakes",
    price: 14500,
    rating: 4.9,
    flavors: ["Vanilla", "Butterscotch"],
    sizes: ["2.5 kg", "3 kg+"],
    dietary: ["Eggless", "Nut-Free"],
    occasions: ["Wedding", "Engagement"],
    availability: "Pre-Order",
    image:
      "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80",
    description: "Grand three-tiered floral cake designed exclusively for romantic weddings.",
  },
  {
    id: 8,
    name: "Pearl Ivory Tiered Wedding Cake",
    category: "Wedding Cakes",
    price: 12000,
    rating: 5.0,
    flavors: ["Vanilla", "Strawberry"],
    sizes: ["2 kg", "3 kg+"],
    dietary: ["Eggless"],
    occasions: ["Wedding", "Engagement"],
    availability: "Pre-Order",
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80",
    description: "Minimalist elegant white fondant wedding cake with delicate edible pearls.",
  },

  // Anniversary Cakes
  {
    id: 9,
    name: "Rose Macaron Anniversary Cake",
    category: "Anniversary Cakes",
    price: 7200,
    rating: 4.8,
    flavors: ["Red Velvet", "Vanilla"],
    sizes: ["1.5 kg", "2 kg"],
    dietary: ["Eggless"],
    occasions: ["Anniversary", "Engagement"],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=800&q=80",
    description: "Soft pink buttercream cake decorated with French macarons and edible flowers.",
  },
  {
    id: 10,
    name: "Golden Drip Celebration Anniversary Cake",
    category: "Anniversary Cakes",
    price: 6800,
    rating: 4.9,
    flavors: ["Chocolate", "Coffee"],
    sizes: ["1.5 kg", "2 kg"],
    dietary: ["Eggless"],
    occasions: ["Anniversary", "Party"],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&w=800&q=80",
    description: "Two-tiered romantic celebration cake with golden caramel drip and luxury chocolates.",
  },

  // Custom Cakes
  {
    id: 11,
    name: "Artisan Custom Sculpted Cake",
    category: "Custom Cakes",
    price: 9500,
    rating: 5.0,
    flavors: ["Chocolate", "Coffee"],
    sizes: ["2 kg", "3 kg+"],
    dietary: ["Gluten-Free"],
    occasions: ["Birthday", "Graduation", "Baby Shower"],
    availability: "Custom Order Available",
    image:
      "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80",
    description: "Handcrafted customized design shaped to match your exact celebration theme.",
  },
  {
    id: 12,
    name: "Floral Baby Shower Tier Cake",
    category: "Custom Cakes",
    price: 8900,
    rating: 5.0,
    flavors: ["Strawberry", "Vanilla"],
    sizes: ["2 kg", "2.5 kg"],
    dietary: ["Nut-Free"],
    occasions: ["Baby Shower"],
    availability: "Pre-Order",
    image:
      "https://images.unsplash.com/photo-1559628233-100c798642d4?auto=format&fit=crop&w=800&q=80",
    description: "Delicate pastel tiered celebration cake with handcrafted baby shower toppers.",
  },

  // Kids Cakes
  {
    id: 13,
    name: "Rainbow Whimsical Kids Cake",
    category: "Kids Cakes",
    price: 5200,
    rating: 4.7,
    flavors: ["Vanilla", "Fruit"],
    sizes: ["1.5 kg", "2 kg"],
    dietary: ["Nut-Free"],
    occasions: ["Birthday", "Party"],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
    description: "Colorful and cheerful rainbow celebration cake with fun party sprinkles.",
  },

  // Cupcakes
  {
    id: 14,
    name: "Assorted Gourmet Cupcake Box (6 Pcs)",
    category: "Cupcakes",
    price: 2800,
    rating: 4.9,
    flavors: ["Red Velvet", "Vanilla", "Chocolate"],
    sizes: ["0.5 kg"],
    dietary: ["Eggless"],
    occasions: ["Party", "Baby Shower"],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80",
    description: "A luxurious selection of moist cupcakes with velvety piped frostings.",
  },

  // Cheesecakes
  {
    id: 15,
    name: "Blueberry Artisan Cheesecake",
    category: "Cheesecakes",
    price: 6200,
    rating: 4.8,
    flavors: ["Fruit", "Vanilla"],
    sizes: ["1 kg", "1.5 kg"],
    dietary: ["Gluten-Free"],
    occasions: ["Anniversary", "Party"],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
    description: "Baked New York style rich cheesecake topped with wild blueberry glaze.",
  },

  // Bakery Items
  {
    id: 16,
    name: "Artisan Butter Croissant & Danish Box",
    category: "Bakery Items",
    price: 2600,
    rating: 4.9,
    flavors: ["Butterscotch", "Vanilla"],
    sizes: ["0.5 kg"],
    dietary: ["Vegetarian"],
    occasions: ["Party"],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    description: "Freshly baked flaky French butter croissants, pains au chocolat, and fruit danishes.",
  },
  {
    id: 17,
    name: "Fresh Sourdough & Crusty Bread Basket",
    category: "Bakery Items",
    price: 1800,
    rating: 4.8,
    flavors: ["Vanilla"],
    sizes: ["1 kg"],
    dietary: ["Vegan", "Nut-Free"],
    occasions: ["Party"],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    description: "Warm artisan rustic sourdough loaves and soft dinner bread rolls.",
  },

  // Party Desserts
  {
    id: 18,
    name: "Party Treats & French Macaron Box",
    category: "Party Desserts",
    price: 3400,
    rating: 4.9,
    flavors: ["Fruit", "Chocolate", "Vanilla"],
    sizes: ["0.5 kg"],
    dietary: ["Gluten-Free"],
    occasions: ["Party", "Graduation", "Engagement"],
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
    description: "Crisp Parisian macarons and festive sweet party cups for dessert tables.",
  },
];

const DEFAULT_MAX_PRICE = 15000;

export default function Cakes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get("category");

  // State for all filters
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategories, setSelectedCategories] = useState(
    urlCategory ? [urlCategory] : ["All"]
  );
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);

  // Selected product for popup modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Mobile Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Synchronize when URL search param changes
  useEffect(() => {
    if (urlCategory) {
      setSelectedCategories([urlCategory]);
    }
  }, [urlCategory]);

  // Multi-Category Toggle Handler
  const handleToggleCategory = (category) => {
    if (category === "All" || category === "All Cakes") {
      setSelectedCategories(["All"]);
      setSearchParams({});
      return;
    }

    setSelectedCategories((prev) => {
      const cleanPrev = prev.filter((c) => c !== "All" && c !== "All Cakes");
      if (cleanPrev.includes(category)) {
        const remaining = cleanPrev.filter((c) => c !== category);
        const nextState = remaining.length === 0 ? ["All"] : remaining;
        if (nextState.length === 1 && nextState[0] !== "All") {
          setSearchParams({ category: nextState[0] });
        } else {
          setSearchParams({});
        }
        return nextState;
      } else {
        const nextState = [...cleanPrev, category];
        if (nextState.length === 1) {
          setSearchParams({ category: nextState[0] });
        } else {
          setSearchParams({});
        }
        return nextState;
      }
    });
  };

  const handleRemoveCategory = (category) => {
    setSelectedCategories((prev) => {
      const remaining = prev.filter((c) => c !== category && c !== "All");
      const nextState = remaining.length === 0 ? ["All"] : remaining;
      if (nextState.length === 1 && nextState[0] !== "All") {
        setSearchParams({ category: nextState[0] });
      } else {
        setSearchParams({});
      }
      return nextState;
    });
  };

  // Toggle Handlers
  const handleToggleFlavor = (flavor) => {
    setSelectedFlavors((prev) =>
      prev.includes(flavor) ? prev.filter((f) => f !== flavor) : [...prev, flavor]
    );
  };

  const handleToggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleToggleDietary = (diet) => {
    setSelectedDietary((prev) =>
      prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
    );
  };

  const handleToggleOccasion = (occ) => {
    setSelectedOccasions((prev) =>
      prev.includes(occ) ? prev.filter((o) => o !== occ) : [...prev, occ]
    );
  };

  const handleToggleAvailability = (avail) => {
    setSelectedAvailability((prev) =>
      prev.includes(avail) ? prev.filter((a) => a !== avail) : [...prev, avail]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories(["All"]);
    setMaxPrice(DEFAULT_MAX_PRICE);
    setSelectedFlavors([]);
    setSelectedSizes([]);
    setSelectedDietary([]);
    setSelectedOccasions([]);
    setSelectedAvailability([]);
    setSelectedRating(0);
    setSearchQuery("");
    setSearchParams({});
  };

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    const catCount = selectedCategories.filter((c) => c !== "All").length;
    count += catCount;
    if (maxPrice < DEFAULT_MAX_PRICE) count++;
    count += selectedFlavors.length;
    count += selectedSizes.length;
    count += selectedDietary.length;
    count += selectedOccasions.length;
    count += selectedAvailability.length;
    if (selectedRating > 0) count++;
    return count;
  }, [
    selectedCategories,
    maxPrice,
    selectedFlavors,
    selectedSizes,
    selectedDietary,
    selectedOccasions,
    selectedAvailability,
    selectedRating,
  ]);

  // Filter & Sort cakes
  const filteredCakes = useMemo(() => {
    const isAllCategories =
      selectedCategories.length === 0 || selectedCategories.includes("All");

    return defaultCakesData
      .filter((cake) => {
        // Search Query
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          const matchesName = cake.name.toLowerCase().includes(q);
          const matchesDesc = cake.description.toLowerCase().includes(q);
          const matchesCat = cake.category.toLowerCase().includes(q);
          if (!matchesName && !matchesDesc && !matchesCat) return false;
        }

        // Category (Match any selected)
        if (!isAllCategories && !selectedCategories.includes(cake.category)) {
          return false;
        }

        // Price Range
        if (cake.price > maxPrice) {
          return false;
        }

        // Flavors (Match any selected)
        if (
          selectedFlavors.length > 0 &&
          !cake.flavors.some((f) => selectedFlavors.includes(f))
        ) {
          return false;
        }

        // Sizes (Match any selected)
        if (
          selectedSizes.length > 0 &&
          !cake.sizes.some((s) => selectedSizes.includes(s))
        ) {
          return false;
        }

        // Dietary (Match all selected)
        if (
          selectedDietary.length > 0 &&
          !selectedDietary.every((d) => cake.dietary.includes(d))
        ) {
          return false;
        }

        // Occasions (Match any selected)
        if (
          selectedOccasions.length > 0 &&
          !cake.occasions.some((o) => selectedOccasions.includes(o))
        ) {
          return false;
        }

        // Availability
        if (
          selectedAvailability.length > 0 &&
          !selectedAvailability.includes(cake.availability)
        ) {
          return false;
        }

        // Rating
        if (selectedRating > 0 && cake.rating < selectedRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return a.id - b.id; // Featured default
      });
  }, [
    searchQuery,
    sortBy,
    selectedCategories,
    maxPrice,
    selectedFlavors,
    selectedSizes,
    selectedDietary,
    selectedOccasions,
    selectedAvailability,
    selectedRating,
  ]);

  // Determine current active category title for header
  const activeSingleCategory =
    selectedCategories.length === 1 && selectedCategories[0] !== "All"
      ? selectedCategories[0]
      : null;

  return (
    <div className="min-h-screen bg-[#FDF4D2]/20 flex flex-col">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#FDF4D2] py-14 border-b border-[#946D6D]/15">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            key={activeSingleCategory || "all"}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-[#946D6D]"
          >
            {activeSingleCategory
              ? activeSingleCategory
              : "Our Cakes & Bakery"}
          </motion.h1>
          <p className="mt-3 text-lg text-gray-600 max-w-xl mx-auto">
            {activeSingleCategory
              ? `Explore our handcrafted ${activeSingleCategory}, freshly baked with premium ingredients for your special celebrations`
              : "Find the perfect handcrafted cake or fresh bakery treat for every sweet occasion"}
          </p>

          {/* Breadcrumb */}
          <nav className="flex justify-center items-center gap-2 mt-4 text-xs font-medium text-gray-500">
            <Link to="/" className="hover:text-[#946D6D] transition">
              Home
            </Link>
            <FiChevronRight className="w-3 h-3 text-gray-400" />
            <Link to="/categories" className="hover:text-[#946D6D] transition">
              Categories
            </Link>
            {activeSingleCategory && (
              <>
                <FiChevronRight className="w-3 h-3 text-gray-400" />
                <span className="text-[#946D6D] font-bold">
                  {activeSingleCategory}
                </span>
              </>
            )}
          </nav>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-10 w-full flex-1">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Permanent Desktop Sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0 sticky top-24">
            <CakeFilter
              selectedCategories={selectedCategories}
              onToggleCategory={handleToggleCategory}
              maxPrice={maxPrice}
              onChangeMaxPrice={setMaxPrice}
              defaultMaxPrice={DEFAULT_MAX_PRICE}
              selectedFlavors={selectedFlavors}
              onToggleFlavor={handleToggleFlavor}
              selectedSizes={selectedSizes}
              onToggleSize={handleToggleSize}
              selectedDietary={selectedDietary}
              onToggleDietary={handleToggleDietary}
              selectedOccasions={selectedOccasions}
              onToggleOccasion={handleToggleOccasion}
              selectedAvailability={selectedAvailability}
              onToggleAvailability={handleToggleAvailability}
              selectedRating={selectedRating}
              onSelectRating={setSelectedRating}
              onClearFilters={handleClearFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>

          {/* Product Section Area */}
          <div className="flex-1 w-full space-y-5">
            {/* Top Toolbar: Search + Mobile Filter Button + Sort */}
            <div className="bg-white rounded-2xl border border-[#946D6D]/15 p-4 shadow-xs flex flex-col sm:flex-row gap-4 justify-between items-center">
              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={
                    activeSingleCategory
                      ? `Search in ${activeSingleCategory}...`
                      : "Search cakes & desserts..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FDF4D2]/40 rounded-xl text-sm text-[#946D6D] border border-[#946D6D]/15 focus:outline-none focus:border-[#946D6D] transition placeholder-gray-400"
                />
              </div>

              {/* Controls: Mobile Filter Toggle + Sorting */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {/* Mobile Filter Button */}
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FDF4D2] text-[#946D6D] border border-[#946D6D]/25 font-semibold text-sm shadow-xs hover:bg-[#B0CDE6]/40 transition"
                >
                  <FiFilter className="w-4 h-4" />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="bg-[#946D6D] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500 hidden md:inline">
                    Sort by:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 bg-[#FDF4D2]/40 border border-[#946D6D]/20 rounded-xl text-xs font-semibold text-[#946D6D] focus:outline-none focus:border-[#946D6D] cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Count & Active Filter Chips */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-500 px-1">
                <span>
                  Showing{" "}
                  <strong className="text-[#946D6D] font-bold">
                    {filteredCakes.length}
                  </strong>{" "}
                  {filteredCakes.length === 1 ? "product" : "products"}
                  {activeSingleCategory ? ` in ${activeSingleCategory}` : ""}
                </span>
              </div>

              <ActiveFilterChips
                selectedCategories={selectedCategories}
                maxPrice={maxPrice}
                defaultMaxPrice={DEFAULT_MAX_PRICE}
                selectedFlavors={selectedFlavors}
                selectedSizes={selectedSizes}
                selectedDietary={selectedDietary}
                selectedOccasions={selectedOccasions}
                selectedAvailability={selectedAvailability}
                selectedRating={selectedRating}
                onRemoveCategory={handleRemoveCategory}
                onResetMaxPrice={() => setMaxPrice(DEFAULT_MAX_PRICE)}
                onRemoveFlavor={handleToggleFlavor}
                onRemoveSize={handleToggleSize}
                onRemoveDietary={handleToggleDietary}
                onRemoveOccasion={handleToggleOccasion}
                onRemoveAvailability={handleToggleAvailability}
                onResetRating={() => setSelectedRating(0)}
                onClearAll={handleClearFilters}
              />
            </div>

            {/* Cakes Product Grid with strictly uniform card dimensions & popup triggers */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch"
            >
              <AnimatePresence>
                {filteredCakes.map((cake) => (
                  <motion.div
                    key={cake.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="h-full flex flex-col w-full bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#946D6D]/15 justify-between group cursor-pointer"
                    onClick={() => setSelectedProduct(cake)}
                  >
                    {/* Cake Image Container - Fixed height */}
                    <div className="relative w-full h-52 overflow-hidden bg-[#FDF4D2]/40">
                      <img
                        src={cake.image}
                        alt={cake.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition duration-500"
                      />

                      {/* Quick View Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                        <span className="bg-white/95 text-[#946D6D] px-4 py-2 rounded-full font-bold text-xs shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition duration-300">
                          <FiEye className="w-3.5 h-3.5" />
                          View Details
                        </span>
                      </div>

                      {/* Favorite Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="absolute right-3.5 top-3.5 bg-white/90 backdrop-blur-xs p-2.5 rounded-full shadow-md text-[#946D6D] hover:text-[#A290B7] hover:bg-white transition z-10"
                      >
                        <FiHeart className="w-4 h-4" />
                      </button>

                      {/* Category Tag */}
                      <span className="absolute left-3.5 top-3.5 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-bold text-[#946D6D] shadow-xs z-10">
                        {cake.category}
                      </span>

                      {/* Availability Tag */}
                      {cake.availability !== "In Stock" && (
                        <span className="absolute left-3.5 bottom-3.5 bg-[#946D6D]/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-xs flex items-center gap-1 z-10">
                          <FiPackage className="w-3 h-3" />
                          {cake.availability}
                        </span>
                      )}
                    </div>

                    {/* Cake Info Container - Uniform Heights across rows */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        {/* Rating & Flavors */}
                        <div className="flex items-center justify-between h-6">
                          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                            <FiStar className="fill-current w-3.5 h-3.5" />
                            <span>{cake.rating}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            {cake.flavors.slice(0, 2).map((f) => (
                              <span
                                key={f}
                                className="px-2 py-0.5 rounded-md bg-[#FDF4D2] text-[#946D6D] text-[10px] font-semibold"
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Name - Fixed 1-line height */}
                        <h3 className="font-bold text-[#946D6D] text-base group-hover:text-[#A290B7] transition leading-snug line-clamp-1 h-6">
                          {cake.name}
                        </h3>

                        {/* Description - Fixed 2-line height */}
                        <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed h-8">
                          {cake.description}
                        </p>

                        {/* Dietary Pills - Fixed slot height */}
                        <div className="flex flex-wrap gap-1 h-6 items-center overflow-hidden">
                          {cake.dietary.map((d) => (
                            <span
                              key={d}
                              className="px-2 py-0.5 rounded-full bg-[#B0CDE6]/30 text-[#946D6D] text-[10px] font-medium"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Price & Action - Bottom aligned */}
                      <div className="pt-3 border-t border-[#946D6D]/10 flex items-center justify-between mt-auto">
                        <div>
                          <span className="text-[10px] text-gray-400 block font-medium">
                            Starting from
                          </span>
                          <span className="text-xl font-bold text-[#946D6D]">
                            Rs. {cake.price.toLocaleString()}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(cake);
                          }}
                          className="bg-[#946D6D] hover:bg-[#7e5b5b] text-white px-3.5 py-2 rounded-full shadow-md transition transform active:scale-95 flex items-center gap-1.5 text-xs font-bold"
                        >
                          <FiShoppingCart className="w-3.5 h-3.5" />
                          <span>Order</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredCakes.length === 0 && (
              <div className="bg-white rounded-3xl border border-[#946D6D]/15 p-12 text-center space-y-4 my-6">
                <div className="w-16 h-16 rounded-full bg-[#FDF4D2] text-[#946D6D] flex items-center justify-center mx-auto text-2xl">
                  🎂
                </div>
                <h3 className="text-xl font-bold text-[#946D6D]">
                  No products found
                </h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  There are no products currently matching all selected filters in this category. Try adjusting your filters or price range.
                </p>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="px-6 py-2.5 rounded-full bg-[#946D6D] text-white font-semibold text-sm hover:bg-[#7e5b5b] shadow-md transition inline-flex items-center gap-2"
                >
                  <FiRefreshCw className="w-4 h-4" />
                  Show All Cakes
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Product Details Popup Modal */}
      <ProductDetailModal
        isOpen={Boolean(selectedProduct)}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Mobile Slide-Out Filter Drawer */}
      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
        maxPrice={maxPrice}
        onChangeMaxPrice={setMaxPrice}
        defaultMaxPrice={DEFAULT_MAX_PRICE}
        selectedFlavors={selectedFlavors}
        onToggleFlavor={handleToggleFlavor}
        selectedSizes={selectedSizes}
        onToggleSize={handleToggleSize}
        selectedDietary={selectedDietary}
        onToggleDietary={handleToggleDietary}
        selectedOccasions={selectedOccasions}
        onToggleOccasion={handleToggleOccasion}
        selectedAvailability={selectedAvailability}
        onToggleAvailability={handleToggleAvailability}
        selectedRating={selectedRating}
        onSelectRating={setSelectedRating}
        onClearFilters={handleClearFilters}
        activeFilterCount={activeFilterCount}
        matchedCakeCount={filteredCakes.length}
      />
    </div>
  );
}
