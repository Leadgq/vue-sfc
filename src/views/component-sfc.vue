<template>
  <div class="component-container">
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
</template>
<script lang="ts" setup>
const router = useRouter();
const componentList = ref([
  {
    name: "地图实验",
    componentName: "aMap.vue",
    desc: "使用typeScript尝试重构地图"
  },
  {
    name: "树实验",
    componentName: "treeComponentTest.vue",
    desc: "使用typeScript尝试封装自己的树、目前支持正选、反选"
  },
  {
    name: "按钮实验",
    componentName: "treeComponentTest"
  }
]);
const jumpToSfc = (name: string) => {
  router.push({ path: "/entrance", query: { name } });
};
</script>
<script lang="ts">
export default {
  name: "component-sfc"
};
</script>
<style lang="scss" scoped>
.component-container {
  @apply p-[10px] flex;
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
</style>
