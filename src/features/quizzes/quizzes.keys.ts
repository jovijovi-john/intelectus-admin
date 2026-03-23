export const quizzesKeys = {
  all: ["quizzes"] as const,
  list: () => [...quizzesKeys.all, "list"] as const,
};
