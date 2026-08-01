export interface CategoryResponseDto {
  id: number;
  name: string;
  slug: string;
}

export interface VendorResponseDto {
  id: number;
  name: string;
  description: string;
  category: CategoryResponseDto;
  contactPhone: string;
  contactWhatsapp: string | null;
  contactInstagram: string | null;
  verified: boolean;
  createdAt: string;
  hallOfResidence: string | null;
  faculty: string | null;
  priceTier: string | null;
}
