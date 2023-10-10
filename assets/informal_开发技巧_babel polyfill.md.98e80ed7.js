import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.3d945e71.js";const d=JSON.parse('{"title":"babel polyfill","description":"","frontmatter":{},"headers":[],"relativePath":"informal/开发技巧/babel polyfill.md","filePath":"informal/开发技巧/babel polyfill.md","lastUpdated":1696903260000}'),p={name:"informal/开发技巧/babel polyfill.md"},o=l(`<h1 id="babel-polyfill" tabindex="-1">babel polyfill <a class="header-anchor" href="#babel-polyfill" aria-label="Permalink to &quot;babel polyfill&quot;">​</a></h1><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm i @babel</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">plugin</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">transform</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">runtime @babel</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">runtime</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">corejs3 @babel</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">preset</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">env</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;presets&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;@babel/preset-env&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;@babel/preset-typescript&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;plugins&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;@babel/plugin-transform-runtime&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;corejs&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm i @babel</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">plugin</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">transform</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">runtime @babel</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">runtime</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">corejs3 @babel</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">preset</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">env</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;presets&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;@babel/preset-env&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;@babel/preset-typescript&quot;</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;plugins&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    [</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;@babel/plugin-transform-runtime&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;corejs&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,2),e=[o];function t(c,r,E,y,i,b){return n(),a("div",null,e)}const _=s(p,[["render",t]]);export{d as __pageData,_ as default};
