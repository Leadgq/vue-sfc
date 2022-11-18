<template>
  <div class="async_children">
    <div>
      <SlotTest ref="asyncComponent">
        <template #[distance]="{ headerProps }">我要渲染的地方是{{ distance }} {{ headerProps }}</template>
      </SlotTest>
      <el-button @click="flag = !flag">按钮</el-button>
      <el-button @click="id++">effect测试</el-button>
      <el-button @click="backView">返回</el-button>
      <div>{{ tip }}</div>
    </div>
    <hr />
    <TreeComponentTest />
    <div :class="styleDiv" class="">样式测试</div>
    <el-button @click="modifyStyle">修改样式</el-button>
    <hr />
    <div
      v-for="item in todoList"
      :key="item.id"
      class="todo"
      :class="{ active: workerId === item.id }"
      @click="workerId = item.id"
    >
      {{ item.name }}
    </div>
    <hr />
    <div class="container" ref="el">
      <div v-for="(item,index) in useInfiniteArray" :key="index">{{ item }}</div>
    </div>
    <hr />
    <div>时间测试</div>
    <el-date-picker
      v-model="time"
      type="datetimerange"
      range-separator="-"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      format="YYYY-MM-DD  HH:mm:ss"
      value-format="YYYY-MM-DD  HH:mm:ss"
    />
  </div>
</template>
<script lang="ts" setup>
import { effectTest } from "@/api/effect";
import SlotTest from "@/components/slotTest.vue";
import TreeComponentTest from "@/components/treeComponent/treeComponentTest.vue";
import { ElMessage } from "element-plus";
import { isAvailableArray, randomMax } from "@/tools/lib";
import router from "@/router";

const asyncComponent = ref<InstanceType<typeof SlotTest> | null>(null);
let flag = ref(true);
let distance = ref("header");

watch(
  flag,
  (newValue) => {
    distance.value = newValue ? "header" : "main";
  },
  {
    flush: "post"
  }
);
//watchEffect
let id = ref(1);
let tip = ref("");
const stop = watchEffect(async () => {
  const data = await effectTest(id.value);
  tip.value = data.result + id.value.toString() + "次";
  ElMessage.success(tip.value);
  if (id.value >= 10) {
    stop();
    ElMessage.error("调用stop停止effect");
  }
});
// 单个
let styleDiv = ref("normal");
const modifyStyle = () => {
  styleDiv.value = styleDiv.value === "normal" ? "error" : "normal";
};
let workerId = ref<number | string | undefined>(undefined);
let todoList = ref([
  {
    id: 1,
    name: "张三",
    age: 33
  },
  {
    id: 2,
    name: "李四",
    age: 55
  }
]);
onMounted(() => {
  handlerWorker();
});
const handlerWorker = () => {
  if (isAvailableArray(todoList)) {
    const { id } = todoList.value.at(-1)!;
    workerId.value = id;
  }
};
const el = ref<HTMLElement | null>(null);
let useInfiniteArray = ref<number[]>([]);

const loadMore = (): Promise<number[]> => {
  let list: number[] = [];
  return new Promise((resolve) => {
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        list.push(randomMax(5, 10));
      }
      resolve(list);
    }, 1000);
  });
};
onMounted(() => {
  loadArrayData();
});
useInfiniteScroll(el, () => loadArrayData(), {
  distance: 10
});
const loadArrayData = async (): Promise<void> => {
  const data = await loadMore();
  useInfiniteArray.value = [...useInfiniteArray.value, ...data];
};
const backView = () => router.back();

// 时间测试
let time = ref();

watch(() => time.value, (newTime) => {
  console.log(newTime);
});
</script>
<script lang="ts">
export default {
  name: "asyncChildren2"
};
</script>
<style lang="scss" scoped>
.async_children {
  .common {
    @apply w-[300px] cursor-pointer text-center text-white;
  }

  .normal {
    @apply bg-violet-400;
    @extend .common;
  }

  .error {
    @apply bg-red-500;
    @extend .common;
  }

  .todo {
    @apply px-3 py-5 w-[200px] h-[100px] border-solid border-red-500 border-[1px] cursor-pointer;
    &.active {
      @apply bg-red-400;
    }
  }

  .container {
    @apply w-[200px] h-[100px] bg-red-400 overflow-y-auto;
  }
}
</style>
