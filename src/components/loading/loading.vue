<template>
  <div
    v-if="showOrHidden"
    class="absolute top-0 bottom-0 z-40 w-full h-full bg flex items-center justify-center"
  >
    <div class="text-white">loading...</div>
  </div>
</template>

<script setup lang="ts">
let showOrHidden = ref(false);
const hidden = () => {
  showOrHidden.value = false;
};
const show = () => {
  showOrHidden.value = true;
};
watch(
  () => showOrHidden.value,
  (newState: Boolean) => {
    newState
      ? document.body.classList.add("my-hidden")
      : document.body.classList.remove("my-hidden");
  }
);
defineExpose({
  show,
  hidden,
  showOrHidden,
});
</script>

<style lang="scss">
.bg {
  background-color: rgba(0, 0, 0, 0.5);
}
.my-hidden {
  overflow: hidden;
}
</style>
