<template>
  <div class="tree">
    <el-tree
      ref="treeRef"
      :data="tree"
      show-checkbox
      default-expand-all
      node-key="key"
      highlight-current
      :props="{ label: 'title'}"
    />
  </div>
</template>
<script setup lang="ts">
import { TreeData } from "@/types/tree";

const props = defineProps<{
  data: TreeData[],
}>();
let tree = ref<TreeData[]>(props.data);
</script>

<script lang="ts">
export default {
  name: "treeChildren"
};
</script>

<style lang="scss" scoped>
.tree {
  @apply w-[600px];
  ul {
    @apply w-full h-full px-[10px];
  }
}
</style>
