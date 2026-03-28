import { isMockApi } from "@/shared/config/api-mode";
import type { Subtheme } from "./subtheme.types";
import { listSubthemesHttp } from "./subthemes.http";
import { listSubthemesMock } from "./subthemes.mock";

export async function listSubthemes(): Promise<Subtheme[]> {
  if (isMockApi()) {
    return listSubthemesMock();
  }
  return listSubthemesHttp();
}
