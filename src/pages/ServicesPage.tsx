import React from "react";
import { TravelService } from "../lib/types";
import { ServiceCard } from "../components/ServiceCard";
import { Sparkles, ShieldCheck, Compass, HeartHandshake, PhoneCall, CheckCircle2 } from "lucide-react";

interface ServicesPageProps {
  services: TravelService[];
  onSelectService: (service: TravelService) => void;
  onInquireService: (service: TravelService) => void;
  onOpenPlanTrip: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  onSelectService,
  onInquireService,
  onOpenPlanTrip,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-[#122544] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7A93B]/20 text-[#E7A93B] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          End-to-End Travel Logistics
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
          Comprehensive Travel & Safari Services
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Full-service destination management: private 4x4 safaris, flight ticketing, lodge bookings, corporate retreats, romantic honeymoons, and travel insurance coverage.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onSelect={onSelectService}
            onInquire={onInquireService}
          />
        ))}
      </div>

      {/* Why Book With Us Banner */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D2573F]">
            The Holiday Hype Advantage
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#122544]">
            Why Travelers Choose Our Service Desk
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-700">
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h3 className="font-serif text-base font-bold text-[#122544]">Direct Operator Rates</h3>
            <p className="leading-relaxed text-stone-600">
              No middleman markups. We own and maintain our custom-built 4x4 safari cruisers and maintain direct contracts with luxury lodges.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2">
            <HeartHandshake className="w-6 h-6 text-[#E7A93B]" />
            <h3 className="font-serif text-base font-bold text-[#122544]">24/7 Dedicated Concierge</h3>
            <p className="leading-relaxed text-stone-600">
              Your personal trip manager monitors flight statuses, weather conditions, park clearances, and VIP airport meet-and-greets in real-time.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2">
            <Compass className="w-6 h-6 text-[#D2573F]" />
            <h3 className="font-serif text-base font-bold text-[#122544]">Expert Local Driver-Guides</h3>
            <p className="leading-relaxed text-stone-600">
              Our guides are bronze and silver level certified by the Kenya Professional Safari Guides Association (KPSGA), with encyclopedic wildlife knowledge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
