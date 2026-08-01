import React, { useState } from 'react';
import { Vendor, VendorReview } from '../types';
import { formatWhatsAppUrl, formatPrice } from '../utils/helpers';
import { 
  X, 
  MessageCircle, 
  Phone, 
  Instagram, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Clock, 
  Building2, 
  Tag, 
  Heart, 
  Send, 
  CheckCircle2, 
  ChevronRight,
  Share2,
  Sparkles
} from 'lucide-react';

interface VendorDetailModalProps {
  vendor: Vendor | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (vendorId: string) => void;
  onAddReview: (vendorId: string, review: Omit<VendorReview, 'id' | 'date'>) => void;
}

export const VendorDetailModal: React.FC<VendorDetailModalProps> = ({
  vendor,
  onClose,
  isSaved,
  onToggleSave,
  onAddReview
}) => {
  if (!vendor) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'pricing' | 'portfolio' | 'reviews'>('overview');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Review Form State
  const [reviewName, setReviewName] = useState('');
  const [reviewHall, setReviewHall] = useState('Moremi Hall');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const whatsappUrl = formatWhatsAppUrl(vendor.whatsapp, vendor.name);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    onAddReview(vendor.id, {
      authorName: reviewName,
      hall: reviewHall,
      rating: reviewRating,
      comment: reviewComment,
      verifiedStudent: true
    });

    setReviewSubmitted(true);
    setReviewComment('');
    setReviewName('');
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  const stampStyle = {
    transform: `rotate(${vendor.stampRotation || -3}deg)`,
    backgroundColor: vendor.stampBgColor || '#FFE4E6',
    color: vendor.stampTextColor || '#E11D48',
    borderColor: vendor.stampTextColor || '#E11D48'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 sm:py-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#E5E5E5] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Cover Banner */}
        <div className="relative h-52 sm:h-64 w-full bg-zinc-900 shrink-0">
          <img 
            src={vendor.coverImage} 
            alt={vendor.name} 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

          {/* Top Control Overlay */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            {/* Signature Rotated Stamp Tag */}
            <div 
              className="stamp-tag font-display text-xs shadow-lg"
              style={stampStyle}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>{vendor.stampText}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition"
                title="Share Vendor"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onToggleSave(vendor.id)}
                className={`p-2.5 rounded-full backdrop-blur-md transition ${
                  isSaved ? 'bg-[#E11D48] text-white' : 'bg-black/40 hover:bg-black/60 text-white'
                }`}
                title="Save Vendor"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {copiedLink && (
            <div className="absolute top-16 right-4 bg-[#10B981] text-white text-xs font-bold font-display px-3 py-1.5 rounded-xl shadow-lg z-20 animate-in fade-in">
              Link copied to clipboard!
            </div>
          )}

          {/* Owner Profile Avatar Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end gap-3 z-10 text-white">
            <img 
              src={vendor.avatarImage} 
              alt={vendor.ownerName} 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-white object-cover shadow-lg shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight drop-shadow-md">
                  {vendor.name}
                </h2>
                {vendor.isVerified && (
                  <span className="bg-[#10B981] text-white text-[10px] font-extrabold font-display px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-md">
                    <ShieldCheck className="w-3 h-3" /> UNILAG VERIFIED
                  </span>
                )}
              </div>
              <p className="text-xs text-white/90 font-medium drop-shadow-xs">
                Run by <span className="font-bold">{vendor.ownerName}</span> ({vendor.ownerLevel})
              </p>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Quick Stats & Location Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-[#FAFAFA] rounded-2xl border border-[#E5E5E5] shadow-xs">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#FFE4E6] text-[#E11D48]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#52525B] block font-display">Hall</span>
                <span className="text-xs font-extrabold text-[#18181B]">{vendor.hall}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#ECFDF5] text-[#059669]">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#52525B] block font-display">Faculty</span>
                <span className="text-xs font-extrabold text-[#18181B] truncate max-w-[110px] block">{vendor.faculty}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#52525B] block font-display">Rating</span>
                <span className="text-xs font-extrabold text-[#18181B]">{vendor.rating} ({vendor.reviewCount})</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-50 text-[#E11D48]">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#52525B] block font-display">Status</span>
                <span className="text-xs font-extrabold text-[#059669]">{vendor.status}</span>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons: WhatsApp, Call & Instagram */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:col-span-2 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-extrabold text-sm py-3 px-4 rounded-2xl shadow-md transition scale-100 hover:scale-[1.01] active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp Directly</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${vendor.phone}`}
                className="flex items-center justify-center gap-1.5 bg-white border border-[#E5E5E5] hover:border-[#18181B] text-[#18181B] font-display font-bold text-xs py-3 rounded-2xl transition"
              >
                <Phone className="w-4 h-4 text-[#E11D48]" />
                <span>Call</span>
              </a>

              <a
                href={`https://instagram.com/${vendor.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-rose-600 to-pink-500 text-white font-display font-bold text-xs py-3 rounded-2xl transition shadow-xs"
              >
                <Instagram className="w-4 h-4" />
                <span>IG Profile</span>
              </a>
            </div>
          </div>

          {/* Navigation Tabs inside modal */}
          <div className="flex border-b border-[#E5E5E5] gap-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2.5 text-xs font-extrabold font-display transition relative ${
                activeTab === 'overview'
                  ? 'text-[#E11D48] border-b-2 border-[#E11D48]'
                  : 'text-[#52525B] hover:text-[#18181B]'
              }`}
            >
              About & Services
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`pb-2.5 text-xs font-extrabold font-display transition relative ${
                activeTab === 'pricing'
                  ? 'text-[#E11D48] border-b-2 border-[#E11D48]'
                  : 'text-[#52525B] hover:text-[#18181B]'
              }`}
            >
              Price Guide
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`pb-2.5 text-xs font-extrabold font-display transition relative ${
                activeTab === 'portfolio'
                  ? 'text-[#E11D48] border-b-2 border-[#E11D48]'
                  : 'text-[#52525B] hover:text-[#18181B]'
              }`}
            >
              Portfolio ({vendor.portfolio.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2.5 text-xs font-extrabold font-display transition relative ${
                activeTab === 'reviews'
                  ? 'text-[#E11D48] border-b-2 border-[#E11D48]'
                  : 'text-[#52525B] hover:text-[#18181B]'
              }`}
            >
              Student Reviews ({vendor.reviews.length})
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div>
                <h3 className="font-display font-extrabold text-sm text-[#18181B] uppercase tracking-wider mb-2">
                  About {vendor.name}
                </h3>
                <p className="text-sm text-[#18181B] font-body leading-relaxed bg-[#FAFAFA] p-4 rounded-2xl border border-[#E5E5E5]">
                  {vendor.description}
                </p>
              </div>

              <div>
                <h3 className="font-display font-extrabold text-sm text-[#18181B] uppercase tracking-wider mb-2">
                  Services Offered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {vendor.services.map((serv, idx) => (
                    <span 
                      key={idx}
                      className="bg-[#FFE4E6] border border-[#FECDD3] text-[#18181B] text-xs font-bold font-display px-3 py-1.5 rounded-xl flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E11D48]" />
                      {serv}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-display font-extrabold text-[#059669] block">
                    Campus Trust Note & Delivery
                  </span>
                  <p className="text-[#18181B] mt-0.5 font-body">
                    {vendor.deliveryNote} | Operating hours: {vendor.operatingHours}.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Price Guide */}
          {activeTab === 'pricing' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-white p-4 rounded-2xl border border-[#E5E5E5]">
                <h3 className="font-display font-extrabold text-sm text-[#18181B] mb-1">
                  Estimated Pricing & Rate Card
                </h3>
                <p className="text-xs text-[#52525B] font-body mb-3">
                  Prices are student-friendly and negotiable for bulk/group bookings.
                </p>
                <div className="p-3 bg-[#FAFAFA] rounded-xl text-xs font-medium text-[#18181B] border border-[#E5E5E5] leading-relaxed">
                  {vendor.priceGuide}
                </div>
              </div>

              <div className="p-4 bg-[#FFE4E6] rounded-2xl border border-[#FECDD3]">
                <span className="font-display font-bold text-xs text-[#E11D48] block mb-1">
                  💡 Student Tip
                </span>
                <p className="text-xs text-[#18181B]">
                  Mention <span className="font-bold">"UniVendor App"</span> when chatting on WhatsApp to confirm special discounts for hall residents!
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Portfolio */}
          {activeTab === 'portfolio' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {vendor.portfolio.map((imgUrl, i) => (
                  <div 
                    key={i}
                    onClick={() => setSelectedImage(imgUrl)}
                    className="relative h-36 rounded-2xl overflow-hidden cursor-pointer group bg-zinc-100 border border-[#E5E5E5]"
                  >
                    <img 
                      src={imgUrl} 
                      alt={`Work sample ${i + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold font-display">
                      Enlarge
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Student Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Existing Reviews List */}
              <div className="space-y-3">
                {vendor.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-white rounded-2xl border border-[#E5E5E5]">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-xs text-[#18181B]">{rev.authorName}</span>
                        <span className="text-[10px] bg-[#F4F4F5] text-[#52525B] font-bold px-2 py-0.5 rounded-full font-display">
                          {rev.hall}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[#18181B] font-body leading-relaxed">{rev.comment}</p>
                    <span className="text-[10px] text-[#52525B] mt-1.5 block">{rev.date}</span>
                  </div>
                ))}
              </div>

              {/* Submit a Review Form */}
              <form onSubmit={handleSubmitReview} className="p-4 bg-white rounded-2xl border border-[#E5E5E5] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-extrabold text-xs text-[#18181B] uppercase tracking-wider">
                    Add Your Experience
                  </h4>
                  {reviewSubmitted && (
                    <span className="text-xs text-[#059669] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Review posted!
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input 
                    type="text" 
                    placeholder="Your Name (e.g., Tolu, 300L)"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    required
                    className="p-2.5 rounded-xl border border-[#E5E5E5] text-xs font-body focus:outline-none focus:border-[#E11D48]"
                  />

                  <select 
                    value={reviewHall}
                    onChange={(e) => setReviewHall(e.target.value)}
                    className="p-2.5 rounded-xl border border-[#E5E5E5] text-xs font-body focus:outline-none focus:border-[#E11D48]"
                  >
                    <option value="Moremi Hall">Moremi Hall</option>
                    <option value="Jaja Hall">Jaja Hall</option>
                    <option value="Eni Njoku Hall">Eni Njoku Hall</option>
                    <option value="Amina Hall">Amina Hall</option>
                    <option value="Kofo Ademola Hall">Kofo Ademola Hall</option>
                    <option value="Mariere Hall">Mariere Hall</option>
                    <option value="Sodeinde Hall">Sodeinde Hall</option>
                    <option value="Biobaku Hall">Biobaku Hall</option>
                    <option value="Off-Campus">Off-Campus</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#52525B] block mb-1 font-display">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setReviewRating(num)}
                        className={`p-1.5 rounded-lg border transition ${
                          reviewRating >= num ? 'bg-amber-50 border-amber-300 text-amber-500' : 'bg-zinc-50 text-zinc-300'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${reviewRating >= num ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea 
                  rows={2}
                  placeholder="How was their service or product quality?"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-[#E5E5E5] text-xs font-body focus:outline-none focus:border-[#E11D48]"
                />

                <button
                  type="submit"
                  className="w-full bg-[#E11D48] hover:bg-[#BE123C] text-white font-display font-extrabold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Review</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox for enlarge portfolio */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4"
        >
          <img src={selectedImage} alt="Enlarged" className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain" />
          <button className="absolute top-4 right-4 text-white p-2 bg-black/50 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
