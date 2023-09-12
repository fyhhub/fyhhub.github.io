import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.3d945e71.js";const u=JSON.parse('{"title":"160.相交链表","description":"","frontmatter":{},"headers":[],"relativePath":"algorithm/链表/160.相交链表.md","filePath":"algorithm/链表/160.相交链表.md","lastUpdated":1694514073000}'),p={name:"algorithm/链表/160.相交链表.md"},o=l(`<h1 id="_160-相交链表" tabindex="-1"><a href="https://leetcode-cn.com/problems/intersection-of-two-linked-lists-lcci/" target="_blank" rel="noreferrer">160.相交链表</a> <a class="header-anchor" href="#_160-相交链表" aria-label="Permalink to &quot;[160.相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists-lcci/)&quot;">​</a></h1><h2 id="题解" tabindex="-1">题解 <a class="header-anchor" href="#题解" aria-label="Permalink to &quot;题解&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * Definition for singly-linked list.</span></span>
<span class="line"><span style="color:#6A737D;"> * function ListNode(val) {</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.val = val;</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.next = null;</span></span>
<span class="line"><span style="color:#6A737D;"> * }</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{ListNode}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">headA</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{ListNode}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">headB</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{ListNode}</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getIntersectionNode</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">headA</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">headB</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> cur1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> headA;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> cur2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> headB;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> len1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> len2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 获取链表A的长度</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (cur1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    len1</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    cur1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> cur1.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 获取链表B的长度</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (cur2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    len2</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    cur2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> cur2.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 恢复头指针</span></span>
<span class="line"><span style="color:#E1E4E8;">  cur1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> headA;</span></span>
<span class="line"><span style="color:#E1E4E8;">  cur2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> headB;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 保证len1永远是最长的链表，len2永远是最短的链表</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (len1 </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> len2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    [len1, len2] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [len2, len1][(cur1, cur2)] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [cur2, cur1];</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> len1 </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> len2;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 移动cur1到 倒数len2长度的位置</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (i</span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    cur1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> cur1.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 如果cur1 等于 cur2就停止循环</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (cur1 </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> cur1 </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> cur2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    cur1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> cur1.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">    cur2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> cur2.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> cur1;</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * Definition for singly-linked list.</span></span>
<span class="line"><span style="color:#6A737D;"> * function ListNode(val) {</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.val = val;</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.next = null;</span></span>
<span class="line"><span style="color:#6A737D;"> * }</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{ListNode}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">headA</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{ListNode}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">headB</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{ListNode}</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getIntersectionNode</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">headA</span><span style="color:#24292E;">, </span><span style="color:#E36209;">headB</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> cur1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> headA;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> cur2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> headB;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> len1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> len2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 获取链表A的长度</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (cur1) {</span></span>
<span class="line"><span style="color:#24292E;">    len1</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    cur1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> cur1.next;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 获取链表B的长度</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (cur2) {</span></span>
<span class="line"><span style="color:#24292E;">    len2</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    cur2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> cur2.next;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 恢复头指针</span></span>
<span class="line"><span style="color:#24292E;">  cur1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> headA;</span></span>
<span class="line"><span style="color:#24292E;">  cur2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> headB;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 保证len1永远是最长的链表，len2永远是最短的链表</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (len1 </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> len2) {</span></span>
<span class="line"><span style="color:#24292E;">    [len1, len2] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [len2, len1][(cur1, cur2)] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [cur2, cur1];</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> len1 </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> len2;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 移动cur1到 倒数len2长度的位置</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (i</span><span style="color:#D73A49;">--</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    cur1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> cur1.next;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 如果cur1 等于 cur2就停止循环</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (cur1 </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> cur1 </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> cur2) {</span></span>
<span class="line"><span style="color:#24292E;">    cur1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> cur1.next;</span></span>
<span class="line"><span style="color:#24292E;">    cur2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> cur2.next;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> cur1;</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div>`,3),e=[o];function c(t,r,E,y,i,A){return n(),a("div",null,e)}const d=s(p,[["render",c]]);export{u as __pageData,d as default};
