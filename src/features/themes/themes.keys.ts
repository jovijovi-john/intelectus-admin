export const themesKeys = {
  all: ["themes"] as const,
  list: () => [...themesKeys.all, "list"] as const,
};
