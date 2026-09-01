import React, { useState } from "react";
import { Destination } from "../lib/types";
import { DestinationCard } from "../components/DestinationCard";
import { Compass, MapPin, Search, Sparkles, Filter } from "lucide-react";

interface DestinationsPageProps {
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  onOpenPlanTrip: () => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({
  destinations,
  onSelectDestination,
  onOpenPlanTrip
}) => {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const regions = ["all", "East Africa", "Southern Africa", "Indian Ocean"];

  const filteredDestinations = destinations.filter((dest) => {
    const matchesRegion = selectedRegion === "all" || dest.region.toLowerCase().includes(selectedRegion.toLowerCase());
    const matchesSearch = 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.topAttractions.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
      dest.keyWildlife.some(w => w.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#122544]/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#D2573F] mb-1.5 block">
            Curated African Regions
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-[#122544] leading-tight">
            Discover Destinations
          </h1>
          <p className="text-[#122544]/70 text-base sm:text-lg mt-2 max-w-2xl">
            Experience the untamed beauty, iconic wildlife migrations, and cultural richness across our curated safari regions.
          </p>
        </div>

        {/* Region & Search Filters in Sleek Container */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-white px-4 py-2 rounded-sm border border-[#122544]/10 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mr-3">Region:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-transparent text-xs sm:text-sm font-semibold text-[#122544] focus:outline-none cursor-pointer"
            >
              <option value="all">All of Africa & Islands</option>
              <option value="East Africa">East Africa</option>
              <option value="Southern Africa">Southern Africa</option>
              <option value="Indian Ocean">Indian Ocean Islands</option>
            </select>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destination, park..."
              className="pl-8 pr-3 py-2 bg-white rounded-sm border border-[#122544]/10 shadow-sm text-xs text-[#122544] focus:outline-none focus:border-[#122544] w-48 sm:w-60"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>

      {/* Destination Grid */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onSelect={onSelectDestination}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg border border-[#122544]/10 p-8 space-y-4 shadow-sm">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-[#122544]">No Destinations Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            We couldn't find any destinations matching "{searchQuery}". Try selecting all regions or contact our safari specialists.
          </p>
          <button
            onClick={() => {
              setSelectedRegion("all");
              setSearchQuery("");
            }}
            className="px-5 py-2.5 rounded-sm bg-[#D2573F] text-white text-xs font-semibold uppercase tracking-wider shadow-sm hover:bg-[#b84a35] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Bottom Custom Trip Callout */}
      <div className="p-8 rounded-lg bg-white border border-[#122544]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#D2573F] block">
            Tailor-Made Expeditions
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#122544]">
            Looking for a Multi-Country African Safari?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Combine Kenya, Tanzania, Rwanda, Uganda, or Victoria Falls in one seamless tailor-made journey.
          </p>
        </div>
        <button
          onClick={onOpenPlanTrip}
          className="px-6 py-3 rounded-sm bg-[#D2573F] hover:bg-[#b84a35] text-white font-semibold text-xs uppercase tracking-widest shadow-sm transition-all flex-shrink-0"
        >
          Design Multi-Country Safari
        </button>
      </div>
    </div>
  );
};
