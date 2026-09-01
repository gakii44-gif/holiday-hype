import React, { useState } from "react";
import { siteConfig } from "../lib/config";
import { inquiriesRepository } from "../lib/repositories";
import { 
  Plane, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  Users, 
  ArrowRight,
  Luggage,
  MapPin
} from "lucide-react";

export const FlightsPage: React.FC = () => {
  const [tripType, setTripType] = useState<"roundtrip" | "oneway" | "charter">("roundtrip");
  const [fromCity, setFromCity] = useState("Nairobi (NBO / Wilson)");
  const [toCity, setToCity] = useState("Masai Mara (Keekorok / Mara North)");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(2);
  const [flightClass, setFlightClass] = useState("Economy / Standard Bush");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");
  
  const [submitting, setSubmitting] = useState(false);
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const popularRoutes = [
    { from: "Nairobi Wilson (WIL)", to: "Masai Mara Airstrips", time: "45 mins", type: "Scheduled Bush Plane" },
    { from: "Nairobi Wilson (WIL)", to: "Amboseli Airstrip", time: "35 mins", type: "Scheduled Bush Plane" },
    { from: "Nairobi (NBO)", to: "Mombasa / Diani Beach (UKA)", time: "1 hr", type: "Coastal Jet / Caravan" },
    { from: "Kilimanjaro (JRO)", to: "Serengeti Seronera (SEU)", time: "50 mins", type: "Tanzania Bush Flight" },
    { from: "Entebbe (EBB)", to: "Kihihi / Bwindi Impenetrable", time: "1 hr 15 mins", type: "Gorilla Flight Link" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !departureDate) {
      setErrorMsg("Please complete all required fields including departure date.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const flightDetails = `Flight Inquiry: ${tripType.toUpperCase()} | From: ${fromCity} -> To: ${toCity} | Dep Date: ${departureDate} | Ret Date: ${returnDate || "N/A"} | Pax: ${passengers} | Class: ${flightClass} | Notes: ${specialNotes || "None"}`;

      const res = await inquiriesRepository.create({
        type: "flight_booking",
        fullName,
        email,
        phone,
        destinationInterest: `${fromCity} to ${toCity}`,
        travelDates: `${departureDate} to ${returnDate || "One Way"}`,
        travelersCount: passengers,
        message: flightDetails,
      });

      setConfirmedRef(res.referenceNumber);
    } catch {
      setErrorMsg("Failed to submit flight inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Banner */}
      <div className="bg-[#122544] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden space-y-4">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7A93B]/20 text-[#E7A93B] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Aviation & Bush Air Charters
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Domestic & International Flight Bookings
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Direct connections between Nairobi, Mombasa, Zanzibar, Serengeti, Entebbe, and secluded wilderness airstrips with premier carriers and private charter aircraft.
          </p>
        </div>
      </div>

      {/* Flight Request Form & Popular Routes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Form Container */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="font-serif text-2xl font-bold text-[#122544]">
              Request Flight Quotation & Availability
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Competitive rates with SafariLink, AirKenya, Precision Air, Kenya Airways, and private twin-engine turboprops.
            </p>
          </div>

          {confirmedRef ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#122544]">Flight Request Dispatched!</h3>
              <p className="text-xs text-stone-600">
                Reference Code: <span className="font-mono font-bold text-[#122544]">{confirmedRef}</span>
              </p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Our aviation desk is verifying seat availability and fare classes. You will receive an itemized quote at <span className="font-semibold">{email}</span> within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  {errorMsg}
                </div>
              )}

              {/* Trip Type Tabs */}
              <div className="flex gap-2">
                {[
                  { id: "roundtrip", label: "Round Trip" },
                  { id: "oneway", label: "One Way" },
                  { id: "charter", label: "Private Bush Charter" },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setTripType(type.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      tripType === type.id
                        ? "bg-[#122544] text-white shadow-sm"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Origin and Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Departure City / Airstrip *
                  </label>
                  <input
                    type="text"
                    required
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    placeholder="e.g. Nairobi Wilson Airport"
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Destination City / Airstrip *
                  </label>
                  <input
                    type="text"
                    required
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    placeholder="e.g. Masai Mara / Serengeti / Zanzibar"
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
                  />
                </div>
              </div>

              {/* Dates & Passengers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Departure Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
                  />
                </div>

                {tripType === "roundtrip" && (
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                      Return Date
                    </label>
                    <input
                      type="date"
                      min={departureDate || new Date().toISOString().split("T")[0]}
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Passengers
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-2 border-t border-stone-100 space-y-4">
                <h3 className="font-serif text-base font-bold text-[#122544]">
                  Passenger Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#122544]">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Lead Passenger"
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
                  <label className="block text-xs font-bold text-[#122544]">Special Baggage / Medical Requirements</label>
                  <input
                    type="text"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="e.g. Photography equipment bags, soft luggage requirements, elderly assistance..."
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
                  <span>{submitting ? "Searching Fares..." : "Request Flight Quotation"}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Sidebar: Popular Routes & Bush Flight Tips */}
        <div className="space-y-6">
          <div className="bg-[#122544] text-white rounded-3xl p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <Plane className="w-5 h-5 text-[#E7A93B]" />
              <span>Popular Safari Flight Routes</span>
            </h3>

            <div className="space-y-3 text-xs">
              {popularRoutes.map((route, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span className="truncate">{route.from}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E7A93B] flex-shrink-0 mx-1" />
                    <span className="truncate text-right">{route.to}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>{route.type}</span>
                    <span className="text-[#E7A93B] font-semibold">{route.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-stone-200 space-y-3 text-xs text-stone-700">
            <h4 className="font-serif text-base font-bold text-[#122544] flex items-center gap-2">
              <Luggage className="w-4 h-4 text-[#D2573F]" />
              <span>Bush Flight Baggage Rules</span>
            </h4>
            <p className="leading-relaxed">
              Bush flights across Masai Mara, Serengeti, and Amboseli enforce a strict <strong>15 kg (33 lbs)</strong> baggage allowance per passenger in <em>soft-sided duffel bags</em> (no hard suitcases).
            </p>
            <p className="text-stone-500 text-[11px]">
              Excess baggage storage is available complimentary at our Nairobi lounge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
