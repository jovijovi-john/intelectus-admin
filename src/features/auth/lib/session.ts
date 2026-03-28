const SESSION_KEY = "intelectus_admin_auth";

export function isAuthenticated(): boolean {
  if (typeof sessionStorage === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

/** Stub até integrar API / tokens reais. */
export function login(): void {
  sessionStorage.setItem(SESSION_KEY, "1");
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
