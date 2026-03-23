export const categoriesKeys = {
  all: ["categories"] as const,
  list: () => [...categoriesKeys.all, "list"] as const,
};
