import { useQuery } from "@tanstack/react-query";
import { themesKeys } from "./themes.keys";
import { listThemes } from "./themes.repository";

export function useThemes() {
  return useQuery({
    queryKey: themesKeys.list(),
    queryFn: listThemes,
  });
}
