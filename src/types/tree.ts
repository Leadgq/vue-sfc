export interface TreeData {
    key: string;
    title: string;
    parentId?: string;
    children: TreeData[];
    check: Boolean
}
