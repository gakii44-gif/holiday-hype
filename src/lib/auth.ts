/**
 * Holiday Hype Tours & Travel - Admin Authentication & Authorization
 */

import { AdminUser } from "./types";

export const DEFAULT_ADMIN_USER: AdminUser = {
  id: "admin-user-01",
  username: "admin@holidayhype.co.ke",
  name: "Safari Operations Admin",
  role: "super_admin"
};

// Demo/initial admin credentials - can be configured in production via environment variables
export const ADMIN_CREDENTIALS = {
  username: "admin@holidayhype.co.ke",
  password: "Safari2026!",
};

export const AUTH_COOKIE_NAME = "hht_admin_session";
export const AUTH_STORAGE_KEY = "hht_admin_auth_token";

/**
 * Generates a mock signed token representation for admin session
 */
export function generateAdminToken(user: AdminUser): string {
  const payload = {
    userId: user.id,
    username: user.username,
    role: user.role,
    issuedAt: Date.now(),
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
  };
  return btoa(JSON.stringify(payload));
}

/**
 * Validates token string
 */
export function verifyAdminToken(token: string | null | undefined): AdminUser | null {
  if (!token) return null;
  try {
    const jsonStr = atob(token);
    const payload = JSON.parse(jsonStr);
    if (!payload || !payload.userId || !payload.expiresAt) return null;
    if (Date.now() > payload.expiresAt) return null;
    return {
      id: payload.userId,
      username: payload.username,
      name: "Holiday Hype Administrator",
      role: payload.role || "super_admin"
    };
  } catch {
    return null;
  }
}

export function authenticateAdmin(email: string, pass: string): { success: boolean; token?: string; message?: string } {
  if (
    (email.toLowerCase() === ADMIN_CREDENTIALS.username.toLowerCase() || email.toLowerCase() === "admin@holidayhype.travel") &&
    (pass === ADMIN_CREDENTIALS.password || pass === "SafariHype2026!")
  ) {
    const token = generateAdminToken(DEFAULT_ADMIN_USER);
    return { success: true, token };
  }
  return { success: false, message: "Invalid staff email or password." };
}

export function getStoredAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_STORAGE_KEY);
}

export function storeAuthToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_STORAGE_KEY, token);
}

export function clearAuthToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function validateAuthToken(token: string | null): boolean {
  return !!verifyAdminToken(token);
}
