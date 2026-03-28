import { useNavigate, useRouter } from "@tanstack/react-router";

import { login as loginSession, logout as logoutSession } from "../lib/session";

export function useAuth() {
  const navigate = useNavigate();
  const router = useRouter();

  function loginAndGoDashboard() {
    loginSession();
    void navigate({ to: "/dashboard" });
  }

  function logoutAndGoHome() {
    logoutSession();
    void router.invalidate();
    void navigate({ to: "/" });
  }

  return { loginAndGoDashboard, logoutAndGoHome };
}
