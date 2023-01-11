import{_ as n}from"./plugin-vueexport-helper.2444895f.js";import{o as s,c as a,d as t}from"./app.6bdc584a.js";const e={},p=t(`<h1 id="_1-vue2-\u7684-diff-\u7B97\u6CD5" tabindex="-1"><a class="header-anchor" href="#_1-vue2-\u7684-diff-\u7B97\u6CD5" aria-hidden="true">#</a> 1.vue2 \u7684 diff \u7B97\u6CD5</h1><h3 id="diff-\u7B97\u6CD5\u8FC7\u7A0B" tabindex="-1"><a class="header-anchor" href="#diff-\u7B97\u6CD5\u8FC7\u7A0B" aria-hidden="true">#</a> diff \u7B97\u6CD5\u8FC7\u7A0B</h3><p>diff \u7B97\u6CD5\u6BD4\u8F83\u5173\u952E\u7684\u662F sameVnode \u5224\u65AD\u4E24\u4E2A\u8282\u70B9\u662F\u5426\u76F8\u540C</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u5224\u65AD\u4E24\u4E2A\u8282\u70B9\u662F\u5426\u76F8\u540C</span>
<span class="token keyword">function</span> <span class="token function">sameVnode</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    a<span class="token punctuation">.</span>key <span class="token operator">===</span> b<span class="token punctuation">.</span>key <span class="token operator">&amp;&amp;</span>
    a<span class="token punctuation">.</span>asyncFactory <span class="token operator">===</span> b<span class="token punctuation">.</span>asyncFactory <span class="token operator">&amp;&amp;</span>
    <span class="token punctuation">(</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>tag <span class="token operator">===</span> b<span class="token punctuation">.</span>tag <span class="token operator">&amp;&amp;</span>
      a<span class="token punctuation">.</span>isComment <span class="token operator">===</span> b<span class="token punctuation">.</span>isComment <span class="token operator">&amp;&amp;</span>
      <span class="token function">isDef</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>data<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token function">isDef</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>data<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
      <span class="token function">sameInputType</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span>
      <span class="token punctuation">(</span><span class="token function">isTrue</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>isAsyncPlaceholder<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isUndef</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>asyncFactory<span class="token punctuation">.</span>error<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>while(\u65E7\u9996\u6307\u9488 &lt;= \u65E7\u5C3E\u6307\u9488 &amp;&amp; \u65B0\u9996\u6307\u9488 &lt;= \u65B0\u5C3E\u6307\u9488) {</strong></p><ol><li><p><strong>\u65E7\u9996\u8282\u70B9\u5982\u679C\u4E0D\u5B58\u5728</strong>\uFF0C\u65E7\u9996\u6307\u9488<code>\u5411\u53F3\u79FB\u52A81\u4F4D</code></p></li><li><p><strong>\u65E7\u5C3E\u8282\u70B9\u5982\u679C\u4E0D\u5B58\u5728</strong>\uFF0C\u65E7\u5C3E\u6307\u9488<code>\u5411\u5DE6\u79FB\u52A81\u4F4D</code></p></li><li><p><strong>\u65E7\u9996\u8282\u70B9\u548C\u65B0\u9996\u8282\u70B9</strong> <code>sameVnode</code> \u5BF9\u6BD4\u76F8\u540C\uFF0C\u7EE7\u7EED\u9012\u5F52<code>patch</code>\u5B50\u8282\u70B9\uFF0C\u65E7\u9996\u6307\u9488<code>\u5411\u53F3\u79FB\u52A81\u4F4D</code>\uFF0C\u65B0\u9996\u6307\u9488<code>\u5411\u53F3\u79FB\u52A81\u4F4D</code></p></li><li><p><strong>\u65E7\u5C3E\u8282\u70B9\u548C\u65B0\u5C3E\u8282\u70B9</strong> <code>sameVnode</code> \u5BF9\u6BD4\u76F8\u540C\uFF0C\u7EE7\u7EED\u9012\u5F52<code>patch</code>\u5B50\u8282\u70B9\uFF0C\u65E7\u5C3E\u6307\u9488<code>\u5411\u5DE6\u79FB\u52A81\u4F4D</code>\uFF0C\u65B0\u5C3E\u6307\u9488<code>\u5411\u5DE6\u79FB\u52A81\u4F4D</code></p></li><li><p><strong>\u65E7\u9996\u8282\u70B9\u548C\u65B0\u5C3E\u8282\u70B9</strong> <code>sameVnode</code> \u5BF9\u6BD4\u76F8\u540C\uFF0C\u7EE7\u7EED\u9012\u5F52<code>patch</code>\u5B50\u8282\u70B9\uFF0C\u5C06<strong>\u65E7\u9996\u7ED3\u70B9</strong>\u79FB\u52A8\u5230\u5C3E\u90E8\uFF0C\u65E7\u9996\u6307\u9488<code>\u5411\u53F3\u79FB\u52A81\u4F4D</code>\uFF0C \u65B0\u5C3E\u6307\u9488<code>\u5411\u5DE6\u79FB\u52A81\u4F4D</code></p></li><li><p><strong>\u65E7\u5C3E\u7ED3\u70B9\u548C\u65B0\u9996\u8282\u70B9</strong> <code>sameVnode</code> \u5BF9\u6BD4\u76F8\u540C\uFF0C\u7EE7\u7EED\u9012\u5F52<code>patch</code>\u5B50\u8282\u70B9\uFF0C\u5C06<strong>\u65E7\u5C3E\u7ED3\u70B9</strong>\u79FB\u52A8\u5230\u9996\u90E8\uFF0C\u65E7\u5C3E\u6307\u9488<code>\u5411\u5DE6\u79FB\u52A81\u4F4D</code>\uFF0C \u65B0\u9996\u6307\u9488<code>\u5411\u53F3\u79FB\u52A81\u4F4D</code></p></li><li><p>\u4EE5\u4E0A\u90FD\u672A\u6EE1\u8DB3\uFF0C\u6839\u636E\u65E7\u5217\u8868\u8282\u70B9\u521B\u5EFA<code>Map{key =&gt; index}</code>\uFF0C\u62FF\u5230<strong>\u65B0\u9996\u8282\u70B9</strong>\u7684 key, \u5224\u65AD\u5728<code>key map</code>\u4E2D\u5B58\u5728\uFF0C<strong>\u5982\u679C\u6709\u83B7\u53D6\u5176\u7D22\u5F15\u76F4\u63A5\u4F7F\u7528\uFF0C\u5426\u5219\u9700\u8981\u904D\u5386\u65E7\u8282\u70B9\u5217\u8868</strong>\uFF0C\u627E\u5230\u7D22\u5F15\uFF0C\u8FD9\u4E5F\u662F<strong>diff \u7B97\u6CD5\u4E2D key \u7684\u4F5C\u7528</strong></p></li></ol><p>8.\u5982\u679C\u4ECD\u7136\u6CA1\u6709\u62FF\u5230\u65B0\u8282\u70B9\u5728\u65E7\u5217\u8868\u4E2D\u7684\u7D22\u5F15\uFF0C\u8BF4\u660E\u662F\u5168\u65B0\u8282\u70B9\uFF0C\u9700\u8981\u7EE7\u7EED\u521B\u5EFA</p><p>9.\u5982\u679C\u62FF\u5230\u7D22\u5F15\uFF0C\u5BF9\u5E94\u7D22\u5F15\u4E0A\u7684\u8282\u70B9\u548C\u65B0\u8282\u70B9 <code>sameVnode</code> \u8FDB\u884C\u5BF9\u6BD4\uFF0C\u5982\u679C\u76F8\u540C\uFF0C\u5219\u9700\u8981\u79FB\u52A8\u4F4D\u7F6E\u6216\u8005\u7EE7\u7EED\u9012\u5F52\u5BF9\u6BD4\u66F4\u65B0\uFF1B\u5426\u5219\u9700\u8981\u521B\u5EFA\u65B0\u8282\u70B9\uFF1B</p><ol start="10"><li><p>\u65B0\u9996\u6307\u9488<code>\u5411\u53F3\u79FB\u52A81\u4F4D</code></p></li><li><p>\u6700\u540E\u4E0D\u7BA1\u4EC0\u4E48\u60C5\u51B5\u90FD\u4F1A\u6267\u884C\u5982\u4E0B\u4EE3\u7801</p></li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>oldStartIdx <span class="token operator">&gt;</span> oldEndIdx<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  refElm <span class="token operator">=</span> <span class="token function">isUndef</span><span class="token punctuation">(</span>newCh<span class="token punctuation">[</span>newEndIdx <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> newCh<span class="token punctuation">[</span>newEndIdx <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>elm<span class="token punctuation">;</span>
  <span class="token function">addVnodes</span><span class="token punctuation">(</span>
    parentElm<span class="token punctuation">,</span>
    refElm<span class="token punctuation">,</span>
    newCh<span class="token punctuation">,</span>
    newStartIdx<span class="token punctuation">,</span>
    newEndIdx<span class="token punctuation">,</span>
    insertedVnodeQueue
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>newStartIdx <span class="token operator">&gt;</span> newEndIdx<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">removeVnodes</span><span class="token punctuation">(</span>oldCh<span class="token punctuation">,</span> oldStartIdx<span class="token punctuation">,</span> oldEndIdx<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0D\u65AD\u5BF9\u6BD4\u7684\u8FC7\u7A0B\u4F7F\u5F97 oldStartIndex \u4E0D\u65AD\u903C\u8FD1 oldEndIndex\uFF0CnewStartIndex \u4E0D\u65AD\u903C\u8FD1 newEndIndex\u3002\u5F53<strong>\u65E7\u5C3E\u7ED3\u70B9 &lt;= \u65E7\u9996\u8282\u70B9</strong>\u8BF4\u660E<code>\u65E7\u8282\u70B9\u5DF2\u7ECF\u904D\u5386\u5B8C\u4E86</code>\uFF0C\u6B64\u65F6\u53EA\u8981\u6279\u91CF\u589E\u52A0\u65B0\u8282\u70B9\u5373\u53EF\u3002\u5F53<strong>\u65B0\u5C3E\u7ED3\u70B9 &lt;= \u65B0\u9996\u8282\u70B9</strong> \u8BF4\u660E<code>\u65E7\u8282\u70B9\u8FD8\u6709\u5269\u4E0B</code>\uFF0C\u6B64\u65F6\u53EA\u8981\u6279\u91CF\u5220\u9664\u65E7\u8282\u70B9\u5373\u53EF</p>`,11),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","1.vue2\u7684diff\u7B97\u6CD5.html.vue"]]);export{r as default};
