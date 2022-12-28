<template>
  <div class="w-full h-full bg-violet-200">
    <el-button @click="modifyView">修改视角</el-button>
  </div>
</template>

<script setup lang="ts">
type viewType = {
  code: number
  name: string
}
let data = ref<viewType>({
  code: 2001,
  name: '大连'
})
let Stack = ref<viewType[]>([]);
onMounted(() => {
  handlerDefaultValue();
})

const modifyView = () => {
  data.value.code = 1300;
  data.value.name = '韩国';
  console.log(Stack.value);
}
const handlerDefaultValue = () => {
  Stack.value.push({...data.value})
}
</script>
<script lang="ts">
export default {
  name: "component"
}
</script>

<style scoped>

</style>
