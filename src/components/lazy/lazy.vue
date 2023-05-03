<template>
  <div>
    <img width="375" height="550" v-for="item in imageList" v-lazy="item" />
  </div>
</template>

<script setup lang="ts">
let imageList = ref<any[]>([]);
const globImage = import.meta.glob("../../assets/image/girls/*.jpeg", { eager: true });
imageList.value = Object.values(globImage).map((item: any) => item.default);
</script>
