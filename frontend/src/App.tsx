import React, { useState, useEffect, useMemo } from 'react';
import { AuthUser, Category, CategoryId, LayoutDirection, Vendor, VendorReview, ViewMode } from './types';
import { Header } from './components/Header';
import { LandingView } from './components/LandingView';
import { LoginView } from './components/LoginView';
import { SignupView } from './components/SignupView';
import { HomeDiscoverView } from './components/HomeDiscoverView';
import { VendorListingView } from './components/VendorListingView';
import { SavedVendorsView } from './components/SavedVendorsView';
import { VendorDetailModal } from './components/VendorDetailModal';
import { RegisterVendorModal } from './components/RegisterVendorModal';
import { Heart, Compass, Store, PlusCircle, ShieldCheck, MessageCircle } from 'lucide-react';
import { fetchCategories, fetchVendors, fetchVendorById } from './services/api';
import { adaptCategory, adaptVendor, mergeLocalReviews } from './data/adapters';
import { decodeJwt, isJwtExpired } from './utils/helpers';

// Stored in localStorage rather than an httpOnly cookie - a known XSS surface for the token,
// accepted here since the backend has no cookie-session support to switch to.
const AUTH_TOKEN_KEY = 'univendor_auth_token';

function readStoredToken(): string | null {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return null;
    const decoded = decodeJwt(token);
    if (!decoded || isJwtExpired(decoded)) return null;
    return token;
  } catch {
    return null;
  }
}

export default function App() {
  // Vendors fetched from the real backend API
  const [apiVendors, setApiVendors] = useState<Vendor[]>([]);

  // Categories fetched from the real backend API
  const [categories, setCategories] = useState<Category[]>([]);

  // Vendors added locally via "List Your Business" - stays local (Phase 2 territory)
  const [localVendors, setLocalVendors] = useState<Vendor[]>(() => {
    try {
      const saved = localStorage.getItem('univendor_local_vendors');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Reviews added locally - stays local (Phase 3 territory), keyed by vendor id
  const [localReviews, setLocalReviews] = useState<Record<string, VendorReview[]>>(() => {
    try {
      const saved = localStorage.getItem('univendor_local_reviews');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Load saved bookmarks from localStorage
  const [savedVendorIds, setSavedVendorIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('univendor_saved_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Layout Direction Variation State ('flyer-feed' | 'marketplace-grid' | 'bento-spotlight')
  const [layoutDirection, setLayoutDirection] = useState<LayoutDirection>('marketplace-grid');

  // JWT from /api/auth/login|register - decoded client-side, no /me endpoint exists yet
  const [authToken, setAuthToken] = useState<string | null>(readStoredToken);

  const currentUser = useMemo<AuthUser | null>(() => {
    if (!authToken) return null;
    const decoded = decodeJwt(authToken);
    if (!decoded || isJwtExpired(decoded)) return null;
    return { id: decoded.sub, email: decoded.email, role: decoded.role as AuthUser['role'] };
  }, [authToken]);

  // Drop a stale/expired token rather than keep re-deriving a null user from it
  useEffect(() => {
    if (authToken && !currentUser) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      setAuthToken(null);
    }
  }, [authToken, currentUser]);

  // Navigation View State - starts on the marketing page for signed-out visitors,
  // skips straight to the product for anyone with a valid session
  const [currentView, setCurrentView] = useState<ViewMode>(() => (readStoredToken() ? 'home' : 'landing'));

  // Directory filter initial states when navigating from Home
  const [directoryCategoryId, setDirectoryCategoryId] = useState<CategoryId>('all');
  const [directorySearchQuery, setDirectorySearchQuery] = useState<string>('');

  // Selected vendor id for modal (looked up live so review updates are reflected instantly)
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);

  // Register vendor modal open state
  const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false);

  // Initial fetch: categories + unfiltered vendor list from the backend
  useEffect(() => {
    fetchCategories()
      .then((dtos) => setCategories(dtos.map(adaptCategory)))
      .catch((e) => console.error('Failed to load categories', e));

    fetchVendors()
      .then((dtos) => setApiVendors(dtos.map(adaptVendor)))
      .catch((e) => console.error('Failed to load vendors', e));
  }, []);

  // Sync local-only state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('univendor_local_vendors', JSON.stringify(localVendors));
    } catch (e) {
      console.error(e);
    }
  }, [localVendors]);

  useEffect(() => {
    try {
      localStorage.setItem('univendor_local_reviews', JSON.stringify(localReviews));
    } catch (e) {
      console.error(e);
    }
  }, [localReviews]);

  useEffect(() => {
    try {
      localStorage.setItem('univendor_saved_ids', JSON.stringify(savedVendorIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedVendorIds]);

  // Combined vendor list (local + API) with local reviews merged on top
  const vendors = useMemo(() => {
    return [...localVendors, ...apiVendors].map((v) => mergeLocalReviews(v, localReviews));
  }, [localVendors, apiVendors, localReviews]);

  const selectedVendorDetail = useMemo(
    () => vendors.find((v) => v.id === selectedVendorId) || null,
    [vendors, selectedVendorId]
  );

  // Background-refresh the selected vendor from the API (skip locally-added vendors, they don't exist server-side)
  useEffect(() => {
    if (!selectedVendorId) return;
    if (localVendors.some((v) => v.id === selectedVendorId)) return;

    let cancelled = false;
    fetchVendorById(selectedVendorId)
      .then((dto) => {
        if (cancelled) return;
        const refreshed = adaptVendor(dto);
        setApiVendors((prev) => prev.map((v) => (v.id === refreshed.id ? refreshed : v)));
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [selectedVendorId, localVendors]);

  const handleToggleSaveVendor = (vendorId: string) => {
    setSavedVendorIds(prev =>
      prev.includes(vendorId)
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const handleAddVendor = (newVendor: Vendor) => {
    setLocalVendors(prev => [newVendor, ...prev]);
  };

  const handleAuthenticated = (token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    setAuthToken(token);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setAuthToken(null);
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddReview = (vendorId: string, review: Omit<VendorReview, 'id' | 'date'>) => {
    const newReviewObj: VendorReview = {
      ...review,
      id: `r-${Date.now()}`,
      date: 'Just now'
    };

    setLocalReviews(prev => ({
      ...prev,
      [vendorId]: [newReviewObj, ...(prev[vendorId] || [])]
    }));
  };

  const handleNavigateToDirectory = (categoryId?: CategoryId, searchQuery?: string) => {
    if (categoryId) setDirectoryCategoryId(categoryId);
    if (searchQuery !== undefined) setDirectorySearchQuery(searchQuery);
    setCurrentView('directory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#18181B] selection:bg-[#E11D48] selection:text-white">
      {/* Header Bar */}
      <Header
        currentView={currentView}
        onSelectView={(v) => {
          setCurrentView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        layoutDirection={layoutDirection}
        onSelectLayoutDirection={setLayoutDirection}
        savedCount={savedVendorIds.length}
        onOpenRegisterModal={() => setRegisterModalOpen(true)}
        currentUser={currentUser}
        onOpenLogin={() => setCurrentView('login')}
        onOpenSignup={() => setCurrentView('signup')}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentView === 'landing' && (
          <LandingView
            categories={categories}
            onNavigateToDirectory={handleNavigateToDirectory}
            onOpenSignup={() => setCurrentView('signup')}
            onOpenLogin={() => setCurrentView('login')}
            onOpenRegisterModal={() => setRegisterModalOpen(true)}
          />
        )}

        {currentView === 'login' && (
          <LoginView
            onAuthenticated={handleAuthenticated}
            onNavigateToSignup={() => setCurrentView('signup')}
          />
        )}

        {currentView === 'signup' && (
          <SignupView
            onAuthenticated={handleAuthenticated}
            onNavigateToLogin={() => setCurrentView('login')}
          />
        )}

        {currentView === 'home' && (
          <HomeDiscoverView
            vendors={vendors}
            categories={categories}
            savedVendorIds={savedVendorIds}
            onToggleSave={handleToggleSaveVendor}
            onOpenDetail={(v) => setSelectedVendorId(v.id)}
            onNavigateToDirectory={handleNavigateToDirectory}
            layoutDirection={layoutDirection}
            onSelectLayoutDirection={setLayoutDirection}
            onOpenRegisterModal={() => setRegisterModalOpen(true)}
          />
        )}

        {currentView === 'directory' && (
          <VendorListingView
            categories={categories}
            localVendors={localVendors}
            localReviews={localReviews}
            savedVendorIds={savedVendorIds}
            onToggleSave={handleToggleSaveVendor}
            onOpenDetail={(v) => setSelectedVendorId(v.id)}
            layoutDirection={layoutDirection}
            onSelectLayoutDirection={setLayoutDirection}
            initialCategoryId={directoryCategoryId}
            initialSearchQuery={directorySearchQuery}
            onOpenRegisterModal={() => setRegisterModalOpen(true)}
          />
        )}

        {currentView === 'saved' && (
          <SavedVendorsView
            vendors={vendors}
            savedVendorIds={savedVendorIds}
            onToggleSave={handleToggleSaveVendor}
            onOpenDetail={(v) => setSelectedVendorId(v.id)}
            onNavigateToDiscover={() => setCurrentView('home')}
            layoutDirection={layoutDirection}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-[#18181B] text-white/80 border-t border-zinc-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#E11D48] text-white flex items-center justify-center font-display font-extrabold text-lg">
                U
              </div>
              <span className="font-display font-extrabold text-xl text-white">
                Uni<span className="text-[#E11D48]">Vendor</span>
              </span>
            </div>
            <p className="text-xs text-white/70 font-body leading-relaxed">
              The official student-to-student directory for University of Lagos (UNILAG). Connecting students with verified student businesses across campus.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-3">
              Campus Halls Covered
            </h4>
            <div className="grid grid-cols-2 gap-1 text-xs text-white/70 font-body">
              <span>Moremi Hall</span>
              <span>Jaja Hall</span>
              <span>Amina Hall</span>
              <span>Kofo Ademola</span>
              <span>Eni Njoku</span>
              <span>Mariere Hall</span>
              <span>Sodeinde Hall</span>
              <span>Biobaku Hall</span>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-3">
              Popular Services
            </h4>
            <div className="space-y-1 text-xs text-white/70 font-body">
              <p>Knotless & French Braids</p>
              <p>iPhone & Laptop Repairs</p>
              <p>Smokey Party Jollof & Bites</p>
              <p>MAT101 & GST Tutoring</p>
              <p>Senator & Dinner Gowns</p>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-3">
              Student Business Support
            </h4>
            <p className="text-xs text-white/70 mb-3 font-body">
              Are you a UNILAG student running a business? Join our verified directory today.
            </p>
            <button
              onClick={() => setRegisterModalOpen(true)}
              className="bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold font-display px-4 py-2 rounded-xl transition"
            >
              + List Your Student Business
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 font-body gap-2">
          <p>© {new Date().getFullYear()} UniVendor — Built for UNILAG Students, Akoka, Lagos.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#10B981] bg-white/10 px-2 py-0.5 rounded font-bold font-display">
              <ShieldCheck className="w-3 h-3 text-[#10B981]" /> 100% Student Verified
            </span>
            <span>Direct WhatsApp Connectivity</span>
          </div>
        </div>
      </footer>

      {/* Vendor Detail Modal */}
      <VendorDetailModal
        vendor={selectedVendorDetail}
        onClose={() => setSelectedVendorId(null)}
        isSaved={selectedVendorDetail ? savedVendorIds.includes(selectedVendorDetail.id) : false}
        onToggleSave={handleToggleSaveVendor}
        onAddReview={handleAddReview}
      />

      {/* Register Vendor Modal */}
      <RegisterVendorModal
        isOpen={registerModalOpen}
        categories={categories}
        onClose={() => setRegisterModalOpen(false)}
        onAddVendor={handleAddVendor}
      />
    </div>
  );
}
