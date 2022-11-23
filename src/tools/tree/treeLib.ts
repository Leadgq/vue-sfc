// 压平数组
import { TreeData } from "@/types/tree";
import { Ref } from "vue";
import { isAvailableArray } from "@/tools/lib";

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
export const findTreeChildrenNode = (arr: TreeData[] | Ref<TreeData[]>, id: string | Ref<string>, isProxyState = false): TreeData[] => {
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
export const findTreeParentNode = (tree: TreeData[] | Ref<TreeData[]>, nodeId: string, isProxyState = false, linealNode = false, pass = false): TreeData[] => {
    return getParentObjectByKeys(toFlatArray(tree), nodeId, isProxyState, linealNode, pass);
};

// 获取所有兄弟节点
export const findAllBrotherNode = (tree: TreeData[] | Ref<TreeData[]>, nodeId: string, isProxyState = false): TreeData[] | [] => {
    // 获取直系父节点
    const parentNode = findTreeParentNode(tree, nodeId, isProxyState, true);
    const key = parentNode.at(0)?.key;
    if (parentNode && key) {
        // 获取当前父节点所有子节点
        return findTreeChildrenNode(parentNode, key, isProxyState).filter(item => item.key !== nodeId);
    } else {
        if (import.meta.env.VITE_ENVIRONMENT === 'server') {
            console.warn('current node may be rootNde or not parent node')
        }
        return [];
    }
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


// 返回所有父亲节点对象
const getParentObjectByKeys = (flatArray: TreeData[] | Ref<TreeData[]>, nodeId: string, IsProxyState: boolean, linealNode: boolean, pass = false): TreeData[] => {
    let parentArray: TreeData[] = [];
    let child = unref(flatArray).find(tree => tree.key === nodeId);
    // 寻找全部父节点，递归
    if (!linealNode) {
        while (child) {
            parentArray = IsProxyState ? parentArray.concat(child) : parentArray.concat({ ...child });
            child = unref(flatArray).find(tree => tree.key === child?.parentId);
        }
    } else {
        // 寻找直系节点
        if (child) {
            let linealParentNode = unref(flatArray).find((tree) => tree.key === child?.parentId);
            if (linealParentNode) {
                parentArray = IsProxyState ? parentArray.concat(linealParentNode) : parentArray.concat({ ...linealParentNode });
            }
        }
    }
    if (pass) {
        return parentArray;
    } else {
        return parentArray.filter(item => item.key !== nodeId);
    }
};
// 返回路径、如果最深的节点相同、那么返回最后一个
export const findMaxTreeNode = (flatTree: TreeData[]) => {
    const treeData = toFlatArray(flatTree);
    const tree = treeData.filter(item => !isAvailableArray(item.children));
    let parentList: any[] = [];
    tree.forEach((item) => parentList = [...parentList, findTreeParentNode(flatTree, item.key,false,false,true)]);
    const parentArray = parentList.sort((a, b) => a.length - b.length).at(-1);
    if (isAvailableArray(parentArray)) {
        return arrToTree(parentArray, parentArray.at(-1).key);
    }
};
const arrToTree = (arr: TreeData[], pid: string | number) => {
    let deep = 0;
    const data = [];
    let root = arr.find(item => item.key === pid);
    data.push(root);
    while (root) {
        deep++;
        let child = arr.find(item => item.parentId === root?.key);
        if (child) {
            root.children = [];
            root.children.push(child);
        }
        root = child;
    }
    return {
        data,
        deep
    };
};
