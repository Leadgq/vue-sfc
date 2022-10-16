<template>
  <div v-for="fatherItem in treeData" :key="fatherItem.key">
    <el-checkbox
      v-model="fatherItem.check"
      :indeterminate="fatherItem.indeterminate"
      @input="handlerNodeAction(fatherItem)"
    >
      {{ fatherItem.title }}</el-checkbox
    >
    <div v-for="cItem in fatherItem.children" :key="cItem.key" class="px-4">
      <el-checkbox
        v-model="cItem.check"
        :indeterminate="cItem.indeterminate"
        @input="handlerNodeAction(cItem, 'father')"
      >
        {{ cItem.title }}</el-checkbox
      >
      <div v-for="sonItem in cItem.children" :key="sonItem.key" class="px-4">
        <el-checkbox v-model="sonItem.check" @input="handlerNodeAction(sonItem, 'son')">{{
          sonItem.title
        }}</el-checkbox>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TreeData } from "@/types/tree";
import { findParentNode, findTreeChildrenNode } from "@/tools/tree/treeLib";
const props = defineProps<{
  data: TreeData[];
}>();
const treeData = ref<TreeData[]>();
watch(
  () => props.data,
  (newTreeData) => {
    treeData.value = newTreeData;
  }
);
const handlerNodeAction = (item: TreeData, message?: string) => {
  if (message === "son") {
    setTimeout(() => handlerSonTreeNode(item), 0);
  } else if (message === "father") {
    // 处理所有子节点
    setTimeout(() => handlerRootNode(item), 0);
    // 处理自己的父节点状态
    setTimeout(() => handlerSonTreeNode(item), 0);
  } else {
    // 根节点决定子节点状态
    setTimeout(() => handlerRootNode(item), 0);
  }
};
const handlerRootNode = (item: TreeData) => {
  const children = findTreeChildrenNode(treeData.value!, item.key, true);
  modifyChildrenNode(item, children);
};

// 修改子节点的状态，父节点为true 所有为true,反之亦然
const modifyChildrenNode = (item: TreeData, children: TreeData[]) => {
  children.forEach((tree) => (tree.check = item.check));
};

// 子节点决定父节点状态
const handlerSonTreeNode = (item: TreeData) => {
  // 寻找当前节点的父节点
  let parentNode = findParentNode(treeData.value!, item.key, true, true).at(0);
  if (parentNode) {
    // 当前节点的所有子节点
    const childrenNode = findTreeChildrenNode(treeData.value!, parentNode.key, true);
    // 子节点都选中的状态
    const state = childrenNode.every((tree) => tree.check === true);
    // 子节点部分选中
    const indeterminateState = childrenNode.some((tree) => tree.check === true);
    // 如果部分选中
    if (indeterminateState) {
      parentNode.check = false;
      parentNode.indeterminate = true;
    }
    // 如果全部选中
    if (state) {
      parentNode.check = true;
      parentNode.indeterminate = false;
    }
    // 都不选中
    if (!state && !indeterminateState) {
      parentNode.check = false;
      parentNode.indeterminate = false;
    }
  }
};
</script>

<script lang="ts">
export default {
  name: "treeOption",
};
</script>

<style lang="scss" scoped></style>
