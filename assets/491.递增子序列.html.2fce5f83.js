import{_ as t}from"./plugin-vueexport-helper.2444895f.js";import{o as p,c as e,a as n,b as s,e as o,d as c,r as u}from"./app.6bdc584a.js";const l={},i={id:"_491-\u9012\u589E\u5B50\u5E8F\u5217",tabindex:"-1"},k=n("a",{class:"header-anchor",href:"#_491-\u9012\u589E\u5B50\u5E8F\u5217","aria-hidden":"true"},"#",-1),r={href:"https://leetcode-cn.com/problems/increasing-subsequences/",target:"_blank",rel:"noopener noreferrer"},d=c(`<h2 id="\u9898\u89E3" tabindex="-1"><a class="header-anchor" href="#\u9898\u89E3" aria-hidden="true">#</a> \u9898\u89E3</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token parameter">nums</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">findSubsequences</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">nums</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token parameter">startIndex<span class="token punctuation">,</span> path</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    path<span class="token punctuation">.</span>length <span class="token operator">&gt;=</span> <span class="token number">2</span> <span class="token operator">&amp;&amp;</span> res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span>path<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> used <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> startIndex<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> path<span class="token punctuation">[</span>path<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&gt;</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">||</span> used<span class="token punctuation">[</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token keyword">continue</span><span class="token punctuation">;</span>
      used<span class="token punctuation">[</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
      <span class="token function">fn</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> path<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">fn</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> res<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function m(v,b){const a=u("ExternalLinkIcon");return p(),e("div",null,[n("h1",i,[k,s(),n("a",r,[s("491.\u9012\u589E\u5B50\u5E8F\u5217"),o(a)])]),d])}const f=t(l,[["render",m],["__file","491.\u9012\u589E\u5B50\u5E8F\u5217.html.vue"]]);export{f as default};
