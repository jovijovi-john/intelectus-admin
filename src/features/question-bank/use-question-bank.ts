import { useQuery } from "@tanstack/react-query";
import { questionBankKeys } from "./question-bank.keys";
import { listQuestionBank } from "./question-bank.repository";

export function useQuestionBank() {
  return useQuery({
    queryKey: questionBankKeys.list(),
    queryFn: listQuestionBank,
  });
}
