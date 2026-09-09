import React, { useState, useEffect } from "react";
import { siteConfig } from "../lib/config";
import { store } from "../lib/store";
import { Logo } from "./Logo";
import { 
  Compass, 
  Phone, 
  Mail, 
  Menu, 
  X, 
  ChevronRight, 
  Calendar, 
  ShieldCheck, 
  Globe2,
  Sparkles,
  MessageCircle
} from "lucide-react";

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
  onOpenPlanTrip: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate, onOpenPlanTrip }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const siteNotice = store.getSiteNotice();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Holidays", path: "/packages" },
    { label: "Destinations", path: "/destinations" },
    { label: "Flights", path: "/flights" },
    { label: "Safaris", path: "/tours" },
    { label: "Corporate Travel", path: "/corporate" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(
    "Hello Holiday Hype Tours & Travel! I would like to inquire about your travel services."
  )}`;

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Notification & Contact Bar */}
      <div className="bg-[#122544] text-white text-xs py-2 px-3 sm:px-4 border-b border-[#1F3860]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Tagline / Positioning banner */}
          <div className="flex items-center gap-2 text-[#E7A93B] font-medium text-[11px] sm:text-xs truncate">
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{siteNotice || "Flights • Holidays • Safaris • Hotels • Visa Assistance • Airport Transfers"}</span>
          </div>

          {/* Quick contact info & Juba location */}
          <div className="flex items-center gap-4 text-slate-300 ml-auto hidden md:flex text-xs">
            <span className="flex items-center gap-1 text-slate-300">
              <Globe2 className="w-3.5 h-3.5 text-[#E7A93B]" />
              <span>Juba International Airport, South Sudan</span>
            </span>
            <span className="text-slate-600">|</span>
            <a 
              href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`} 
              className="flex items-center gap-1.5 hover:text-[#E7A93B] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#E7A93B]" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <span>WhatsApp: {siteConfig.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar: Crisp, Pristine White with Seamless Brand Integration */}
      <nav 
        className={`w-full bg-white text-slate-800 border-b transition-all duration-200 ${
          scrolled ? "shadow-md border-slate-200/90" : "border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
            {/* LEFT: Holiday Hype Logo (Embedded seamlessly with zero box/border) */}
            <button 
              onClick={() => handleNavClick("/")}
              className="flex items-center text-left flex-shrink-0 focus:outline-none transition-transform hover:opacity-95 active:scale-[0.98] py-1"
              aria-label="Holiday Hype Tours & Travel - Home"
            >
              <Logo variant="nav" size="sm" />
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = 
                  link.path === "/" 
                    ? currentPath === "/" || currentPath === "" 
                    : currentPath.startsWith(link.path);
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`text-sm font-semibold tracking-normal transition-colors relative py-2 focus:outline-none ${
                      isActive 
                        ? "text-[#122544]" 
                        : "text-slate-600 hover:text-[#122544]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D2573F] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Desktop Right Action CTAs: PLAN MY TRIP + WHATSAPP US */}
            <div className="hidden xl:flex items-center gap-3 flex-shrink-0">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>

              <button
                onClick={onOpenPlanTrip}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#D2573F] hover:bg-[#b84a35] text-white font-semibold text-xs uppercase tracking-widest shadow-sm hover:shadow transition-all duration-150 transform hover:-translate-y-0.5 focus:outline-none"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Plan My Trip</span>
              </button>
            </div>

            {/* Mobile & Tablet Header Controls: WhatsApp + Plan + Hamburger */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 xl:hidden flex-shrink-0">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Us"
                className="inline-flex items-center justify-center gap-1 px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs active:scale-95"
                title="WhatsApp Holiday Hype"
              >
                <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="hidden min-[360px]:inline text-[11px] sm:text-xs font-bold">WA</span>
                <span className="hidden md:inline text-xs font-semibold">WhatsApp</span>
              </a>

              <button
                onClick={onOpenPlanTrip}
                className="inline-flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md bg-[#D2573F] hover:bg-[#b84a35] text-white font-semibold text-[11px] sm:text-xs uppercase tracking-wider shadow-sm transition-colors focus:outline-none active:scale-95 whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                <span>
                  Plan
                  <span className="hidden min-[380px]:inline"> Trip</span>
                  <span className="hidden sm:inline"> Now</span>
                </span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 sm:p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors active:scale-95 ml-0.5"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1 divide-y divide-slate-100">
              {navLinks.map((link) => {
                const isActive = 
                  link.path === "/" 
                    ? currentPath === "/" || currentPath === "" 
                    : currentPath.startsWith(link.path);
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`flex items-center justify-between py-3 px-3 text-base font-medium rounded-md text-left transition-colors ${
                      isActive 
                        ? "text-[#D2573F] font-semibold bg-orange-50/70" 
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPlanTrip();
                }}
                className="w-full py-3 rounded-md bg-[#D2573F] hover:bg-[#b84a35] text-white font-semibold uppercase tracking-widest text-xs text-center flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan My Trip</span>
              </button>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold uppercase tracking-wider text-xs text-center flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us Direct</span>
              </a>

              <div className="flex flex-col items-center gap-1.5 text-xs text-slate-500 pt-3 border-t border-slate-100">
                <span className="text-slate-600 font-medium">Juba International Airport, South Sudan</span>
                <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`} className="flex items-center gap-1 text-[#122544] font-semibold">
                  <Phone className="w-3 h-3 text-[#E7A93B]" />
                  <span>{siteConfig.contact.phone}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
