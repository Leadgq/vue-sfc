<script setup lang='ts'>
interface UseCounterOptions {
  min: number
  max: number
}

function useCounter(initialValue = 0, options: UseCounterOptions) {
  const {min, max} = options;
  let count = ref(initialValue);
  const inc = () => count.value = Math.min(unref(count) + 1, max);
  const dec = () => count.value = Math.max(unref(count) - 1, min);
  const reset = () => count.value = initialValue;
  return {
    inc,
    count,
    reset,
    dec
  }
}

const {count, inc, dec, reset} = useCounter(0, {min: 0, max: 10})
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <el-button @click="inc">inc</el-button>
    <el-button @click="dec">dec</el-button>
    <el-button @click="reset">reset</el-button>
  </div>
</template>
