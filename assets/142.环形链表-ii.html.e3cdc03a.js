import{_ as t}from"./plugin-vueexport-helper.2444895f.js";import{o,c as p,a as n,b as s,d as e,e as i,r as c}from"./app.6039c471.js";const l={},r={id:"_142-\u73AF\u5F62\u94FE\u8868-ii",tabindex:"-1"},d=n("a",{class:"header-anchor",href:"#_142-\u73AF\u5F62\u94FE\u8868-ii","aria-hidden":"true"},"#",-1),u={href:"https://leetcode-cn.com/problems/linked-list-cycle-ii/",target:"_blank",rel:"noopener noreferrer"},k=i(`<p><img src="https://tva1.sinaimg.cn/large/008eGmZEly1goo58gauidg30fw0bi4qr.gif" alt="\u73AF\u5F62\u94FE\u8868" loading="lazy"></p><h2 id="\u9898\u89E3" tabindex="-1"><a class="header-anchor" href="#\u9898\u89E3" aria-hidden="true">#</a> \u9898\u89E3</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * Definition for singly-linked list.
 * function ListNode(val) <span class="token punctuation">{</span>
 *     this.val = val;
 *     this.next = null;
 * <span class="token punctuation">}</span>
 */</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>ListNode<span class="token punctuation">}</span></span> <span class="token parameter">head</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>ListNode<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">detectCycle</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> fast <span class="token operator">=</span> head<span class="token punctuation">;</span>
  <span class="token keyword">let</span> slow <span class="token operator">=</span> head<span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>fast <span class="token operator">&amp;&amp;</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token comment">// \u5FEB\u6162\u6307\u9488\u91CD\u5408</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>slow <span class="token operator">===</span> fast<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// \u4ECE\u94FE\u8868\u9996\u8282\u70B9\u5F00\u59CB</span>
      <span class="token keyword">let</span> index1 <span class="token operator">=</span> fast<span class="token punctuation">;</span>
      <span class="token comment">// \u4ECE\u76F8\u4EA4\u70B9\u5F00\u59CB</span>
      <span class="token keyword">let</span> index2 <span class="token operator">=</span> head<span class="token punctuation">;</span>
      <span class="token keyword">while</span> <span class="token punctuation">(</span>index1 <span class="token operator">!==</span> index2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        index1 <span class="token operator">=</span> index1<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        index2 <span class="token operator">=</span> index2<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> index2<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003</h2>`,4),v={href:"https://programmercarl.com/0142.%E7%8E%AF%E5%BD%A2%E9%93%BE%E8%A1%A8II.html#%E6%80%9D%E8%B7%AF",target:"_blank",rel:"noopener noreferrer"};function m(b,h){const a=c("ExternalLinkIcon");return o(),p("div",null,[n("h1",r,[d,s(),n("a",u,[s("142.\u73AF\u5F62\u94FE\u8868-ii"),e(a)])]),k,n("p",null,[n("a",v,[s("\u4EE3\u7801\u968F\u60F3\u5F55"),e(a)])])])}const x=t(l,[["render",m],["__file","142.\u73AF\u5F62\u94FE\u8868-ii.html.vue"]]);export{x as default};
