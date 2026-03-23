import { isMockApi } from "@/shared/config/api-mode";
import type { Question } from "./question.types";
import { listQuestionsHttp } from "./questions.http";
import { listQuestionsMock } from "./questions.mock";

export async function listQuestions(): Promise<Question[]> {
  if (isMockApi()) {
    return listQuestionsMock();
  }
  return listQuestionsHttp();
}
