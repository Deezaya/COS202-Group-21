import React, { useState } from 'react';
import { Category, CategoryId, UNILAGHall, UNILAGFaculty, Vendor } from '../types';
import { UNILAG_HALLS, UNILAG_FACULTIES, getCategoryPresentation } from '../data/categories';
import { X, PlusCircle, CheckCircle2, Sparkles, Store, ShieldCheck } from 'lucide-react';

interface RegisterVendorModalProps {
  isOpen: boolean;
  categories: Category[];
  onClose: () => void;
  onAddVendor: (vendor: Vendor) => void;
}

export const RegisterVendorModal: React.FC<RegisterVendorModalProps> = ({
  isOpen,
  categories,
  onClose,
  onAddVendor
}) => {
  if (!isOpen) return null;

  const [businessName, setBusinessName] = useState('');
  const [tagline, setTagline] = useState('');
  const [categoryId, setCategoryId] = useState<CategoryId>(categories[0]?.id || 'catering');
  const [ownerName, setOwnerName] = useState('');
  const [ownerLevel, setOwnerLevel] = useState('300L Mass Comm');
  const [hall, setHall] = useState<UNILAGHall>('Moremi Hall');
  const [faculty, setFaculty] = useState<UNILAGFaculty>('Faculty of Social Sciences');
  const [phone, setPhone] = useState('08012345678');
  const [whatsapp, setWhatsapp] = useState('2348012345678');
  const [instagram, setInstagram] = useState('@mybusiness_unilag');
  const [priceLevel, setPriceLevel] = useState<'₦' | '₦₦' | '₦₦₦'>('₦₦');
  const [startingPrice, setStartingPrice] = useState(2500);
  const [priceGuide, setPriceGuide] = useState('Basic Service: ₦2,500 | Standard Package: ₦5,000');
  const [stampText, setStampText] = useState('STUDENT DISCOUNT 10% ✨');
  const [description, setDescription] = useState('');
  const [servicesInput, setServicesInput] = useState('Fast Delivery, Pre-Order Discount, Campus Pickup');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80');

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !ownerName.trim()) return;

    const selectedCatObj = categories.find(c => c.id === categoryId)
      || categories[0]
      || { id: categoryId, name: categoryId, ...getCategoryPresentation(categoryId) };

    const newVendor: Vendor = {
      id: `v-${Date.now()}`,
      name: businessName,
      tagline: tagline || 'Quality student-run service at University of Lagos.',
      categoryId,
      ownerName,
      ownerLevel,
      hall,
      faculty,
      phone,
      whatsapp,
      instagram,
      priceLevel,
      startingPrice: Number(startingPrice) || 2000,
      priceGuide: priceGuide || 'Contact on WhatsApp for custom pricing.',
      rating: 5.0,
      reviewCount: 1,
      isVerified: true,
      isFeatured: false,
      stampText: stampText || 'NEW STUDENT VENDOR 🚀',
      stampRotation: Math.floor(Math.random() * 8) - 4,
      stampBgColor: selectedCatObj.stampBg,
      stampTextColor: selectedCatObj.stampText,
      cardBgColor: selectedCatObj.cardBg,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
      avatarImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      portfolio: [
        coverImage,
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
      ],
      description: description || 'Student business providing reliable services directly to UNILAG students.',
      services: servicesInput.split(',').map(s => s.trim()).filter(Boolean),
      operatingHours: 'Mon - Sat: 9:00 AM - 8:00 PM',
      status: 'Available Today',
      deliveryNote: `Delivering around ${hall} and surrounding campus halls.`,
      joinedDate: 'Just now',
      reviews: [
        {
          id: `r-${Date.now()}`,
          authorName: 'UniVendor Admin',
          hall: hall,
          rating: 5,
          date: 'Just now',
          comment: 'Welcome to UniVendor directory! Listed and ready for student orders.',
          verifiedStudent: true
        }
      ]
    };

    onAddVendor(newVendor);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E5E5E5] overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E5E5E5] bg-[#FFE4E6]/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-[#E11D48] text-white">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-lg text-[#18181B]">
                List Your Student Business
              </h2>
              <p className="text-xs text-[#52525B]">
                Connect with UNILAG students across all halls & faculties
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/10 text-[#18181B] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#18181B]">
              Congratulations! Business Listed 🎉
            </h3>
            <p className="text-sm text-[#52525B]">
              Your student business is now active on UniVendor directory. Students can now connect with you directly via WhatsApp!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-4">
            {/* Business Name & Tagline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#18181B] block mb-1 font-display">
                  Business Name *
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Titi's Hair & Braids Room"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                  className="w-full p-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#18181B] block mb-1 font-display">
                  Category *
                </label>
                <select 
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value as CategoryId)}
                  className="w-full p-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#18181B] block mb-1 font-display">
                Short Catchy Tagline
              </label>
              <input 
                type="text"
                placeholder="e.g. Painless knotless braids delivered in Moremi Room 210"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
              />
            </div>

            {/* Student Owner Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-[#FAFAFA] rounded-2xl border border-[#E5E5E5]">
              <div>
                <label className="text-xs font-bold text-[#18181B] block mb-1 font-display">
                  Student Owner Name *
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Titilayo Adebayo"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  required
                  className="w-full p-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#18181B] block mb-1 font-display">
                  Level & Department
                </label>
                <input 
                  type="text"
                  placeholder="e.g. 300L Sociology"
                  value={ownerLevel}
                  onChange={(e) => setOwnerLevel(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#18181B] block mb-1 font-display">
                  Hall of Residence
                </label>
                <select 
                  value={hall}
                  onChange={(e) => setHall(e.target.value as UNILAGHall)}
                  className="w-full p-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
                >
                  {UNILAG_HALLS.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#18181B] block mb-1 font-display">
                  Faculty
                </label>
                <select 
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value as UNILAGFaculty)}
                  className="w-full p-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
                >
                  {UNILAG_FACULTIES.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#18181B] block mb-1 font-display">
                  WhatsApp Number (e.g., 23480...) *
                </label>
                <input 
                  type="text"
                  placeholder="2348012345678"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  required
                  className="w-full p-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#18181B] block mb-1 font-display">
                  Instagram Handle
                </label>
                <input 
                  type="text"
                  placeholder="@yourbusiness_unilag"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
                />
              </div>
            </div>

            {/* Signature Stamp Text */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-[#18181B] block mb-1 font-display">
                  Signature Flyer Stamp Tag
                </label>
                <input 
                  type="text"
                  placeholder="e.g. MOREMI FAV 🌟"
                  value={stampText}
                  onChange={(e) => setStampText(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#18181B] block mb-1 font-display">
                  Starting Price (₦)
                </label>
                <input 
                  type="number"
                  placeholder="2500"
                  value={startingPrice}
                  onChange={(e) => setStartingPrice(Number(e.target.value))}
                  className="w-full p-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#18181B] block mb-1 font-display">
                  Price Level
                </label>
                <select 
                  value={priceLevel}
                  onChange={(e) => setPriceLevel(e.target.value as any)}
                  className="w-full p-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
                >
                  <option value="₦">₦ (Budget Friendly)</option>
                  <option value="₦₦">₦₦ (Standard)</option>
                  <option value="₦₦₦">₦₦₦ (Premium)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#18181B] block mb-1 font-display">
                Services Offered (Comma Separated)
              </label>
              <input 
                type="text"
                placeholder="e.g. Knotless Braids, Wig Revamping, Cornrows, Doorstep Pickup"
                value={servicesInput}
                onChange={(e) => setServicesInput(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#18181B] block mb-1 font-display">
                Full Description
              </label>
              <textarea 
                rows={3}
                placeholder="Describe what makes your service or product great for UNILAG students..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#E11D48] hover:bg-[#BE123C] text-white font-display font-extrabold text-sm py-3.5 rounded-2xl shadow-md transition flex items-center justify-center gap-2 mt-2"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Submit & Publish Vendor Profile</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
