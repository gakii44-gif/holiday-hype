import React, { useState, useEffect } from "react";
import { siteConfig } from "../lib/config";
import { store } from "../lib/store";
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
  Sparkles
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
    { label: "Destinations", path: "/destinations" },
    { label: "Tours & Safaris", path: "/tours" },
    { label: "Holiday Packages", path: "/packages" },
    { label: "Flights", path: "/flights" },
    { label: "Hotels", path: "/hotels" },
    { label: "Services", path: "/services" },
    { label: "About", path: "/about" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Notification & Contact Bar */}
      <div className="bg-[#122544] text-white text-xs py-2 px-4 border-b border-[#1F3860]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Banner message */}
          <div className="flex items-center gap-2 text-[#E7A93B] font-medium truncate">
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{siteNotice || "2026 Great Migration Bookings Now Open – Early Bird Discounts Available"}</span>
          </div>

          {/* Quick contact info & license */}
          <div className="flex items-center gap-4 text-slate-300 ml-auto hidden sm:flex">
            <a 
              href={`tel:${siteConfig.contact.phone}`} 
              className="flex items-center gap-1.5 hover:text-[#E7A93B] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#E7A93B]" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href={`mailto:${siteConfig.contact.email}`} 
              className="flex items-center gap-1.5 hover:text-[#E7A93B] transition-colors"
            >
              <Mail className="w-3 h-3 text-[#E7A93B]" />
              <span>{siteConfig.contact.email}</span>
            </a>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>{siteConfig.accreditation.katoMember}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`w-full bg-[#122544] text-white border-b transition-shadow ${
          scrolled ? "shadow-lg border-[#1F3860]" : "border-[#1F3860]/80"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button 
              onClick={() => handleNavClick("/")}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-[#E7A93B] flex items-center justify-center text-[#122544] shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider uppercase text-white leading-none">
                  HOLIDAY HYPE
                </span>
                <span className="text-[10px] tracking-[0.25em] font-semibold text-[#E7A93B] uppercase mt-0.5">
                  TOURS & TRAVEL
                </span>
              </div>
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
                    className={`text-sm font-medium tracking-wide transition-colors relative py-1.5 focus:outline-none ${
                      isActive 
                        ? "text-[#E7A93B] font-semibold" 
                        : "text-slate-200 hover:text-[#E7A93B]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E7A93B] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Header Right Action CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={onOpenPlanTrip}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm bg-[#D2573F] hover:bg-[#b84a35] text-white font-semibold text-xs uppercase tracking-widest shadow-sm hover:shadow transition-all duration-150 transform hover:-translate-y-0.5 focus:outline-none"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Plan My Trip</span>
              </button>

              <button
                onClick={() => handleNavClick("/contact")}
                className="hidden lg:inline-flex items-center justify-center px-4 py-2.5 rounded-sm border border-white/20 hover:border-[#E7A93B] text-white hover:text-[#E7A93B] font-semibold text-xs uppercase tracking-wider transition-colors"
              >
                Enquire
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                onClick={onOpenPlanTrip}
                className="md:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-[#D2573F] text-white font-semibold text-xs uppercase tracking-wider"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Plan</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-sm text-white hover:bg-[#1F3860] focus:outline-none transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0B182B] border-b border-[#1F3860] px-4 pt-2 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1 divide-y divide-[#1F3860]/50">
              {navLinks.map((link) => {
                const isActive = 
                  link.path === "/" 
                    ? currentPath === "/" || currentPath === "" 
                    : currentPath.startsWith(link.path);
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`flex items-center justify-between py-3 px-2 text-base font-medium rounded text-left transition-colors ${
                      isActive 
                        ? "text-[#E7A93B] font-semibold bg-[#122544]" 
                        : "text-slate-200 hover:bg-[#122544]"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-[#1F3860] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPlanTrip();
                }}
                className="w-full py-3 rounded-sm bg-[#D2573F] text-white font-semibold uppercase tracking-widest text-xs text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Start Custom Trip Planner</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-2">
                <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-1 hover:text-[#E7A93B]">
                  <Phone className="w-3.5 h-3.5 text-[#E7A93B]" />
                  <span>Call Us</span>
                </a>
                <span>•</span>
                <a 
                  href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[#E7A93B] font-medium"
                >
                  <span>WhatsApp Direct</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
