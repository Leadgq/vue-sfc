<template>
  <div class="tree">
    <ul>
      <li v-for="item in  data" :key="item.key">
        {{ item.title }}
        <treeChildren :data="item.children" v-if="isAvailableArray(item.children)"/>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {TreeData} from "@/types/tree"
import {isAvailableArray} from "@/tools/lib";
defineProps<{ data: TreeData[] }>()
</script>

<script lang="ts">
export default {
  name: "treeChildren"
}
</script>

<style lang="scss" scoped>
.tree {
  @apply w-[600px];
  ul {
    @apply w-full h-full px-[10px];
  }
}
</style>
