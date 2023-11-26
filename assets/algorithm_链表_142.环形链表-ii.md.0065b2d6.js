import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.3d945e71.js";const D=JSON.parse('{"title":"142.环形链表-ii","description":"","frontmatter":{},"headers":[],"relativePath":"algorithm/链表/142.环形链表-ii.md","filePath":"algorithm/链表/142.环形链表-ii.md","lastUpdated":1700968253000}'),p={name:"algorithm/链表/142.环形链表-ii.md"},o=l(`<h1 id="_142-环形链表-ii" tabindex="-1"><a href="https://leetcode-cn.com/problems/linked-list-cycle-ii/" target="_blank" rel="noreferrer">142.环形链表-ii</a> <a class="header-anchor" href="#_142-环形链表-ii" aria-label="Permalink to &quot;[142.环形链表-ii](https://leetcode-cn.com/problems/linked-list-cycle-ii/)&quot;">​</a></h1><p><img src="https://tva1.sinaimg.cn/large/008eGmZEly1goo58gauidg30fw0bi4qr.gif" alt="环形链表"></p><h2 id="题解" tabindex="-1">题解 <a class="header-anchor" href="#题解" aria-label="Permalink to &quot;题解&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * Definition for singly-linked list.</span></span>
<span class="line"><span style="color:#6A737D;"> * function ListNode(val) {</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.val = val;</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.next = null;</span></span>
<span class="line"><span style="color:#6A737D;"> * }</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{ListNode}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">head</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{ListNode}</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">detectCycle</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">head</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> fast </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> head;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> slow </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> head;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (fast </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> fast.next) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    fast </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> fast.next.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">    slow </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> slow.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 快慢指针重合</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (slow </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> fast) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 从链表首节点开始</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> index1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> fast;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 从相交点开始</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> index2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> head;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (index1 </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> index2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        index1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> index1.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">        index2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> index2.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> index2;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * Definition for singly-linked list.</span></span>
<span class="line"><span style="color:#6A737D;"> * function ListNode(val) {</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.val = val;</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.next = null;</span></span>
<span class="line"><span style="color:#6A737D;"> * }</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{ListNode}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">head</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{ListNode}</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">detectCycle</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">head</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> fast </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> head;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> slow </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> head;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (fast </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> fast.next) {</span></span>
<span class="line"><span style="color:#24292E;">    fast </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> fast.next.next;</span></span>
<span class="line"><span style="color:#24292E;">    slow </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> slow.next;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 快慢指针重合</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (slow </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> fast) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 从链表首节点开始</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> index1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> fast;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 从相交点开始</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> index2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> head;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (index1 </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> index2) {</span></span>
<span class="line"><span style="color:#24292E;">        index1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> index1.next;</span></span>
<span class="line"><span style="color:#24292E;">        index2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> index2.next;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> index2;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><p><a href="https://programmercarl.com/0142.%E7%8E%AF%E5%BD%A2%E9%93%BE%E8%A1%A8II.html#%E6%80%9D%E8%B7%AF" target="_blank" rel="noreferrer">代码随想录</a></p>`,6),e=[o];function t(c,r,E,y,i,d){return n(),a("div",null,e)}const h=s(p,[["render",t]]);export{D as __pageData,h as default};
