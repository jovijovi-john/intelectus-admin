import { isAuthenticated } from "@/features/auth";
import { profileKeys } from "@/features/profile/profile.keys";
import { getProfile } from "@/features/profile/profile.repository";
import Sidebar from "@/shared/components/Sidebar";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_shell")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/" });
    }
  },
  component: ShellLayout,
});

function ShellLayout() {
  const queryClient = useQueryClient();

  useEffect(() => {
    void queryClient.prefetchQuery({
      queryKey: profileKeys.detail(),
      queryFn: getProfile,
    });
  }, [queryClient]);

  return (
    <div className="flex h-dvh min-h-0 w-full flex-row overflow-hidden bg-white">
      <Sidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-zinc-100 pl-[min(100vw,300px)]">
        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
