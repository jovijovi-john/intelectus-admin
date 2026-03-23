export const questionsKeys = {
  all: ["questions"] as const,
  list: () => [...questionsKeys.all, "list"] as const,
};
