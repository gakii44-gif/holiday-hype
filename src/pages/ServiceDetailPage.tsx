import React from "react";
import { TravelService } from "../lib/types";
import { ArrowLeft, CheckCircle2, Sparkles, Send, ShieldCheck, PhoneCall, HelpCircle } from "lucide-react";

interface ServiceDetailPageProps {
  service: TravelService;
  onBack: () => void;
  onInquire: (service: TravelService) => void;
  onOpenPlanTrip: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onBack,
  onInquire,
  onOpenPlanTrip,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-[#122544] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Services</span>
      </button>

      {/* Hero Header */}
      <div className="bg-[#122544] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7A93B]/20 text-[#E7A93B] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Holiday Hype Service Desk
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
          {service.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
          {service.shortDescription}
        </p>
      </div>

      {/* Body Details & Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#122544]">
              Service Overview & Specifications
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#122544]">
              Included Key Features & Capabilities
            </h3>
            <div className="space-y-3">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Action Card */}
        <div className="space-y-6 sticky top-24">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl space-y-6">
            <div className="space-y-1 pb-4 border-b border-stone-100">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D2573F]">
                Fast Quote & Assistance
              </span>
              <h3 className="font-serif text-xl font-bold text-[#122544]">
                Book or Inquire
              </h3>
              <p className="text-xs text-stone-500">
                Get an instant quote and consultation from our senior travel managers.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => onInquire(service)}
                className="w-full py-4 rounded-xl bg-[#E7A93B] hover:bg-[#d89b30] text-[#122544] font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{service.ctaLabel}</span>
              </button>

              <button
                onClick={onOpenPlanTrip}
                className="w-full py-3 rounded-xl bg-[#122544] text-white font-semibold text-xs hover:bg-[#1a335a] transition-colors"
              >
                Design Custom Multi-Day Safari
              </button>
            </div>

            <div className="pt-4 border-t border-stone-100 text-xs text-stone-600 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Fully Licensed Tour Operator</span>
              </div>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#E7A93B] flex-shrink-0" />
                <span>Zero Obligation Free Quotations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
