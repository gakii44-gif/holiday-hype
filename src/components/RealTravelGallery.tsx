import React, { useState } from "react";
import { 
  Camera, 
  MapPin, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  MessageCircle, 
  Share2, 
  CheckCircle2,
  Palmtree,
  Waves,
  Building2,
  Users
} from "lucide-react";
import { siteConfig } from "../lib/config";

export interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "turtles" | "brand" | "harbor" | "office";
  categoryLabel: string;
  location: string;
  image: string;
  description: string;
  badge: string;
  highlight: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "photo-sea-turtles",
    title: "Swimming with Wild Green Sea Turtles",
    category: "turtles",
    categoryLabel: "Sea Turtles & Lagoon",
    location: "Baraka Natural Aquarium, Nungwi, Zanzibar",
    image: "/images/zanzibar_sea_turtles_lagoon.jpg",
    description: "Travelers wading waist-deep in the transparent emerald water of the natural coral rock lagoon, hand-feeding fresh seaweed to friendly green sea turtles gliding gracefully all around them.",
    badge: "Guest Favorite Experience",
    highlight: "Real encounters in Nungwi's natural sea sanctuary"
  },
  {
    id: "photo-founder-pier",
    title: "Holiday Hype on the Ocean Pier",
    category: "brand",
    categoryLabel: "Holiday Hype in Action",
    location: "Kendwa Ocean Jetty, Zanzibar",
    image: "/images/holiday_hype_founder_pier.jpg",
    description: "Holiday Hype team proudly holding the official 'Holiday Hype Travel & Tours - Come, Travel & Experience' sign over the endless turquoise waters of the Indian Ocean.",
    badge: "Official Evidence",
    highlight: "Representing authentic travel joy"
  },
  {
    id: "photo-founder-beach",
    title: "White Sands & Coastal Coral Formations",
    category: "brand",
    categoryLabel: "Holiday Hype in Action",
    location: "Pristine Nungwi Beach, Zanzibar",
    image: "/images/holiday_hype_founder_beach.jpg",
    description: "Standing on the soft white sands next to ancient weathered coral rock formations, embodying the pure island energy and tropical tranquility of Zanzibar.",
    badge: "Tropical Haven",
    highlight: "Powdery beaches and coral reef landscapes"
  },
  {
    id: "photo-stone-town-harbor",
    title: "Stone Town Harbor & Safari Blue Boats",
    category: "harbor",
    categoryLabel: "Harbor & Excursions",
    location: "Stone Town Waterfront, Zanzibar",
    image: "/images/stone_town_harbor_boats.jpg",
    description: "Shallow, crystalline turquoise sea with traditional excursion boats ('Adore', 'Hunter', 'Safari Blue') anchored by the promenade, with the Azam Sealink passenger ferry docked across the bay.",
    badge: "Maritime Adventure",
    highlight: "Ocean safaris, sandbank picnics & ferry routes"
  },
  {
    id: "photo-juba-office-consultant",
    title: "Juba Airport Ticketing & Flight Operations",
    category: "office",
    categoryLabel: "Juba Office & Ticketing",
    location: "Opposite Parking, Juba International Airport",
    image: "/images/holiday_hype_office_consultant.jpg",
    description: "Our dedicated travel consultant at the Juba International Airport operations desk with authorized airline ticketing displays for flydubai, Golden Wings Aviation, and international routes.",
    badge: "Flight Hub",
    highlight: "Instant ticket issuance & 24/7 traveler care"
  },
  {
    id: "photo-ocean-jump",
    title: "The Mid-Air Ocean Leap with Sign",
    category: "brand",
    categoryLabel: "Holiday Hype in Action",
    location: "Stone Town Pier, Zanzibar",
    image: "/images/zanzibar_jump_midair.jpg",
    description: "The viral jump into the warm turquoise ocean while holding the Holiday Hype sign high in mid-air — true evidence of the holiday hype that energizes every trip.",
    badge: "Viral Moment",
    highlight: "Pure coastal adrenaline & excitement"
  },
  {
    id: "photo-harbor-diving",
    title: "Seawall Somersaults & Harbor Dives",
    category: "harbor",
    categoryLabel: "Harbor & Excursions",
    location: "Forodhani Promenade, Stone Town",
    image: "/images/zanzibar_diving_flip.jpg",
    description: "Local acrobats and adventurers executing somersaults into the transparent waters along the historic Stone Town stone seawall.",
    badge: "Island Culture",
    highlight: "Stone Town waterfront traditions"
  },
  {
    id: "photo-arrival-crew",
    title: "Swahili Welcome & Crew Greeting",
    category: "brand",
    categoryLabel: "Holiday Hype in Action",
    location: "Zanzibar Waterfront",
    image: "/images/zanzibar_holiday_hype.jpg",
    description: "The Holiday Hype crew gathering with the official chalkboard sign: 'Welcome to Zanzibar - Holiday Hype! Come, Travel & Experience'.",
    badge: "Warm Reception",
    highlight: "Personalized VIP reception upon arrival"
  }
];

interface RealTravelGalleryProps {
  onPlanTrip?: () => void;
  navigate?: (path: string) => void;
}

export const RealTravelGallery: React.FC<RealTravelGalleryProps> = ({ onPlanTrip, navigate }) => {
  const [activeFilter, setActiveFilter] = useState<"all" | "turtles" | "brand" | "harbor" | "office">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeFilter === "all" 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const whatsappMessage = activeItem 
    ? `Hello Holiday Hype! I saw the photo of "${activeItem.title}" at ${activeItem.location} on your website. I want to plan a similar travel experience!`
    : siteConfig.contact.whatsappMessage;

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div id="real-travel-gallery" className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122544]/5 text-[#122544] text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-[#E7A93B]" />
            <span>Authentic Photo Evidence</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#122544] tracking-tight">
            Real Moments from Holiday Hype Journeys
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Witness the real people, places, and energy behind Holiday Hype Travel & Tours. From swimming with sea turtles in Zanzibar to instant ticketing at our Juba Airport desk.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { key: "all", label: "All Photos", icon: Camera },
            { key: "turtles", label: "Sea Turtles & Lagoon", icon: Waves },
            { key: "brand", label: "Holiday Hype in Action", icon: Sparkles },
            { key: "harbor", label: "Harbor & Excursions", icon: Palmtree },
            { key: "office", label: "Juba Ticketing Hub", icon: Building2 }
          ].map(filter => {
            const Icon = filter.icon;
            const isSelected = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key as typeof activeFilter)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-[#122544] text-white shadow-sm"
                    : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[#E7A93B]" : "text-stone-500"}`} />
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setLightboxIndex(index)}
            className="group relative bg-stone-50 rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
          >
            {/* Image Container with 4:3 or 3:4 aspect ratio */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Badge */}
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-medium text-white border border-white/10">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {item.badge}
                </span>
              </div>

              {/* View Overlay Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-3.5 py-2 rounded-xl bg-white/95 text-[#122544] text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Eye className="w-4 h-4 text-[#D2573F]" />
                  <span>View Full Photo</span>
                </span>
              </div>
            </div>

            {/* Info Footer */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <div className="flex items-center gap-1 text-[11px] text-stone-500 font-medium mb-1">
                  <MapPin className="w-3 h-3 text-rose-500 flex-shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
                <h3 className="font-serif text-sm font-bold text-[#122544] group-hover:text-[#D2573F] transition-colors leading-snug line-clamp-1">
                  {item.title}
                </h3>
              </div>
              <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
              <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px]">
                <span className="text-emerald-700 font-semibold">{item.highlight}</span>
                <span className="text-[#E7A93B] font-bold group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Quote / Banner */}
      <div className="bg-[#122544] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#1F3860]">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Sparkles className="w-4 h-4 text-[#E7A93B]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#E7A93B]">
              Experience This For Yourself
            </span>
          </div>
          <h3 className="font-serif text-lg sm:text-2xl font-bold">
            Ready to swim with turtles or book flights with our Juba desk?
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            We handle everything from international and regional flights to personalized coastal safaris, hotel transfers, and boat charters.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 flex-shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp Our Team</span>
          </a>
          {onPlanTrip && (
            <button
              onClick={onPlanTrip}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E7A93B] hover:bg-[#D99A2C] text-[#122544] font-bold text-xs shadow-md transition-all"
            >
              <span>Custom Trip Plan</span>
            </button>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <div 
            className="bg-[#122544] border border-white/10 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors border border-white/20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left/Main Image */}
            <div className="relative md:w-3/5 bg-black flex items-center justify-center min-h-[320px] md:min-h-[480px]">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full max-h-[75vh] object-contain"
              />

              {/* Prev / Next controls */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors border border-white/20"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors border border-white/20"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Counter */}
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-xs text-xs font-semibold text-white/90 border border-white/10">
                Photo {lightboxIndex + 1} of {filteredItems.length}
              </div>
            </div>

            {/* Right Details Panel */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6 text-white bg-[#0f1f38]">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#E7A93B]/20 text-[#E7A93B] text-[11px] font-bold uppercase tracking-wider">
                    {activeItem.badge}
                  </span>
                  <span className="text-xs text-slate-400">
                    {activeItem.categoryLabel}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug">
                  {activeItem.title}
                </h3>

                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>{activeItem.location}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-white/10">
                  {activeItem.description}
                </p>

                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <span className="text-[11px] text-[#E7A93B] font-bold block mb-1">
                    Holiday Hype Guarantee:
                  </span>
                  <p className="text-xs text-slate-300">
                    {activeItem.highlight}. We can customize this exact activity into your itinerary!
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp About This</span>
                </a>

                {onPlanTrip && (
                  <button
                    onClick={() => {
                      setLightboxIndex(null);
                      onPlanTrip();
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
                  >
                    <span>Request Custom Trip Itinerary</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
