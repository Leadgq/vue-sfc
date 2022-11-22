<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
import AMapLoader from "@amap/amap-jsapi-loader";
let map = ref<any>(null);
let object3DLayer = ref(null);


const loadMap = async () => {
  let mapInstance = await AMapLoader.load({
    key: "25e637a0837409eea0e77712608426b4",
    version: "1.4.15",
    plugins: ["DistrictSearch", "MarkerClusterer", "DistrictLayer", "MarkerClusterer"],
  });
  map.value = new mapInstance.Map("container", {
    resizeEnable: true,
    center:[105.602725,37.076636], //中心点坐标
    viewMode: "3D", //使用3D视图
    zoom: 7.62,
    zooms: [3, 18]
  });
  object3DLayer = new AMap.Object3DLayer({ zIndex: -1 });
  map.value.add(object3DLayer);
};
</script>

<style lang="scss" scoped>
#container {
  @apply w-full h-full;
}
</style>
