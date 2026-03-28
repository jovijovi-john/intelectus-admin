import { z } from "zod";

export const profileEditSchema = z.object({
  firstName: z.string().min(1, "Informe o nome"),
  lastName: z.string().min(1, "Informe o sobrenome"),
  email: z.string().email("E-mail inválido"),
  cpf: z
    .string()
    .transform((s) => s.replace(/\D/g, ""))
    .pipe(z.string().length(11, "CPF deve ter 11 dígitos")),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
});

export type ProfileEditFormValues = z.infer<typeof profileEditSchema>;
