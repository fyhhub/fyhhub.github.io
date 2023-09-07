import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.3d945e71.js";const D=JSON.parse('{"title":"24.两两交换链表中的节点","description":"","frontmatter":{},"headers":[],"relativePath":"algorithm/链表/24.两两交换链表中的节点.md","filePath":"algorithm/链表/24.两两交换链表中的节点.md","lastUpdated":1694088123000}'),l={name:"algorithm/链表/24.两两交换链表中的节点.md"},o=p(`<h1 id="_24-两两交换链表中的节点" tabindex="-1"><a href="https://leetcode-cn.com/problems/swap-nodes-in-pairs/" target="_blank" rel="noreferrer">24.两两交换链表中的节点</a> <a class="header-anchor" href="#_24-两两交换链表中的节点" aria-label="Permalink to &quot;[24.两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)&quot;">​</a></h1><h2 id="题解" tabindex="-1">题解 <a class="header-anchor" href="#题解" aria-label="Permalink to &quot;题解&quot;">​</a></h2><p><img src="https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16940802530111694080252275.png" alt="16940802530111694080252275.png"></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{ListNode}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">head</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{ListNode}</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">swapPairs</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">head</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">node</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ListNode</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, head);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ret</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> node;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> temp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> node;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 保证后面有两个节点能进行交换</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (temp.next </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> temp.next.next) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 第一个节点</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> pre </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> temp.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 第二个节点</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> cur </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> temp.next.next;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 第一个节点 连接 第三个节点</span></span>
<span class="line"><span style="color:#E1E4E8;">    pre.next </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> cur.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 第二个节点连接 第一个节点</span></span>
<span class="line"><span style="color:#E1E4E8;">    cur.next </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> pre;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 开始节点 连接 第二个节点</span></span>
<span class="line"><span style="color:#E1E4E8;">    temp.next </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> cur;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 指针移动</span></span>
<span class="line"><span style="color:#E1E4E8;">    temp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> pre;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> ret.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{ListNode}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">head</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{ListNode}</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">swapPairs</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">head</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">node</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ListNode</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, head);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ret</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> node;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> temp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> node;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 保证后面有两个节点能进行交换</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (temp.next </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> temp.next.next) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 第一个节点</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> pre </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> temp.next;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 第二个节点</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> cur </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> temp.next.next;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 第一个节点 连接 第三个节点</span></span>
<span class="line"><span style="color:#24292E;">    pre.next </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> cur.next;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 第二个节点连接 第一个节点</span></span>
<span class="line"><span style="color:#24292E;">    cur.next </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> pre;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 开始节点 连接 第二个节点</span></span>
<span class="line"><span style="color:#24292E;">    temp.next </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> cur;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 指针移动</span></span>
<span class="line"><span style="color:#24292E;">    temp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> pre;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> ret.next;</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div>`,4),e=[o];function t(c,r,E,y,i,d){return n(),a("div",null,e)}const m=s(l,[["render",t]]);export{D as __pageData,m as default};
