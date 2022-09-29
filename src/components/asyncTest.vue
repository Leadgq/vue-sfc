<template>
  <div class="test">
    <div class="header">
      <slot name="header" :headerProps="'头部区域插槽返回'"></slot>
    </div>
    <div class="main">
      <slot name="main" :headerProps="'中间区域插槽返回'"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.test {
  @apply w-[350px];
  .header {
    @apply bg-red-200;
  }
  .main{
    @apply bg-red-400;
  }
}

</style>
