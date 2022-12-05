import { sfc } from "@/types/sfc";
// 试验场配置
const sfcConfigList: sfc[] = [];

export const loadModule = async () => {
  const module = import.meta.glob("@/components/**/desc.ts");
  for (const [_, value] of Object.entries(module)) {
    const result = await value() as Record<string, any>;
    // 如果是已经加载过的模块排除
    if (sfcConfigList.find(item => item.id === result?.default.id)) break;
    sfcConfigList.push(result?.default);
    // 排序
    sfcConfigList.sort((a, b) => a.id - b.id);
  }
  return sfcConfigList;
};
