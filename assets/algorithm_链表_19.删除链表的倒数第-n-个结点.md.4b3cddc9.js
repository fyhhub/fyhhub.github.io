import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.3d945e71.js";const D=JSON.parse('{"title":"19.删除链表的倒数第-n-个结点","description":"","frontmatter":{},"headers":[],"relativePath":"algorithm/链表/19.删除链表的倒数第-n-个结点.md","filePath":"algorithm/链表/19.删除链表的倒数第-n-个结点.md","lastUpdated":1694514073000}'),p={name:"algorithm/链表/19.删除链表的倒数第-n-个结点.md"},o=l(`<h1 id="_19-删除链表的倒数第-n-个结点" tabindex="-1"><a href="https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/submissions/" target="_blank" rel="noreferrer">19.删除链表的倒数第-n-个结点</a> <a class="header-anchor" href="#_19-删除链表的倒数第-n-个结点" aria-label="Permalink to &quot;[19.删除链表的倒数第-n-个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/submissions/)&quot;">​</a></h1><h2 id="题解" tabindex="-1">题解 <a class="header-anchor" href="#题解" aria-label="Permalink to &quot;题解&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * Definition for singly-linked list.</span></span>
<span class="line"><span style="color:#6A737D;"> * function ListNode(val, next) {</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.val = (val===undefined ? 0 : val)</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.next = (next===undefined ? null : next)</span></span>
<span class="line"><span style="color:#6A737D;"> * }</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{ListNode}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">head</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{number}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">n</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{ListNode}</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">removeNthFromEnd</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">head</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">n</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> ret </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ListNode</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, head);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> fast </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ret;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> slow </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ret;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (n</span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    fast </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> fast.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">fast) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> ret.next;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (fast.next) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    slow </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> slow.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">    fast </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> fast.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  slow.next </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> slow.next.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> ret.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * Definition for singly-linked list.</span></span>
<span class="line"><span style="color:#6A737D;"> * function ListNode(val, next) {</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.val = (val===undefined ? 0 : val)</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.next = (next===undefined ? null : next)</span></span>
<span class="line"><span style="color:#6A737D;"> * }</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{ListNode}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">head</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{number}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">n</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{ListNode}</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">removeNthFromEnd</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">head</span><span style="color:#24292E;">, </span><span style="color:#E36209;">n</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> ret </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ListNode</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, head);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> fast </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ret;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> slow </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ret;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (n</span><span style="color:#D73A49;">--</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    fast </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> fast.next;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">fast) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> ret.next;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (fast.next) {</span></span>
<span class="line"><span style="color:#24292E;">    slow </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> slow.next;</span></span>
<span class="line"><span style="color:#24292E;">    fast </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> fast.next;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  slow.next </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> slow.next.next;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> ret.next;</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div>`,3),e=[o];function t(c,r,y,E,i,d){return n(),a("div",null,e)}const h=s(p,[["render",t]]);export{D as __pageData,h as default};
