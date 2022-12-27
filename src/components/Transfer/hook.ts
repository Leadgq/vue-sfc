import {transferProps} from "@/types/transferTypes";
import {isAvailableArray} from "@/tools/lib";
import {Ref} from "vue";

export const useTransfer = () => {
    // 锁住搜索的effect
    let initClock = ref(false);
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
    const handlerCommonAction = (
        direction: string,
        containerDirectionLeft: Ref<transferProps[]>,
        containerDirectionRight: Ref<transferProps[]>,
        Indeterminate: Ref<boolean>,
        check: Ref<boolean>) => {
        // 所有选中
        const emitList = containerDirectionLeft.value.filter(item => item.check);
        // 做数据
        let list = emitList.map((item) => {
            return {...item, check: false};
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
    const handlerTransferFilter = (
        source: Ref<transferProps[]>,
        copyTarget: Ref<transferProps[]>,
        search: Ref<string>,
        Indeterminate: Ref<boolean>,
        check: Ref<boolean>) => {

        if (!search.value) {
            source.value = copyTarget.value
        } else {
            initClock.value = true;
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
        initClock,
        handlerTransferFilter
    };
};

export const useDrag = () => {
    const transferRight = ref<HTMLElement>();
    const transferLeft = ref<HTMLElement>();
    let onActiveTransfer = ref<transferProps>();
    const transferRightWidth = computed(() => transferRight.value!.clientWidth);
    const transferLeftWidth = computed(() => transferLeft.value!.clientWidth);
    const transferRightOffLeft = computed(() => transferRight.value!.offsetLeft);
    const transferLeftOffLeft = computed(() => transferLeft.value!.offsetLeft);
    // 右面最大、最小距离
    const maxRightRange = computed(() => transferRightOffLeft.value + transferRightWidth.value);
    const minRightRange = computed(() => transferRightOffLeft.value);
    // 左面最大、最小距离
    const maxLeftRange = computed(() => transferLeftOffLeft.value + transferLeftWidth.value);
    const minLeftRange = computed(() => transferLeftOffLeft.value);

    return {
        transferRightOffLeft,
        transferRightWidth,
        onActiveTransfer,
        transferRight,
        transferLeft,
        transferLeftOffLeft,
        transferLeftWidth,
        maxRightRange,
        minRightRange,
        maxLeftRange,
        minLeftRange
    }
}

export const useVariable = () => {
    const {calculateCount} = useTransfer()
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
    let leftSearch = ref('');
    // 搜索右面
    let rightSearch = ref('');
    // 左面copy
    let copyLeftList = ref<transferProps[]>([]);
    let copyRightList = ref<transferProps[]>([]);
    let emitArray = ref<number[]>([]);
    // 锁住回显
    let isClock = ref(false);
    // 文案
    let btnLeftText = ref('←');
    let btnRightText = ref('→');
    let leftListText = ref('列表1');
    let rightListText = ref('列表2');
    // 左全选
    const isLeftAvailableAllCheck = computed(() => !isAvailableArray(leftList) || leftList.value.filter(item => !item.disabled).length === 0);
    // 右全选
    const isRightAvailableAllCheck = computed(() => !isAvailableArray(rightList) || rightList.value.filter(item => !item.disabled).length === 0);
    // 可向右
    const isRightAvailable = computed(() => isAvailableArray(leftList) && leftList.value.some((item) => item.check));
    // 可向左
    const isLeftAvailable = computed(() => isAvailableArray(rightList) && rightList.value.some(item => item.check));
    // 左面个数
    const leftCount = computed(() => calculateCount(leftList));
    // 右面个数
    const rightCount = computed(() => calculateCount(rightList));
    return {
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
        rightCount
    }
}
