import { isMockApi } from "@/shared/config/api-mode";
import { listUsersHttp } from "./users.http";
import { listUsersMock } from "./users.mock";
import type { User } from "./user.types";

export async function listUsers(): Promise<User[]> {
  if (isMockApi()) {
    return listUsersMock();
  }
  return listUsersHttp();
}
