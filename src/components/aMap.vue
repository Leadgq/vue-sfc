<template>
  <div class="content">
    <div class="chart-left"></div>
    <div class="chart-right"></div>
    <div id="map"></div>
  </div>
</template>

<script setup lang="ts">
import {loadMap} from "@/tools/amap";

const toViewType = () => {
}
// province  210000
// city  210200
// district 210298
onMounted(async () => {
  await loadMap({contraction: 'map', viewType: 'district', viewCityCode: '210298', toViewType});
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
    @apply left-0 ;
  }

  .chart-right {
    @extend .common;
    @apply right-0;
  }
}
</style>
