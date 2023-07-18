<template>
  <div class="component-container">
    <h1 class="container-header">测试广场</h1>
    <hr />
    <div class="card-container">
      <el-card v-for="(item,index) in  sfcConfigList" :key="index" class="component-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>{{ item.name }}--{{ item.componentName }}--{{item.id}}</span>
            <el-button type="primary" @click="jumpToSfc(item.componentName)">前往</el-button>
          </div>
        </template>
        <div class="card-footer">
          <div class="card-desc" v-html="item.desc"></div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { sfc } from "@/types/sfc";

let sfcConfigList = ref<sfc[]>([]);
const router = useRouter();
// 跳入广场
const jumpToSfc = (componentName: string) => router.push({ path: "/entrance", query: { componentName } });
// 加载模块
const loadModule =  () => {
  const module = import.meta.glob("@/components/**/desc.ts", { eager: true, import: 'default' });
  const moduleValue = Object.values(module) as sfc[];
  if (!isArray(moduleValue)) return;
  sfcConfigList.value = moduleValue;
  // 排序
  sfcConfigList.value.sort((a, b) => a.id - b.id);
};
watchEffect( () =>  loadModule(),{flush:'post'});
</script>
<script lang="ts">
export default {
  name: "component-sfc"
};
</script>
<style lang="scss" scoped>
.component-container {
  @apply w-full h-full flex flex-col bg-violet-200 overflow-y-auto;
  .container-header {
    @apply w-full  text-center font-bold py-3;
  }

  .card-container {
    @apply md:grid md:grid-cols-5  md:gap-5 md:overflow-y-auto  mt-5 px-5 sm:flex flex-col;
    .component-card {
      @apply sm:mb-5 md:h-[350px]  md:mb-0 lg:mb-0;
      .card-header {
        @apply flex items-center justify-between  font-bold ;
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
