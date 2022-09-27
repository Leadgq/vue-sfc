<template>
  <div>渲染</div>

  <el-button @click="modify">按钮</el-button>
</template>


<script lang="ts" setup>
import {getUseInfo} from "@/api/user"
import {handlerMoreData} from "@/tools/lib"

const test = () => {
  for (let i = 0; i < 50000; i++) {
    console.log(i)
  }
}
const modify = () => {
  console.log("点击事件");
}
onMounted(async () => {
  console.time();
  const result = await handlerMoreData();
  console.log(result);
  console.timeEnd()
  const data = await getUseInfo();
  console.log(data.result);
})
</script>

<script lang="ts">
export default {
  name: "asyncChildren"
}
</script>

<style scoped>

</style>
