import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.3d945e71.js";const d=JSON.parse('{"title":"对称二叉树","description":"","frontmatter":{},"headers":[],"relativePath":"algorithm/二叉树/对称二叉树.md","filePath":"algorithm/二叉树/对称二叉树.md","lastUpdated":1694419899000}'),p={name:"algorithm/二叉树/对称二叉树.md"},o=l(`<h1 id="对称二叉树" tabindex="-1">对称二叉树 <a class="header-anchor" href="#对称二叉树" aria-label="Permalink to &quot;对称二叉树&quot;">​</a></h1><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * Definition for a binary tree node.</span></span>
<span class="line"><span style="color:#6A737D;"> * function TreeNode(val, left, right) {</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.val = (val===undefined ? 0 : val)</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.left = (left===undefined ? null : left)</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.right = (right===undefined ? null : right)</span></span>
<span class="line"><span style="color:#6A737D;"> * }</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{TreeNode}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">root</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{boolean}</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isSame</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">n1</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">n2</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (n1 </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> n2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">      n1.val </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> n2.val </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">isSame</span><span style="color:#E1E4E8;">(n1.left, n2.right) </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">isSame</span><span style="color:#E1E4E8;">(n1.right, n2.left)</span></span>
<span class="line"><span style="color:#E1E4E8;">    );</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> n1 </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> n2 </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isSymmetric</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">root</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isSame</span><span style="color:#E1E4E8;">(root.left, root.right);</span></span>
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
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{boolean}</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isSame</span><span style="color:#24292E;">(</span><span style="color:#E36209;">n1</span><span style="color:#24292E;">, </span><span style="color:#E36209;">n2</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (n1 </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> n2) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">      n1.val </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> n2.val </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">isSame</span><span style="color:#24292E;">(n1.left, n2.right) </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">isSame</span><span style="color:#24292E;">(n1.right, n2.left)</span></span>
<span class="line"><span style="color:#24292E;">    );</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> n1 </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> n2 </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isSymmetric</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">root</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isSame</span><span style="color:#24292E;">(root.left, root.right);</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div>`,2),e=[o];function t(c,r,y,E,i,A){return n(),a("div",null,e)}const m=s(p,[["render",t]]);export{d as __pageData,m as default};
