import { httpClient } from "@/shared/api/http-client";
import type { Question } from "./question.types";

/** Real API: GET /questions — adjust path/shape when backend exists. */
export async function listQuestionsHttp(): Promise<Question[]> {
  return httpClient.get<Question[]>("/questions");
}
