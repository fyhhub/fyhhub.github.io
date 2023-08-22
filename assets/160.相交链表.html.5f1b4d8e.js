import{_ as e}from"./plugin-vueexport-helper.2444895f.js";import{o as t,c as p,a as n,b as s,d as c,e as o,r as l}from"./app.78aaa0ee.js";const i={},u={id:"_160-\u76F8\u4EA4\u94FE\u8868",tabindex:"-1"},r=n("a",{class:"header-anchor",href:"#_160-\u76F8\u4EA4\u94FE\u8868","aria-hidden":"true"},"#",-1),d={href:"https://leetcode-cn.com/problems/intersection-of-two-linked-lists-lcci/",target:"_blank",rel:"noopener noreferrer"},k=o(`<h2 id="\u9898\u89E3" tabindex="-1"><a class="header-anchor" href="#\u9898\u89E3" aria-hidden="true">#</a> \u9898\u89E3</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * Definition for singly-linked list.
 * function ListNode(val) <span class="token punctuation">{</span>
 *     this.val = val;
 *     this.next = null;
 * <span class="token punctuation">}</span>
 */</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>ListNode<span class="token punctuation">}</span></span> <span class="token parameter">headA</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>ListNode<span class="token punctuation">}</span></span> <span class="token parameter">headB</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>ListNode<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">getIntersectionNode</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">headA<span class="token punctuation">,</span> headB</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> cur1 <span class="token operator">=</span> headA<span class="token punctuation">;</span>
  <span class="token keyword">let</span> cur2 <span class="token operator">=</span> headB<span class="token punctuation">;</span>
  <span class="token keyword">let</span> len1 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> len2 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token comment">// \u83B7\u53D6\u94FE\u8868A\u7684\u957F\u5EA6</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>cur1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    len1<span class="token operator">++</span><span class="token punctuation">;</span>
    cur1 <span class="token operator">=</span> cur1<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u83B7\u53D6\u94FE\u8868B\u7684\u957F\u5EA6</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>cur2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    len2<span class="token operator">++</span><span class="token punctuation">;</span>
    cur2 <span class="token operator">=</span> cur2<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u6062\u590D\u5934\u6307\u9488</span>
  cur1 <span class="token operator">=</span> headA<span class="token punctuation">;</span>
  cur2 <span class="token operator">=</span> headB<span class="token punctuation">;</span>
  <span class="token comment">// \u4FDD\u8BC1len1\u6C38\u8FDC\u662F\u6700\u957F\u7684\u94FE\u8868\uFF0Clen2\u6C38\u8FDC\u662F\u6700\u77ED\u7684\u94FE\u8868</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>len1 <span class="token operator">&lt;</span> len2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span>len1<span class="token punctuation">,</span> len2<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>len2<span class="token punctuation">,</span> len1<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">(</span>cur1<span class="token punctuation">,</span> cur2<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>cur2<span class="token punctuation">,</span> cur1<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> i <span class="token operator">=</span> len1 <span class="token operator">-</span> len2<span class="token punctuation">;</span>
  <span class="token comment">// \u79FB\u52A8cur1\u5230 \u5012\u6570len2\u957F\u5EA6\u7684\u4F4D\u7F6E</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    cur1 <span class="token operator">=</span> cur1<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u5982\u679Ccur1 \u7B49\u4E8E cur2\u5C31\u505C\u6B62\u5FAA\u73AF</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>cur1 <span class="token operator">&amp;&amp;</span> cur1 <span class="token operator">!==</span> cur2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    cur1 <span class="token operator">=</span> cur1<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    cur2 <span class="token operator">=</span> cur2<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> cur1<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function v(m,b){const a=l("ExternalLinkIcon");return t(),p("div",null,[n("h1",u,[r,s(),n("a",d,[s("160.\u76F8\u4EA4\u94FE\u8868"),c(a)])]),k])}const w=e(i,[["render",v],["__file","160.\u76F8\u4EA4\u94FE\u8868.html.vue"]]);export{w as default};
