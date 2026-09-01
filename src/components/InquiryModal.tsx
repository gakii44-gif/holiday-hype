import React, { useState } from "react";
import { InquiryType, Inquiry } from "../lib/types";
import { inquiriesRepository } from "../lib/repositories";
import { siteConfig } from "../lib/config";
import { X, Send, CheckCircle2, AlertCircle, Sparkles, MessageCircle } from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: InquiryType;
  defaultTitle?: string;
  defaultDestination?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  defaultType = "general",
  defaultTitle = "General Inquiry",
  defaultDestination = ""
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState(defaultDestination);
  const [travelDates, setTravelDates] = useState("");
  const [travelersCount, setTravelersCount] = useState(2);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [confirmedInquiry, setConfirmedInquiry] = useState<Inquiry | null>(null);
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorText("Please fill out all required fields.");
      return;
    }
    if (!email.includes("@")) {
      setErrorText("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorText("");

    try {
      const inq = await inquiriesRepository.create({
        type: defaultType as InquiryType,
        fullName,
        email,
        phone,
        destinationInterest: destination || defaultTitle,
        travelDates,
        travelersCount,
        message,
      });

      setConfirmedInquiry(inq);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorText("Failed to send inquiry. Please try again or WhatsApp us directly.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0B182B]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative bg-[#FAF8F5] rounded-2xl sm:rounded-3xl border border-stone-200 shadow-2xl w-full max-w-xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-[#122544] text-white p-6 flex items-start justify-between">
          <div className="space-y-1 max-w-[85%]">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#E7A93B] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Tailor-Made Travel Inquiry
            </span>
            <h3 className="font-serif text-xl font-bold text-white leading-snug">
              {defaultTitle}
            </h3>
            <p className="text-xs text-slate-300">
              Get an expert response within 2–4 hours with custom recommendations.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {errorText && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-700 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorText}</span>
            </div>
          )}

          {status === "success" && confirmedInquiry ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-xl font-bold text-[#122544]">Inquiry Received!</h4>
                <p className="text-xs text-stone-600">
                  Reference: <span className="font-mono font-bold text-[#122544]">{confirmedInquiry.referenceNumber}</span>
                </p>
                <p className="text-xs text-stone-500 max-w-sm mx-auto pt-1">
                  Our senior safari coordinator is preparing your custom proposal and will email you at <span className="font-semibold text-stone-800">{email}</span>.
                </p>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hello Holiday Hype, I submitted inquiry ${confirmedInquiry.referenceNumber} regarding ${defaultTitle}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#122544] text-white font-semibold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs focus:outline-none focus:border-[#122544]"
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
                    placeholder="your.email@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs focus:outline-none focus:border-[#122544]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555 0199"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs focus:outline-none focus:border-[#122544]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Travel Dates
                  </label>
                  <input
                    type="text"
                    value={travelDates}
                    onChange={(e) => setTravelDates(e.target.value)}
                    placeholder="e.g. Oct 2026 / Flexible"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs focus:outline-none focus:border-[#122544]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Guests
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs focus:outline-none focus:border-[#122544]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                  How Can We Help You? *
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your ideal safari, flight requirements, preferred lodges, or special questions..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs focus:outline-none focus:border-[#122544]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-stone-600 hover:text-[#122544] text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="px-5 py-2.5 rounded-xl bg-[#E7A93B] hover:bg-[#d89b30] text-[#122544] font-bold text-xs shadow-sm flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
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
