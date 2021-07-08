/*
 * @Author: zxy
 * @Date: 2021-04-18 00:15:31
 * @LastEditTime: 2021-07-09 00:09:05
 * @FilePath: /my-blog/src/shims-vue.d.ts
 */
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@kangc/v-md-editor/lib/codemirror-editor';
declare module '@kangc/v-md-editor/lib/theme/github.js';
declare module 'prismjs';
declare module 'codemirror';
declare module '@kangc/v-md-editor/lib/theme/vuepress.js'
declare module '@kangc/v-md-editor/lib/plugins/mermaid/cdn'
declare module '@kangc/v-md-editor'
declare module '@kangc/v-md-editor/lib/plugins/todo-list/index'
declare module '@kangc/v-md-editor/lib/plugins/emoji/index'
declare module '@kangc/v-md-editor/lib/plugins/line-number/index';
declare module '@kangc/v-md-editor/lib/plugins/highlight-lines/index'
declare module '@kangc/v-md-editor/lib/plugins/copy-code/index'
declare module '@kangc/v-md-editor/lib/preview'
declare module 'vue3-clipboard'
