/*
 * @Author: zxy
 * @Date: 2021-06-29 17:23:19
 * @LastEditTime: 2021-06-29 17:30:10
 * @FilePath: /my-blog/src/assets/ts/markdownEditorSet.ts
 */
import { createApp } from 'vue'
import App from '../../App.vue'
// markdown编辑器
import VueMarkdownEditor from '@kangc/v-md-editor';
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// 主题
import Prism from 'prismjs';
// highlightjs
import hljs from 'highlight.js';

// 引入todoList
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';

// 引入流程图等图形
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn';
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css';

// 引入表情包
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';

// 代码行号
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';

// 高亮代码行
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css';

// 快速复制代码
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

// codemirror 编辑器的相关资源
import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/vue/vue';
// edit
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';
// markdown编译器end

const de = () => {
  // 编译器中间件
  VMdEditor.Codemirror = Codemirror;
  VMdEditor.use(vuepressTheme, {
    Prism,
  });
  VMdEditor.use(createTodoListPlugin());
  VMdEditor.use(createMermaidPlugin());
  VMdEditor.use(createEmojiPlugin());
  VMdEditor.use(createLineNumbertPlugin())
  VMdEditor.use(createHighlightLinesPlugin())
  VMdEditor.use(createCopyCodePlugin())
  // 编译器中间件end

  const app = createApp(App)
  app.use(VMdEditor);
}

export {
  de
}
