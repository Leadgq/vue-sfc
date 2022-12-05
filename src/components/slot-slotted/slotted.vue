<template>
  <div class="w-full h-full bg-violet-200">
    <slot-content>
      <template #header>
        <div class="label">插槽内容自定义样式</div>
      </template>
    </slot-content>
    <div class="globalStyle">全局定义样式</div>
    <div :class="slotted.active">模块样式</div>
  </div>
</template>
<script setup lang="ts">
import SlotContent from "@/components/slot-slotted/slot-content.vue";</script>
<script lang="ts">
export default {
  name: "slotted"
};
</script>

<style module="slotted">
.active {
  @apply bg-blue-300  border w-[200px]  h-[200px] text-sm text-white;
}
</style>
