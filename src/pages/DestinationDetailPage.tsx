import React, { useState } from "react";
import { Destination, HolidayPackage } from "../lib/types";
import { PackageCard } from "../components/PackageCard";
import { HolidayHypeVideoShowcase } from "../components/HolidayHypeVideoShowcase";
import { RealTravelGallery } from "../components/RealTravelGallery";
import { 
  MapPin, 
  Sun, 
  Calendar, 
  Sparkles, 
  Globe2, 
  CheckCircle2, 
  ArrowLeft, 
  Camera, 
  ShieldCheck,
  CreditCard, 
  Languages,
  FileCheck2,
  Syringe,
  ArrowRight,
  Share2,
  Check
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
  const [copied, setCopied] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const destPackages = packages.filter(
    (p) =>
      p.destinationId === destination.id ||
      p.country.toLowerCase() === destination.country.toLowerCase() ||
      p.destinationName.toLowerCase().includes(destination.name.toLowerCase())
  );

  const galleryImages = [
    destination.heroImage,
    ...(destination.gallery || [])
  ].filter(Boolean);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. Breadcrumbs / Navigation Top Bar */}
      <div className="flex items-center justify-between border-b border-[#122544]/10 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-[#122544] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Destinations</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-[#122544]/15 text-[#122544] text-xs font-semibold uppercase tracking-wider hover:bg-stone-50 transition-colors shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#D2573F]" />
                <span>Share Guide</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Sleek Hero Banner */}
      <div className="relative rounded-lg overflow-hidden min-h-[440px] flex flex-col justify-end p-6 sm:p-12 bg-[#122544] shadow-md border border-[#1F3860]">
        <img
          src={galleryImages[activeGalleryIndex] || destination.heroImage}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.65] transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B182B] via-[#122544]/60 to-transparent" />

        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-sm bg-[#E7A93B] text-[#122544] text-[11px] font-bold uppercase tracking-widest">
              {destination.region}
            </span>
            <span className="px-2.5 py-1 rounded-sm bg-[#122544]/80 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20 uppercase tracking-wider">
              {destPackages.length} Curated {destPackages.length === 1 ? "Safari" : "Safaris"}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight uppercase">
            {destination.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-2xl">
            {destination.tagline || destination.overview}
          </p>

          {/* Quick Gallery Thumbnails if Available */}
          {galleryImages.length > 1 && (
            <div className="pt-3 flex items-center gap-2 overflow-x-auto pb-1">
              {galleryImages.slice(0, 5).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGalleryIndex(idx)}
                  className={`w-14 h-10 rounded-sm overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeGalleryIndex === idx
                      ? "border-[#E7A93B] scale-105"
                      : "border-white/50 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Main Grid: Left Detailed Content & Right Travel Guide Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Description, Wildlife, Attractions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Destination Overview */}
          <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#122544]/10 shadow-sm space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#D2573F] block">
              Overview & Landscape
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#122544]">
              About {destination.name}
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              {destination.overview || destination.description}
            </p>
            {destination.climate && (
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-start gap-2.5 text-xs text-stone-600">
                <Sun className="w-4 h-4 text-[#E7A93B] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#122544]">Climate & Atmosphere: </strong>
                  <span>{destination.climate}</span>
                </div>
              </div>
            )}
          </div>

          {/* Key Wildlife */}
          {destination.keyWildlife && destination.keyWildlife.length > 0 && (
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#122544]/10 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#122544]">
                <Camera className="w-5 h-5 text-[#D2573F]" />
                <h2 className="font-serif text-xl font-bold">Key Wildlife & Encounters</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {destination.keyWildlife.map((wildlife, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-sm bg-[#FAF8F5] border border-stone-200/80 text-xs font-semibold text-stone-800 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#E7A93B] flex-shrink-0" />
                    <span className="truncate">{wildlife}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top National Parks & Attractions */}
          {destination.topAttractions && destination.topAttractions.length > 0 && (
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#122544]/10 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#122544]">
                <MapPin className="w-5 h-5 text-[#D2573F]" />
                <h2 className="font-serif text-xl font-bold">Top National Parks & Highlights</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.topAttractions.map((attraction, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-sm bg-white border border-[#122544]/10 text-xs font-semibold text-[#122544] flex items-center justify-between shadow-xs hover:border-[#122544]/30 transition-colors"
                  >
                    <span className="pr-2">{attraction}</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#D2573F] flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Practical Travel Guide Fast Facts */}
        <div className="space-y-6">
          <div className="bg-[#122544] text-white rounded-lg p-6 sm:p-8 space-y-5 shadow-md border border-[#1F3860]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E7A93B] block">
                Practical Intelligence
              </span>
              <h3 className="font-serif text-xl font-bold text-white mt-0.5 border-b border-slate-700/80 pb-3">
                {destination.name} Travel Guide
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              {destination.bestTimeToVisit && (
                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                    <Calendar className="w-3.5 h-3.5 text-[#E7A93B]" />
                    Best Time to Visit
                  </span>
                  <p className="text-white font-medium leading-relaxed pl-5">
                    {destination.bestTimeToVisit}
                  </p>
                </div>
              )}

              {destination.travelTips?.currency && (
                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                    <CreditCard className="w-3.5 h-3.5 text-[#E7A93B]" />
                    Currency & Money
                  </span>
                  <p className="text-white font-medium leading-relaxed pl-5">
                    {destination.travelTips.currency}
                  </p>
                </div>
              )}

              {destination.travelTips?.languages && (
                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                    <Languages className="w-3.5 h-3.5 text-[#E7A93B]" />
                    Languages Spoken
                  </span>
                  <p className="text-white font-medium leading-relaxed pl-5">
                    {destination.travelTips.languages}
                  </p>
                </div>
              )}

              {destination.travelTips?.visa && (
                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                    <FileCheck2 className="w-3.5 h-3.5 text-[#E7A93B]" />
                    Visa & Entry Formalities
                  </span>
                  <p className="text-slate-200 font-normal leading-relaxed pl-5">
                    {destination.travelTips.visa}
                  </p>
                </div>
              )}

              {destination.travelTips?.vaccinations && (
                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                    <Syringe className="w-3.5 h-3.5 text-[#E7A93B]" />
                    Health & Vaccinations
                  </span>
                  <p className="text-slate-200 font-normal leading-relaxed pl-5">
                    {destination.travelTips.vaccinations}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-700 space-y-2.5">
              <button
                onClick={onOpenPlanTrip}
                className="w-full py-3 rounded-sm bg-[#D2573F] hover:bg-[#b84a35] text-white font-semibold text-xs uppercase tracking-widest shadow-sm transition-all"
              >
                Plan Custom {destination.name} Trip
              </button>
              <button
                onClick={() => onInquire(`Custom safari inquiry for ${destination.name}`, destination.name)}
                className="w-full py-2.5 rounded-sm bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-colors border border-white/20"
              >
                Inquire With Safari Specialist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Destination Packages Section */}
      <div className="space-y-6 pt-6 border-t border-[#122544]/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D2573F] block">
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
          <div className="p-8 rounded-lg bg-white border border-[#122544]/10 text-center space-y-3 shadow-sm">
            <p className="text-xs sm:text-sm text-stone-600">
              We create 100% tailor-made private safaris and holiday packages for {destination.name}.
            </p>
            <button
              onClick={onOpenPlanTrip}
              className="px-6 py-2.5 rounded-sm bg-[#D2573F] text-white font-semibold text-xs uppercase tracking-wider shadow-sm hover:bg-[#b84a35] transition-colors"
            >
              Request Custom {destination.name} Safari
            </button>
          </div>
        )}

        {/* Live Holiday Hype Evidence for Tanzania / Zanzibar */}
        {(destination.country.toLowerCase().includes("tanzania") || 
          destination.name.toLowerCase().includes("zanzibar") || 
          destination.slug.toLowerCase().includes("tanzania") ||
          destination.slug.toLowerCase().includes("zanzibar")) && (
          <div className="pt-8 border-t border-[#122544]/10 space-y-8">
            <HolidayHypeVideoShowcase />
            <RealTravelGallery onPlanTrip={onOpenPlanTrip} />
          </div>
        )}
      </div>
    </div>
  );
};
