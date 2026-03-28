import type { UserPlan } from "./user.types";

export const USER_PLAN_ORDER: UserPlan[] = ["free", "pro"];

export type UserListFilters = {
  /** Substring em `name` (case-insensitive). */
  name: string;
  /** Substring em `email` (case-insensitive). */
  email: string;
  plan: UserPlan | null;
  /** Busca por dígitos do CPF (substring nos dígitos normalizados). */
  cpf: string;
  /** Ano de nascimento; `null` = qualquer. */
  birthYear: number | null;
};

export const defaultUserListFilters: UserListFilters = {
  name: "",
  email: "",
  plan: null,
  cpf: "",
  birthYear: null,
};

export type UserFilterOptions = {
  /** Anos únicos derivados de `birthDate` (ordenados desc). */
  birthYears: number[];
};
