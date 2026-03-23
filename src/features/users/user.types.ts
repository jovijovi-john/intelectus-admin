export type UserPlan = "free" | "pro";

export interface User {
  id: string;
  name: string;
  email: string;
  plan: UserPlan;
  /** Apenas dígitos (11 caracteres) ou já formatado — exibição padroniza no front. */
  cpf: string;
  /** ISO `YYYY-MM-DD`. */
  birthDate: string;
}
