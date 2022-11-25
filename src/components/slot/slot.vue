<template>
  <div class="slot-container">
    <h3 class="font-bold">动态插槽</h3>
    <dynamic>
      <template #[distance]="{ slot }">我要渲染的地方是{{ distance }} {{ slot }}</template>
    </dynamic>
    <el-button @click="modifySlot">修改插槽渲染位置</el-button>
    <hr />
    <!--具名插槽-->
    <dynamic>
      <template #header>我要渲染在头部</template>
    </dynamic>
    <div class="w-[600px] h-[300px] bg-red-400">
      <table-safe></table-safe>
    </div>
  </div>
</template>

<script setup lang="ts">
import TableSafe from "@/components/slot/table-safe.vue";

let distance = ref("header");
const modifySlot = () => distance.value = distance.value === "header" ? "main" : "header";
</script>

<script lang="ts">
export default {
  name: "dynamic"
};
</script>

<style scoped lang="scss">
.slot-container {
  @apply h-full w-full bg-violet-200;
}
</style>
