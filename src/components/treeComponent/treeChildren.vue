<template>
  <div class="tree">
    <ul>
      <li v-for="item in  data" :key="item.key">
        <el-checkbox v-model="item.check" @change="selectNode(data,item)">{{ item.title }}</el-checkbox>
        <treeChildren :data="item.children" v-if="isAvailableArray(item.children)"/>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {TreeData} from "@/types/tree"
import {findTreeChildrenNode, isAvailableArray} from "@/tools/lib";

defineProps<{ data: TreeData[] }>()

const selectNode = (TreeData: TreeData[], item: TreeData) => {
  if (item.children && item.check) {
    const data = findTreeChildrenNode(TreeData, item.key);
    data.forEach(item => item.check = true)
  }
}
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
