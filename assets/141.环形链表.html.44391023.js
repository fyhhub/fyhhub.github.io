import{_ as e}from"./plugin-vueexport-helper.2444895f.js";import{o as t,c as o,a as n,b as s,d as p,e as c,r as l}from"./app.6bdcf101.js";const i={},r={id:"_141-\u73AF\u5F62\u94FE\u8868",tabindex:"-1"},d=n("a",{class:"header-anchor",href:"#_141-\u73AF\u5F62\u94FE\u8868","aria-hidden":"true"},"#",-1),u={href:"https://leetcode-cn.com/problems/linked-list-cycle/",target:"_blank",rel:"noopener noreferrer"},k=c(`<h2 id="\u601D\u8DEF" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF" aria-hidden="true">#</a> \u601D\u8DEF</h2><p>\u5FEB\u6162\u6307\u9488\uFF0C\u5FEB\u6307\u9488\u6BCF\u6B21\u8D70\u4E24\u6B65\uFF0C\u6162\u6307\u9488\u6BCF\u6B21\u8D70\u4E00\u6B65\uFF0C\u5982\u679C\u6709\u73AF\u5C31\u4E00\u5B9A\u4F1A\u76F8\u4EA4</p><h2 id="\u9898\u89E3" tabindex="-1"><a class="header-anchor" href="#\u9898\u89E3" aria-hidden="true">#</a> \u9898\u89E3</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * Definition for singly-linked list.
 * function ListNode(val) <span class="token punctuation">{</span>
 *     this.val = val;
 *     this.next = null;
 * <span class="token punctuation">}</span>
 */</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>ListNode<span class="token punctuation">}</span></span> <span class="token parameter">head</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>boolean<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">hasCycle</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> fast <span class="token operator">=</span> head<span class="token punctuation">;</span>
  <span class="token keyword">let</span> slow <span class="token operator">=</span> head<span class="token punctuation">;</span>
  <span class="token comment">// while\u5FAA\u73AF\u4FDD\u8BC1\u81F3\u5C11\u6709\u4E24\u4E2A\u8282\u70B9</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>fast <span class="token operator">&amp;&amp;</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>slow <span class="token operator">===</span> fast<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function v(m,h){const a=l("ExternalLinkIcon");return t(),o("div",null,[n("h1",r,[d,s(),n("a",u,[s("141.\u73AF\u5F62\u94FE\u8868"),p(a)])]),k])}const f=e(i,[["render",v],["__file","141.\u73AF\u5F62\u94FE\u8868.html.vue"]]);export{f as default};
