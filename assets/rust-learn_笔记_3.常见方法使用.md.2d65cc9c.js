import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.3d945e71.js";const u=JSON.parse('{"title":"常见方法使用","description":"","frontmatter":{},"headers":[],"relativePath":"rust-learn/笔记/3.常见方法使用.md","filePath":"rust-learn/笔记/3.常见方法使用.md","lastUpdated":1712884440000}'),o={name:"rust-learn/笔记/3.常见方法使用.md"},p=l(`<h1 id="常见方法使用" tabindex="-1">常见方法使用 <a class="header-anchor" href="#常见方法使用" aria-label="Permalink to &quot;常见方法使用&quot;">​</a></h1><h2 id="size-of-获取指定类型的大小" tabindex="-1">size_of 获取指定类型的大小 <a class="header-anchor" href="#size-of-获取指定类型的大小" aria-label="Permalink to &quot;size\\_of 获取指定类型的大小&quot;">​</a></h2><div class="language-rust vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">use</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">std</span><span style="color:#F97583;">::</span><span style="color:#B392F0;">mem</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">size_of;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">size_of</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">Option</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;">&gt;&gt;()</span></span>
<span class="line"><span style="color:#B392F0;">size_of</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">u8</span><span style="color:#E1E4E8;">&gt;()</span></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">use</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">std</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">mem</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">size_of;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">size_of</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">Option</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">&gt;&gt;()</span></span>
<span class="line"><span style="color:#6F42C1;">size_of</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">u8</span><span style="color:#24292E;">&gt;()</span></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span></code></pre></div><p>常见类型的大小：</p><pre><code>Type                        T    Option&lt;T&gt;    Result&lt;T, io::Error&gt;
----------------------------------------------------------------
u8                          1        2           24
f64                         8       16           24
&amp;u8                         8        8           24
Box&lt;u8&gt;                     8        8           24
&amp;[u8]                      16       16           24
String                     24       24           32
Vec&lt;u8&gt;                    24       24           32
HashMap&lt;String, String&gt;    48       48           56
E                          56       56           64
</code></pre>`,5),e=[p];function t(r,c,i,y,_,d){return a(),n("div",null,e)}const h=s(o,[["render",t]]);export{u as __pageData,h as default};
