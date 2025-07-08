// src/utils/breadcrumb.ts
import { topDomains, subDomains } from "@/data/satData";

/** subDomainId(예: "algebra") 로 상위 Top-Domain 객체(Math, Reading-Writing 등) 찾기 */
export function getTopDomainBySubId(subId: string) {
  return topDomains.find((td) => td.subDomains.includes(subId));
}

/** skillId(예: "linear-functions") 로 Top-Domain 찾기 */
export function getTopDomainBySkillId(skillId: string) {
  // skillId → subDomainId
  const subEntry = Object.values(subDomains).find((sd) =>
    sd.skills.some((s) => s.id === skillId)
  );
  return subEntry ? getTopDomainBySubId(subEntry.id) : undefined;
}
