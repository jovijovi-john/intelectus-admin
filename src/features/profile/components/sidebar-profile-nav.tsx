import { useAdminProfile } from "@/features/profile/use-admin-profile";
import SidebarButton from "@/shared/components/SidebarButton";
import { UserCircle } from "lucide-react";

export function SidebarProfileNav() {
  const { data } = useAdminProfile();

  return (
    <SidebarButton
      Icon={UserCircle}
      to="/profile"
      title="Meu perfil"
      className="mt-auto"
      thumbnailUrl={data?.avatarUrl}
    />
  );
}
