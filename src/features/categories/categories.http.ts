import { httpClient } from "@/shared/api/http-client";
import type { Category } from "./category.types";

/** Real API: GET /categories — adjust path/shape when backend exists. */
export async function listCategoriesHttp(): Promise<Category[]> {
  return httpClient.get<Category[]>("/categories");
}
