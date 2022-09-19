<template>
  <div>
    <el-button @click="getUserInfo">发送请求</el-button>
    <p>{{ userInfo.name }}</p>
    <p>{{ userInfo.age }}</p>
    <p>{{ userInfo.token }}</p>
  </div>
</template>

<script setup lang="ts">
import userStore from "@/store/userStore";
import { storeToRefs } from "pinia";
const store = userStore();
const { userInfo } = storeToRefs(store);
const getUserInfo = () => {
  store.getUseInfoAction(1);
};
</script>
<script lang="ts">
export default {
  name: "async",
};
</script>
<style lang="scss" scoped></style>
