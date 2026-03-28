import { httpClient } from "@/shared/api/http-client";
import type { Subtheme } from "./subtheme.types";

/** Real API: GET /subthemes — adjust path/shape when backend exists. */
export async function listSubthemesHttp(): Promise<Subtheme[]> {
  return httpClient.get<Subtheme[]>("/subthemes");
}
