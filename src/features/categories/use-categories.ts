import { useQuery } from "@tanstack/react-query";

import { categoriesKeys } from "./categories.keys";
import { listCategories } from "./categories.repository";

export function useCategories() {
  return useQuery({
    queryKey: categoriesKeys.list(),
    queryFn: listCategories,
  });
}
