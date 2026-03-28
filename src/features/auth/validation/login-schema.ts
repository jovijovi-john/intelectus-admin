import { z } from "zod";

/** Placeholder para quando ligarem validação ao formulário (TanStack Form + Zod). */
export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
