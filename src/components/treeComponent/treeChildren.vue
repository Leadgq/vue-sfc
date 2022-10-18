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
    <div>{{ testValue }}</div>
    <el-button @click="modifyValue">同步修改</el-button>
  </div>
</template>
<script setup lang="ts">
import {TreeData} from "@/types/tree";

const props = defineProps<{
  data: TreeData[],
  testValue: string
}>()
let tree = ref<TreeData[]>(props.data);
let contentValue = ref(props.testValue);
const emit = defineEmits<{
  (e: 'checkEdTree', ids: string[]): void,
  (e: 'update:testValue', value: string): void
}>()
const modifyValue = () => {
  contentValue.value = 'hhhh';
  emit('update:testValue', contentValue.value)
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
