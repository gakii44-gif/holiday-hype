import React, { useState, useMemo } from "react";
import { HolidayPackage, Destination, SearchFilterState } from "../lib/types";
import { PackageCard } from "../components/PackageCard";
import { 
  Filter, 
  Search, 
  X, 
  SlidersHorizontal, 
  Compass, 
  MapPin, 
  Clock, 
  DollarSign, 
  Sparkles,
  ArrowUpDown
} from "lucide-react";

interface ToursPageProps {
  packages: HolidayPackage[];
  destinations: Destination[];
  initialFilters?: Partial<SearchFilterState>;
  onSelectPackage: (pkg: HolidayPackage) => void;
  onBookPackage: (pkg: HolidayPackage) => void;
  onOpenPlanTrip: () => void;
}

export const ToursPage: React.FC<ToursPageProps> = ({
  packages,
  destinations,
  initialFilters,
  onSelectPackage,
  onBookPackage,
  onOpenPlanTrip,
}) => {
  const [selectedDestination, setSelectedDestination] = useState<string>(initialFilters?.destination || "all");
  const [selectedStyle, setSelectedStyle] = useState<string>(initialFilters?.travelStyle || "all");
  const [selectedDuration, setSelectedDuration] = useState<string>(initialFilters?.duration || "all");
  const [maxPrice, setMaxPrice] = useState<number>(initialFilters?.priceMax || 8000);
  const [searchQuery, setSearchQuery] = useState<string>(initialFilters?.query || "");
  const [sortBy, setSortBy] = useState<string>(initialFilters?.sortBy || "popular");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtered and Sorted Packages
  const filteredPackages = useMemo(() => {
    return packages
      .filter((pkg) => {
        // Destination filter
        if (selectedDestination !== "all") {
          const matchDest = 
            pkg.destinationId.toLowerCase() === selectedDestination.toLowerCase() ||
            pkg.country.toLowerCase() === selectedDestination.toLowerCase() ||
            pkg.destinationName.toLowerCase().includes(selectedDestination.toLowerCase());
          if (!matchDest) return false;
        }

        // Travel Style
        if (selectedStyle !== "all" && pkg.travelStyle !== selectedStyle) {
          return false;
        }

        // Duration filter
        if (selectedDuration !== "all") {
          if (selectedDuration === "1-3 days" && (pkg.durationDays < 1 || pkg.durationDays > 3)) return false;
          if (selectedDuration === "4-7 days" && (pkg.durationDays < 4 || pkg.durationDays > 7)) return false;
          if (selectedDuration === "8-14 days" && (pkg.durationDays < 8 || pkg.durationDays > 14)) return false;
          if (selectedDuration === "15+ days" && pkg.durationDays < 15) return false;
        }

        // Price filter
        if (pkg.pricePerPersonUsd > maxPrice) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            pkg.title.toLowerCase().includes(q) ||
            pkg.destinationName.toLowerCase().includes(q) ||
            pkg.country.toLowerCase().includes(q) ||
            pkg.overview.toLowerCase().includes(q) ||
            pkg.highlights.some((h) => h.toLowerCase().includes(q));
          if (!match) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_low") return a.pricePerPersonUsd - b.pricePerPersonUsd;
        if (sortBy === "price_high") return b.pricePerPersonUsd - a.pricePerPersonUsd;
        if (sortBy === "duration_asc") return a.durationDays - b.durationDays;
        if (sortBy === "duration_desc") return b.durationDays - a.durationDays;
        if (sortBy === "rating") return b.rating - a.rating;
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      });
  }, [packages, selectedDestination, selectedStyle, selectedDuration, maxPrice, searchQuery, sortBy]);

  const hasActiveFilters = 
    selectedDestination !== "all" || 
    selectedStyle !== "all" || 
    selectedDuration !== "all" || 
    maxPrice < 8000 || 
    searchQuery.trim() !== "";

  const clearAllFilters = () => {
    setSelectedDestination("all");
    setSelectedStyle("all");
    setSelectedDuration("all");
    setMaxPrice(8000);
    setSearchQuery("");
    setSortBy("popular");
  };

  const travelStyles = [
    "all",
    "Wildlife Safari",
    "Luxury Safari",
    "Bush & Beach Combo",
    "Gorilla Trekking",
    "Beach & Coastal",
    "Honeymoon & Romance"
  ];

  const durationOptions = [
    { value: "all", label: "All Durations" },
    { value: "1-3 days", label: "1–3 Days (Short Escape)" },
    { value: "4-7 days", label: "4–7 Days (Classic Safari)" },
    { value: "8-14 days", label: "8–14 Days (Grand Safari)" },
    { value: "15+ days", label: "15+ Days (Extended Safari)" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="bg-[#122544] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7A93B]/20 text-[#E7A93B] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Curated African Expeditions
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Tours & Safaris Finder
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Filter through our complete catalog of guaranteed Big 5 safaris, private fly-in expeditions, and coastal getaways.
          </p>
        </div>
      </div>

      {/* Top Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by park, animal (e.g. Lions), or style..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2.5 rounded-xl bg-stone-100 border border-stone-200 text-xs font-semibold text-[#122544] flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters {hasActiveFilters && "(Active)"}</span>
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-500 whitespace-nowrap hidden sm:inline">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-[#122544] focus:outline-none focus:border-[#122544]"
            >
              <option value="popular">Most Popular</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="duration_asc">Duration: Short to Long</option>
              <option value="duration_desc">Duration: Long to Short</option>
              <option value="rating">Top Rated (4.9+)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block space-y-6 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <h3 className="font-serif text-base font-bold text-[#122544] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#D2573F]" />
              <span>Filter Safaris</span>
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-[#D2573F] hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Destination Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
              Destination
            </label>
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
            >
              <option value="all">All Destinations</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.slug}>{d.name} ({d.country})</option>
              ))}
            </select>
          </div>

          {/* Travel Style Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
              Travel Style
            </label>
            <div className="space-y-1">
              {travelStyles.map((style) => (
                <label
                  key={style}
                  className="flex items-center gap-2 text-xs text-stone-700 hover:text-[#122544] cursor-pointer py-0.5"
                >
                  <input
                    type="radio"
                    name="travelStyle"
                    value={style}
                    checked={selectedStyle === style}
                    onChange={() => setSelectedStyle(style)}
                    className="text-[#122544] focus:ring-[#122544]"
                  />
                  <span>{style === "all" ? "All Styles" : style}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Duration Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
              Duration
            </label>
            <div className="space-y-1">
              {durationOptions.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 text-xs text-stone-700 hover:text-[#122544] cursor-pointer py-0.5"
                >
                  <input
                    type="radio"
                    name="duration"
                    value={opt.value}
                    checked={selectedDuration === opt.value}
                    onChange={() => setSelectedDuration(opt.value)}
                    className="text-[#122544] focus:ring-[#122544]"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Max Price Range */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-[#122544] uppercase tracking-wider">
                Max Budget / Person
              </label>
              <span className="font-bold text-[#122544]">${maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={8000}
              step={250}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#E7A93B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400">
              <span>$1,000</span>
              <span>$8,000+</span>
            </div>
          </div>

          {/* Plan Custom Trip CTA in Sidebar */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 text-center space-y-2">
            <p className="text-xs font-bold text-[#122544]">Need a Tailor-Made Itinerary?</p>
            <p className="text-[11px] text-stone-600">Tell us your exact dates and wishlist.</p>
            <button
              onClick={onOpenPlanTrip}
              className="w-full py-2 rounded-lg bg-[#E7A93B] text-[#122544] font-bold text-xs shadow-sm hover:bg-[#d89b30]"
            >
              Custom Trip Planner
            </button>
          </div>
        </div>

        {/* Packages Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active Filter Pills Bar */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-stone-600">
              Showing <span className="text-[#122544] font-extrabold">{filteredPackages.length}</span> Safari Packages
            </p>

            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                {selectedDestination !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-200 text-[#122544] text-[11px] font-medium">
                    Dest: {selectedDestination}
                    <button onClick={() => setSelectedDestination("all")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedStyle !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-200 text-[#122544] text-[11px] font-medium">
                    Style: {selectedStyle}
                    <button onClick={() => setSelectedStyle("all")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedDuration !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-200 text-[#122544] text-[11px] font-medium">
                    Duration: {selectedDuration}
                    <button onClick={() => setSelectedDuration("all")}><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Results Grid */}
          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  onSelect={onSelectPackage}
                  onBookNow={onBookPackage}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-white border border-stone-200 text-center space-y-4">
              <Compass className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#122544]">
                No Packages Match Your Exact Criteria
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Try widening your price range or clearing style filters. Alternatively, our safari architects can design this exact trip custom.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 rounded-xl bg-stone-100 text-[#122544] font-semibold text-xs"
                >
                  Clear Filters
                </button>
                <button
                  onClick={onOpenPlanTrip}
                  className="px-5 py-2 rounded-xl bg-[#E7A93B] text-[#122544] font-bold text-xs"
                >
                  Design Custom Itinerary
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B182B]/70 backdrop-blur-sm flex justify-end lg:hidden">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="font-serif text-lg font-bold text-[#122544]">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-stone-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Destination */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#122544]">Destination</label>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full p-2 text-xs border rounded-lg"
                >
                  <option value="all">All Destinations</option>
                  {destinations.map((d) => (
                    <option key={d.id} value={d.slug}>{d.name}</option>
                  ))}
                </select>
              </div>

              {/* Travel Style */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#122544]">Travel Style</label>
                <div className="space-y-1">
                  {travelStyles.map((s) => (
                    <label key={s} className="flex items-center gap-2 text-xs">
                      <input
                        type="radio"
                        name="mobStyle"
                        checked={selectedStyle === s}
                        onChange={() => setSelectedStyle(s)}
                      />
                      <span>{s === "all" ? "All Styles" : s}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#122544]">Duration</label>
                <div className="space-y-1">
                  {durationOptions.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 text-xs">
                      <input
                        type="radio"
                        name="mobDur"
                        checked={selectedDuration === opt.value}
                        onChange={() => setSelectedDuration(opt.value)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#122544] text-white font-bold text-xs rounded-xl"
              >
                Apply Filters ({filteredPackages.length} Results)
              </button>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    clearAllFilters();
                    setMobileFilterOpen(false);
                  }}
                  className="w-full py-2 text-xs font-semibold text-[#D2573F]"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
