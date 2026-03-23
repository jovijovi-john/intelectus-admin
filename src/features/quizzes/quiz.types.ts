export interface Quiz {
  id: string;
  title: string;
  description: string;
  /** ISO 8601 */
  createdAt: string;
  createdBy: string;
  /** Nomes dos bancos de questões vinculados (ex.: Prova anual, Intelectus) */
  questionBanks: string[];
  categories: string[];
  active: boolean;
}
