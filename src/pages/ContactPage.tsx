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
  AlertCircle
} from "lucide-react";

export const ContactPage: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("General Safari Inquiry");
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-[#122544] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden space-y-4">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7A93B]/20 text-[#E7A93B] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            24/7 Global Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Contact Holiday Hype Tours
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Whether you are curious about Great Migration river crossing timelines, gorilla trekking permits, or require assistance on an active safari, our team is always within reach.
          </p>
        </div>
      </div>

      {/* Main Grid: Contact Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Contact Cards & Office Details */}
        <div className="space-y-6">
          {/* Direct Channels Card */}
          <div className="bg-[#122544] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
            <h2 className="font-serif text-xl font-bold text-white border-b border-slate-700 pb-3">
              Direct Contact Channels
            </h2>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 font-medium">Head Office (Nairobi)</span>
                <p className="text-white font-semibold flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#E7A93B] flex-shrink-0 mt-0.5" />
                  <span>{siteConfig.contact.address}</span>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-medium">Direct Telephone & WhatsApp</span>
                <p className="text-white font-semibold flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#E7A93B] flex-shrink-0" />
                  <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-[#E7A93B] transition-colors">
                    {siteConfig.contact.phone}
                  </a>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-medium">Email Inquiries</span>
                <p className="text-white font-semibold flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#E7A93B] flex-shrink-0" />
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#E7A93B] transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-medium">24/7 Safari Emergency Hotline</span>
                <p className="text-emerald-400 font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>{siteConfig.contact.emergencyContact}</span>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-medium">Office Operating Hours</span>
                <p className="text-slate-300">
                  {siteConfig.contact.hours}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  siteConfig.contact.whatsappMessage
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp Now</span>
              </a>
            </div>
          </div>

          {/* Guarantee Card */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3 text-xs text-stone-700">
            <h3 className="font-serif text-base font-bold text-[#122544] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Prompt Response Guarantee</span>
            </h3>
            <p className="text-stone-600 leading-relaxed">
              We respond to all online inquiries within <strong>2 to 4 business hours</strong> with verified availability, price estimates, and custom recommendations.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="font-serif text-2xl font-bold text-[#122544]">
              Send Us a Message
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Have a question or request a custom proposal? Fill out the form below.
            </p>
          </div>

          {status === "success" ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#122544]">
                Message Delivered!
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Thank you for reaching out to Holiday Hype Tours & Travel. One of our destination specialists will review your message and reply promptly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="px-6 py-2.5 rounded-xl bg-[#122544] text-white text-xs font-semibold"
              >
                Send Another Message
              </button>
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
                    placeholder="Your Name"
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
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 700 000 000"
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Inquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
                  >
                    <option>General Safari Inquiry</option>
                    <option>Great Migration Booking</option>
                    <option>Gorilla Trekking Permits</option>
                    <option>Private Bush Flight Charter</option>
                    <option>Zanzibar Beach Package</option>
                    <option>Corporate / Group Retreat</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                  Your Message or Trip Request *
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you would like to know, your intended dates, number of travelers, or specific parks you wish to visit..."
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="px-8 py-3.5 rounded-xl bg-[#E7A93B] hover:bg-[#d89b30] text-[#122544] font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === "submitting" ? "Sending..." : "Submit Message"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
