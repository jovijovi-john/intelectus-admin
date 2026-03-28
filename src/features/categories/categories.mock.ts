import { RESIDENCY_CATEGORIES } from "@/shared/data/anesthesiology-catalog";

import type { Category } from "./category.types";

const MOCK_DELAY_MS = 400;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function listCategoriesMock(): Promise<Category[]> {
  await delay(MOCK_DELAY_MS);
  return [...RESIDENCY_CATEGORIES];
}
