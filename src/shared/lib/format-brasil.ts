import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

/** Formata CPF para exibição (11 dígitos). */
export function formatCpf(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length !== 11) return raw;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

/** Data ISO `YYYY-MM-DD` → exibição pt-BR. */
export function formatBirthDate(iso: string): string {
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  const y = Number(parts[0]);
  const m = Number(parts[1]);
  const d = Number(parts[2]);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("pt-BR");
}

/** Data/hora ISO completa → exibição pt-BR. */
export function formatDateTimePtBr(iso: string): string {
  try {
    const d = parseISO(iso);
    return format(d, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  } catch {
    return iso;
  }
}
