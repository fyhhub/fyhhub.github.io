import{_ as e}from"./plugin-vueexport-helper.2444895f.js";import{o,c as n,d as i}from"./app.6bdc584a.js";const d={},a=i(`<h1 id="pnpm\u7BA1\u7406monorepo" tabindex="-1"><a class="header-anchor" href="#pnpm\u7BA1\u7406monorepo" aria-hidden="true">#</a> pnpm\u7BA1\u7406monorepo</h1><h2 id="\u914D\u7F6E\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u6587\u4EF6" aria-hidden="true">#</a> \u914D\u7F6E\u6587\u4EF6</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># pnpm-workspace.yaml
packages:
  # \u6240\u6709\u5728 packages/  \u5B50\u76EE\u5F55\u4E0B\u7684 package
  - &#39;packages/**&#39;
  # \u4E0D\u5305\u62EC\u5728 test \u6587\u4EF6\u5939\u4E0B\u7684 package
  - &#39;!**/test/**&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u547D\u4EE4" aria-hidden="true">#</a> \u547D\u4EE4</h2><ul><li><code>pnpm i typescript -w</code> \u5728\u6839\u76EE\u5F55\u5B89\u88C5\u4F9D\u8D56</li><li><code>pnpm i typescript -w -D</code> \u5728\u6839\u76EE\u5F55\u5B89\u88C5\u5F00\u53D1\u4F9D\u8D56</li><li><code>pnpm add express --filter @monorepo/http</code> \u7ED9\u67D0\u4E2A\u5305\u5355\u72EC\u5B89\u88C5\u4F9D\u8D56</li><li><code>pnpm add @monorepo/http@* --filter @monorepo/web</code> \u9879\u76EE\u5305\u4E92\u76F8\u4F9D\u8D56\uFF0C@monorepo/web \u5B89\u88C5\u4F9D\u8D56 <code>@monorepo/http</code></li><li><code>pnpm why -r</code> \u80FD\u591F\u5217\u51FA\u8FD9\u4E2A\u5305\u7684\u6E90\u7801\u4F4D\u7F6E\uFF0C\u88ABmonorepo\u5185\u90E8\u54EA\u4E9B\u9879\u76EE\u5F15\u7528\u4E86</li><li><code>pnpm remove axios --filter @monorepo/http</code> \u5220\u9664\u67D0\u4E2A\u5305\u7684\u4F9D\u8D56</li><li><code>pnpm link --global &lt;pkg&gt;</code> \u672C\u5730link\u5305</li><li><code>pnpm add lodash-test@npm:lodash@1.1</code> \u7ED9\u5305\u53D6\u522B\u540D</li></ul>`,5),p=[a];function r(c,l){return o(),n("div",null,p)}const m=e(d,[["render",r],["__file","pnpm\u7BA1\u7406monorepo.html.vue"]]);export{m as default};
