import React from 'react';
import { Vendor, LayoutDirection } from '../types';
import { formatWhatsAppUrl, formatPrice } from '../utils/helpers';
import { 
  CheckCircle2, 
  Star, 
  MapPin, 
  Heart, 
  MessageCircle, 
  Clock, 
  ArrowUpRight,
  ShieldCheck,
  Tag
} from 'lucide-react';

interface VendorCardProps {
  vendor: Vendor;
  isSaved: boolean;
  onToggleSave: (vendorId: string) => void;
  onOpenDetail: (vendor: Vendor) => void;
  layoutDirection?: LayoutDirection;
}

export const VendorCard: React.FC<VendorCardProps> = ({
  vendor,
  isSaved,
  onToggleSave,
  onOpenDetail,
  layoutDirection = 'marketplace-grid'
}) => {
  const whatsappUrl = formatWhatsAppUrl(vendor.whatsapp, vendor.name, vendor.services[0]);

  // Rotated stamp style
  const stampStyle = {
    transform: `rotate(${vendor.stampRotation || -3}deg)`,
    backgroundColor: vendor.stampBgColor || '#FFE4E6',
    color: vendor.stampTextColor || '#E11D48',
    borderColor: vendor.stampTextColor || '#E11D48'
  };

  // Flyer Feed Layout Variation (Direction A)
  if (layoutDirection === 'flyer-feed') {
    return (
      <div 
        className="group relative bg-white border border-[#E5E5E5] hover:border-[#E11D48]/40 rounded-2xl p-4 shadow-warm shadow-warm-hover cursor-pointer transition-all flex flex-col justify-between"
      >
        <div>
          {/* Top Image + Rotated Stamp Tag (Flyer Style) */}
          <div className="relative h-44 w-full rounded-xl overflow-hidden mb-3.5 bg-zinc-100">
            <img 
              src={vendor.coverImage} 
              alt={vendor.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Signature Rotated Stamp Tag */}
            <div 
              className="absolute top-2.5 left-2.5 stamp-tag font-display shadow-md z-10"
              style={stampStyle}
            >
              <Tag className="w-3 h-3" />
              <span>{vendor.stampText}</span>
            </div>

            {/* Save Bookmark Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(vendor.id);
              }}
              className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
                isSaved ? 'bg-[#E11D48] text-white' : 'bg-black/30 hover:bg-black/50 text-white'
              }`}
              title={isSaved ? 'Remove Bookmark' : 'Save Vendor'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            {/* Owner Avatar & Level */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white z-10">
              <div className="flex items-center gap-2">
                <img 
                  src={vendor.avatarImage} 
                  alt={vendor.ownerName} 
                  className="w-7 h-7 rounded-full border-2 border-white object-cover"
                />
                <span className="text-xs font-medium drop-shadow-xs truncate max-w-[130px]">
                  {vendor.ownerName}
                </span>
              </div>
              <span className="text-[10px] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-display">
                {vendor.ownerLevel}
              </span>
            </div>
          </div>

          {/* Title & Verified Badge */}
          <div onClick={() => onOpenDetail(vendor)}>
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-display font-extrabold text-lg text-[#18181B] leading-tight group-hover:text-[#E11D48] transition-colors">
                {vendor.name}
              </h3>
              {vendor.isVerified && (
                <span 
                  className="inline-flex items-center gap-1 bg-[#10B981] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full font-display shrink-0"
                  title="UNILAG Student Verified"
                >
                  <ShieldCheck className="w-3 h-3" />
                  VERIFIED
                </span>
              )}
            </div>

            <p className="text-xs text-[#52525B] font-body line-clamp-2 mb-3">
              {vendor.tagline}
            </p>

            {/* Hall Location & Operating Status */}
            <div className="flex items-center justify-between text-[11px] text-[#52525B] mb-3 pb-3 border-b border-[#E5E5E5]">
              <span className="flex items-center gap-1 font-medium text-[#18181B]">
                <MapPin className="w-3.5 h-3.5 text-[#E11D48]" />
                {vendor.hall}
              </span>
              <span className="flex items-center gap-1 text-[#059669] font-semibold bg-[#ECFDF5] px-2 py-0.5 rounded-md border border-[#A7F3D0]">
                <Clock className="w-3 h-3" />
                {vendor.status}
              </span>
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#52525B] block font-display">Starting from</span>
            <span className="font-display font-extrabold text-base text-[#18181B]">
              {formatPrice(vendor.startingPrice)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenDetail(vendor)}
              className="p-2 bg-[#F4F4F5] hover:bg-[#E5E5E5] text-[#18181B] rounded-xl text-xs font-bold font-display transition"
              title="View Details"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 bg-[#E11D48] hover:bg-[#BE123C] active:scale-95 text-white text-xs font-bold font-display px-3 py-2 rounded-xl transition shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Bento Spotlight Layout Variation (Direction C)
  if (layoutDirection === 'bento-spotlight') {
    return (
      <div 
        onClick={() => onOpenDetail(vendor)}
        className="group relative bg-white border border-[#E5E5E5] hover:border-[#E11D48] rounded-2xl p-4 shadow-warm shadow-warm-hover cursor-pointer transition-all flex flex-col justify-between overflow-hidden"
      >
        {/* Rotated Stamp Sticker Top Corner */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div 
            className="stamp-tag font-display shadow-xs text-[10px] py-0.5 px-2"
            style={stampStyle}
          >
            {vendor.stampText}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(vendor.id);
            }}
            className={`p-1.5 rounded-full transition ${isSaved ? 'text-[#E11D48]' : 'text-zinc-400 hover:text-[#E11D48]'}`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="flex items-center gap-3 my-2">
          <img 
            src={vendor.avatarImage} 
            alt={vendor.name} 
            className="w-12 h-12 rounded-2xl object-cover border-2 border-[#E11D48]/20 shadow-xs"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <h3 className="font-display font-extrabold text-base text-[#18181B] truncate group-hover:text-[#E11D48] transition-colors">
                {vendor.name}
              </h3>
              {vendor.isVerified && (
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              )}
            </div>
            <p className="text-xs text-[#52525B] font-medium truncate">
              {vendor.ownerName} • {vendor.hall}
            </p>
          </div>
        </div>

        <p className="text-xs text-[#18181B] font-body line-clamp-2 my-1 bg-[#FAFAFA] p-2.5 rounded-xl border border-[#E5E5E5]">
          "{vendor.tagline}"
        </p>

        <div className="mt-3 pt-2 border-t border-[#E5E5E5] flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs font-bold text-[#18181B]">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{vendor.rating}</span>
            <span className="text-[#52525B] font-normal">({vendor.reviewCount})</span>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-bold font-display text-[#E11D48] hover:underline flex items-center gap-1"
          >
            WhatsApp <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  // Default Standard Marketplace Grid Layout (Direction B - Fiverr/Airbnb Style)
  return (
    <div 
      onClick={() => onOpenDetail(vendor)}
      className="group relative bg-white border border-[#E5E5E5] hover:border-[#E11D48]/60 rounded-2xl p-4 shadow-warm shadow-warm-hover cursor-pointer transition-all flex flex-col justify-between"
    >
      <div>
        {/* Cover Photo */}
        <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-3.5 bg-zinc-100">
          <img 
            src={vendor.coverImage} 
            alt={vendor.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Signature Rotated Stamp Tag */}
          <div 
            className="absolute top-2.5 left-2.5 stamp-tag font-display shadow-md z-10"
            style={stampStyle}
          >
            <span>{vendor.stampText}</span>
          </div>

          {/* Heart Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(vendor.id);
            }}
            className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
              isSaved ? 'bg-[#E11D48] text-white shadow-md' : 'bg-black/30 hover:bg-black/50 text-white'
            }`}
            title={isSaved ? 'Remove Bookmark' : 'Save Vendor'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          {/* Rating Pill */}
          <div className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 z-10 font-display">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>{vendor.rating}</span>
            <span className="text-white/70 text-[10px]">({vendor.reviewCount})</span>
          </div>

          {/* Verified Badge overlay if verified */}
          {vendor.isVerified && (
            <div className="absolute bottom-2.5 right-2.5 bg-[#10B981] text-white text-[10px] font-extrabold font-display px-2 py-1 rounded-full flex items-center gap-1 shadow-md z-10">
              <ShieldCheck className="w-3 h-3" />
              VERIFIED
            </div>
          )}
        </div>

        {/* Vendor Info Header */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-display font-extrabold text-lg text-[#18181B] leading-tight group-hover:text-[#E11D48] transition-colors">
            {vendor.name}
          </h3>
          <span className="text-xs font-bold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-md shrink-0">
            {vendor.priceLevel}
          </span>
        </div>

        <p className="text-xs text-[#52525B] font-body line-clamp-2 mb-3">
          {vendor.tagline}
        </p>

        {/* Owner & Campus Location */}
        <div className="flex items-center gap-2 text-xs text-[#52525B] mb-3 pb-3 border-b border-[#E5E5E5]">
          <img 
            src={vendor.avatarImage} 
            alt={vendor.ownerName} 
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="font-medium text-[#18181B] truncate">{vendor.ownerName}</span>
          <span>•</span>
          <span className="flex items-center gap-0.5 text-[#52525B] truncate">
            <MapPin className="w-3 h-3 text-[#E11D48]" />
            {vendor.hall}
          </span>
        </div>
      </div>

      {/* Footer Pricing & Direct WhatsApp Contact */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div>
          <span className="text-[10px] font-bold text-[#52525B] uppercase block font-display">
            From {formatPrice(vendor.startingPrice)}
          </span>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 bg-[#E11D48] hover:bg-[#BE123C] active:scale-95 text-white text-xs font-bold font-display px-3.5 py-2 rounded-xl transition shadow-xs"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Connect</span>
        </a>
      </div>
    </div>
  );
};
