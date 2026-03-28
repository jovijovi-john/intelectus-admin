export interface Theme {
  id: number;
  name: string;
  description: string;
  categories: string[];
  active: boolean;
  /** Quantidade de questões vinculadas (mock/API). */
  questionCount: number;
}
