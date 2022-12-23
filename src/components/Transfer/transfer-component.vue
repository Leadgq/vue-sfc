<template>
  <div class="w-full h-full transfer-container-content">
    <div class="transfer-left" key="left">
      <div class="transfer-top">
        <el-checkbox v-model="leftCheck" label="列表1" size="large" @change="modifyList('left')" :indeterminate="leftIndeterminate" :disabled="isLeftAvailableAllCheck" />
        <span>{{ leftCount }}</span>
      </div>
      <div class="transfer-bottom bg-white">
        <div v-if="filterable" class="mt-3 mb-2">
          <el-input placeholder="请输入搜索内容" v-model="leftSearch" clearable @input="searchResult"/>
        </div>
        <template v-if="leftList && leftList.length > 0">
          <div v-for="transfer in leftList" :key="transfer.key">
            <el-checkbox :label="transfer.label" size="large" :disabled="transfer.disabled" v-model="transfer.check" @change="transferSelect('left',transfer)" />
          </div>
        </template>
        <template v-else>
          <div class="text-sm text-[#999] text-center mt-3">无数据</div>
        </template>
      </div>
    </div>
    <div class="transfer-btn">
      <el-button type="primary" :disabled="!isLeftAvailable" @click="toActionCommon('left')">向左</el-button>
      <el-button type="primary" class="ml-2" :disabled="!isRightAvailable" @click="toActionCommon('right')">向右</el-button>
    </div>
    <div class="transfer-left" key="right">
      <div class="transfer-top">
        <el-checkbox v-model="rightCheck" label="列表2" size="large" :indeterminate="rightIndeterminate" @change="modifyList('right')" :disabled="isRightAvailableAllCheck" />
        <span>{{ rightCount }}</span>
      </div>
      <div class="transfer-bottom bg-white">
        <div v-if="filterable" class="mt-3 mb-2">
          <el-input placeholder="请输入搜索内容" v-model="rightSearch" clearable/>
        </div>
        <template v-if="rightList && rightList.length > 0">
          <div v-for="transfer in rightList" :key="transfer.key">
            <el-checkbox :label="transfer.label" size="large" :disabled="transfer.disabled" v-model="transfer.check" @change="transferSelect('right',transfer)" />
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
// 导出hooks
const { handlerTransferInterlock, calculateCount, handlerCommonAction, handlerTransfer } = useTransfer();

const props = defineProps<{ data: transferProps[], value: number[] ,filterable?:boolean}>();
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
// 搜索左面
let  leftSearch =  ref('');
// 搜索右面
let  rightSearch = ref('');

let  copyLeftList = ref<transferProps[]>([]);
let  copyRightList = ref<transferProps[]>([]);
// 需要发出的数据
let  aleadyEmitArray =  ref<transferProps[]>([])

let  emitArray = ref<number[]>([]);
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
      if (item) item.check = true;
    });
    stop();
    // 回显的effect只触发一次
    toActionCommon("right");
  }
}, { flush: "post" });
// 联动
const modifyList = (dir: string) => {
  dir === "left" ? handlerTransferInterlock(leftList, leftIndeterminate, leftCheck) : handlerTransferInterlock(rightList, rightIndeterminate, rightCheck);
};
// 左全选
const isLeftAvailableAllCheck = computed(() => !isAvailableArray(leftList) || leftList.value.filter(item => !item.disabled).length === 0);
// 右全选
const isRightAvailableAllCheck = computed(() => !isAvailableArray(rightList) ||  rightList.value.filter(item => !item.disabled).length === 0);
// 可向右
const isRightAvailable = computed(() => isAvailableArray(leftList) && leftList.value.some((item)=> item.check));
// 可向左
const isLeftAvailable = computed(() => isAvailableArray(rightList) && rightList.value.some(item => item.check));
// 左面个数
const leftCount = computed(() => calculateCount(leftList));
// 右面个数
const rightCount = computed(() => calculateCount(rightList));
// 方向处理
const toActionCommon = (direction: string) => {
  let needPush: number[] = [], needRemove: number[] = [];
  if (direction === "right") {
    needPush = handlerCommonAction(direction, leftList, rightList, leftIndeterminate, leftCheck);
  } else {
    needRemove = handlerCommonAction(direction, rightList, leftList, rightIndeterminate, rightCheck);
  }
  handlerEmit(direction, needPush, needRemove);
};

const  handlerEmit = (direction:string,needPush:number[],needRemove:number[])=>{
  if (direction === "right") {
    emitArray.value.push(...needPush);
    emit("update:value",emitArray.value);
  }
  if (direction === "left") {
    needRemove.forEach((key: number) => {
      const index = emitArray.value.findIndex((currentKey) => currentKey === key);
      if (index !== -1) {
        emitArray.value.splice(index, 1);
      }
    });
    emit("update:value",emitArray.value);
  }
}
// 穿梭点击
const transferSelect = (dir: string, _: transferProps) => {
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
