import React, { useState, useMemo, useEffect } from 'react';
import { Category, CategoryId, FilterState, LayoutDirection, Vendor, VendorReview } from '../types';
import { UNILAG_HALLS, UNILAG_FACULTIES } from '../data/categories';
import { VendorCard } from './VendorCard';
import { fetchVendors } from '../services/api';
import { adaptVendor, mergeLocalReviews } from '../data/adapters';
import {
  Search,
  Filter,
  X,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Building2,
  MapPin,
  Tag,
  ArrowUpDown,
  Sparkles,
  Store
} from 'lucide-react';

interface VendorListingViewProps {
  categories: Category[];
  localVendors: Vendor[];
  localReviews: Record<string, VendorReview[]>;
  savedVendorIds: string[];
  onToggleSave: (vendorId: string) => void;
  onOpenDetail: (vendor: Vendor) => void;
  layoutDirection: LayoutDirection;
  onSelectLayoutDirection: (direction: LayoutDirection) => void;
  initialCategoryId?: CategoryId;
  initialSearchQuery?: string;
  onOpenRegisterModal: () => void;
}

export const VendorListingView: React.FC<VendorListingViewProps> = ({
  categories,
  localVendors,
  localReviews,
  savedVendorIds,
  onToggleSave,
  onOpenDetail,
  layoutDirection,
  onSelectLayoutDirection,
  initialCategoryId = 'all',
  initialSearchQuery = '',
  onOpenRegisterModal
}) => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: initialSearchQuery,
    categoryId: initialCategoryId,
    hall: 'all',
    faculty: 'all',
    priceLevel: 'all',
    onlyVerified: false,
    sortBy: 'featured'
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Vendors matching the current category/hall/faculty/price/search filters, fetched from the real API
  const [apiFiltered, setApiFiltered] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    const timer = setTimeout(() => {
      fetchVendors({
        category: filters.categoryId !== 'all' ? filters.categoryId : undefined,
        hall: filters.hall !== 'all' ? filters.hall : undefined,
        faculty: filters.faculty !== 'all' ? filters.faculty : undefined,
        priceTier: filters.priceLevel !== 'all' ? filters.priceLevel : undefined,
        q: filters.searchQuery.trim() || undefined
      })
        .then((dtos) => {
          if (cancelled) return;
          setApiFiltered(dtos.map(adaptVendor));
        })
        .catch((e) => {
          console.error('Failed to load vendors', e);
          if (!cancelled) setApiFiltered([]);
        })
        .finally(() => {
          if (!cancelled) setIsLoading(false);
        });
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [filters.categoryId, filters.hall, filters.faculty, filters.priceLevel, filters.searchQuery]);

  // Filter and Sort Logic: server-filtered API vendors + client-filtered local (unregistered) vendors,
  // then the onlyVerified/sortBy refinements stay client-side.
  const filteredVendors = useMemo(() => {
    const mergedLocal = localVendors.map((v) => mergeLocalReviews(v, localReviews));
    const mergedApi = apiFiltered.map((v) => mergeLocalReviews(v, localReviews));

    const localMatches = mergedLocal.filter((vendor) => {
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = vendor.name.toLowerCase().includes(query);
        const matchesTagline = vendor.tagline.toLowerCase().includes(query);
        const matchesOwner = vendor.ownerName.toLowerCase().includes(query);
        const matchesDesc = vendor.description.toLowerCase().includes(query);
        const matchesServices = vendor.services.some(s => s.toLowerCase().includes(query));
        if (!matchesName && !matchesTagline && !matchesOwner && !matchesDesc && !matchesServices) {
          return false;
        }
      }
      if (filters.categoryId !== 'all' && vendor.categoryId !== filters.categoryId) return false;
      if (filters.hall !== 'all' && vendor.hall !== filters.hall) return false;
      if (filters.faculty !== 'all' && vendor.faculty !== filters.faculty) return false;
      if (filters.priceLevel !== 'all' && vendor.priceLevel !== filters.priceLevel) return false;
      return true;
    });

    return [...localMatches, ...mergedApi]
      .filter((vendor) => !(filters.onlyVerified && !vendor.isVerified))
      .sort((a, b) => {
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        if (filters.sortBy === 'reviews') return b.reviewCount - a.reviewCount;
        if (filters.sortBy === 'price-low') return a.startingPrice - b.startingPrice;
        if (filters.sortBy === 'price-high') return b.startingPrice - a.startingPrice;
        // Default featured
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [localVendors, apiFiltered, localReviews, filters]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      categoryId: 'all',
      hall: 'all',
      faculty: 'all',
      priceLevel: 'all',
      onlyVerified: false,
      sortBy: 'featured'
    });
  };

  const activeFilterCount = (filters.categoryId !== 'all' ? 1 : 0) +
    (filters.hall !== 'all' ? 1 : 0) +
    (filters.faculty !== 'all' ? 1 : 0) +
    (filters.priceLevel !== 'all' ? 1 : 0) +
    (filters.onlyVerified ? 1 : 0) +
    (filters.searchQuery.trim() ? 1 : 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Directory Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E5E5] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#18181B]">
              UNILAG Vendor Directory
            </h1>
            <span className="bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-xs font-extrabold font-display px-2.5 py-0.5 rounded-full">
              {filteredVendors.length} Vendors Available
            </span>
          </div>
          <p className="text-xs text-[#52525B] font-body mt-0.5">
            Filter student businesses by hall of residence, faculty, or price level
          </p>
        </div>

        {/* Layout Variation Quick Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#52525B] font-display hidden sm:inline">Layout Variation:</span>
          <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-[#E5E5E5]">
            {(['flyer-feed', 'marketplace-grid', 'bento-spotlight'] as LayoutDirection[]).map((dir) => (
              <button
                key={dir}
                onClick={() => onSelectLayoutDirection(dir)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-display transition capitalize ${
                  layoutDirection === dir
                    ? 'bg-[#E11D48] text-white shadow-xs'
                    : 'text-[#52525B] hover:text-[#18181B]'
                }`}
              >
                {dir.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Filter Bar Desktop & Mobile Toggle */}
      <div className="bg-white p-4 rounded-3xl border border-[#E5E5E5] shadow-warm space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="flex items-center gap-2 px-3 py-2.5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl w-full md:w-80 focus-within:border-[#E11D48]">
            <Search className="w-4 h-4 text-[#E11D48]" />
            <input
              type="text"
              placeholder="Search vendor name, service, hall..."
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full bg-transparent text-xs text-[#18181B] placeholder-[#94A3B8] focus:outline-none font-body"
            />
            {filters.searchQuery && (
              <button onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}>
                <X className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <select
            value={filters.categoryId}
            onChange={(e) => setFilters(prev => ({ ...prev, categoryId: e.target.value as CategoryId }))}
            className="w-full md:w-auto p-2.5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl text-xs font-bold font-display text-[#18181B] focus:outline-none focus:border-[#E11D48]"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          {/* Hall Dropdown */}
          <select
            value={filters.hall}
            onChange={(e) => setFilters(prev => ({ ...prev, hall: e.target.value }))}
            className="w-full md:w-auto p-2.5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl text-xs font-bold font-display text-[#18181B] focus:outline-none focus:border-[#E11D48]"
          >
            <option value="all">All Halls of Residence</option>
            {UNILAG_HALLS.map(h => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 w-full md:w-auto ml-auto">
            <span className="text-xs text-[#52525B] font-bold font-display whitespace-nowrap hidden lg:inline">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="w-full md:w-auto p-2.5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl text-xs font-bold font-display text-[#18181B] focus:outline-none focus:border-[#E11D48]"
            >
              <option value="featured">Featured First</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Mobile Filters Toggle Button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden w-full flex items-center justify-center gap-2 p-2.5 bg-[#FFE4E6] text-[#E11D48] font-display font-extrabold text-xs rounded-2xl border border-[#FECDD3]"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>More Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>
        </div>

        {/* Secondary Filter Row */}
        <div className="flex items-center justify-between gap-4 pt-2 border-t border-[#E5E5E5] text-xs font-body">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            {/* Verified Only Toggle */}
            <label className="flex items-center gap-2 bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] font-extrabold font-display px-3 py-1.5 rounded-xl cursor-pointer text-xs shrink-0">
              <input
                type="checkbox"
                checked={filters.onlyVerified}
                onChange={(e) => setFilters(prev => ({ ...prev, onlyVerified: e.target.checked }))}
                className="rounded border-[#10B981] text-[#10B981] focus:ring-0"
              />
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Only
            </label>

            {/* Price Level Pills */}
            <div className="flex items-center gap-1 bg-[#FAFAFA] p-1 rounded-xl border border-[#E5E5E5] shrink-0">
              {['all', '₦', '₦₦', '₦₦₦'].map((p) => (
                <button
                  key={p}
                  onClick={() => setFilters(prev => ({ ...prev, priceLevel: p }))}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold font-display transition ${
                    filters.priceLevel === p ? 'bg-[#E11D48] text-white' : 'text-[#52525B] hover:text-[#18181B]'
                  }`}
                >
                  {p === 'all' ? 'All Prices' : p}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Filters */}
          {activeFilterCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-xs font-bold font-display text-[#E11D48] hover:underline shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset ({activeFilterCount})
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-sm bg-white h-full p-5 overflow-y-auto space-y-4 animate-in slide-in-from-right">
            <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3">
              <h3 className="font-display font-extrabold text-base text-[#18181B]">Filter Vendors</h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-[#18181B]" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#18181B] block mb-1 font-display">Faculty</label>
                <select
                  value={filters.faculty}
                  onChange={(e) => setFilters(prev => ({ ...prev, faculty: e.target.value }))}
                  className="w-full p-2.5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl text-xs font-body text-[#18181B]"
                >
                  <option value="all">All Faculties</option>
                  {UNILAG_FACULTIES.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-[#E11D48] hover:bg-[#BE123C] text-white font-display font-extrabold text-xs py-3 rounded-2xl"
              >
                Apply Filters ({filteredVendors.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Vendor Cards */}
      {filteredVendors.length > 0 ? (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity ${isLoading ? 'opacity-60 pointer-events-none' : ''}`}>
          {filteredVendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              isSaved={savedVendorIds.includes(vendor.id)}
              onToggleSave={onToggleSave}
              onOpenDetail={onOpenDetail}
              layoutDirection={layoutDirection}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-8 sm:p-12 bg-white rounded-3xl border border-[#E5E5E5] shadow-warm text-center space-y-4 max-w-lg mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center mx-auto">
            <Store className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="font-display font-extrabold text-xl text-[#18181B]">
              No Student Vendors Found
            </h3>
            <p className="text-xs text-[#52525B] font-body">
              We couldn't find any vendor matching your current filter criteria in UNILAG. Try clearing filters or searching another keyword!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleResetFilters}
              className="w-full sm:w-auto bg-[#F4F4F5] hover:bg-[#E5E5E5] text-[#18181B] font-display font-bold text-xs px-5 py-2.5 rounded-xl transition"
            >
              Clear All Filters
            </button>

            <button
              onClick={onOpenRegisterModal}
              className="w-full sm:w-auto bg-[#E11D48] hover:bg-[#BE123C] text-white font-display font-extrabold text-xs px-5 py-2.5 rounded-xl transition shadow-xs"
            >
              Add Your Business
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
