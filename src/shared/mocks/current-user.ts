export interface CurrentUser {
  username: string;
  role: string;
  avatarUrl: string | null;
}

export const mockCurrentUser: CurrentUser = {
  username: "Leanjoelson",
  role: "Admin",
  avatarUrl: null,
};
