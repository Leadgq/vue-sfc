<template>
  <div class="async">
    <router-view #default="{route,Component}">
      <transition :enter-active-class="`animate__animated ${route.meta?.transitionEnter}`"
                  :leave-active-class="`animate__animated ${route.meta?.transitionLeave}`"
                  :appear="true"
      >
        <component :is="Component"/>
      </transition>
    </router-view>
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
