/**
 * Holiday Hype Tours & Travel - Repository Abstraction Layer
 * 
 * Provides an asynchronous database-agnostic interface.
 * When switching from JSON/Local storage to PostgreSQL/Supabase, only these repository
 * implementations need to be swapped, leaving UI components and business rules unchanged.
 */

import { store } from "./store";
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
  NewsletterSubscriber,
  SearchFilterState
} from "./types";

export const destinationsRepository = {
  async getAll(): Promise<Destination[]> {
    return Promise.resolve(store.getDestinations());
  },
  async getBySlug(slug: string): Promise<Destination | null> {
    const dest = store.getDestinationBySlug(slug);
    return Promise.resolve(dest || null);
  },
  async getFeatured(): Promise<Destination[]> {
    const all = store.getDestinations();
    return Promise.resolve(all.filter(d => d.featured));
  }
};

export const packagesRepository = {
  async getAll(filter?: Partial<SearchFilterState>): Promise<HolidayPackage[]> {
    let items = store.getPackages();

    if (!filter) return Promise.resolve(items);

    if (filter.destination && filter.destination !== "all") {
      items = items.filter(
        p => p.destinationId === filter.destination || p.country.toLowerCase() === filter.destination?.toLowerCase()
      );
    }

    if (filter.travelStyle && filter.travelStyle !== "all") {
      items = items.filter(p => p.travelStyle === filter.travelStyle);
    }

    if (filter.duration && filter.duration !== "all") {
      if (filter.duration === "1-3 days") {
        items = items.filter(p => p.durationDays >= 1 && p.durationDays <= 3);
      } else if (filter.duration === "4-7 days") {
        items = items.filter(p => p.durationDays >= 4 && p.durationDays <= 7);
      } else if (filter.duration === "8-14 days") {
        items = items.filter(p => p.durationDays >= 8 && p.durationDays <= 14);
      } else if (filter.duration === "15+ days") {
        items = items.filter(p => p.durationDays >= 15);
      }
    }

    if (filter.priceMax && filter.priceMax > 0) {
      items = items.filter(p => p.pricePerPersonUsd <= filter.priceMax!);
    }

    if (filter.query && filter.query.trim().length > 0) {
      const q = filter.query.toLowerCase();
      items = items.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.destinationName.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q) ||
          p.highlights.some(h => h.toLowerCase().includes(q))
      );
    }

    if (filter.sortBy) {
      items = [...items].sort((a, b) => {
        if (filter.sortBy === "price_low") return a.pricePerPersonUsd - b.pricePerPersonUsd;
        if (filter.sortBy === "price_high") return b.pricePerPersonUsd - a.pricePerPersonUsd;
        if (filter.sortBy === "duration_asc") return a.durationDays - b.durationDays;
        if (filter.sortBy === "duration_desc") return b.durationDays - a.durationDays;
        if (filter.sortBy === "rating") return b.rating - a.rating;
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      });
    }

    return Promise.resolve(items);
  },

  async getBySlug(slug: string): Promise<HolidayPackage | null> {
    const pkg = store.getPackageBySlug(slug);
    return Promise.resolve(pkg || null);
  },

  async getFeatured(): Promise<HolidayPackage[]> {
    const items = store.getPackages();
    return Promise.resolve(items.filter(p => p.featured || p.popular));
  },

  async getByDestination(destinationIdOrSlug: string): Promise<HolidayPackage[]> {
    const items = store.getPackages();
    return Promise.resolve(
      items.filter(
        p =>
          p.destinationId === destinationIdOrSlug ||
          p.country.toLowerCase() === destinationIdOrSlug.toLowerCase() ||
          p.destinationName.toLowerCase().includes(destinationIdOrSlug.toLowerCase())
      )
    );
  },

  async save(pkg: HolidayPackage): Promise<HolidayPackage> {
    return Promise.resolve(store.updatePackage(pkg));
  },

  async delete(id: string): Promise<boolean> {
    return Promise.resolve(store.deletePackage(id));
  }
};

export const toursRepository = {
  async getAll(filter?: Partial<SearchFilterState>): Promise<TourSafari[]> {
    const packages = await packagesRepository.getAll(filter);
    return packages.map(pkg => ({
      ...pkg,
      departureType: (pkg.groupSize.toLowerCase().includes("private") ? "Custom Private" : "Daily Guaranteed") as any,
      difficulty: (pkg.durationDays > 7 ? "Moderate" : "Easy") as any
    }));
  },

  async getBySlug(slug: string): Promise<TourSafari | null> {
    const tour = store.getTourBySlug(slug);
    return Promise.resolve(tour || null);
  }
};

export const servicesRepository = {
  async getAll(): Promise<TravelService[]> {
    return Promise.resolve(store.getServices());
  },
  async getBySlug(slug: string): Promise<TravelService | null> {
    const s = store.getServiceBySlug(slug);
    return Promise.resolve(s || null);
  }
};

export const testimonialsRepository = {
  async getAll(): Promise<Testimonial[]> {
    return Promise.resolve(store.getTestimonials());
  },
  async add(testimonial: Omit<Testimonial, "id" | "verified">): Promise<Testimonial> {
    return Promise.resolve(store.addTestimonial(testimonial));
  }
};

export const blogRepository = {
  async getAll(category?: string): Promise<BlogPost[]> {
    let posts = store.getBlogPosts();
    if (category && category !== "all") {
      posts = posts.filter(p => p.category === category);
    }
    return Promise.resolve(posts);
  },
  async getBySlug(slug: string): Promise<BlogPost | null> {
    const post = store.getBlogPostBySlug(slug);
    return Promise.resolve(post || null);
  },
  async getFeatured(): Promise<BlogPost[]> {
    const posts = store.getBlogPosts();
    return Promise.resolve(posts.filter(p => p.featured));
  },
  async save(post: BlogPost): Promise<BlogPost> {
    return Promise.resolve(store.addOrUpdateBlogPost(post));
  },
  async delete(id: string): Promise<boolean> {
    return Promise.resolve(store.deleteBlogPost(id));
  }
};

export const bookingsRepository = {
  async getAll(): Promise<Booking[]> {
    return Promise.resolve(store.getBookings());
  },
  async getByReference(reference: string): Promise<Booking | null> {
    const b = store.getBookingByReference(reference);
    return Promise.resolve(b || null);
  },
  async create(data: Omit<Booking, "id" | "referenceNumber" | "status" | "createdAt">): Promise<Booking> {
    return Promise.resolve(store.createBooking(data));
  },
  async updateStatus(id: string, status: Booking["status"], notes?: string): Promise<Booking | null> {
    return Promise.resolve(store.updateBookingStatus(id, status, notes));
  }
};

export const inquiriesRepository = {
  async getAll(): Promise<Inquiry[]> {
    return Promise.resolve(store.getInquiries());
  },
  async create(data: Omit<Inquiry, "id" | "referenceNumber" | "status" | "createdAt">): Promise<Inquiry> {
    return Promise.resolve(store.createInquiry(data));
  },
  async updateStatus(id: string, status: Inquiry["status"], notes?: string): Promise<Inquiry | null> {
    return Promise.resolve(store.updateInquiryStatus(id, status, notes));
  }
};

export const newsletterRepository = {
  async getAll(): Promise<NewsletterSubscriber[]> {
    return Promise.resolve(store.getSubscribers());
  },
  async subscribe(email: string): Promise<{ success: boolean; message: string }> {
    return Promise.resolve(store.addSubscriber(email));
  }
};

export const contactRepository = {
  async getAll(): Promise<ContactMessage[]> {
    return Promise.resolve(store.getContactMessages());
  },
  async create(data: Omit<ContactMessage, "id" | "createdAt" | "read">): Promise<ContactMessage> {
    return Promise.resolve(store.createContactMessage(data));
  },
  async markAsRead(id: string): Promise<boolean> {
    return Promise.resolve(store.markContactMessageRead(id));
  }
};

export const settingsRepository = {
  async getSiteNotice(): Promise<string | undefined> {
    return Promise.resolve(store.getSiteNotice());
  },
  async setSiteNotice(notice: string): Promise<void> {
    store.setSiteNotice(notice);
    return Promise.resolve();
  }
};
