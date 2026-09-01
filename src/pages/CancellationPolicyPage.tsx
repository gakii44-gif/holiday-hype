import React from "react";
import { ArrowLeft, Clock, ShieldCheck } from "lucide-react";

interface LegalPageProps {
  onBack: () => void;
}

export const CancellationPolicyPage: React.FC<LegalPageProps> = ({ onBack }) => {
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
            Transparent Policy
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#122544]">
            Safari Cancellation & Refund Policy
          </h1>
          <p className="text-stone-500 text-xs">
            Clear, transparent refund schedules and flexible postponement terms.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#122544]">Standard Cancellation Schedule</h2>
          <p>
            Cancellations must be communicated in writing (via email) to our reservations department. Refund percentages are calculated based on the date written notice is received prior to tour commencement:
          </p>
          <div className="space-y-2 pt-2">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex justify-between">
              <span className="font-semibold">60+ Days Prior to Departure</span>
              <span className="text-emerald-700 font-bold">100% of balance refunded (less 15% administrative fee & non-refundable permits)</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex justify-between">
              <span className="font-semibold">45 to 59 Days Prior to Departure</span>
              <span className="text-amber-700 font-bold">75% of safari cost refunded (less non-refundable permits)</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex justify-between">
              <span className="font-semibold">30 to 44 Days Prior to Departure</span>
              <span className="text-amber-800 font-bold">50% of safari cost refunded (less non-refundable permits)</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex justify-between">
              <span className="font-semibold">Less than 30 Days Prior to Departure</span>
              <span className="text-rose-700 font-bold">0% refund (Lodge & flight commitments fully locked)</span>
            </div>
          </div>
        </section>

        <section className="space-y-2 pt-4 border-t border-stone-100">
          <h2 className="font-serif text-lg font-bold text-[#122544]">Gorilla & Chimp Permits Exception</h2>
          <p>
            Permits for Mountain Gorilla trekking (Uganda Wildlife Authority / Rwanda Development Board) are non-refundable once purchased, as per government statutory regulations. If you cannot travel, we will make every reasonable endeavor to resell your permit to another traveler on your behalf.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-stone-100">
          <h2 className="font-serif text-lg font-bold text-[#122544]">Complimentary Trip Postponement</h2>
          <p>
            Should unforeseen emergencies or international travel advisories arise, Holiday Hype allows free postponement of your safari dates up to 12 months forward (subject to seasonal lodge price variance).
          </p>
        </section>
      </div>
    </div>
  );
};
