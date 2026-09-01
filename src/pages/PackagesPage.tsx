import React, { useState } from "react";
import { HolidayPackage, Destination } from "../lib/types";
import { PackageCard } from "../components/PackageCard";
import { Sparkles, Compass, MapPin, Search } from "lucide-react";

interface PackagesPageProps {
  packages: HolidayPackage[];
  destinations: Destination[];
  onSelectPackage: (pkg: HolidayPackage) => void;
  onBookPackage: (pkg: HolidayPackage) => void;
  onOpenPlanTrip: () => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({
  packages,
  destinations,
  onSelectPackage,
  onBookPackage,
  onOpenPlanTrip,
}) => {
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const styles = [
    "all",
    "Wildlife Safari",
    "Luxury Safari",
    "Bush & Beach Combo",
    "Gorilla Trekking",
    "Beach & Coastal",
    "Honeymoon & Romance"
  ];

  const filteredPackages = packages.filter((pkg) => {
    const matchesStyle = selectedStyle === "all" || pkg.travelStyle === selectedStyle;
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destinationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStyle && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-[#122544] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7A93B]/20 text-[#E7A93B] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Handcrafted Holiday Packages
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
          Curated African Itineraries
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          From 3-day Great Migration fly-in safaris to 14-day grand multi-country East African expeditions and romantic Zanzibar honeymoons.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        {/* Style Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStyle === style
                  ? "bg-[#122544] text-white shadow-sm"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {style === "all" ? "All Packages" : style}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search packages by park or title..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPackages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            onSelect={onSelectPackage}
            onBookNow={onBookPackage}
          />
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
          <Compass className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-[#122544]">No Packages Found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            We couldn't find any packages matching "{searchQuery}". Try selecting another category or customize your trip.
          </p>
        </div>
      )}

      {/* Bottom CTA Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF8F5] border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="font-serif text-2xl font-bold text-[#122544]">
            Can't Find Your Exact Dream Itinerary?
          </h3>
          <p className="text-xs text-stone-600">
            Our safari specialists customize every single lodge, park sequence, and pace according to your preferences.
          </p>
        </div>
        <button
          onClick={onOpenPlanTrip}
          className="px-8 py-3.5 rounded-xl bg-[#E7A93B] hover:bg-[#d89b30] text-[#122544] font-bold text-xs shadow-sm transition-all"
        >
          Design Custom Trip
        </button>
      </div>
    </div>
  );
};
