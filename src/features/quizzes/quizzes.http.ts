import { httpClient } from "@/shared/api/http-client";
import type { Quiz } from "./quiz.types";

/** Real API: GET /quizzes — adjust path/shape when backend exists. */
export async function listQuizzesHttp(): Promise<Quiz[]> {
  return httpClient.get<Quiz[]>("/quizzes");
}
