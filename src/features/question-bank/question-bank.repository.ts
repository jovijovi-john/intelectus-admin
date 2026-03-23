import { isMockApi } from "@/shared/config/api-mode";
import { listQuestionBankHttp } from "./question-bank.http";
import { listQuestionBankMock } from "./question-bank.mock";
import type { QuestionBankItem } from "./question-bank.types";

export async function listQuestionBank(): Promise<QuestionBankItem[]> {
  if (isMockApi()) {
    return listQuestionBankMock();
  }
  return listQuestionBankHttp();
}
