<template>
  <div>
    <TreeChildren :data="treeDataArray" v-model:testValue="testValue" v-if="flag" />
    <TreeFatherVue :data="treeDataArray" :default-key="defaultKey"  :show-check="true"/>
    <div>{{ testValue }}</div>
    <el-button @click="flag = !flag">异步显示</el-button>
  </div>
</template>

<script setup lang="ts">
import { loadFile } from "@/tools/lib";
import { TreeData } from "@/types/tree";
import TreeFatherVue from "./treeFather.vue";

let defaultKey = ref<string[]>([]);
const TreeChildren = defineAsyncComponent({
  loader: () => import("@/components/treeComponent/treeChildren.vue"),
  delay: 5000,
  timeout: 3000
});
let flag = ref(false);
let treeDataArray = ref<TreeData[]>([]);
let testValue = ref("父组件的值");
const load = async () => {
  treeDataArray.value = (await loadFile("treeData")) as TreeData[];
  defaultKey.value = ["1-1"];
};
onMounted(() => {
  load();
});
</script>
<style scoped></style>
