import { isMockApi } from "@/shared/config/api-mode";

import {
  changePasswordHttp,
  getProfileHttp,
  saveProfileAvatarHttp,
  updateProfileHttp,
} from "./profile.http";
import {
  changePasswordMock,
  getProfileMock,
  saveProfileAvatarMock,
  updateProfileMock,
} from "./profile.mock";
import type { AdminProfile, UpdateProfilePayload } from "./profile.types";

export async function getProfile(): Promise<AdminProfile> {
  if (isMockApi()) {
    return getProfileMock();
  }
  return getProfileHttp();
}

export async function updateProfile(
  body: UpdateProfilePayload,
): Promise<AdminProfile> {
  if (isMockApi()) {
    return updateProfileMock(body);
  }
  return updateProfileHttp(body);
}

export async function changePassword(body: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> {
  if (isMockApi()) {
    return changePasswordMock(body);
  }
  return changePasswordHttp(body);
}

/** Persiste a foto do perfil (mock: localStorage; real: `POST /me/avatar`). */
export async function saveProfileAvatar(
  croppedObjectUrl: string,
): Promise<AdminProfile> {
  if (isMockApi()) {
    return saveProfileAvatarMock(croppedObjectUrl);
  }
  return saveProfileAvatarHttp(croppedObjectUrl);
}
