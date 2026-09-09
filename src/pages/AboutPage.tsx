import React from "react";
import { siteConfig } from "../lib/config";
import { Logo } from "../components/Logo";
import { HolidayHypeVideoShowcase } from "../components/HolidayHypeVideoShowcase";
import { RealTravelGallery } from "../components/RealTravelGallery";
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
  Target,
  Plane,
  MessageCircle,
  ExternalLink,
  Phone,
  Mail,
  UserCheck
} from "lucide-react";

interface AboutPageProps {
  onOpenPlanTrip: () => void;
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenPlanTrip, navigate }) => {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(
    siteConfig.contact.whatsappMessage
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Header */}
      <div className="bg-[#122544] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden space-y-6 border border-[#1F3860] shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7A93B]/20 text-[#E7A93B] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Come, Travel & Experience
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            About Holiday Hype Travel & Tours
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {siteConfig.slogan}. Located conveniently at Juba International Airport opposite parking, we provide world-class flight ticketing, SGR bookings, air charters, visa processing, car hire, and bespoke African safari expeditions.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp: {siteConfig.contact.phone}</span>
            </a>
            <a
              href={siteConfig.contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-600 transition-all"
            >
              <MapPin className="w-4 h-4 text-[#E7A93B]" />
              <span>Location on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-md flex-shrink-0 text-center flex items-center justify-center">
          <Logo variant="light" size="lg" />
        </div>
      </div>

      {/* Mission, Vision & Operations Leadership */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#122544] text-[#E7A93B] flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[#122544]">Our Mission</h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            To provide seamless, reliable, and exceptional travel and ticketing solutions across South Sudan, East Africa, and worldwide destinations, ensuring every journey is memorable, stress-free, and cost-effective.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#122544] text-[#E7A93B] flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[#122544]">Our Vision</h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            To be the foremost and most trusted travel agency in South Sudan and East Africa, renowned for swift flight booking, dependable airport meet & assist, and personalized holiday experiences.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#122544] text-[#E7A93B] flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[#122544]">Operations Leadership</h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Led by <strong>{siteConfig.contact.headOfOperations}</strong> ({siteConfig.contact.headOfOperationsTitle}), our experienced operations team guarantees prompt service, reliable itineraries, and 24/7 client support.
          </p>
        </div>
      </div>

      {/* Leadership & Story */}
      <div className="bg-white rounded-3xl p-8 sm:p-14 border border-stone-200 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D2573F]">
            Our Presence & Operations
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#122544]">
            Hub at Juba International Airport & Regional Connections
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            Holiday Hype Travel & Tours is strategically positioned directly opposite the parking area at Juba International Airport. This prime location allows our team to deliver real-time flight ticket issuance, instant airport handling, VIP passenger meet-and-assist, and fast luggage handling.
          </p>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            Through our Nairobi liaison office and extensive network of partner airlines, hotels, and safari operators, we coordinate journeys seamlessly across Kenya, Tanzania, Uganda, Rwanda, Dubai, Europe, and beyond.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
            <div className="bg-stone-50 p-3.5 rounded-sm border border-stone-200">
              <span className="font-serif text-sm font-bold text-[#122544] block">Airport Office</span>
              <p className="text-xs text-stone-600 font-normal">Opposite Parking, Juba International Airport</p>
            </div>
            <div className="bg-stone-50 p-3.5 rounded-sm border border-stone-200">
              <span className="font-serif text-sm font-bold text-[#122544] block">24/7 WhatsApp</span>
              <p className="text-xs text-stone-600 font-normal">Direct traveler care: +211 926 225 156</p>
            </div>
            <div className="bg-stone-50 p-3.5 rounded-sm border border-stone-200">
              <span className="font-serif text-sm font-bold text-[#122544] block">Full Service</span>
              <p className="text-xs text-stone-600 font-normal">Flights, Safaris, Hotels & Visas</p>
            </div>
          </div>
        </div>

        <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-stone-300 shadow-sm aspect-[4/3] bg-stone-900">
              <img
                src="/images/holiday_hype_office_consultant.jpg"
                alt="Holiday Hype Juba Travel Operations Desk & Ticketing"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
                <span className="text-[11px] font-semibold text-white block">
                  Juba Airport Operations Desk
                </span>
                <span className="text-[10px] text-amber-300 block">
                  flydubai, Golden Wings & International Ticketing
                </span>
              </div>
            </div>

            <h3 className="font-serif text-xl font-bold text-[#122544] border-b border-stone-200 pb-3">
              Direct Contact & Airport Office
            </h3>
          </div>
          
          <div className="space-y-3.5 text-xs text-stone-700">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900">Headquarters Address:</strong>
                <span>{siteConfig.contact.address}</span>
                <a
                  href={siteConfig.contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#E7A93B] hover:underline font-semibold mt-0.5"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-stone-200">
              <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900">Direct Telephone & WhatsApp:</strong>
                <span>{siteConfig.contact.phone} (Primary)</span>
                <span className="block text-stone-500">{siteConfig.contact.secondaryPhone} (Juba Line)</span>
                <span className="block text-stone-500">{siteConfig.contact.kenyaPhone} (Kenya Line)</span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-stone-200">
              <Mail className="w-4 h-4 text-[#122544] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900">Official Emails:</strong>
                <a href={`mailto:${siteConfig.contact.email}`} className="text-blue-700 hover:underline block break-all font-medium">
                  {siteConfig.contact.email}
                </a>
                <a href={`mailto:${siteConfig.contact.secondaryEmail}`} className="text-stone-600 hover:underline block break-all">
                  {siteConfig.contact.secondaryEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Services Offered */}
      <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border border-stone-200 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-serif text-2xl font-bold text-[#122544]">
            Complete Travel Solutions Under One Roof
          </h2>
          <p className="text-xs text-stone-600">
            From domestic airline ticketing to comprehensive international safaris and VIP transport.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs font-semibold text-[#122544]">
          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-2.5">
            <Plane className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>Flight Booking</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>SGR Train Booking</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-2.5">
            <Compass className="w-4 h-4 text-[#E7A93B] flex-shrink-0" />
            <span>Air Charters</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <span>Visa Processing</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-2.5">
            <Award className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Car Hire & Rentals</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-2.5">
            <HeartHandshake className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>Hotel Reservations</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-2.5">
            <Users className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span>Airport Handling</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-2.5">
            <TreePine className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>Safari Packages</span>
          </div>
        </div>
      </div>

      {/* Live Evidence of the Hype */}
      <div className="space-y-4">
        <HolidayHypeVideoShowcase onBookZanzibar={() => navigate("/packages")} />
      </div>

      {/* Real Travel Gallery - Authentic Photo Evidence */}
      <div className="space-y-4">
        <RealTravelGallery onPlanTrip={onOpenPlanTrip} navigate={navigate} />
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-4">
        <h3 className="font-serif text-2xl font-bold text-[#122544]">
          Ready to Travel or Book Flights?
        </h3>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp: {siteConfig.contact.phone}</span>
          </a>
          <button
            onClick={() => navigate("/contact")}
            className="px-8 py-3.5 rounded-xl bg-[#122544] hover:bg-[#1f3860] text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Send Direct Inquiry</span>
          </button>
        </div>
      </div>
    </div>
  );
};

