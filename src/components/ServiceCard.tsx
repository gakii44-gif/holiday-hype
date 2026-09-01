import React from "react";
import { TravelService } from "../lib/types";
import { 
  Compass, 
  Palmtree, 
  Plane, 
  Hotel, 
  Briefcase, 
  Heart, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

interface ServiceCardProps {
  service: TravelService;
  onSelect: (service: TravelService) => void;
  onInquire: (service: TravelService) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect, onInquire }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case "Compass": return <Compass className="w-5 h-5" />;
      case "Palmtree": return <Palmtree className="w-5 h-5" />;
      case "Plane": return <Plane className="w-5 h-5" />;
      case "Hotel": return <Hotel className="w-5 h-5" />;
      case "Briefcase": return <Briefcase className="w-5 h-5" />;
      case "Heart": return <Heart className="w-5 h-5" />;
      case "ShieldCheck": return <ShieldCheck className="w-5 h-5" />;
      default: return <Compass className="w-5 h-5" />;
    }
  };

  return (
    <div className="group bg-white rounded-lg p-6 border border-[#122544]/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Icon & Title */}
        <div className="w-11 h-11 rounded-sm bg-[#122544] text-[#E7A93B] flex items-center justify-center group-hover:scale-105 transition-transform">
          {getIcon(service.iconName)}
        </div>

        <div>
          <h3 
            onClick={() => onSelect(service)}
            className="font-serif text-xl font-bold text-[#122544] group-hover:text-[#D2573F] transition-colors cursor-pointer leading-snug"
          >
            {service.title}
          </h3>
          <p className="text-xs text-stone-600 mt-2 leading-relaxed">
            {service.shortDescription}
          </p>
        </div>

        {/* Feature List */}
        <div className="space-y-1.5 pt-3 border-t border-slate-100">
          {service.features.slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D2573F] flex-shrink-0 mt-0.5" />
              <span className="line-clamp-1">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => onSelect(service)}
          className="text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-[#122544] transition-colors"
        >
          Details
        </button>

        <button
          onClick={() => onInquire(service)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#FAF8F5] group-hover:bg-[#D2573F] group-hover:text-white text-[#122544] text-xs font-semibold uppercase tracking-wider transition-all border border-[#122544]/10 shadow-sm"
        >
          <span>{service.ctaLabel}</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

