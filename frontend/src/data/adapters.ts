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
  const coverImage = `https://picsum.photos/seed/univendor-${id}-cover/800/600`;
  const avatarImage = `https://picsum.photos/seed/univendor-${id}-avatar/200/200`;

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
    isVerified: dto.verified,
    isFeatured: dto.verified,
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
