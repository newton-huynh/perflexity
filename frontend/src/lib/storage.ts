
const STORAGE_KEY = "perflexityUserProfile";

export function saveProfile(profile: any) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function getProfile(): any | null {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearProfile() {
  localStorage.removeItem(STORAGE_KEY);
}
