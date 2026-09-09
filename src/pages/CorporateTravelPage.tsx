import React, { useState } from "react";
import { siteConfig } from "../lib/config";
import { inquiriesRepository } from "../lib/repositories";
import { 
  Building2, 
  Plane, 
  Hotel, 
  Users2, 
  Car, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MessageSquare,
  ArrowRight,
  Clock,
  Briefcase
} from "lucide-react";

interface CorporateTravelPageProps {
  navigate: (path: string) => void;
  onOpenPlanTrip: () => void;
}

export const CorporateTravelPage: React.FC<CorporateTravelPageProps> = ({ navigate }) => {
  const [formData, setFormData] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    serviceType: "Corporate Flight Bookings",
    groupSize: "1-5 travelers",
    departureCity: "Juba (JUB)",
    destinationCity: "",
    approxDate: "",
    details: ""
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const corporateWhatsAppUrl = `https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(
    `Hello Holiday Hype Tours & Travel! I would like to inquire about Corporate Travel Support for: ${
      formData.organizationName || "our organisation"
    }. Contact: ${formData.contactPerson || ""}`
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.organizationName || !formData.contactPerson || !formData.phone) {
      setStatus("error");
      setErrorMessage("Please complete your organisation name, contact person, and phone number.");
      return;
    }

    setStatus("submitting");
    try {
      await inquiriesRepository.create({
        type: "corporate",
        fullName: `${formData.contactPerson} (${formData.organizationName})`,
        email: formData.email || "corporate@client.org",
        phone: formData.phone,
        destinationInterest: formData.destinationCity || "Corporate Travel",
        travelDates: formData.approxDate,
        message: `Corporate Travel Request:\nOrganisation: ${formData.organizationName}\nService: ${formData.serviceType}\nGroup Size: ${formData.groupSize}\nRoute: ${formData.departureCity} -> ${formData.destinationCity}\nDate: ${formData.approxDate}\nDetails: ${formData.details}`
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Unable to send corporate request right now. Please message our corporate desk on WhatsApp.");
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative bg-[#122544] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80"
            alt="Aircraft wing in flight over clouds"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#122544] via-[#122544]/90 to-[#122544]/75 z-0" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#E7A93B] text-xs font-semibold uppercase tracking-wider border border-white/15">
            <Building2 className="w-3.5 h-3.5" />
            <span>Dedicated Support for Organisations, Companies & NGOs</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Corporate Travel, Without the Hassle
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            From flights and accommodation to group movements and travel coordination, Holiday Hype helps organisations manage regional and international travel with less stress.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#corporate-form"
              className="px-6 py-3 rounded-sm bg-[#D2573F] hover:bg-[#b84a35] text-white font-semibold text-xs uppercase tracking-widest transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Request Corporate Travel Support</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={corporateWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Corporate Desk</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Core Corporate Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D2573F]">
            Corporate Solutions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#122544] tracking-tight">
            Tailored Travel Services for Your Team
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Reliable corporate travel desk based at Juba International Airport providing responsive routing, clear billing, and dependable logistical coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Plane,
              title: "Corporate Flight Bookings",
              desc: "Fast ticketing, route comparisons, flexible ticket management, and rebooking support for business travelers flying regionally and globally."
            },
            {
              icon: Hotel,
              title: "Hotel & Lodge Accommodation",
              desc: "Curated corporate accommodation matching your organisation’s safety criteria, location requirements, and budget allowances."
            },
            {
              icon: Users2,
              title: "Group Travel & Delegations",
              desc: "Smooth coordination for field teams, NGO project missions, corporate workshops, and multi-staff travel itineraries."
            },
            {
              icon: Car,
              title: "Airport Transfers & Local Transport",
              desc: "Punctual, professional meet-and-greet transfers at Juba International Airport, plus cross-town business logistics."
            },
            {
              icon: Briefcase,
              title: "Conference & Event Logistics",
              desc: "Travel arrangements for regional summits, retreats, and business conferences across East Africa, Dubai, and beyond."
            },
            {
              icon: FileText,
              title: "Travel Coordination & Clear Billing",
              desc: "Centralized invoicing, itinerary tracking, and transparent documentation tailored to your organisation’s accounting workflow."
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-lg bg-white border border-[#122544]/10 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-sm bg-[#122544] text-[#E7A93B] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#122544]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Why Organisations Choose Holiday Hype */}
      <section className="bg-stone-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D2573F]">
              Why Work With Us
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#122544]">
              Corporate Travel Made Simple
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs space-y-2">
              <Clock className="w-6 h-6 text-[#D2573F]" />
              <h4 className="font-serif font-bold text-sm text-[#122544]">Fast Turnaround</h4>
              <p className="text-xs text-stone-600">Quick itinerary quotes and rapid ticket issuance when business schedules change.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#D2573F]" />
              <h4 className="font-serif font-bold text-sm text-[#122544]">Airport Base in Juba</h4>
              <p className="text-xs text-stone-600">Immediate on-site presence right opposite parking at Juba International Airport.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs space-y-2">
              <FileText className="w-6 h-6 text-[#D2573F]" />
              <h4 className="font-serif font-bold text-sm text-[#122544]">Straightforward Billing</h4>
              <p className="text-xs text-stone-600">Transparent quotes with no hidden charges, accompanied by itemized documentation.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs space-y-2">
              <Phone className="w-6 h-6 text-[#D2573F]" />
              <h4 className="font-serif font-bold text-sm text-[#122544]">Direct WhatsApp Access</h4>
              <p className="text-xs text-stone-600">Reach our team directly at +211 926 225 156 for fast updates and emergency support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Corporate Enquiry Form Section */}
      <section id="corporate-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg p-6 sm:p-10 border border-[#122544]/15 shadow-md">
          <div className="space-y-2 mb-8 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D2573F]">
              Direct Assistance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#122544]">
              Request Corporate Travel Support
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Fill out the details below and our corporate desk will prepare a tailored proposal for your organisation.
            </p>
          </div>

          {status === "success" ? (
            <div className="p-6 rounded-md bg-emerald-50 border border-emerald-200 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-emerald-900">
                Corporate Request Received
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.contactPerson}. Our corporate travel coordinator will review your request and get in touch with you shortly.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={corporateWhatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-sm bg-emerald-600 text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Follow up on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="text-xs text-stone-600 hover:text-stone-900 underline"
                >
                  Submit another inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {status === "error" && (
                <div className="p-3.5 rounded bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#122544]">
                    Organisation / Company / NGO Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    placeholder="e.g. Acme Aid South Sudan"
                    className="w-full px-3.5 py-2.5 rounded-sm border border-stone-300 text-xs focus:outline-none focus:border-[#122544]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#122544]">
                    Contact Person & Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="e.g. Mary Deng, Operations Officer"
                    className="w-full px-3.5 py-2.5 rounded-sm border border-stone-300 text-xs focus:outline-none focus:border-[#122544]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#122544]">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@organisation.org"
                    className="w-full px-3.5 py-2.5 rounded-sm border border-stone-300 text-xs focus:outline-none focus:border-[#122544]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#122544]">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+211 ..."
                    className="w-full px-3.5 py-2.5 rounded-sm border border-stone-300 text-xs focus:outline-none focus:border-[#122544]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#122544]">
                    Service Required
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-sm border border-stone-300 text-xs bg-stone-50 focus:outline-none focus:border-[#122544]"
                  >
                    <option>Corporate Flight Bookings</option>
                    <option>Hotel Accommodation</option>
                    <option>Group / Delegation Travel</option>
                    <option>Airport Transfers (Juba)</option>
                    <option>Conference / Workshop Logistics</option>
                    <option>Full Travel Management</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#122544]">
                    Group Size
                  </label>
                  <select
                    value={formData.groupSize}
                    onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-sm border border-stone-300 text-xs bg-stone-50 focus:outline-none focus:border-[#122544]"
                  >
                    <option>1-5 travelers</option>
                    <option>6-15 travelers</option>
                    <option>16-30 travelers</option>
                    <option>30+ delegates</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#122544]">
                    Approximate Date
                  </label>
                  <input
                    type="date"
                    value={formData.approxDate}
                    onChange={(e) => setFormData({ ...formData, approxDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-sm border border-stone-300 text-xs bg-stone-50 focus:outline-none focus:border-[#122544]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#122544]">
                    Departure Location
                  </label>
                  <input
                    type="text"
                    value={formData.departureCity}
                    onChange={(e) => setFormData({ ...formData, departureCity: e.target.value })}
                    placeholder="e.g. Juba (JUB)"
                    className="w-full px-3.5 py-2.5 rounded-sm border border-stone-300 text-xs focus:outline-none focus:border-[#122544]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#122544]">
                    Destination(s)
                  </label>
                  <input
                    type="text"
                    value={formData.destinationCity}
                    onChange={(e) => setFormData({ ...formData, destinationCity: e.target.value })}
                    placeholder="e.g. Nairobi, Dubai, Kampala, Entebbe"
                    className="w-full px-3.5 py-2.5 rounded-sm border border-stone-300 text-xs focus:outline-none focus:border-[#122544]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#122544]">
                  Additional Requirements / Specific Instructions
                </label>
                <textarea
                  rows={3}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Tell us about specific flight times, hotel preferences, baggage needs, or billing requirements..."
                  className="w-full px-3.5 py-2.5 rounded-sm border border-stone-300 text-xs focus:outline-none focus:border-[#122544]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto px-8 py-3 rounded-sm bg-[#D2573F] hover:bg-[#b84a35] text-white font-semibold text-xs uppercase tracking-widest transition-all shadow-sm disabled:opacity-50"
                >
                  {status === "submitting" ? "Sending Request..." : "Request Corporate Travel Support"}
                </button>

                <a
                  href={corporateWhatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-sm border border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-xs font-semibold uppercase tracking-wider text-center transition-colors"
                >
                  Or WhatsApp Us Direct
                </a>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
