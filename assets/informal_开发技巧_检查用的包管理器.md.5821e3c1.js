import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.353e5930.js";const _=JSON.parse('{"title":"检查用的包管理器","description":"","frontmatter":{},"headers":[],"relativePath":"informal/开发技巧/检查用的包管理器.md","filePath":"informal/开发技巧/检查用的包管理器.md"}'),o={name:"informal/开发技巧/检查用的包管理器.md"},l=p(`<h1 id="检查用的包管理器" tabindex="-1">检查用的包管理器 <a class="header-anchor" href="#检查用的包管理器" aria-label="Permalink to &quot;检查用的包管理器&quot;">​</a></h1><p>如果你想让你的包使用者，只用yarn安装依赖，可以这样：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;preinstall&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;node ./scripts/checkYarn.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;scripts&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;preinstall&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;node ./scripts/checkYarn.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">yarn</span><span style="color:#85E89D;font-weight:bold;">\\.</span><span style="color:#DBEDFF;">js</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(p<wbr>rocess.env.npm_execpath </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;</span><span style="color:#79B8FF;">\\u001b</span><span style="color:#9ECBFF;">[33mThis repository requires Yarn 1.x for scripts to work properly.</span><span style="color:#79B8FF;">\\u001b</span><span style="color:#9ECBFF;">[39m</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">  process.</span><span style="color:#B392F0;">exit</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#032F62;">/yarn</span><span style="color:#22863A;font-weight:bold;">\\.</span><span style="color:#032F62;">js</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(p<wbr>rocess.env.npm_execpath </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">)) {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;</span><span style="color:#005CC5;">\\u001b</span><span style="color:#032F62;">[33mThis repository requires Yarn 1.x for scripts to work properly.</span><span style="color:#005CC5;">\\u001b</span><span style="color:#032F62;">[39m</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&#39;</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">  process.</span><span style="color:#6F42C1;">exit</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,4),e=[l];function t(c,r,y,E,i,F){return a(),n("div",null,e)}const u=s(o,[["render",t]]);export{_ as __pageData,u as default};
