<template>
  <div>
    <TreeChildren :data="treeDataArray"/>
  </div>
</template>

<script setup lang="ts">
import TreeChildren from "@/components/treeComponent/treeChildren.vue";
import {loadFile} from "@/tools/lib";
import {TreeData} from "@/types/tree";
import {flattenArray} from "@/tools/tree/treeLib";


let treeDataArray = ref<TreeData[]>([]);
const load = async () => {
  treeDataArray.value = (await loadFile("treeData")) as TreeData[];
  console.log(flattenArray(treeDataArray.value!, false));
};
onMounted(() => {
  load();
});
</script>
<style scoped></style>
