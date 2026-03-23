import { httpClient } from "@/shared/api/http-client";
import type { QuestionBankItem } from "./question-bank.types";

/** Real API: GET /question-bank — adjust path/shape when backend exists. */
export async function listQuestionBankHttp(): Promise<QuestionBankItem[]> {
  return httpClient.get<QuestionBankItem[]>("/question-bank");
}
