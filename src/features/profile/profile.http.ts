import { httpClient } from "@/shared/api/http-client";

import type { AdminProfile, UpdateProfilePayload } from "./profile.types";

/** GET /me/profile — ajustar quando o backend existir. */
export async function getProfileHttp(): Promise<AdminProfile> {
  return httpClient.get<AdminProfile>("/me/profile");
}

/** PATCH /me/profile */
export async function updateProfileHttp(
  body: UpdateProfilePayload,
): Promise<AdminProfile> {
  return httpClient.patch<AdminProfile>("/me/profile", body);
}

/** POST /me/password */
export async function changePasswordHttp(body: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> {
  await httpClient.post<void>("/me/password", body);
}

/** POST /me/avatar (multipart) — body retorna perfil atualizado. */
export async function saveProfileAvatarHttp(
  croppedObjectUrl: string,
): Promise<AdminProfile> {
  const res = await fetch(croppedObjectUrl);
  const blob = await res.blob();
  const form = new FormData();
  form.append("file", blob, "avatar.jpg");
  return httpClient.postForm<AdminProfile>("/me/avatar", form);
}
