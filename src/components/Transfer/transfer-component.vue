<template>
  <div class="w-full h-full transfer-container-content" ref="transferContainer">
    <div class="transfer-left" key="left" ref="transferLeft">
      <div class="transfer-top">
        <el-checkbox v-model="leftCheck" :label="leftListText" size="large" @change="modifyList('left')"
                     :indeterminate="leftIndeterminate" :disabled="isLeftAvailableAllCheck"/>
        <span>{{ leftCount }}</span>
      </div>
      <div class="transfer-bottom bg-white">
        <div v-if="filterable" class="mt-3 mb-2">
          <el-input :placeholder="placeholder" v-model="leftSearch" clearable @input="searchKeyWorld('left')"/>
        </div>
        <template v-if="leftList && leftList.length > 0">
          <div class="overflow-auto flex-1">
            <div v-for="transfer in leftList" :key="transfer.key">
              <div :draggable="draggable" @dragstart="dragTransfer(transfer)" @dragend="dragTransferEnd($event)">
                <el-checkbox :label="transfer.label" size="large" :disabled="transfer.disabled" v-model="transfer.check"
                             @change="transferSelect('left',transfer)"/>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="text-sm text-[#999] text-center mt-3 flex-1">无数据</div>
        </template>
      </div>
    </div>
    <div class="transfer-btn" ref="transferBtn">
      <el-button type="primary" :disabled="!isLeftAvailable" @click="toActionCommon('left')">
        {{ btnLeftText }}
      </el-button>
      <el-button type="primary" class="ml-2" :disabled="!isRightAvailable" @click="toActionCommon('right')">
        {{ btnRightText }}
      </el-button>
    </div>
    <div class="transfer-left" key="right" ref="transferRight">
      <div class="transfer-top">
        <el-checkbox v-model="rightCheck" :label="rightListText" size="large" :indeterminate="rightIndeterminate"
                     @change="modifyList('right')" :disabled="isRightAvailableAllCheck"/>
        <span>{{ rightCount }}</span>
      </div>
      <div class="transfer-bottom bg-white">
        <div v-if="filterable" class="mt-3 mb-2">
          <el-input :placeholder="placeholder" v-model="rightSearch" clearable @input="searchKeyWorld('right')"/>
        </div>
        <template v-if="rightList && rightList.length > 0">
          <div class="flex-1 overflow-y-auto">
            <div v-for="transfer in rightList" :key="transfer.key">
              <div :draggable="draggable" @dragstart="dragTransfer(transfer)" @dragend="dragTransferRightEnd($event)">
                <el-checkbox :label="transfer.label" size="large" :disabled="transfer.disabled" v-model="transfer.check"
                             @change="transferSelect('right',transfer)"/>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="text-sm text-[#999] text-center mt-3 flex-1">无数据</div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {transferProps} from "@/types/transferTypes";
import {isAvailableArray} from "@/tools/lib";
import {useDrag, useTransfer, useVariable} from "./hook";

enum direction {
  left = 'left',
  right = 'right'
}

// 导出hooks
const {
  handlerTransferInterlock,
  handlerCommonAction,
  handlerTransfer,
  removeCopyListValue,
  initClock,
  handlerTransferFilter,
} = useTransfer();

const {
  onActiveTransfer,
  transferRight,
  transferLeft,
  maxRightRange,
  minRightRange,
  maxLeftRange,
  minLeftRange
} = useDrag()

const {
  leftList,
  leftCheck,
  leftIndeterminate,
  rightList,
  rightCheck,
  rightIndeterminate,
  leftSearch,
  rightSearch,
  copyLeftList,
  copyRightList,
  emitArray,
  isClock,
  btnLeftText,
  btnRightText,
  leftListText,
  rightListText,
  isLeftAvailableAllCheck,
  isRightAvailableAllCheck,
  isRightAvailable,
  isLeftAvailable,
  leftCount,
  rightCount,
} = useVariable();

type propsType = {
  data: transferProps[],
  value: number[],
  filterable?: boolean,
  filterPlaceholder?: string
  buttonTexts?: string[]
  titles?: string[],
  draggable?: boolean
  leftDefaultCheck?: number[],
  rightDefaultCheck?: number[]
}

const props = withDefaults(defineProps<propsType>(), {draggable: false});

const emit = defineEmits<{
  (e: "update:value", arr: number[]): void;
}>();

let placeholder = computed(() => props.filterPlaceholder ? props.filterPlaceholder : '请输入搜索内容')
// 格式化数据
const stopInit = watchEffect(() => {
  if (isAvailableArray(leftList)) {
    stopInit();
  } else {
    // 因为搜索操作会影响effect、所以加🔐
    if (initClock.value) return;
    leftList.value = props.data.map((item, index) => {
      return {
        ...item,
        check: false,
        direction: index
      };
    });
  }
}, {flush: "post"});
// 左面默认选中
const stopLeftCheckDefault = watchEffect(() => {
  if (props.leftDefaultCheck && isAvailableArray(leftList)) {
    props.leftDefaultCheck.forEach((item) => {
      let result = leftList.value.find((source) => source.key === item);
      if (result) result.check = true;
    })
    handlerTransfer(leftList, leftIndeterminate, leftCheck);
    stopLeftCheckDefault();
  }
}, {flush: 'post'})
 const stopRightCheckDefault =  watchEffect(() => {
  if (props.rightDefaultCheck && isAvailableArray(rightList)) {
    props.rightDefaultCheck.forEach((item) => {
      let result = rightList.value.find((source) => source.key === item);
      if (result) result.check = true;
    })
    handlerTransfer(rightList, rightIndeterminate, rightCheck);
    stopRightCheckDefault()
  }
}, {flush: 'post'})
// copy左面数组
const stopCopy = watchEffect(() => {
  if (isAvailableArray(copyLeftList)) {
    stopCopy();
  } else {
    copyLeftList.value = leftList.value;
  }
}, {flush: 'post'})
// 处理回显
const stop = watchEffect(() => {
  if (isClock.value) return;
  if (isAvailableArray(props.value) && isAvailableArray(leftList.value)) {
    props.value.forEach((key) => {
      const item = leftList.value.find(item => item.key === key);
      if (item) item.check = true;
    });
    stop();
    // 回显的effect只触发一次
    toActionCommon("right");
  }
}, {flush: "post"});
// 按钮文案
const stopBtnInit = watchEffect(() => {
  if (props.buttonTexts && isAvailableArray(props.buttonTexts)) {
    const [leftText, rightText] = props.buttonTexts;
    if (leftText) btnLeftText.value = leftText;
    if (rightText) btnRightText.value = rightText;
    stopBtnInit();
  }
}, {flush: 'post'})
// 列表文案
const stopTitle = watchEffect(() => {
  if (props.titles && isAvailableArray(props.titles)) {
    const [leftTitleText, rightTitleText] = props.titles;
    if (leftTitleText) leftListText.value = leftTitleText;
    if (rightTitleText) rightListText.value = rightTitleText;
    stopTitle();
  }
}, {flush: 'post'})
// 拖拽相关
const dragTransfer = (transfer: transferProps) => onActiveTransfer.value = transfer;
// 向右拽
const dragTransferEnd = (event: DragEvent) => {
  if (event.x <= maxRightRange.value && event.x >= minRightRange.value) dragTransferAction('right');
}
// 向左拽
const dragTransferRightEnd = (event: DragEvent) => {
  if (event.x <= maxLeftRange.value && event.x >= minLeftRange.value) dragTransferAction('left');
}
const dragTransferAction = (direction: string) => {
  if (onActiveTransfer.value?.disabled) return;
  onActiveTransfer.value!.check = true;
  toActionCommon(direction);
  onActiveTransfer.value = undefined;
}
// 联动
const modifyList = (dir: string) => {
  dir === "left" ? handlerTransferInterlock(leftList, leftIndeterminate, leftCheck) : handlerTransferInterlock(rightList, rightIndeterminate, rightCheck);
};
const searchKeyWorld = (direction: string) => {
  if (direction === 'left') {
    handlerTransferFilter(leftList, copyLeftList, leftSearch, leftIndeterminate, leftCheck);
  } else {
    handlerTransferFilter(rightList, copyRightList, rightSearch, rightIndeterminate, rightCheck);
  }
}
// 方向处理
const toActionCommon = (direction: string) => {
  let needPush: number[] = [], needRemove: number[] = [];
  if (direction === "right") {
    const {source, sourceKey} = handlerCommonAction(direction, leftList, rightList, leftIndeterminate, leftCheck);
    needPush = sourceKey;
    // 处理copy数组
    if (props.filterable) {
      // 右面数组copy开始
      copyRightListAction(source);
      // 不论想左还是向右、都要移除copy数组中的值、否则当搜索框为空的时候、状态将会回退
      removeCopyListValue(direction, copyLeftList, needPush);
    }
  } else {
    const {sourceKey, source} = handlerCommonAction(direction, rightList, leftList, rightIndeterminate, rightCheck);
    needRemove = sourceKey;
    if (props.filterable) {
      removeCopyListValue(direction, copyRightList, needRemove);
      // 由于右面是往里面放的、所以不需要恢复状态
      recoveryState(source);
    }
  }
  handlerEmit(direction, needPush, needRemove);
};
// 返回将要活动的值
const handlerEmit = (direction: string, needPush: number[], needRemove: number[]) => {
  if (direction === "right") {
    emitArray.value.push(...needPush);
    emit("update:value", emitArray.value);
  }
  if (direction === "left") {
    needRemove.forEach((key: number) => {
      const index = emitArray.value.findIndex((currentKey) => currentKey === key);
      if (index !== -1) {
        emitArray.value.splice(index, 1);
      }
    });
    emit("update:value", emitArray.value);
  }
}
// 左面拷贝数组回滚
const recoveryState = (source: transferProps[]) => source.forEach((item) => copyLeftList.value.splice(item.direction!, 0, item));
// 右面拷贝
const copyRightListAction = (source: transferProps[]) => {
  //🔒住回显，第二次props中将会有值
  isClock.value = true;
  copyRightList.value.push(...source);
}
// 穿梭点击
const transferSelect = (dir: string, _: transferProps) => {
  dir === "left" ? handlerTransfer(leftList, leftIndeterminate, leftCheck) : handlerTransfer(rightList, rightIndeterminate, rightCheck);
};
// 清空搜索
const clearQuery = (direction: direction) => {
  if (!props.filterable) return;
  if (direction === 'left') {
    leftSearch.value = '';
    searchKeyWorld(direction);
  } else if (direction === 'right') {
    rightSearch.value = ''
    searchKeyWorld(direction);
  }
}
defineExpose({
  clearQuery
})
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
      @apply h-[40px] flex px-3   items-center  justify-between bg-[#f3f5f8];
      span {
        @apply text-[12px]  text-[#999] ;
      }
    }

    .transfer-bottom {
      @apply px-3 flex-1 flex flex-col;
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
