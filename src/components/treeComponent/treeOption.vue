<template>
  <div>
    <div v-for="fatherItem in treeData" :key="fatherItem.key">
      <el-checkbox
          v-model="fatherItem.check"
          :indeterminate="fatherItem.indeterminate"
          @change="handlerNodeAction(fatherItem)"
      >
        {{ fatherItem.title }}
      </el-checkbox
      >
      <div v-for="cItem in fatherItem.children" :key="cItem.key" class="px-4">
        <el-checkbox
            v-model="cItem.check"
            :indeterminate="cItem.indeterminate"
            @change="handlerNodeAction(cItem, 'father')"
        >
          {{ cItem.title }}
        </el-checkbox
        >
        <div v-for="sonItem in cItem.children" :key="sonItem.key" class="px-4">
          <el-checkbox
              v-model="sonItem.check"
              @change="handlerNodeAction(sonItem, 'son')"
          >{{ sonItem.title }}
          </el-checkbox
          >
        </div>
      </div>
    </div>
    <el-button @click="selectAllCheckTree">选择树</el-button>
  </div>
</template>

<script setup lang="ts">
import {TreeData} from "@/types/tree";
import {findParentNode, findTreeChildrenNode, flattenArray} from "@/tools/tree/treeLib";
import {ElMessage} from 'element-plus'

const props = defineProps<{
  data: TreeData[];
}>();
const treeData = computed(() => props.data);
const handlerNodeAction = (item: TreeData, message?: string) => {
  nextTick(() => {
    if (message === "son") {
      // 处理自己的父节点状态
      handlerParentTreeNodeState(item, message);
    } else if (message === "father") {
      // 处理子节点
      handlerAllChildrenNode(item);
      // 处理自己的父节点状态
      handlerParentTreeNodeState(item, message);
    } else {
      // 处理子节点
      handlerAllChildrenNode(item);
    }
  })
};
// 处理子节点
const handlerAllChildrenNode = (item: TreeData) => {
  const children = findTreeChildrenNode(treeData.value, item.key, true);
  modifyChildrenNode(item, children);
};
// 修改子节点的状态，父节点为true 所有为true,反之亦然
const modifyChildrenNode = (item: TreeData, children: TreeData[]) => {
  // 只要点击去掉半选状态
  item.indeterminate = false;
  children.forEach((tree) => tree.check = item.check);
};
// 子节点决定父节点状态
const handlerParentTreeNodeState = (item: TreeData, message: string) => {
  // 寻找当前节点的父节点
  let parentNode = findParentNode(treeData.value, item.key, true, true).at(0);
  if (parentNode) {
    handlerCommon(parentNode);
    if (message === 'son') {
      // 当处于孙子节点，去寻找根节点
      checkParentNodeState(item);
    }
  }
};
const checkParentNodeState = (item: TreeData) => {
  // 寻找当前节点的根节点
  let rootNode = findParentNode(treeData.value, item.key, true, false).at(-1);
  if (rootNode) {
    handlerCommon(rootNode);
  }
};
const handlerCommon = (parentNode: TreeData) => {
  // 当前节点的所有子节点
  const childrenNode = findTreeChildrenNode(treeData.value, parentNode.key, true);
  // 子节点都选中的状态
  const state = childrenNode.every((tree) => tree.check);
  // 子节点部分选中
  const indeterminateState = childrenNode.some((tree) => tree.check);
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
};
const selectAllCheckTree = () => {
  const checkedNode = flattenArray(treeData.value, false).filter((item) => item.check).map((item) => item.key).toString();
  ElMessage({
    type: 'success',
    message: `你选择的节点${checkedNode}`
  })
};
</script>

<script lang="ts">
export default {
  name: "treeOption",
};
</script>

<style lang="scss" scoped></style>
