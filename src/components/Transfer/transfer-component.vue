<template>
  <div class="w-full h-full transfer-container-content">
    <div class="transfer-left" key="left">
      <div class="transfer-top">
        <el-checkbox v-model="leftCheck" label="列表1" size="large" @change="modifyList('left')" :indeterminate="leftIndeterminate" :disabled="isLeftAvailableAllCheck" />
        <span>{{ leftCount }}</span>
      </div>
      <div class="transfer-bottom bg-white">
        <template v-if="leftList && leftList.length > 0">
          <div v-for="(transfer) in leftList" :key="transfer.key">
            <el-checkbox :label="transfer.label" size="large" :disabled="transfer.disabled" v-model="transfer.check" @change="transferSelect('left')" />
          </div>
        </template>
        <template v-else>
          <div class="text-sm text-[#999] text-center mt-3">无数据</div>
        </template>
      </div>
    </div>
    <div class="transfer-btn">
      <el-button type="primary" :disabled="!isLeftAvailable" @click="toActionCommon('left')">向左</el-button>
      <el-button type="primary" class="ml-2" :disabled="isRightAvailable" @click="toActionCommon('right')">向右</el-button>
    </div>
    <div class="transfer-left" key="right">
      <div class="transfer-top">
        <el-checkbox v-model="rightCheck" label="列表2" size="large" :indeterminate="rightIndeterminate" @change="modifyList('right')" :disabled="isRightAvailableAllCheck" />
        <span>{{ rightCount }}</span>
      </div>
      <div class="transfer-bottom bg-white">
        <template v-if="rightList && rightList.length > 0">
          <div v-for="(transfer) in rightList" :key="transfer.key">
            <el-checkbox :label="transfer.label" size="large" :disabled="transfer.disabled" v-model="transfer.check" @change="transferSelect('right')" />
          </div>
        </template>
        <template v-else>
          <div class="text-sm text-[#999] text-center mt-3">无数据</div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { transferProps } from "@/types/transferTypes";
import { isAvailableArray } from "@/tools/lib";
import { useTransfer } from "./hook";

const props = defineProps<{ data: transferProps[], value: number[] }>();
const emit = defineEmits(["update:value"]);
// 左面列表
let leftList = ref<transferProps[]>([]);
// 左面是否被选
let leftCheck = ref(false);
// 左面半选
let leftIndeterminate = ref(false);
// 右面列表
let rightList = ref<transferProps[]>([]);
// 右面
let rightCheck = ref(false);
// 右半选
let rightIndeterminate = ref(false);
// 格式化数据
watchEffect(() => {
  leftList.value = props.data.map((item, index) => {
    return {
      ...item,
      check: false,
      direction: index
    };
  });
}, { flush: "post" });
// 处理回显
const stop = watchEffect(() => {
  if (isAvailableArray(props.value) && isAvailableArray(leftList.value)) {
    props.value.forEach((key) => {
      const item = leftList.value.find(item => item.key === key);
      if (item) {
        item.check = true;
      }
    });
    toActionCommon("right");
    // 回显的effect只触发一次
    stop();
  }
}, { flush: "post" });

// 导出hooks
const { handlerTransferInterlock, calculateCount, handlerCommonAction, handlerTransfer } = useTransfer();
// 联动
const modifyList = (dir: string) => {
  dir === "left" ? handlerTransferInterlock(leftList, leftIndeterminate, leftCheck) : handlerTransferInterlock(rightList, rightIndeterminate, rightCheck);
};
// 左全选
const isLeftAvailableAllCheck = computed(() => !isAvailableArray(leftList) || leftList.value.filter(item => !item.disabled).length === 0);
// 右全选
const isRightAvailableAllCheck = computed(() => !isAvailableArray(rightList) || rightList.value.length === 0);
// 可向右
const isRightAvailable = computed(() => isAvailableArray(leftList) && leftList.value.filter(item => !item.disabled).every(item => !item.check));
// 可向左
const isLeftAvailable = computed(() => isAvailableArray(rightList) && rightList.value.some(item => item.check));
// 左面个数
const leftCount = computed(() => calculateCount(leftList));
// 右面个数
const rightCount = computed(() => calculateCount(rightList));
// 方向处理
const toActionCommon = (direction: string) => {
  let emitArray;
  if (direction === "right") {
    emitArray = handlerCommonAction(direction, leftList, rightList, leftIndeterminate, leftCheck);
  } else {
    emitArray = handlerCommonAction(direction, rightList, leftList, rightIndeterminate, rightCheck);
  }
  emit("update:value", emitArray);
};
// 穿梭点击
const transferSelect = (dir: string) => {
  dir === "left" ? handlerTransfer(leftList, leftIndeterminate, leftCheck) : handlerTransfer(rightList, rightIndeterminate, rightCheck);
};
</script>
<script lang="ts">
export default {
  name: "transfer-component"
};
</script>

<style scoped lang="scss">
.transfer-container-content {
  @apply flex ;
  .common {
    @apply w-[35%] h-full;
  }

  .transfer-left {
    @extend .common;
    @apply flex flex-col;
    .transfer-top {
      @apply h-[40px] flex px-3 flex  items-center  justify-between bg-[#f3f5f8];
      span {
        @apply text-[12px]  text-[#999] ;
      }
    }

    .transfer-bottom {
      @apply px-3 flex-1;
      &:deep(.el-checkbox.el-checkbox--large) {
        @apply h-[32px];
      }
    }
  }

  .transfer-btn {
    @apply flex-1  flex  items-center justify-center ;
  }

  .transfer-right {
    @extend .common;
  }
}
</style>
