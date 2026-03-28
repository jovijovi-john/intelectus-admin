export interface CurrentUser {
  username: string;
  role: string;
  avatarUrl: string | null;
}

export const mockCurrentUser: CurrentUser = {
  username: "Cyro",
  role: "Admin",
  avatarUrl: null,
};
