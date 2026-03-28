import { isAuthenticated, LoginPage } from "@/features/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: Index,
});

function Index() {
  return <LoginPage />;
}
