import {sfc} from "@/types/sfc";

export default {
    id: 13,
    name: "reactive和ref的测试",
    componentName: "ref-component",
    desc: `ref和reactive在默认放入的都需要进行浅拷贝、否则当值改变那么数组默认放入的也会改变`
} as sfc;
