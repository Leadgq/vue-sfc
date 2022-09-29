<template>
  <div>
    <AsyncTest ref="asyncComponent">
      <template #[distance]="{headerProps}">我要渲染的地方是{{ distance }} {{ headerProps }}</template>
    </AsyncTest>
    <el-button @click="flag = !flag">按钮</el-button>
  </div>
</template>
<script lang="ts" setup>
import AsyncTest from "@/components/asyncTest.vue"

const asyncComponent = ref<InstanceType<typeof AsyncTest> | null>(null)

let flag = ref(true);
let distance = ref('header')

watch(flag, (newValue) => {
  distance.value = newValue ? 'header' : 'main'
}, {
  flush: 'post'
})
</script>
<script lang="ts">
export default {
  name: "asyncChildren2.vue"
}
</script>

<style scoped>

</style>
