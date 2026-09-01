import React, { useState } from "react";
import { HolidayPackage, Booking } from "../lib/types";
import { siteConfig } from "../lib/config";
import { calculateBookingPrice, PAYMENT_METHODS } from "../lib/payments";
import { bookingsRepository } from "../lib/repositories";
import { 
  X, 
  Calendar, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  CreditCard, 
  FileText, 
  ArrowRight, 
  ArrowLeft,
  Phone,
  Mail,
  Lock,
  Sparkles,
  MessageCircle
} from "lucide-react";

interface BookingModalProps {
  pkg?: HolidayPackage | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ pkg, isOpen, onClose, onSuccess }) => {
  if (!isOpen) return null;

  const defaultPrice = pkg?.pricePerPersonUsd || 1850;
  const defaultPackageTitle = pkg?.title || "Bespoke Custom East Africa Safari";
  const defaultDestination = pkg?.destinationName || "Kenya & Tanzania";

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1 State: Dates & Travelers
  const [travelDate, setTravelDate] = useState("");
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [roomType, setRoomType] = useState<"Single" | "Double / Twin" | "Family Suite" | "Luxury Tent">("Double / Twin");

  // Step 2 State: Traveler Information
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryOfResidence, setCountryOfResidence] = useState("");
  const [dietaryRequirements, setDietaryRequirements] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Step 3 State: Payment method & agreements
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("card_invoice");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Price calculations
  const priceBreakdown = calculateBookingPrice(defaultPrice, adultsCount, childrenCount, roomType);

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!travelDate) {
      setErrorMessage("Please select your preferred travel start date.");
      return;
    }
    setErrorMessage("");
    setStep(2);
  };

  const handleStep2Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !countryOfResidence.trim()) {
      setErrorMessage("Please fill out all required contact fields.");
      return;
    }
    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    setErrorMessage("");
    setStep(3);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setErrorMessage("Please confirm acceptance of terms & safari cancellation policy.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const paymentOption = PAYMENT_METHODS.find(p => p.id === selectedPaymentMethod);
      const bookingData = {
        packageId: pkg?.id,
        packageTitle: defaultPackageTitle,
        destinationName: defaultDestination,
        travelDate,
        adultsCount,
        childrenCount,
        roomType,
        pricePerPersonUsd: defaultPrice,
        totalEstimatedPriceUsd: priceBreakdown.subtotal,
        leadTraveler: {
          fullName,
          email,
          phone,
          countryOfResidence
        },
        dietaryRequirements,
        specialRequests,
        paymentMethod: (paymentOption?.name || "Card Invoicing via Pesapal/Stripe") as any,
        paymentStatus: (selectedPaymentMethod === "consultation" ? "quote_requested" : "invoice_pending") as any,
        paymentNotes: `Preferred channel: ${paymentOption?.name}. Deposit required: $${priceBreakdown.requiredDeposit}.`
      };

      const newBooking = await bookingsRepository.create(bookingData);
      setConfirmedBooking(newBooking);
      setStep(4);
      if (onSuccess) onSuccess(newBooking);
    } catch (err) {
      setErrorMessage("Failed to submit booking request. Please try again or WhatsApp our concierge directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0B182B]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#FAF8F5] rounded-2xl sm:rounded-3xl border border-stone-200 shadow-2xl w-full max-w-3xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#122544] text-white p-6 sm:p-8 flex items-start justify-between relative">
          <div className="space-y-1 max-w-[85%]">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#E7A93B] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {step === 4 ? "Booking Confirmed" : "Safari & Holiday Reservation"}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              {defaultPackageTitle}
            </h2>
            <p className="text-xs text-slate-300">
              {defaultDestination} • {pkg ? `${pkg.durationDays} Days / ${pkg.durationNights} Nights` : "Tailor-Made Duration"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors focus:outline-none"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {step < 4 && (
          <div className="bg-stone-200 h-1.5 w-full flex">
            <div 
              className="bg-[#E7A93B] h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-700 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Dates & Travelers */}
          {step === 1 && (
            <form onSubmit={handleStep1Next} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Travel Date */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Preferred Start Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#122544] focus:ring-1 focus:ring-[#122544]"
                    />
                  </div>
                  <span className="text-[11px] text-stone-500">Dates are flexible during consultation</span>
                </div>

                {/* Room Type */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Lodge Room Setup
                  </label>
                  <select
                    value={roomType}
                    onChange={(e: any) => setRoomType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#122544]"
                  >
                    <option value="Double / Twin">Double / Twin Room (2 Guests)</option>
                    <option value="Single">Single Room (Solo Traveler)</option>
                    <option value="Family Suite">Family Suite / Connected Tents</option>
                    <option value="Luxury Tent">Luxury Star-Bed Tent</option>
                  </select>
                </div>
              </div>

              {/* Number of Travelers */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-stone-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#122544]">Adults (12+ yrs)</p>
                    <p className="text-[11px] text-stone-500">${priceBreakdown.pricePerAdult} / adult</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                      className="w-8 h-8 rounded-lg bg-stone-100 text-[#122544] font-bold text-sm hover:bg-stone-200"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm text-[#122544]">{adultsCount}</span>
                    <button
                      type="button"
                      onClick={() => setAdultsCount(adultsCount + 1)}
                      className="w-8 h-8 rounded-lg bg-stone-100 text-[#122544] font-bold text-sm hover:bg-stone-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-stone-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#122544]">Children (3–11 yrs)</p>
                    <p className="text-[11px] text-emerald-700 font-semibold">35% Discount (${priceBreakdown.pricePerChild})</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                      className="w-8 h-8 rounded-lg bg-stone-100 text-[#122544] font-bold text-sm hover:bg-stone-200"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm text-[#122544]">{childrenCount}</span>
                    <button
                      type="button"
                      onClick={() => setChildrenCount(childrenCount + 1)}
                      className="w-8 h-8 rounded-lg bg-stone-100 text-[#122544] font-bold text-sm hover:bg-stone-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Estimate Summary Box */}
              <div className="p-4 rounded-xl bg-[#122544]/5 border border-[#122544]/15 flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-stone-600">Estimated Total (Inclusive of Park Fees)</p>
                  <p className="text-[11px] text-stone-500">Deposit required to confirm: ${priceBreakdown.requiredDeposit.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-2xl font-extrabold text-[#122544]">
                    ${priceBreakdown.subtotal.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-stone-500 block">USD Total</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#E7A93B] hover:bg-[#d89b30] text-[#122544] font-bold text-sm shadow-sm flex items-center gap-2"
                >
                  <span>Continue to Traveler Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Traveler Details */}
          {step === 2 && (
            <form onSubmit={handleStep2Next} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Full Name (Lead Traveler) *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Johnathan Smith"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#122544]"
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
                    placeholder="e.g. john@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#122544]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +1 555 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#122544]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                    Country of Residence *
                  </label>
                  <input
                    type="text"
                    required
                    value={countryOfResidence}
                    onChange={(e) => setCountryOfResidence(e.target.value)}
                    placeholder="e.g. United Kingdom, USA, Germany"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#122544]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                  Dietary Requirements (Optional)
                </label>
                <input
                  type="text"
                  value={dietaryRequirements}
                  onChange={(e) => setDietaryRequirements(e.target.value)}
                  placeholder="e.g. Vegetarian, Gluten-Free, Halal, Allergies"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs focus:outline-none focus:border-[#122544]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                  Special Requests / Occasion (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Honeymoon setup, Hot Air Balloon safari, wheelchair accessibility..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs focus:outline-none focus:border-[#122544]"
                />
              </div>

              <div className="flex items-center justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl text-stone-600 hover:text-[#122544] text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#E7A93B] hover:bg-[#d89b30] text-[#122544] font-bold text-sm shadow-sm flex items-center gap-2"
                >
                  <span>Continue to Payment & Review</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Payment Preferences & Legal Agreement */}
          {step === 3 && (
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              {/* Payment Mode Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                  Select Preferred Payment Channel
                </label>
                <div className="space-y-2.5">
                  {PAYMENT_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? "bg-white border-[#122544] ring-1 ring-[#122544]"
                          : "bg-white/60 border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={() => setSelectedPaymentMethod(method.id)}
                        className="mt-1 text-[#122544] focus:ring-[#122544]"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#122544]">{method.name}</span>
                          {method.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-semibold">
                              {method.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">{method.description}</p>
                        <p className="text-[11px] text-stone-500 italic">{method.instructions}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Secure Notice */}
              <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold">Zero Risk Booking Guarantee</p>
                  <p className="text-[11px] text-emerald-800">
                    No card details are stored. We issue a formal verified invoice with transparent payment terms and free date adjustments up to 30 days before departure.
                  </p>
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-700">
                <input
                  type="checkbox"
                  required
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 rounded text-[#122544] focus:ring-[#122544]"
                />
                <span>
                  I have read and agree to Holiday Hype Tours & Travel's {" "}
                  <a href="/terms" target="_blank" className="text-[#D2573F] underline font-semibold">
                    Terms & Conditions
                  </a>{" "}
                  and {" "}
                  <a href="/cancellation-policy" target="_blank" className="text-[#D2573F] underline font-semibold">
                    Cancellation Policy
                  </a>.
                </span>
              </label>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl text-stone-600 hover:text-[#122544] text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3.5 rounded-xl bg-[#E7A93B] hover:bg-[#d89b30] text-[#122544] font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  {submitting ? (
                    <span>Submitting Reservation...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm & Request Official Invoice</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success & Confirmation State */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-[#122544]">
                  Safari Reservation Received!
                </h3>
                <p className="text-sm text-stone-600 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-stone-900">{confirmedBooking.leadTraveler.fullName}</span>. Your booking reference is:
                </p>
                <div className="inline-block px-4 py-2 rounded-xl bg-[#122544] text-[#E7A93B] font-mono text-lg font-bold tracking-widest">
                  {confirmedBooking.referenceNumber}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200 text-left text-xs text-stone-700 space-y-2 max-w-md mx-auto">
                <div className="flex justify-between pb-2 border-b border-stone-100">
                  <span className="text-stone-500">Package</span>
                  <span className="font-bold text-[#122544] text-right">{confirmedBooking.packageTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Start Date</span>
                  <span className="font-semibold">{confirmedBooking.travelDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Travelers</span>
                  <span className="font-semibold">{confirmedBooking.adultsCount} Adults, {confirmedBooking.childrenCount} Children</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Estimated Total</span>
                  <span className="font-bold text-emerald-800">${confirmedBooking.totalEstimatedPriceUsd.toLocaleString()} USD</span>
                </div>
              </div>

              <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                A formal Pro-Forma Invoice and safari briefing have been dispatched to <span className="font-semibold text-stone-800">{confirmedBooking.leadTraveler.email}</span>. A senior safari consultant is reviewing your custom requests.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hello Holiday Hype, I just placed booking ${confirmedBooking.referenceNumber} for ${confirmedBooking.packageTitle}. Looking forward to discussing details!`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat With Concierge on WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#122544] text-white font-semibold text-xs hover:bg-[#1a335a] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
