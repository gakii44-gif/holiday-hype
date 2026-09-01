import React, { useState } from "react";
import { siteConfig } from "../lib/config";
import { inquiriesRepository } from "../lib/repositories";
import { 
  Hotel, 
  Sparkles, 
  MapPin, 
  Star, 
  Calendar, 
  Users, 
  Check, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Bed, 
  Utensils, 
  Waves
} from "lucide-react";

export const HotelsPage: React.FC = () => {
  const [destinationArea, setDestinationArea] = useState("Masai Mara / Serengeti");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [accommodationStyle, setAccommodationStyle] = useState("Luxury Tented Bush Camp");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  
  const [submitting, setSubmitting] = useState(false);
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const featuredLodges = [
    {
      name: "Angama Mara",
      location: "Masai Mara Oloololo Escarpment, Kenya",
      tier: "Ultra-Luxury Safari Lodge",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
      highlights: ["Panoramic views over Mara Triangle", "Private vehicle & guide included", "Infinity pool on ridge"],
      priceFrom: "$1,450 / night"
    },
    {
      name: "Four Seasons Safari Lodge",
      location: "Central Serengeti, Tanzania",
      tier: "5-Star Luxury Wilderness",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
      highlights: ["Active watering hole in front of pool", "Full spa & fine dining", "Elevated wooden walkways"],
      priceFrom: "$1,250 / night"
    },
    {
      name: "The Z Hotel Zanzibar",
      location: "Nungwi Beach, Zanzibar",
      tier: "Boutique Beachfront Resort",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      highlights: ["Direct beach access on Nungwi", "Sunset rooftop cocktail bar", "PADI dive center"],
      priceFrom: "$380 / night"
    },
    {
      name: "Bisate Lodge",
      location: "Volcanoes National Park, Rwanda",
      tier: "Eco-Luxury Gorilla Sanctuary",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
      highlights: ["Spherical thatched villas", "Direct access to Gorilla treks", "Pioneering reforestation project"],
      priceFrom: "$1,980 / night"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !checkIn) {
      setErrorMsg("Please complete all required contact details and check-in date.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const lodgeInquiry = `Lodge Booking Request: Area: ${destinationArea} | Dates: ${checkIn} to ${checkOut || "Flexible"} | Guests: ${guests} | Rooms: ${rooms} | Preference: ${accommodationStyle} | Requests: ${specialRequests || "None"}`;

      const res = await inquiriesRepository.create({
        type: "hotel_reservation",
        fullName,
        email,
        phone,
        destinationInterest: destinationArea,
        travelDates: `${checkIn} to ${checkOut}`,
        travelersCount: guests,
        message: lodgeInquiry,
      });

      setConfirmedRef(res.referenceNumber);
    } catch {
      setErrorMsg("Failed to submit hotel inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-[#122544] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden space-y-4">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7A93B]/20 text-[#E7A93B] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Luxury Hospitality
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Safari Lodges & Coastal Beach Resorts
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            We hold direct contracted resident and non-resident luxury partner rates with East Africa's top boutique tented camps, private island resorts, and heritage city hotels.
          </p>
        </div>
      </div>

      {/* Booking Form & Featured Lodges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Form Container */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="font-serif text-2xl font-bold text-[#122544]">
              Request Lodge Availability & Exclusive Rates
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Guaranteed best rate matching, room upgrades, and VIP amenities.
            </p>
          </div>

          {confirmedRef ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#122544]">Hotel Inquiry Received!</h3>
              <p className="text-xs text-stone-600">
                Reference Code: <span className="font-mono font-bold text-[#122544]">{confirmedRef}</span>
              </p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Our lodge reservations concierge is checking live room allocations with our lodge partners and will email you confirmed availability at <span className="font-semibold">{email}</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Destination / Specific Lodge Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={destinationArea}
                    onChange={(e) => setDestinationArea(e.target.value)}
                    placeholder="e.g. Masai Mara, Serengeti, Diani Beach, Nairobi"
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Lodge Style Preference
                  </label>
                  <select
                    value={accommodationStyle}
                    onChange={(e) => setAccommodationStyle(e.target.value)}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
                  >
                    <option>Luxury Tented Bush Camp (Authentic Glamping)</option>
                    <option>5-Star Safari Lodge (Solid Suites & Pools)</option>
                    <option>Exclusive Private Bush Villa (Families / Groups)</option>
                    <option>All-Inclusive Beachfront Resort (Zanzibar / Diani)</option>
                    <option>Historic City Hotel (Nairobi / Arusha)</option>
                  </select>
                </div>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Check-in Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    min={checkIn || new Date().toISOString().split("T")[0]}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Guests
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Rooms
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={rooms}
                    onChange={(e) => setRooms(parseInt(e.target.value) || 1)}
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                  />
                </div>
              </div>

              {/* Guest Details */}
              <div className="pt-2 border-t border-stone-100 space-y-4">
                <h3 className="font-serif text-base font-bold text-[#122544]">
                  Guest Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#122544]">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Lead Guest"
                      className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#122544]">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#122544]">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+254 700 000 000"
                      className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544]">Meal Plan & Special Preferences</label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Full Board / Game Package, Honeymoon package, interconnecting rooms for kids..."
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3.5 rounded-xl bg-[#E7A93B] hover:bg-[#d89b30] text-[#122544] font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Checking Rates..." : "Request Lodge Availability"}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Sidebar: Featured Partner Lodges */}
        <div className="space-y-6">
          <div className="bg-[#122544] text-white rounded-3xl p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E7A93B]" />
              <span>Featured Partner Lodges</span>
            </h3>

            <div className="space-y-4">
              {featuredLodges.map((lodge, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-sm">{lodge.name}</h4>
                    <span className="text-[#E7A93B] font-bold text-xs">{lodge.priceFrom}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#E7A93B]" />
                    <span>{lodge.location}</span>
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {lodge.highlights.map((h, i) => (
                      <span key={i} className="text-[10px] bg-white/15 px-2 py-0.5 rounded text-slate-200">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
