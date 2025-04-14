import { UserProfile } from "./definitions";

const STORAGE_KEY = "perflexityUserProfile";

export function saveProfile(profile: UserProfile) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function getProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearProfile() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
