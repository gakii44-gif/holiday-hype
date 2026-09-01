import React from "react";
import { Destination, HolidayPackage } from "../lib/types";
import { PackageCard } from "../components/PackageCard";
import { 
  MapPin, 
  Sun, 
  Calendar, 
  Sparkles, 
  Globe2, 
  CheckCircle2, 
  ArrowLeft, 
  Camera, 
  Info, 
  CreditCard, 
  Plane,
  ArrowRight
} from "lucide-react";

interface DestinationDetailPageProps {
  destination: Destination;
  packages: HolidayPackage[];
  onBack: () => void;
  onSelectPackage: (pkg: HolidayPackage) => void;
  onBookPackage: (pkg: HolidayPackage) => void;
  onOpenPlanTrip: () => void;
  onInquire: (title: string, dest: string) => void;
}

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({
  destination,
  packages,
  onBack,
  onSelectPackage,
  onBookPackage,
  onOpenPlanTrip,
  onInquire
}) => {
  const destPackages = packages.filter(
    p => p.destinationId === destination.id || p.country.toLowerCase() === destination.country.toLowerCase()
  );

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-[#122544] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Destinations</span>
      </button>

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden min-h-[420px] flex flex-col justify-end p-8 sm:p-14 bg-[#122544] shadow-xl">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B182B] via-[#122544]/50 to-transparent" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#E7A93B] text-[#122544] text-xs font-bold uppercase tracking-wider">
              {destination.region}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
              {destPackages.length} Available Packages
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            {destination.name}
          </h1>

          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed">
            {destination.tagline}
          </p>
        </div>
      </div>

      {/* Main Grid: Overview & Quick Facts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Description, Wildlife, Attractions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#122544]">
              About {destination.name}
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              {destination.description}
            </p>
          </div>

          {/* Key Wildlife */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#122544]">
              <Camera className="w-5 h-5 text-[#D2573F]" />
              <h2 className="font-serif text-xl font-bold">Key Wildlife & Encounters</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {destination.keyWildlife.map((wildlife, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E7A93B]" />
                  <span>{wildlife}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Attractions & Reserves */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#122544]">
              <MapPin className="w-5 h-5 text-[#D2573F]" />
              <h2 className="font-serif text-xl font-bold">Top National Parks & Highlights</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {destination.topAttractions.map((attraction, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200 text-xs font-semibold text-[#122544] flex items-center justify-between">
                  <span>{attraction}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#E7A93B]" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Destination Fast Facts Card & CTA */}
        <div className="space-y-6">
          <div className="bg-[#122544] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
            <h3 className="font-serif text-xl font-bold text-white border-b border-slate-700 pb-3">
              Destination Travel Guide
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Best Time to Visit</span>
                <span className="text-white font-semibold text-sm mt-0.5 block">{destination.bestTimeToVisit}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Local Currency</span>
                <span className="text-white font-semibold">{destination.currency}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Official Languages</span>
                <span className="text-white font-semibold">{destination.languages}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Entry & Visa Information</span>
                <span className="text-slate-200 leading-relaxed block mt-0.5">{destination.visaInfo}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Major Gateway Airport</span>
                <span className="text-white font-semibold">{destination.majorAirport}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700 space-y-2">
              <button
                onClick={onOpenPlanTrip}
                className="w-full py-3 rounded-xl bg-[#E7A93B] hover:bg-[#d89b30] text-[#122544] font-bold text-xs shadow-sm transition-all"
              >
                Plan Custom {destination.name} Trip
              </button>
              <button
                onClick={() => onInquire(`Inquiry for ${destination.name}`, destination.name)}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
              >
                Inquire With Specialist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Destination Packages Section */}
      <div className="space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D2573F]">
              Handcrafted Itineraries
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#122544]">
              {destination.name} Safari & Holiday Packages
            </h2>
          </div>
        </div>

        {destPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onSelect={onSelectPackage}
                onBookNow={onBookPackage}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-stone-200 text-center space-y-3">
            <p className="text-xs text-stone-600">
              We create 100% bespoke private safaris for {destination.name}.
            </p>
            <button
              onClick={onOpenPlanTrip}
              className="px-5 py-2.5 rounded-xl bg-[#E7A93B] text-[#122544] font-bold text-xs"
            >
              Request Custom {destination.name} Quote
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
