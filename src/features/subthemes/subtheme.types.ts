export interface Subtheme {
  id: number;
  /** FK para `Theme.id`. */
  themeId: number;
  name: string;
  description: string;
  categories: string[];
  active: boolean;
  /** Quantidade de questões vinculadas (mock/API). */
  questionCount: number;
}
