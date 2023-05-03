<template>
  <div>
    <img width="375" height="550" v-for="item in imageList" v-lazy="item" />
  </div>
</template>

<script setup lang="ts">
type imageDefault = {
  default: string;
};
let imageList = ref<string[]>([]);
const globImage: Record<
  string,
  imageDefault
> = import.meta.glob("../../assets/image/girls/*.jpeg", { eager: true });
imageList.value = Object.values(globImage).map((item) => item.default);
</script>
