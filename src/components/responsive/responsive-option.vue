<template>
  <div>
    {{ count }}
    {{ doubleCount }}
    <el-button @click="flag++">修改</el-button>
    testData: {{ testData }} flag: {{ flag }}
    <span>
      倒计时： {{ countDownValue }}
      <el-button @click="start">开始</el-button>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useCountDown } from "@/tools/hook/hook";
let flag = ref(1);
const props = defineProps<{
  count: number;
}>();
//  1. 这种不行
// 1. render 函数、 watchEffect(()=>)  watch(()=>) computed(()=> props.count)
// 依赖于响应式数据
// const doubleCount = ref(Number(props.count));
// const doubleCount = computed(() => +props.count * 2);
let doubleCount = ref(1);
const useEffect = (props: any) => {
  watchEffect(() => {
    //  响应式
    doubleCount.value = props.count * 2;
  });
};
useEffect(props);
// 它收集所有的东西作为依赖，
// 如果说mockData代码在前面，在收集依赖的时候发现
// 它里面并没有响应式数据，那么就算下面在有响应式数据也不会重新执行
// 也就说、执行promise前面必须存在响应式数据，否则不会重新执行
const mockData = () => {
  return new Promise((resolve) => {
    resolve([1, 2, 3]);
  });
};
const normalFn = () => {
  return 123;
};
let testData = ref(2);
watchEffect(async () => {
  const result = normalFn();
  testData.value = flag.value * 2;
  const data = await mockData();
  console.log(data, result);
});

const { countDownValue, start } = useCountDown(3, 1, false);
</script>
