<template>
  <div>
    <TreeChildren :data="treeDataArray" />
    <TreeOption :data="treeDataArray" />
  </div>
</template>

<script setup lang="ts">
import TreeChildren from "@/components/treeComponent/treeChildren.vue";
import { loadFile } from "@/tools/lib";
import { TreeData } from "@/types/tree";
import TreeOption from "@/components/treeComponent/treeOption.vue";

let treeDataArray = ref<TreeData[]>([]);
const load = async () => {
  treeDataArray.value = (await loadFile("treeData")) as TreeData[];
};
onMounted(() => {
  load();
});
</script>
<style scoped></style>
