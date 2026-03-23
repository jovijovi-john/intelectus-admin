import { isMockApi } from "@/shared/config/api-mode";
import { listThemesHttp } from "./themes.http";
import { listThemesMock } from "./themes.mock";
import type { Theme } from "./theme.types";

export async function listThemes(): Promise<Theme[]> {
  if (isMockApi()) {
    return listThemesMock();
  }
  return listThemesHttp();
}
