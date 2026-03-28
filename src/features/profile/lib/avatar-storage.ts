const STORAGE_KEY = "intelectus_admin_profile_avatar_data_url";

/** Data URL da foto (mock) — persiste entre sessões. */
export function getStoredAvatarDataUrl(): string | null {
  if (typeof localStorage === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredAvatarDataUrl(dataUrl: string | null): void {
  if (typeof localStorage === "undefined") return;
  try {
    if (dataUrl === null || dataUrl === "") {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, dataUrl);
    }
  } catch {
    /* quota / private mode */
  }
}
