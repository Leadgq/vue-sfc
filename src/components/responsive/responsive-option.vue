<template>
  <div>
    {{ count }}
    {{ doubleCount }}
  </div>
</template>

<script setup lang="ts">
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
</script>
