import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.3d945e71.js";const q=JSON.parse('{"title":"husky、eslint、lint-staged 配置","description":"","frontmatter":{},"headers":[],"relativePath":"informal/开发技巧/husky、eslint、lint-staged配置.md","filePath":"informal/开发技巧/husky、eslint、lint-staged配置.md","lastUpdated":1699603789000}'),p={name:"informal/开发技巧/husky、eslint、lint-staged配置.md"},o=l(`<h1 id="husky、eslint、lint-staged-配置" tabindex="-1">husky、eslint、lint-staged 配置 <a class="header-anchor" href="#husky、eslint、lint-staged-配置" aria-label="Permalink to &quot;husky、eslint、lint-staged 配置&quot;">​</a></h1><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// package.json</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">&quot;husky&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;hooks&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;pre-commit&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;npm run format&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;commit-msg&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;commitlint -E HUSKY_GIT_PARAMS&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;lint-staged&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;*.js&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;prettier --write&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;*.ts&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;prettier --parser=typescript --write&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;eslint&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#79B8FF;">&quot;devDependencies&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;@commitlint/cli&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;^13.2.1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;@commitlint/config-conventional&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;^13.2.0&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;@typescript-eslint/parser&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;^5.2.0&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;eslint&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;^8.1.0&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;eslint-plugin-prettier&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;^4.0.0&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;husky&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;^4.3.8&quot;</span><span style="color:#E1E4E8;">,  </span><span style="color:#6A737D;">// 注意这里版本 高版本会不起作用</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;lint-staged&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;^11.2.6&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;prettier&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;^2.4.1&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// package.json</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">&quot;husky&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;hooks&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;pre-commit&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;npm run format&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;commit-msg&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;commitlint -E HUSKY_GIT_PARAMS&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;lint-staged&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;*.js&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;prettier --write&quot;</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;*.ts&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;prettier --parser=typescript --write&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;eslint&quot;</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#005CC5;">&quot;devDependencies&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;@commitlint/cli&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;^13.2.1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;@commitlint/config-conventional&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;^13.2.0&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;@typescript-eslint/parser&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;^5.2.0&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;eslint&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;^8.1.0&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;eslint-plugin-prettier&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;^4.0.0&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;husky&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;^4.3.8&quot;</span><span style="color:#24292E;">,  </span><span style="color:#6A737D;">// 注意这里版本 高版本会不起作用</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;lint-staged&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;^11.2.6&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;prettier&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;^2.4.1&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// commitlint.config.js</span></span>
<span class="line"><span style="color:#E1E4E8;">const types = [</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&#39;build&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&#39;ci&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&#39;chore&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&#39;docs&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&#39;feat&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&#39;fix&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&#39;pref&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&#39;refactor&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&#39;revert&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&#39;style&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&#39;test&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">typeEnum = {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">rules</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&#39;type-enum&#39;</span><span style="color:#E1E4E8;">: [</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#FDAEB7;font-style:italic;">&#39;always&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#FDAEB7;font-style:italic;">types</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#FDAEB7;font-style:italic;">()</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">types</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">module.exports = {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">extends</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;@commitlint/config-conventional&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">rules</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&#39;type-case&#39;</span><span style="color:#E1E4E8;">: [</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&#39;type-empty&#39;</span><span style="color:#E1E4E8;">: [</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&#39;scope-empty&#39;</span><span style="color:#E1E4E8;">: [</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&#39;scope-case&#39;</span><span style="color:#E1E4E8;">: [</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&#39;subject-full-stop&#39;</span><span style="color:#E1E4E8;">: [</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#FDAEB7;font-style:italic;">&#39;never&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&#39;subject-case&#39;</span><span style="color:#E1E4E8;">: [</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#FDAEB7;font-style:italic;">&#39;never&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&#39;header-max-length&#39;</span><span style="color:#E1E4E8;">: [</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#FDAEB7;font-style:italic;">&#39;always&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">72</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&#39;type-enum&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#FDAEB7;font-style:italic;">typeEnum.rules</span><span style="color:#E1E4E8;">[</span><span style="color:#FDAEB7;font-style:italic;">&#39;type-enum&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// commitlint.config.js</span></span>
<span class="line"><span style="color:#24292E;">const types = [</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&#39;build&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&#39;ci&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&#39;chore&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&#39;docs&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&#39;feat&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&#39;fix&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&#39;pref&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&#39;refactor&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&#39;revert&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&#39;style&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&#39;test&#39;</span></span>
<span class="line"><span style="color:#24292E;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">typeEnum = {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">rules</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&#39;type-enum&#39;</span><span style="color:#24292E;">: [</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#B31D28;font-style:italic;">&#39;always&#39;</span><span style="color:#24292E;">, </span><span style="color:#B31D28;font-style:italic;">types</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">value</span><span style="color:#24292E;">: </span><span style="color:#B31D28;font-style:italic;">()</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">types</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">module.exports = {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">extends</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;@commitlint/config-conventional&quot;</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">rules</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&#39;type-case&#39;</span><span style="color:#24292E;">: [</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&#39;type-empty&#39;</span><span style="color:#24292E;">: [</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&#39;scope-empty&#39;</span><span style="color:#24292E;">: [</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&#39;scope-case&#39;</span><span style="color:#24292E;">: [</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&#39;subject-full-stop&#39;</span><span style="color:#24292E;">: [</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#B31D28;font-style:italic;">&#39;never&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&#39;subject-case&#39;</span><span style="color:#24292E;">: [</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#B31D28;font-style:italic;">&#39;never&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&#39;header-max-length&#39;</span><span style="color:#24292E;">: [</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#B31D28;font-style:italic;">&#39;always&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">72</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&#39;type-enum&#39;</span><span style="color:#24292E;">: </span><span style="color:#B31D28;font-style:italic;">typeEnum.rules</span><span style="color:#24292E;">[</span><span style="color:#B31D28;font-style:italic;">&#39;type-enum&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// .eslintrc.js</span></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  parser: </span><span style="color:#9ECBFF;">&quot;@typescript-eslint/parser&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  parserOptions: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    sourceType: </span><span style="color:#9ECBFF;">&quot;module&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span><span style="color:#9ECBFF;">&quot;prettier&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  rules: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;no-unused-vars&quot;</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;error&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;no-restricted-syntax&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;error&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;ObjectExpression &gt; SpreadElement&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;ObjectPattern &gt; RestElement&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;AwaitExpression&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    semi: [</span><span style="color:#9ECBFF;">&quot;error&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;always&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// .eslintrc.js</span></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  parser: </span><span style="color:#032F62;">&quot;@typescript-eslint/parser&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  parserOptions: {</span></span>
<span class="line"><span style="color:#24292E;">    sourceType: </span><span style="color:#032F62;">&quot;module&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span><span style="color:#032F62;">&quot;prettier&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  rules: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;no-unused-vars&quot;</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;error&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;no-restricted-syntax&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;error&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;ObjectExpression &gt; SpreadElement&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;ObjectPattern &gt; RestElement&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;AwaitExpression&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    semi: [</span><span style="color:#032F62;">&quot;error&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;always&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// .prettierrc</span></span>
<span class="line"><span style="color:#B392F0;">semi</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">singleQuote</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">printWidth</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">trailingComma</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;none&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">arrowParens</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;avoid&quot;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// .prettierrc</span></span>
<span class="line"><span style="color:#6F42C1;">semi</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">singleQuote</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">printWidth</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">trailingComma</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;none&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">arrowParens</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;avoid&quot;</span><span style="color:#24292E;">;</span></span></code></pre></div>`,5),t=[o];function e(c,E,r,y,i,u){return n(),a("div",null,t)}const B=s(p,[["render",e]]);export{q as __pageData,B as default};
