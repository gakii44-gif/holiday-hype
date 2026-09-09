import React, { useState } from "react";
import { siteConfig } from "../lib/config";
import { Destination, HolidayPackage, TravelService, BlogPost } from "../lib/types";
import { PackageCard } from "../components/PackageCard";
import { DestinationCard } from "../components/DestinationCard";
import { ServiceCard } from "../components/ServiceCard";
import { inquiriesRepository } from "../lib/repositories";
import { HolidayHypeVideoShowcase } from "../components/HolidayHypeVideoShowcase";
import { RealTravelGallery } from "../components/RealTravelGallery";
import { 
  Plane, 
  Hotel, 
  Palmtree, 
  Compass, 
  FileText, 
  Car, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Sparkles,
  Phone,
  MessageSquare,
  ShieldCheck,
  HeartHandshake,
  Clock,
  Send,
  Eye,
  Film
} from "lucide-react";

interface HomePageProps {
  destinations: Destination[];
  packages: HolidayPackage[];
  services: TravelService[];
  testimonials?: unknown[];
  blogPosts: BlogPost[];
  navigate: (path: string) => void;
  onSelectPackage: (pkg: HolidayPackage) => void;
  onBookPackage: (pkg: HolidayPackage) => void;
  onSelectDestination: (dest: Destination) => void;
  onSelectService: (srv: TravelService) => void;
  onInquireService: (srv: TravelService) => void;
  onOpenPlanTrip: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  destinations = [],
  packages = [],
  services = [],
  blogPosts = [],
  navigate,
  onSelectPackage,
  onBookPackage,
  onSelectDestination,
  onSelectService,
  onInquireService,
  onOpenPlanTrip,
}) => {
  // Plan Your Trip Section State
  const [planForm, setPlanForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    destination: "Kenya",
    travelDate: "",
    travellerCount: "2 Travelers",
    tripType: "Leisure",
    budgetRange: "$1,500 – $3,000",
    requirements: ""
  });
  const [planStatus, setPlanStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [planError, setPlanError] = useState("");

  const handlePlanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!planForm.fullName || !planForm.email || !planForm.phone) {
      setPlanStatus("error");
      setPlanError("Please complete your full name, email, and phone / WhatsApp number.");
      return;
    }

    setPlanStatus("submitting");
    try {
      await inquiriesRepository.create({
        type: "custom_trip",
        fullName: planForm.fullName,
        email: planForm.email,
        phone: planForm.phone,
        destinationInterest: planForm.destination,
        travelDates: planForm.travelDate,
        budgetPerPerson: planForm.budgetRange,
        message: `Plan Your Trip Request:\nDestination: ${planForm.destination}\nTravel Date: ${planForm.travelDate}\nTravellers: ${planForm.travellerCount}\nTrip Type: ${planForm.tripType}\nBudget: ${planForm.budgetRange}\nRequirements: ${planForm.requirements}`
      });
      setPlanStatus("success");
    } catch {
      setPlanStatus("error");
      setPlanError("Unable to submit plan request right now. Please chat with us directly on WhatsApp.");
    }
  };

  const heroWhatsAppUrl = `https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(
    "Hello Holiday Hype Tours & Travel! I would like to plan a trip with your team."
  )}`;

  const planFollowUpWhatsApp = `https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(
    `Hello Holiday Hype Tours & Travel! I just submitted my travel plan request for ${planForm.destination} (${planForm.tripType}, ${planForm.travellerCount}). Name: ${planForm.fullName}.`
  )}`;

  // Filter packages for Hot Deals
  const hotDeals = (packages || []).slice(0, 6);

  // Curated experience categories
  const experienceCategories = [
    {
      title: "Safari Adventures",
      tag: "Big Five & Wildlife",
      image: "/images/amboseli_elephants_kilimanjaro.jpg",
      desc: "Witness the Great Migration, elephant herds under Kilimanjaro, and untamed savanna plains.",
      path: "/tours"
    },
    {
      title: "Beach Escapes",
      tag: "Tropical Coastal Waters",
      image: "/images/holiday_hype_founder_pier.jpg",
      desc: "Turquoise Indian Ocean waters, Stone Town culture, and dhow sailing in Zanzibar & Diani Beach.",
      path: "/packages"
    },
    {
      title: "Family Holidays",
      tag: "Safe & Multi-Generational",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      desc: "Carefully paced itineraries with family-friendly safari lodges, beach resorts, and fun wildlife encounters.",
      path: "/packages"
    },
    {
      title: "Romantic Getaways",
      tag: "Honeymoons & Anniversaries",
      image: "https://images.unsplash.com/photo-1510414842594-a61752afb394?auto=format&fit=crop&w=800&q=80",
      desc: "Secluded bush camps, private sunset dining, and beachfront villas designed for two.",
      path: "/packages"
    },
    {
      title: "Adventure Travel",
      tag: "Gorillas & Expeditions",
      image: "https://images.unsplash.com/photo-1574063413132-355dbfd83e12?auto=format&fit=crop&w=800&q=80",
      desc: "Trek with Mountain Gorillas in Uganda's Bwindi forest or conquer dramatic mountain landscapes.",
      path: "/tours"
    },
    {
      title: "Corporate Travel",
      tag: "Business, NGOs & Groups",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
      desc: "Flight ticketing, airport transfers, hotel accommodations, and delegation logistics from Juba.",
      path: "/corporate"
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* SECTION 5: HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[#122544] text-white px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        {/* Background Image with Authentic Safari savanna & Kilimanjaro */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/amboseli_elephants_kilimanjaro.jpg"
            alt="East African savanna safari with elephants and Mount Kilimanjaro"
            className="w-full h-full object-cover object-center brightness-[0.42] scale-100"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#122544] via-[#122544]/60 to-[#122544]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#122544]/85 via-[#122544]/40 to-[#122544]/70" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Brand Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E7A93B] text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E7A93B] flex-shrink-0" />
            <span>Holiday Hype Tours & Travel • Juba, South Sudan</span>
          </div>

          {/* Primary Headline */}
          <div className="space-y-3">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
              YOUR NEXT ADVENTURE STARTS HERE
            </h1>
            <p className="text-base sm:text-xl text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed">
              Flights, holidays, safaris, hotels and travel assistance — planned around you.
            </p>
          </div>

          {/* Supporting Core Message */}
          <p className="text-xs sm:text-sm text-[#E7A93B] font-medium tracking-wide">
            “Travel should be exciting — not stressful. We take care of the details. You enjoy the journey.”
          </p>

          {/* Dual Calls-to-Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            <button
              onClick={onOpenPlanTrip}
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-[#D2573F] hover:bg-[#b84a35] text-white font-semibold text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>PLAN MY TRIP</span>
            </button>

            <a
              href={heroWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WHATSAPP US</span>
            </a>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("holiday-hype-video-showcase");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-5 py-3.5 rounded-sm bg-white/10 hover:bg-white/20 border border-white/25 text-[#E7A93B] font-semibold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Film className="w-4 h-4 text-[#E7A93B]" />
              <span>WATCH THE HYPE</span>
            </button>
          </div>

          {/* Grounded Service Pillars (No invented statistics) */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-xs text-slate-300">
            <div className="flex items-center justify-center gap-2 bg-white/5 backdrop-blur-xs py-2 px-3 rounded border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-[#E7A93B] flex-shrink-0" />
              <span>Juba Airport Office</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/5 backdrop-blur-xs py-2 px-3 rounded border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-[#E7A93B] flex-shrink-0" />
              <span>Personalized Itineraries</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/5 backdrop-blur-xs py-2 px-3 rounded border border-white/10">
              <Phone className="w-3.5 h-3.5 text-[#E7A93B] flex-shrink-0" />
              <span>24/7 WhatsApp Support</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/5 backdrop-blur-xs py-2 px-3 rounded border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E7A93B] flex-shrink-0" />
              <span>Transparent Pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: QUICK SERVICE BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-lg p-3 sm:p-4 shadow-xl border border-[#122544]/10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {[
              {
                icon: Plane,
                label: "Flight Bookings",
                sub: "Regional & Worldwide",
                onClick: () => navigate("/flights")
              },
              {
                icon: Hotel,
                label: "Hotels",
                sub: "City & Safari Lodges",
                onClick: () => navigate("/hotels")
              },
              {
                icon: Palmtree,
                label: "Holidays",
                sub: "Curated Vacation Deals",
                onClick: () => navigate("/packages")
              },
              {
                icon: Compass,
                label: "Safaris",
                sub: "Wildlife Expeditions",
                onClick: () => navigate("/tours")
              },
              {
                icon: FileText,
                label: "Visa Assistance",
                sub: "Entry Documents Support",
                onClick: () => navigate("/services/visa-assistance-and-travel-insurance")
              },
              {
                icon: Car,
                label: "Airport Transfers",
                sub: "Juba Airport & Regional",
                onClick: () => navigate("/corporate")
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={item.onClick}
                  className="flex flex-col items-center text-center p-3 rounded-md hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-200 group focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-[#122544]/5 text-[#122544] group-hover:bg-[#122544] group-hover:text-[#E7A93B] flex items-center justify-center transition-colors mb-2">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-xs text-[#122544] group-hover:text-[#D2573F] transition-colors leading-tight">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-stone-500 mt-0.5 leading-tight hidden sm:block">
                    {item.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7: POPULAR DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#122544]/10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D2573F]">
              Explore Africa & International Wonders
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#122544] tracking-tight">
              EXPLORE YOUR NEXT DESTINATION
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              From African safaris and tropical beaches to city escapes and international adventures.
            </p>
          </div>

          <button
            onClick={() => navigate("/destinations")}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#122544] hover:text-[#D2573F] transition-colors"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.slice(0, 6).map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onSelect={onSelectDestination}
            />
          ))}
        </div>
      </section>

      {/* SECTION 8: FEATURED HOLIDAY PACKAGES (HOT HOLIDAY DEALS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#122544]/10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D2573F]">
              Handcrafted Itineraries
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#122544] tracking-tight">
              HOT HOLIDAY DEALS
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Carefully curated wildlife safaris, bush-and-beach combos, and tropical island retreats with transparent pricing and custom pacing.
            </p>
          </div>

          <button
            onClick={() => navigate("/packages")}
            className="px-5 py-2.5 rounded-sm bg-[#122544] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1f3860] transition-colors shadow-xs"
          >
            Browse All Holiday Packages
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotDeals.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              onSelect={onSelectPackage}
              onBookNow={onBookPackage}
            />
          ))}
        </div>
      </section>

      {/* SECTION 8.5: REAL EVIDENCE OF THE HOLIDAY HYPE (Zanzibar Ocean Jump Showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HolidayHypeVideoShowcase
          onBookZanzibar={() => navigate("/packages")}
        />
      </section>

      {/* SECTION 8.7: AUTHENTIC MOMENTS PHOTO EVIDENCE GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RealTravelGallery
          onPlanTrip={onOpenPlanTrip}
          navigate={navigate}
        />
      </section>

      {/* SECTION 9: PLAN YOUR TRIP SECTION (High-Conversion Interactive Form) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg p-6 sm:p-10 border border-[#122544]/15 shadow-lg">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D2573F]">
              Bespoke Travel Consultation
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#122544] tracking-tight">
              PLAN YOUR PERFECT TRIP
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Tell us where you want to go and what you need. We'll help you put the journey together.
            </p>
          </div>

          {planStatus === "success" ? (
            <div className="p-8 rounded-lg bg-emerald-50 border border-emerald-200 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-emerald-900">
                Your Travel Plan Request Has Been Received
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-lg mx-auto leading-relaxed">
                Thank you, {planForm.fullName}! Our travel team in Juba is reviewing your requirements for {planForm.destination}. We will prepare a customized proposal for you shortly.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={planFollowUpWhatsApp}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Follow Up on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setPlanStatus("idle")}
                  className="text-xs text-stone-600 hover:text-stone-900 underline"
                >
                  Submit another trip request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePlanSubmit} className="space-y-5">
              {planStatus === "error" && (
                <div className="p-3.5 rounded bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                  {planError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#122544]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={planForm.fullName}
                    onChange={(e) => setPlanForm({ ...planForm, fullName: e.target.value })}
                    placeholder="e.g. Deng James"
                    className="w-full px-3.5 py-2.5 rounded-sm border border-stone-300 text-xs focus:outline-none focus:border-[#122544]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#122544]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={planForm.email}
                    onChange={(e) => setPlanForm({ ...planForm, email: e.target.value })}
                    placeholder="name@email.com"
                    className="w-full px-3.5 py-2.5 rounded-sm border border-stone-300 text-xs focus:outline-none focus:border-[#122544]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#122544]">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={planForm.phone}
                    onChange={(e) => setPlanForm({ ...planForm, phone: e.target.value })}
                    placeholder="+211 ..."
                    className="w-full px-3.5 py-2.5 rounded-sm border border-stone-300 text-xs focus:outline-none focus:border-[#122544]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#122544]">
                    Destination
                  </label>
                  <select
                    value={planForm.destination}
                    onChange={(e) => setPlanForm({ ...planForm, destination: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-sm border border-stone-300 text-xs bg-stone-50 focus:outline-none focus:border-[#122544]"
                  >
                    <option>Kenya (Maasai Mara / Amboseli)</option>
                    <option>Tanzania (Serengeti / Ngorongoro)</option>
                    <option>Zanzibar (Beach & Stone Town)</option>
                    <option>Uganda (Gorillas & Primates)</option>
                    <option>South Sudan (Local Logistics & Travel)</option>
                    <option>Dubai (Shopping & Family Holiday)</option>
                    <option>South Africa (Cape Town & Kruger)</option>
                    <option>Rwanda</option>
                    <option>Other / Multi-Country</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#122544]">
                    Travel Date (Estimated)
                  </label>
                  <input
                    type="date"
                    value={planForm.travelDate}
                    onChange={(e) => setPlanForm({ ...planForm, travelDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-sm border border-stone-300 text-xs bg-stone-50 focus:outline-none focus:border-[#122544]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#122544]">
                    Number of Travellers
                  </label>
                  <select
                    value={planForm.travellerCount}
                    onChange={(e) => setPlanForm({ ...planForm, travellerCount: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-sm border border-stone-300 text-xs bg-stone-50 focus:outline-none focus:border-[#122544]"
                  >
                    <option>1 Solo Traveler</option>
                    <option>2 Travelers (Couple)</option>
                    <option>3-5 Travelers (Family/Small Group)</option>
                    <option>6-10 Travelers (Group)</option>
                    <option>10+ Travelers (Delegation/Organization)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#122544]">
                    Trip Type
                  </label>
                  <select
                    value={planForm.tripType}
                    onChange={(e) => setPlanForm({ ...planForm, tripType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-sm border border-stone-300 text-xs bg-stone-50 focus:outline-none focus:border-[#122544]"
                  >
                    <option>Leisure</option>
                    <option>Family</option>
                    <option>Honeymoon</option>
                    <option>Business</option>
                    <option>Safari</option>
                    <option>Group Travel</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#122544]">
                    Budget Range (Per Person / Total)
                  </label>
                  <select
                    value={planForm.budgetRange}
                    onChange={(e) => setPlanForm({ ...planForm, budgetRange: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-sm border border-stone-300 text-xs bg-stone-50 focus:outline-none focus:border-[#122544]"
                  >
                    <option>Under $1,500</option>
                    <option>$1,500 – $3,000</option>
                    <option>$3,000 – $5,000</option>
                    <option>$5,000+ (Luxury / Bespoke)</option>
                    <option>Flexible / Need Advice</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#122544]">
                  Additional Requirements
                </label>
                <textarea
                  rows={3}
                  value={planForm.requirements}
                  onChange={(e) => setPlanForm({ ...planForm, requirements: e.target.value })}
                  placeholder="Tell us about specific lodges, flights from Juba, dietary preferences, room arrangements, or special celebrations..."
                  className="w-full px-3.5 py-2.5 rounded-sm border border-stone-300 text-xs focus:outline-none focus:border-[#122544]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={planStatus === "submitting"}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-[#D2573F] hover:bg-[#b84a35] text-white font-semibold text-xs uppercase tracking-widest transition-all shadow-sm disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{planStatus === "submitting" ? "Submitting Plan..." : "GET MY TRAVEL PLAN"}</span>
                </button>

                <span className="text-xs text-stone-500">
                  Prefer direct assistance? Reach us at{" "}
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`} className="text-[#122544] font-semibold underline">
                    {siteConfig.contact.phone}
                  </a>
                </span>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* SECTION 10: SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#122544]/10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D2573F]">
              End-to-End Assistance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#122544] tracking-tight">
              TRAVEL SERVICES MADE SIMPLE
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              We provide practical, professional travel support for individual travelers, families, and organisations in Juba and beyond.
            </p>
          </div>

          <button
            onClick={() => navigate("/services")}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#122544] hover:text-[#D2573F] transition-colors"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={onSelectService}
              onInquire={onInquireService}
            />
          ))}
        </div>
      </section>

      {/* SECTION 11: FEATURED EXPERIENCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D2573F]">
            Travel by Passion
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#122544] tracking-tight">
            TRAVEL FOR THE EXPERIENCE
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Whether you are chasing the Big Five across the savanna or unwinding on white sand beaches, discover travel built around your passion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experienceCategories.map((exp, idx) => (
            <div
              key={idx}
              onClick={() => navigate(exp.path)}
              className="group relative rounded-lg overflow-hidden bg-stone-900 border border-stone-200 shadow-sm hover:shadow-md transition-all cursor-pointer h-72 flex flex-col justify-end p-6"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

              <div className="relative z-10 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E7A93B] block">
                  {exp.tag}
                </span>
                <h3 className="font-serif text-xl font-bold text-white leading-tight">
                  {exp.title}
                </h3>
                <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                  {exp.desc}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#E7A93B] group-hover:text-white transition-colors">
                  <span>Explore Packages</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 12: CORPORATE TRAVEL (Dedicated section for organisations & NGOs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-lg bg-[#122544] text-white p-8 sm:p-12 overflow-hidden border border-[#1F3860] shadow-md">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/10 text-[#E7A93B] text-xs font-semibold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>Organisations, Companies & NGOs</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                CORPORATE TRAVEL, WITHOUT THE HASSLE
              </h2>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
                From flights and accommodation to group movements and travel coordination, Holiday Hype helps organisations manage travel with less stress.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Corporate flight bookings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Hotel accommodation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Group travel & team missions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Juba Airport transfers & transport</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Conference & delegation travel</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Centralized travel coordination</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate("/corporate")}
                  className="px-6 py-3 rounded-sm bg-[#D2573F] hover:bg-[#b84a35] text-white font-semibold text-xs uppercase tracking-widest transition-all shadow-sm"
                >
                  REQUEST CORPORATE TRAVEL SUPPORT
                </button>

                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(
                    "Hello Holiday Hype Tours & Travel! I would like to inquire about Corporate Travel support for our organisation."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Corporate Desk</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#0B182B] p-6 rounded-lg border border-[#1F3860] space-y-4">
              <h3 className="font-serif font-bold text-base text-white">Direct Juba Operations Desk</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Located conveniently at Juba International Airport (opposite parking). Our operations team assists regional delegations, corporate executives, and field missions with fast responsiveness.
              </p>
              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#E7A93B]" />
                  <span>Juba International Airport, South Sudan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#E7A93B]" />
                  <span>{siteConfig.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#E7A93B]" />
                  <span>Mon – Sat: 8:00 AM – 7:00 PM (24/7 WhatsApp)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13: WHY HOLIDAY HYPE? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg p-8 sm:p-12 border border-[#122544]/10 shadow-xs">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D2573F]">
              The Holiday Hype Promise
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#122544] tracking-tight">
              WHY TRAVEL WITH HOLIDAY HYPE?
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Travel should be exciting — not stressful. We take care of the details so you can focus on the experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-sm bg-[#122544] text-[#E7A93B] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#122544]">
                PERSONALISED SERVICE
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Travel planning built around your specific schedule, preferences, and budget, with flexible pacing.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-11 h-11 rounded-sm bg-[#122544] text-[#E7A93B] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#122544]">
                LOCAL SUPPORT
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Accessible on-the-ground travel assistance from our office right at Juba International Airport.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-11 h-11 rounded-sm bg-[#122544] text-[#E7A93B] flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#122544]">
                CLEAR COMMUNICATION
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Straightforward information, transparent pricing, and responsive coordination throughout your journey.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-11 h-11 rounded-sm bg-[#122544] text-[#E7A93B] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#122544]">
                TRAVEL MADE SIMPLE
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We take care of the details. Flights, hotels, safari vehicles, and documentation are all seamlessly coordinated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 14: CUSTOMER FEEDBACK & COMMUNITY (No invented reviews) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-50 rounded-lg p-8 sm:p-10 border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D2573F]">
              Traveler Feedback
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#122544]">
              Share Your Holiday Hype Experience
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Have you recently traveled with Holiday Hype Tours & Travel? We value genuine feedback from our guests to continuously refine our safaris, flights, and travel assistance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(
                "Hello Holiday Hype Tours & Travel! I would like to share feedback regarding my recent trip."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider text-center transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Share on WhatsApp</span>
            </a>
            <button
              onClick={() => navigate("/contact")}
              className="w-full sm:w-auto px-5 py-2.5 rounded-sm border border-[#122544] text-[#122544] hover:bg-[#122544] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors text-center"
            >
              Contact Customer Care
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 15: TRAVEL INSPIRATION / BLOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#122544]/10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D2573F]">
              Guides & Advice
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#122544] tracking-tight">
              TRAVEL INSPIRATION
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Practical travel guides, destination tips, safari preparation advice, and visa guidance.
            </p>
          </div>

          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#122544] hover:text-[#D2573F] transition-colors"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(blogPosts || []).slice(0, 3).map((post) => (
            <article 
              key={post.id} 
              onClick={() => navigate(`/blog/${post.slug}`)}
              className="group bg-white rounded-lg overflow-hidden border border-[#122544]/10 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-sm bg-[#122544]/90 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[11px] text-stone-500">
                    <span>{post.publishedAt}</span>
                    <span>•</span>
                    <span>{post.readTimeMinutes} min read</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#122544] group-hover:text-[#D2573F] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-[#122544]">
                  <span className="text-[#D2573F] uppercase tracking-wider text-[11px]">Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D2573F] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 16: FINAL CONVERSION CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-lg bg-[#122544] text-white p-8 sm:p-12 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl border border-[#1F3860]">
          <div className="relative z-10 max-w-xl space-y-3 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#E7A93B]/20 text-[#E7A93B] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Start Planning With Holiday Hype
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Ready to Plan Your Next Journey?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Whether you need regional flights from Juba, a tailor-made safari in Kenya and Tanzania, or a relaxing beach holiday, our travel team is here to assist.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={onOpenPlanTrip}
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-[#D2573F] hover:bg-[#b84a35] text-white font-semibold text-xs uppercase tracking-widest shadow-xl transition-all"
            >
              PLAN MY TRIP
            </button>
            <a
              href={heroWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WHATSAPP US</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
