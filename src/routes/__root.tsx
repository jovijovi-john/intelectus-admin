import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../index.css";
import Sidebar from "@/shared/components/Sidebar";

const RootLayout = () => (
  <main className="flex h-full  bg-black">
    <Sidebar />
    <Outlet />
    <TanStackRouterDevtools />
  </main>
);

export const Route = createRootRoute({ component: RootLayout });
