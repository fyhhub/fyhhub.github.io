import{_ as t}from"./plugin-vueexport-helper.2444895f.js";import{o as e,c as o,a as n,b as a,e as p,d as c,r as l}from"./app.6bdc584a.js";const r={},i={id:"_112-\u8DEF\u5F84\u603B\u548C",tabindex:"-1"},u=n("a",{class:"header-anchor",href:"#_112-\u8DEF\u5F84\u603B\u548C","aria-hidden":"true"},"#",-1),k={href:"https://leetcode-cn.com/problems/path-sum/",target:"_blank",rel:"noopener noreferrer"},d=c(`<div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>TreeNode<span class="token punctuation">}</span></span> <span class="token parameter">root</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">targetSum</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>boolean<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">hasPathSum</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">root<span class="token punctuation">,</span> targetSum</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">.</span>left <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>root<span class="token punctuation">.</span>right <span class="token operator">&amp;&amp;</span> targetSum <span class="token operator">===</span> root<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token function">hasPathSum</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">,</span> targetSum <span class="token operator">-</span> root<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token operator">||</span>
    <span class="token function">hasPathSum</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">,</span> targetSum <span class="token operator">-</span> root<span class="token punctuation">.</span>val<span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function m(v,_){const s=l("ExternalLinkIcon");return e(),o("div",null,[n("h1",i,[u,a(),n("a",k,[a("112. \u8DEF\u5F84\u603B\u548C"),p(s)])]),d])}const f=t(r,[["render",m],["__file","112. \u8DEF\u5F84\u603B\u548C.html.vue"]]);export{f as default};
