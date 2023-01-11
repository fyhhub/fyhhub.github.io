import{_ as a}from"./plugin-vueexport-helper.2444895f.js";import{o as n,c as s,d as e}from"./app.6bdc584a.js";const t={},i=e(`<h1 id="\u8DEF\u7531\u6709\u54EA\u4E9B\u6A21\u5F0F\u548C\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#\u8DEF\u7531\u6709\u54EA\u4E9B\u6A21\u5F0F\u548C\u533A\u522B" aria-hidden="true">#</a> \u8DEF\u7531\u6709\u54EA\u4E9B\u6A21\u5F0F\u548C\u533A\u522B</h1><h2 id="hash" tabindex="-1"><a class="header-anchor" href="#hash" aria-hidden="true">#</a> hash</h2><ul><li><p>\u826F\u597D\u7684\u517C\u5BB9\u6027</p></li><li><p>hash \u6539\u53D8\u4F1A\u89E6\u53D1<code>hashchange\u4E8B\u4EF6</code></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u76D1\u542Chash\u53D8\u5316\uFF0C\u70B9\u51FB\u6D4F\u89C8\u5668\u7684\u524D\u8FDB\u540E\u9000\u4F1A\u89E6\u53D1</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>
  <span class="token string">&quot;hashchange&quot;</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> newURL <span class="token operator">=</span> event<span class="token punctuation">.</span>newURL<span class="token punctuation">;</span> <span class="token comment">// hash \u6539\u53D8\u540E\u7684\u65B0 url</span>
    <span class="token keyword">let</span> oldURL <span class="token operator">=</span> event<span class="token punctuation">.</span>oldURL<span class="token punctuation">;</span> <span class="token comment">// hash \u6539\u53D8\u524D\u7684\u65E7 url</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token boolean">false</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u53EF\u4EE5\u901A\u8FC7<code>location.hash</code>\u83B7\u53D6\u548C\u4FEE\u6539<code>hash</code></p></li></ul><h2 id="history" tabindex="-1"><a class="header-anchor" href="#history" aria-hidden="true">#</a> history</h2><ul><li><p>\u517C\u5BB9 HTML5 \u7684 history api</p></li><li><p>\u5E38\u7528\u7684 api</p><ul><li>history.pushState</li><li>history.replaceState</li></ul></li><li><p>\u4F1A\u89E6\u53D1<code>popstate</code>\u4E8B\u4EF6</p></li></ul><h2 id="abstract" tabindex="-1"><a class="header-anchor" href="#abstract" aria-hidden="true">#</a> abstract</h2><ul><li>\u652F\u6301 Node \u670D\u52A1\u7AEF\u4F7F\u7528\uFF0C\u53EF\u4EE5\u7528\u6765\u6A21\u62DF\u6D4F\u89C8\u5668\u7684\u8DEF\u7531\u6808</li></ul>`,7),o=[i];function c(l,p){return n(),s("div",null,o)}const u=a(t,[["render",c],["__file","\u8DEF\u7531\u6709\u54EA\u4E9B\u6A21\u5F0F\u548C\u533A\u522B.html.vue"]]);export{u as default};
