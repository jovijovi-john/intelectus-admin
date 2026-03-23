import { useQuery } from "@tanstack/react-query";

import { quizzesKeys } from "./quizzes.keys";
import { listQuizzes } from "./quizzes.repository";

export function useQuizzes() {
  return useQuery({
    queryKey: quizzesKeys.list(),
    queryFn: listQuizzes,
  });
}
