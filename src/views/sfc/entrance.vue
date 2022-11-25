<template>
  <div class="h-full">
    <component :is="componentName"></component>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const name = route.query.name! as string;
let componentName;
const getComponent = async () => {
  const routeComponentName = route.query.name as string;
  return await handlerPath(routeComponentName);
};
// 处理路径
const handlerPath = async (routeComponentName: string): Promise<any> => {
  const models = import.meta.glob("../../components/**/*.vue");
  for (const [key, value] of Object.entries(models)) {
    const modelName = key.split("/").at(-1);
    if (routeComponentName === modelName) {
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
