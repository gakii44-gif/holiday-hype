import React, { useState } from "react";
import { HolidayPackage } from "../lib/types";
import { siteConfig } from "../lib/config";
import { 
  Clock, 
  MapPin, 
  Users, 
  Star, 
  ShieldCheck, 
  Check, 
  X, 
  Calendar, 
  ArrowLeft, 
  Sparkles, 
  Share2, 
  Heart, 
  Phone, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  Bed, 
  Utensils, 
  Car,
  FileCheck2,
  HelpCircle
} from "lucide-react";

interface PackageDetailPageProps {
  pkg: HolidayPackage;
  onBack: () => void;
  onBookNow: (pkg: HolidayPackage) => void;
  onInquire: (title: string, destination: string) => void;
  onOpenPlanTrip: () => void;
}

export const PackageDetailPage: React.FC<PackageDetailPageProps> = ({
  pkg,
  onBack,
  onBookNow,
  onInquire,
  onOpenPlanTrip,
}) => {
  const [activeDay, setActiveDay] = useState<number | null>(1);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-[#122544] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Packages</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-[#122544] text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? "Link Copied!" : "Share Safari"}</span>
          </button>
        </div>
      </div>

      {/* Hero Presentation Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#122544] text-white text-xs font-semibold">
            {pkg.travelStyle}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#E7A93B] text-[#122544] text-xs font-bold">
            {pkg.destinationName} ({pkg.country})
          </span>
          {pkg.popular && (
            <span className="px-3 py-1 rounded-full bg-[#D2573F] text-white text-xs font-bold uppercase tracking-wider">
              Popular Choice
            </span>
          )}
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#122544] tracking-tight leading-tight">
          {pkg.title}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-3xl">
          {pkg.subtitle}
        </p>

        {/* Key Quick Stats Bar */}
        <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-stone-600 border-t border-b border-stone-200 py-3">
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-[#D2573F]" />
            <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
          </div>

          <div className="flex items-center gap-1.5 font-medium">
            <Users className="w-4 h-4 text-[#D2573F]" />
            <span>Group Size: {pkg.groupSize}</span>
          </div>

          <div className="flex items-center gap-1.5 font-medium">
            <MapPin className="w-4 h-4 text-[#D2573F]" />
            <span>Starts & Ends: Nairobi / Arusha</span>
          </div>

          <div className="flex items-center gap-1.5 font-semibold text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span>{pkg.rating.toFixed(2)} ({pkg.reviewCount} Reviews)</span>
          </div>
        </div>
      </div>

      {/* Visual Photo Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden max-h-[460px]">
        <div className="md:col-span-2 md:row-span-2 h-[300px] md:h-full">
          <img
            src={pkg.heroImage}
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
        </div>
        {pkg.galleryImages.slice(0, 4).map((img, idx) => (
          <div key={idx} className="hidden md:block h-[225px] overflow-hidden">
            <img
              src={img}
              alt={`${pkg.title} scene ${idx + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Main Content Layout: Itinerary & Inclusions vs Booking Sticky Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left 2 Cols: Safari Details */}
        <div className="lg:col-span-2 space-y-10">
          {/* Overview */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#122544]">
              Safari Overview
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              {pkg.overview}
            </p>

            {/* Highlights List */}
            <div className="pt-4 border-t border-stone-100 space-y-3">
              <h3 className="text-xs font-bold text-[#122544] uppercase tracking-wider">
                Expedition Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {pkg.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-stone-800">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Day-by-Day Interactive Itinerary */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-[#122544]">
                Day-by-Day Itinerary
              </h2>
              <span className="text-xs text-stone-500 font-medium">
                {pkg.itinerary.length} Days Detailed
              </span>
            </div>

            <div className="space-y-3">
              {pkg.itinerary.map((day) => {
                const isOpen = activeDay === day.day;
                return (
                  <div
                    key={day.day}
                    className="border border-stone-200 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setActiveDay(isOpen ? null : day.day)}
                      className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors ${
                        isOpen ? "bg-[#122544] text-white" : "bg-[#FAF8F5] text-[#122544] hover:bg-stone-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                          isOpen ? "bg-[#E7A93B] text-[#122544]" : "bg-[#122544] text-white"
                        }`}>
                          D{day.day}
                        </span>
                        <div>
                          <h3 className="font-bold text-sm leading-snug">{day.title}</h3>
                          <p className={`text-[11px] ${isOpen ? "text-slate-300" : "text-stone-500"}`}>
                            {day.destination}
                          </p>
                        </div>
                      </div>

                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                    </button>

                    {isOpen && (
                      <div className="p-5 bg-white space-y-4 text-xs text-stone-700 leading-relaxed border-t border-stone-100">
                        <p>{day.description}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-stone-100 text-stone-600">
                          <div className="flex items-center gap-2">
                            <Bed className="w-4 h-4 text-[#D2573F]" />
                            <div>
                              <span className="text-[10px] uppercase font-bold text-stone-400 block">Lodge / Camp</span>
                              <span className="font-semibold text-stone-800">{day.accommodation}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Utensils className="w-4 h-4 text-[#D2573F]" />
                            <div>
                              <span className="text-[10px] uppercase font-bold text-stone-400 block">Meals Included</span>
                              <span className="font-semibold text-stone-800">{day.meals}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Car className="w-4 h-4 text-[#D2573F]" />
                            <div>
                              <span className="text-[10px] uppercase font-bold text-stone-400 block">Activities</span>
                              <span className="font-semibold text-stone-800 truncate">{day.activities.join(", ")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Inclusions */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-emerald-800 flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>What is Included</span>
              </h3>
              <ul className="space-y-2 text-xs text-stone-700">
                {pkg.included.map((inc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-rose-800 flex items-center gap-2">
                <X className="w-5 h-5 text-rose-600" />
                <span>What is Excluded</span>
              </h3>
              <ul className="space-y-2 text-xs text-stone-700">
                {pkg.excluded.map((exc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Sticky Booking & Inquiry Card */}
        <div className="space-y-6 sticky top-24">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl space-y-6">
            <div className="space-y-1 pb-4 border-b border-stone-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                Price Per Person
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-extrabold text-[#122544]">
                  {siteConfig.currency.symbol}{pkg.pricePerPersonUsd.toLocaleString()}
                </span>
                <span className="text-xs text-stone-500 font-medium">USD / double share</span>
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold pt-1">
                ✓ Includes all national park conservation fees
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => onBookNow(pkg)}
                className="w-full py-4 rounded-xl bg-[#E7A93B] hover:bg-[#d89b30] text-[#122544] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Package</span>
              </button>

              <button
                onClick={() => onInquire(`Custom Quote for ${pkg.title}`, pkg.destinationName)}
                className="w-full py-3 rounded-xl bg-[#122544] hover:bg-[#1a335a] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Request Tailor-Made Quote</span>
              </button>

              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hello Holiday Hype! I am interested in the ${pkg.title} (${pkg.durationDays} Days). Could we discuss dates and custom adjustments?`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat With Safari Specialist</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="space-y-2 pt-4 border-t border-stone-100 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% Guaranteed Departures</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E7A93B] flex-shrink-0" />
                <span>Customizable lodges & route pacing</span>
              </div>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#122544] flex-shrink-0" />
                <span>24/7 Dedicated East Africa Concierge</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
