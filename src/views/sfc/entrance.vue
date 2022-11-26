<template>
  <div class="h-full">
    <component :is="componentName"></component>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const name = route.query.componentName! as string;

let componentName: any | undefined ;
const getComponent = async () => await handlerPath(name);
// 处理路径
const handlerPath = async (routeComponentName: string) => {
  const models = import.meta.glob("../../components/**/*.vue");
  // 循环模块
  for (const [key, value] of Object.entries(models)) {
    // 分割模块名称 
    const modelName = key.split("/").pop()?.split(".").shift();
    if (routeComponentName === modelName) {
      // 执行模块
      return (await value() as any).default;
    }
  }
};
componentName = defineAsyncComponent({
  loader: () => getComponent()
});
</script>
<script lang="ts">
export default {
  name: "entrance"
};
</script>

<style scoped>

</style>
