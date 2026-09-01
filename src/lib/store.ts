/**
 * Holiday Hype Tours & Travel - Content & Data Store
 * In-memory & browser-persisted store holding system data.
 */

import {
  Destination,
  HolidayPackage,
  TourSafari,
  TravelService,
  Testimonial,
  BlogPost,
  Booking,
  Inquiry,
  ContactMessage,
  NewsletterSubscriber
} from "./types";
import {
  seedDestinations,
  seedPackages,
  seedServices,
  seedTestimonials,
  seedBlogPosts
} from "./data/seed";

export interface DataStoreState {
  destinations: Destination[];
  packages: HolidayPackage[];
  services: TravelService[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  bookings: Booking[];
  inquiries: Inquiry[];
  contactMessages: ContactMessage[];
  newsletterSubscribers: NewsletterSubscriber[];
  siteNotice?: string;
}

// Initial default bookings and inquiries for realistic admin state
const initialBookings: Booking[] = [
  {
    id: "bk-101",
    referenceNumber: "HHT-2026-8941",
    packageId: "pkg-kenya-classic-7d",
    packageTitle: "7-Day Classic Kenya Big 5 & Great Migration Safari",
    destinationName: "Kenya",
    travelDate: "2026-08-15",
    endDate: "2026-08-21",
    adultsCount: 2,
    childrenCount: 1,
    roomType: "Double / Twin",
    pricePerPersonUsd: 1850,
    totalEstimatedPriceUsd: 4902,
    leadTraveler: {
      fullName: "Sir Richard & Lady Eleanor Sterling",
      email: "sterling.travels@example.co.uk",
      phone: "+44 7700 900821",
      countryOfResidence: "United Kingdom"
    },
    specialRequests: "Hot Air Balloon Safari for 2 adults; Anniversary champagne in Maasai Mara",
    dietaryRequirements: "1 Gluten-free vegetarian",
    paymentMethod: "Bank Wire Transfer",
    paymentStatus: "partial_deposit",
    status: "confirmed",
    createdAt: "2026-02-14T09:30:00Z",
    internalNotes: "Deposit received via Standard Chartered wire. Balloon safari booked with Governors."
  },
  {
    id: "bk-102",
    referenceNumber: "HHT-2026-9022",
    packageId: "pkg-bush-beach-10d",
    packageTitle: "10-Day Bush & Beach Bliss: Maasai Mara + Diani Beach Luxury Escape",
    destinationName: "Kenya",
    travelDate: "2026-09-10",
    adultsCount: 2,
    childrenCount: 0,
    roomType: "Double / Twin",
    pricePerPersonUsd: 2890,
    totalEstimatedPriceUsd: 5780,
    leadTraveler: {
      fullName: "Emily & Nathan Thorne",
      email: "thorne.honeymoon@example.com",
      phone: "+1 (555) 234-5678",
      countryOfResidence: "United States"
    },
    specialRequests: "Honeymoon setup at The Sands at Nomad Diani Beach",
    paymentMethod: "Card Invoicing via Pesapal/Stripe",
    paymentStatus: "invoice_pending",
    status: "pending_confirmation",
    createdAt: "2026-02-28T14:15:00Z",
    internalNotes: "Awaiting client response to 3D-secure invoice link sent 28 Feb."
  }
];

const initialInquiries: Inquiry[] = [
  {
    id: "inq-201",
    referenceNumber: "INQ-2026-041",
    type: "custom_trip",
    fullName: "Klaus & Heidi Weber",
    email: "klaus.weber@example.de",
    phone: "+49 170 1234567",
    destinationInterest: "Kenya & Tanzania Combined",
    travelDates: "October 2026",
    durationDays: 12,
    travelersCount: 4,
    adults: 4,
    children: 0,
    budgetPerPerson: "$4,000 - $6,000",
    accommodationPreference: "Luxury 5-Star Lodges & Tented Camps",
    interests: ["Big Five", "Serengeti Migration", "Ngorongoro Crater", "Photography"],
    message: "We are two couples from Munich looking for a private 4x4 safari with a dedicated German or fluent English guide. We want maximum time in Mara North and Central Serengeti.",
    status: "quote_sent",
    createdAt: "2026-02-25T11:20:00Z",
    internalNotes: "Proposal v1 sent by Joseph with Serena and Elewana lodge quotes."
  },
  {
    id: "inq-202",
    referenceNumber: "INQ-2026-042",
    type: "flight",
    fullName: "Sarah Jenkins",
    email: "sarah.j@techcorp.com",
    phone: "+1 415 555 0199",
    destinationInterest: "Nairobi to Maasai Mara (Bush Flight)",
    travelDates: "2026-07-20",
    travelersCount: 2,
    message: "Need 2 round-trip scheduled bush flight tickets from Wilson Airport (WIL) to Keekorok / Ol Kiombo airstrip in Maasai Mara.",
    status: "new",
    createdAt: "2026-03-01T08:05:00Z"
  }
];

const initialSubscribers: NewsletterSubscriber[] = [
  { id: "sub-1", email: "wanderlust.sarah@gmail.com", subscribedAt: "2026-01-12", active: true },
  { id: "sub-2", email: "james.safari.photo@yahoo.com", subscribedAt: "2026-01-28", active: true },
  { id: "sub-3", email: "m.schmidt.travel@web.de", subscribedAt: "2026-02-15", active: true }
];

const initialContactMessages: ContactMessage[] = [
  {
    id: "msg-1",
    fullName: "Antoine Moreau",
    email: "antoine.moreau@example.fr",
    phone: "+33 6 12 34 56 78",
    subject: "Visa assistance and child safety on safari",
    message: "Hello, we are planning a family trip with an 8-year-old in December. Could you let us know age limits for walking safaris and game drives?",
    createdAt: "2026-02-26T16:40:00Z",
    read: false
  }
];

const STORAGE_KEY = "hht_content_store_v1";

class ContentStore {
  private state: DataStoreState;

  constructor() {
    this.state = this.loadState();
  }

  private loadState(): DataStoreState {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            destinations: parsed.destinations || seedDestinations,
            packages: parsed.packages || seedPackages,
            services: parsed.services || seedServices,
            testimonials: parsed.testimonials || seedTestimonials,
            blogPosts: parsed.blogPosts || seedBlogPosts,
            bookings: parsed.bookings || initialBookings,
            inquiries: parsed.inquiries || initialInquiries,
            contactMessages: parsed.contactMessages || initialContactMessages,
            newsletterSubscribers: parsed.newsletterSubscribers || initialSubscribers,
            siteNotice: parsed.siteNotice || "🌿 2026 Great Migration Bookings Now Open – Early Bird Discounts Available",
          };
        }
      } catch (err) {
        console.warn("Could not parse local storage, falling back to seed data", err);
      }
    }

    return {
      destinations: [...seedDestinations],
      packages: [...seedPackages],
      services: [...seedServices],
      testimonials: [...seedTestimonials],
      blogPosts: [...seedBlogPosts],
      bookings: [...initialBookings],
      inquiries: [...initialInquiries],
      contactMessages: [...initialContactMessages],
      newsletterSubscribers: [...initialSubscribers],
      siteNotice: "🌿 2026 Great Migration Bookings Now Open – Early Bird Discounts Available",
    };
  }

  private saveState() {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (err) {
        console.warn("Failed to persist state to localStorage", err);
      }
    }
  }

  // Destinations
  public getDestinations(): Destination[] {
    return this.state.destinations;
  }

  public getDestinationBySlug(slug: string): Destination | undefined {
    return this.state.destinations.find(d => d.slug === slug || d.id === slug);
  }

  // Packages & Tours
  public getPackages(): HolidayPackage[] {
    return this.state.packages;
  }

  public getPackageBySlug(slug: string): HolidayPackage | undefined {
    return this.state.packages.find(p => p.slug === slug || p.id === slug);
  }

  public getTours(): TourSafari[] {
    return this.state.packages.map(pkg => ({
      ...pkg,
      departureType: (pkg.groupSize.toLowerCase().includes("private") ? "Custom Private" : "Daily Guaranteed") as any,
      difficulty: (pkg.durationDays > 7 ? "Moderate" : "Easy") as any
    }));
  }

  public getTourBySlug(slug: string): TourSafari | undefined {
    const pkg = this.getPackageBySlug(slug);
    if (!pkg) return undefined;
    return {
      ...pkg,
      departureType: (pkg.groupSize.toLowerCase().includes("private") ? "Custom Private" : "Daily Guaranteed") as any,
      difficulty: (pkg.durationDays > 7 ? "Moderate" : "Easy") as any
    };
  }

  public updatePackage(updated: HolidayPackage): HolidayPackage {
    const idx = this.state.packages.findIndex(p => p.id === updated.id);
    if (idx >= 0) {
      this.state.packages[idx] = updated;
    } else {
      this.state.packages.push(updated);
    }
    this.saveState();
    return updated;
  }

  public deletePackage(id: string): boolean {
    const prevLen = this.state.packages.length;
    this.state.packages = this.state.packages.filter(p => p.id !== id);
    this.saveState();
    return this.state.packages.length < prevLen;
  }

  // Services
  public getServices(): TravelService[] {
    return this.state.services;
  }

  public getServiceBySlug(slug: string): TravelService | undefined {
    return this.state.services.find(s => s.slug === slug || s.id === slug);
  }

  // Testimonials
  public getTestimonials(): Testimonial[] {
    return this.state.testimonials;
  }

  public addTestimonial(testimonial: Omit<Testimonial, "id" | "verified">): Testimonial {
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: `test-${Date.now()}`,
      verified: true
    };
    this.state.testimonials.unshift(newTestimonial);
    this.saveState();
    return newTestimonial;
  }

  // Blog
  public getBlogPosts(): BlogPost[] {
    return this.state.blogPosts;
  }

  public getBlogPostBySlug(slug: string): BlogPost | undefined {
    return this.state.blogPosts.find(b => b.slug === slug || b.id === slug);
  }

  public addOrUpdateBlogPost(post: BlogPost): BlogPost {
    const idx = this.state.blogPosts.findIndex(b => b.id === post.id);
    if (idx >= 0) {
      this.state.blogPosts[idx] = post;
    } else {
      this.state.blogPosts.unshift(post);
    }
    this.saveState();
    return post;
  }

  public deleteBlogPost(id: string): boolean {
    const prevLen = this.state.blogPosts.length;
    this.state.blogPosts = this.state.blogPosts.filter(b => b.id !== id);
    this.saveState();
    return this.state.blogPosts.length < prevLen;
  }

  // Bookings
  public getBookings(): Booking[] {
    return this.state.bookings;
  }

  public getBookingByReference(reference: string): Booking | undefined {
    return this.state.bookings.find(b => b.referenceNumber.toLowerCase() === reference.toLowerCase() || b.id === reference);
  }

  public createBooking(data: Omit<Booking, "id" | "referenceNumber" | "status" | "createdAt">): Booking {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...data,
      id: `bk-${Date.now()}`,
      referenceNumber: `HHT-2026-${randomCode}`,
      status: "pending_confirmation",
      createdAt: new Date().toISOString()
    };
    this.state.bookings.unshift(newBooking);
    this.saveState();
    return newBooking;
  }

  public updateBookingStatus(id: string, status: Booking["status"], internalNotes?: string): Booking | null {
    const booking = this.state.bookings.find(b => b.id === id);
    if (!booking) return null;
    booking.status = status;
    if (internalNotes !== undefined) {
      booking.internalNotes = internalNotes;
    }
    this.saveState();
    return booking;
  }

  // Inquiries
  public getInquiries(): Inquiry[] {
    return this.state.inquiries;
  }

  public createInquiry(data: Omit<Inquiry, "id" | "referenceNumber" | "status" | "createdAt">): Inquiry {
    const randomCode = Math.floor(100 + Math.random() * 900);
    const newInquiry: Inquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      referenceNumber: `INQ-2026-${randomCode}`,
      status: "new",
      createdAt: new Date().toISOString()
    };
    this.state.inquiries.unshift(newInquiry);
    this.saveState();
    return newInquiry;
  }

  public updateInquiryStatus(id: string, status: Inquiry["status"], internalNotes?: string): Inquiry | null {
    const inq = this.state.inquiries.find(i => i.id === id);
    if (!inq) return null;
    inq.status = status;
    if (internalNotes !== undefined) {
      inq.internalNotes = internalNotes;
    }
    this.saveState();
    return inq;
  }

  // Contact Messages
  public getContactMessages(): ContactMessage[] {
    return this.state.contactMessages;
  }

  public createContactMessage(data: Omit<ContactMessage, "id" | "createdAt" | "read">): ContactMessage {
    const newMsg: ContactMessage = {
      ...data,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false
    };
    this.state.contactMessages.unshift(newMsg);
    this.saveState();
    return newMsg;
  }

  public markContactMessageRead(id: string): boolean {
    const msg = this.state.contactMessages.find(m => m.id === id);
    if (!msg) return false;
    msg.read = true;
    this.saveState();
    return true;
  }

  // Newsletter
  public getSubscribers(): NewsletterSubscriber[] {
    return this.state.newsletterSubscribers;
  }

  public addSubscriber(email: string): { success: boolean; message: string; subscriber?: NewsletterSubscriber } {
    const normalized = email.trim().toLowerCase();
    const existing = this.state.newsletterSubscribers.find(s => s.email.toLowerCase() === normalized);
    if (existing) {
      return { success: true, message: "You are already subscribed to the Holiday Hype safari newsletter!" };
    }
    const newSub: NewsletterSubscriber = {
      id: `sub-${Date.now()}`,
      email: normalized,
      subscribedAt: new Date().toISOString().split("T")[0],
      active: true
    };
    this.state.newsletterSubscribers.unshift(newSub);
    this.saveState();
    return { success: true, message: "Thank you for subscribing! Check your inbox for exclusive safari guides and early bird rates.", subscriber: newSub };
  }

  // Site Settings
  public getSiteNotice(): string | undefined {
    return this.state.siteNotice;
  }

  public setSiteNotice(notice: string): void {
    this.state.siteNotice = notice;
    this.saveState();
  }

  // Reset to seed
  public resetToSeed(): void {
    this.state = {
      destinations: [...seedDestinations],
      packages: [...seedPackages],
      services: [...seedServices],
      testimonials: [...seedTestimonials],
      blogPosts: [...seedBlogPosts],
      bookings: [...initialBookings],
      inquiries: [...initialInquiries],
      contactMessages: [...initialContactMessages],
      newsletterSubscribers: [...initialSubscribers],
      siteNotice: "🌿 2026 Great Migration Bookings Now Open – Early Bird Discounts Available",
    };
    this.saveState();
  }
}

export const store = new ContentStore();
