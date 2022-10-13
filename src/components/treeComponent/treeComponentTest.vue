<template>
  <div>
    <TreeChildren :data="treeDataArray"/>
  </div>
</template>

<script setup lang="ts">
import TreeChildren from "@/components/treeComponent/treeChildren.vue";
import {loadFile} from "@/tools/lib";
import {TreeData} from "@/types/tree";
import {findParentNode} from "@/tools/tree/treeLib";


let treeDataArray = ref<TreeData[]>([]);
const load = async () => {
  treeDataArray.value = (await loadFile("treeData")) as TreeData[];
  console.log(findParentNode(treeDataArray.value!, '1-2', false, true));
};
onMounted(() => {
  load();
});
</script>
<style scoped></style>
