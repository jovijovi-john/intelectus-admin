import type { User } from "./user.types";
import type { UserFilterOptions, UserListFilters } from "./user-filters.types";

function includesInsensitive(haystack: string, needle: string): boolean {
  if (!needle.trim()) return true;
  return haystack.toLowerCase().includes(needle.trim().toLowerCase());
}

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

function birthYearFromIso(iso: string): number | null {
  const parts = iso.split("-");
  if (parts.length !== 3) return null;
  const y = Number(parts[0]);
  return Number.isFinite(y) && y > 0 ? y : null;
}

/** Aplica filtros no cliente sobre a lista de usuários. */
export function applyUserFilters(users: User[], filters: UserListFilters): User[] {
  const cpfNeedle = digitsOnly(filters.cpf);

  return users.filter((u) => {
    if (!includesInsensitive(u.name, filters.name)) return false;
    if (!includesInsensitive(u.email, filters.email)) return false;

    if (filters.plan !== null && u.plan !== filters.plan) return false;

    if (cpfNeedle.length > 0) {
      const uDigits = digitsOnly(u.cpf);
      if (!uDigits.includes(cpfNeedle)) return false;
    }

    if (filters.birthYear !== null) {
      const y = birthYearFromIso(u.birthDate);
      if (y !== filters.birthYear) return false;
    }

    return true;
  });
}

/** Opções derivadas dos dados carregados. */
export function deriveUserFilterOptions(users: User[]): UserFilterOptions {
  const years = new Set<number>();

  for (const u of users) {
    const y = birthYearFromIso(u.birthDate);
    if (y !== null) years.add(y);
  }

  return {
    birthYears: [...years].sort((a, b) => b - a),
  };
}

export function hasActiveFilters(filters: UserListFilters): boolean {
  return (
    filters.name.trim() !== "" ||
    filters.email.trim() !== "" ||
    filters.plan !== null ||
    filters.cpf.trim() !== "" ||
    filters.birthYear !== null
  );
}

export function cloneUserListFilters(filters: UserListFilters): UserListFilters {
  return { ...filters };
}

export function countActiveFilterCriteria(filters: UserListFilters): number {
  let n = 0;
  if (filters.name.trim() !== "") n += 1;
  if (filters.email.trim() !== "") n += 1;
  if (filters.plan !== null) n += 1;
  if (filters.cpf.trim() !== "") n += 1;
  if (filters.birthYear !== null) n += 1;
  return n;
}
