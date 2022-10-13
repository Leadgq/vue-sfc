// 压平数组
import {TreeData} from "@/types/tree";
import {Ref} from "vue";
import {isAvailableArray} from "@/tools/lib";

/**
 *  @description 压平树状数组
 *  @description isProxyState: 被压平的树是否保持响应式   默认:false
 *  @return TreeData[]
 * */
export const flattenArray = (arr: TreeData[] | Ref<TreeData[]>, isProxyState = false): TreeData[] => {
    return unref(arr).reduce((prev: TreeData[], cur: TreeData) => {
        const {children} = cur;
        const proxyStateObject = isProxyState ? cur : {...cur}
        return isAvailableArray(children) ? prev.concat(flattenArray(children, isProxyState), proxyStateObject) : prev.concat(proxyStateObject)
    }, [])
}
/**
 *  @description 寻找某个节点下所有的子节点不包括当前节点
 *  @description isProxyState: 子节点是否保持响应式   默认:false
 *  @return TreeData[]
 * */
export const findTreeChildrenNode = (arr: TreeData[] | Ref<TreeData[]>, id: string | Ref<string>, isProxyState: boolean): TreeData[] => {
    const nodeId = unref(id);
    const flattenList = flattenArray(arr, isProxyState);
    const nodeList = flattenArray(flattenList.filter(item => item.key === nodeId), isProxyState);
    return isAvailableArray(nodeList) ? nodeList.filter(item => item.key !== nodeId) : []
}
/**
 *  @description 寻找某个节点的父节点id
 *  @return string[] | []
 * */
export const findParentNodeKey = (tree: TreeData[] | Ref<TreeData[]>, nodeId: string): string[] | [] => getIds(toFlatArray(tree), nodeId);
/**
 *  @description 寻找某个节点的所有父节点
 *  @description isProxyState:  父节点是否保持响应式   默认:false   linealNode : 是否只要直系节点
 *  @return TreeData[]
 * */
export const findParentNode = (tree: TreeData[], nodeId: string, isProxyState: boolean, linealNode = false): TreeData[] => getParentObjectByKeys(toFlatArray(tree), nodeId, isProxyState, linealNode);
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
// 返回所有父亲节点对象
const getParentObjectByKeys = (flatArray: TreeData[] | Ref<TreeData[]>, nodeId: string, IsProxyState: boolean, linealNode: boolean): TreeData[] => {
    let parentArray: TreeData[] = [];
    let child = unref(flatArray).find(tree => tree.key === nodeId);
    // 寻找全部父节点，递归
    if (!linealNode) {
        while (child) {
            parentArray = IsProxyState ? parentArray.concat(child) : parentArray.concat({...child});
            child = unref(flatArray).find(tree => tree.key === child?.parentId)
        }
    } else {
        // 寻找直系节点
        if (child) {
            let linealParentNode = unref(flatArray).find((tree) => tree.key === child?.parentId);
            if (linealParentNode) {
                parentArray = IsProxyState ? parentArray.concat(linealParentNode) : parentArray.concat({...linealParentNode});
            }
        }
    }
    return parentArray.filter(item => item.key !== nodeId);
}
