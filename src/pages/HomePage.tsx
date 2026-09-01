import React, { useState } from "react";
import { siteConfig } from "../lib/config";
import { Destination, HolidayPackage, TravelService, Testimonial, BlogPost } from "../lib/types";
import { PackageCard } from "../components/PackageCard";
import { DestinationCard } from "../components/DestinationCard";
import { ServiceCard } from "../components/ServiceCard";
import { 
  Compass, 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Award, 
  HeartHandshake, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Users,
  Palmtree,
  Quote
} from "lucide-react";

interface HomePageProps {
  destinations: Destination[];
  packages: HolidayPackage[];
  services: TravelService[];
  testimonials: Testimonial[];
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
  destinations,
  packages,
  services,
  testimonials,
  blogPosts,
  navigate,
  onSelectPackage,
  onBookPackage,
  onSelectDestination,
  onSelectService,
  onInquireService,
  onOpenPlanTrip,
}) => {
  // Quick Search Widget State
  const [searchDestination, setSearchDestination] = useState("all");
  const [searchStyle, setSearchStyle] = useState("all");
  const [searchDuration, setSearchDuration] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/tours?dest=${searchDestination}&style=${searchStyle}&duration=${searchDuration}`);
  };

  const popularPackages = packages.filter(p => p.popular || p.featured).slice(0, 6);
  const featuredDestinations = destinations.slice(0, 6);

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[#122544] text-white px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        {/* Background Image with Gradient Mask */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=85"
            alt="African Safari Savannah with Elephants and Sunset"
            className="w-full h-full object-cover brightness-[0.45] scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#122544] via-[#122544]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#122544]/80 via-transparent to-[#122544]/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E7A93B] text-xs sm:text-sm font-semibold tracking-wide shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Sparkles className="w-4 h-4 text-[#E7A93B]" />
            <span>Award-Winning East African Safari & Global Travel Architects</span>
          </div>

          {/* Display Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
            Crafting Unforgettable <span className="text-[#E7A93B]">African Safaris</span> & Bespoke Journeys
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed">
            From the thunderous drama of the Great Migration and rare Mountain Gorilla encounters to pristine Zanzibar beaches and private bush flights.
          </p>

          {/* Search Widget Card */}
          <div className="pt-4 max-w-4xl mx-auto">
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-lg p-4 sm:p-5 shadow-xl border border-[#122544]/10 text-left grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end"
            >
              {/* Destination Dropdown */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D2573F]" />
                  <span>Destination</span>
                </label>
                <select
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-sm bg-stone-50 border border-stone-300 text-stone-900 text-xs font-medium focus:outline-none focus:border-[#122544]"
                >
                  <option value="all">All Destinations (East & Southern Africa)</option>
                  {destinations.map(d => (
                    <option key={d.id} value={d.slug}>{d.name}</option>
                  ))}
                </select>
              </div>

              {/* Travel Style */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-[#D2573F]" />
                  <span>Travel Style</span>
                </label>
                <select
                  value={searchStyle}
                  onChange={(e) => setSearchStyle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-sm bg-stone-50 border border-stone-300 text-stone-900 text-xs font-medium focus:outline-none focus:border-[#122544]"
                >
                  <option value="all">All Styles</option>
                  <option value="Wildlife Safari">Wildlife Safari (Big 5)</option>
                  <option value="Luxury Safari">Luxury Safari Lodges</option>
                  <option value="Bush & Beach Combo">Bush & Beach Combo</option>
                  <option value="Gorilla Trekking">Gorilla Trekking</option>
                  <option value="Beach & Coastal">Beach & Island Relaxation</option>
                  <option value="Honeymoon & Romance">Honeymoon & Romance</option>
                </select>
              </div>

              {/* Duration */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D2573F]" />
                  <span>Trip Duration</span>
                </label>
                <select
                  value={searchDuration}
                  onChange={(e) => setSearchDuration(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-sm bg-stone-50 border border-stone-300 text-stone-900 text-xs font-medium focus:outline-none focus:border-[#122544]"
                >
                  <option value="all">Any Duration</option>
                  <option value="1-3 days">1 to 3 Days (Short Escape)</option>
                  <option value="4-7 days">4 to 7 Days (Classic Safari)</option>
                  <option value="8-14 days">8 to 14 Days (Grand Safari)</option>
                  <option value="15+ days">15+ Days (Extended Expedition)</option>
                </select>
              </div>

              {/* Search CTA */}
              <div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-sm bg-[#D2573F] hover:bg-[#b84a35] text-white font-semibold text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-1.5 h-[42px]"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Find Safaris</span>
                </button>
              </div>
            </form>
          </div>

          {/* Trust Highlights */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-xs text-slate-300">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E7A93B] flex-shrink-0" />
              <span>Licensed & KATO Bonded</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E7A93B] flex-shrink-0" />
              <span>100% Tailor-Made Itineraries</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#E7A93B] flex-shrink-0" />
              <span>24/7 Dedicated Concierge</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-current flex-shrink-0" />
              <span>4.95/5 Rating ({siteConfig.stats.fiveStarReviews} Reviews)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRAVEL SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#122544]/10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D2573F]">
              Comprehensive Travel Solutions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#122544] tracking-tight">
              Our Travel Services
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              From bespoke private 4x4 safaris and scheduled bush plane flights to luxury beachfront resorts and corporate MICE logistics.
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

      {/* 3. POPULAR HOLIDAYS & SAFARIS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#122544]/10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D2573F]">
              Handcrafted African Itineraries
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#122544] tracking-tight">
              Popular Holiday Packages
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Carefully curated wildlife expeditions and tropical island retreats with guaranteed departures and transparent pricing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/packages")}
              className="px-5 py-2.5 rounded-sm bg-[#122544] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1f3860] transition-colors shadow-sm"
            >
              Browse All Packages
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              onSelect={onSelectPackage}
              onBookNow={onBookPackage}
            />
          ))}
        </div>
      </section>

      {/* 4. DESTINATIONS SHOWCASE */}
      <section className="bg-[#122544] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-white/10">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E7A93B]">
                Iconic Destinations
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Explore East Africa & Beyond
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Discover the untamed plains of Kenya and Tanzania, the gorilla rainforests of Uganda and Rwanda, and the turquoise lagoons of Zanzibar.
              </p>
            </div>

            <button
              onClick={() => navigate("/destinations")}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E7A93B] hover:text-white transition-colors"
            >
              <span>Explore All Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onSelect={onSelectDestination}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg p-8 sm:p-12 border border-[#122544]/10 shadow-sm">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D2573F]">
              The Holiday Hype Distinction
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#122544] tracking-tight">
              Why Travel With Us
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              We are not an anonymous booking engine. We are homegrown East African safari architects living and breathing the bush.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-sm bg-[#122544] text-[#E7A93B] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#122544]">
                Local Safari Specialists
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Direct on-the-ground presence in Nairobi, Arusha, and Kampala with KPSGA certified master driver-guides.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-11 h-11 rounded-sm bg-[#122544] text-[#E7A93B] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#122544]">
                Transparent Value
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                No hidden park fee surcharges or surprise billing. Complete breakdown of meals, 4x4 vehicles, and flights.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-11 h-11 rounded-sm bg-[#122544] text-[#E7A93B] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#122544]">
                Sustainable Tourism
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every booking directly funds wildlife anti-poaching patrols, community conservancies, and eco-camp partnerships.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-11 h-11 rounded-sm bg-[#122544] text-[#E7A93B] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#122544]">
                100% Tailored Perfection
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Unlimited revisions until your itinerary matches your ideal travel pace, room preferences, and budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS (4 Simple Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D2573F]">
            Effortless Safari Planning
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#122544] tracking-tight">
            How It Works
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Planning an unforgettable African adventure is simple and completely stress-free with our expert team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Share Your Vision",
              desc: "Tell us your dream destinations, dates, travel style, group size, and must-see wildlife."
            },
            {
              step: "02",
              title: "Custom Itinerary Curation",
              desc: "Your dedicated safari designer creates an itemized day-by-day proposal with lodge photos and flight routes."
            },
            {
              step: "03",
              title: "Refine & Confirm",
              desc: "Fine-tune every lodge and activity until perfect, then secure with a flexible deposit."
            },
            {
              step: "04",
              title: "Embark on Safari",
              desc: "Arrive in Africa to VIP airport greeting, private 4x4 Land Cruiser, and 24/7 concierge support."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-white border border-[#122544]/10 shadow-sm flex flex-col justify-between">
              <span className="font-mono text-3xl font-extrabold text-[#E7A93B]">
                {item.step}
              </span>
              <div className="mt-4 space-y-1.5">
                <h3 className="font-serif text-base font-bold text-[#122544]">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={onOpenPlanTrip}
            className="px-8 py-3 rounded-sm bg-[#D2573F] hover:bg-[#b84a35] text-white font-semibold text-xs uppercase tracking-widest shadow-md transition-all inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Start Designing My Custom Trip</span>
          </button>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="bg-stone-200/50 py-16 sm:py-20 border-y border-[#122544]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D2573F]">
              Traveler Stories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#122544] tracking-tight">
              What Our Guests Say
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Read authentic feedback from couples, families, and solo explorers who journeyed with Holiday Hype.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((test) => (
              <div key={test.id} className="bg-white rounded-lg p-6 border border-[#122544]/10 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-stone-200" />
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed italic">
                    "{test.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-[#122544]">{test.clientName}</h4>
                  <p className="text-[11px] text-stone-500">{test.originCountry} • {test.travelerType}</p>
                  <p className="text-[10px] text-[#D2573F] font-semibold mt-1 truncate">{test.packageTaken}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BLOG PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#122544]/10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D2573F]">
              Safari Wisdom & Guides
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#122544] tracking-tight">
              Latest from the Safari Blog
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Expert wildlife packing lists, Great Migration timelines, and destination comparisons written by veteran safari guides.
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
          {blogPosts.slice(0, 3).map((post) => (
            <article 
              key={post.id} 
              onClick={() => navigate(`/blog/${post.slug}`)}
              className="group bg-white rounded-lg overflow-hidden border border-[#122544]/10 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

      {/* 9. PLAN MY TRIP CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative rounded-lg bg-[#122544] text-white p-8 sm:p-14 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl border border-[#1F3860]">
          <div className="relative z-10 max-w-xl space-y-3 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#E7A93B]/20 text-[#E7A93B] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Tailor-Made Safari Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Ready to Plan Your Dream African Journey?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Share your travel aspirations and let our veteran safari architects build a bespoke, zero-obligation proposal tailored specifically to your pacing and budget.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={onOpenPlanTrip}
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-[#D2573F] hover:bg-[#b84a35] text-white font-semibold text-xs uppercase tracking-widest shadow-xl transition-all"
            >
              Start Custom Trip Designer
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="w-full sm:w-auto px-6 py-3.5 rounded-sm bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition-colors"
            >
              Contact Travel Specialist
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
