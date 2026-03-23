import { httpClient } from "@/shared/api/http-client";
import type { Theme } from "./theme.types";

/** Real API: GET /themes — adjust path/shape when backend exists. */
export async function listThemesHttp(): Promise<Theme[]> {
  return httpClient.get<Theme[]>("/themes");
}
