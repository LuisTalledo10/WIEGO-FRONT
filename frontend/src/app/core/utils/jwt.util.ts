export interface JwtClaims {
  /** ClaimTypes.NameIdentifier — user id */
  sub: string;
  /** custom "company_id" claim */
  companyId: string;
  /** ClaimTypes.Role — numeric role id */
  roleId: number;
  /** unix seconds */
  exp: number;
}

const NAME_ID = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
const ROLE = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

function base64UrlDecode(input: string): string {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4 ? '='.repeat(4 - (padded.length % 4)) : '';
  return decodeURIComponent(
    atob(padded + pad)
      .split('')
      .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  );
}

export function decodeJwt(token: string): JwtClaims | null {
  try {
    const payload = JSON.parse(base64UrlDecode(token.split('.')[1])) as Record<string, unknown>;
    const roleRaw = payload['role'] ?? payload[ROLE];
    return {
      sub: String(payload['sub'] ?? payload[NAME_ID] ?? ''),
      companyId: String(payload['company_id'] ?? ''),
      roleId: Number(roleRaw ?? 0),
      exp: Number(payload['exp'] ?? 0)
    };
  } catch {
    return null;
  }
}

export function isExpired(claims: JwtClaims | null): boolean {
  if (!claims?.exp) return true;
  return claims.exp * 1000 <= Date.now();
}
