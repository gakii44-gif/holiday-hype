import React from "react";
import { siteConfig } from "../lib/config";
import { ShieldCheck, FileText, ArrowLeft } from "lucide-react";

interface LegalPageProps {
  onBack: () => void;
}

export const TermsPage: React.FC<LegalPageProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-[#122544] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </button>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm space-y-6 text-stone-800 text-xs sm:text-sm leading-relaxed">
        <div className="border-b border-stone-100 pb-4 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D2573F]">
            Legal & Compliance
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#122544]">
            Terms & Conditions of Booking
          </h1>
          <p className="text-stone-500 text-xs">
            Last Updated: January 2026 • Holiday Hype Tours & Travel Ltd (KATO Licensed Tour Operator)
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#122544]">1. Contract & Booking Confirmation</h2>
          <p>
            A contract between <strong>Holiday Hype Tours & Travel Ltd</strong> ("the Company") and the client ("the Traveler") comes into existence upon the issuance of a formal written booking confirmation and receipt of the required initial deposit.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#122544]">2. Deposit & Payment Terms</h2>
          <p>
            - A non-refundable booking deposit of <strong>30%</strong> of the total safari cost is required at the time of reservation to secure national park permits, flight seats, and lodge accommodations.<br />
            - For specialized itineraries involving Mountain Gorilla trekking in Uganda or Rwanda, <strong>100% of gorilla permit fees ($800 - $1,500 per permit)</strong> must be paid upfront as permits are non-refundable by wildlife authorities.<br />
            - The remaining balance of <strong>70%</strong> is due no later than <strong>45 days</strong> prior to safari commencement.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#122544]">3. Inclusions & Park Conservation Fees</h2>
          <p>
            Unless explicitly specified in your custom voucher, our safari prices include all government taxes, park entry conservation fees, 4x4 Land Cruiser game drives with professional naturalist drivers, full board lodge meals on safari, and airport transfers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#122544]">4. Comprehensive Travel Insurance Mandate</h2>
          <p>
            It is a mandatory condition of booking that all travelers possess valid, comprehensive travel insurance covering emergency medical evacuation (including AMREF Flying Doctors), hospitalisation, trip interruption, and baggage loss.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#122544]">5. Force Majeure & Itinerary Adjustments</h2>
          <p>
            While every effort is made to adhere to agreed itineraries, the Company reserves the right to alter routes, lodges, or flight schedules where necessitated by weather conditions, road closures, or wildlife movements to safeguard client safety.
          </p>
        </section>
      </div>
    </div>
  );
};
