import{_ as e}from"./plugin-vueexport-helper.2444895f.js";import{o as t,c as o,a as n,b as s,e as p,d as c,r as i}from"./app.6296002a.js";const l={},u={id:"_530-\u4E8C\u53C9\u641C\u7D22\u6811\u7684\u6700\u5C0F\u7EDD\u5BF9\u5DEE",tabindex:"-1"},r=n("a",{class:"header-anchor",href:"#_530-\u4E8C\u53C9\u641C\u7D22\u6811\u7684\u6700\u5C0F\u7EDD\u5BF9\u5DEE","aria-hidden":"true"},"#",-1),d={href:"https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/",target:"_blank",rel:"noopener noreferrer"},k=c(`<h2 id="\u9898\u89E3" tabindex="-1"><a class="header-anchor" href="#\u9898\u89E3" aria-hidden="true">#</a> \u9898\u89E3</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) <span class="token punctuation">{</span>
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * <span class="token punctuation">}</span>
 */</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>TreeNode<span class="token punctuation">}</span></span> <span class="token parameter">root</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span>
 */</span>

<span class="token keyword">var</span> <span class="token function-variable function">getMinimumDifference</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> pre<span class="token punctuation">;</span>
  <span class="token keyword">var</span> min <span class="token operator">=</span> Number<span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">dfs</span><span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token function">dfs</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u5DE6</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>pre <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// \u5F53\u524D\u503C - \u4E0A\u6B21\u7684\u503C \u6C42\u6700\u5C0F\u5DEE</span>
      min <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>min<span class="token punctuation">,</span> root<span class="token punctuation">.</span>val <span class="token operator">-</span> pre<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    pre <span class="token operator">=</span> root<span class="token punctuation">.</span>val<span class="token punctuation">;</span> <span class="token comment">// \u8BB0\u5F55\u4E0A\u4E00\u6B21\u7684\u503C</span>
    <span class="token function">dfs</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u53F3</span>
  <span class="token punctuation">}</span>
  <span class="token function">dfs</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> min<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function m(v,b){const a=i("ExternalLinkIcon");return t(),o("div",null,[n("h1",u,[r,s(),n("a",d,[s("530.\u4E8C\u53C9\u641C\u7D22\u6811\u7684\u6700\u5C0F\u7EDD\u5BF9\u5DEE"),p(a)])]),k])}const h=e(l,[["render",m],["__file","530.\u4E8C\u53C9\u641C\u7D22\u6811\u7684\u6700\u5C0F\u7EDD\u5BF9\u5DEE.html.vue"]]);export{h as default};
