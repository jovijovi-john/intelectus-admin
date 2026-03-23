import { httpClient } from "@/shared/api/http-client";
import type { User } from "./user.types";

/** Real API: GET /users — adjust path/shape when backend exists. */
export async function listUsersHttp(): Promise<User[]> {
  return httpClient.get<User[]>("/users");
}
