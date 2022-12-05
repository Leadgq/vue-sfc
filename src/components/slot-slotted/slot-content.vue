<template>
  <div>
    <slot name="header"></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "slot-content"
};
</script>

<style lang="scss" scoped>
.common {
  @apply text-sm w-[200px]  h-[200px]
}

:slotted(.label) {
  @extend .common;
  @apply bg-white ;
}

:global(.globalStyle) {
  @extend .common;
  @apply bg-red-700 ;
}
</style>
