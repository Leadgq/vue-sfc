<template>
  <div class="content">
    <div class="chart-left"></div>
    <div class="chart-right"></div>
    <div id="map"></div>
  </div>
</template>

<script setup lang="ts">
import {changeMapView, drawCityMakers, drawDistrictMaker, loadMap} from "@/tools/amap";
import {loadFile} from "@/tools/lib";
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
let stackItem: viewTypes[] = $ref([]);
// 调整向下视角
const toViewType = (viewType?: string, viewCityCode?: string, cityName?: string) => {
  if (viewType && viewCityCode && cityName) {
    handlerViewType(viewType, viewCityCode, cityName);
    stackItem.push({...currentViewType});
  }
};
//公共行为
const handlerViewType = async (viewType: string, viewCityCode: string, cityName: string) => {
  currentViewType.viewType = viewType;
  currentViewType.viewCityCode = viewCityCode;
  currentViewType.name = cityName;
  changeMapView(viewType, viewCityCode);
  await loadData();
};
// 返回视角
const backViewType = (index: number) => {
  // 如果点击的是最后一个
  if (index === stackItem.length - 1) return;
  let stackItemObject = stackItem[index];
  if (stackItemObject) {
    const {viewCityCode, viewType, name} = stackItemObject;
    handlerViewType(viewType, viewCityCode, name);
    stackItem.splice(index + 1, stackItem.length - 1);
  }
};
// 加载数据
const loadData = async () => {
  const result = await loadFile() as Record<string, {
    cityList: any[],
    projectList: any[],
  }>;
  const {viewCityCode} = currentViewType;
  let data = result[viewCityCode];
  if (data) {
    if (currentViewType.viewType === 'district') {
      let districtData = handlerDistrictData(data.projectList);
      drawDistrictMaker(districtData, currentViewType.viewType, currentViewType.viewCityCode);
    } else {
      drawCityMakers(data.cityList, currentViewType.viewType, currentViewType.viewCityCode)
    }
  }
}

const handlerDistrictData = (list: any[]) => {
  return (list || []).map((item: any) => {
    return {
      ...item,
      center: [item.longitude, item.latitude],
      cityName: item?.name,
      level: 'district'
    };
  }).filter((item: any) => item.longitude && item.latitude && item.longitude !== '0' && item.latitude !== '0')
}
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
  stackItem.push({...currentViewType});
  await loadData();
});
</script>
<style lang="scss" scoped>
.content {
  @apply w-full h-full  relative;
  #map {
    @apply w-full h-full absolute;
    &:deep(.city-marker) {
      @apply w-[64px] flex flex-col justify-center  items-center;
      .city-name {
        @apply text-white text-[16px]  whitespace-nowrap;
      }

      .city-marker-img {
        background-image: url("../assets/maker/icon_city_marker.png");
        @apply w-[20px] h-[25px] object-cover bg-center bg-top bg-cover;
      }
    }

    &:deep( .point) {
      background-image: url("../assets/maker/ponit.png");
      background-size: 100% auto;
    }
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
