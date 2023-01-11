import{_ as t}from"./plugin-vueexport-helper.2444895f.js";import{o as p,c as e,a as n,b as s,e as o,d as c,r as l}from"./app.6bdc584a.js";const i={},u={id:"_1049-\u6700\u540E\u4E00\u5757\u77F3\u5934\u7684\u91CD\u91CF-ii",tabindex:"-1"},r=n("a",{class:"header-anchor",href:"#_1049-\u6700\u540E\u4E00\u5757\u77F3\u5934\u7684\u91CD\u91CF-ii","aria-hidden":"true"},"#",-1),k={href:"https://leetcode-cn.com/problems/last-stone-weight-ii/",target:"_blank",rel:"noopener noreferrer"},d=c(`<h2 id="\u601D\u8DEF" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF" aria-hidden="true">#</a> \u601D\u8DEF</h2><p>\u672C\u9898\u5176\u5B9E\u5C31\u662F\u5C3D\u91CF\u8BA9\u77F3\u5934\u5206\u6210\u91CD\u91CF\u76F8\u540C\u7684\u4E24\u5806\uFF0C\u76F8\u649E\u4E4B\u540E\u5269\u4E0B\u7684\u77F3\u5934\u6700\u5C0F\uFF0C\u8FD9\u6837\u5C31\u5316\u89E3\u6210 01 \u80CC\u5305\u95EE\u9898\u4E86\u3002</p><h2 id="\u9898\u89E3" tabindex="-1"><a class="header-anchor" href="#\u9898\u89E3" aria-hidden="true">#</a> \u9898\u89E3</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token parameter">stones</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">lastStoneWeightII</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">stones</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> dp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">30</span> <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> sum <span class="token operator">=</span> stones<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> a <span class="token operator">+</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// \u6700\u5927\u7684\u80CC\u5305\u5927\u5C0F</span>
  <span class="token keyword">const</span> target <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>sum <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// \u904D\u5386\u77F3\u5934</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> stones<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u5012\u5E8F\u904D\u5386\u80CC\u5305\u5BB9\u91CF</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> target<span class="token punctuation">;</span> j <span class="token operator">&gt;=</span> stones<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span> j<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// \u80CC\u5305\u5BB9\u91CFj\u7684\u6700\u5927\u91CD\u91CF = max(\u4E0D\u9009\u77F3\u5934i\u7684\u6700\u5927\u91CD\u91CF, \u9009\u62E9\u77F3\u5934i\u7684\u6700\u5927\u91CD\u91CF + \u77F3\u5934i\u7684\u91CD\u91CF)</span>
      dp<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>dp<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">,</span> dp<span class="token punctuation">[</span>j <span class="token operator">-</span> stones<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">+</span> stones<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u5269\u4E0B\u77F3\u5934\u96C6\u5408\u7684\u91CD\u91CF -  \u6700\u5927\u77F3\u5934\u96C6\u5408\u7684\u91CD\u91CF</span>
  <span class="token keyword">return</span> sum <span class="token operator">-</span> dp<span class="token punctuation">[</span>target<span class="token punctuation">]</span> <span class="token operator">-</span> dp<span class="token punctuation">[</span>target<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function m(v,b){const a=l("ExternalLinkIcon");return p(),e("div",null,[n("h1",u,[r,s(),n("a",k,[s("1049.\u6700\u540E\u4E00\u5757\u77F3\u5934\u7684\u91CD\u91CF-ii"),o(a)])]),d])}const f=t(i,[["render",m],["__file","1049.\u6700\u540E\u4E00\u5757\u77F3\u5934\u7684\u91CD\u91CF-ii.html.vue"]]);export{f as default};
