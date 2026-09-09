import React, { useState, useEffect } from "react";
import { 
  destinationsRepository, 
  packagesRepository, 
  servicesRepository, 
  testimonialsRepository, 
  blogRepository, 
  settingsRepository 
} from "./lib/repositories";
import { 
  Destination, 
  HolidayPackage, 
  TravelService, 
  Testimonial, 
  BlogPost 
} from "./lib/types";

// Layout & Global Components
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { BookingModal } from "./components/BookingModal";
import { InquiryModal } from "./components/InquiryModal";

// Pages
import { HomePage } from "./pages/HomePage";
import { DestinationsPage } from "./pages/DestinationsPage";
import { DestinationDetailPage } from "./pages/DestinationDetailPage";
import { PackagesPage } from "./pages/PackagesPage";
import { PackageDetailPage } from "./pages/PackageDetailPage";
import { ToursPage } from "./pages/ToursPage";
import { FlightsPage } from "./pages/FlightsPage";
import { HotelsPage } from "./pages/HotelsPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { PlanMyTripPage } from "./pages/PlanMyTripPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { TermsPage } from "./pages/TermsPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { CancellationPolicyPage } from "./pages/CancellationPolicyPage";
import { AdminPage } from "./pages/AdminPage";
import { CorporateTravelPage } from "./pages/CorporateTravelPage";

export default function App() {
  // Navigation State
  const [currentPath, setCurrentPath] = useState<string>("/");
  
  // Data Repositories State
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [packages, setPackages] = useState<HolidayPackage[]>([]);
  const [services, setServices] = useState<TravelService[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [siteNotice, setSiteNotice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Selected Detail Items
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<HolidayPackage | null>(null);
  const [selectedService, setSelectedService] = useState<TravelService | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  // Modal Control States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPackage, setBookingPackage] = useState<HolidayPackage | null>(null);

  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<import("./lib/types").InquiryType>("general");
  const [inquiryContext, setInquiryContext] = useState<string | undefined>(undefined);

  // Load initial repository data
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [d, p, s, t, b, notice] = await Promise.all([
          destinationsRepository.getAll(),
          packagesRepository.getAll(),
          servicesRepository.getAll(),
          testimonialsRepository.getAll(),
          blogRepository.getAll(),
          settingsRepository.getSiteNotice(),
        ]);
        setDestinations(d);
        setPackages(p);
        setServices(s);
        setTestimonials(t);
        setBlogPosts(b);
        setSiteNotice(notice);
      } catch (err) {
        console.error("Error loading application state:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Sync with browser navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || "/";
      navigate(path, false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [destinations, packages, services, blogPosts]);

  // Navigate handler
  const navigate = (path: string, pushHistory: boolean = true) => {
    // Scroll to top immediately on navigation
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (pushHistory && window.location.pathname !== path) {
      window.history.pushState({}, "", path);
    }

    setCurrentPath(path);

    // Resolve dynamic path segments
    if (path.startsWith("/destinations/")) {
      const slug = path.replace("/destinations/", "");
      const found = destinations.find((d) => d.slug === slug);
      if (found) setSelectedDestination(found);
    } else if (path.startsWith("/packages/")) {
      const slug = path.replace("/packages/", "");
      const found = packages.find((p) => p.slug === slug);
      if (found) setSelectedPackage(found);
    } else if (path.startsWith("/services/")) {
      const slug = path.replace("/services/", "");
      const found = services.find((s) => s.slug === slug);
      if (found) setSelectedService(found);
    } else if (path.startsWith("/blog/")) {
      const slug = path.replace("/blog/", "");
      const found = blogPosts.find((b) => b.slug === slug);
      if (found) setSelectedBlogPost(found);
    }
  };

  // Quick Action Handlers
  const handleOpenBooking = (pkg?: HolidayPackage) => {
    setBookingPackage(pkg || packages[0] || null);
    setIsBookingOpen(true);
  };

  const handleOpenInquiry = (type: import("./lib/types").InquiryType = "general", context?: string) => {
    setInquiryType(type);
    setInquiryContext(context);
    setIsInquiryOpen(true);
  };

  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    navigate(`/destinations/${dest.slug}`);
  };

  const handleSelectPackage = (pkg: HolidayPackage) => {
    setSelectedPackage(pkg);
    navigate(`/packages/${pkg.slug}`);
  };

  const handleSelectService = (service: TravelService) => {
    setSelectedService(service);
    navigate(`/services/${service.slug}`);
  };

  const handleSelectBlogPost = (post: BlogPost) => {
    setSelectedBlogPost(post);
    navigate(`/blog/${post.slug}`);
  };

  // Render current view
  const renderCurrentPage = () => {
    // 1. Destination Detail
    if (currentPath.startsWith("/destinations/")) {
      const slug = currentPath.replace("/destinations/", "").split("?")[0];
      const found = (selectedDestination && selectedDestination.slug === slug) 
        ? selectedDestination 
        : destinations.find((d) => d.slug === slug);

      if (found) {
        return (
          <DestinationDetailPage
            destination={found}
            packages={packages}
            onBack={() => navigate("/destinations")}
            onSelectPackage={handleSelectPackage}
            onBookPackage={handleOpenBooking}
            onOpenPlanTrip={() => navigate("/plan-my-trip")}
            onInquire={(title, dest) => handleOpenInquiry("general", `${title} (${dest})`)}
          />
        );
      }

      if (!isLoading) {
        return (
          <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4 bg-white rounded-lg border border-[#122544]/10 my-10 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-[#122544]">Destination Not Found</h2>
            <p className="text-xs sm:text-sm text-stone-600">
              We couldn't locate a destination guide matching "{slug}".
            </p>
            <button
              onClick={() => navigate("/destinations")}
              className="px-5 py-2.5 rounded-sm bg-[#122544] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1f3860] transition-colors"
            >
              Back to All Destinations
            </button>
          </div>
        );
      }
    }

    // 2. Package Detail
    if (currentPath.startsWith("/packages/")) {
      const slug = currentPath.replace("/packages/", "").split("?")[0];
      const foundPkg = (selectedPackage && selectedPackage.slug === slug)
        ? selectedPackage
        : packages.find((p) => p.slug === slug || p.id === slug);

      if (foundPkg) {
        return (
          <PackageDetailPage
            pkg={foundPkg}
            relatedPackages={packages}
            onBack={() => navigate("/packages")}
            onBookNow={handleOpenBooking}
            onOpenInquiry={() => handleOpenInquiry("general", foundPkg.title)}
            onSelectRelated={handleSelectPackage}
          />
        );
      }

      if (!isLoading) {
        return (
          <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4 bg-white rounded-lg border border-[#122544]/10 my-10 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-[#122544]">Package Not Found</h2>
            <p className="text-xs sm:text-sm text-stone-600">
              We couldn't locate a safari or tour package matching this link.
            </p>
            <button
              onClick={() => navigate("/packages")}
              className="px-5 py-2.5 rounded-sm bg-[#122544] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1f3860] transition-colors"
            >
              Browse All Packages
            </button>
          </div>
        );
      }
    }

    // 3. Service Detail
    if (currentPath.startsWith("/services/")) {
      const slug = currentPath.replace("/services/", "").split("?")[0];
      const foundService = (selectedService && selectedService.slug === slug)
        ? selectedService
        : services.find((s) => s.slug === slug || s.id === slug);

      if (foundService) {
        return (
          <ServiceDetailPage
            service={foundService}
            onBack={() => navigate("/services")}
            onInquire={(s) => handleOpenInquiry("general", s.title)}
            onOpenPlanTrip={() => navigate("/plan-my-trip")}
          />
        );
      }

      if (!isLoading) {
        return (
          <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4 bg-white rounded-lg border border-[#122544]/10 my-10 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-[#122544]">Service Not Found</h2>
            <p className="text-xs sm:text-sm text-stone-600">
              We couldn't locate the requested travel service.
            </p>
            <button
              onClick={() => navigate("/services")}
              className="px-5 py-2.5 rounded-sm bg-[#122544] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1f3860] transition-colors"
            >
              View All Services
            </button>
          </div>
        );
      }
    }

    // 4. Blog Post Detail
    if (currentPath.startsWith("/blog/")) {
      const slug = currentPath.replace("/blog/", "").split("?")[0];
      const foundPost = (selectedBlogPost && selectedBlogPost.slug === slug)
        ? selectedBlogPost
        : blogPosts.find((p) => p.slug === slug || p.id === slug);

      if (foundPost) {
        return (
          <BlogPostPage
            post={foundPost}
            onBack={() => navigate("/blog")}
            onOpenPlanTrip={() => navigate("/plan-my-trip")}
          />
        );
      }

      if (!isLoading) {
        return (
          <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4 bg-white rounded-lg border border-[#122544]/10 my-10 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-[#122544]">Article Not Found</h2>
            <p className="text-xs sm:text-sm text-stone-600">
              We couldn't locate the travel article you requested.
            </p>
            <button
              onClick={() => navigate("/blog")}
              className="px-5 py-2.5 rounded-sm bg-[#122544] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1f3860] transition-colors"
            >
              View All Articles
            </button>
          </div>
        );
      }
    }

    // Static / Main Pages
    switch (currentPath) {
      case "/destinations":
        return (
          <DestinationsPage
            destinations={destinations}
            onSelectDestination={handleSelectDestination}
            onOpenPlanTrip={() => navigate("/plan-my-trip")}
          />
        );

      case "/packages":
        return (
          <PackagesPage
            packages={packages}
            destinations={destinations}
            onSelectPackage={handleSelectPackage}
            onBookPackage={handleOpenBooking}
            onOpenPlanTrip={() => navigate("/plan-my-trip")}
          />
        );

      case "/tours":
        return (
          <ToursPage
            packages={packages}
            destinations={destinations}
            onSelectPackage={handleSelectPackage}
            onBookPackage={handleOpenBooking}
            onOpenPlanTrip={() => navigate("/plan-my-trip")}
          />
        );

      case "/corporate":
        return (
          <CorporateTravelPage
            navigate={navigate}
            onOpenPlanTrip={() => navigate("/plan-my-trip")}
          />
        );

      case "/flights":
        return <FlightsPage />;

      case "/hotels":
        return <HotelsPage />;

      case "/services":
        return (
          <ServicesPage
            services={services}
            onSelectService={handleSelectService}
            onInquireService={(s) => handleOpenInquiry("general", s.title)}
            onOpenPlanTrip={() => navigate("/plan-my-trip")}
          />
        );

      case "/plan-my-trip":
        return (
          <PlanMyTripPage
            destinations={destinations}
            onBack={() => navigate("/")}
            navigate={navigate}
          />
        );

      case "/about":
        return (
          <AboutPage
            onOpenPlanTrip={() => navigate("/plan-my-trip")}
            navigate={navigate}
          />
        );

      case "/contact":
        return <ContactPage />;

      case "/blog":
        return (
          <BlogPage
            posts={blogPosts}
            onSelectPost={handleSelectBlogPost}
          />
        );

      case "/terms":
        return <TermsPage onBack={() => navigate("/")} />;

      case "/privacy":
        return <PrivacyPage onBack={() => navigate("/")} />;

      case "/cancellation":
        return <CancellationPolicyPage onBack={() => navigate("/")} />;

      case "/admin":
        return <AdminPage />;

      case "/":
      default:
        return (
          <HomePage
            destinations={destinations}
            packages={packages}
            services={services}
            testimonials={testimonials}
            onSelectDestination={handleSelectDestination}
            onSelectPackage={handleSelectPackage}
            onSelectService={handleSelectService}
            onBookPackage={handleOpenBooking}
            onOpenPlanTrip={() => navigate("/plan-my-trip")}
            navigate={navigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#122544] font-sans antialiased selection:bg-[#E7A93B]/20 selection:text-[#122544]">
      {/* Site-wide Header */}
      <Header
        currentPath={currentPath}
        navigate={navigate}
        onOpenPlanTrip={() => navigate("/plan-my-trip")}
        onOpenInquiry={() => handleOpenInquiry("general")}
        siteNotice={siteNotice}
      />

      {/* Main Page Body */}
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>

      {/* Site-wide Footer */}
      <Footer
        navigate={navigate}
        onOpenPlanTrip={() => navigate("/plan-my-trip")}
      />

      {/* Sticky Floating WhatsApp Assistant */}
      <FloatingWhatsApp onOpenPlanTrip={() => navigate("/plan-my-trip")} />

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedPackage={bookingPackage}
        availablePackages={packages}
      />

      {/* Global Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        defaultType={inquiryType}
        defaultTitle={inquiryContext}
      />
    </div>
  );
}
