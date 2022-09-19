<template>
  <div class="content">
    <div class="chart-left"></div>
    <div class="chart-right"></div>
    <div id="map"></div>
  </div>
</template>

<script setup lang="ts">
import { loadMap, changeMapView } from "@/tools/amap";
// 地图类型
type viewTypes = {
  viewType: string;
  viewCityCode: string;
  name: string;
};
let currentViewType = reactive<viewTypes>({
  viewType: "province",
  viewCityCode: "210000",
  name: "辽宁省",
});
// 视角站
let stackItem: viewTypes[] = [];
// 调整向下视角
const toViewType = (viewType?: string, viewCityCode?: string, cityName?: string) => {
  if (viewType && viewCityCode && cityName) {
    handlerViewType(viewType, viewCityCode, cityName);
  }
};
//公共行为
const handlerViewType = (viewType: string, viewCityCode: string, cityName: string) => {
  currentViewType.viewType = viewType;
  currentViewType.viewCityCode = viewCityCode;
  currentViewType.name = cityName;
  changeMapView(viewType, viewCityCode);
};
// 返回视角
const backViewType = (index: number) => {
  let stackItemObject = stackItem[index];
  if (stackItemObject) {
    const { viewCityCode, viewType, name } = stackItemObject;
    handlerViewType(viewType, viewCityCode, name);
    stackItem.slice(index + 1, stackItem.length - 1);
  }
};
// province  210000
// city  210200
// district 210298
onMounted(async () => {
  await loadMap({
    contraction: "map",
    viewType: currentViewType.viewType,
    viewCityCode: currentViewType.viewCityCode,
    toViewType,
  });
  stackItem.push(currentViewType);
});
</script>
<style lang="scss" scoped>
.content {
  @apply w-full h-full  relative;
  #map {
    @apply w-full h-full absolute;
  }

  .common {
    @apply absolute w-[20%] h-full  z-10 top-0;
  }

  .chart-left {
    @extend .common;
    @apply left-0;
  }

  .chart-right {
    @extend .common;
    @apply right-0;
  }
}
</style>
