<template>
  <div class="transfer-container">
    <div class="w-[562px] h-[300px]">
      <!--   自己的穿梭框   -->
      <TransferComponent :data="data" v-model:value="transferValue" />
    </div>
    <el-transfer v-model="value" :data="data" />
  </div>
</template>

<script setup lang="ts">
import TransferComponent from "@/components/Transfer/transfer-component.vue";
import { transferProps } from "@/types/transferTypes";

let data = ref<transferProps[]>([]);
let value = ref([1, 3]);
let transferValue = ref<number[]>([1, 3]);
onMounted(async () => {
  data.value = await mockTransferPropsData();
});

watch(() => value.value, (newValue) => {
  console.log(newValue);
});
watch(() => transferValue.value, (newValue) => {
  console.log(newValue);
});
const mockTransferPropsData = (): Promise<transferProps[]> => {
  return new Promise((resolve) => {
    resolve(
      [
        {
          key: 1,
          disabled: false,
          label: "大连"
        },
        {
          key: 2,
          disabled: true,
          label: "沈阳"
        },
        {
          key: 3,
          disabled: false,
          label: "吉林"
        }
      ]
    );
  });
};

</script>

<style scoped lang="scss">
.transfer-container {
  @apply w-full h-full bg-violet-200;
}
</style>
