import React from "react";
import { siteConfig } from "../lib/config";
import { MessageCircle, Calendar } from "lucide-react";

interface FloatingWhatsAppProps {
  onOpenPlanTrip?: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenPlanTrip }) => {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    siteConfig.contact.whatsappMessage
  )}`;

  return (
    <>
      {/* Desktop & Tablet Floating WhatsApp Button */}
      <aside aria-label="Quick travel assistance" className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-1"
          aria-label="Chat on WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-emerald-600 animate-pulse" />
          </div>
          <span className="font-semibold">WhatsApp Safari Expert</span>
        </a>
      </aside>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#FAF8F5]/95 backdrop-blur-md border-t border-stone-200 p-2.5 flex items-center gap-2 shadow-2xl">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp Us</span>
        </a>

        {onOpenPlanTrip && (
          <button
            onClick={onOpenPlanTrip}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#E7A93B] text-[#122544] font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            <span>Plan My Trip</span>
          </button>
        )}
      </div>
    </>
  );
};
