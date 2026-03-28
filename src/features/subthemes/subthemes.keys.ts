export const subthemesKeys = {
  all: ["subthemes"] as const,
  list: () => [...subthemesKeys.all, "list"] as const,
};
