<template>
  <div class="h-full bg-violet-200">
    <div class="common">
      <span>单一源:</span>
      <span>{{ cont }}</span>
      <el-button @click="cont++">修改</el-button>
    </div>
    <hr />
    <div class="common">
      <span>对象源:</span>
      <span>{{ obj.age }} --- {{ obj.name }}</span>
      <el-button @click="obj.age++">修改</el-button>
    </div>
    <hr />
  </div>
</template>
<script setup lang="ts">
let cont = ref(0);
// 监听单一源
watch(cont, (newCount, oldCount) => console.log(newCount, oldCount));
// 监听单一源、特定条件进入、条件只执行一次
watch(() => cont.value > 5, () => {
  console.log("条件进入");
  console.log(cont.value);
});
// 对象源
let obj = reactive({
  name: "okOne",
  age: 20
});
// 指定某个源的某个键、配置项 { immediate: true } 初始化直接监听、类似于watchEffect deep 深度监听
watch(() => obj.age, (newAge, oldAge) => console.log("对象元", newAge, oldAge));
// 监听多个源 ===> flush:'post' dom完毕
watch(() => [cont, obj.age], ([newCount, newAge], [oldCount, oldAge]) => {
  console.log("多个源", oldCount, oldAge);
}, { deep: true, flush: "post" });
</script>
<script lang="ts">
export default {
  name: "watch-option"
};
</script>

<style lang="scss" scoped>
.common {
  @apply py-3;
}
</style>
