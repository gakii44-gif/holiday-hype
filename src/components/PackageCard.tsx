import React from "react";
import { HolidayPackage } from "../lib/types";
import { siteConfig } from "../lib/config";
import { 
  Clock, 
  MapPin, 
  Users, 
  Star, 
  Check, 
  ArrowRight,
  Sparkles
} from "lucide-react";

interface PackageCardProps {
  pkg: HolidayPackage;
  onSelect: (pkg: HolidayPackage) => void;
  onBookNow: (pkg: HolidayPackage) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, onSelect, onBookNow }) => {
  return (
    <div className="group bg-white rounded-lg overflow-hidden border border-[#122544]/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={pkg.thumbnail || pkg.heroImage}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {pkg.popular && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm bg-[#D2573F] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-2.5 h-2.5" />
              Popular
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded-sm bg-[#122544]/90 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider">
            {pkg.travelStyle}
          </span>
        </div>

        {/* Duration Pill */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-sm bg-white/95 backdrop-blur-md text-[#122544] text-xs font-bold shadow-sm flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#D2573F]" />
          <span>{pkg.durationDays}D / {pkg.durationNights}N</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Location & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-1 text-[#122544] font-semibold text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#D2573F]" />
              <span>{pkg.destinationName}</span>
            </div>
            <div className="flex items-center gap-1 text-amber-500 font-semibold text-xs">
              <Star className="w-3 h-3 fill-current" />
              <span>{pkg.rating.toFixed(1)}</span>
              <span className="text-stone-400">({pkg.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(pkg)}
            className="font-serif text-lg font-bold text-[#122544] group-hover:text-[#D2573F] transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {pkg.title}
          </h3>

          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {pkg.overview}
          </p>

          {/* Top 2 Highlights */}
          <div className="space-y-1 pt-1">
            {pkg.highlights.slice(0, 2).map((hl, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-xs text-stone-700">
                <Check className="w-3.5 h-3.5 text-[#D2573F] flex-shrink-0 mt-0.5" />
                <span className="truncate">{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer with Price and Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-600 tracking-wider block">
              From
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-xl font-extrabold text-[#122544]">
                {siteConfig.currency.symbol}{pkg.pricePerPersonUsd.toLocaleString()}
              </span>
              <span className="text-[11px] text-stone-500 font-medium">/ person</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelect(pkg)}
              className="px-3 py-2 rounded-sm border border-[#122544]/20 hover:border-[#122544] text-[#122544] text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Details
            </button>
            <button
              onClick={() => onBookNow(pkg)}
              className="px-3.5 py-2 rounded-sm bg-[#D2573F] hover:bg-[#b84a35] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm flex items-center gap-1"
            >
              <span>Book</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

