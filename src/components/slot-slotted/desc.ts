import { sfc } from "@/types/sfc";

export default {
  id: 9,
  name: "插槽样式",
  componentName: "slotted",
  desc: `插槽内部影响外部使用的样式、<i style="color: red">global</i>全局样式、模块样式<span style="color: red;font-weight: bold">(module主要解决jsx和tsx编写样式困难)</span>`
} as sfc;
