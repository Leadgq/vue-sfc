import { sfc } from "@/types/sfc";

export default {
  id: 8,
  name: "自动更新",
  componentName: "Modifier",
  desc: `测试组件的<span style="color: red">v-model:value</span>、
        自动更新外界的值、修饰符(这类似于<span style="color: red;">.trim .lazy</span>>)、
        使用<i style="color: yellowgreen">withDefaults</i>提供默认值(这个方式支持ts)`
} as sfc;
