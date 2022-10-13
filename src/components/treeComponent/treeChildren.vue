<template>
  <div class="tree">
    <el-tree
        ref="treeRef"
        :data="data"
        show-checkbox
        default-expand-all
        node-key="key"
        highlight-current
        :props="{ label: 'title'}"
    />
  </div>
</template>
<script setup lang="ts">
import {TreeData} from "@/types/tree";

const props = defineProps<{
  data: TreeData[]
}>()
const nodeTree = ref<TreeData[]>();
watch(() => props.data, (newTreeData: TreeData[]) => {
  nodeTree.value = newTreeData;
})
const emit = defineEmits<{
  (e: 'checkEdTree', ids: string[]): void
}>()
const treeRef = ref<any>()
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
