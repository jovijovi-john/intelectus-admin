import { ANESTHESIOLOGY_THEME_SEEDS } from "@/shared/data/anesthesiology-catalog";

import type { Theme } from "./theme.types";

const MOCK_THEMES: Theme[] = ANESTHESIOLOGY_THEME_SEEDS.map((t, i) => ({
  id: t.id,
  name: t.name,
  description: t.description,
  categories: [...t.categories],
  active: i % 4 !== 2,
  questionCount: 8 + i * 6 + (i % 3) * 2,
}));

const MOCK_DELAY_MS = 400;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function listThemesMock(): Promise<Theme[]> {
  await delay(MOCK_DELAY_MS);
  return [...MOCK_THEMES];
}
