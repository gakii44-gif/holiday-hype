import React from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { siteConfig } from "../lib/config";

interface LegalPageProps {
  onBack: () => void;
}

export const PrivacyPage: React.FC<LegalPageProps> = ({ onBack }) => {
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
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Data Protection & Privacy
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#122544]">
            Privacy Policy & Data Security
          </h1>
          <p className="text-stone-500 text-xs">
            Committed to international GDPR & Kenya Data Protection Act 2019 standards.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#122544]">1. Information We Collect</h2>
          <p>
            When you request a bespoke safari proposal or book a journey with Holiday Hype Tours & Travel, we collect personal information strictly required to orchestrate your travel logistics: full legal names (matching passports), passport numbers (for park entry permits and aviation manifests), dietary requirements, contact details, and emergency next-of-kin contacts.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#122544]">2. How We Use Your Data</h2>
          <p>
            Your information is used exclusively to:
            <br />• Book national park permits (Kenya Wildlife Service, TANAPA, Uganda Wildlife Authority).
            <br />• Reserve flight seats on regional bush aircraft (SafariLink, AirKenya, Precision Air).
            <br />• Secure room reservations and dietary preferences with our partner lodges.
            <br />• Send verified booking invoices and operational safari briefings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#122544]">3. No Sale of Personal Information</h2>
          <p>
            We do not sell, rent, monetize, or disclose your personal data to any external marketing agencies. Data is shared solely with direct service suppliers (lodges, aviation carriers, park authorities) strictly necessary to fulfill your booked itinerary.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-[#122544]">4. Payment Security</h2>
          <p>
            All online and banking payments are processed via regulated payment gateways (such as Pesapal, Stripe, or Swift Bank Wire). Holiday Hype Tours & Travel does not store credit or debit card numbers on its servers.
          </p>
        </section>
      </div>
    </div>
  );
};
