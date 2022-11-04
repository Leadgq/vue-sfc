<template>
  <div class="w-[600px] bg-white mt-2 px-1">
    <div v-for="fatherItem in treeData" :key="fatherItem.key">
      <el-checkbox
          v-model="fatherItem.check"
          :indeterminate="fatherItem.indeterminate"
          @change="handlerNodeAction(fatherItem)"
      >
        {{ fatherItem.title }}
      </el-checkbox>
      <div v-for="cItem in fatherItem.children" :key="cItem.key" class="px-4">
        <el-checkbox
            v-model="cItem.check"
            :indeterminate="cItem.indeterminate"
            @change="handlerNodeAction(cItem)"
        >
          {{ cItem.title }}
        </el-checkbox>
        <div v-for="sonItem in cItem.children" :key="sonItem.key" class="px-4">
          <el-checkbox
              v-model="sonItem.check"
              @change="handlerNodeAction(sonItem)"
          >{{ sonItem.title }}
          </el-checkbox>
        </div>
      </div>
    </div>
    <el-button @click="selectAllCheckTree">选择树</el-button>
  </div>
</template>

<script setup lang="ts">
import {TreeData} from "@/types/tree";
import {findTreeChildrenNode, findTreeParentNode, flattenArray} from "@/tools/tree/treeLib";
import {isAvailableArray} from "@/tools/lib"
import {ElMessage} from 'element-plus'

const props = defineProps<{
  data: TreeData[];
}>();

const treeData =  ref<TreeData[]>([]);

watch(()=> props.data ,(newTreeData)=> treeData.value = InitTreeData(newTreeData))
// 格式化树
const InitTreeData = (TreeData: TreeData[], key?: string): TreeData[] => {
  return TreeData.map((item) => {
    return {
      ...item,
      parentId: key ? key : undefined,
      children: isAvailableArray(item.children) ? InitTreeData(item.children, item.key) : []
    }
  })
}
// 节点处理
const handlerNodeAction = (item: TreeData) => {
  if (!item.children && item.parentId) {
    // 处理自己的父节点状态
    handlerParentTreeNodeState(item);
  } else if (item.parentId) {
    // 处理子节点
    handlerAllChildrenNode(item);
    // 处理自己的父节点状态
    handlerParentTreeNodeState(item);
  } else  if (!item.parentId){
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
  let parentNodes = findTreeParentNode(treeData.value, item.key, true, false)
  if (isAvailableArray(parentNodes)) parentNodes.forEach(item => handlerCommonAction(item))
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
  const checkedNode = flattenArray(treeData.value, false).filter(item => item.check).map(item => item.key).toString();
  ElMessage({
    type: 'success',
    message: `你选择的节点${checkedNode}`
  })
};
</script>

<script lang="ts">
export default {
  name: "treeOption",
  inheritAttrs: false
};
</script>

<style lang="scss" scoped></style>
