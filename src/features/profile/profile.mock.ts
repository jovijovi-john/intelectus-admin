import { getStoredAvatarDataUrl, setStoredAvatarDataUrl } from "./lib/avatar-storage";
import { objectUrlToDataUrl } from "./lib/object-url-to-data-url";
import type { AdminProfile, UpdateProfilePayload } from "./profile.types";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

let profileState: AdminProfile = {
  id: "admin-1",
  firstName: "Maria",
  lastName: "Silva",
  cpf: "52998224725",
  email: "maria.silva@intelectus.com",
  birthDate: "1990-05-15",
  role: "Administrador",
  avatarUrl: undefined,
  createdAt: "2024-01-10T12:00:00.000Z",
  updatedAt: "2025-03-01T15:30:00.000Z",
};

export async function getProfileMock(): Promise<AdminProfile> {
  await delay(280);
  const storedAvatar = getStoredAvatarDataUrl();
  return {
    ...profileState,
    avatarUrl: storedAvatar ?? profileState.avatarUrl,
  };
}

export async function updateProfileMock(
  patch: UpdateProfilePayload,
): Promise<AdminProfile> {
  await delay(350);
  const now = new Date().toISOString();
  profileState = {
    ...profileState,
    ...patch,
    updatedAt: now,
  };
  return { ...profileState };
}

export async function changePasswordMock(_payload: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> {
  await delay(400);
}

/** Salva foto em `localStorage` (data URL) e atualiza estado em memória. */
export async function saveProfileAvatarMock(
  croppedObjectUrl: string,
): Promise<AdminProfile> {
  await delay(220);
  const dataUrl = await objectUrlToDataUrl(croppedObjectUrl);
  setStoredAvatarDataUrl(dataUrl);
  const now = new Date().toISOString();
  profileState = {
    ...profileState,
    avatarUrl: dataUrl,
    updatedAt: now,
  };
  return { ...profileState };
}
