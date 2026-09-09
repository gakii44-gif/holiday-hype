import React, { useState, useEffect } from "react";
import { Destination } from "../lib/types";
import { destinationsRepository } from "../lib/repositories";
import { DestinationCard } from "../components/DestinationCard";
import { 
  MapPin, 
  Search, 
  Sparkles, 
  Compass, 
  RotateCcw, 
  ArrowRight,
  Sun,
  ShieldCheck,
  Globe2,
  Calendar
} from "lucide-react";

interface DestinationsPageProps {
  destinations?: Destination[];
  onSelectDestination: (dest: Destination) => void;
  onOpenPlanTrip: () => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({
  destinations: propsDestinations,
  onSelectDestination,
  onOpenPlanTrip
}) => {
  const [destinations, setDestinations] = useState<Destination[]>(propsDestinations || []);
  const [isLoading, setIsLoading] = useState<boolean>(!propsDestinations || propsDestinations.length === 0);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch destinations using repository pattern if not supplied via props
  useEffect(() => {
    if (propsDestinations && propsDestinations.length > 0) {
      setDestinations(propsDestinations);
      setIsLoading(false);
      return;
    }

    async function loadDestinations() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await destinationsRepository.getAll();
        setDestinations(data);
      } catch (err) {
        console.error("Failed to load destinations:", err);
        setError("Unable to load destinations. Please check your connection and try again.");
      } finally {
        setIsLoading(false);
      }
    }

    loadDestinations();
  }, [propsDestinations]);

  // Available regions with dynamic counts
  const regions = [
    { id: "all", label: "All Regions" },
    { id: "East Africa", label: "East Africa" },
    { id: "Southern Africa", label: "Southern Africa" },
    { id: "Indian Ocean", label: "Indian Ocean Islands" }
  ];

  const getRegionCount = (regionId: string) => {
    if (regionId === "all") return destinations.length;
    return destinations.filter(d => d.region.toLowerCase().includes(regionId.toLowerCase())).length;
  };

  // Filtered destination list based on region and search query
  const filteredDestinations = destinations.filter((dest) => {
    const matchesRegion =
      selectedRegion === "all" ||
      dest.region.toLowerCase().includes(selectedRegion.toLowerCase());

    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesRegion;

    const matchesSearch =
      dest.name.toLowerCase().includes(q) ||
      dest.country.toLowerCase().includes(q) ||
      dest.tagline.toLowerCase().includes(q) ||
      (dest.overview && dest.overview.toLowerCase().includes(q)) ||
      (dest.topAttractions && dest.topAttractions.some((a) => a.toLowerCase().includes(q))) ||
      (dest.keyWildlife && dest.keyWildlife.some((w) => w.toLowerCase().includes(q)));

    return matchesRegion && matchesSearch;
  });

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 1. Header Hero Banner */}
      <div className="relative bg-[#122544] text-white rounded-lg p-8 sm:p-12 overflow-hidden border border-[#1F3860] shadow-md">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#E7A93B]/20 text-[#E7A93B] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Curated African Safari & Island Escapes
          </div>
          
          <h1 className="font-serif text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Iconic African Destinations
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            From the legendary plains of the Maasai Mara and Serengeti to the mist-clad gorilla sanctuaries of Bwindi and the turquoise lagoons of Zanzibar. Explore our handpicked African regions.
          </p>

          {/* Quick Metrics */}
          <div className="pt-3 flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#E7A93B]" />
              <span className="font-bold text-white">{destinations.length}</span> Handcrafted Regions
            </div>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-[#E7A93B]" />
              <span>Year-Round Private & Group Departures</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E7A93B]" />
              <span>100% Customized By Local Safari Guides</span>
            </div>
          </div>
        </div>

        {/* Subtle decorative background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#1F3860]/40 to-transparent pointer-events-none" />
      </div>

      {/* 2. Filter & Search Controls Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-lg border border-[#122544]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Region Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {regions.map((reg) => {
            const count = getRegionCount(reg.id);
            const isSelected = selectedRegion === reg.id;
            return (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3.5 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-[#122544] text-white shadow-sm"
                    : "bg-[#FAF8F5] text-stone-700 hover:bg-stone-200 border border-stone-200/70"
                }`}
              >
                <span>{reg.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isSelected ? "bg-[#E7A93B] text-[#122544]" : "bg-stone-200 text-stone-700"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72 flex-shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search country, park, wildlife..."
            className="w-full pl-9 pr-8 py-2.5 bg-[#FAF8F5] rounded-sm border border-[#122544]/15 text-xs text-[#122544] focus:outline-none focus:border-[#122544] focus:bg-white placeholder:text-stone-400 font-medium"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700 text-xs font-bold p-0.5"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 3. Loading Skeleton State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div
              key={n}
              className="bg-white rounded-lg border border-[#122544]/10 h-[380px] p-4 flex flex-col justify-between animate-pulse"
            >
              <div className="h-[200px] bg-stone-200 rounded-sm w-full" />
              <div className="space-y-2 mt-4">
                <div className="h-4 bg-stone-200 rounded w-3/4" />
                <div className="h-3 bg-stone-200 rounded w-full" />
                <div className="h-3 bg-stone-200 rounded w-2/3" />
              </div>
              <div className="h-4 bg-stone-200 rounded w-1/3 mt-4" />
            </div>
          ))}
        </div>
      )}

      {/* 4. Error State */}
      {!isLoading && error && (
        <div className="bg-white rounded-lg border border-red-200 p-8 text-center space-y-4 shadow-sm max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <RotateCcw className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#122544]">Error Loading Destinations</h3>
          <p className="text-xs text-stone-600 leading-relaxed">{error}</p>
          <button
            onClick={() => {
              setIsLoading(true);
              destinationsRepository.getAll().then(setDestinations).catch(() => setError("Failed to reload.")).finally(() => setIsLoading(false));
            }}
            className="px-5 py-2.5 rounded-sm bg-[#122544] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1f3860] transition-colors"
          >
            Retry Loading
          </button>
        </div>
      )}

      {/* 5. Destination Cards Grid */}
      {!isLoading && !error && filteredDestinations.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500 px-1">
            <span>
              Showing <strong>{filteredDestinations.length}</strong> {filteredDestinations.length === 1 ? "destination" : "destinations"}
              {selectedRegion !== "all" && ` in ${selectedRegion}`}
            </span>
            {(selectedRegion !== "all" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedRegion("all");
                  setSearchQuery("");
                }}
                className="text-[#D2573F] font-semibold hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onSelect={(selected) => onSelectDestination(selected)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 6. Empty State */}
      {!isLoading && !error && filteredDestinations.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg border border-[#122544]/10 p-8 space-y-4 shadow-sm max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-[#FAF8F5] text-stone-400 flex items-center justify-center mx-auto border border-stone-200">
            <MapPin className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#122544]">No Destinations Found</h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
            We couldn't find any destinations matching <span className="font-semibold text-[#122544]">"{searchQuery}"</span> in the selected region.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSelectedRegion("all");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-sm bg-[#D2573F] text-white text-xs font-semibold uppercase tracking-wider shadow-sm hover:bg-[#b84a35] transition-colors"
            >
              Reset Filters
            </button>
            <button
              onClick={onOpenPlanTrip}
              className="px-5 py-2.5 rounded-sm bg-[#122544] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1f3860] transition-colors"
            >
              Request Custom Region
            </button>
          </div>
        </div>
      )}

      {/* 7. Bottom Custom Trip Callout Banner */}
      <div className="p-8 sm:p-10 rounded-lg bg-white border border-[#122544]/10 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center lg:text-left">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#D2573F] block">
            Bespoke African Journeys
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#122544]">
            Can't Decide or Planning a Multi-Country Expedition?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Combine Kenya's Great Migration, Tanzania's Ngorongoro Crater, gorilla trekking in Rwanda or Uganda, and unwind on Zanzibar's white sands in a single seamless itinerary.
          </p>
        </div>

        <button
          onClick={onOpenPlanTrip}
          className="px-7 py-3.5 rounded-sm bg-[#D2573F] hover:bg-[#b84a35] text-white font-semibold text-xs uppercase tracking-widest shadow-md transition-all flex items-center gap-2 flex-shrink-0"
        >
          <Calendar className="w-4 h-4" />
          <span>Design Tailored Safari</span>
        </button>
      </div>
    </div>
  );
};
