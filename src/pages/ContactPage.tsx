import React, { useState } from "react";
import { siteConfig } from "../lib/config";
import { contactRepository } from "../lib/repositories";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  MessageCircle, 
  Sparkles,
  AlertCircle,
  ExternalLink,
  Navigation,
  UserCheck,
  Plane,
  Building2
} from "lucide-react";

export const ContactPage: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Flight Booking & Ticketing");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) {
      setErrorMsg("Please fill in your name, email, and message.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      await contactRepository.create({
        fullName,
        email,
        phone,
        subject,
        message,
      });

      setStatus("success");
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg("Failed to send message. Please contact us via WhatsApp or phone.");
    }
  };

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(
    siteConfig.contact.whatsappMessage
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-[#122544] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden space-y-4 shadow-xl border border-[#1F3860]">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7A93B]/20 text-[#E7A93B] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            24/7 Travel & Ticketing Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Contact Holiday Hype Travel & Tours
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Located conveniently opposite parking at Juba International Airport. Connect directly with our operations team for flights, SGR bookings, air charters, visa processing, car rentals, and luxury holidays.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Direct: {siteConfig.contact.phone}</span>
            </a>
            <a
              href={siteConfig.contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-600 transition-all"
            >
              <MapPin className="w-4 h-4 text-[#E7A93B]" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid: Contact Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Contact Cards & Office Details */}
        <div className="space-y-6">
          {/* Direct Channels Card */}
          <div className="bg-[#122544] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-md border border-[#1F3860]">
            <h2 className="font-serif text-xl font-bold text-white border-b border-slate-700 pb-3 flex items-center justify-between">
              <span>Direct Channels</span>
              <span className="text-[10px] uppercase tracking-wider font-sans text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700">Online Now</span>
            </h2>

            <div className="space-y-4 text-xs">
              {/* Location */}
              <div className="space-y-1">
                <span className="text-slate-400 font-medium">Head Office (Juba)</span>
                <p className="text-white font-semibold flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#E7A93B] flex-shrink-0 mt-0.5" />
                  <span>{siteConfig.contact.address}</span>
                </p>
                <a
                  href={siteConfig.contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#E7A93B] hover:underline text-[11px] pt-0.5 ml-6"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Navigate with Google Maps</span>
                </a>
              </div>

              {/* Head of Operations */}
              <div className="space-y-1 pt-2 border-t border-slate-800">
                <span className="text-slate-400 font-medium">Operations Leadership</span>
                <p className="text-white font-semibold flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#E7A93B] flex-shrink-0" />
                  <span>{siteConfig.contact.headOfOperations}</span>
                  <span className="text-[11px] text-slate-400 font-normal">({siteConfig.contact.headOfOperationsTitle})</span>
                </p>
              </div>

              {/* Primary Phone & WhatsApp */}
              <div className="space-y-1 pt-2 border-t border-slate-800">
                <span className="text-slate-400 font-medium">Primary WhatsApp & Calls (Juba)</span>
                <p className="text-white font-semibold flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`} className="hover:text-[#E7A93B] transition-colors">
                    {siteConfig.contact.phone}
                  </a>
                </p>
              </div>

              {/* Secondary Phone */}
              <div className="space-y-1">
                <span className="text-slate-400 font-medium">Alternative Juba Hotline</span>
                <p className="text-white font-semibold flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#E7A93B] flex-shrink-0" />
                  <a href={`tel:${siteConfig.contact.secondaryPhone.replace(/\s+/g, "")}`} className="hover:text-[#E7A93B] transition-colors">
                    {siteConfig.contact.secondaryPhone}
                  </a>
                </p>
              </div>

              {/* Kenya Phone */}
              <div className="space-y-1">
                <span className="text-slate-400 font-medium">Kenya & East Africa Liaison</span>
                <p className="text-white font-semibold flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#E7A93B] flex-shrink-0" />
                  <a href={`tel:${siteConfig.contact.kenyaPhone.replace(/\s+/g, "")}`} className="hover:text-[#E7A93B] transition-colors">
                    {siteConfig.contact.kenyaPhone}
                  </a>
                </p>
              </div>

              {/* Email Addresses */}
              <div className="space-y-1 pt-2 border-t border-slate-800">
                <span className="text-slate-400 font-medium">Official Inquiries & Bookings</span>
                <p className="text-white font-semibold flex items-center gap-2 break-all">
                  <Mail className="w-4 h-4 text-[#E7A93B] flex-shrink-0" />
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#E7A93B] transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </p>
                <p className="text-slate-300 flex items-center gap-2 break-all ml-6 text-[11px]">
                  <a href={`mailto:${siteConfig.contact.secondaryEmail}`} className="hover:text-[#E7A93B] transition-colors">
                    {siteConfig.contact.secondaryEmail}
                  </a>
                </p>
              </div>

              {/* Operating Hours */}
              <div className="space-y-1 pt-2 border-t border-slate-800">
                <span className="text-slate-400 font-medium">Airport Office Hours</span>
                <p className="text-slate-300 flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#E7A93B] flex-shrink-0 mt-0.5" />
                  <span>{siteConfig.contact.hours}</span>
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp ({siteConfig.contact.phone})</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Maps Location Card */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4 text-xs text-stone-700">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-[#122544] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-600" />
                <span>Google Maps Location</span>
              </h3>
              <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">Live GPS</span>
            </div>

            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 text-stone-900 font-semibold">
                <Plane className="w-4 h-4 text-[#122544]" />
                <span>Juba International Airport</span>
              </div>
              <p className="text-[11px] text-stone-600">
                Directly opposite the main airport vehicle parking lot. Walk-ins and traveler consultations welcome daily.
              </p>
            </div>

            <a
              href={siteConfig.contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#122544] hover:bg-[#1f3860] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5 text-[#E7A93B]" />
              <span>Get Directions on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

          {/* Guarantee Card */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3 text-xs text-stone-700">
            <h3 className="font-serif text-base font-bold text-[#122544] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Swift Booking & Response</span>
            </h3>
            <p className="text-stone-600 leading-relaxed">
              For urgent airline tickets, flight reschedules, or SGR reservations, reach us directly via WhatsApp or phone for immediate ticketing issuance.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="font-serif text-2xl font-bold text-[#122544]">
              Send Us a Service Inquiry
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Need a quote for flights, SGR tickets, air charters, hotel bookings, or safari packages? Submit your details below.
            </p>
          </div>

          {status === "success" ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#122544]">
                Inquiry Received!
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Thank you for contacting Holiday Hype Travel & Tours. Head of Operations Juma Lugor and our ticketing team will review your request and contact you immediately.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 rounded-xl bg-[#122544] text-white text-xs font-semibold"
                >
                  Send Another Inquiry
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Open WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Juma Lugor"
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
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
                    placeholder="your.email@example.com"
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+211 926 225 156"
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Service Required
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
                  >
                    <option>Flight Booking & Ticketing</option>
                    <option>SGR Booking Services (Train Tickets)</option>
                    <option>Air Charters & VIP Aviation</option>
                    <option>Visa Processing & Assistance</option>
                    <option>Car Hire & Vehicle Rentals</option>
                    <option>Hotel & Safari Lodge Booking</option>
                    <option>Airport Handling & Meet & Assist</option>
                    <option>Bespoke African Safari Packages</option>
                    <option>Corporate / Group Travel</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                  Details of your Journey or Request *
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Specify origin/destination, dates, number of passengers, preferred flight times, hotel preferences, or any questions..."
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <span className="text-[11px] text-stone-500">
                  Or message us on WhatsApp: <strong>{siteConfig.contact.phone}</strong>
                </span>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#E7A93B] hover:bg-[#d89b30] text-[#122544] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === "submitting" ? "Sending..." : "Submit Inquiry"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

