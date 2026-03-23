/**
 * Use colocated key factories per feature (e.g. `users.keys.ts`).
 * Keep keys hierarchical so invalidation stays predictable:
 * `queryClient.invalidateQueries({ queryKey: usersKeys.all })`.
 */
export const appKeys = {
  root: ["app"] as const,
};
