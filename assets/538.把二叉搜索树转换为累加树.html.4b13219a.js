import{_ as e}from"./plugin-vueexport-helper.2444895f.js";import{o as t,c as o,a as n,b as s,e as p,d as c,r as i}from"./app.c4c36fb7.js";const l={},r={id:"_538-\u628A\u4E8C\u53C9\u641C\u7D22\u6811\u8F6C\u6362\u4E3A\u7D2F\u52A0\u6811",tabindex:"-1"},u=n("a",{class:"header-anchor",href:"#_538-\u628A\u4E8C\u53C9\u641C\u7D22\u6811\u8F6C\u6362\u4E3A\u7D2F\u52A0\u6811","aria-hidden":"true"},"#",-1),d={href:"https://leetcode-cn.com/problems/convert-bst-to-greater-tree/",target:"_blank",rel:"noopener noreferrer"},k=c(`<h2 id="\u9898\u89E3" tabindex="-1"><a class="header-anchor" href="#\u9898\u89E3" aria-hidden="true">#</a> \u9898\u89E3</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) <span class="token punctuation">{</span>
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * <span class="token punctuation">}</span>
 */</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>TreeNode<span class="token punctuation">}</span></span> <span class="token parameter">root</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>TreeNode<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">convertBST</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> pre <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token function">fn</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>pre<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// \u548C\u5F53\u524D\u8282\u70B9\u7D2F\u52A0</span>
      root<span class="token punctuation">.</span>val <span class="token operator">+=</span> pre<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// \u8BB0\u5F55\u524D\u4E00\u4E2A\u503C</span>
    pre <span class="token operator">=</span> root<span class="token punctuation">.</span>val<span class="token punctuation">;</span>
    <span class="token function">fn</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">fn</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> root<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function v(m,b){const a=i("ExternalLinkIcon");return t(),o("div",null,[n("h1",r,[u,s(),n("a",d,[s("538.\u628A\u4E8C\u53C9\u641C\u7D22\u6811\u8F6C\u6362\u4E3A\u7D2F\u52A0\u6811"),p(a)])]),k])}const h=e(l,[["render",v],["__file","538.\u628A\u4E8C\u53C9\u641C\u7D22\u6811\u8F6C\u6362\u4E3A\u7D2F\u52A0\u6811.html.vue"]]);export{h as default};
