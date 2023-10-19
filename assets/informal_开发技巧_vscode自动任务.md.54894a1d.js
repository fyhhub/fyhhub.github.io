import{_ as s,o as n,c as a,Q as o}from"./chunks/framework.3d945e71.js";const F=JSON.parse('{"title":"VSCode 自动任务","description":"","frontmatter":{},"headers":[],"relativePath":"informal/开发技巧/vscode自动任务.md","filePath":"informal/开发技巧/vscode自动任务.md","lastUpdated":1697679316000}'),l={name:"informal/开发技巧/vscode自动任务.md"},p=o(`<h1 id="vscode-自动任务" tabindex="-1">VSCode 自动任务 <a class="header-anchor" href="#vscode-自动任务" aria-label="Permalink to &quot;VSCode 自动任务&quot;">​</a></h1><h2 id="自动-merge" tabindex="-1">自动 Merge <a class="header-anchor" href="#自动-merge" aria-label="Permalink to &quot;自动 Merge&quot;">​</a></h2><p>需要搭配以下工具</p><ul><li>glab</li><li>Gitlab WorkFlows VSCode 插件</li></ul><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;version&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;2.0.0&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;tasks&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;label&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;git-mr&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;shell&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;command&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;glab&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;args&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;mr&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;new&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;-b&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;\${input:target}&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;-d&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;merge&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;-t&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;\${input:message}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      ],</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;problemMatcher&quot;</span><span style="color:#E1E4E8;">: []</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;label&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;git-ml&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;shell&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;command&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;glab&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;args&quot;</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;mr&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;list&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;problemMatcher&quot;</span><span style="color:#E1E4E8;">: []</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;label&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;git-close&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;shell&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;command&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;glab&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;args&quot;</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;mr&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;close&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;\${input:mrid}&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;problemMatcher&quot;</span><span style="color:#E1E4E8;">: []</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;label&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;git-merge&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;shell&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;command&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;glab&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;args&quot;</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;mr&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;merge&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;\${input:mrid}&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;problemMatcher&quot;</span><span style="color:#E1E4E8;">: []</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;inputs&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;target&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;pickString&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;options&quot;</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;buildwork&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;buildtuhutest&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;buildut&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;master&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;description&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;请输入目标分支&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;mrid&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;promptString&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;description&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;请输入merge id&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;message&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;promptString&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;description&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;请输入merge信息&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;version&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;2.0.0&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;tasks&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;label&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;git-mr&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;shell&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;command&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;glab&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;args&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;mr&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;new&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;-b&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;\${input:target}&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;-d&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;merge&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;-t&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;\${input:message}&quot;</span></span>
<span class="line"><span style="color:#24292E;">      ],</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;problemMatcher&quot;</span><span style="color:#24292E;">: []</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;label&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;git-ml&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;shell&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;command&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;glab&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;args&quot;</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;mr&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;list&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;problemMatcher&quot;</span><span style="color:#24292E;">: []</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;label&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;git-close&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;shell&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;command&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;glab&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;args&quot;</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;mr&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;close&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;\${input:mrid}&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;problemMatcher&quot;</span><span style="color:#24292E;">: []</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;label&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;git-merge&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;shell&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;command&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;glab&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;args&quot;</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;mr&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;merge&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;\${input:mrid}&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;problemMatcher&quot;</span><span style="color:#24292E;">: []</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;inputs&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;target&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;pickString&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;options&quot;</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;buildwork&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;buildtuhutest&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;buildut&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;master&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;description&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;请输入目标分支&quot;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;mrid&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;promptString&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;description&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;请输入merge id&quot;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;message&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;promptString&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;description&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;请输入merge信息&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="参考文章" tabindex="-1">参考文章 <a class="header-anchor" href="#参考文章" aria-label="Permalink to &quot;参考文章&quot;">​</a></h2><p><a href="https://juejin.cn/post/7035448197883363359" target="_blank" rel="noreferrer">【手把手】学会 VS Code&quot;任务&quot;神技，成为项目组最靓的崽！</a></p>`,7),t=[p];function e(c,E,r,y,u,q){return n(),a("div",null,t)}const C=s(l,[["render",e]]);export{F as __pageData,C as default};
