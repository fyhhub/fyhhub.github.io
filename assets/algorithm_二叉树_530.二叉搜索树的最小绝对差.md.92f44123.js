import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.353e5930.js";const d=JSON.parse('{"title":"530.二叉搜索树的最小绝对差","description":"","frontmatter":{},"headers":[],"relativePath":"algorithm/二叉树/530.二叉搜索树的最小绝对差.md","filePath":"algorithm/二叉树/530.二叉搜索树的最小绝对差.md"}'),p={name:"algorithm/二叉树/530.二叉搜索树的最小绝对差.md"},o=l(`<h1 id="_530-二叉搜索树的最小绝对差" tabindex="-1"><a href="https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/" target="_blank" rel="noreferrer">530.二叉搜索树的最小绝对差</a> <a class="header-anchor" href="#_530-二叉搜索树的最小绝对差" aria-label="Permalink to &quot;[530.二叉搜索树的最小绝对差](https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/)&quot;">​</a></h1><h2 id="题解" tabindex="-1">题解 <a class="header-anchor" href="#题解" aria-label="Permalink to &quot;题解&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * Definition for a binary tree node.</span></span>
<span class="line"><span style="color:#6A737D;"> * function TreeNode(val, left, right) {</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.val = (val===undefined ? 0 : val)</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.left = (left===undefined ? null : left)</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.right = (right===undefined ? null : right)</span></span>
<span class="line"><span style="color:#6A737D;"> * }</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{TreeNode}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">root</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{number}</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getMinimumDifference</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">root</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> pre;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> min </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Number.MAX_VALUE;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dfs</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">root</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">root) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">dfs</span><span style="color:#E1E4E8;">(root.left); </span><span style="color:#6A737D;">// 左</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (pre </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 当前值 - 上次的值 求最小差</span></span>
<span class="line"><span style="color:#E1E4E8;">      min </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Math.</span><span style="color:#B392F0;">min</span><span style="color:#E1E4E8;">(min, root.val </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> pre);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    pre </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> root.val; </span><span style="color:#6A737D;">// 记录上一次的值</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">dfs</span><span style="color:#E1E4E8;">(root.right); </span><span style="color:#6A737D;">// 右</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">dfs</span><span style="color:#E1E4E8;">(root);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> min;</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * Definition for a binary tree node.</span></span>
<span class="line"><span style="color:#6A737D;"> * function TreeNode(val, left, right) {</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.val = (val===undefined ? 0 : val)</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.left = (left===undefined ? null : left)</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.right = (right===undefined ? null : right)</span></span>
<span class="line"><span style="color:#6A737D;"> * }</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{TreeNode}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">root</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{number}</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getMinimumDifference</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">root</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> pre;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> min </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Number.MAX_VALUE;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dfs</span><span style="color:#24292E;">(</span><span style="color:#E36209;">root</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">root) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">dfs</span><span style="color:#24292E;">(root.left); </span><span style="color:#6A737D;">// 左</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (pre </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 当前值 - 上次的值 求最小差</span></span>
<span class="line"><span style="color:#24292E;">      min </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Math.</span><span style="color:#6F42C1;">min</span><span style="color:#24292E;">(min, root.val </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> pre);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    pre </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> root.val; </span><span style="color:#6A737D;">// 记录上一次的值</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">dfs</span><span style="color:#24292E;">(root.right); </span><span style="color:#6A737D;">// 右</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">dfs</span><span style="color:#24292E;">(root);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> min;</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div>`,3),e=[o];function t(r,c,y,E,i,A){return n(),a("div",null,e)}const f=s(p,[["render",t]]);export{d as __pageData,f as default};
