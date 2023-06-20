import{_ as e}from"./plugin-vueexport-helper.2444895f.js";import{o as t,c as o,a as n,b as s,d as p,e as c,r as l}from"./app.6039c471.js";const i={},u={id:"_98-\u9A8C\u8BC1\u4E8C\u53C9\u641C\u7D22\u6811",tabindex:"-1"},r=n("a",{class:"header-anchor",href:"#_98-\u9A8C\u8BC1\u4E8C\u53C9\u641C\u7D22\u6811","aria-hidden":"true"},"#",-1),d={href:"https://leetcode-cn.com/problems/validate-binary-search-tree/",target:"_blank",rel:"noopener noreferrer"},k=c(`<h2 id="\u9898\u89E3" tabindex="-1"><a class="header-anchor" href="#\u9898\u89E3" aria-hidden="true">#</a> \u9898\u89E3</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) <span class="token punctuation">{</span>
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * <span class="token punctuation">}</span>
 */</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>TreeNode<span class="token punctuation">}</span></span> <span class="token parameter">root</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>boolean<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">isValidBST</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> lastVal <span class="token operator">=</span> <span class="token operator">-</span>Number<span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">dfs</span><span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u6CA1\u6709\u8282\u70B9\u4E5F\u8FD4\u56DEtrue</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token comment">// \u5982\u679C\u5DE6\u5B50\u6811\u662F\u5408\u6CD5\u7684\u641C\u7D22\u6811</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">dfs</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// \u4E0A\u6B21\u8BB0\u5F55\u7684\u503C\u548C\u5F53\u524D\u8282\u70B9\u6BD4\u8F83 \u5982\u679C\u5F53\u524D\u8282\u70B9\u66F4\u5927\uFF0C\u8BF4\u660E\u662F\u4E8C\u53C9\u641C\u7D22\u6811\uFF0C\u7EE7\u7EED\u5411\u53F3\u9012\u5F52</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>val <span class="token operator">&gt;</span> lastVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        lastVal <span class="token operator">=</span> root<span class="token punctuation">.</span>val<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">dfs</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token function">dfs</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function v(m,b){const a=l("ExternalLinkIcon");return t(),o("div",null,[n("h1",u,[r,s(),n("a",d,[s("98.\u9A8C\u8BC1\u4E8C\u53C9\u641C\u7D22\u6811"),p(a)])]),k])}const h=e(i,[["render",v],["__file","98.\u9A8C\u8BC1\u4E8C\u53C9\u641C\u7D22\u6811.html.vue"]]);export{h as default};
