export interface TreeData {
    key: string;
    title: string;
    parentId?: string;
    showCheck?: boolean;
    children: TreeData[];
    indeterminate: boolean,
    check: Boolean
}
