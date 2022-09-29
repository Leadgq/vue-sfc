<template>
  <div class="content">
    <div class="nav">
      <div v-for="(item,index) in stackItem " :key="index" class="nav-item" @click="backViewType(index)">
        <span>{{ item.name }}</span>
        <span class="row"> > </span>
      </div>
    </div>
    <div id="map"></div>
  </div>
</template>

<script setup lang="ts">
import {changeMapView, drawCityMakers, drawDistrictMaker, loadMap, removePolyline} from "@/tools/amap";
import {loadFile} from "@/tools/lib";
import {ElMessage} from 'element-plus'
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
  const {viewCityCode, viewType, name} = stackItem[index];
  handlerViewType(viewType, viewCityCode, name);
  stackItem.splice(index + 1, stackItem.length - 1);
  removePolyline();
};
// 加载数据
const loadData = async () => {
  // 匹配数据
  const result = await loadFile('AQYD') as Record<string, {
    cityList: any[],
    projectList: any[],
  }>;
  const {viewCityCode} = currentViewType;
  let data = result[viewCityCode];
  // 如果匹配到
  if (data) {
    if (currentViewType.viewType === 'district') {
      let districtData = handlerDistrictData(data.projectList);
      drawDistrictMaker(districtData, currentViewType.viewType, currentViewType.viewCityCode);
    } else {
      drawCityMakers(data.cityList, currentViewType.viewType, currentViewType.viewCityCode)
    }
  } else {
    ElMessage.error('当前区域暂无数据')
  }
}
// 处理区级数据
const handlerDistrictData = (list: any[]) => {
  return (list || []).map((item: any) => {
    return {
      ...item,
      center: [item.longitude, item.latitude],
      cityName: item?.name,
      level: 'district'
    };
  }).filter((item: { longitude: string, latitude: string }) => filterData(item.longitude, item.latitude))
}
const filterData = (longitude: string, latitude: string) => {
  return longitude && latitude && latitude !== '0' && longitude !== '0'
}
onMounted(async () => {
  // 加载地图
  await loadMap({
    contraction: "map",
    viewType: currentViewType.viewType,
    viewCityCode: currentViewType.viewCityCode,
    toViewType,
  });
  // 默认放入
  stackItem.push({...currentViewType});
  // 加载数据
  await loadData();
});
</script>
<style lang="scss" scoped>
.content {
  @apply w-full h-full  relative;
  .nav {
    @apply absolute left-10 top-10 z-10 text-white flex;
    .nav-item {
      @apply cursor-pointer;
      &:last-of-type {
        .row {
          @apply hidden ;
        }
      }
    }
  }

  #map {
    @apply w-full h-full absolute;
    &:deep(.city-marker) {
      @apply w-[64px] flex flex-col justify-center  items-center;
      .city-name {
        @apply text-white text-[16px]  whitespace-nowrap;
      }

      .city-marker-img {
        background: url("@/assets/maker/icon_city_marker.png");
        @apply w-[20px] h-[25px] object-cover bg-center bg-top bg-cover;
      }
    }

    &:deep(.city-info-window) {
      background: rgba(3, 2, 19, 0.8500);
      box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.1000);
      @apply flex flex-col  p-[16px]  rounded-[6px];
      .info-window-name {
        @apply text-[18px] text-white;
      }
    }

    &:deep( .point) {
      background-image: url("@/assets/maker/ponit.png");
      @apply bg-cover;
    }
  }

}
</style>
