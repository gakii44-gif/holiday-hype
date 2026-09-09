/**
 * Holiday Hype Travel & Tours - Central Business Configuration
 * Centralized source of truth for business contact, brand tokens, and defaults.
 */

export const siteConfig = {
  name: "Holiday Hype Tours & Travel",
  shortName: "Holiday Hype",
  legalName: "Holiday Hype Tours & Travel Ltd.",
  tagline: "Your Next Adventure Starts Here",
  slogan: "Travel should be exciting — not stressful.",
  supportingMessage: "We take care of the details. You enjoy the journey.",
  serviceLine: "Flights • Holidays • Safaris • Hotels • Visa Assistance • Airport Transfers",
  description: "Modern travel agency & tour operator located at Juba International Airport, South Sudan. Specializing in flight booking, holiday packages, bespoke African safaris, hotel reservations, visa assistance, and airport transfers.",
  url: "https://holidayhype.travel",
  
  contact: {
    phone: "+211 926 225 156",
    secondaryPhone: "+211 916 712 073",
    kenyaPhone: "+254 729 096 621",
    whatsapp: "+211 926 225 156",
    whatsappClean: "211926225156",
    whatsappMessage: "Hello Holiday Hype Tours & Travel! I would like to inquire about your travel services.",
    email: "hypetoursandtravelagency@gmail.com",
    secondaryEmail: "jumalugor4@gmail.com",
    inquiriesEmail: "hypetoursandtravelagency@gmail.com",
    supportEmail: "hypetoursandtravelagency@gmail.com",
    address: "Juba International Airport (Opposite Parking), Juba, South Sudan",
    regionalAddress: "Nairobi Liaison Office: Nairobi, Kenya",
    mapUrl: "https://maps.app.goo.gl/JhcTK6GMBsDRGiXS9?g_st=aw",
    headOfOperations: "Juma Lugor",
    headOfOperationsTitle: "Head of Operations",
    hours: "Monday – Saturday: 08:00 AM – 07:00 PM | 24/7 WhatsApp & Emergency Support",
    emergencyContact: "+211 926 225 156 / +254 729 096 621",
  },

  social: {
    instagram: "https://instagram.com/holidayhypetravel",
    facebook: "https://facebook.com/holidayhypetravel",
    tiktok: "https://tiktok.com/@holidayhypetravel",
    tripadvisor: "https://tripadvisor.com/holidayhypetravel",
    youtube: "https://youtube.com/@holidayhypetravel",
  },

  accreditation: {
    licenseNo: "TRA/TTO/2026/04882",
    katoMember: "Accredited Tour & Travel Agency",
    ecotourismKenya: "Eco-Tourism & Safety Compliant",
    iataCode: "IATA TIDS Accredited Partner",
  },

  brand: {
    colors: {
      navy: "#122544",
      gold: "#E7A93B",
      coral: "#D2573F",
      sand: "#FAF8F5",
      sandMuted: "#F2EFE9",
      darkNavy: "#0B182B",
      navyLight: "#1F3860",
    },
    fonts: {
      display: "Fraunces, serif",
      body: "Inter, sans-serif",
    }
  },

  currency: {
    default: "USD",
    symbol: "$",
    secondary: "SSP",
    secondarySymbol: "SSP",
    exchangeRateUsdToKes: 130,
  },

  pillars: {
    location: "Juba International Airport",
    coverage: "East Africa & International",
    support: "24/7 WhatsApp Assistance",
    service: "Personalized Travel Planning",
  }
};

export type SiteConfig = typeof siteConfig;

