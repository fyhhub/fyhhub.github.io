import{_ as p}from"./plugin-vueexport-helper.2444895f.js";import{o,c,e as s,a as l,w as i,d as n,r as a,b as u}from"./app.6bdc584a.js";const r={},k=n(`<h1 id="webpackignore-\u4F18\u5316-moment" tabindex="-1"><a class="header-anchor" href="#webpackignore-\u4F18\u5316-moment" aria-hidden="true">#</a> webpackIgnore \u4F18\u5316 moment</h1><p>\u5F53\u4F60\u5728\u4EE3\u7801\u4E2D\u5199<code>import moment from &#39;moment&#39;</code>\uFF0C\u901A\u8FC7\u6253\u5305\u5206\u6790\u4F1A\u53D1\u73B0<code>moment</code>\u6240\u5360\u7528\u7684\u5927\u5C0F\u6BD4\u60F3\u8C61\u4E2D\u5927\u4E0D\u5C11\uFF0C\u800C\u6211\u4EEC\u53EA\u662F\u7528\u4E86\u5176\u4E2D\u7684\u65E5\u671F\u89E3\u6790\u529F\u80FD\u3002 \u5176\u5B9E\u5B83\u7684\u5927\u90E8\u5206\u4F53\u79EF\u90FD\u5728<code>\u8BED\u8A00\u5305</code>\u4E0A\uFF0C\u6211\u4EEC\u53EA\u9700\u8981\u6392\u9664\u6389\u8FD9\u4E00\u90E8\u5206\uFF0C\u5C31\u80FD\u51CF\u5C11\u6700\u7EC8\u7684\u5305\u4F53\u79EF\u3002\u5E38\u7528\u7684\u65B9\u6848\u5982\u4E0B</p><p><strong>\u8BE5\u63D2\u4EF6\u652F\u6301\u7684\u5199\u6CD5\u5982\u4E0B</strong></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// 1.</span>
<span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>IgnorePlugin</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\\.\\/locale$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">moment$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 2.</span>
<span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>IgnorePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">resourceRegExp</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\\.\\/locale$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
  <span class="token literal-property property">contextRegExp</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">moment$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 3.</span>
<span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>IgnorePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function-variable function">checkResource</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">request<span class="token punctuation">,</span> context</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u4F5C\u7528\u540CresourceRegExp</span>
    <span class="token keyword">return</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\\.\\/locale$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">checkContext</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u4F5C\u7528\u540CcontextRegExp</span>
    <span class="token keyword">return</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">moment$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5B9E\u73B0\u539F\u7406" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u73B0\u539F\u7406" aria-hidden="true">#</a> \u5B9E\u73B0\u539F\u7406</h2><p>\u9996\u5148\u6211\u4EEC\u9700\u8981\u4E86\u89E3\u4E00\u4E0B<code>webpack</code>\u5728\u6B64\u5904\u5BF9\u6587\u4EF6\u89E3\u6790\u7684\u8FC7\u7A0B</p>`,6),d=n(`<h3 id="_1-\u89E6\u53D1-hook" tabindex="-1"><a class="header-anchor" href="#_1-\u89E6\u53D1-hook" aria-hidden="true">#</a> 1. \u89E6\u53D1 hook</h3><p><code>NormalModuleFactory</code>\u4E2D\u6CE8\u518C\u4E86\u5F88\u591A\u6A21\u5757\u89E3\u6790\u76F8\u5173\u7684<code>hook</code>,\u5176\u4E2D<code>beforeResolve</code>\u662F<code>AsyncSeriesWaterfallHook</code>, \u4E5F\u5C31\u662F\u8BF4\u5B83\u662F<code>\u53EF\u4E2D\u65AD\u5F02\u6B65\u4E32\u884C\u94A9\u5B50</code></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token literal-property property">beforeResolve</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">AsyncSeriesWaterfallHook</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;data&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u63A5\u6536\u53C2\u6570\u5982\u4E0B,\u540E\u9762\u7684\u6E90\u7801\u4E2D\u4F1A\u7528\u5230</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">contextInfo</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">compiler</span><span class="token operator">:</span> <span class="token keyword">undefined</span>
    <span class="token literal-property property">issuer</span><span class="token operator">:</span> <span class="token string">&#39;\u6587\u4EF6\u5B8C\u6574\u8DEF\u5F84&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  resolveOptions<span class="token punctuation">,</span>
  context<span class="token punctuation">,</span>  <span class="token comment">// \u6587\u4EF6\u6240\u5728\u9879\u76EE\u6839\u76EE\u5F55</span>
  request<span class="token punctuation">,</span> <span class="token comment">// \u4EE3\u7801\u91CC\u5199\u7684\u8DEF\u5F84\uFF0C\u6BD4\u5982import xx from &#39;./xxx&#39;,\u8FD9\u91CC\u7684\u503C\u5C31\u662F./xxx</span>
  dependencies <span class="token comment">// \u6A21\u5757\u7684\u4F9D\u8D56</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),m=n(`<h3 id="_2-\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_2-\u5B9E\u73B0" aria-hidden="true">#</a> 2. \u5B9E\u73B0</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">IgnorePlugin</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>arguments<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">1</span> <span class="token operator">||</span> options <span class="token keyword">instanceof</span> <span class="token class-name">RegExp</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      options <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">resourceRegExp</span><span class="token operator">:</span> arguments<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// \u5177\u4F53\u7684\u76EE\u5F55\u548C\u6587\u4EF6</span>
        <span class="token literal-property property">contextRegExp</span><span class="token operator">:</span> arguments<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// \u9700\u8981\u5FFD\u7565\u7684\u6A21\u5757</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">validateOptions</span><span class="token punctuation">(</span>schema<span class="token punctuation">,</span> options<span class="token punctuation">,</span> <span class="token string">&quot;IgnorePlugin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>options <span class="token operator">=</span> options<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>checkIgnore <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">checkIgnore</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">checkIgnore</span><span class="token punctuation">(</span><span class="token parameter">result</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>result<span class="token punctuation">)</span> <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token comment">// IgnorePlugin\u63D2\u4EF6\u652F\u6301\u4F20\u5165checkResource\u548CcheckContext\u65B9\u6CD5\uFF0C\u4F1A\u5148\u540E\u8C03\u7528\uFF0C\u5982\u679C\u5339\u914D\u4F1A\u8FD4\u56DEnull</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      <span class="token string">&quot;checkResource&quot;</span> <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>options <span class="token operator">&amp;&amp;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span>checkResource <span class="token operator">&amp;&amp;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span><span class="token function">checkResource</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>request<span class="token punctuation">,</span> result<span class="token punctuation">.</span>context<span class="token punctuation">)</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&quot;checkContext&quot;</span> <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>options <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span>checkContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span><span class="token function">checkContext</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>context<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// resourceRegExp\u548CcontextRegExp\u4F1A\u5148\u540E\u8FDB\u884C\u5339\u914D\uFF0C\u5982\u679C\u5339\u914D\u4F1A\u8FD4\u56DEnull</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      <span class="token string">&quot;resourceRegExp&quot;</span> <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>options <span class="token operator">&amp;&amp;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span>resourceRegExp <span class="token operator">&amp;&amp;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span>resourceRegExp<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>request<span class="token punctuation">)</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&quot;contextRegExp&quot;</span> <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>options <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span>contextRegExp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span>contextRegExp<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>context<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u89E6\u53D1normalModuleFactory\u94A9\u5B50\u65F6\u6CE8\u518CbeforeResolve</span>
    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>normalModuleFactory<span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token string">&quot;IgnorePlugin&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">nmf</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// \u89E3\u6790\u524D\u8C03\u7528</span>
      nmf<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>beforeResolve<span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token string">&quot;IgnorePlugin&quot;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>checkIgnore<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>contextModuleFactory<span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token string">&quot;IgnorePlugin&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">cmf</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      cmf<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>beforeResolve<span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token string">&quot;IgnorePlugin&quot;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>checkIgnore<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u8FC7\u7A0B\u5982\u4E0B</strong></p><ol><li><p>\u5224\u65AD\u662F\u5426\u5B58\u5728<code>checkResource</code>\u548C<code>checkContext</code>,\u6709\u5C31\u8C03\u7528\uFF0C\u5E76\u6839\u636E\u8FD4\u56DE\u503C\u5224\u65AD\u3002 <strong>\u5982\u679C\u4E24\u8005\u90FD\u5B58\u5728\uFF0C\u540C\u65F6\u90FD\u8FD4\u56DE true,\u5219\u5FFD\u7565\u8BE5\u6587\u4EF6\uFF1B\u5982\u679C checkResource \u5B58\u5728\uFF0C\u8FD4\u56DE true\uFF0C\u5219\u5FFD\u7565\u8BE5\u6587\u4EF6</strong></p></li><li><p>\u5224\u65AD\u662F\u5426\u5B58\u5728<code>resourceRegExp</code>\u548C<code>contextRegExp</code>, \u6839\u636E\u6B63\u5219\u5339\u914D\u6765\u5224\u65AD\u3002 <strong>\u5982\u679C\u4E24\u8005\u90FD\u5B58\u5728\uFF0C\u7ECF\u8FC7\u6B63\u5219\u5339\u914D\u90FD\u4E3A true,\u5219\u5FFD\u7565\u8BE5\u6587\u4EF6\uFF1B\u5982\u679C resourceRegExp \u5B58\u5728\uFF0C\u5339\u914D\u7ED3\u679C\u4E3A true\uFF0C\u5219\u5FFD\u7565\u8BE5\u6587\u4EF6</strong></p></li></ol>`,4);function v(g,b){const e=a("Mermaid"),t=a("RouterLink");return o(),c("div",null,[k,s(e,{id:"mermaid-16",code:"eNpLy8kvT85ILCpRCHGy5krUeLF88bN5E15sX/90X8vTzt4Xy5c97Z+YlJqWX5QalFqcn1OW+nLSyqdrJ2gq6OraKdS82D/l6ex5eaU5OTVJGk929D5tA2oBmfB0Us/zPdNerJ/4Yv3SZ9Pan+zepsmViKynKLW4NKekJlnj+e7lz3evfTqhD0g+n9WCpl2TKwmsKwWobvKzufM1uZLB/FQNPT09TS4AygtkVg=="}),d,l("p",null,[s(t,{to:"/frontend-engineering/webpack/webpack-hook%E6%89%A7%E8%A1%8C%E6%B5%81%E7%A8%8B.html#normalmodulefactory-beforeresolve-callasync"},{default:i(()=>[u("webpack-hook \u6267\u884C\u6D41\u7A0B")]),_:1})]),m])}const y=p(r,[["render",v],["__file","webpackIgnore\u4F18\u5316moment.html.vue"]]);export{y as default};
