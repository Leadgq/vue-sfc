<template>
  <div class="transfer-container">
    <div class="w-[562px] h-[300px]">
      <!--   自己的穿梭框   -->
      <TransferComponent :data="data" v-model:value="transferValue" filterable :titles="titles"
                         ref="transferInstance" :left-default-check="[1,3]" :right-default-check="[3]" @leftChangeCheck="check" @rightChangeCheck="check">
      </TransferComponent>
    </div>
    <el-transfer v-model="value" :data="data" filterable @left-check-change="leftCheck" :left-default-checked="[1,3]">

      <template #right-footer>
        <el-button @click="clear">清空</el-button>
      </template>
    </el-transfer>

  </div>
</template>

<script setup lang="ts">
import TransferComponent from "@/components/Transfer/transfer-component.vue";
import {transferProps} from "@/types/transferTypes";

let data = ref<transferProps[]>([]);
let value = ref([]);
let transferValue = ref<number[]>([]);
// 自定义按钮
const btnText = ['左', '右']
const titles = ['list1', 'list2'];
const transferInstance = ref<InstanceType<typeof TransferComponent> | null>(null)


const clear = () => {
  transferInstance.value.clearQuery('left');
}
const leftCheck = (key: number[], keys: number[]) => {
  console.log(key, keys)
}

const  check = (key:number[])=>{
  console.log(key)
}
onMounted(async () => {
  data.value = await mockTransferPropsData();
});

watch(() => value.value, (newValue) => {
  console.log(newValue);
});
watch(() => transferValue.value, (_) => {
  // console.log(newValue);
}, {deep: true});
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
          },
          {
            key: 5,
            disabled: false,
            label: "吉南区"
          },
          {
            key: 4,
            disabled: false,
            label: '大理'
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
