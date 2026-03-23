import { useQuery } from "@tanstack/react-query";

import { questionsKeys } from "./questions.keys";
import { listQuestions } from "./questions.repository";

export function useQuestions() {
  return useQuery({
    queryKey: questionsKeys.list(),
    queryFn: listQuestions,
  });
}
