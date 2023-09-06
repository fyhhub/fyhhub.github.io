import { utoa } from '../utils';
import MarkdownItContainer from 'markdown-it-container';
export function VueReplMdPlugin(md: markdownit) {
  const defaultRender = md.renderer.rules.fence;
  md.use(MarkdownItContainer, 'playground', {
    validate: function(params) {
      return params.trim().match(/^playground\s*(.*)$/);
    },
    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^playground\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        const vueToken = tokens.find(e => e.info === 'vue');
        console.log("%c Line:13 🍣 vueToken", "color:#ea7e5c", vueToken);
        return `<VuePlayground>${encodeURIComponent(vueToken.content)}\n`;
      } else {
        // closing tag
        return '</VuePlayground>\n';
      }
    }
  })

  // fence 会匹配 ```xxx 的markdown token
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    // 获取 ```js 的token
    const token = tokens[idx];
    // 判断该 ```js 是否在 :::demo 内
    const prevToken = tokens[idx - 1];
    // 存在前一个token && token是一个正常tag标签 && 存在demo标记
    const inPlayground = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^playground\s*(.*)$/);
    // 当前token是 ```html 并且 在demo块中, 不去渲染内容
    if (token.info === 'vue' && inPlayground) {
      return '';
    }
    return defaultRender!(tokens, idx, options, env, self);
  };
}
