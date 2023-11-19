import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.3d945e71.js";const C=JSON.parse('{"title":"平铺的节点转树","description":"","frontmatter":{},"headers":[],"relativePath":"frontend-basic/js/平铺的节点转树.md","filePath":"frontend-basic/js/平铺的节点转树.md","lastUpdated":1700358838000}'),l={name:"frontend-basic/js/平铺的节点转树.md"},o=p(`<h1 id="平铺的节点转树" tabindex="-1">平铺的节点转树 <a class="header-anchor" href="#平铺的节点转树" aria-label="Permalink to &quot;平铺的节点转树&quot;">​</a></h1><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">listToTree</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">nodes</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">rootNodes</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nodeMap</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 将节点存储在哈希表中</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> node </span><span style="color:#F97583;">of</span><span style="color:#E1E4E8;"> nodes) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    nodeMap[node.id] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">node, children: [] };</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 构建树结构</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> node </span><span style="color:#F97583;">of</span><span style="color:#E1E4E8;"> nodes) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 判断当前节点是否有父节点</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">parentNode</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> nodeMap[node.parentId];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果有父节点，直接为该父节点children添加当前节点</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (parentNode) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      parentNode.children.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(nodeMap[node.id]);</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 没有父节点，直接push</span></span>
<span class="line"><span style="color:#E1E4E8;">      rootNodes.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(nodeMap[node.id]);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> rootNodes;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 平铺的节点数组示例</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nodes</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">  { id: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, name: </span><span style="color:#9ECBFF;">&#39;Node 1&#39;</span><span style="color:#E1E4E8;">, parentId: </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { id: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, name: </span><span style="color:#9ECBFF;">&#39;Node 1.1&#39;</span><span style="color:#E1E4E8;">, parentId: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { id: </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, name: </span><span style="color:#9ECBFF;">&#39;Node 1.1.1&#39;</span><span style="color:#E1E4E8;">, parentId: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { id: </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">, name: </span><span style="color:#9ECBFF;">&#39;Node 1.2&#39;</span><span style="color:#E1E4E8;">, parentId: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { id: </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">, name: </span><span style="color:#9ECBFF;">&#39;Node 2&#39;</span><span style="color:#E1E4E8;">, parentId: </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { id: </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">, name: </span><span style="color:#9ECBFF;">&#39;Node 2.1&#39;</span><span style="color:#E1E4E8;">, parentId: </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 转换为树状结构</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">tree</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">listToTree</span><span style="color:#E1E4E8;">(nodes);</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(tree);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">listToTree</span><span style="color:#24292E;">(</span><span style="color:#E36209;">nodes</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">rootNodes</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nodeMap</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 将节点存储在哈希表中</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> node </span><span style="color:#D73A49;">of</span><span style="color:#24292E;"> nodes) {</span></span>
<span class="line"><span style="color:#24292E;">    nodeMap[node.id] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">node, children: [] };</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 构建树结构</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> node </span><span style="color:#D73A49;">of</span><span style="color:#24292E;"> nodes) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 判断当前节点是否有父节点</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">parentNode</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> nodeMap[node.parentId];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果有父节点，直接为该父节点children添加当前节点</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (parentNode) {</span></span>
<span class="line"><span style="color:#24292E;">      parentNode.children.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(nodeMap[node.id]);</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 没有父节点，直接push</span></span>
<span class="line"><span style="color:#24292E;">      rootNodes.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(nodeMap[node.id]);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> rootNodes;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 平铺的节点数组示例</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nodes</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">  { id: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, name: </span><span style="color:#032F62;">&#39;Node 1&#39;</span><span style="color:#24292E;">, parentId: </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { id: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, name: </span><span style="color:#032F62;">&#39;Node 1.1&#39;</span><span style="color:#24292E;">, parentId: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { id: </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, name: </span><span style="color:#032F62;">&#39;Node 1.1.1&#39;</span><span style="color:#24292E;">, parentId: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { id: </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">, name: </span><span style="color:#032F62;">&#39;Node 1.2&#39;</span><span style="color:#24292E;">, parentId: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { id: </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">, name: </span><span style="color:#032F62;">&#39;Node 2&#39;</span><span style="color:#24292E;">, parentId: </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  { id: </span><span style="color:#005CC5;">6</span><span style="color:#24292E;">, name: </span><span style="color:#032F62;">&#39;Node 2.1&#39;</span><span style="color:#24292E;">, parentId: </span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 转换为树状结构</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">tree</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">listToTree</span><span style="color:#24292E;">(nodes);</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(tree);</span></span></code></pre></div>`,2),e=[o];function c(t,r,E,y,i,d){return n(),a("div",null,e)}const A=s(l,[["render",c]]);export{C as __pageData,A as default};
