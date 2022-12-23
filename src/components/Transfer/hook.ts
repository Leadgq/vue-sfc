import { transferProps } from "@/types/transferTypes";
import { isAvailableArray } from "@/tools/lib";
import { Ref } from "vue";

export const useTransfer = () => {
  // 处理联动
  const handlerTransferInterlock = (list: Ref<transferProps[]>, Indeterminate: Ref<boolean>, check: Ref<boolean>) => {
    if (!isAvailableArray(list)) return;
    Indeterminate.value = false;
    list.value.forEach((item) => {
      if (!item.disabled) item.check = check.value;
    });
  };

  // 计算个数
  const calculateCount = (list: Ref<transferProps[]>) => {
    // 总个数
    const sumCount = list.value.length;
    // 被选择
    const selectedCount = list.value.filter(item => !item.disabled && item.check).length;
    return selectedCount + "/" + sumCount;
  };

  // 公共处理向左、向右
  const handlerCommonAction = (direction: string, containerDirectionLeft: Ref<transferProps[]>, containerDirectionRight: Ref<transferProps[]>, Indeterminate: Ref<boolean>, check: Ref<boolean>): transferProps[] => {
    const emitList = containerDirectionLeft.value.filter(item => !item.disabled && item.check);
    let list = emitList.map((item) => {
      return { ...item, check: false };
    });
    // 如果是左面回退之前的状态
    if (direction === "left") {
      list.forEach((item) => {
        containerDirectionRight.value.splice(item.direction!, 0, item);
      });
    } else {
      containerDirectionRight.value.push(...list);
    }
    // 保留为选中
    containerDirectionLeft.value = containerDirectionLeft.value.filter(item => !item.check);
    resetState(Indeterminate, check);
    return emitList;
  };

  // 重置
  const resetState = (indeterminateValue: Ref<boolean>, checkStateValue: Ref<boolean>) => {
    indeterminateValue.value = false;
    checkStateValue.value = false;
  };

  const handlerTransfer = (list: Ref<transferProps[]>, Indeterminate: Ref<boolean>, check: Ref<boolean>) => {
    if (!isAvailableArray(list)) return;
    // 有一个被选择
    let indeterminateState = list.value.some(item => !item.disabled && item.check);
    // 所有被选择
    let checkState = list.value.filter(item => !item.disabled).every((item) => item.check);
    if (indeterminateState) Indeterminate.value = true;
    //  如果全部选择
    if (checkState) {
      check.value = true;
      Indeterminate.value = false;
    }
    // 如果一个没选
    if (!indeterminateState) {
      Indeterminate.value = false;
      check.value = false;
    }
  };

  return {
    handlerTransferInterlock,
    calculateCount,
    handlerCommonAction,
    handlerTransfer
  };
};
