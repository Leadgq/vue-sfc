<template>
  <div>
    <TreeOption :data="treeData" value="15" class="w-[600px]" :show-check="showCheck"/>
    <el-button @click="selectAllCheckTree">选择树</el-button>
  </div>
</template>

<script setup lang="ts">
import { TreeData } from "@/types/tree";
import { useEventBus } from "@vueuse/core";
import TreeOption from "@/components/treeComponent/treeOption.vue";
import { findTreeChildrenNode, findTreeParentNode, flattenArray } from "@/tools/tree/treeLib";
import { isAvailableArray } from "@/tools/lib";
import { ElMessage } from "element-plus";
import { Ref ,unref } from "vue"

const props = defineProps<{
  data: TreeData[];
  defaultKey?: string[] | number[] | Ref<string[] | number[]>,
  showCheck?:boolean
}>();
const bus = useEventBus<TreeData>("changeTree");
const treeData = ref<TreeData[]>([]);
// 初始化事件中转站、接受子组件的值
const unsubscribe = bus.on((item) => handlerNodeAction(item));
// 销毁
onUnmounted(() => unsubscribe());

// 格式化树
const InitTreeData = (TreeData: TreeData[], key?: string): TreeData[] => {
  return TreeData.map((item) => {
    return {
      ...item,
      showCheck : props.showCheck ? true: false,
      parentId: key ? key : undefined,
      children: isAvailableArray(item.children) ? InitTreeData(item.children, item.key) : []
    };
  });
};
watchEffect(() => treeData.value = InitTreeData(props.data), { flush: "post" });

watch(
  () => props.defaultKey,
  () => {
    if (props.defaultKey && isAvailableArray(props.defaultKey)) handlerTreeInvert(unref(props.defaultKey));
  },
  { flush: "post" }
);

// 处理反选
const handlerTreeInvert = (key: string[] | number[]) => {
  const nodeAll = flattenArray(treeData.value, true);
  key.forEach(item => {
    let tree = nodeAll.find(tree => tree.key === item);
    if (tree) {
      tree.check = true;
      handlerNodeAction(tree);
    }
  });
};
// 节点处理
const handlerNodeAction = (item: TreeData) => {
  if (!isAvailableArray(item.children) && item.parentId) {
    // 处理自己的父节点状态
    handlerParentTreeNodeState(item);
  } else if (item.parentId && isAvailableArray(item.children)) {
    // 处理子节点
    handlerAllChildrenNode(item);
    // 处理自己的父节点状态
    handlerParentTreeNodeState(item);
  } else if (!item.parentId) {
    // 处理子节点
    handlerAllChildrenNode(item);
  }
};
// 处理子节点
const handlerAllChildrenNode = (item: TreeData) => {
  // 只要点击去掉半选状态
  item.indeterminate = false;
  // 当前节点下所有子节点
  const children = findTreeChildrenNode(treeData.value, item.key, true);
  // 修改子节点的状态，父节点为true 所有为true,反之亦然
  children.forEach(tree => tree.check = item.check);
};
// 子节点决定父节点状态
const handlerParentTreeNodeState = (item: TreeData) => {
  // 寻找当前节点的所有父节点
  let parentNodes = findTreeParentNode(treeData.value, item.key, true, false);
  if (isAvailableArray(parentNodes)) parentNodes.forEach(item => handlerCommonAction(item));
};
const handlerCommonAction = (parentNode: TreeData) => {
  // 当前节点的所有子节点
  const childrenNode = findTreeChildrenNode(treeData.value, parentNode.key, true);
  // 子节点都选中的状态
  const state = childrenNode.every(tree => tree.check);
  // 子节点部分选中
  const indeterminateState = childrenNode.some(tree => tree.check);
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
  if (props.showCheck) {
    returnCheckNode();
  } else { 
    ElMessage({
      type: "error",
      message: `当前没有节点可选择`
    });
  }
};

const returnCheckNode = () => { 
  const checkedNode = flattenArray(treeData.value, false).filter(item => item.check).map(item => item.key).toString();
    ElMessage({
      type: "success",
      message: `你选择的节点${checkedNode}`
    });
}

</script>

<script lang="ts">
export default {
  name: "treeFather"
};
</script>
