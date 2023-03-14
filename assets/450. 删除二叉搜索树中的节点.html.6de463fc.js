import{_ as t}from"./plugin-vueexport-helper.2444895f.js";import{o as e,c as o,a as n,b as s,e as p,d as c,r as l}from"./app.6296002a.js";const i={},u={id:"_450-\u5220\u9664\u4E8C\u53C9\u641C\u7D22\u6811\u4E2D\u7684\u8282\u70B9",tabindex:"-1"},r=n("a",{class:"header-anchor",href:"#_450-\u5220\u9664\u4E8C\u53C9\u641C\u7D22\u6811\u4E2D\u7684\u8282\u70B9","aria-hidden":"true"},"#",-1),d={href:"https://leetcode-cn.com/problems/delete-node-in-a-bst/",target:"_blank",rel:"noopener noreferrer"},k=c(`<h2 id="\u9898\u89E3" tabindex="-1"><a class="header-anchor" href="#\u9898\u89E3" aria-hidden="true">#</a> \u9898\u89E3</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) <span class="token punctuation">{</span>
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * <span class="token punctuation">}</span>
 */</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>TreeNode<span class="token punctuation">}</span></span> <span class="token parameter">root</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">key</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>TreeNode<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">deleteNode</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">root<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> root<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>val <span class="token operator">===</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u5DE6\u5B50\u6811\u4E3A\u7A7A\u7528\u53F3\u5B50\u6811\u8865\u4F4D</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> root<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
      <span class="token comment">// \u53F3\u5B50\u6811\u4E3A\u7A7A\u7528\u5DE6\u5B50\u6811\u8865\u4F4D</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> root<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// \u53F3\u5B50\u6811</span>
      <span class="token keyword">let</span> cur <span class="token operator">=</span> root<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
      <span class="token comment">// \u627E\u5230\u53F3\u5B50\u6811 \u6700\u5DE6\u8FB9\u7684\u8282\u70B9</span>
      <span class="token keyword">while</span> <span class="token punctuation">(</span>cur<span class="token punctuation">.</span>left<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// \u53F3\u5B50\u6811\u6700\u5DE6\u4FA7\u8282\u70B9 \u8FDE\u63A5 \u5F53\u524D\u8282\u70B9\u5DE6\u5B50\u6811</span>
      cur<span class="token punctuation">.</span>left <span class="token operator">=</span> root<span class="token punctuation">.</span>left<span class="token punctuation">;</span>

      <span class="token comment">// \u53F3\u5B50\u6811\u8282\u70B9\u66FF\u6362\u5F53\u524D\u8282\u70B9</span>
      root <span class="token operator">=</span> root<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
      <span class="token keyword">delete</span> root<span class="token punctuation">;</span>
      <span class="token keyword">return</span> root<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>val <span class="token operator">&gt;</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    root<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token function">deleteNode</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>val <span class="token operator">&lt;</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    root<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token function">deleteNode</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> root<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function v(m,b){const a=l("ExternalLinkIcon");return e(),o("div",null,[n("h1",u,[r,s(),n("a",d,[s("450. \u5220\u9664\u4E8C\u53C9\u641C\u7D22\u6811\u4E2D\u7684\u8282\u70B9"),p(a)])]),k])}const h=t(i,[["render",v],["__file","450. \u5220\u9664\u4E8C\u53C9\u641C\u7D22\u6811\u4E2D\u7684\u8282\u70B9.html.vue"]]);export{h as default};
