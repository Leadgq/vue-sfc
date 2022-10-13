// 压平数组
import {TreeData} from "@/types/tree";
import {Ref} from "vue";
import {isAvailableArray} from "@/tools/lib";
// 压平树
export const flatten = (arr: TreeData[] | Ref<TreeData[]>, isProxy?: boolean): TreeData[] => {
    return unref(arr).reduce((prev: TreeData[], cur: TreeData) => {
        const {children} = cur;
        const proxyStateObject = isProxy ? cur : {...cur}
        return isAvailableArray(children) ? prev.concat(flatten(children, isProxy), proxyStateObject) : prev.concat(proxyStateObject)
    }, [])
}
// 寻找某个节点下所有的子节点不包括当前节点
export const findTreeChildrenNode = (arr: TreeData[] | Ref<TreeData[]>, id: string | Ref<string>): TreeData[] => {
    const nodeId = unref(id);
    const flattenList = flatten(arr);
    const nodeList = flatten(flattenList.filter(item => item.key === nodeId));
    return isAvailableArray(nodeList) ? nodeList.filter(item => item.key !== nodeId) : []
}
// 压平树、给所有子节点添加父节点标记
const toFlatArray = (tree: TreeData[] | Ref<TreeData[]>, parentId?: string): TreeData[] => {
    return unref(tree).reduce((treeArray: TreeData[], cur) => {
        const child = cur.children
        return [
            ...treeArray,
            parentId ? Object.assign(cur, {parentId}) : cur,
            ...(isAvailableArray(child) ? toFlatArray(child, cur.key) : [])]
    }, []);
}
const getIds = (flatArray: TreeData[] | Ref<TreeData[]>, nodeId: string): string[] => {
    let ids = [nodeId];
    let child = unref(flatArray).find(tree => tree.key === nodeId);
    while (child && child.parentId) {
        ids = [child.parentId, ...ids];
        child = unref(flatArray).find(tree => tree.key === child?.parentId);
    }
    return ids.filter(item => item !== nodeId);
}
// 寻找某个节点的父节点id
export const findParentNodeKey = (tree: TreeData[] | Ref<TreeData[]>, nodeId: string): string[] | [] => {
    return getIds(toFlatArray(tree), nodeId);
}
// 返回所有父亲节点对象
const getParentObjectByKeys = (flatArray: TreeData[] | Ref<TreeData[]>, nodeId: string, isProxy: boolean): TreeData[] => {
    let parentArray: TreeData[] = [];
    let child = unref(flatArray).find(tree => tree.key === nodeId);
    while (child) {
        parentArray = isProxy ? parentArray.concat(child) : parentArray.concat({...child});
        child = unref(flatArray).find(tree => tree.key === child?.parentId)
    }
    return parentArray.filter(item => item.key !== nodeId);
}
// 寻找某个节点的所有父节点
export const findParentNode = (tree: TreeData[], nodeId: string, isProxy: boolean) => {
    return getParentObjectByKeys(toFlatArray(tree), nodeId, isProxy);
}
