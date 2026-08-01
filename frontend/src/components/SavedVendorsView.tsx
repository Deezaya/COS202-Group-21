import React from 'react';
import { LayoutDirection, Vendor } from '../types';
import { VendorCard } from './VendorCard';
import { Heart, Compass, Store } from 'lucide-react';

interface SavedVendorsViewProps {
  vendors: Vendor[];
  savedVendorIds: string[];
  onToggleSave: (vendorId: string) => void;
  onOpenDetail: (vendor: Vendor) => void;
  onNavigateToDiscover: () => void;
  layoutDirection: LayoutDirection;
}

export const SavedVendorsView: React.FC<SavedVendorsViewProps> = ({
  vendors,
  savedVendorIds,
  onToggleSave,
  onOpenDetail,
  onNavigateToDiscover,
  layoutDirection
}) => {
  const savedVendors = vendors.filter(v => savedVendorIds.includes(v.id));

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#18181B] flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#E11D48] fill-current" />
            Bookmarked Student Vendors
          </h1>
          <p className="text-xs text-[#52525B] font-body mt-0.5">
            Your saved UNILAG vendor contacts for quick WhatsApp access
          </p>
        </div>

        <span className="bg-[#FFE4E6] text-[#E11D48] text-xs font-extrabold font-display px-3 py-1 rounded-full">
          {savedVendors.length} Saved
        </span>
      </div>

      {savedVendors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedVendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              isSaved={true}
              onToggleSave={onToggleSave}
              onOpenDetail={onOpenDetail}
              layoutDirection={layoutDirection}
            />
          ))}
        </div>
      ) : (
        <div className="p-8 sm:p-12 bg-white rounded-3xl border border-[#E5E5E5] shadow-warm text-center space-y-4 max-w-lg mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="font-display font-extrabold text-xl text-[#18181B]">
              No Bookmarks Saved Yet
            </h3>
            <p className="text-xs text-[#52525B] font-body">
              Tap the heart icon on any vendor card to save hair braiders, phone repairers, or small chops cooks for quick access between classes!
            </p>
          </div>

          <button
            onClick={onNavigateToDiscover}
            className="bg-[#E11D48] hover:bg-[#BE123C] text-white font-display font-extrabold text-xs px-6 py-3 rounded-2xl transition shadow-xs inline-flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Vendors</span>
          </button>
        </div>
      )}
    </div>
  );
};
