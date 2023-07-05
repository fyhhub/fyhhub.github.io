import{_ as n}from"./plugin-vueexport-helper.2444895f.js";import{o as s,c as a,e as t}from"./app.ace3d4ec.js";const p={},e=t(`<h1 id="\u5B9E\u73B0-redux" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u73B0-redux" aria-hidden="true">#</a> \u5B9E\u73B0 redux</h1><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">createStore</span><span class="token punctuation">(</span><span class="token parameter">reducer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> currentState <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> currentListeners <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">function</span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token parameter">action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    currentState <span class="token operator">=</span> <span class="token function">reducer</span><span class="token punctuation">(</span>currentState<span class="token punctuation">,</span> action<span class="token punctuation">)</span><span class="token punctuation">;</span>
    currentListeners<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">function</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> currentState<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">function</span> <span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token parameter">listen</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    currentListeners<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>listen<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> index <span class="token operator">=</span> currentListeners<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>listen<span class="token punctuation">)</span><span class="token punctuation">;</span>
      currentListeners<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&quot;REDUX/XXX&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    dispatch<span class="token punctuation">,</span>
    getState<span class="token punctuation">,</span>
    subscribe<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),c=[e];function o(i,u){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","\u5B9E\u73B0redux.html.vue"]]);export{k as default};
