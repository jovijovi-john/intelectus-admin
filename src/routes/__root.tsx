import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../index.css";

/** Raiz só renderiza as rotas; a sidebar fica no layout `/_shell` (rotas autenticadas). */
function RootLayout() {
  return (
    <div className="min-h-dvh w-full">
      <Outlet />
      <TanStackRouterDevtools />
      {import.meta.env.DEV ? (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      ) : null}
    </div>
  );
}

export const Route = createRootRoute({ component: RootLayout });
