import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.3d945e71.js";const h=JSON.parse('{"title":"Provider的多种写法","description":"","frontmatter":{},"headers":[],"relativePath":"backend/Nest/Provider的多种写法.md","filePath":"backend/Nest/Provider的多种写法.md","lastUpdated":1694359477000}'),l={name:"backend/Nest/Provider的多种写法.md"},e=p(`<h1 id="provider的多种写法" tabindex="-1">Provider的多种写法 <a class="header-anchor" href="#provider的多种写法" aria-label="Permalink to &quot;Provider的多种写法&quot;">​</a></h1><h2 id="_1-基础写法" tabindex="-1">1. 基础写法 <a class="header-anchor" href="#_1-基础写法" aria-label="Permalink to &quot;1. 基础写法&quot;">​</a></h2><ol><li>声明一个Provider</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Injectable</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AppService</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">Injectable</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AppService</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ol start="2"><li>Module中注册</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Module</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  providers: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    AppService</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AppModule</span><span style="color:#E1E4E8;"> {}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">Module</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  providers: [</span></span>
<span class="line"><span style="color:#24292E;">    AppService</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AppModule</span><span style="color:#24292E;"> {}</span></span></code></pre></div><h2 id="_2-provide、useclass" tabindex="-1">2. provide、useClass <a class="header-anchor" href="#_2-provide、useclass" aria-label="Permalink to &quot;2. provide、useClass&quot;">​</a></h2><ol><li>基础写法等同于以下写法：</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Module</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  providers: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      provide: AppService,</span></span>
<span class="line"><span style="color:#E1E4E8;">      useClass: AppService</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AppModule</span><span style="color:#E1E4E8;"> {}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">Module</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  providers: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      provide: AppService,</span></span>
<span class="line"><span style="color:#24292E;">      useClass: AppService</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AppModule</span><span style="color:#24292E;"> {}</span></span></code></pre></div>`,9),o=[e];function c(r,t,i,E,d,y){return a(),n("div",null,o)}const u=s(l,[["render",c]]);export{h as __pageData,u as default};
