export interface TreeData {
    key: string;
    title: string;
    parentId?: string;
    children: TreeData[];
    indeterminate: boolean,
    check: Boolean
}
