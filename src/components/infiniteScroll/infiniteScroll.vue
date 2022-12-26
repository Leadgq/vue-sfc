<template>
  <div class="w-full h-full bg-violet-200">
    <ul class="w-[300px] h-[200px] overflow-y-auto" v-scroll="load" :infiniteScrollDisabled="true">
      <li v-for="(item,index) in testValue" :key="index"
          class="w-full  h-[40px] bg-blue-300 mb-3 text-center flex  items-center justify-center text-white">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import {randomMax} from "@/tools/lib";

let testValue = ref<number[]>([]);
const load = async () => {
  const list = await loadMore();
  testValue.value.push(...list)
}
const loadMore = (): Promise<number[]> => {
  let list: number[] = [];
  return new Promise((resolve) => {
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        list.push(randomMax(5, 10));
      }
      resolve(list);
    }, 1000);
  });
};
</script>
<script lang="ts">
export default {
  name: "infiniteScroll"
}
</script>

<style scoped>

</style>
