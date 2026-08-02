export function formatWhatsAppUrl(phone: string, vendorName: string, serviceName?: string): string {
  // Clean phone number to format 23480...
  let cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '234' + cleanPhone.substring(1);
  } else if (cleanPhone.startsWith('8') || cleanPhone.startsWith('7') || cleanPhone.startsWith('9')) {
    cleanPhone = '234' + cleanPhone;
  }
  
  const text = encodeURIComponent(
    `Hi! I saw your business "${vendorName}" on UniVendor. I'd like to ask about ${serviceName || 'your services'} around UNILAG campus! 🎓`
  );
  
  return `https://wa.me/${cleanPhone}?text=${text}`;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 })
    .format(amount)
    .replace('NGN', '₦');
}

interface DecodedJwt {
  sub: string;
  email: string;
  role: string;
  exp: number;
}

// Reads the JWT's own claims client-side (no /me endpoint exists on the backend yet).
export function decodeJwt(token: string): DecodedJwt | null {
  try {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function isJwtExpired(decoded: DecodedJwt): boolean {
  return decoded.exp * 1000 < Date.now();
}
