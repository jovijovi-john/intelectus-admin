import { isMockApi } from "@/shared/config/api-mode";
import type { Category } from "./category.types";
import { listCategoriesHttp } from "./categories.http";
import { listCategoriesMock } from "./categories.mock";

export async function listCategories(): Promise<Category[]> {
  if (isMockApi()) {
    return listCategoriesMock();
  }
  return listCategoriesHttp();
}
