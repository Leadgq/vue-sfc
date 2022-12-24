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
  const handlerCommonAction = (direction: string, containerDirectionLeft: Ref<transferProps[]>, containerDirectionRight: Ref<transferProps[]>, Indeterminate: Ref<boolean>, check: Ref<boolean>) => {
    // 所有选中
    const emitList = containerDirectionLeft.value.filter(item =>  item.check);
    // 做数据
    let list = emitList.map((item) => {
      return { ...item, check: false };
    });
    // 无论左右、都需要保持原来的位置
    list.forEach((item) => containerDirectionRight.value.splice(item.direction!, 0, item));
    // 保留没有选中
    containerDirectionLeft.value = containerDirectionLeft.value.filter(item => !item.check);
    resetState(Indeterminate, check);
    return {
      sourceKey: emitList.map(item => item.key),
      source: list
    }
  };
  // 删除已经移动的值===> copy数组
  const handlerCopyList = (direction: string, copyList: Ref<transferProps[]>, keys: number[]) => { 
    keys.forEach((key) => {
      const index = copyList.value.findIndex((item) => item.key === key);
      if (index !== -1) copyList.value.splice(index, 1);
    })
  }

  // 处理搜索
  const handlerTransferFilter = (source: Ref<transferProps[]>, copyTarget: Ref<transferProps[]>, search:Ref<string> , Indeterminate:Ref<boolean>,check:Ref<boolean>) => { 
    if (!search.value) {
      source.value = copyTarget.value
    } else { 
      source.value = copyTarget.value.filter((item) => item.label.includes(search.value));
    }
    handlerTransfer(source, Indeterminate, check);
  }
  // 重置
  const resetState = (indeterminateValue: Ref<boolean>, checkStateValue: Ref<boolean>) => {
    indeterminateValue.value = false;
    checkStateValue.value = false;
  };

  // 联动
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
    handlerTransfer,
    handlerCopyList,
    handlerTransferFilter
  };
};
