<template>
  <div class="component-container">
    <h1 class="container-header">测试广场</h1>
    <hr />
    <div class="card-container">
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
    desc: "使用typeScript重构地图、已经ok"
  },
  {
    name: "树实验",
    componentName: "treeComponentTest",
    desc: "使用typeScript尝试封装自己的树、目前支持正选、反选、已经ok"
  },
  {
    name: "插槽实验",
    componentName: "slot",
    desc: "动态插槽、插槽返回值、具名插槽、匿名插槽"
  }
]);
// 跳入广场
const jumpToSfc = (componentName: string) => router.push({ path: "/entrance", query: { componentName } });
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
    @apply grid grid-cols-5  gap-5 overflow-y-auto  mt-5 px-5;
    .component-card {
      @apply h-[350px] ;
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
