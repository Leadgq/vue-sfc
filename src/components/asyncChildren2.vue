<template>
  <div>
    <AsyncTest ref="asyncComponent">
      <template #[distance]="{headerProps}">我要渲染的地方是{{ distance }} {{ headerProps }}</template>
    </AsyncTest>
    <el-button @click="flag = !flag">按钮</el-button>
    <el-button @click="id++">effect测试</el-button>
    <div>{{ tip }}</div>
  </div>
  <hr/>
  <TreeComponentTest/>
</template>
<script lang="ts" setup>
import {effectTest} from "@/api/effect"
import AsyncTest from "@/components/asyncTest.vue"
import TreeComponentTest from "@/components/treeComponent/treeComponentTest.vue"

const asyncComponent = ref<InstanceType<typeof AsyncTest> | null>(null)
let flag = ref(true);
let distance = ref('header')

watch(flag, (newValue) => {
  distance.value = newValue ? 'header' : 'main'
}, {
  flush: 'post'
})
//watchEffect
let id = ref(1);
let tip = ref('');
const stop = watchEffect(async () => {
  const data = await effectTest(id.value);
  tip.value = data.result + id.value.toString() + '次'
  if (id.value >= 10) {
    stop();
  }
})
</script>
<script lang="ts">
export default {
  name: "asyncChildren2.vue"
}
</script>

<style scoped>

</style>
