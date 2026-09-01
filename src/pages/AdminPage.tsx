import React, { useState } from "react";
import { 
  authenticateAdmin, 
  getStoredAuthToken, 
  storeAuthToken, 
  clearAuthToken, 
  validateAuthToken 
} from "../lib/auth";
import { 
  bookingsRepository, 
  inquiriesRepository, 
  packagesRepository, 
  testimonialsRepository, 
  blogRepository, 
  newsletterRepository,
  contactRepository,
  settingsRepository 
} from "../lib/repositories";
import { 
  Booking, 
  Inquiry, 
  HolidayPackage, 
  Testimonial, 
  BlogPost, 
  NewsletterSubscriber, 
  ContactMessage 
} from "../lib/types";
import { 
  Lock, 
  LogOut, 
  Calendar, 
  Users, 
  DollarSign, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Plus, 
  Edit3, 
  Trash2, 
  Search,
  Settings,
  BookOpen,
  MessageSquare,
  Eye,
  ShieldCheck,
  FileText
} from "lucide-react";

export const AdminPage: React.FC = () => {
  // Auth state
  const [token, setToken] = useState<string | null>(getStoredAuthToken());
  const [emailInput, setEmailInput] = useState("admin@holidayhype.co.ke");
  const [passwordInput, setPasswordInput] = useState("Safari2026!");
  const [authError, setAuthError] = useState("");

  // Tab State
  const [activeTab, setActiveTab] = useState<"bookings" | "inquiries" | "packages" | "blog" | "messages" | "subscribers" | "settings">("bookings");

  // Data State
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [packages, setPackages] = useState<HolidayPackage[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [siteNotice, setSiteNotice] = useState("");
  const [savedNoticeMsg, setSavedNoticeMsg] = useState("");

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [loading, setLoading] = useState(false);

  // Load all dashboard data when authenticated
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [b, inq, pkgs, msgs, subs, notice] = await Promise.all([
        bookingsRepository.getAll(),
        inquiriesRepository.getAll(),
        packagesRepository.getAll(),
        contactRepository.getAll(),
        newsletterRepository.getAll(),
        settingsRepository.getSiteNotice(),
      ]);
      setBookings(b);
      setInquiries(inq);
      setPackages(pkgs);
      setMessages(msgs);
      setSubscribers(subs);
      setSiteNotice(notice || "");
    } catch (err) {
      console.error("Failed to load admin data", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (token && validateAuthToken(token)) {
      loadDashboardData();
    }
  }, [token]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const res = authenticateAdmin(emailInput, passwordInput);
    if (res.success && res.token) {
      storeAuthToken(res.token);
      setToken(res.token);
      setAuthError("");
    } else {
      setAuthError(res.message);
    }
  };

  const handleLogout = () => {
    clearAuthToken();
    setToken(null);
  };

  const handleUpdateBookingStatus = async (id: string, newStatus: Booking["status"]) => {
    await bookingsRepository.updateStatus(id, newStatus);
    await loadDashboardData();
  };

  const handleUpdateInquiryStatus = async (id: string, newStatus: Inquiry["status"]) => {
    await inquiriesRepository.updateStatus(id, newStatus);
    await loadDashboardData();
  };

  const handleSaveNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    await settingsRepository.setSiteNotice(siteNotice);
    setSavedNoticeMsg("Live banner notice successfully updated across all pages!");
    setTimeout(() => setSavedNoticeMsg(""), 3000);
  };

  // If not authenticated, render Login view
  if (!token || !validateAuthToken(token)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-stone-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#122544] text-[#E7A93B] flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#122544]">
              Staff & Operations Portal
            </h1>
            <p className="text-xs text-stone-500">
              Sign in to manage safari bookings, inquiries, and itineraries.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                Staff Email
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                Access Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#122544] hover:bg-[#1a335a] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-[#E7A93B]" />
              <span>Authenticate & Enter Portal</span>
            </button>
          </form>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 space-y-1">
            <p className="font-bold text-[#122544]">Demo Staff Credentials:</p>
            <p>Email: <span className="font-mono text-stone-900">admin@holidayhype.co.ke</span></p>
            <p>Password: <span className="font-mono text-stone-900">Safari2026!</span></p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate quick KPI stats
  const totalPipelineRevenue = bookings.reduce((sum, b) => sum + (b.totalEstimatedPriceUsd || 0), 0);
  const pendingInquiriesCount = inquiries.filter(i => i.status === "new" || i.status === "in_review").length;
  const pendingBookingsCount = bookings.filter(b => b.status === "pending" || b.status === "confirmed").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header Bar */}
      <div className="bg-[#122544] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#E7A93B] text-[#122544] text-[10px] font-extrabold uppercase">
              Operations Control
            </span>
            <span className="text-xs text-slate-300">Holiday Hype Tours & Travel</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
            Safari Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadDashboardData}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
          >
            Refresh Data
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-xs font-bold text-white flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Pipeline Bookings</p>
            <h3 className="font-serif text-2xl font-bold text-[#122544] mt-1">{bookings.length}</h3>
            <p className="text-[10px] text-amber-700 font-semibold">{pendingBookingsCount} Active</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#122544] text-[#E7A93B] flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Est. Total Value</p>
            <h3 className="font-serif text-2xl font-bold text-[#122544] mt-1">${totalPipelineRevenue.toLocaleString()}</h3>
            <p className="text-[10px] text-emerald-700 font-semibold">USD Pipeline</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Trip Inquiries</p>
            <h3 className="font-serif text-2xl font-bold text-[#122544] mt-1">{inquiries.length}</h3>
            <p className="text-[10px] text-rose-600 font-semibold">{pendingInquiriesCount} Require Reply</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Newsletter Subs</p>
            <h3 className="font-serif text-2xl font-bold text-[#122544] mt-1">{subscribers.length}</h3>
            <p className="text-[10px] text-stone-500">Subscribers</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
        {[
          { id: "bookings", label: `Bookings (${bookings.length})`, icon: <Calendar className="w-4 h-4" /> },
          { id: "inquiries", label: `Inquiries (${inquiries.length})`, icon: <MessageSquare className="w-4 h-4" /> },
          { id: "packages", label: `Packages Catalog (${packages.length})`, icon: <Sparkles className="w-4 h-4" /> },
          { id: "messages", label: `Contact Msgs (${messages.length})`, icon: <Mail className="w-4 h-4" /> },
          { id: "subscribers", label: `Subscribers (${subscribers.length})`, icon: <Users className="w-4 h-4" /> },
          { id: "settings", label: "Site Banner & Notice", icon: <Settings className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? "bg-[#122544] text-white shadow-sm"
                : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: Bookings Management */}
      {activeTab === "bookings" && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="font-serif text-xl font-bold text-[#122544]">
              Guest Reservations & Invoices
            </h2>
            <p className="text-xs text-stone-500">
              Live status updates are persisted in store.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 text-[11px] font-bold text-stone-500 uppercase border-b border-stone-200">
                <tr>
                  <th className="p-3">Ref Code</th>
                  <th className="p-3">Lead Guest</th>
                  <th className="p-3">Package / Safari</th>
                  <th className="p-3">Travel Date</th>
                  <th className="p-3">Guests</th>
                  <th className="p-3">Est. Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50/80">
                    <td className="p-3 font-mono font-bold text-[#122544]">{b.referenceNumber}</td>
                    <td className="p-3 font-semibold">
                      {b.leadTraveler.fullName}
                      <span className="block text-[10px] text-stone-400 font-normal">{b.leadTraveler.email}</span>
                    </td>
                    <td className="p-3 max-w-[200px] truncate">{b.packageTitle}</td>
                    <td className="p-3">{b.travelDate}</td>
                    <td className="p-3">{b.adultsCount} Ad, {b.childrenCount} Ch</td>
                    <td className="p-3 font-bold text-emerald-800">${b.totalEstimatedPriceUsd.toLocaleString()}</td>
                    <td className="p-3">
                      <select
                        value={b.status}
                        onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value as any)}
                        className={`px-2 py-1 rounded-lg text-[11px] font-bold border ${
                          b.status === "confirmed" 
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : b.status === "pending"
                            ? "bg-amber-50 text-amber-800 border-amber-300"
                            : b.status === "paid"
                            ? "bg-blue-50 text-blue-800 border-blue-300"
                            : "bg-rose-50 text-rose-800 border-rose-300"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="paid">Deposit Paid</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3 text-right">
                      <a
                        href={`https://wa.me/${b.leadTraveler.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px] hover:bg-emerald-200"
                      >
                        WhatsApp
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Inquiries Management */}
      {activeTab === "inquiries" && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-serif text-xl font-bold text-[#122544]">
              Custom Trip, Flight & Hotel Inquiries
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 text-[11px] font-bold text-stone-500 uppercase border-b border-stone-200">
                <tr>
                  <th className="p-3">Ref</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Destination / Target</th>
                  <th className="p-3">Notes & Wishlist</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-stone-50">
                    <td className="p-3 font-mono font-bold">{inq.referenceNumber}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-stone-100 font-semibold text-[10px]">
                        {inq.type}
                      </span>
                    </td>
                    <td className="p-3 font-semibold">
                      {inq.fullName}
                      <span className="block text-[10px] text-stone-400 font-normal">{inq.email}</span>
                    </td>
                    <td className="p-3 font-medium">{inq.destinationInterest || "General"}</td>
                    <td className="p-3 max-w-[280px] truncate text-stone-600">{inq.message}</td>
                    <td className="p-3">
                      <select
                        value={inq.status}
                        onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                        className="px-2 py-1 rounded-lg text-[11px] font-bold border"
                      >
                        <option value="new">New</option>
                        <option value="in_review">In Review</option>
                        <option value="quoted">Proposal Sent</option>
                        <option value="converted">Converted to Booking</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-3 text-right">
                      <a
                        href={`mailto:${inq.email}?subject=Custom Proposal for ${inq.referenceNumber}`}
                        className="px-2.5 py-1 rounded bg-[#122544] text-white font-semibold text-[10px]"
                      >
                        Reply Email
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Packages Management */}
      {activeTab === "packages" && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-serif text-xl font-bold text-[#122544]">
              Active Safari Packages ({packages.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className="p-4 rounded-2xl border border-stone-200 space-y-3 bg-[#FAF8F5]">
                <div className="flex justify-between items-start">
                  <h4 className="font-serif font-bold text-sm text-[#122544]">{pkg.title}</h4>
                  <span className="font-mono font-bold text-xs text-emerald-800">${pkg.pricePerPersonUsd}</span>
                </div>
                <p className="text-[11px] text-stone-500">{pkg.destinationName} • {pkg.durationDays} Days</p>
                <div className="flex items-center gap-2 pt-2 border-t text-[11px]">
                  <span className={`px-2 py-0.5 rounded font-bold ${pkg.popular ? "bg-amber-100 text-amber-800" : "bg-stone-100"}`}>
                    {pkg.popular ? "Popular" : "Standard"}
                  </span>
                  <span className="text-stone-400">Rating: {pkg.rating} ({pkg.reviewCount})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Contact Messages */}
      {activeTab === "messages" && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#122544]">
            Website Contact Messages ({messages.length})
          </h2>

          <div className="space-y-3">
            {messages.map((m) => (
              <div key={m.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#122544] text-sm">{m.fullName} ({m.email})</span>
                  <span className="text-stone-400">{m.createdAt.split("T")[0]}</span>
                </div>
                <p className="font-semibold text-stone-700">Subject: {m.subject}</p>
                <p className="text-stone-600">{m.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Newsletter Subscribers */}
      {activeTab === "subscribers" && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#122544]">
            Newsletter Subscribers List ({subscribers.length})
          </h2>

          <div className="space-y-2">
            {subscribers.map((s) => (
              <div key={s.id} className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center text-xs">
                <span className="font-mono font-medium text-stone-900">{s.email}</span>
                <span className="text-stone-400">{s.subscribedAt.split("T")[0]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: Settings & Announcement Notice */}
      {activeTab === "settings" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 max-w-2xl">
          <h2 className="font-serif text-xl font-bold text-[#122544]">
            Live Website Notice & Announcement Bar
          </h2>
          <p className="text-xs text-stone-500">
            This message appears on the very top bar of every page on the live website.
          </p>

          {savedNoticeMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              {savedNoticeMsg}
            </div>
          )}

          <form onSubmit={handleSaveNotice} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#122544] uppercase tracking-wider">
                Top Announcement Text
              </label>
              <input
                type="text"
                value={siteNotice}
                onChange={(e) => setSiteNotice(e.target.value)}
                placeholder="e.g. 2026 Great Migration Bookings Open – Save 15% on Early Confirmations"
                className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#122544] text-white font-bold text-xs hover:bg-[#1a335a] transition-colors"
            >
              Save & Broadcast Notice
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
