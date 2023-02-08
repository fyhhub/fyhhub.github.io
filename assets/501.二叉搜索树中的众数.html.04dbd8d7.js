import{_ as e}from"./plugin-vueexport-helper.2444895f.js";import{o as t,c as p,a as n,b as s,e as o,d as c,r as i}from"./app.c26c72b8.js";const l={},u={id:"_501-\u4E8C\u53C9\u641C\u7D22\u6811\u4E2D\u7684\u4F17\u6570",tabindex:"-1"},r=n("a",{class:"header-anchor",href:"#_501-\u4E8C\u53C9\u641C\u7D22\u6811\u4E2D\u7684\u4F17\u6570","aria-hidden":"true"},"#",-1),d={href:"https://leetcode-cn.com/problems/find-mode-in-binary-search-tree/solution/",target:"_blank",rel:"noopener noreferrer"},k=c(`<h2 id="\u9898\u89E3" tabindex="-1"><a class="header-anchor" href="#\u9898\u89E3" aria-hidden="true">#</a> \u9898\u89E3</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) <span class="token punctuation">{</span>
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * <span class="token punctuation">}</span>
 */</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>TreeNode<span class="token punctuation">}</span></span> <span class="token parameter">root</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">findMode</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> pre<span class="token punctuation">;</span>
  <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> maxCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token function">fn</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>pre <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// \u7B2C\u4E00\u4E2A\u8282\u70B9</span>
      count <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>pre <span class="token operator">===</span> root<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// \u6709\u76F8\u540C\u8282\u70B9</span>
      count<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// \u8282\u70B9\u4E0D\u540C</span>
      count <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    pre <span class="token operator">=</span> root<span class="token punctuation">.</span>val<span class="token punctuation">;</span>

    <span class="token comment">// \u4E0E\u6700\u5927\u9891\u7387\u76F8\u540C</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">===</span> maxCount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// \u5982\u679C\u5F53\u524D\u8282\u70B9\u51FA\u73B0\u7684\u9891\u7387 \u5927\u4E8E \u6700\u5927\u9891\u7387</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">&gt;</span> maxCount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// \u66F4\u65B0\u6700\u5927\u9891\u7387</span>
      maxCount <span class="token operator">=</span> count<span class="token punctuation">;</span>
      <span class="token comment">// \u8BB0\u5F55</span>
      res <span class="token operator">=</span> <span class="token punctuation">[</span>root<span class="token punctuation">.</span>val<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">fn</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">fn</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> res<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function v(m,b){const a=i("ExternalLinkIcon");return t(),p("div",null,[n("h1",u,[r,s(),n("a",d,[s("501.\u4E8C\u53C9\u641C\u7D22\u6811\u4E2D\u7684\u4F17\u6570"),o(a)])]),k])}const h=e(l,[["render",v],["__file","501.\u4E8C\u53C9\u641C\u7D22\u6811\u4E2D\u7684\u4F17\u6570.html.vue"]]);export{h as default};
