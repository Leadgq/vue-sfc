<template>
  <div>
    子组件
    <div>{{ number }}</div>
    <el-button @click="addNumber">我要增加number</el-button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: number;
}>();
const emit = defineEmits<{
  (e: "modifyNumber", id: number | string): void;
}>();

let number = ref(0);

onMounted(async () => {
  console.log("子组件挂载");
  const result = await detailData(22);
  emit("modifyNumber", result);
});

onUpdated(() => {
  console.log("子组件更新");
});

const addNumber = () => {
  number.value++;
  emit("modifyNumber", number.value);
};

const getFatherId = async (id: number) => {
  console.log("方法触发");
  const message = await detailData(id);
  console.log(message);
};

const detailData = (id?: number): Promise<string> => {
  return new Promise((resolve) => {
    if (id) {
      setTimeout(() => resolve("这是详情"), 5);
    }
  });
};

defineExpose({
  getFatherId,
});
</script>

<script lang="ts">
export default {
  name: "son",
  inheritAttrs: true,
};
</script>
