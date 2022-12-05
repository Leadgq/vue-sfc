<template>
  <div class="component-container">
    <h1 class="container-header">测试广场</h1>
    <hr />
    <div class="card-container">
      <el-card v-for="(item,index) in  sfcConfigList" :key="index" class="component-card" shadow="hover">
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
import { sfc } from "@/types/sfc";
import { loadModule } from "@/config/fsc";

let sfcConfigList = ref<sfc[]>([]);
const router = useRouter();
onMounted(async () => sfcConfigList.value = await loadModule());
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
