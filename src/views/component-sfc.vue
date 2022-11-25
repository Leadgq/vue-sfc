<template>
  <div class="component-container">
    <h1 class="container-header">测试广场</h1>
    <hr />
    <div class="flex card-container">
      <el-card v-for="(item,index) in  componentList" :key="index" class="component-card" shadow="hover">
        <template #header>
          <div class="card-header" @click="jumpToSfc(item.componentName)">
            <span>{{ item.name }}</span>
            <el-button type="primary">前往</el-button>
          </div>
        </template>
        <div class="card-footer">
          <div class="card-desc">{{ item.desc }}</div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
const router = useRouter();
const componentList = ref([
  {
    name: "地图实验",
    componentName: "aMap",
    desc: "使用typeScript尝试重构地图"
  },
  {
    name: "树实验",
    componentName: "treeComponentTest",
    desc: "使用typeScript尝试封装自己的树、目前支持正选、反选"
  },
  {
    name: "按钮实验",
    componentName: "treeComponentTest"
  }
]);
// 跳入广场
const jumpToSfc = (componentName: string) => router.push({ path: "/entrance", query: {  componentName } });
</script>
<script lang="ts">
export default {
  name: "component-sfc"
};
</script>
<style lang="scss" scoped>
.component-container {
  @apply w-full h-full flex flex-col bg-violet-200;
  .container-header {
    @apply w-full  text-center font-bold py-3;
  }

  .card-container {
    @apply flex-1 overflow-y-auto  p-[10px] mt-3.5;
    .component-card {
      @apply w-[300px] h-[300px] mr-5;

      &:last-of-type {
        @apply mr-0;
      }

      .card-header {
        @apply flex items-center justify-between  font-bold cursor-pointer;
      }

      .card-footer {
        .card-desc {
          @apply text-sm text-gray-600;
        }
      }
    }
  }
}
</style>
