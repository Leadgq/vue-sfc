<template>
  <div>
    <TreeChildren :data="treeDataArray" v-model:testValue="testValue"/>
    <div>{{ testValue }}</div>
  </div>
</template>

<script setup lang="ts">
import TreeChildren from "@/components/treeComponent/treeChildren.vue";
import {loadFile} from "@/tools/lib";
import {TreeData} from "@/types/tree";


let treeDataArray = ref<TreeData[]>([]);

let  testValue =  ref('0');
const load = async () => {
  treeDataArray.value = (await loadFile("treeData")) as TreeData[];
};
onMounted(() => {
  load();
});
</script>
<style scoped></style>
