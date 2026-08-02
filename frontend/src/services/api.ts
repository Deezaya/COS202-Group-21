import { CategoryResponseDto, VendorResponseDto } from '../data/apiTypes';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function readErrorMessage(res: Response): Promise<string> {
  try {
    const body = await res.json();
    if (typeof body?.message === 'string' && body.message.length > 0) {
      return body.message;
    }
  } catch {
    // response wasn't JSON - fall through to the generic message
  }
  return `Request failed with status ${res.status}`;
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new ApiError(await readErrorMessage(res), res.status);
  }
  return res.json() as Promise<T>;
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    throw new ApiError(await readErrorMessage(res), res.status);
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

export interface AuthResponseDto {
  token: string;
}

export function registerAccount(email: string, password: string): Promise<AuthResponseDto> {
  return postJson<AuthResponseDto>('/api/auth/register', { email, password });
}

export function loginAccount(email: string, password: string): Promise<AuthResponseDto> {
  return postJson<AuthResponseDto>('/api/auth/login', { email, password });
}
