import { useQuery } from "@tanstack/react-query";
import { listSubthemes } from "./subthemes.repository";
import { subthemesKeys } from "./subthemes.keys";

export function useSubthemes() {
  return useQuery({
    queryKey: subthemesKeys.list(),
    queryFn: listSubthemes,
  });
}
