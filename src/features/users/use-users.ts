import { useQuery } from "@tanstack/react-query";
import { usersKeys } from "./users.keys";
import { listUsers } from "./users.repository";

export function useUsers() {
  return useQuery({
    queryKey: usersKeys.list(),
    queryFn: listUsers,
  });
}
