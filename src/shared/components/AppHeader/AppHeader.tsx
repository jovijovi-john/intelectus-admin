import { mockCurrentUser } from "@/shared/mocks/current-user";

import { BrandLogo } from "../BrandLogo";
import { HeaderProfile } from "../HeaderProfile";

export function AppHeader() {
  const user = mockCurrentUser;

  return (
    <header className="flex shrink-0 items-center justify-between border-b-2 border-border bg-background px-8 py-4">
      <BrandLogo />
      <HeaderProfile
        username={user.username}
        role={user.role}
        avatarUrl={user.avatarUrl}
      />
    </header>
  );
}
