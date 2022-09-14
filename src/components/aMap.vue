<template>
  <div class="content">
    <div class="chart-left"></div>
    <div class="chart-right"></div>
    <div id="map"></div>
  </div>
</template>

<script setup lang="ts">
import { loadMap } from "@/tools/amap";

onMounted(async () => {
  await loadMap("map", "辽宁", "province");
});
</script>
<style lang="scss" scoped>
.content {
  @apply w-full h-full  relative;
  #map {
    @apply w-full h-full relative;
  }
  .common {
    @apply absolute w-[25%] h-full  z-10 top-0;
  }
  .chart-left {
    @extend .common;
    @apply left-0 ;
  }

  .chart-right {
    @extend .common;
    @apply right-0;
  }
}
</style>
