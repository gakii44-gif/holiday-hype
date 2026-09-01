/**
 * Holiday Hype Tours & Travel - Central Business Configuration
 * Centralized source of truth for business contact, brand tokens, and defaults.
 */

export const siteConfig = {
  name: "Holiday Hype Tours & Travel",
  shortName: "Holiday Hype",
  legalName: "Holiday Hype Tours & Travel Ltd.",
  tagline: "Unforgettable African Safaris & Bespoke Global Journeys",
  description: "Premier tour operator specializing in authentic East African safaris, luxury beach getaways, flights, hotels, and custom curated adventures.",
  url: "https://holidayhype.travel",
  
  contact: {
    phone: "+254 700 890 123",
    secondaryPhone: "+254 733 456 789",
    whatsapp: "+254 700 890 123",
    whatsappMessage: "Hello Holiday Hype! I would like to plan an unforgettable safari trip.",
    email: "info@holidayhypetravel.com",
    inquiriesEmail: "bookings@holidayhypetravel.com",
    supportEmail: "support@holidayhypetravel.com",
    address: "6th Floor, Parkview Towers, Kimathi Street, P.O. Box 45892-00100, Nairobi, Kenya",
    hours: "Monday – Saturday: 08:00 AM – 06:00 PM (EAT) | 24/7 Emergency Support",
    emergencyContact: "+254 722 000 911",
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
    katoMember: "KATO Associate Category A - No. 592",
    ecotourismKenya: "Eco-Tourism Kenya Certified Operator",
    iataCode: "IATA TIDS 96-123456",
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
    secondary: "KES",
    secondarySymbol: "KSh",
    exchangeRateUsdToKes: 130,
  },

  stats: {
    travelersServed: "12,500+",
    destinationsCount: "8+",
    satisfactionRate: "99.4%",
    yearsExperience: "12+",
    fiveStarReviews: "850+",
  }
};

export type SiteConfig = typeof siteConfig;
