import { Category, Vendor, VendorReview } from '../types';
import { CategoryResponseDto, VendorResponseDto } from './apiTypes';
import { getCategoryPresentation } from './categories';

function hashSeed(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

const STARTING_PRICE_BY_TIER: Record<string, number> = {
  '₦': 1500,
  '₦₦': 5000,
  '₦₦₦': 15000
};

/**
 * Custom Cover Images by Vendor ID or Vendor Name.
 * You can set custom image URLs here or use local files placed in `frontend/public/` (e.g. '/images/my-cover.jpg').
 */
export const CUSTOM_VENDOR_COVER_IMAGES: Record<string, string> = {
  '1': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80', // Mama Kemi Kitchen
  '2': 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80', // Snack Bae Unilag
  '3': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', // Threadwork by Tolu (Custom Native & Y2K)
  '4': 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80', // Denim Republic NG (Y2K Thrift Denim & Jackets)
  '5': 'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80', // Phone Doctor Unilag (Smartphone & Board Repair)
  '6': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80', // QuickFix Electronics (Laptop & Circuit Repair)
  '7': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80', // Calculus with Chidi
  '8': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80', // CodeCamp Peer Tutors
  '9': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80', // Temi Glam & Braiding Studio
  '10': 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80', // Fade Kingz Barbershop
  '11': 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80', // Unilag Snaps Studio
  '12': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80', // PixelCraft WhatsApp Flyers
  '13': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80', // GlowByDebby Skincare
  '14': 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80', // FreshExpress Laundry & Kicks
  '15': 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'  // Hall Surprises & Saxophone
};

export function adaptCategory(dto: CategoryResponseDto): Category {
  return {
    id: dto.slug,
    name: dto.name,
    ...getCategoryPresentation(dto.slug)
  };
}

export function adaptVendor(dto: VendorResponseDto): Vendor {
  const id = String(dto.id);
  const seed = hashSeed(id);
  const presentation = getCategoryPresentation(dto.category.slug);
  const hall = dto.hallOfResidence || 'Off-Campus (Akoka / Bariga / Yaba)';
  const priceLevel = (dto.priceTier as Vendor['priceLevel']) || '₦₦';
  const coverImage = CUSTOM_VENDOR_COVER_IMAGES[id] || CUSTOM_VENDOR_COVER_IMAGES[dto.name] || `https://picsum.photos/seed/univendor-${id}-cover/800/600`;
  const avatarImage = coverImage;

  return {
    id,
    name: dto.name,
    tagline: dto.description.length > 90 ? `${dto.description.slice(0, 87)}...` : dto.description,
    categoryId: dto.category.slug,
    ownerName: 'UNILAG Student Vendor',
    ownerLevel: 'Verified Campus Business',
    hall: hall as Vendor['hall'],
    faculty: (dto.faculty || 'Faculty of Social Sciences') as Vendor['faculty'],
    phone: dto.contactPhone,
    whatsapp: dto.contactWhatsapp || dto.contactPhone,
    instagram: dto.contactInstagram || '',
    priceLevel,
    startingPrice: STARTING_PRICE_BY_TIER[priceLevel] || STARTING_PRICE_BY_TIER['₦₦'],
    priceGuide: 'Contact on WhatsApp for full pricing details.',
    rating: 0,
    reviewCount: 0,
    isVerified: dto.verificationStatus === 'VERIFIED',
    isFeatured: dto.verificationStatus === 'VERIFIED',
    stampText: presentation.stampLabel,
    stampRotation: (seed % 9) - 4,
    stampBgColor: presentation.stampBg,
    stampTextColor: presentation.stampText,
    cardBgColor: presentation.cardBg,
    coverImage,
    avatarImage,
    portfolio: [coverImage, `https://picsum.photos/seed/univendor-${id}-p1/600/600`, `https://picsum.photos/seed/univendor-${id}-p2/600/600`],
    description: dto.description,
    services: [dto.category.name],
    operatingHours: 'Mon - Sat: 9:00 AM - 8:00 PM',
    status: 'Available Today',
    deliveryNote: `Delivering around ${hall} and surrounding campus halls.`,
    joinedDate: new Date(dto.createdAt).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' }),
    reviews: []
  };
}

// Overlays locally-added reviews (Phase 3, never sent to the backend) onto a vendor and recomputes rating.
export function mergeLocalReviews(vendor: Vendor, localReviews: Record<string, VendorReview[]>): Vendor {
  const extraReviews = localReviews[vendor.id];
  if (!extraReviews || extraReviews.length === 0) return vendor;
  const reviews = [...extraReviews, ...vendor.reviews];
  const rating = Number(
    (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
  );
  return { ...vendor, reviews, reviewCount: reviews.length, rating };
}
