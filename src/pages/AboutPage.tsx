import React from "react";
import { siteConfig } from "../lib/config";
import { 
  Compass, 
  ShieldCheck, 
  Award, 
  HeartHandshake, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  TreePine,
  Target
} from "lucide-react";

interface AboutPageProps {
  onOpenPlanTrip: () => void;
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenPlanTrip, navigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Header */}
      <div className="bg-[#122544] text-white rounded-3xl p-8 sm:p-16 relative overflow-hidden space-y-4">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7A93B]/20 text-[#E7A93B] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Our Heritage & Purpose
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            About Holiday Hype Tours & Travel
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Born out of a deep reverence for Africa's untamed landscapes, we have spent over 12 years connecting discerning global travelers with authentic safari adventures and sustainable conservation.
          </p>
        </div>
      </div>

      {/* Mission, Vision & Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#122544] text-[#E7A93B] flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[#122544]">Our Mission</h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            To craft transformative, ethically grounded journeys across Africa that exceed guest expectations while directly conserving wildlife habitats and empowering indigenous host communities.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#122544] text-[#E7A93B] flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[#122544]">Our Vision</h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            To be East Africa's most trusted, guest-centric, and sustainable bespoke tour operator, renowned for unmatched local knowledge, private aviation agility, and culinary excellence in the bush.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#122544] text-[#E7A93B] flex items-center justify-center">
            <TreePine className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[#122544]">Conservation Pledge</h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            We operate strictly under "Leave No Trace" principles. A portion of every safari booked is channeled directly to community ranger patrols, anti-poaching units, and reforestation initiatives.
          </p>
        </div>
      </div>

      {/* Leadership & Story */}
      <div className="bg-white rounded-3xl p-8 sm:p-14 border border-stone-200 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D2573F]">
            The Journey So Far
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#122544]">
            Rooted in Nairobi, Guiding the Entire Continent
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            Founded with a single 4x4 safari cruiser and an unwavering love for the African wilderness, Holiday Hype Tours & Travel has grown into a premier destination management company. Headquartered in Nairobi with field operational hubs in Arusha and Kampala, we provide direct on-the-ground support across Kenya, Tanzania, Uganda, Rwanda, Zanzibar, and Southern Africa.
          </p>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            Our team comprises veteran safari designers, licensed wildlife naturalists, aviation coordinators, and dedicated 24/7 guest concierges who ensure flawless execution from airport arrival to farewell.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
            <div>
              <span className="font-serif text-3xl font-bold text-[#122544]">{siteConfig.stats.yearsExperience}</span>
              <p className="text-xs text-stone-500 font-medium">Years in Operation</p>
            </div>
            <div>
              <span className="font-serif text-3xl font-bold text-[#122544]">{siteConfig.stats.travelersServed}</span>
              <p className="text-xs text-stone-500 font-medium">Guests Hosted</p>
            </div>
            <div>
              <span className="font-serif text-3xl font-bold text-[#122544]">{siteConfig.stats.destinationsCount}</span>
              <p className="text-xs text-stone-500 font-medium">African Destinations</p>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-lg h-[380px]">
          <img
            src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80"
            alt="Safari guides and 4x4 cruiser in Serengeti"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Official Accreditations */}
      <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border border-stone-200 text-center space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[#122544]">
          Licensed, Bonded & Recognized
        </h2>
        <p className="text-xs text-stone-600 max-w-xl mx-auto">
          We maintain full compliance and active membership with leading East African tourism boards and safety authorities.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#122544]">
          <div className="px-5 py-3 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#E7A93B]" />
            <span>{siteConfig.accreditation.katoMember}</span>
          </div>
          <div className="px-5 py-3 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{siteConfig.accreditation.ecotourismKenya}</span>
          </div>
          <div className="px-5 py-3 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-[#D2573F]" />
            <span>License: {siteConfig.accreditation.licenseNo}</span>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-4">
        <h3 className="font-serif text-2xl font-bold text-[#122544]">
          Begin Your Safari Story Today
        </h3>
        <button
          onClick={onOpenPlanTrip}
          className="px-8 py-4 rounded-xl bg-[#E7A93B] hover:bg-[#d89b30] text-[#122544] font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
        >
          <Compass className="w-4 h-4" />
          <span>Plan My Custom Safari</span>
        </button>
      </div>
    </div>
  );
};
