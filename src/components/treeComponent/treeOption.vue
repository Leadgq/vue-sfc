<template>
  <div class="bg-white px-3">
    <div v-for="item in props.data" :key="item.key">
      <el-checkbox
        v-model="item.check"
        :indeterminate="item.indeterminate"
        @change="handlerNodeAction(item)"
      >
        {{ item.title }}
      </el-checkbox>
      <treeOption  :data="item.children" v-if="item.children"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TreeData } from "@/types/tree";
import { useEventBus } from "@vueuse/core";
const bus = useEventBus<TreeData>("changeTree");
const props = defineProps<{
  data: TreeData[];
}>();
const handlerNodeAction = (item: TreeData) => { 
  bus.emit(item);
}
</script>

<script lang="ts">
export default {
  name: "treeOption",
  inheritAttrs: true,
};
</script>

<style lang="scss" scoped></style>
