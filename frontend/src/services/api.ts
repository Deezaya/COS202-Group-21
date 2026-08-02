import { CategoryResponseDto, VendorResponseDto } from '../data/apiTypes';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function fetchCategories(): Promise<CategoryResponseDto[]> {
  return getJson<CategoryResponseDto[]>('/api/categories');
}

export interface VendorSearchParams {
  category?: string;
  q?: string;
  hall?: string;
  faculty?: string;
  priceTier?: string;
}

interface PagedResponse<T> {
  content: T[];
}

export function fetchVendors(params: VendorSearchParams = {}): Promise<VendorResponseDto[]> {
  const query = new URLSearchParams();
  if (params.category) query.set('category', params.category);
  if (params.q) query.set('q', params.q);
  if (params.hall) query.set('hall', params.hall);
  if (params.faculty) query.set('faculty', params.faculty);
  if (params.priceTier) query.set('priceTier', params.priceTier);

  const queryString = query.toString();
  return getJson<PagedResponse<VendorResponseDto>>(`/api/vendors${queryString ? `?${queryString}` : ''}`).then(
    (page) => page.content
  );
}

export function fetchVendorById(id: string): Promise<VendorResponseDto> {
  return getJson<VendorResponseDto>(`/api/vendors/${id}`);
}
