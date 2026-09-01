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
    if (currentPath.startsWith("/destinations/") && selectedDestination) {
      return (
        <DestinationDetailPage
          destination={selectedDestination}
          allPackages={packages}
          onBack={() => navigate("/destinations")}
          onSelectPackage={handleSelectPackage}
          onBookPackage={handleOpenBooking}
          onOpenPlanTrip={() => navigate("/plan-my-trip")}
        />
      );
    }

    // 2. Package Detail
    if (currentPath.startsWith("/packages/") && selectedPackage) {
      return (
        <PackageDetailPage
          pkg={selectedPackage}
          relatedPackages={packages}
          onBack={() => navigate("/packages")}
          onBookNow={handleOpenBooking}
          onOpenInquiry={() => handleOpenInquiry("general", selectedPackage.title)}
          onSelectRelated={handleSelectPackage}
        />
      );
    }

    // 3. Service Detail
    if (currentPath.startsWith("/services/") && selectedService) {
      return (
        <ServiceDetailPage
          service={selectedService}
          onBack={() => navigate("/services")}
          onInquire={(s) => handleOpenInquiry("general", s.title)}
          onOpenPlanTrip={() => navigate("/plan-my-trip")}
        />
      );
    }

    // 4. Blog Post Detail
    if (currentPath.startsWith("/blog/") && selectedBlogPost) {
      return (
        <BlogPostPage
          post={selectedBlogPost}
          onBack={() => navigate("/blog")}
          onOpenPlanTrip={() => navigate("/plan-my-trip")}
        />
      );
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
