<template>
  <div class="async">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
</script>
<script lang="ts">
export default {
  name: "async",
};
</script>
<style lang="scss" scoped>
.async {
  @apply h-full bg-violet-200;
}
</style>
