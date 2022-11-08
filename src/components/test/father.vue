<template>
  <div>
    <Son ref="sonInstance" :id="id" @modify-number="getNumber" />
    <div>{{ data }}</div>
    <el-button @click="modifyData">按钮</el-button>
  </div>
</template>

<script setup lang="ts">
import Son from "./son.vue";

let data = ref(25);

let messageData = ref<string | number>();

let id = ref<number>(0);
const sonInstance = ref<InstanceType<typeof Son> | null>(null);
const mockData = (): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(12);
    }, 1000);
  });
};

const getNumber = (message: number | string) => {
  messageData.value = message;
};

watch(
  () => messageData.value,
  () => {
    // 业务逻辑
    console.log( messageData.value);
  },
  {
    flush: "post",
  }
);

const modifyData = async () => {
  id.value = await mockData();
  sonInstance.value!.getFatherId(id.value);
};
onMounted(() => {
  console.log(messageData.value);
  console.log("父组件挂载");
});
onUpdated(() => {
  console.log("父组件更新");
});
</script>

<script lang="ts">
export default {
  name: "father",
};
</script>
