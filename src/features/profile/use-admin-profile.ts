import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { profileKeys } from "./profile.keys";
import {
  changePassword,
  getProfile,
  saveProfileAvatar,
  updateProfile,
} from "./profile.repository";
import type { UpdateProfilePayload } from "./profile.types";

export function useAdminProfile() {
  return useQuery({
    queryKey: profileKeys.detail(),
    queryFn: getProfile,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateProfilePayload) => updateProfile(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: profileKeys.detail() });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}

export function useSaveProfileAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (croppedObjectUrl: string) => saveProfileAvatar(croppedObjectUrl),
    onSuccess: (profile) => {
      queryClient.setQueryData(profileKeys.detail(), profile);
    },
  });
}
