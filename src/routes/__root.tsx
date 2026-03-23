import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../index.css";
import { AppHeader } from "@/shared/components/AppHeader";
import Sidebar from "@/shared/components/Sidebar";

const RootLayout = () => (
  <main className="flex h-full min-h-0 flex-col bg-white">
    <AppHeader />
    <div className="flex min-h-0 flex-1">
      <Sidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-zinc-100">
        <div className="min-h-0 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
    <TanStackRouterDevtools />
    {import.meta.env.DEV ? (
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    ) : null}
  </main>
);

export const Route = createRootRoute({ component: RootLayout });
