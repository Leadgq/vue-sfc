import type { App, VNode } from "vue";
import loading from "./loading.vue";
import { createVNode, render } from "vue";
export default {
  install(app: App) {
    const vNode: VNode = createVNode(loading);
    render(vNode, document.body);
    app.config.globalProperties.$loadings = {
      show: vNode.component?.exposed?.show,
      hidden: vNode.component?.exposed?.hidden,
    };
  },
};
