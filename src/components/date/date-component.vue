<template>
  <div>
    <el-input type="date" v-model="dateData" />
    <el-date-picker
      v-model="time"
      type="date"
      range-separator="-"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      format="YYYY-MM-DD  HH:mm:ss"
      value-format="YYYY-MM-DD  HH:mm:ss"
    />
  </div>
</template>
<script setup lang="ts">
const dateData = ref();
let  time = ref();
watch(() => dateData.value, (v) => {
  console.log(v);
});
</script>
<script lang="ts">
export default {
  name: "date-component"
};
</script>

<style scoped>

</style>
