export const questionBankKeys = {
  all: ["question-bank"] as const,
  list: () => [...questionBankKeys.all, "list"] as const,
};
