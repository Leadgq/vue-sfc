<template>
  <div class="login">
    <el-button @click="login">登录</el-button>
  </div>
</template>

<script lang="ts" setup>
import userStore from "@/store/userStore";

const storeInstance = userStore();
const router = useRouter();
const login = async () => {
  await storeInstance.getUseInfoAction(1);
  await storeInstance.getUserInfoPromise();
  await router.push({path: "/async/async_children"});
};
</script>

<style lang="scss" scoped></style>
