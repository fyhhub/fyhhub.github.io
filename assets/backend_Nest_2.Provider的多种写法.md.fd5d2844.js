import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.3d945e71.js";const F=JSON.parse('{"title":"Provider的多种写法","description":"","frontmatter":{},"headers":[],"relativePath":"backend/Nest/2.Provider的多种写法.md","filePath":"backend/Nest/2.Provider的多种写法.md","lastUpdated":1694514073000}'),l={name:"backend/Nest/2.Provider的多种写法.md"},o=p(`<h1 id="provider的多种写法" tabindex="-1">Provider的多种写法 <a class="header-anchor" href="#provider的多种写法" aria-label="Permalink to &quot;Provider的多种写法&quot;">​</a></h1><h2 id="_1-基础写法" tabindex="-1">1. 基础写法 <a class="header-anchor" href="#_1-基础写法" aria-label="Permalink to &quot;1. 基础写法&quot;">​</a></h2><ol><li>声明一个Provider</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Injectable</span><span style="color:#E1E4E8;">()</span></span>
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
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AppModule</span><span style="color:#24292E;"> {}</span></span></code></pre></div><ol start="3"><li>依赖注入</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Controller</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AppController</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">appService</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AppService</span><span style="color:#E1E4E8;">){}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">Controller</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AppController</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;"> </span><span style="color:#E36209;">appService</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AppService</span><span style="color:#24292E;">){}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>或者</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Controller</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AppController</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">Inject</span><span style="color:#E1E4E8;">(AppService)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">appService</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AppService</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">Controller</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AppController</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">Inject</span><span style="color:#24292E;">(AppService)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;"> </span><span style="color:#E36209;">appService</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AppService</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_2-provide、useclass" tabindex="-1">2. provide、useClass <a class="header-anchor" href="#_2-provide、useclass" aria-label="Permalink to &quot;2. provide、useClass&quot;">​</a></h2><ol><li>基础写法等同于以下写法：</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Module</span><span style="color:#E1E4E8;">({</span></span>
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
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AppModule</span><span style="color:#24292E;"> {}</span></span></code></pre></div><ol start="2"><li>字符串注入</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Module</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  providers: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      provide: </span><span style="color:#9ECBFF;">&#39;app_service&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      useClass: AppService</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">Module</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  providers: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      provide: </span><span style="color:#032F62;">&#39;app_service&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      useClass: AppService</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Controller</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AppController</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">(@</span><span style="color:#B392F0;">Inject</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;app_service&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">appService</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AppService</span><span style="color:#E1E4E8;">){}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">Controller</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AppController</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(@</span><span style="color:#6F42C1;">Inject</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;app_service&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;"> </span><span style="color:#E36209;">appService</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AppService</span><span style="color:#24292E;">){}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_3-usevalue" tabindex="-1">3. useValue <a class="header-anchor" href="#_3-usevalue" aria-label="Permalink to &quot;3. useValue&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Module</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  providers: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      provide: </span><span style="color:#9ECBFF;">&#39;app_service&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      useValue: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        a: </span><span style="color:#9ECBFF;">&#39;123&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">Module</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  providers: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      provide: </span><span style="color:#032F62;">&#39;app_service&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      useValue: {</span></span>
<span class="line"><span style="color:#24292E;">        a: </span><span style="color:#032F62;">&#39;123&#39;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Controller</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AppController</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">(@</span><span style="color:#B392F0;">Inject</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;app_service&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">appService</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> { </span><span style="color:#FFAB70;">a</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;"> }){}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">Controller</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AppController</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(@</span><span style="color:#6F42C1;">Inject</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;app_service&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;"> </span><span style="color:#E36209;">appService</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> { </span><span style="color:#E36209;">a</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;"> }){}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_4-usefactory" tabindex="-1">4. useFactory <a class="header-anchor" href="#_4-usefactory" aria-label="Permalink to &quot;4. useFactory&quot;">​</a></h2><ol><li>基础用法</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Module</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  providers: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      provide: </span><span style="color:#9ECBFF;">&#39;app_service&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">useFactory</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          a: </span><span style="color:#9ECBFF;">&#39;123&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">Module</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  providers: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      provide: </span><span style="color:#032F62;">&#39;app_service&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">useFactory</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          a: </span><span style="color:#032F62;">&#39;123&#39;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Controller</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AppController</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">(@</span><span style="color:#B392F0;">Inject</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;app_service&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">appService</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> { </span><span style="color:#FFAB70;">a</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;"> }){}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">Controller</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AppController</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(@</span><span style="color:#6F42C1;">Inject</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;app_service&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;"> </span><span style="color:#E36209;">appService</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> { </span><span style="color:#E36209;">a</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;"> }){}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ol start="2"><li>参数注入</li></ol><p>useFactory可以接受其他被注入的Service对象</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Module</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  providers: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      provide: </span><span style="color:#9ECBFF;">&#39;app_service&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">useFactory</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">otherService</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">otherService1</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">otherService2</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          a: </span><span style="color:#9ECBFF;">&#39;123&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      inject: [OtherService, </span><span style="color:#9ECBFF;">&#39;service_xxx&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">Module</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  providers: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      provide: </span><span style="color:#032F62;">&#39;app_service&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">useFactory</span><span style="color:#24292E;">(</span><span style="color:#E36209;">otherService</span><span style="color:#24292E;">, </span><span style="color:#E36209;">otherService1</span><span style="color:#24292E;">, </span><span style="color:#E36209;">otherService2</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          a: </span><span style="color:#032F62;">&#39;123&#39;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      inject: [OtherService, </span><span style="color:#032F62;">&#39;service_xxx&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><ol start="3"><li>异步useFactory</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Module</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  providers: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      provide: </span><span style="color:#9ECBFF;">&#39;app_service&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useFactory</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">otherService</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">otherService1</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">otherService2</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          a: </span><span style="color:#9ECBFF;">&#39;123&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">Module</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  providers: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      provide: </span><span style="color:#032F62;">&#39;app_service&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useFactory</span><span style="color:#24292E;">(</span><span style="color:#E36209;">otherService</span><span style="color:#24292E;">, </span><span style="color:#E36209;">otherService1</span><span style="color:#24292E;">, </span><span style="color:#E36209;">otherService2</span><span style="color:#24292E;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">...</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          a: </span><span style="color:#032F62;">&#39;123&#39;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="_5-useexisting" tabindex="-1">5. useExisting <a class="header-anchor" href="#_5-useexisting" aria-label="Permalink to &quot;5. useExisting&quot;">​</a></h2><p>provider 还可以通过 useExisting 来指定别名, 比如下面的，给<code>app_service</code> 起了个别名叫<code>app_service_1</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Module</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  providers: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      provide: </span><span style="color:#9ECBFF;">&#39;app_service_1&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      useExisting: </span><span style="color:#9ECBFF;">&#39;app_service&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">Module</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  providers: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      provide: </span><span style="color:#032F62;">&#39;app_service_1&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      useExisting: </span><span style="color:#032F62;">&#39;app_service&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div>`,31),e=[o];function c(r,t,E,y,i,d){return a(),n("div",null,e)}const u=s(l,[["render",c]]);export{F as __pageData,u as default};
