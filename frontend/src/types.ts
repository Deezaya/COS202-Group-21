export type CategoryId = string;

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  stampLabel: string;
  stampBg: string;
  stampText: string;
  cardBg: string;
  description: string;
  popularServices: string[];
}

export type UNILAGHall =
  | 'Moremi Hall'
  | 'Jaja Hall'
  | 'Eni Njoku Hall'
  | 'Kofo Ademola Hall'
  | 'Makama Hall'
  | 'Amina Hall'
  | 'Fagunwa Hall'
  | 'Biobaku Hall'
  | 'El Kanemi Hall'
  | 'Mariere Hall'
  | 'Sodeinde Hall'
  | 'Off-Campus (Akoka / Bariga / Yaba)';

export type UNILAGFaculty =
  | 'Faculty of Arts'
  | 'Faculty of Engineering'
  | 'Faculty of Science'
  | 'Faculty of Law'
  | 'Faculty of Social Sciences'
  | 'Faculty of Management Sciences'
  | 'College of Medicine / Clinical Sciences'
  | 'Faculty of Environmental Sciences'
  | 'Faculty of Education';

export interface VendorReview {
  id: string;
  authorName: string;
  hall: string;
  rating: number;
  date: string;
  comment: string;
  verifiedStudent: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  tagline: string;
  categoryId: CategoryId;
  ownerName: string;
  ownerLevel: string; // e.g. "300L Mass Comm"
  hall: UNILAGHall;
  faculty: UNILAGFaculty;
  phone: string;
  whatsapp: string;
  instagram: string;
  priceLevel: '₦' | '₦₦' | '₦₦₦';
  startingPrice: number;
  priceGuide: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isFeatured: boolean;
  stampText: string;
  stampRotation: number; // e.g. -4 or +3
  stampBgColor: string;
  stampTextColor: string;
  cardBgColor?: string;
  coverImage: string;
  avatarImage: string;
  portfolio: string[];
  description: string;
  services: string[];
  operatingHours: string;
  status: 'Available Today' | 'Taking Pre-Orders' | 'Delivering Campus-Wide' | 'Busy with Exams';
  deliveryNote: string;
  joinedDate: string;
  reviews: VendorReview[];
}

export type LayoutDirection = 'flyer-feed' | 'marketplace-grid' | 'bento-spotlight';

export type ViewMode = 'landing' | 'home' | 'directory' | 'saved' | 'login' | 'signup';

export type UserRole = 'STUDENT' | 'ADMIN';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface FilterState {
  searchQuery: string;
  categoryId: CategoryId;
  hall: string;
  faculty: string;
  priceLevel: string;
  onlyVerified: boolean;
  sortBy: 'featured' | 'rating' | 'reviews' | 'price-low' | 'price-high';
}
