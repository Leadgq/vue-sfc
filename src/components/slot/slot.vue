<template>
  <div class="slot-container">
    <h3 class="font-bold">动态组件</h3>
    <dynamic>
      <template #[distance]="{ headerProps }">我要渲染的地方是{{ distance }} {{ headerProps }}</template>
    </dynamic>
    <el-button @click="modifySlot">修改插槽渲染位置</el-button>
    <hr />
  </div>
</template>

<script setup lang="ts">
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
