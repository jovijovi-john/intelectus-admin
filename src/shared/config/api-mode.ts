/**
 * When true, repositories use in-memory mocks instead of HTTP.
 * Set via VITE_API_USE_MOCK in .env (see .env.example).
 */
export function isMockApi(): boolean {
  const v = import.meta.env.VITE_API_USE_MOCK;
  if (v === "false") return false;
  if (v === "true") return true;
  // Default to mock so dev works without a local .env file.
  return true;
}
