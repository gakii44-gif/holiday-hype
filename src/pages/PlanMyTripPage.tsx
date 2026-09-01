import React, { useState } from "react";
import { Destination } from "../lib/types";
import { siteConfig } from "../lib/config";
import { inquiriesRepository } from "../lib/repositories";
import { 
  Sparkles, 
  MapPin, 
  Compass, 
  Calendar, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  MessageCircle,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

interface PlanMyTripPageProps {
  destinations: Destination[];
  onFinish?: () => void;
}

export const PlanMyTripPage: React.FC<PlanMyTripPageProps> = ({ destinations, onFinish }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Destination and Travel Style Selection
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(["Kenya"]);
  const [selectedStyle, setSelectedStyle] = useState<string>("Wildlife Safari");

  // Step 2: Dates, Duration & Budget
  const [travelMonth, setTravelMonth] = useState("July - September (Migration Season)");
  const [duration, setDuration] = useState("7 - 10 Days");
  const [budgetPerPerson, setBudgetPerPerson] = useState("$2,500 – $4,500 (Classic Luxury)");

  // Step 3: Travelers & Preferences
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [roomType, setRoomType] = useState("Luxury Tented Camp / Safari Lodge");
  const [specialInterest, setSpecialInterest] = useState("");

  // Step 4: Contact & Submission
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmedReference, setConfirmedReference] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const toggleDestination = (destName: string) => {
    if (selectedDestinations.includes(destName)) {
      if (selectedDestinations.length > 1) {
        setSelectedDestinations(selectedDestinations.filter(d => d !== destName));
      }
    } else {
      setSelectedDestinations([...selectedDestinations, destName]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      setErrorMsg("Please complete all contact details.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const notes = `Destinations: ${selectedDestinations.join(", ")} | Style: ${selectedStyle} | Timing: ${travelMonth} | Duration: ${duration} | Budget: ${budgetPerPerson} | Rooms: ${roomType} | Special Interest: ${specialInterest || "None"} | Country: ${country}`;

      const res = await inquiriesRepository.create({
        type: "custom_trip",
        fullName,
        email,
        phone,
        destinationInterest: selectedDestinations.join(" & "),
        travelDates: travelMonth,
        travelersCount: adultsCount + childrenCount,
        message: notes,
      });

      setConfirmedReference(res.referenceNumber);
    } catch {
      setErrorMsg("Submission failed. Please try again or reach out on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#122544] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7A93B]/20 text-[#E7A93B] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Travel Architect
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
          Plan Your Custom African Journey
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Tell us how you like to travel. Our senior safari experts will curate a private, day-by-day itinerary tailored to your exact dreams and budget.
        </p>

        {/* Step Indicator */}
        {!confirmedReference && (
          <div className="pt-4 flex items-center justify-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === s ? "w-8 bg-[#E7A93B]" : step > s ? "w-4 bg-emerald-500" : "w-4 bg-white/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Interactive Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl">
        {confirmedReference ? (
          /* Confirmation State */
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-bold text-[#122544]">
                Your Custom Safari Brief Is Ready!
              </h2>
              <p className="text-xs text-stone-500">
                Inquiry Reference: <span className="font-mono font-bold text-[#122544]">{confirmedReference}</span>
              </p>
              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-stone-900">{fullName}</span>. Our safari team has received your personalized specifications and is already designing your custom route.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-xs text-stone-700 max-w-md mx-auto space-y-1.5 text-left">
              <p><span className="font-bold">Destinations:</span> {selectedDestinations.join(", ")}</p>
              <p><span className="font-bold">Travel Timing:</span> {travelMonth} ({duration})</p>
              <p><span className="font-bold">Travelers:</span> {adultsCount} Adults, {childrenCount} Children</p>
              <p><span className="font-bold">Budget Tier:</span> {budgetPerPerson}</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hello Holiday Hype! I just submitted custom trip request ${confirmedReference} for ${selectedDestinations.join(", ")}. Looking forward to the proposal!`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Expedite via WhatsApp Concierge</span>
              </a>

              {onFinish && (
                <button
                  onClick={onFinish}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#122544] text-white font-semibold text-xs"
                >
                  Return to Home
                </button>
              )}
            </div>
          </div>
        ) : (
          <div>
            {errorMsg && (
              <div className="mb-6 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {errorMsg}
              </div>
            )}

            {/* STEP 1: Destinations & Travel Style */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#122544]">
                    Step 1: Select Your Dream Destinations & Travel Style
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Choose one or more regions you wish to explore (Multi-Country combinations supported).
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    "Kenya", 
                    "Tanzania", 
                    "Uganda", 
                    "Rwanda", 
                    "Zanzibar Island", 
                    "Victoria Falls", 
                    "Botswana", 
                    "Seychelles"
                  ].map((dest) => {
                    const isSelected = selectedDestinations.includes(dest);
                    return (
                      <button
                        key={dest}
                        type="button"
                        onClick={() => toggleDestination(dest)}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
                          isSelected 
                            ? "bg-[#122544] text-[#E7A93B] border-[#122544] shadow-sm" 
                            : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                        }`}
                      >
                        <span>{dest}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#E7A93B]" />}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-3 pt-4 border-t border-stone-100">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Primary Travel Style
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "Wildlife Safari", desc: "Big 5 Game Drives & River Crossings" },
                      { id: "Bush & Beach Combo", desc: "Safari followed by Tropical Coast" },
                      { id: "Gorilla Trekking", desc: "Rainforest Mountain Primate Expeditions" },
                      { id: "Luxury Fly-In", desc: "Private Cessna Bush Charters & Elite Lodges" },
                      { id: "Honeymoon & Romance", desc: "Star beds, candlelit dinners & seclusion" },
                      { id: "Family Adventure", desc: "Child-friendly camps, education & guides" },
                    ].map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setSelectedStyle(style.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all space-y-1 ${
                          selectedStyle === style.id
                            ? "bg-[#FAF8F5] border-[#122544] ring-1 ring-[#122544]"
                            : "bg-white border-stone-200 hover:border-stone-300"
                        }`}
                      >
                        <p className="font-bold text-xs text-[#122544]">{style.id}</p>
                        <p className="text-[11px] text-stone-500">{style.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl bg-[#E7A93B] hover:bg-[#d89b30] text-[#122544] font-bold text-xs shadow-sm flex items-center gap-2"
                  >
                    <span>Next: Timing & Budget</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Timing, Duration & Budget */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#122544]">
                    Step 2: Timing, Duration & Budget
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Help us align seasonal migration cycles and lodge tier availability.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Travel Window */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                      Ideal Travel Window
                    </label>
                    <select
                      value={travelMonth}
                      onChange={(e) => setTravelMonth(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs font-medium text-stone-900 focus:outline-none focus:border-[#122544]"
                    >
                      <option>July - September (Migration Mara River Crossings)</option>
                      <option>October - December (Calving Season & Warm Coast)</option>
                      <option>January - March (Serengeti Calving & Green Season)</option>
                      <option>April - June (Emerald Season / Lowest Rates)</option>
                      <option>Dates Flexible / Not Sure Yet</option>
                    </select>
                  </div>

                  {/* Duration */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                      Preferred Duration
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs font-medium text-stone-900 focus:outline-none focus:border-[#122544]"
                    >
                      <option>3 - 5 Days (Short Highlights)</option>
                      <option>6 - 8 Days (Classic Safari)</option>
                      <option>9 - 12 Days (Grand Safari & Beach)</option>
                      <option>13 - 18 Days (Comprehensive Multi-Country)</option>
                      <option>Custom Duration</option>
                    </select>
                  </div>
                </div>

                {/* Budget Tier */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Estimated Budget (USD Per Person, Excl. International Flights)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { tier: "$1,800 – $3,000", label: "Comfort Mid-Range", desc: "Quality tented camps & 4x4 safaris" },
                      { tier: "$3,000 – $5,500", label: "Classic Luxury", desc: "Premium wildlife lodges & private guides" },
                      { tier: "$6,000+", label: "Ultra Luxury / Exclusive", desc: "Private concessions & charter flights" },
                    ].map((b) => (
                      <button
                        key={b.tier}
                        type="button"
                        onClick={() => setBudgetPerPerson(b.tier)}
                        className={`p-3.5 rounded-xl border text-left transition-all space-y-1 ${
                          budgetPerPerson === b.tier
                            ? "bg-[#FAF8F5] border-[#122544] ring-1 ring-[#122544]"
                            : "bg-white border-stone-200 hover:border-stone-300"
                        }`}
                      >
                        <p className="font-bold text-xs text-[#122544]">{b.tier}</p>
                        <p className="text-[11px] font-semibold text-[#D2573F]">{b.label}</p>
                        <p className="text-[10px] text-stone-500">{b.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 text-stone-600 hover:text-[#122544] text-xs font-semibold flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-xl bg-[#E7A93B] hover:bg-[#d89b30] text-[#122544] font-bold text-xs shadow-sm flex items-center gap-2"
                  >
                    <span>Next: Party & Accommodation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Travelers & Preferences */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#122544]">
                    Step 3: Traveling Party & Preferences
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Tell us who is traveling and any special milestones.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#122544]">Adults (12+)</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                        className="w-8 h-8 rounded-lg bg-white border text-sm font-bold"
                      >
                        -
                      </button>
                      <span className="font-bold text-sm text-[#122544]">{adultsCount}</span>
                      <button
                        type="button"
                        onClick={() => setAdultsCount(adultsCount + 1)}
                        className="w-8 h-8 rounded-lg bg-white border text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#122544]">Children (&lt;12)</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                        className="w-8 h-8 rounded-lg bg-white border text-sm font-bold"
                      >
                        -
                      </button>
                      <span className="font-bold text-sm text-[#122544]">{childrenCount}</span>
                      <button
                        type="button"
                        onClick={() => setChildrenCount(childrenCount + 1)}
                        className="w-8 h-8 rounded-lg bg-white border text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Preferred Lodge / Camp Style
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs font-medium text-stone-900 focus:outline-none focus:border-[#122544]"
                  >
                    <option>Luxury Tented Camp (Immersive Safari Feel)</option>
                    <option>Classic Safari Lodge (Solid Architecture & Pools)</option>
                    <option>Private Villa / Exclusive Use Bush House</option>
                    <option>Mix of Safari Bush Camp & 5-Star Beach Resort</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Special Wishes or Occasion (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialInterest}
                    onChange={(e) => setSpecialInterest(e.target.value)}
                    placeholder="e.g. Honeymoon surprise, hot air ballooning over Mara, photography vehicle with beanbags..."
                    className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 text-stone-600 hover:text-[#122544] text-xs font-semibold flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-6 py-3 rounded-xl bg-[#E7A93B] hover:bg-[#d89b30] text-[#122544] font-bold text-xs shadow-sm flex items-center gap-2"
                  >
                    <span>Next: Contact Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Contact & Submission */}
            {step === 4 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#122544]">
                    Step 4: Where Should We Send Your Proposal?
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    No payment is required today. We will prepare your free, customized itemized itinerary.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@example.com"
                      className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 555 234 5678"
                      className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                      Country of Residence
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. United Kingdom, USA, Australia"
                      className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Your privacy is 100% safeguarded. We never share traveler information with third parties.</span>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-4 py-2.5 text-stone-600 hover:text-[#122544] text-xs font-semibold flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3.5 rounded-xl bg-[#E7A93B] hover:bg-[#d89b30] text-[#122544] font-bold text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? "Transmitting Proposal..." : "Request My Custom Proposal"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
