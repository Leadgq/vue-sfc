<template>
  <div class="editor-container">
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <EditorComponent
        style="min-height: 400px; overflow-y: auto;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import userStore from "@/store/userStore";
import "@wangeditor/editor/dist/css/style.css";
import { Editor as EditorComponent, Toolbar } from "@wangeditor/editor-for-vue";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";

const userStoreInstance = userStore();
// 实例
const editorRef = shallowRef<IDomEditor | null>(null);
// 富文本内容
let valueHtml = ref("");
let mode = "default";
// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {};
// 编辑器配置
let editorConfig: Partial<IEditorConfig> = {
  placeholder: "请输入内容...",
  MENU_CONF: {
    uploadImage: {
      server: "/api/upload",
      headers: {
        Authorization: userStoreInstance.userInfo.token
      },
      customInsert: undefined as undefined | Function,
      fieldName: "file"
    }
  }
};
// 初始化
const handleCreated = (editor: IDomEditor) => editorRef.value = editor;
onMounted(() => setEditorSetting());
// 配置上传图片
const setEditorSetting = () => editorConfig.MENU_CONF!.uploadImage.customInsert = customInsert;
// 自定上传函数
const customInsert = (res: any, insertFn: Function) => {
  insertFn();
};
</script>
<script lang="ts">
export default {
  name: "editor"
};
</script>

<style lang="scss" scoped>
.editor-container {
  @apply w-[500px] h-[400px]
}
</style>
