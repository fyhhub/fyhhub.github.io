import{_ as n}from"./plugin-vueexport-helper.2444895f.js";import{o as s,c as a,d as t}from"./app.6bdc584a.js";const p={},e=t(`<h1 id="node\u73AF\u5883\u4E0Bdebug\u6A21\u5F0F\u8BBE\u7F6E" tabindex="-1"><a class="header-anchor" href="#node\u73AF\u5883\u4E0Bdebug\u6A21\u5F0F\u8BBE\u7F6E" aria-hidden="true">#</a> node\u73AF\u5883\u4E0Bdebug\u6A21\u5F0F\u8BBE\u7F6E</h1><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> prefix <span class="token operator">=</span> <span class="token string">&#39;devflow&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> debugIndex <span class="token operator">=</span> process<span class="token punctuation">.</span>argv<span class="token punctuation">.</span><span class="token function">findIndex</span><span class="token punctuation">(</span><span class="token parameter">arg</span> <span class="token operator">=&gt;</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^(?:-d|--debug)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u5224\u65AD\u662F\u5426\u5B58\u5728 --debug</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>debugIndex <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> value <span class="token operator">=</span> process<span class="token punctuation">.</span>argv<span class="token punctuation">[</span>debugIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>value <span class="token operator">||</span> value<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">&#39;-&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    value <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>prefix<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">:*</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// support debugging multiple flags with comma-separated list</span>
    value <span class="token operator">=</span> value
      <span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;,&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>prefix<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>v<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;,&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">DEBUG</span> <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>
    process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">DEBUG</span> <span class="token operator">?</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">DEBUG</span> <span class="token operator">+</span> <span class="token string">&#39;,&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
  <span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","node\u73AF\u5883\u4E0Bdebug\u6A21\u5F0F\u8BBE\u7F6E.html.vue"]]);export{k as default};
