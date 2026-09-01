/**
 * Holiday Hype Tours & Travel - Type Definitions
 */

export type TravelStyle = 
  | "Wildlife Safari"
  | "Luxury Safari"
  | "Budget & Mid-Range"
  | "Beach & Coastal"
  | "Bush & Beach Combo"
  | "Gorilla Trekking"
  | "Cultural & Heritage"
  | "Honeymoon & Romance"
  | "Adventure & Hiking";

export type DurationCategory = "1-3 days" | "4-7 days" | "8-14 days" | "15+ days";

export type Seasonality = "Year-Round" | "Peak (July-Oct)" | "Green Season (Nov-May)" | "Migration Season";

export interface ItineraryDay {
  day: number;
  title: string;
  location: string;
  description: string;
  meals: string; // e.g. "Breakfast, Lunch, Dinner"
  accommodation: string; // e.g. "Mara Serena Safari Lodge"
  activities: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: string;
  heroImage: string;
  thumbnail: string;
  gallery: string[];
  tagline: string;
  overview: string;
  bestTimeToVisit: string;
  climate: string;
  topAttractions: string[];
  keyWildlife: string[];
  travelTips: {
    visa: string;
    currency: string;
    languages: string;
    vaccinations: string;
  };
  featured: boolean;
  packageCount?: number;
}

export interface HolidayPackage {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  destinationId: string;
  destinationName: string;
  country: string;
  durationDays: number;
  durationNights: number;
  pricePerPersonUsd: number;
  priceOriginalUsd?: number;
  groupSize: string; // e.g., "Max 6 per 4x4 Jeep" or "Private / Tailored"
  travelStyle: TravelStyle;
  featured: boolean;
  popular: boolean;
  heroImage: string;
  thumbnail: string;
  gallery: string[];
  overview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  faqs: FAQ[];
  bestSeason: string;
  transportType: string;
  accommodationType: string;
  rating: number;
  reviewCount: number;
}

export interface TourSafari extends HolidayPackage {
  departureType: "Daily Guaranteed" | "Custom Private" | "Scheduled Group";
  difficulty: "Easy" | "Moderate" | "Challenging";
}

export interface TravelService {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  image: string;
  features: string[];
  benefits: string[];
  faqs: FAQ[];
  ctaLabel: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  originCountry: string;
  travelerType: "Couple" | "Family" | "Solo Traveler" | "Group of Friends" | "Corporate";
  packageTaken: string;
  rating: number;
  reviewDate: string;
  comment: string;
  avatarUrl?: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown / HTML formatted
  category: "Safari Guides" | "Travel Tips" | "Wildlife Conservation" | "Destination Focus" | "Photography";
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTimeMinutes: number;
  coverImage: string;
  tags: string[];
  featured: boolean;
}

export type BookingStatus = "pending_confirmation" | "confirmed" | "invoice_sent" | "cancelled" | "completed";

export interface Booking {
  id: string;
  referenceNumber: string;
  packageId?: string;
  packageTitle: string;
  destinationName: string;
  travelDate: string;
  endDate?: string;
  adultsCount: number;
  childrenCount: number;
  roomType: "Single" | "Double / Twin" | "Family Suite" | "Luxury Tent";
  pricePerPersonUsd: number;
  totalEstimatedPriceUsd: number;
  
  // Customer details
  leadTraveler: {
    fullName: string;
    email: string;
    phone: string;
    countryOfResidence: string;
  };
  specialRequests?: string;
  dietaryRequirements?: string;
  flightDetails?: string;

  // Payment status
  paymentMethod: "Bank Wire Transfer" | "M-Pesa Business Invoicing" | "Card Invoicing via Pesapal/Stripe" | "Consultation Quote";
  paymentStatus: "quote_requested" | "invoice_pending" | "partial_deposit" | "paid_full";
  paymentNotes?: string;

  status: BookingStatus;
  createdAt: string;
  internalNotes?: string;
}

export type InquiryType = "general" | "custom_trip" | "flight" | "hotel" | "corporate" | "safari_quote" | "flight_booking" | "hotel_reservation";

export interface Inquiry {
  id: string;
  referenceNumber: string;
  type: InquiryType;
  fullName: string;
  email: string;
  phone: string;
  destinationInterest?: string;
  travelDates?: string;
  durationDays?: number;
  travelersCount?: number;
  adults?: number;
  children?: number;
  budgetPerPerson?: string;
  accommodationPreference?: string;
  interests?: string[];
  message: string;
  status: "new" | "contacted" | "quote_sent" | "closed";
  createdAt: string;
  internalNotes?: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  active: boolean;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: "super_admin" | "travel_consultant";
}

export interface SearchFilterState {
  destination: string;
  travelStyle: string;
  duration: string;
  priceMax: number;
  query: string;
  sortBy: "popular" | "price_low" | "price_high" | "duration_asc" | "duration_desc" | "rating";
}
