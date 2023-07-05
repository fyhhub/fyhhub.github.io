import{_ as n}from"./plugin-vueexport-helper.2444895f.js";import{o as s,c as a,e as t}from"./app.ace3d4ec.js";const p={},e=t(`<h1 id="husky\u3001eslint\u3001lint-staged-\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#husky\u3001eslint\u3001lint-staged-\u914D\u7F6E" aria-hidden="true">#</a> husky\u3001eslint\u3001lint-staged \u914D\u7F6E</h1><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>
<span class="token comment">// package.json</span>
<span class="token punctuation">{</span>
	<span class="token property">&quot;husky&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;hooks&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;pre-commit&quot;</span><span class="token operator">:</span> <span class="token string">&quot;npm run format&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;commit-msg&quot;</span><span class="token operator">:</span> <span class="token string">&quot;commitlint -E HUSKY_GIT_PARAMS&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;lint-staged&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;*.js&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;prettier --write&quot;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;*.ts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;prettier --parser=typescript --write&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;eslint&quot;</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token property">&quot;devDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;@commitlint/cli&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^13.2.1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;@commitlint/config-conventional&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^13.2.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;@typescript-eslint/parser&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^5.2.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;eslint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^8.1.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;eslint-plugin-prettier&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.0.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;husky&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.3.8&quot;</span><span class="token punctuation">,</span>  <span class="token comment">// \u6CE8\u610F\u8FD9\u91CC\u7248\u672C \u9AD8\u7248\u672C\u4F1A\u4E0D\u8D77\u4F5C\u7528</span>
    <span class="token property">&quot;lint-staged&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^11.2.6&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;prettier&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.4.1&quot;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token comment">// commitlint.config.js</span>
const types = <span class="token punctuation">[</span>
  &#39;build&#39;<span class="token punctuation">,</span>
  &#39;ci&#39;<span class="token punctuation">,</span>
  &#39;chore&#39;<span class="token punctuation">,</span>
  &#39;docs&#39;<span class="token punctuation">,</span>
  &#39;feat&#39;<span class="token punctuation">,</span>
  &#39;fix&#39;<span class="token punctuation">,</span>
  &#39;pref&#39;<span class="token punctuation">,</span>
  &#39;refactor&#39;<span class="token punctuation">,</span>
  &#39;revert&#39;<span class="token punctuation">,</span>
  &#39;style&#39;<span class="token punctuation">,</span>
  &#39;test&#39;
<span class="token punctuation">]</span>;

typeEnum = <span class="token punctuation">{</span>
  rules<span class="token operator">:</span> <span class="token punctuation">{</span>
    &#39;type-enum&#39;<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> &#39;always&#39;<span class="token punctuation">,</span> types<span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  value<span class="token operator">:</span> () =&gt; types
<span class="token punctuation">}</span>;

module.exports = <span class="token punctuation">{</span>
  extends<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;@commitlint/config-conventional&quot;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  rules<span class="token operator">:</span> <span class="token punctuation">{</span>
    &#39;type-case&#39;<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    &#39;type-empty&#39;<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    &#39;scope-empty&#39;<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    &#39;scope-case&#39;<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    &#39;subject-full-stop&#39;<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> &#39;never&#39;<span class="token punctuation">]</span><span class="token punctuation">,</span>
    &#39;subject-case&#39;<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> &#39;never&#39;<span class="token punctuation">]</span><span class="token punctuation">,</span>
    &#39;header-max-length&#39;<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> &#39;always&#39;<span class="token punctuation">,</span> <span class="token number">72</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    &#39;type-enum&#39;<span class="token operator">:</span> typeEnum.rules<span class="token punctuation">[</span>&#39;type-enum&#39;<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code><span class="token comment">// .eslintrc.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token string">&quot;@typescript-eslint/parser&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">&quot;module&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;prettier&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;no-unused-vars&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;no-restricted-syntax&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;error&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;ObjectExpression &gt; SpreadElement&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;ObjectPattern &gt; RestElement&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;AwaitExpression&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;always&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code><span class="token comment">// .prettierrc</span>
<span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token literal-property property">singleQuote</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token literal-property property">printWidth</span><span class="token operator">:</span> <span class="token number">80</span><span class="token punctuation">;</span>
<span class="token literal-property property">trailingComma</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">;</span>
<span class="token literal-property property">arrowParens</span><span class="token operator">:</span> <span class="token string">&quot;avoid&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),o=[e];function i(l,c){return s(),a("div",null,o)}const d=n(p,[["render",i],["__file","husky\u3001eslint\u3001lint-staged\u914D\u7F6E.html.vue"]]);export{d as default};
