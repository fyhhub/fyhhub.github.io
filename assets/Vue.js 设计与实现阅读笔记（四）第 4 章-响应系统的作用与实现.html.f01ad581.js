import{_ as n}from"./plugin-vueexport-helper.2444895f.js";import{o as s,c as a,d as e}from"./app.aba8dbba.js";const p={},t=e(`<h1 id="vue-js-\u8BBE\u8BA1\u4E0E\u5B9E\u73B0\u9605\u8BFB\u7B14\u8BB0-\u56DB-\u7B2C-4-\u7AE0-\u54CD\u5E94\u7CFB\u7EDF\u7684\u4F5C\u7528\u4E0E\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#vue-js-\u8BBE\u8BA1\u4E0E\u5B9E\u73B0\u9605\u8BFB\u7B14\u8BB0-\u56DB-\u7B2C-4-\u7AE0-\u54CD\u5E94\u7CFB\u7EDF\u7684\u4F5C\u7528\u4E0E\u5B9E\u73B0" aria-hidden="true">#</a> Vue.js \u8BBE\u8BA1\u4E0E\u5B9E\u73B0\u9605\u8BFB\u7B14\u8BB0\uFF08\u56DB\uFF09\u7B2C 4 \u7AE0-\u54CD\u5E94\u7CFB\u7EDF\u7684\u4F5C\u7528\u4E0E\u5B9E\u73B0</h1><h2 id="_4-1-\u54CD\u5E94\u5F0F\u6570\u636E\u4E0E\u526F\u4F5C\u7528\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#_4-1-\u54CD\u5E94\u5F0F\u6570\u636E\u4E0E\u526F\u4F5C\u7528\u51FD\u6570" aria-hidden="true">#</a> 4.1 \u54CD\u5E94\u5F0F\u6570\u636E\u4E0E\u526F\u4F5C\u7528\u51FD\u6570</h2><p>\u526F\u4F5C\u7528\u51FD\u6570\u6307\u7684\u662F\u4F1A\u4EA7\u751F\u526F\u4F5C\u7528\u7684\u51FD\u6570\uFF0C\u5982\u4E0B\u9762\u7684\u4EE3\u7801\u6240\u793A\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>innerText <span class="token operator">=</span> <span class="token string">&#39;hello vue3&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u6BB5\u4EE3\u7801\u4FEE\u6539\u4E86body\u7684innerText, \u4F46\u662F\u5176\u4ED6\u7684effect\u4F9D\u7136\u53EF\u80FD\u4FEE\u6539\u6216\u83B7\u53D6\u8FD9\u4E2A<code>innerText</code>, \u6240\u4EE5\u8FD9\u4E2A<code>effect</code>\u7684\u51FD\u6570\u5F71\u54CD\u4E86\u5176\u4ED6\u51FD\u6570\u7684\u6267\u884C\uFF0C\u5B83\u5C31\u662F\u6709\u526F\u4F5C\u7528\u7684\u3002</p><p>\u540C\u6837\u7684\uFF0C\u4F8B\u5982\u4E0B\u9762\u7684val, \u88ABeffect\u51FD\u6570\u4FEE\u6539\uFF0C\u4F46\u5B83\u662F\u5168\u5C40\u53D8\u91CF\uFF0C\u5176\u4ED6\u51FD\u6570\u4E5F\u53EF\u80FD\u4F1A\u7528\u5230\uFF0C\u540C\u6837\u5B58\u5728\u526F\u4F5C\u7528\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> val <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  val <span class="token operator">=</span> <span class="token number">2</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u90A3\u4E48\u4EC0\u4E48\u662F\u54CD\u5E94\u5F0F\u6570\u636E\u5462\uFF1F</strong></p><p>\u6211\u4EEC\u5E0C\u671B\u6709\u5982\u4E0B\u529F\u80FD\uFF0C \u6267\u884C<code>obj.text</code>\u8D4B\u503C\uFF0C\u81EA\u52A8\u6267\u884Ceffect\u51FD\u6570</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;123&#39;</span><span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>innerText <span class="token operator">=</span> obj<span class="token punctuation">.</span>text
<span class="token punctuation">}</span>


obj<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">&#39;hello&#39;</span> <span class="token comment">// \u6211\u4EEC\u5E0C\u671B\uFF0C\u6267\u884C\u8FD9\u4E00\u884C\u4E4B\u540E\uFF0C\u81EA\u52A8\u6267\u884Ceffect\u51FD\u6570</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0B\u9762\u6211\u4EEC\u6765\u63A2\u8BA8\u5982\u4F55\u5B9E\u73B0\u5427\u3002</p><h2 id="_4-2-\u54CD\u5E94\u5F0F\u6570\u636E\u7684\u57FA\u672C\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_4-2-\u54CD\u5E94\u5F0F\u6570\u636E\u7684\u57FA\u672C\u5B9E\u73B0" aria-hidden="true">#</a> 4.2 \u54CD\u5E94\u5F0F\u6570\u636E\u7684\u57FA\u672C\u5B9E\u73B0</h2><p>\u5982\u4F55\u5B9E\u73B0\u54CD\u5E94\u5F0F\u6570\u636E\u5462\uFF0C\u6709\u4EE5\u4E0B\u4E24\u70B9</p><ul><li>\u5F53\u526F\u4F5C\u7528\u51FD\u6570<code>effect</code>\u6267\u884C\u65F6\uFF0C\u4F1A\u89E6\u53D1\u5B57\u6BB5 <code>obj.text</code>\u7684\u8BFB\u53D6\u64CD\u4F5C</li><li>\u5F53\u4FEE\u6539<code>obj.text</code>\u65F6\uFF0C\u4F1A\u89E6\u53D1<code>obj.text</code>\u7684\u8BBE\u7F6E\u64CD\u4F5C</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c29989e49784305961a48cc99a4df21~tplv-k3u1fbpfcp-zoom-1.image" alt="image.png" loading="lazy"></p><p>\u6211\u4EEC\u53EF\u4EE5\u60F3\u8C61\u51FA\u4E00\u4E2A<code>bucket\uFF08\u6876\uFF09</code>\uFF0C\u5F53\u89E6\u53D1<code>\u8BFB\u53D6</code>\u64CD\u4F5C\u65F6\uFF0C\u5C31\u628A<code>\u526F\u4F5C\u7528effect</code>\u653E\u5165\u5230\u8FD9\u4E2A<code>\u6876</code>\u4E2D\u3002 \u5F53\u89E6\u53D1<code>\u8BBE\u7F6E</code>\u64CD\u4F5C\u65F6\uFF0C\u5C31\u628A\u6876\u4E2D\u7684<code>effect</code>\u62FF\u51FA\u6765\u6267\u884C\uFF0C\u53EF\u4EE5\u6709\u5982\u4E0B\u4EE3\u7801</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u5B58\u50A8\u526F\u4F5C\u7528\u51FD\u6570\u7684\u6876</span>
<span class="token keyword">const</span> bucket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// \u539F\u59CB\u6570\u636E</span>
<span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;hello world&#39;</span> <span class="token punctuation">}</span>
<span class="token comment">// \u5BF9\u539F\u59CB\u6570\u636E\u7684\u4EE3\u7406</span>
<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u62E6\u622A\u8BFB\u53D6\u64CD\u4F5C</span>
  <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u5C06\u526F\u4F5C\u7528\u51FD\u6570 effect \u6DFB\u52A0\u5230\u5B58\u50A8\u526F\u4F5C\u7528\u51FD\u6570\u7684\u6876\u4E2D</span>
    bucket<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>effect<span class="token punctuation">)</span>
    <span class="token comment">// \u8FD4\u56DE\u5C5E\u6027\u503C</span>
    <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// \u62E6\u622A\u8BBE\u7F6E\u64CD\u4F5C</span>
  <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> newVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u8BBE\u7F6E\u5C5E\u6027\u503C</span>
    target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> newVal
    <span class="token comment">// \u628A\u526F\u4F5C\u7528\u51FD\u6570\u4ECE\u6876\u91CC\u53D6\u51FA\u5E76\u6267\u884C</span>
    bucket<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">fn</span> <span class="token operator">=&gt;</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>innerText <span class="token operator">=</span> obj<span class="token punctuation">.</span>text
<span class="token punctuation">}</span>
<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-3-\u8BBE\u8BA1\u4E00\u4E2A\u5B8C\u5584\u7684\u54CD\u5E94\u5F0F\u7CFB\u7EDF" tabindex="-1"><a class="header-anchor" href="#_4-3-\u8BBE\u8BA1\u4E00\u4E2A\u5B8C\u5584\u7684\u54CD\u5E94\u5F0F\u7CFB\u7EDF" aria-hidden="true">#</a> 4.3 \u8BBE\u8BA1\u4E00\u4E2A\u5B8C\u5584\u7684\u54CD\u5E94\u5F0F\u7CFB\u7EDF</h2><p>\u4E0D\u96BE\u770B\u51FA\uFF0C\u54CD\u5E94\u5F0F\u7CFB\u7EDF\u7684\u5DE5\u4F5C\u6D41\u7A0B\u5982\u4E0B\uFF1A</p><ul><li>\u5F53\u526F\u4F5C\u7528\u51FD\u6570<code>effect</code>\u6267\u884C\u65F6\uFF0C\u4F1A\u89E6\u53D1\u5B57\u6BB5 <code>obj.text</code>\u7684\u8BFB\u53D6\u64CD\u4F5C</li><li>\u5F53\u4FEE\u6539<code>obj.text</code>\u65F6\uFF0C\u4F1A\u89E6\u53D1<code>obj.text</code>\u7684\u8BBE\u7F6E\u64CD\u4F5C</li></ul><p>\u770B\u4E0A\u53BB\u7B80\u5355\uFF0C\u4F46\u662F\u8FD8\u6709\u70B9\u95EE\u9898\uFF0C\u6211\u4EEC\u628A<code>effect</code>\u540D\u5B57\u5199\u6B7B\u4E86\uFF0C\u6211\u4EEC\u5E0C\u671B\u662F\u4E00\u4E2A\u533F\u540D\u51FD\u6570\u3002</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code>// \u5B58\u50A8\u526F\u4F5C\u7528\u51FD\u6570\u7684\u6876
const bucket = new Set()
let activeEffect

// \u539F\u59CB\u6570\u636E
const data = { text: &#39;hello world&#39; }
// \u5BF9\u539F\u59CB\u6570\u636E\u7684\u4EE3\u7406
const obj = new Proxy(data, {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> // \u62E6\u622A\u8BFB\u53D6\u64CD\u4F5C
</span><span class="token prefix unchanged"> </span><span class="token line"> get(target, key) {
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">    if (activeEffect) {
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">       // \u5C06\u526F\u4F5C\u7528\u51FD\u6570 activeEffect \u6DFB\u52A0\u5230\u5B58\u50A8\u526F\u4F5C\u7528\u51FD\u6570\u7684\u6876\u4E2D
</span><span class="token prefix unchanged"> </span><span class="token line">       bucket.add(activeEffect)
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">    }
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   // \u8FD4\u56DE\u5C5E\u6027\u503C
</span><span class="token prefix unchanged"> </span><span class="token line">   return target[key]
</span><span class="token prefix unchanged"> </span><span class="token line"> },
</span><span class="token prefix unchanged"> </span><span class="token line"> // \u62E6\u622A\u8BBE\u7F6E\u64CD\u4F5C
</span><span class="token prefix unchanged"> </span><span class="token line"> set(target, key, newVal) {
</span><span class="token prefix unchanged"> </span><span class="token line">   // \u8BBE\u7F6E\u5C5E\u6027\u503C
</span><span class="token prefix unchanged"> </span><span class="token line">   target[key] = newVal
</span><span class="token prefix unchanged"> </span><span class="token line">   // \u628A\u526F\u4F5C\u7528\u51FD\u6570\u4ECE\u6876\u91CC\u53D6\u51FA\u5E76\u6267\u884C
</span><span class="token prefix unchanged"> </span><span class="token line">   bucket.forEach(fn =&gt; fn())
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span></span>})


// \u7528\u4E00\u4E2A\u5168\u5C40\u53D8\u91CF\u5B58\u50A8\u5F53\u524D\u6FC0\u6D3B\u7684 effect \u51FD\u6570
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> function effect(fn) {
</span><span class="token prefix inserted">+</span><span class="token line">  // \u5F53\u8C03\u7528 effect \u6CE8\u518C\u526F\u4F5C\u7528\u51FD\u6570\u65F6\uFF0C\u5C06\u526F\u4F5C\u7528\u51FD\u6570\u590D\u5236\u7ED9 activeEffect
</span><span class="token prefix inserted">+</span><span class="token line">  activeEffect = fn
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> // \u6267\u884C\u526F\u4F5C\u7528\u51FD\u6570
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">  fn()
</span><span class="token prefix inserted">+</span><span class="token line">}
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0A\u8FF0\u4EE3\u7801\u4E2D\uFF0C\u6211\u4EEC\u4FEE\u6539\u4E86<code>effect</code>\u51FD\u6570\u3002\u652F\u6301\u6211\u4EEC\u4F20\u5165\u4E00\u4E2A\u533F\u540D\u51FD\u6570</p><p>\u6D4B\u8BD5\u4EE3\u7801\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;effect run&#39;</span><span class="token punctuation">)</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>innerText <span class="token operator">=</span> obj<span class="token punctuation">.</span>text
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  obj<span class="token punctuation">.</span>text2 <span class="token operator">=</span> <span class="token string">&#39;hello vue3&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0A\u9762\u7684\u4EE3\u7801\u6240\u793A\uFF0C\u7531\u4E8E\u526F\u4F5C\u7528\u51FD\u6570\u5DF2\u7ECF\u5B58\u50A8\u5230\u4E86 activeEffect \u4E2D\uFF0C\u6240\u4EE5\u5728 get \u62E6\u622A\u51FD\u6570\u5185\u5E94\u8BE5\u628A activeEffect \u6536\u96C6\u5230\u201C\u6876\u201D\u4E2D\uFF0C\u8FD9\u6837\u54CD\u5E94\u7CFB\u7EDF\u5C31\u4E0D\u4F9D\u8D56\u526F\u4F5C\u7528\u51FD\u6570\u7684\u540D\u5B57\u4E86\u3002</p><p>\u4F46\u5982\u679C\u6211\u4EEC\u518D\u5BF9\u8FD9\u4E2A\u7CFB\u7EDF\u7A0D\u52A0\u6D4B\u8BD5\uFF0C\u4F8B\u5982\u5728\u54CD\u5E94\u5F0F\u6570\u636E obj \u4E0A\u8BBE\u7F6E\u4E00\u4E2A\u4E0D\u5B58\u5728\u7684\u5C5E\u6027\u65F6\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;effect run&#39;</span><span class="token punctuation">)</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>innerText <span class="token operator">=</span> obj<span class="token punctuation">.</span>text
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  obj<span class="token punctuation">.</span>notExist <span class="token operator">=</span> <span class="token string">&#39;hello&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0A\u9762\u7684\u4EE3\u7801\u4E2D\uFF0C\u80AF\u5B9A\u662F\u4E0D\u53EF\u80FD\u89E6\u53D1effect\u51FD\u6570\u7684\uFF0C\u56E0\u4E3A\u65B0\u7684\u5B57\u6BB5<code>notExist</code>\u5E76\u6CA1\u6709\u8DDF\u526F\u4F5C\u7528\u51FD\u6570\u4EA7\u751F\u8054\u7CFB\u3002</p><p><strong>\u90A3\u4E48\u5982\u4F55\u5C06\u60F3\u8981\u64CD\u4F5C\u7684\u5C5E\u6027\uFF0C\u81EA\u52A8\u4E0Eeffect\u51FD\u6570\u4EA7\u751F\u8054\u7CFB\u5462\uFF1F</strong></p><p>\u4E4B\u524D\u7684Set\u7ED3\u6784\u80AF\u5B9A\u4E0D\u53EF\u4EE5\u4E86\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528\u4E0B\u9762\u8FD9\u79CD\u6570\u636E\u7ED3\u6784:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>WeakMap({
    target: Map({
       key1: Set(effect1, effect2),
       key2: Set(effect1, effect2)
    }),
    target2: Map({
       key1: Set(effect1, effect2),
       key2: Set(effect1, effect2)
    }),
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6240\u4EE5\u4FEE\u6539\u4E00\u4E0B\u4E4B\u524D\u7684\u4EE3\u7801:</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code>// \u5B58\u50A8\u526F\u4F5C\u7528\u51FD\u6570\u7684\u6876
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> const bucket = new WeakMap()
</span></span>
// \u539F\u59CB\u6570\u636E
const data = { text: &#39;hello world&#39; }
// \u5BF9\u539F\u59CB\u6570\u636E\u7684\u4EE3\u7406
const obj = new Proxy(data, {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> // \u62E6\u622A\u8BFB\u53D6\u64CD\u4F5C
</span><span class="token prefix unchanged"> </span><span class="token line"> get(target, key) {
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">    if (!activeEffect) return target[key]
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   // \u5C06\u526F\u4F5C\u7528\u51FD\u6570 activeEffect \u6DFB\u52A0\u5230\u5B58\u50A8\u526F\u4F5C\u7528\u51FD\u6570\u7684\u6876\u4E2D
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">    let depsMap = bucket.get(target)
</span><span class="token prefix inserted">+</span><span class="token line">    if (!depsMap) {
</span><span class="token prefix inserted">+</span><span class="token line">      bucket.set(target, (depsMap = new Map()))
</span><span class="token prefix inserted">+</span><span class="token line">    }
</span><span class="token prefix inserted">+</span><span class="token line">    let deps = depsMap.get(key)
</span><span class="token prefix inserted">+</span><span class="token line">    if (!deps) {
</span><span class="token prefix inserted">+</span><span class="token line">      depsMap.set(key, (deps = new Set()))
</span><span class="token prefix inserted">+</span><span class="token line">    }
</span><span class="token prefix inserted">+</span><span class="token line">    deps.add(activeEffect)
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   // \u8FD4\u56DE\u5C5E\u6027\u503C
</span><span class="token prefix unchanged"> </span><span class="token line">   return target[key]
</span><span class="token prefix unchanged"> </span><span class="token line"> },
</span><span class="token prefix unchanged"> </span><span class="token line"> // \u62E6\u622A\u8BBE\u7F6E\u64CD\u4F5C
</span><span class="token prefix unchanged"> </span><span class="token line"> set(target, key, newVal) {
</span><span class="token prefix unchanged"> </span><span class="token line">   // \u8BBE\u7F6E\u5C5E\u6027\u503C
</span><span class="token prefix unchanged"> </span><span class="token line">   target[key] = newVal
</span><span class="token prefix unchanged"> </span><span class="token line">   // \u628A\u526F\u4F5C\u7528\u51FD\u6570\u4ECE\u6876\u91CC\u53D6\u51FA\u5E76\u6267\u884C
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">    const depsMap = bucket.get(target)
</span><span class="token prefix inserted">+</span><span class="token line">    if (!depsMap) return
</span><span class="token prefix inserted">+</span><span class="token line">    const effects = depsMap.get(key)
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   effects &amp;&amp; effects.forEach(fn =&gt; fn())
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span></span>})


// \u7528\u4E00\u4E2A\u5168\u5C40\u53D8\u91CF\u5B58\u50A8\u5F53\u524D\u6FC0\u6D3B\u7684 effect \u51FD\u6570
let activeEffect
function effect(fn) {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> // \u5F53\u8C03\u7528 effect \u6CE8\u518C\u526F\u4F5C\u7528\u51FD\u6570\u65F6\uFF0C\u5C06\u526F\u4F5C\u7528\u51FD\u6570\u590D\u5236\u7ED9 activeEffect
</span><span class="token prefix unchanged"> </span><span class="token line"> activeEffect = fn
</span><span class="token prefix unchanged"> </span><span class="token line"> // \u6267\u884C\u526F\u4F5C\u7528\u51FD\u6570
</span><span class="token prefix unchanged"> </span><span class="token line"> fn()
</span></span>}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u770B\u5230\uFF0C\u6211\u4EEC\u4E0D\u518D\u5355\u7EAF\u7684\u4ECE<code>\u6876</code>\u4E2D\uFF0C\u83B7\u53D6effects\u51FD\u6570\u3002\u800C\u662F\u501F\u52A9<code>WeakMap</code>\u53D6\u51FAtarget\u5BF9\u8C61\u4E0B<code>key</code>\u6240\u5BF9\u5E94\u7684effects\u3002</p><p>\u5982\u4E0B\u56FE\uFF1A</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65a12662c2ac474fa7e527f243e899a3~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" loading="lazy"></p><p>\u5728\u76EE\u524D\u7684\u5B9E\u73B0\u4E2D\uFF0C\u5F53\u8BFB\u53D6\u5C5E\u6027\u503C\u65F6\uFF0C\u6211\u4EEC\u76F4\u63A5\u5728 get \u62E6\u622A\u51FD\u6570\u91CC\u7F16\u5199\u628A\u526F\u4F5C\u7528\u51FD\u6570\u6536\u96C6 \u5230\u201C\u6876\u201D\u91CC\u7684\u8FD9\u90E8\u5206\u903B\u8F91\uFF0C\u4F46\u66F4\u597D\u7684\u505A\u6CD5\u662F\u5C06\u8FD9\u90E8\u5206\u903B\u8F91\u5355\u72EC\u5C01\u88C5\u5230\u4E00\u4E2A <code>track \u51FD\u6570</code>\u4E2D\uFF0C\u51FD\u6570\u7684\u540D\u5B57\u53EB track \u662F\u4E3A\u4E86\u8868\u8FBE\u8FFD\u8E2A\u7684\u542B\u4E49\u3002\u540C\u6837\uFF0C\u6211\u4EEC\u4E5F\u53EF\u4EE5\u628A\u89E6\u53D1\u526F\u4F5C\u7528\u51FD\u6570\u91CD\u65B0\u6267\u884C\u7684\u903B\u8F91\u5C01\u88C5\u5230 <code>trigger \u51FD\u6570</code>\u4E2D\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u5B58\u50A8\u526F\u4F5C\u7528\u51FD\u6570\u7684\u6876</span>
<span class="token keyword">const</span> bucket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// \u539F\u59CB\u6570\u636E</span>
<span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;hello world&#39;</span> <span class="token punctuation">}</span>
<span class="token comment">// \u5BF9\u539F\u59CB\u6570\u636E\u7684\u4EE3\u7406</span>
<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u62E6\u622A\u8BFB\u53D6\u64CD\u4F5C</span>
  <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u5C06\u526F\u4F5C\u7528\u51FD\u6570 activeEffect \u6DFB\u52A0\u5230\u5B58\u50A8\u526F\u4F5C\u7528\u51FD\u6570\u7684\u6876\u4E2D</span>
    <span class="token function">track</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token comment">// \u8FD4\u56DE\u5C5E\u6027\u503C</span>
    <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// \u62E6\u622A\u8BBE\u7F6E\u64CD\u4F5C</span>
  <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> newVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u8BBE\u7F6E\u5C5E\u6027\u503C</span>
    target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> newVal
    <span class="token comment">// \u628A\u526F\u4F5C\u7528\u51FD\u6570\u4ECE\u6876\u91CC\u53D6\u51FA\u5E76\u6267\u884C</span>
    <span class="token function">trigger</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">track</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> depsMap <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    bucket<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token punctuation">(</span>depsMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> deps <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>deps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    depsMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token punctuation">(</span>deps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  deps<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">trigger</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> depsMap <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span> <span class="token keyword">return</span>
  <span class="token keyword">const</span> effects <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
  effects <span class="token operator">&amp;&amp;</span> effects<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">fn</span> <span class="token operator">=&gt;</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u7528\u4E00\u4E2A\u5168\u5C40\u53D8\u91CF\u5B58\u50A8\u5F53\u524D\u6FC0\u6D3B\u7684 effect \u51FD\u6570</span>
<span class="token keyword">let</span> activeEffect
<span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u5F53\u8C03\u7528 effect \u6CE8\u518C\u526F\u4F5C\u7528\u51FD\u6570\u65F6\uFF0C\u5C06\u526F\u4F5C\u7528\u51FD\u6570\u590D\u5236\u7ED9 activeEffect</span>
  activeEffect <span class="token operator">=</span> fn
  <span class="token comment">// \u6267\u884C\u526F\u4F5C\u7528\u51FD\u6570</span>
  <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>


<span class="token comment">// \u6D4B\u8BD5\u4EE3\u7801</span>
<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;effect run&#39;</span><span class="token punctuation">)</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>innerText <span class="token operator">=</span> obj<span class="token punctuation">.</span>text
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">trigger</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token string">&#39;text&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-4-\u5206\u652F\u5207\u6362\u4E0E-cleanup" tabindex="-1"><a class="header-anchor" href="#_4-4-\u5206\u652F\u5207\u6362\u4E0E-cleanup" aria-hidden="true">#</a> 4.4 \u5206\u652F\u5207\u6362\u4E0E cleanup</h2><p>\u5206\u652F\u5207\u6362\u53EF\u80FD\u4F1A\u4EA7\u751F\u9057\u7559\u7684\u526F\u4F5C\u7528\u51FD\u6570\uFF0C \u4EE5\u8FD9\u6BB5\u4EE3\u7801\u4E3A\u4F8B:</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">ok</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;hello world&#39;</span> <span class="token punctuation">}</span>
<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">effect</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>innerText <span class="token operator">=</span> obj<span class="token punctuation">.</span>ok <span class="token operator">?</span> obj<span class="token punctuation">.</span>text <span class="token operator">:</span> <span class="token string">&#39;not&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5047\u8BBE<code>obj.ok</code> \u9ED8\u8BA4\u4E3Atrue, \u4F9D\u8D56\u6811\u5982\u4E0B\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">Map</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
   <span class="token literal-property property">obj</span><span class="token operator">:</span> <span class="token function">Map</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
     <span class="token literal-property property">ok</span><span class="token operator">:</span> <span class="token function">Set</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span><span class="token punctuation">,</span>
     <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token function">Set</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span>
   <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0D\u96BE\u770B\u51FA\uFF0C\u526F\u4F5C\u7528\u51FD\u6570\u5206\u522B\u88AB<code>ok</code>\u548C<code>text</code>\u4F9D\u8D56\u6536\u96C6\u3002</p><p>\u4F46\u662F\u5982\u679C<code>obj.ok</code>\u88AB\u4FEE\u6539\u6210<code>false</code>, \u6211\u4EEC<strong>\u671F\u671B\u7684</strong>\u4F9D\u8D56\u7ED3\u6784\u4E3A\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">Map</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
   <span class="token literal-property property">obj</span><span class="token operator">:</span> <span class="token function">Map</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
     <span class="token literal-property property">ok</span><span class="token operator">:</span> <span class="token function">Set</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span><span class="token punctuation">,</span>
     <span class="token comment">// text: Set(effectFn)</span>
   <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F46\u662F\uFF0C\u5B9E\u9645\u4E0Atext\u7684\u4F9D\u8D56\u4ECD\u7136\u5B58\u5728\uFF0C\u6211\u4EEC\u5E76\u6CA1\u6709\u4F7F\u7528\u5230<code>obj.text</code>, \u5982\u679C\u4FEE\u6539<code>obj.text</code>\uFF0C\u8FD8\u662F\u4F1A\u91CD\u65B0\u6267\u884Ceffect\u3002\u6240\u4EE5\u8FD9\u6837\u662F\u6709\u95EE\u9898\u7684\uFF01 \u6211\u4EEC\u5E76\u4E0D\u5E0C\u671B\u5207\u6362\u4E3Afalse\u7684\u65F6\u5019\uFF0Ctext\u7684\u4F9D\u8D56\u8FD8\u5B58\u5728\u3002</p><p><strong>\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\u7684\u601D\u8DEF\u5F88\u7B80\u5355\uFF0C\u6BCF\u6B21\u526F\u4F5C\u7528\u51FD\u6570\u6267\u884C\u65F6\uFF0C\u6211\u4EEC\u53EF\u4EE5 \u5148\u628A\u5B83\u4ECE\u6240\u6709\u4E0E\u4E4B\u5173\u8054\u7684\u4F9D\u8D56\u96C6\u5408\u4E2D\u5220\u9664</strong></p><p>\u7528\u4E00\u5F20\u56FE\u6765\u89E3\u91CA\uFF1A</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3580b850b0a44a259e0bf0017f516ddb~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" loading="lazy"></p><p>\u7B80\u5355\u6765\u8BB2\uFF0C\u5C31\u662F<code>effect</code>\u548C<code>effect Set</code>\u4E4B\u95F4\u5EFA\u7ACB\u4E86\u8054\u7CFB\u3002\u6BCF\u6B21\u6536\u96C6\u4F9D\u8D56\u4E4B\u524D\uFF0C<strong>\u83B7\u53D6<code>effectFn</code>\u5BF9\u5E94\u7684\u4F9D\u8D56\u96C6\u5408\uFF0C\u7136\u540E\u628A\u81EA\u5DF1\u5220\u9664\u4E86\uFF0C\u76F8\u5F53\u4E8E\u89E3\u9664\u4E86\u5173\u8054</strong>\u3002</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code>// \u5B58\u50A8\u526F\u4F5C\u7528\u51FD\u6570\u7684\u6876
const bucket = new WeakMap()

// \u539F\u59CB\u6570\u636E
const data = { ok: true, text: &#39;hello world&#39; }
// \u5BF9\u539F\u59CB\u6570\u636E\u7684\u4EE3\u7406
const obj = new Proxy(data, {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> // \u62E6\u622A\u8BFB\u53D6\u64CD\u4F5C
</span><span class="token prefix unchanged"> </span><span class="token line"> get(target, key) {
</span><span class="token prefix unchanged"> </span><span class="token line">   // \u5C06\u526F\u4F5C\u7528\u51FD\u6570 activeEffect \u6DFB\u52A0\u5230\u5B58\u50A8\u526F\u4F5C\u7528\u51FD\u6570\u7684\u6876\u4E2D
</span><span class="token prefix unchanged"> </span><span class="token line">   track(target, key)
</span><span class="token prefix unchanged"> </span><span class="token line">   // \u8FD4\u56DE\u5C5E\u6027\u503C
</span><span class="token prefix unchanged"> </span><span class="token line">   return target[key]
</span><span class="token prefix unchanged"> </span><span class="token line"> },
</span><span class="token prefix unchanged"> </span><span class="token line"> // \u62E6\u622A\u8BBE\u7F6E\u64CD\u4F5C
</span><span class="token prefix unchanged"> </span><span class="token line"> set(target, key, newVal) {
</span><span class="token prefix unchanged"> </span><span class="token line">   // \u8BBE\u7F6E\u5C5E\u6027\u503C
</span><span class="token prefix unchanged"> </span><span class="token line">   target[key] = newVal
</span><span class="token prefix unchanged"> </span><span class="token line">   // \u628A\u526F\u4F5C\u7528\u51FD\u6570\u4ECE\u6876\u91CC\u53D6\u51FA\u5E76\u6267\u884C
</span><span class="token prefix unchanged"> </span><span class="token line">   trigger(target, key)
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span></span>})

function track(target, key) {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> let depsMap = bucket.get(target)
</span><span class="token prefix unchanged"> </span><span class="token line"> if (!depsMap) {
</span><span class="token prefix unchanged"> </span><span class="token line">   bucket.set(target, (depsMap = new Map()))
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span><span class="token prefix unchanged"> </span><span class="token line"> let deps = depsMap.get(key)
</span><span class="token prefix unchanged"> </span><span class="token line"> if (!deps) {
</span><span class="token prefix unchanged"> </span><span class="token line">   depsMap.set(key, (deps = new Set()))
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span><span class="token prefix unchanged"> </span><span class="token line"> deps.add(activeEffect)
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> // effect \u5173\u8054\u5C5E\u6027\u5BF9\u5E94\u7684 Set(effects)
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">  activeEffect.deps.push(deps)
</span></span>}

function trigger(target, key) {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const depsMap = bucket.get(target)
</span><span class="token prefix unchanged"> </span><span class="token line"> if (!depsMap) return
</span><span class="token prefix unchanged"> </span><span class="token line"> const effects = depsMap.get(key)
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> effects &amp;&amp; effects.forEach(effectFn =&gt; effectFn())
</span></span>}

// \u7528\u4E00\u4E2A\u5168\u5C40\u53D8\u91CF\u5B58\u50A8\u5F53\u524D\u6FC0\u6D3B\u7684 effect \u51FD\u6570
let activeEffect
function effect(fn) {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const effectFn = () =&gt; {
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">   cleanup(effectFn)
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   // \u5F53\u8C03\u7528 effect \u6CE8\u518C\u526F\u4F5C\u7528\u51FD\u6570\u65F6\uFF0C\u5C06\u526F\u4F5C\u7528\u51FD\u6570\u590D\u5236\u7ED9 activeEffect
</span><span class="token prefix unchanged"> </span><span class="token line">   activeEffect = effectFn
</span><span class="token prefix unchanged"> </span><span class="token line">   fn()
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span><span class="token prefix unchanged"> </span><span class="token line"> // activeEffect.deps \u7528\u6765\u5B58\u50A8\u6240\u6709\u4E0E\u8BE5\u526F\u4F5C\u7528\u51FD\u6570\u76F8\u5173\u7684\u4F9D\u8D56\u96C6\u5408
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">  effectFn.deps = []
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> // \u6267\u884C\u526F\u4F5C\u7528\u51FD\u6570
</span><span class="token prefix unchanged"> </span><span class="token line"> effectFn()
</span></span>}

<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> function cleanup(effectFn) {
</span><span class="token prefix inserted">+</span><span class="token line">   for (let i = 0; i &lt; effectFn.deps.length; i++) {
</span><span class="token prefix inserted">+</span><span class="token line">     const deps = effectFn.deps[i]
</span><span class="token prefix inserted">+</span><span class="token line">     deps.delete(effectFn)
</span><span class="token prefix inserted">+</span><span class="token line">   }
</span><span class="token prefix inserted">+</span><span class="token line">  effectFn.deps.length = 0
</span><span class="token prefix inserted">+</span><span class="token line"> }
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4EEC\u7684\u54CD\u5E94\u7CFB\u7EDF\u5DF2\u7ECF\u53EF\u4EE5\u907F\u514D\u526F\u4F5C\u7528\u51FD\u6570\u4EA7\u751F\u9057\u7559\u4E86\u3002\u4F46\u5982\u679C\u4F60\u5C1D\u8BD5\u8FD0\u884C\u4EE3\u7801\uFF0C\u4F1A\u53D1\u73B0\u76EE\u524D\u7684\u5B9E\u73B0\u4F1A\u5BFC\u81F4\u65E0\u9650\u5FAA\u73AF\u6267\u884C\uFF0C\u95EE\u9898 \u51FA\u5728 trigger \u51FD\u6570\u4E2D</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>effects <span class="token operator">&amp;&amp;</span> effects<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">effectFn</span> <span class="token operator">=&gt;</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5982\u679C\u4F60\u5728\u4E00\u4E2A\u5FAA\u73AF\u4E2D\uFF0C\u6DFB\u52A0\u548C\u5220\u9664Set\uFF0C\u4F1A\u5BFC\u81F4\u65E0\u9650\u904D\u5386:</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>newSet<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  set<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// \u76F8\u5F53\u4E8Ecleanup</span>
  set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// \u76F8\u5F53\u4E8Etrack\u6536\u96C6\u4F9D\u8D56</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4EEC\u4FEE\u6539\u4E00\u4E0B<code>trigger</code>\u51FD\u6570</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code>function trigger(target, key) {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const depsMap = bucket.get(target)
</span><span class="token prefix unchanged"> </span><span class="token line"> if (!depsMap) return
</span><span class="token prefix unchanged"> </span><span class="token line"> const effects = depsMap.get(key)
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const effectsToRun = new Set()
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">  effects &amp;&amp; effects.forEach(effectFn =&gt; effectsToRun.add(effectFn))
</span><span class="token prefix inserted">+</span><span class="token line">  effectsToRun.forEach(effectFn =&gt; effectFn())
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">  effects &amp;&amp; effects.forEach(effectFn =&gt; effectFn())
</span></span>}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4EEC\u65B0\u6784\u9020\u4E86 effectsToRun \u96C6\u5408\u5E76\u904D\u5386\u5B83\uFF0C \u4EE3\u66FF\u76F4\u63A5\u904D\u5386 effects \u96C6\u5408\uFF0C\u4ECE\u800C\u907F\u514D\u4E86\u65E0\u9650\u6267\u884C\u3002</p><h2 id="_4-5-\u5D4C\u5957\u7684effect-\u4E0E-effect\u6808" tabindex="-1"><a class="header-anchor" href="#_4-5-\u5D4C\u5957\u7684effect-\u4E0E-effect\u6808" aria-hidden="true">#</a> 4.5 \u5D4C\u5957\u7684effect \u4E0E effect\u6808</h2><p>\u6211\u4EEC\u601D\u8003\u4E00\u4E0B\u4E0B\u9762\u7684\u4EE3\u7801\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">effect</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">effectFn1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;effectFn1 \u6267\u884C&#39;</span><span class="token punctuation">)</span>
  <span class="token function">effect</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">effectFn2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;effectFn2 \u6267\u884C&#39;</span><span class="token punctuation">)</span>
    temp2 <span class="token operator">=</span> obj<span class="token punctuation">.</span>bar
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  temp1 <span class="token operator">=</span> obj<span class="token punctuation">.</span>foo
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u521D\u59CB\u6267\u884C\u7684\u65F6\u5019\uFF0C\u81EA\u7136\u4F1A\u89E6\u53D1<code>effectFn1</code>\u548C<code>effectFn2</code>\uFF0C\u4F46\u662F\u5F53\u4F60\u4FEE\u6539<code>obj.foo</code>\u7684\u65F6\u5019\uFF0C\u5374\u53EA\u4F1A\u6267\u884C<code>effectFn2</code>\u3002\u4E3A\u4EC0\u4E48\u5462\uFF1F</p><p>\u5728\u524D\u9762\uFF0C\u6211\u4EEC\u662F\u7528\u8FC7\u8FD9\u6837\u7684\u65B9\u5F0F\u83B7\u53D6<code>effect</code>\u7684\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>activeEffect <span class="token operator">=</span> effectFn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u521D\u6B21\u6267\u884C\u5B8C\u540E\uFF0C\u6700\u540E\u4E00\u6B21\u6267\u884C\u540E\uFF0C<code>activeEffect === effectFn2</code>, \u6B64\u65F6<code>obj.foo</code>\u6536\u96C6\u7684\u5176\u5B9E\u662F<code>effectFn2</code>\u3002</p><p>\u90A3\u600E\u4E48\u89E3\u51B3\u5462\uFF1F\u6211\u4EEC\u53EF\u4EE5\u7EF4\u62A4\u4E00\u4E2A\u6808\u7684\u7ED3\u6784, \u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code>// \u7528\u4E00\u4E2A\u5168\u5C40\u53D8\u91CF\u5B58\u50A8\u5F53\u524D\u6FC0\u6D3B\u7684 effect \u51FD\u6570
let activeEffect
// effect \u6808
const effectStack = []

function effect(fn) {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const effectFn = () =&gt; {
</span><span class="token prefix unchanged"> </span><span class="token line">   cleanup(effectFn)
</span><span class="token prefix unchanged"> </span><span class="token line">   // \u5F53\u8C03\u7528 effect \u6CE8\u518C\u526F\u4F5C\u7528\u51FD\u6570\u65F6\uFF0C\u5C06\u526F\u4F5C\u7528\u51FD\u6570\u590D\u5236\u7ED9 activeEffect
</span><span class="token prefix unchanged"> </span><span class="token line">   activeEffect = effectFn
</span><span class="token prefix unchanged"> </span><span class="token line">   // \u5728\u8C03\u7528\u526F\u4F5C\u7528\u51FD\u6570\u4E4B\u524D\u5C06\u5F53\u524D\u526F\u4F5C\u7528\u51FD\u6570\u538B\u6808
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">    effectStack.push(effectFn)
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   fn()
</span><span class="token prefix unchanged"> </span><span class="token line">   // \u5728\u5F53\u524D\u526F\u4F5C\u7528\u51FD\u6570\u6267\u884C\u5B8C\u6BD5\u540E\uFF0C\u5C06\u5F53\u524D\u526F\u4F5C\u7528\u51FD\u6570\u5F39\u51FA\u6808\uFF0C\u5E76\u8FD8\u539F activeEffect \u4E3A\u4E4B\u524D\u7684\u503C
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">    effectStack.pop()
</span><span class="token prefix inserted">+</span><span class="token line">    activeEffect = effectStack[effectStack.length - 1]
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> }
</span><span class="token prefix unchanged"> </span><span class="token line"> // activeEffect.deps \u7528\u6765\u5B58\u50A8\u6240\u6709\u4E0E\u8BE5\u526F\u4F5C\u7528\u51FD\u6570\u76F8\u5173\u7684\u4F9D\u8D56\u96C6\u5408
</span><span class="token prefix unchanged"> </span><span class="token line"> effectFn.deps = []
</span><span class="token prefix unchanged"> </span><span class="token line"> // \u6267\u884C\u526F\u4F5C\u7528\u51FD\u6570
</span><span class="token prefix unchanged"> </span><span class="token line"> effectFn()
</span></span>}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-6-\u907F\u514D\u65E0\u9650\u9012\u5F52\u5FAA\u73AF" tabindex="-1"><a class="header-anchor" href="#_4-6-\u907F\u514D\u65E0\u9650\u9012\u5F52\u5FAA\u73AF" aria-hidden="true">#</a> 4.6 \u907F\u514D\u65E0\u9650\u9012\u5F52\u5FAA\u73AF</h2><p>\u601D\u8003\u5982\u4E0B\u4EE3\u7801\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  obj<span class="token punctuation">.</span>foo <span class="token operator">=</span> obj<span class="token punctuation">.</span>foo <span class="token operator">+</span> <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6700\u540E\u4F1A\u5BFC\u81F4\u65E0\u9650\u9012\u5F52\u3002</p><p>\u5728\u8FD9\u4E2A\u8BED\u53E5\u4E2D\uFF0C\u65E2\u4F1A\u8BFB\u53D6 obj.foo \u7684\u503C\uFF0C\u53C8\u4F1A\u8BBE\u7F6E obj.foo \u7684 \u503C\uFF0C\u800C\u8FD9\u5C31\u662F\u5BFC\u81F4\u95EE\u9898\u7684\u6839\u672C\u539F\u56E0\u3002</p><p>\u57FA\u4E8E\u6B64\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5728 trigger \u52A8\u4F5C\u53D1\u751F\u65F6\u589E\u52A0\u5B88\u536B\u6761\u4EF6\uFF1A<strong>\u5982\u679C trigger \u89E6\u53D1\u6267\u884C\u7684\u526F\u4F5C\u7528\u51FD\u6570\u4E0E\u5F53\u524D\u6B63\u5728\u6267\u884C\u7684\u526F \u4F5C\u7528\u51FD\u6570\u76F8\u540C\uFF0C\u5219\u4E0D\u89E6\u53D1\u6267\u884C</strong></p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code>function trigger(target, key) {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const depsMap = bucket.get(target)
</span><span class="token prefix unchanged"> </span><span class="token line"> if (!depsMap) return
</span><span class="token prefix unchanged"> </span><span class="token line"> const effects = depsMap.get(key)
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const effectsToRun = new Set()
</span><span class="token prefix unchanged"> </span><span class="token line"> effects &amp;&amp; effects.forEach(effectFn =&gt; {
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">    if (effectFn !== activeEffect) {
</span><span class="token prefix inserted">+</span><span class="token line">      effectsToRun.add(effectFn)
</span><span class="token prefix inserted">+</span><span class="token line">    }
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> })
</span><span class="token prefix unchanged"> </span><span class="token line"> effectsToRun.forEach(effectFn =&gt; effectFn())
</span><span class="token prefix unchanged"> </span><span class="token line"> // effects &amp;&amp; effects.forEach(effectFn =&gt; effectFn())
</span></span>}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-7-\u8C03\u5EA6\u6267\u884C" tabindex="-1"><a class="header-anchor" href="#_4-7-\u8C03\u5EA6\u6267\u884C" aria-hidden="true">#</a> 4.7 \u8C03\u5EA6\u6267\u884C</h2><p>\u601D\u8003\u4E0B\u9762\u7684\u4EE3\u7801\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span>

<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>foo<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

obj<span class="token punctuation">.</span>foo<span class="token operator">++</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u7ED3\u675F\u4E86&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B63\u5E38\u6765\u8BB2\uFF0C\u4F1A\u6253\u5370\u5982\u4E0B\u5185\u5BB9\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token number">1</span>
<span class="token number">2</span>
\u7ED3\u675F\u4E86
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u6211\u4EEC\u60F3\u5B9E\u73B0\uFF0C\u8FD9\u6837\u7684\u8F93\u51FA\u5462\uFF1F</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token number">1</span>
\u7ED3\u675F\u4E86
<span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F60\u53EF\u80FD\u4F1A\u60F3\u5230\u628A<code>console.log</code>\u653E\u5230\u4E0A\u9762\u3002\u4F46\u6709\u6CA1\u6709\u66F4\u597D\u7684\u529E\u6CD5\u5462\uFF1F</p><p>\u5176\u5B9E\u6211\u4EEC\u53EF\u4EE5\u8BBE\u8BA1\u4E00\u4E2A\u9009\u9879\u53C2\u6570\uFF0C\u5141\u8BB8\u6307\u5B9A\u8C03\u5EA6\u5668</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>foo<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4EEC\u4FEE\u6539\u4E00\u4E0B<code>effect</code>\u51FD\u6570\u7684\u5B9E\u73B0\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code>function effect(fn, options = {}) {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const effectFn = () =&gt; {
</span><span class="token prefix unchanged"> </span><span class="token line">   cleanup(effectFn)
</span><span class="token prefix unchanged"> </span><span class="token line">   // \u5F53\u8C03\u7528 effect \u6CE8\u518C\u526F\u4F5C\u7528\u51FD\u6570\u65F6\uFF0C\u5C06\u526F\u4F5C\u7528\u51FD\u6570\u590D\u5236\u7ED9 activeEffect
</span><span class="token prefix unchanged"> </span><span class="token line">   activeEffect = effectFn
</span><span class="token prefix unchanged"> </span><span class="token line">   // \u5728\u8C03\u7528\u526F\u4F5C\u7528\u51FD\u6570\u4E4B\u524D\u5C06\u5F53\u524D\u526F\u4F5C\u7528\u51FD\u6570\u538B\u6808
</span><span class="token prefix unchanged"> </span><span class="token line">   effectStack.push(effectFn)
</span><span class="token prefix unchanged"> </span><span class="token line">   fn()
</span><span class="token prefix unchanged"> </span><span class="token line">   // \u5728\u5F53\u524D\u526F\u4F5C\u7528\u51FD\u6570\u6267\u884C\u5B8C\u6BD5\u540E\uFF0C\u5C06\u5F53\u524D\u526F\u4F5C\u7528\u51FD\u6570\u5F39\u51FA\u6808\uFF0C\u5E76\u8FD8\u539F activeEffect \u4E3A\u4E4B\u524D\u7684\u503C
</span><span class="token prefix unchanged"> </span><span class="token line">   effectStack.pop()
</span><span class="token prefix unchanged"> </span><span class="token line">   activeEffect = effectStack[effectStack.length - 1]
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span><span class="token prefix unchanged"> </span><span class="token line"> // \u5C06 options \u6302\u5728\u5230 effectFn \u4E0A
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">  effectFn.options = options
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> // activeEffect.deps \u7528\u6765\u5B58\u50A8\u6240\u6709\u4E0E\u8BE5\u526F\u4F5C\u7528\u51FD\u6570\u76F8\u5173\u7684\u4F9D\u8D56\u96C6\u5408
</span><span class="token prefix unchanged"> </span><span class="token line"> effectFn.deps = []
</span><span class="token prefix unchanged"> </span><span class="token line"> // \u6267\u884C\u526F\u4F5C\u7528\u51FD\u6570
</span><span class="token prefix unchanged"> </span><span class="token line"> effectFn()
</span></span>}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4FEE\u6539\u4E00\u4E0B<code>trigger</code>\u51FD\u6570:</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code>function trigger(target, key) {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const depsMap = bucket.get(target)
</span><span class="token prefix unchanged"> </span><span class="token line"> if (!depsMap) return
</span><span class="token prefix unchanged"> </span><span class="token line"> const effects = depsMap.get(key)
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const effectsToRun = new Set()
</span><span class="token prefix unchanged"> </span><span class="token line"> effects &amp;&amp; effects.forEach(effectFn =&gt; {
</span><span class="token prefix unchanged"> </span><span class="token line">   if (effectFn !== activeEffect) {
</span><span class="token prefix unchanged"> </span><span class="token line">     effectsToRun.add(effectFn)
</span><span class="token prefix unchanged"> </span><span class="token line">   }
</span><span class="token prefix unchanged"> </span><span class="token line"> })
</span><span class="token prefix unchanged"> </span><span class="token line"> effectsToRun.forEach(effectFn =&gt; {
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">    if (effectFn.options.scheduler) {
</span><span class="token prefix inserted">+</span><span class="token line">      effectFn.options.scheduler(effectFn)
</span><span class="token prefix inserted">+</span><span class="token line">    } else {
</span><span class="token prefix inserted">+</span><span class="token line">      effectFn()
</span><span class="token prefix inserted">+</span><span class="token line">    }
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> })
</span></span>}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6709\u4E86\u4E0A\u9762\u7684\u4EE3\u7801\u5B9E\u73B0\u3002\u6211\u4EEC\u4FEE\u6539\u4E00\u4E0B\u4E4B\u524D\u7684\u4F8B\u5B50</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span>

<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>foo<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token parameter">effect</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span>effect<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

obj<span class="token punctuation">.</span>foo<span class="token operator">++</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u7ED3\u675F\u4E86&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6700\u540E\u5C31\u80FD\u6253\u5370\u51FA\u6211\u4EEC\u60F3\u8981\u7684\u6548\u679C\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>1
\u7ED3\u675F\u4E86
2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>\u5206\u5272\u4E00\u4E0B====</p><p>\u5927\u5BB6\u518D\u6765\u601D\u8003\u4E00\u4E2A\u95EE\u9898\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span>

<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>foo<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

obj<span class="token punctuation">.</span>foo<span class="token operator">++</span>
obj<span class="token punctuation">.</span>foo<span class="token operator">++</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0A\u9762\u7684\u4EE3\u7801\u4F1A\u6253\u5370\u4E09\u6B21:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>1
2
3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u6211\u4E0D\u60F3\u5173\u5FC3\u4E2D\u95F4\u7684\u72B6\u6001\uFF0C\u53EA\u9700\u8981\u6700\u5F00\u59CB\u548C\u6700\u540E\u7684\u72B6\u6001\uFF0C\u5982\u679C\u7528\u8C03\u5EA6\u5668\u5B9E\u73B0\u5462\uFF1F</p><p>\u6211\u4EEC\u53EF\u4EE5\u8FD9\u4E48\u505A\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>
<span class="token comment">// =====================</span>
<span class="token comment">// \u4EE3\u7801\u5B9E\u73B0</span>
<span class="token keyword">const</span> jobQueue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> p <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// \u4E00\u4E2A\u6807\u5FD7\u4EE3\u8868\u662F\u5426\u6B63\u5728\u5237\u65B0\u961F\u5217</span>
<span class="token keyword">let</span> isFlushing <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token keyword">function</span> <span class="token function">flushJob</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u5982\u679C\u961F\u5217\u6B63\u5728\u5237\u65B0\uFF0C\u5219\u4EC0\u4E48\u90FD\u4E0D\u505A</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isFlushing<span class="token punctuation">)</span> <span class="token keyword">return</span>
  <span class="token comment">// \u8BBE\u7F6E\u4E3A true\uFF0C\u4EE3\u8868\u6B63\u5728\u5237\u65B0</span>
  isFlushing <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token comment">// \u5728\u5FAE\u4EFB\u52A1\u961F\u5217\u4E2D\u5237\u65B0 jobQueue \u961F\u5217</span>
  p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    jobQueue<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">job</span> <span class="token operator">=&gt;</span> <span class="token function">job</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">finally</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    isFlushing <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// =====================</span>

<span class="token comment">// \u793A\u4F8B\u4EE3\u7801</span>
<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>foo<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    jobQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span>
    <span class="token function">flushJob</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

obj<span class="token punctuation">.</span>foo<span class="token operator">++</span>
obj<span class="token punctuation">.</span>foo<span class="token operator">++</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-8-\u8BA1\u7B97\u5C5E\u6027-computed-\u4E0E-lazy" tabindex="-1"><a class="header-anchor" href="#_4-8-\u8BA1\u7B97\u5C5E\u6027-computed-\u4E0E-lazy" aria-hidden="true">#</a> 4.8 \u8BA1\u7B97\u5C5E\u6027 computed \u4E0E lazy</h2><p>computed\u7684\u6838\u5FC3\u5728\u4E8E\u8FD9\u51E0\u70B9:</p><ul><li><strong>lazy \u53EF\u901A\u8FC7options\u8BBE\u7F6E\uFF0C\u5F53\u5B83\u4E3Atrue\u65F6\uFF0C\u4E0D\u4F1A\u7ACB\u5373\u6267\u884C\u526F\u4F5C\u7528\u51FD\u6570</strong></li><li><strong>\u526F\u4F5C\u7528\u51FD\u6570\u53EF\u4EE5\u624B\u52A8\u8C03\u7528\uFF0Cgetter\u53EF\u4EE5\u8FD4\u56DE\u503C</strong></li><li><strong>\u5BF9\u4E8E\u8BA1\u7B97\u5C5E\u6027\u7684effect\u51FD\u6570\u6765\u8BF4\uFF0C\u5B83\u5185\u90E8\u7684\u54CD\u5E94\u5F0F\u6570\u636E\u6536\u96C6\u7684\u4F1A\u662F\u8BA1\u7B97\u5C5E\u6027\u7684effect</strong></li><li><strong>\u8BA1\u7B97\u5C5E\u6027\u7684get\u548Cset\u6CA1\u6709track\u548Ctrigger\uFF0C\u9700\u8981\u624B\u52A8\u8C03\u7528</strong></li><li><strong>\u5F53\u54CD\u5E94\u5F0F\u6570\u636E\u53D8\u5316\u65F6\uFF0Cdirty\u8BBE\u7F6E\u4E3Atrue</strong></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token parameter">getter</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> value
  <span class="token keyword">let</span> dirty <span class="token operator">=</span> <span class="token boolean">true</span>

  <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>dirty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        dirty <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token function">trigger</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  
  <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>dirty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        value <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        dirty <span class="token operator">=</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span>
      <span class="token function">track</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> value
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> obj
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code>function effect(fn, options = {}) {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const effectFn = () =&gt; {
</span><span class="token prefix unchanged"> </span><span class="token line">   cleanup(effectFn)
</span><span class="token prefix unchanged"> </span><span class="token line">   // \u5F53\u8C03\u7528 effect \u6CE8\u518C\u526F\u4F5C\u7528\u51FD\u6570\u65F6\uFF0C\u5C06\u526F\u4F5C\u7528\u51FD\u6570\u590D\u5236\u7ED9 activeEffect
</span><span class="token prefix unchanged"> </span><span class="token line">   activeEffect = effectFn
</span><span class="token prefix unchanged"> </span><span class="token line">   // \u5728\u8C03\u7528\u526F\u4F5C\u7528\u51FD\u6570\u4E4B\u524D\u5C06\u5F53\u524D\u526F\u4F5C\u7528\u51FD\u6570\u538B\u6808
</span><span class="token prefix unchanged"> </span><span class="token line">   effectStack.push(effectFn)
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">    const res = fn()
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   // \u5728\u5F53\u524D\u526F\u4F5C\u7528\u51FD\u6570\u6267\u884C\u5B8C\u6BD5\u540E\uFF0C\u5C06\u5F53\u524D\u526F\u4F5C\u7528\u51FD\u6570\u5F39\u51FA\u6808\uFF0C\u5E76\u8FD8\u539F activeEffect \u4E3A\u4E4B\u524D\u7684\u503C
</span><span class="token prefix unchanged"> </span><span class="token line">   effectStack.pop()
</span><span class="token prefix unchanged"> </span><span class="token line">   activeEffect = effectStack[effectStack.length - 1]
</span></span>
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">    return res
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> }
</span><span class="token prefix unchanged"> </span><span class="token line"> // \u5C06 options \u6302\u5728\u5230 effectFn \u4E0A
</span><span class="token prefix unchanged"> </span><span class="token line"> effectFn.options = options
</span><span class="token prefix unchanged"> </span><span class="token line"> // activeEffect.deps \u7528\u6765\u5B58\u50A8\u6240\u6709\u4E0E\u8BE5\u526F\u4F5C\u7528\u51FD\u6570\u76F8\u5173\u7684\u4F9D\u8D56\u96C6\u5408
</span><span class="token prefix unchanged"> </span><span class="token line"> effectFn.deps = []
</span><span class="token prefix unchanged"> </span><span class="token line"> // \u6267\u884C\u526F\u4F5C\u7528\u51FD\u6570
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">  if (!options.lazy) {
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   effectFn()
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">  }
</span></span>
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">  return effectFn
</span></span>}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4EEC\u6765\u5927\u81F4\u8D70\u4E00\u4E0B\u6D41\u7A0B\uFF1A</p><ul><li><p>\u521B\u5EFA\u8BA1\u7B97\u5C5E\u6027</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> sumRes <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> obj<span class="token punctuation">.</span>foo <span class="token operator">+</span> obj<span class="token punctuation">.</span>bar<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8BA1\u7B97\u5C5E\u6027<code>effect</code>\u51FD\u6570\u4F1A\u88AB\u521B\u5EFA\uFF0C\u5E76\u4E14lazy \u4E0D\u4F1A\u7ACB\u523B\u6267\u884C</p></li><li><p>\u8BBF\u95EE\u8BA1\u7B97\u5C5E\u6027</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sumRes<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol><li>\u521A\u5F00\u59CBdirty\u4E3Atrue, \u4F1A\u8C03\u7528\u8BA1\u7B97\u5C5E\u6027\u7684effect\u51FD\u6570\uFF0C\u8BA1\u7B97sumRes\uFF0Cdirty\u4E3Afalse.</li><li>\u5728\u8BA1\u7B97\u8FC7\u7A0B\u4E2D\uFF0C\u4F1A\u89E6\u53D1<code>obj.foo</code>\u548C<code>obj.bar</code>\u7684\u4F9D\u8D56\u6536\u96C6\uFF0C\u5B83\u4EEC\u4F1A\u6536\u96C6\u8BA1\u7B97\u5C5E\u6027\u7684effect\u51FD\u6570</li><li>\u8BA1\u7B97\u5B8C\u6210\u540E\uFF0C\u624B\u52A8\u8C03\u7528<code>track</code>\uFF0C\u8BA9\u8BA1\u7B97\u5C5E\u6027\u6536\u96C6\u4E00\u4E0B\u81EA\u5DF1getter\u7684effect\u51FD\u6570</li></ol></li><li><p>\u4FEE\u6539\u54CD\u5E94\u5F0F\u53D8\u91CF</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>obj<span class="token punctuation">.</span>foo <span class="token operator">++</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u89E6\u53D1get\u65B9\u6CD5\uFF0C\u4F1A\u6267\u884C<code>scheduler</code>\u65B9\u6CD5\uFF0C\u5224\u65AD<code>dirty === false</code>, \u8BBE\u7F6E<code>dirty = true</code>, \u7136\u540E\u6267\u884C\u4E4B\u524D\u8BA1\u7B97\u5C5E\u6027\u81EA\u5DF1\u6536\u96C6\u7684getter\u526F\u4F5C\u7528\u51FD\u6570, \u6700\u540E\u91CD\u65B0\u8BA1\u7B97\u65B0\u503C\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>scheduler() {
    if (!dirty) {
      dirty = true
      trigger(obj, &#39;value&#39;)
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="_4-9-watch\u7684\u5B9E\u73B0\u539F\u7406" tabindex="-1"><a class="header-anchor" href="#_4-9-watch\u7684\u5B9E\u73B0\u539F\u7406" aria-hidden="true">#</a> 4.9 watch\u7684\u5B9E\u73B0\u539F\u7406</h2><p><strong>watch \u7684\u5B9E\u73B0\u672C\u8D28\u4E0A\u5C31\u662F\u5229\u7528\u4E86 effect \u4EE5\u53CA options.scheduler \u9009\u9879</strong></p><p>\u6211\u4EEC\u5148\u6765\u5B9E\u73B0\u4E00\u4E2A\u6700\u7B80\u5355\u7684watch</p><p>\u4F8B\u5B50\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">watch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> obj<span class="token punctuation">.</span>foo<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">newVal<span class="token punctuation">,</span> oldVal</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newVal<span class="token punctuation">,</span> oldVal<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5B9E\u73B0\u4EE3\u7801</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">watch</span><span class="token punctuation">(</span><span class="token parameter">source<span class="token punctuation">,</span> cb<span class="token punctuation">,</span> options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> getter
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> source <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    getter <span class="token operator">=</span> source
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> oldValue<span class="token punctuation">,</span> newValue

  <span class="token keyword">const</span> <span class="token function-variable function">job</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    newValue <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">cb</span><span class="token punctuation">(</span>oldValue<span class="token punctuation">,</span> newValue<span class="token punctuation">)</span>
    oldValue <span class="token operator">=</span> newValue
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">getter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token function-variable function">scheduler</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">job</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">)</span>
  oldValue <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u770B\u5230\uFF0C\u4EE3\u7801\u96BE\u5EA6\u4E0D\u5927\uFF1A</p><ol><li><p>\u4F1A\u5C06\u6211\u4EEC\u4F20\u5165\u7684getter,\u4F5C\u4E3Aeffect\u51FD\u6570\u7684getter</p></li><li><p>\u6211\u4EEC\u8BBE\u7F6E\u4E86<code>lazy</code>\u4E3Atrue, \u4E0D\u4F1A\u7ACB\u5373\u6267\u884C\u3002</p><p>\u7136\u540E\u5B9E\u73B0\u4E86<code>scheduler</code>\u8C03\u5EA6\u5668\uFF0C\u4F1A\u6267\u884C\u6211\u4EEC\u7684\u56DE\u8C03\u51FD\u6570\u3002</p></li><li><p>\u5728\u521D\u59CB\u5316\u65F6\uFF0C\u4F1A\u5148\u8C03\u7528getter\u7F13\u5B58\u4E00\u4E0B\u6700\u65B0\u7684\u503C\uFF0C\u8FD9\u6837\u6211\u4EEC\u5728\u521D\u6B21\u4FEE\u6539\u6570\u636E\u65F6\uFF0C\u5C31\u80FD\u62FF\u5230\u65E7\u7684\u503C\u4E86\u3002</p></li></ol><hr><p>\u4E0A\u9762\u53EA\u5B9E\u73B0\u4E86\u6700\u57FA\u7840\u7684\u529F\u80FD\uFF0C\u5176\u5B9E<code>watch</code>\u8FD8\u652F\u6301\u7ACB\u5373\u6267\u884C\uFF0C\u5C31\u50CF\u4E0B\u9762\u8FD9\u6837\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">watch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> obj<span class="token punctuation">.</span>foo<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">newVal<span class="token punctuation">,</span> oldVal</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newVal<span class="token punctuation">,</span> oldVal<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">immediate</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// \u7ACB\u5373\u6267\u884C</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4EEC\u4FEE\u6539\u4E00\u4E0B\u5B9E\u73B0\u4EE3\u7801\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code>function watch(source, cb, options = {}) {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> let getter
</span><span class="token prefix unchanged"> </span><span class="token line"> if (typeof source === &#39;function&#39;) {
</span><span class="token prefix unchanged"> </span><span class="token line">   getter = source
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> let oldValue, newValue
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const job = () =&gt; {
</span><span class="token prefix unchanged"> </span><span class="token line">   newValue = effectFn()
</span><span class="token prefix unchanged"> </span><span class="token line">   cb(oldValue, newValue)
</span><span class="token prefix unchanged"> </span><span class="token line">   oldValue = newValue
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const effectFn = effect(
</span><span class="token prefix unchanged"> </span><span class="token line">   // \u6267\u884C getter
</span><span class="token prefix unchanged"> </span><span class="token line">   () =&gt; getter(),
</span><span class="token prefix unchanged"> </span><span class="token line">   {
</span><span class="token prefix unchanged"> </span><span class="token line">     lazy: true,
</span><span class="token prefix unchanged"> </span><span class="token line">     scheduler: () =&gt; {
</span><span class="token prefix unchanged"> </span><span class="token line">       job()
</span><span class="token prefix unchanged"> </span><span class="token line">     }
</span><span class="token prefix unchanged"> </span><span class="token line">   }
</span><span class="token prefix unchanged"> </span><span class="token line"> )
</span><span class="token prefix unchanged"> </span><span class="token line"> 
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">  if (options.immediate) {
</span><span class="token prefix inserted">+</span><span class="token line">    job()
</span><span class="token prefix inserted">+</span><span class="token line">  } else {
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   oldValue = effectFn()
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">  }
</span></span>}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u6837\u5C31\u53EF\u4EE5\u5728watch\u521D\u59CB\u5316\u65F6\u6267\u884C\u4E00\u904D\u56DE\u8C03\u4E86\u3002</p><hr><p>\u9664\u6B64\u4E4B\u5916\uFF0C<code>watch</code>\u8FD8\u652F\u6301\u5F02\u6B65\u6267\u884C\u56DE\u8C03\u51FD\u6570\uFF0C\u5982\u4E0B\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">watch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> obj<span class="token punctuation">.</span>foo<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">newVal<span class="token punctuation">,</span> oldVal</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newVal<span class="token punctuation">,</span> oldVal<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">immediate</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">flush</span><span class="token operator">:</span> <span class="token string">&#39;post&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5B9E\u73B0\u8D77\u6765\u540C\u6837\u7B80\u5355\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code>function watch(source, cb, options = {}) {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> let getter
</span><span class="token prefix unchanged"> </span><span class="token line"> if (typeof source === &#39;function&#39;) {
</span><span class="token prefix unchanged"> </span><span class="token line">   getter = source
</span><span class="token prefix unchanged"> </span><span class="token line"> } else {
</span><span class="token prefix unchanged"> </span><span class="token line">   getter = () =&gt; traverse(source)
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> let oldValue, newValue
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const job = () =&gt; {
</span><span class="token prefix unchanged"> </span><span class="token line">   newValue = effectFn()
</span><span class="token prefix unchanged"> </span><span class="token line">   cb(oldValue, newValue)
</span><span class="token prefix unchanged"> </span><span class="token line">   oldValue = newValue
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const effectFn = effect(
</span><span class="token prefix unchanged"> </span><span class="token line">   // \u6267\u884C getter
</span><span class="token prefix unchanged"> </span><span class="token line">   () =&gt; getter(),
</span><span class="token prefix unchanged"> </span><span class="token line">   {
</span><span class="token prefix unchanged"> </span><span class="token line">     lazy: true,
</span><span class="token prefix unchanged"> </span><span class="token line">     scheduler: () =&gt; {
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">        if (options.flush === &#39;post&#39;) {
</span><span class="token prefix inserted">+</span><span class="token line">          const p = Promise.resolve()
</span><span class="token prefix inserted">+</span><span class="token line">          p.then(job)
</span><span class="token prefix inserted">+</span><span class="token line">        } else {
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">         job()
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">        }
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">     }
</span><span class="token prefix unchanged"> </span><span class="token line">   }
</span><span class="token prefix unchanged"> </span><span class="token line"> )
</span><span class="token prefix unchanged"> </span><span class="token line"> 
</span><span class="token prefix unchanged"> </span><span class="token line"> if (options.immediate) {
</span><span class="token prefix unchanged"> </span><span class="token line">   job()
</span><span class="token prefix unchanged"> </span><span class="token line"> } else {
</span><span class="token prefix unchanged"> </span><span class="token line">   oldValue = effectFn()
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span></span>}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>\u5927\u5BB6\u53EF\u80FD\u53D1\u73B0\uFF0Cgetter\u7684\u5199\u6CD5\u90FD\u662F\u51FD\u6570\u7684\u5199\u6CD5\uFF0C<code>watch</code>\u5E94\u8BE5\u4E5F\u652F\u6301\u76F4\u63A5\u89C2\u5BDF\u5BF9\u8C61\u7684\u53D8\u5316</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">watch</span><span class="token punctuation">(</span>obj <span class="token comment">/*\u6B64\u5904*/</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">newVal<span class="token punctuation">,</span> oldVal</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newVal<span class="token punctuation">,</span> oldVal<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">immediate</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">flush</span><span class="token operator">:</span> <span class="token string">&#39;post&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4EEC\u6765\u4FEE\u6539\u4E00\u4E0B\u83B7\u53D6<code>getter</code>\u7684\u5730\u65B9\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">function traverse(value, seen = new Set()) {
</span><span class="token prefix inserted">+</span><span class="token line">  if (typeof value !== &#39;object&#39; || value === null || seen.has(value)) return
</span><span class="token prefix inserted">+</span><span class="token line">  seen.add(value)
</span><span class="token prefix inserted">+</span><span class="token line">  for (const k in value) {
</span><span class="token prefix inserted">+</span><span class="token line">    traverse(value[k], seen)
</span><span class="token prefix inserted">+</span><span class="token line">  }
</span><span class="token prefix inserted">+</span><span class="token line">  return value
</span><span class="token prefix inserted">+</span><span class="token line">}
</span></span>
function watch(source, cb, options = {}) {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> let getter
</span><span class="token prefix unchanged"> </span><span class="token line"> if (typeof source === &#39;function&#39;) {
</span><span class="token prefix unchanged"> </span><span class="token line">   getter = source
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">  } else {
</span><span class="token prefix inserted">+</span><span class="token line">    getter = () =&gt; traverse(source)
</span><span class="token prefix inserted">+</span><span class="token line">  }
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> let oldValue, newValue
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const job = () =&gt; {
</span><span class="token prefix unchanged"> </span><span class="token line">   newValue = effectFn()
</span><span class="token prefix unchanged"> </span><span class="token line">   cb(oldValue, newValue)
</span><span class="token prefix unchanged"> </span><span class="token line">   oldValue = newValue
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const effectFn = effect(
</span><span class="token prefix unchanged"> </span><span class="token line">   // \u6267\u884C getter
</span><span class="token prefix unchanged"> </span><span class="token line">   () =&gt; getter(),
</span><span class="token prefix unchanged"> </span><span class="token line">   {
</span><span class="token prefix unchanged"> </span><span class="token line">     lazy: true,
</span><span class="token prefix unchanged"> </span><span class="token line">     scheduler: () =&gt; {
</span><span class="token prefix unchanged"> </span><span class="token line">       if (options.flush === &#39;post&#39;) {
</span><span class="token prefix unchanged"> </span><span class="token line">         const p = Promise.resolve()
</span><span class="token prefix unchanged"> </span><span class="token line">         p.then(job)
</span><span class="token prefix unchanged"> </span><span class="token line">       } else {
</span><span class="token prefix unchanged"> </span><span class="token line">         job()
</span><span class="token prefix unchanged"> </span><span class="token line">       }
</span><span class="token prefix unchanged"> </span><span class="token line">     }
</span><span class="token prefix unchanged"> </span><span class="token line">   }
</span><span class="token prefix unchanged"> </span><span class="token line"> )
</span><span class="token prefix unchanged"> </span><span class="token line"> 
</span><span class="token prefix unchanged"> </span><span class="token line"> if (options.immediate) {
</span><span class="token prefix unchanged"> </span><span class="token line">   job()
</span><span class="token prefix unchanged"> </span><span class="token line"> } else {
</span><span class="token prefix unchanged"> </span><span class="token line">   oldValue = effectFn()
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span></span>}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0D\u96BE\u770B\u51FA\uFF0C<code>traverse</code>\u4F1A\u9012\u5F52\u904D\u5386\u5BF9\u8C61\u4E0B\u6240\u6709\u7684\u5C5E\u6027\u3002</p><p><strong>\u6240\u4EE5\u63A8\u8350\u5927\u5BB6\u4F7F\u7528<code>watch</code>\u7684\u65F6\u5019\uFF0Cgetter\u4F7F\u7528\u51FD\u6570\u7684\u5199\u6CD5\uFF0C\u53EF\u4EE5\u7CBE\u786E\u5230\u5177\u4F53\u7684\u5C5E\u6027\uFF01</strong></p><h2 id="_4-10-\u8FC7\u671F\u7684\u526F\u4F5C\u7528" tabindex="-1"><a class="header-anchor" href="#_4-10-\u8FC7\u671F\u7684\u526F\u4F5C\u7528" aria-hidden="true">#</a> 4.10 \u8FC7\u671F\u7684\u526F\u4F5C\u7528</h2><p>\u6211\u4EEC\u6709\u65F6\u4F1A\u9047\u5230\u5982\u4E0B\u573A\u666F\uFF0C\u540C\u6837\u7684\u63A5\u53E3\u5148\u540E\u8C03\u7528\u4E86\u4E24\u6B21</p><ul><li>\u53D1\u9001\u8BF7\u6C42A</li><li>\u53D1\u9001\u8BF7\u6C42B</li></ul><p>\u6211\u4EEC\u671F\u671B\u7684\u662F\u6700\u7EC8\u83B7\u53D6\u5230\u7684\u662FB, \u4F46\u662F\u5982\u679CB\u63A5\u53E3\u6BD4\u8F83\u6162\uFF0C\u4F1A\u5BFC\u81F4A\u7684\u7ED3\u679C\u8986\u76D6B\u3002</p><p>\u5176\u5B9E\u8FD9\u79CD\u95EE\u9898\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528<code>watch</code>\u7684<code>onInvalidate</code>\u6765\u89E3\u51B3\u3002</p><p><code>onInvalidate</code>\u662F\u5E72\u561B\u7684\u5462\uFF1F</p><p>\u6211\u4EEC\u5148\u6765\u770B\u4E00\u6BB5\u4EE3\u7801\uFF0C\u5F53\u6570\u636E\u53D8\u5316\u65F6\uFF0C\u4F1A\u91CD\u65B0\u8BF7\u6C42\u63A5\u53E3\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">watch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> obj<span class="token punctuation">.</span>foo<span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">newVal<span class="token punctuation">,</span> oldVal<span class="token punctuation">,</span> onInvalidate</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  finallyData <span class="token operator">=</span> res
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>finallyData<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F88\u660E\u663E\uFF0C\u4F1A\u5BFC\u81F4\u51FA\u73B0\u4E0A\u9762\u7684\u95EE\u9898\u3002\u6211\u4EEC\u4FEE\u6539\u4E00\u4E0B\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">watch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> obj<span class="token punctuation">.</span>foo<span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">newVal<span class="token punctuation">,</span> oldVal<span class="token punctuation">,</span> onInvalidate</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> expired <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token function">onInvalidate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    expired <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>expired<span class="token punctuation">)</span> <span class="token keyword">return</span>

  finallyData <span class="token operator">=</span> res
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>finallyData<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u4E0A\u9762\u7684\u4EE3\u7801\u6240\u793A\uFF0C\u5728\u53D1\u9001\u8BF7\u6C42\u4E4B\u524D\uFF0C\u6211\u4EEC\u5B9A\u4E49\u4E86 expired \u6807\u5FD7 \u53D8\u91CF\uFF0C\u7528\u6765\u6807\u8BC6\u5F53\u524D\u526F\u4F5C\u7528\u51FD\u6570\u7684\u6267\u884C\u662F\u5426\u8FC7\u671F\uFF1B\u63A5\u7740\u8C03\u7528 onInvalidate \u51FD\u6570\u6CE8\u518C\u4E86\u4E00\u4E2A\u8FC7\u671F\u56DE\u8C03\uFF0C\u5F53\u8BE5\u526F\u4F5C\u7528\u51FD\u6570\u7684\u6267\u884C\u8FC7 \u671F\u65F6\u5C06 expired \u6807\u5FD7\u53D8\u91CF\u8BBE\u7F6E\u4E3A true\uFF1B\u6700\u540E\u53EA\u6709\u5F53\u6CA1\u6709\u8FC7\u671F\u65F6\u624D\u91C7\u7528\u8BF7\u6C42\u7ED3\u679C\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u6709\u6548\u5730\u907F\u514D\u4E0A\u8FF0\u95EE\u9898\u4E86\u3002</p><p>onInvalidate \u7684\u539F\u7406 \u662F\u4EC0\u4E48\u5462\uFF1F\u5176\u5B9E\u5F88\u7B80\u5355\uFF0C\u5728 watch \u5185\u90E8\u6BCF\u6B21\u68C0\u6D4B\u5230\u53D8\u66F4\u540E\uFF0C\u5728\u526F\u4F5C\u7528 \u51FD\u6570\u91CD\u65B0\u6267\u884C\u4E4B\u524D\uFF0C\u4F1A\u5148\u8C03\u7528\u6211\u4EEC\u901A\u8FC7 onInvalidate \u51FD\u6570\u6CE8\u518C\u7684\u8FC7 \u671F\u56DE\u8C03\uFF0C\u4EC5\u6B64\u800C\u5DF2</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code>function watch(source, cb, options = {}) {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> let getter
</span><span class="token prefix unchanged"> </span><span class="token line"> if (typeof source === &#39;function&#39;) {
</span><span class="token prefix unchanged"> </span><span class="token line">   getter = source
</span><span class="token prefix unchanged"> </span><span class="token line"> } else {
</span><span class="token prefix unchanged"> </span><span class="token line">   getter = () =&gt; traverse(source)
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> let oldValue, newValue
</span></span>
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">  let cleanup
</span><span class="token prefix inserted">+</span><span class="token line">  function onInvalidate(fn) {
</span><span class="token prefix inserted">+</span><span class="token line">    cleanup = fn
</span><span class="token prefix inserted">+</span><span class="token line">  }
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const job = () =&gt; {
</span><span class="token prefix unchanged"> </span><span class="token line">   newValue = effectFn()
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">    if (cleanup) {
</span><span class="token prefix inserted">+</span><span class="token line">      cleanup()
</span><span class="token prefix inserted">+</span><span class="token line">    }
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">    cb(oldValue, newValue)
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">    cb(oldValue, newValue, onInvalidate)
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   oldValue = newValue
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const effectFn = effect(
</span><span class="token prefix unchanged"> </span><span class="token line">   // \u6267\u884C getter
</span><span class="token prefix unchanged"> </span><span class="token line">   () =&gt; getter(),
</span><span class="token prefix unchanged"> </span><span class="token line">   {
</span><span class="token prefix unchanged"> </span><span class="token line">     lazy: true,
</span><span class="token prefix unchanged"> </span><span class="token line">     scheduler: () =&gt; {
</span><span class="token prefix unchanged"> </span><span class="token line">       if (options.flush === &#39;post&#39;) {
</span><span class="token prefix unchanged"> </span><span class="token line">         const p = Promise.resolve()
</span><span class="token prefix unchanged"> </span><span class="token line">         p.then(job)
</span><span class="token prefix unchanged"> </span><span class="token line">       } else {
</span><span class="token prefix unchanged"> </span><span class="token line">         job()
</span><span class="token prefix unchanged"> </span><span class="token line">       }
</span><span class="token prefix unchanged"> </span><span class="token line">     }
</span><span class="token prefix unchanged"> </span><span class="token line">   }
</span><span class="token prefix unchanged"> </span><span class="token line"> )
</span><span class="token prefix unchanged"> </span><span class="token line"> 
</span><span class="token prefix unchanged"> </span><span class="token line"> if (options.immediate) {
</span><span class="token prefix unchanged"> </span><span class="token line">   job()
</span><span class="token prefix unchanged"> </span><span class="token line"> } else {
</span><span class="token prefix unchanged"> </span><span class="token line">   oldValue = effectFn()
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span></span>}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u672C\u7AE0\u5B8C\u6574\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#\u672C\u7AE0\u5B8C\u6574\u4EE3\u7801" aria-hidden="true">#</a> \u672C\u7AE0\u5B8C\u6574\u4EE3\u7801</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u5B58\u50A8\u526F\u4F5C\u7528\u51FD\u6570\u7684\u6876</span>
<span class="token keyword">const</span> bucket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// \u539F\u59CB\u6570\u636E</span>
<span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">bar</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span>
<span class="token comment">// \u5BF9\u539F\u59CB\u6570\u636E\u7684\u4EE3\u7406</span>
<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u62E6\u622A\u8BFB\u53D6\u64CD\u4F5C</span>
  <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u5C06\u526F\u4F5C\u7528\u51FD\u6570 activeEffect \u6DFB\u52A0\u5230\u5B58\u50A8\u526F\u4F5C\u7528\u51FD\u6570\u7684\u6876\u4E2D</span>
    <span class="token function">track</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token comment">// \u8FD4\u56DE\u5C5E\u6027\u503C</span>
    <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// \u62E6\u622A\u8BBE\u7F6E\u64CD\u4F5C</span>
  <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> newVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u8BBE\u7F6E\u5C5E\u6027\u503C</span>
    target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> newVal
    <span class="token comment">// \u628A\u526F\u4F5C\u7528\u51FD\u6570\u4ECE\u6876\u91CC\u53D6\u51FA\u5E76\u6267\u884C</span>
    <span class="token function">trigger</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">track</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>activeEffect<span class="token punctuation">)</span> <span class="token keyword">return</span>
  <span class="token keyword">let</span> depsMap <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    bucket<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token punctuation">(</span>depsMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> deps <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>deps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    depsMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token punctuation">(</span>deps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  deps<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span>
  activeEffect<span class="token punctuation">.</span>deps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>deps<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">trigger</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> depsMap <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span> <span class="token keyword">return</span>
  <span class="token keyword">const</span> effects <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>

  <span class="token keyword">const</span> effectsToRun <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  effects <span class="token operator">&amp;&amp;</span> effects<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">effectFn</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>effectFn <span class="token operator">!==</span> activeEffect<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      effectsToRun<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  effectsToRun<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">effectFn</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>effectFn<span class="token punctuation">.</span>options<span class="token punctuation">.</span>scheduler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      effectFn<span class="token punctuation">.</span>options<span class="token punctuation">.</span><span class="token function">scheduler</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token comment">// effects &amp;&amp; effects.forEach(effectFn =&gt; effectFn())</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u7528\u4E00\u4E2A\u5168\u5C40\u53D8\u91CF\u5B58\u50A8\u5F53\u524D\u6FC0\u6D3B\u7684 effect \u51FD\u6570</span>
<span class="token keyword">let</span> activeEffect
<span class="token comment">// effect \u6808</span>
<span class="token keyword">const</span> effectStack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token function-variable function">effectFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">cleanup</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span>
    <span class="token comment">// \u5F53\u8C03\u7528 effect \u6CE8\u518C\u526F\u4F5C\u7528\u51FD\u6570\u65F6\uFF0C\u5C06\u526F\u4F5C\u7528\u51FD\u6570\u590D\u5236\u7ED9 activeEffect</span>
    activeEffect <span class="token operator">=</span> effectFn
    <span class="token comment">// \u5728\u8C03\u7528\u526F\u4F5C\u7528\u51FD\u6570\u4E4B\u524D\u5C06\u5F53\u524D\u526F\u4F5C\u7528\u51FD\u6570\u538B\u6808</span>
    effectStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span>
    <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// \u5728\u5F53\u524D\u526F\u4F5C\u7528\u51FD\u6570\u6267\u884C\u5B8C\u6BD5\u540E\uFF0C\u5C06\u5F53\u524D\u526F\u4F5C\u7528\u51FD\u6570\u5F39\u51FA\u6808\uFF0C\u5E76\u8FD8\u539F activeEffect \u4E3A\u4E4B\u524D\u7684\u503C</span>
    effectStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    activeEffect <span class="token operator">=</span> effectStack<span class="token punctuation">[</span>effectStack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>

    <span class="token keyword">return</span> res
  <span class="token punctuation">}</span>
  <span class="token comment">// \u5C06 options \u6302\u5728\u5230 effectFn \u4E0A</span>
  effectFn<span class="token punctuation">.</span>options <span class="token operator">=</span> options
  <span class="token comment">// activeEffect.deps \u7528\u6765\u5B58\u50A8\u6240\u6709\u4E0E\u8BE5\u526F\u4F5C\u7528\u51FD\u6570\u76F8\u5173\u7684\u4F9D\u8D56\u96C6\u5408</span>
  effectFn<span class="token punctuation">.</span>deps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token comment">// \u6267\u884C\u526F\u4F5C\u7528\u51FD\u6570</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>options<span class="token punctuation">.</span>lazy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> effectFn
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">cleanup</span><span class="token punctuation">(</span><span class="token parameter">effectFn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> effectFn<span class="token punctuation">.</span>deps<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> deps <span class="token operator">=</span> effectFn<span class="token punctuation">.</span>deps<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    deps<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  effectFn<span class="token punctuation">.</span>deps<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token comment">// =========================</span>

<span class="token keyword">function</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token parameter">getter</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> value
  <span class="token keyword">let</span> dirty <span class="token operator">=</span> <span class="token boolean">true</span>

  <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>dirty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        dirty <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token function">trigger</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  
  <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>dirty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        value <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        dirty <span class="token operator">=</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span>
      <span class="token function">track</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> value
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> obj
<span class="token punctuation">}</span>


<span class="token comment">// =========================</span>

<span class="token keyword">function</span> <span class="token function">traverse</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> seen <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> value <span class="token operator">!==</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">||</span> value <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> seen<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span>
  seen<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> k <span class="token keyword">in</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">traverse</span><span class="token punctuation">(</span>value<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">,</span> seen<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> value
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">watch</span><span class="token punctuation">(</span><span class="token parameter">source<span class="token punctuation">,</span> cb<span class="token punctuation">,</span> options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> getter
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> source <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    getter <span class="token operator">=</span> source
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">getter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">traverse</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> oldValue<span class="token punctuation">,</span> newValue

  <span class="token keyword">let</span> cleanup
  <span class="token keyword">function</span> <span class="token function">onInvalidate</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    cleanup <span class="token operator">=</span> fn
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> <span class="token function-variable function">job</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    newValue <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cleanup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">cb</span><span class="token punctuation">(</span>oldValue<span class="token punctuation">,</span> newValue<span class="token punctuation">,</span> onInvalidate<span class="token punctuation">)</span>
    oldValue <span class="token operator">=</span> newValue
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>
    <span class="token comment">// \u6267\u884C getter</span>
    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">getter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token function-variable function">scheduler</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>flush <span class="token operator">===</span> <span class="token string">&#39;post&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> p <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>job<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token function">job</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">)</span>
  
  <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>immediate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">job</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    oldValue <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,152),c=[t];function i(l,o){return s(),a("div",null,c)}const r=n(p,[["render",i],["__file","Vue.js \u8BBE\u8BA1\u4E0E\u5B9E\u73B0\u9605\u8BFB\u7B14\u8BB0\uFF08\u56DB\uFF09\u7B2C 4 \u7AE0-\u54CD\u5E94\u7CFB\u7EDF\u7684\u4F5C\u7528\u4E0E\u5B9E\u73B0.html.vue"]]);export{r as default};
