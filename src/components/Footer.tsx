import React, { useState } from "react";
import { siteConfig } from "../lib/config";
import { newsletterRepository } from "../lib/repositories";
import { 
  Compass, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Lock,
  ArrowUpRight
} from "lucide-react";

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await newsletterRepository.subscribe(email);
      setStatus("success");
      setMessage(res.message);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Subscription failed. Please try again or contact us directly.");
    }
  };

  return (
    <footer className="bg-[#0B182B] text-slate-300 pt-16 pb-12 border-t border-[#1F3860]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Accreditation */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E7A93B] flex items-center justify-center text-[#122544]">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white tracking-tight leading-tight">
                  HOLIDAY HYPE
                </h3>
                <p className="text-[10px] tracking-[0.2em] font-semibold text-[#E7A93B] uppercase">
                  TOURS & TRAVEL
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Crafting bespoke African safari expeditions, Indian Ocean beach holidays, private flight charters, and tailor-made journeys with authentic local expertise.
            </p>

            {/* Accreditations */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Accreditations & Memberships
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#122544] text-slate-300 border border-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E7A93B]" />
                  {siteConfig.accreditation.katoMember}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#122544] text-slate-300 border border-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {siteConfig.accreditation.ecotourismKenya}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links / Safaris */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-bold text-white tracking-wide">
              Safaris & Holidays
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => navigate("/destinations")}
                  className="hover:text-[#E7A93B] transition-colors flex items-center gap-1 text-left"
                >
                  African Destinations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/tours")}
                  className="hover:text-[#E7A93B] transition-colors flex items-center gap-1 text-left"
                >
                  Tours & Safaris Finder
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/packages")}
                  className="hover:text-[#E7A93B] transition-colors flex items-center gap-1 text-left"
                >
                  Curated Holiday Packages
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/destinations/kenya")}
                  className="hover:text-[#E7A93B] transition-colors flex items-center gap-1 text-left"
                >
                  Kenya Safaris & Migration
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/destinations/tanzania")}
                  className="hover:text-[#E7A93B] transition-colors flex items-center gap-1 text-left"
                >
                  Tanzania & Serengeti
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/destinations/uganda")}
                  className="hover:text-[#E7A93B] transition-colors flex items-center gap-1 text-left"
                >
                  Gorilla Trekking (Uganda)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Travel Services */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-bold text-white tracking-wide">
              Services & Travel
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate("/services")} className="hover:text-[#E7A93B] transition-colors">
                  All Travel Services
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/flights")} className="hover:text-[#E7A93B] transition-colors">
                  Flight Bookings & Bush Charters
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/hotels")} className="hover:text-[#E7A93B] transition-colors">
                  Luxury Lodges & Resorts
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/plan-my-trip")} className="hover:text-[#E7A93B] transition-colors text-[#E7A93B] font-medium">
                  Custom Trip Designer
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/blog")} className="hover:text-[#E7A93B] transition-colors">
                  Safari Blog & Travel Tips
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/about")} className="hover:text-[#E7A93B] transition-colors">
                  About Holiday Hype
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-bold text-white tracking-wide">
              Safari Newsletter
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive seasonal wildlife alerts, Great Migration dates, and early bird safari offers.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#E7A93B]"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded bg-[#E7A93B] hover:bg-[#d89b30] text-[#122544] font-semibold text-xs transition-colors flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {message && (
                <p className={`text-xs ${status === "success" ? "text-emerald-400" : "text-rose-400"}`}>
                  {message}
                </p>
              )}
            </form>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E7A93B] flex-shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E7A93B] flex-shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved. Tour Operator License: {siteConfig.accreditation.licenseNo}.</p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Disclaimer: Real-time payments are processed via official invoice and banking channels. Terms and conditions apply.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => navigate("/terms")} className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </button>
            <span>•</span>
            <button onClick={() => navigate("/privacy")} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => navigate("/cancellation-policy")} className="hover:text-slate-300 transition-colors">
              Cancellation Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => navigate("/admin")} 
              className="hover:text-[#E7A93B] transition-colors flex items-center gap-1 text-slate-400"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
