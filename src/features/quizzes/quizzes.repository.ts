import { isMockApi } from "@/shared/config/api-mode";
import type { Quiz } from "./quiz.types";
import { listQuizzesHttp } from "./quizzes.http";
import { listQuizzesMock } from "./quizzes.mock";

export async function listQuizzes(): Promise<Quiz[]> {
  if (isMockApi()) {
    return listQuizzesMock();
  }
  return listQuizzesHttp();
}
