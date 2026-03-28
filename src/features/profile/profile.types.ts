export interface AdminProfile {
  id: string;
  firstName: string;
  lastName: string;
  /** Apenas dígitos (11) ou já formatado — exibição usa `formatCpf`. */
  cpf: string;
  email: string;
  /** ISO `YYYY-MM-DD`. */
  birthDate: string;
  /** Somente leitura na UI. */
  role: string;
  avatarUrl?: string;
  /** ISO datetime. */
  createdAt: string;
  /** ISO datetime. */
  updatedAt: string;
}

export type UpdateProfilePayload = Pick<
  AdminProfile,
  "firstName" | "lastName" | "email" | "cpf" | "birthDate"
>;
