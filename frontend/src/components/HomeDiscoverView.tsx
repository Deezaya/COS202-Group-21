import React, { useState } from 'react';
import { Category, CategoryId, LayoutDirection, Vendor } from '../types';
import { CategoryChips } from './CategoryChips';
import { VendorCard } from './VendorCard';
import { 
  Search, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  MessageCircle, 
  Award, 
  ArrowRight, 
  Layers, 
  MapPin, 
  Zap, 
  ShieldCheck,
  Flame,
  Star,
  Users
} from 'lucide-react';

interface HomeDiscoverViewProps {
  vendors: Vendor[];
  categories: Category[];
  savedVendorIds: string[];
  onToggleSave: (vendorId: string) => void;
  onOpenDetail: (vendor: Vendor) => void;
  onNavigateToDirectory: (categoryId?: CategoryId, searchQuery?: string) => void;
  layoutDirection: LayoutDirection;
  onSelectLayoutDirection: (direction: LayoutDirection) => void;
  onOpenRegisterModal: () => void;
}

export const HomeDiscoverView: React.FC<HomeDiscoverViewProps> = ({
  vendors,
  categories,
  savedVendorIds,
  onToggleSave,
  onOpenDetail,
  onNavigateToDirectory,
  layoutDirection,
  onSelectLayoutDirection,
  onOpenRegisterModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredVendors = vendors.filter(v => v.isFeatured);
  const filteredVendors = selectedCategory === 'all' 
    ? vendors 
    : vendors.filter(v => v.categoryId === selectedCategory);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigateToDirectory(selectedCategory, searchQuery);
    }
  };

  // Status/Flyer Reels data representing WhatsApp status flyer culture
  const flyerStatusItems = [
    { id: '1', title: 'Moremi Night Chops 🍢', tag: 'Fresh Batch', tagBg: 'bg-[#FFE4E6]', tagText: 'text-[#E11D48]', dotColor: 'bg-[#E11D48]', vendorName: 'Moremi Chops' },
    { id: '2', title: 'Knotless Braids Slots 💇‍♀️', tag: '3 Slots Left', tagBg: 'bg-[#ECFDF5]', tagText: 'text-[#059669]', dotColor: 'bg-[#10B981]', vendorName: 'Temi’s Glam' },
    { id: '3', title: 'iPhone Screen Fix 💻', tag: 'Same-Day Jaja', tagBg: 'bg-[#FFE4E6]', tagText: 'text-[#E11D48]', dotColor: 'bg-[#E11D48]', vendorName: 'Akoka Tech' },
    { id: '4', title: 'MAT101 Past Qs 📚', tag: 'Exam Ready', tagBg: 'bg-[#FEF3C7]', tagText: 'text-[#D97706]', dotColor: 'bg-[#F59E0B]', vendorName: 'Jaja Hub' },
    { id: '5', title: 'Senator Fits ✂️', tag: 'Dinner Special', tagBg: 'bg-[#ECFDF5]', tagText: 'text-[#059669]', dotColor: 'bg-[#10B981]', vendorName: 'Lekan Bespoke' },
    { id: '6', title: 'Sneaker Whitening 🧺', tag: 'Pick-up Open', tagBg: 'bg-[#FEF3C7]', tagText: 'text-[#D97706]', dotColor: 'bg-[#F59E0B]', vendorName: 'FreshExpress' }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFE4E6]/40 via-white to-[#FAFAFA] border border-[#E5E5E5] p-6 sm:p-10 shadow-warm">
        <div className="relative z-10 max-w-2xl space-y-4">
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#18181B] tracking-tight leading-[1.1]">
            Connect with fellow UNILAG <span className="text-[#E11D48] underline decoration-[#E11D48]/30 underline-offset-4">student vendors</span> in seconds.
          </h1>

          <p className="text-sm sm:text-base text-[#52525B] font-body leading-relaxed">
            Discover verified student-run businesses across Moremi, Jaja, Amina, Mariere & Akoka campus — hair, food, tech repair, tailoring, tutoring, and design.
          </p>

          {/* Quick Search Bar */}
          <form onSubmit={handleSearchSubmit} className="pt-2">
            <div className="flex flex-col sm:flex-row items-center gap-2 bg-white p-2 rounded-2xl border border-[#E5E5E5] shadow-sm">
              <div className="flex items-center gap-2.5 px-3 py-2 w-full">
                <Search className="w-5 h-5 text-[#E11D48]" />
                <input 
                  type="text" 
                  placeholder="Try 'knotless braids', 'iPhone screen', 'smokey jollof', 'MAT101'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-[#18181B] placeholder-[#94A3B8] focus:outline-none font-body"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[#E11D48] hover:bg-[#BE123C] active:scale-95 text-white font-display font-extrabold text-xs px-6 py-3 rounded-xl transition whitespace-nowrap shadow-xs"
              >
                Find Vendors
              </button>
            </div>
          </form>

          {/* Popular Tag Pills */}
          <div className="flex items-center gap-2 flex-wrap pt-1 text-xs text-[#52525B]">
            <span className="font-bold text-[#18181B] font-display">Popular right now:</span>
            {['Knotless Braids', 'Smokey Jollof', 'iPhone Screen Fix', 'Senator Sewing', 'MAT101 Tutor'].map((tag) => (
              <button
                key={tag}
                onClick={() => onNavigateToDirectory('all', tag)}
                className="bg-white hover:bg-[#FAFAFA] text-[#18181B] border border-[#E5E5E5] px-2.5 py-1 rounded-lg font-medium transition text-[11px]"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Decorative Badge Overlay */}
        <div className="hidden lg:block absolute -right-6 bottom-4 w-72 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-[#E5E5E5] shadow-xl rotate-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold text-xs">
              UNILAG
            </div>
            <div>
              <span className="font-display font-extrabold text-xs text-[#18181B] block">Student Directory</span>
              <span className="text-[10px] text-[#059669] font-bold">100% Matric Verified</span>
            </div>
          </div>
          <p className="text-[11px] text-[#52525B] font-body">
            "Replaced 20 WhatsApp group chats with 1 clean directory."
          </p>
        </div>
      </section>

      {/* WhatsApp Status-Flyer Highlight Reel (Unified White Cards) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#E11D48]" />
            <h2 className="font-display font-extrabold text-lg text-[#18181B]">
              Trending Campus Status Updates
            </h2>
            <span className="text-[10px] bg-[#FFE4E6] text-[#E11D48] font-extrabold px-2 py-0.5 rounded-full font-display">
              LIVE FLYERS
            </span>
          </div>
          <span className="text-xs text-[#52525B] font-medium hidden sm:inline">
            Updated by student vendors today
          </span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          {flyerStatusItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => onNavigateToDirectory('all', item.vendorName)}
              className="flex-none w-38 sm:w-44 p-3.5 rounded-2xl bg-white border border-[#E5E5E5] hover:border-[#E11D48] shadow-xs cursor-pointer group transition hover:-translate-y-1 flex flex-col justify-between h-32"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className={`inline-flex items-center gap-1.5 text-[9px] font-extrabold ${item.tagBg} ${item.tagText} px-2 py-0.5 rounded-full font-display`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`} />
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-xs text-[#18181B] line-clamp-2 leading-snug group-hover:text-[#E11D48] transition-colors">
                  {item.title}
                </h3>
              </div>

              <div className="pt-2 border-t border-[#F4F4F5] flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#52525B] font-display truncate">
                  {item.vendorName}
                </span>
                <span className="text-[10px] text-[#059669] font-semibold flex items-center gap-0.5 shrink-0">
                  <MessageCircle className="w-3 h-3" /> Chat
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Filter Chips */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-extrabold text-lg text-[#18181B]">
            Browse by Service Category
          </h2>
          <button 
            onClick={() => onNavigateToDirectory()}
            className="text-xs font-bold font-display text-[#E11D48] hover:underline flex items-center gap-1"
          >
            View All ({vendors.length}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <CategoryChips
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      {/* Layout Variation Visual Banner Indicator */}
      <div className="p-3 bg-[#FFE4E6]/40 border border-[#FECDD3] rounded-2xl flex items-center justify-between text-xs font-body">
        <div className="flex items-center gap-2">
          <span className="bg-[#E11D48] text-white text-[10px] font-extrabold font-display px-2 py-0.5 rounded uppercase">
            Current Layout Variation
          </span>
          <span className="font-bold text-[#18181B] capitalize font-display">
            Direction: {layoutDirection.replace('-', ' ')}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-[#52525B] hidden sm:inline">Switch direction:</span>
          {(['flyer-feed', 'marketplace-grid', 'bento-spotlight'] as LayoutDirection[]).map((dir) => (
            <button
              key={dir}
              onClick={() => onSelectLayoutDirection(dir)}
              className={`px-2 py-1 rounded-lg text-[10px] font-extrabold font-display uppercase transition ${
                layoutDirection === dir 
                  ? 'bg-[#E11D48] text-white' 
                  : 'bg-white text-[#18181B] border border-[#E5E5E5] hover:border-[#E11D48]'
              }`}
            >
              {dir === 'flyer-feed' ? 'Flyer' : dir === 'marketplace-grid' ? 'Grid' : 'Bento'}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Vendors Grid Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-extrabold text-xl text-[#18181B] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#E11D48]" />
              Featured Student Vendors
            </h2>
            <p className="text-xs text-[#52525B]">
              Top rated by UNILAG students across Moremi, Jaja, Amina & Mariere halls
            </p>
          </div>

          <button
            onClick={() => onNavigateToDirectory()}
            className="text-xs font-extrabold font-display bg-[#E11D48] hover:bg-[#BE123C] text-white px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-xs"
          >
            <span>See All Vendors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Grid adapting to selected Layout Direction */}
        <div className={`grid gap-4 ${
          layoutDirection === 'bento-spotlight' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {filteredVendors.slice(0, 6).map((vendor) => (
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
      </section>

      {/* UNILAG Campus Trust & Safety Section */}
      <section className="p-6 sm:p-8 bg-white border border-[#E5E5E5] rounded-3xl shadow-warm grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-2xl bg-[#FFE4E6] text-[#E11D48] shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-base text-[#18181B] mb-1">
              Student ID Verified
            </h3>
            <p className="text-xs text-[#52525B] font-body leading-relaxed">
              Every featured vendor is matriculated at UNILAG, giving you peace of mind when ordering or booking.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-2xl bg-[#ECFDF5] text-[#059669] shrink-0">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-base text-[#18181B] mb-1">
              Direct WhatsApp Chat
            </h3>
            <p className="text-xs text-[#52525B] font-body leading-relaxed">
              Connect instantly on WhatsApp with pre-filled order messages. No middleman fees or complicated checkouts.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-2xl bg-[#FEF3C7] text-amber-600 shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-base text-[#18181B] mb-1">
              Doorstep Hall Delivery
            </h3>
            <p className="text-xs text-[#52525B] font-body leading-relaxed">
              Get items delivered straight to your hall room or meet up safely at Senate, CITS, or Faculty gates.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action: Register Student Business */}
      <section className="p-6 sm:p-8 bg-[#18181B] text-white rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#27272A]">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-[#E11D48] text-white text-[10px] font-extrabold font-display uppercase px-2.5 py-1 rounded-full">
            FOR UNILAG STUDENT ENTREPRENEURS
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
            Are you running a business in your hall room?
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-xl font-body">
            Get listed on UniVendor directory today for free. Stop relying only on 24-hour WhatsApp statuses — reach hundreds of students across all campus hostels.
          </p>
        </div>

        <button
          onClick={onOpenRegisterModal}
          className="bg-[#E11D48] hover:bg-[#BE123C] active:scale-95 text-white font-display font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-lg transition whitespace-nowrap"
        >
          Add Your Business Free
        </button>
      </section>
    </div>
  );
};
