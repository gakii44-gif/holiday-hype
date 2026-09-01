import React from "react";
import { Destination } from "../lib/types";
import { MapPin, ArrowRight, Sun } from "lucide-react";

interface DestinationCardProps {
  destination: Destination;
  onSelect: (destination: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(destination)}
      className="group relative bg-white overflow-hidden border border-[#122544]/10 shadow-sm hover:shadow-md transition-all duration-300 rounded-lg flex flex-col cursor-pointer h-[380px]"
    >
      {/* Top Media Area with Gradient & Badge */}
      <div className="h-[210px] bg-[#122544]/10 relative overflow-hidden flex-shrink-0">
        <img
          src={destination.thumbnail || destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent z-10" />

        <div className="absolute top-3 right-3 z-20">
          <span className="px-2.5 py-1 rounded bg-[#122544]/90 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#E7A93B]" />
            {destination.region}
          </span>
        </div>

        <div className="absolute bottom-3 left-4 z-20">
          {destination.packageCount && destination.packageCount > 0 ? (
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E7A93B] mb-0.5 block">
              {destination.packageCount} {destination.packageCount === 1 ? "Package" : "Packages"}
            </span>
          ) : (
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E7A93B] mb-0.5 block">
              Curated Safari
            </span>
          )}
          <h3 className="text-white text-2xl font-bold uppercase tracking-wide font-serif leading-tight">
            {destination.name}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-white">
        <div className="space-y-2">
          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-2">
            {destination.tagline || destination.overview}
          </p>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
            <Sun className="w-3.5 h-3.5 text-[#E7A93B] flex-shrink-0" />
            <span className="truncate">Best time: {destination.bestTimeToVisit.split(";")[0]}</span>
          </div>
        </div>

        {/* Card Footer Action */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
          <span className="text-[#D2573F] font-bold text-xs uppercase tracking-wider group-hover:text-[#b84a35] transition-colors">
            Explore Tours
          </span>
          <span className="text-slate-400 group-hover:text-[#D2573F] group-hover:translate-x-1 transition-all text-sm">
            →
          </span>
        </div>
      </div>
    </div>
  );
};

