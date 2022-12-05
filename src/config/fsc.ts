import { sfc } from "@/types/sfc";
// 试验场配置
const sfcConfigList: sfc[] = [];

export const loadModule = async () => {
  const module = import.meta.glob("@/components/**/desc.ts");
  for (const [_, value] of Object.entries(module)) {
    const result = await value() as Record<string, any>;
    sfcConfigList.push(result?.default);
    if (sfcConfigList.length > 0) {
      sfcConfigList.sort((a, b) => a.id - b.id);
    }
  }
  return sfcConfigList;
};
