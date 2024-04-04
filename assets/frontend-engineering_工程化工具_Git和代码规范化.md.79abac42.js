import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.3d945e71.js";const d=JSON.parse('{"title":"前端开发工具链","description":"","frontmatter":{},"headers":[],"relativePath":"frontend-engineering/工程化工具/Git和代码规范化.md","filePath":"frontend-engineering/工程化工具/Git和代码规范化.md","lastUpdated":1712235812000}'),p={name:"frontend-engineering/工程化工具/Git和代码规范化.md"},o=l(`<h1 id="前端开发工具链" tabindex="-1">前端开发工具链 <a class="header-anchor" href="#前端开发工具链" aria-label="Permalink to &quot;前端开发工具链&quot;">​</a></h1><h2 id="_1-代码检查工具" tabindex="-1">1. 代码检查工具 <a class="header-anchor" href="#_1-代码检查工具" aria-label="Permalink to &quot;1. 代码检查工具&quot;">​</a></h2><pre><code>npm i eslint -D
npx eslint --init
</code></pre><h2 id="_2-代码格式化" tabindex="-1">2. 代码格式化 <a class="header-anchor" href="#_2-代码格式化" aria-label="Permalink to &quot;2. 代码格式化&quot;">​</a></h2><ul><li><p>安装插件 npm i prettier eslint-config-prettier eslint-plugin-prettier -D</p></li><li><p>配置<code>eslintrc.js</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">extends</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&#39;plugin:prettier/recommended&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">extends</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&#39;plugin:prettier/recommended&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></li><li><p>创建<code>.prettierrc</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;semi&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;tabWidth&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;trailingComma&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;none&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;singleQuote&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;arrowParens&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;avoid&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;semi&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;tabWidth&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;trailingComma&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;none&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;singleQuote&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;arrowParens&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;avoid&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></li></ul><h2 id="_3-git-hook" tabindex="-1">3. Git Hook <a class="header-anchor" href="#_3-git-hook" aria-label="Permalink to &quot;3. Git Hook&quot;">​</a></h2><h3 id="初始化husky" tabindex="-1">初始化husky <a class="header-anchor" href="#初始化husky" aria-label="Permalink to &quot;初始化husky&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// package.json</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;prepare&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;husky install&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// package.json</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;scripts&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;prepare&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;husky install&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><pre><code>npm i husky -D
npm run prepare
</code></pre><h3 id="pre-commit" tabindex="-1">pre-commit <a class="header-anchor" href="#pre-commit" aria-label="Permalink to &quot;pre-commit&quot;">​</a></h3><ul><li>初始化</li></ul><pre><code>npx husky add .husky/pre-commit &quot;npx lint-staged&quot;
</code></pre><ul><li>使用lint等工具规范你的代码</li></ul><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// package.json</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;lint-staged&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;*.{js,jsx,ts,tsx}&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;prettier --write ./src&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;eslint  --fix&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;*.md&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;prettier --write&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">},</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// package.json</span></span>
<span class="line"><span style="color:#032F62;">&quot;lint-staged&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;*.{js,jsx,ts,tsx}&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;prettier --write ./src&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;eslint  --fix&quot;</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;*.md&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;prettier --write&quot;</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">},</span></span></code></pre></div><h3 id="commit-msg-hook" tabindex="-1">commit-msg hook <a class="header-anchor" href="#commit-msg-hook" aria-label="Permalink to &quot;commit-msg hook&quot;">​</a></h3><ul><li>初始化</li></ul><pre><code>npx husky add .husky/commit-msg &#39;npx --no-install commitlint --edit &quot;$1&quot;&#39;
</code></pre><ul><li>使用commitlint 校验你的commit message</li></ul><pre><code>npm i commitlint @commitlint/config-conventional -D
</code></pre><ul><li>创建<code>commitlint.config.js</code></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  extends: [</span><span style="color:#9ECBFF;">&#39;@commitlint/config-conventional&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  extends: [</span><span style="color:#032F62;">&#39;@commitlint/config-conventional&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h3 id="pre-push-message" tabindex="-1">pre-push message <a class="header-anchor" href="#pre-push-message" aria-label="Permalink to &quot;pre-push message&quot;">​</a></h3><h2 id="_4-commitizen-让你的commit-更优雅" tabindex="-1">4. commitizen 让你的commit 更优雅 <a class="header-anchor" href="#_4-commitizen-让你的commit-更优雅" aria-label="Permalink to &quot;4. commitizen 让你的commit 更优雅&quot;">​</a></h2><ul><li>安装</li></ul><p>最好全局安装<code>commitizen</code></p><pre><code>npm install -D cz-git
npm i -g commitizen
</code></pre><ul><li>修改package.json</li></ul><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;commit&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;git-cz&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;config&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;commitizen&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;path&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;node_modules/cz-git&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;scripts&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;commit&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;git-cz&quot;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;config&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;commitizen&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;path&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;node_modules/cz-git&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>修改<code>commitlint.config.js</code></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  extends: [</span><span style="color:#9ECBFF;">&#39;@commitlint/config-conventional&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  prompt: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    alias: { fd: </span><span style="color:#9ECBFF;">&#39;docs: fix typos&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">    messages: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&#39;选择你要提交的类型 :&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      scope: </span><span style="color:#9ECBFF;">&#39;选择一个提交范围（可选）:&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      customScope: </span><span style="color:#9ECBFF;">&#39;请输入自定义的提交范围 :&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      subject: </span><span style="color:#9ECBFF;">&#39;填写简短精炼的变更描述 :</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      body: </span><span style="color:#9ECBFF;">&#39;填写更加详细的变更描述（可选）。使用 &quot;|&quot; 换行 :</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      breaking: </span><span style="color:#9ECBFF;">&#39;列举非兼容性重大的变更（可选）。使用 &quot;|&quot; 换行 :</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      footerPrefixsSelect: </span><span style="color:#9ECBFF;">&#39;选择关联issue前缀（可选）:&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      customFooterPrefixs: </span><span style="color:#9ECBFF;">&#39;输入自定义issue前缀 :&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      footer: </span><span style="color:#9ECBFF;">&#39;列举关联issue (可选) 例如: #31, #I3244 :</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      confirmCommit: </span><span style="color:#9ECBFF;">&#39;是否提交或修改commit ?&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    types: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      { value: </span><span style="color:#9ECBFF;">&#39;feat&#39;</span><span style="color:#E1E4E8;">, name: </span><span style="color:#9ECBFF;">&#39;feat:     新增功能 | A new feature&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">      { value: </span><span style="color:#9ECBFF;">&#39;fix&#39;</span><span style="color:#E1E4E8;">, name: </span><span style="color:#9ECBFF;">&#39;fix:      修复缺陷 | A bug fix&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        value: </span><span style="color:#9ECBFF;">&#39;docs&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        name: </span><span style="color:#9ECBFF;">&#39;docs:     文档更新 | Documentation only changes&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        value: </span><span style="color:#9ECBFF;">&#39;style&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        name: </span><span style="color:#9ECBFF;">&#39;style:    代码格式 | Changes that do not affect the meaning of the code&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        value: </span><span style="color:#9ECBFF;">&#39;refactor&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        name: </span><span style="color:#9ECBFF;">&#39;refactor: 代码重构 | A code change that neither fixes a bug nor adds a feature&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        value: </span><span style="color:#9ECBFF;">&#39;perf&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        name: </span><span style="color:#9ECBFF;">&#39;perf:     性能提升 | A code change that improves performance&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        value: </span><span style="color:#9ECBFF;">&#39;test&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        name: </span><span style="color:#9ECBFF;">&#39;test:     测试相关 | Adding missing tests or correcting existing tests&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        value: </span><span style="color:#9ECBFF;">&#39;build&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        name: </span><span style="color:#9ECBFF;">&#39;build:    构建相关 | Changes that affect the build system or external dependencies&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        value: </span><span style="color:#9ECBFF;">&#39;ci&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        name: </span><span style="color:#9ECBFF;">&#39;ci:       持续集成 | Changes to our CI configuration files and scripts&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      { value: </span><span style="color:#9ECBFF;">&#39;revert&#39;</span><span style="color:#E1E4E8;">, name: </span><span style="color:#9ECBFF;">&#39;revert:   回退代码 | Revert to a commit&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        value: </span><span style="color:#9ECBFF;">&#39;chore&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        name: </span><span style="color:#9ECBFF;">&#39;chore:    其他修改 | Other changes that do not modify src or test files&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    useEmoji: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    emojiAlign: </span><span style="color:#9ECBFF;">&#39;center&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    themeColorCode: </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    scopes: [],</span></span>
<span class="line"><span style="color:#E1E4E8;">    allowCustomScopes: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    allowEmptyScopes: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    customScopesAlign: </span><span style="color:#9ECBFF;">&#39;bottom&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    customScopesAlias: </span><span style="color:#9ECBFF;">&#39;custom&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    emptyScopesAlias: </span><span style="color:#9ECBFF;">&#39;empty&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    upperCaseSubject: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    markBreakingChangeMode: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    allowBreakingChanges: [</span><span style="color:#9ECBFF;">&#39;feat&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;fix&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    breaklineNumber: </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    breaklineChar: </span><span style="color:#9ECBFF;">&#39;|&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    skipQuestions: [],</span></span>
<span class="line"><span style="color:#E1E4E8;">    issuePrefixs: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 如果使用 gitee 作为开发管理</span></span>
<span class="line"><span style="color:#E1E4E8;">      { value: </span><span style="color:#9ECBFF;">&#39;link&#39;</span><span style="color:#E1E4E8;">, name: </span><span style="color:#9ECBFF;">&#39;link:     链接 ISSUES 进行中&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">      { value: </span><span style="color:#9ECBFF;">&#39;closed&#39;</span><span style="color:#E1E4E8;">, name: </span><span style="color:#9ECBFF;">&#39;closed:   标记 ISSUES 已完成&#39;</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    customIssuePrefixsAlign: </span><span style="color:#9ECBFF;">&#39;top&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    emptyIssuePrefixsAlias: </span><span style="color:#9ECBFF;">&#39;skip&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    customIssuePrefixsAlias: </span><span style="color:#9ECBFF;">&#39;custom&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    allowCustomIssuePrefixs: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    allowEmptyIssuePrefixs: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    confirmColorize: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    maxHeaderLength: </span><span style="color:#79B8FF;">Infinity</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    maxSubjectLength: </span><span style="color:#79B8FF;">Infinity</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    minSubjectLength: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    scopeOverrides: </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    defaultBody: </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    defaultIssues: </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    defaultScope: </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    defaultSubject: </span><span style="color:#9ECBFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  extends: [</span><span style="color:#032F62;">&#39;@commitlint/config-conventional&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  prompt: {</span></span>
<span class="line"><span style="color:#24292E;">    alias: { fd: </span><span style="color:#032F62;">&#39;docs: fix typos&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">    messages: {</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&#39;选择你要提交的类型 :&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      scope: </span><span style="color:#032F62;">&#39;选择一个提交范围（可选）:&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      customScope: </span><span style="color:#032F62;">&#39;请输入自定义的提交范围 :&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      subject: </span><span style="color:#032F62;">&#39;填写简短精炼的变更描述 :</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      body: </span><span style="color:#032F62;">&#39;填写更加详细的变更描述（可选）。使用 &quot;|&quot; 换行 :</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      breaking: </span><span style="color:#032F62;">&#39;列举非兼容性重大的变更（可选）。使用 &quot;|&quot; 换行 :</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      footerPrefixsSelect: </span><span style="color:#032F62;">&#39;选择关联issue前缀（可选）:&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      customFooterPrefixs: </span><span style="color:#032F62;">&#39;输入自定义issue前缀 :&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      footer: </span><span style="color:#032F62;">&#39;列举关联issue (可选) 例如: #31, #I3244 :</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      confirmCommit: </span><span style="color:#032F62;">&#39;是否提交或修改commit ?&#39;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    types: [</span></span>
<span class="line"><span style="color:#24292E;">      { value: </span><span style="color:#032F62;">&#39;feat&#39;</span><span style="color:#24292E;">, name: </span><span style="color:#032F62;">&#39;feat:     新增功能 | A new feature&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">      { value: </span><span style="color:#032F62;">&#39;fix&#39;</span><span style="color:#24292E;">, name: </span><span style="color:#032F62;">&#39;fix:      修复缺陷 | A bug fix&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        value: </span><span style="color:#032F62;">&#39;docs&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        name: </span><span style="color:#032F62;">&#39;docs:     文档更新 | Documentation only changes&#39;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        value: </span><span style="color:#032F62;">&#39;style&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        name: </span><span style="color:#032F62;">&#39;style:    代码格式 | Changes that do not affect the meaning of the code&#39;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        value: </span><span style="color:#032F62;">&#39;refactor&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        name: </span><span style="color:#032F62;">&#39;refactor: 代码重构 | A code change that neither fixes a bug nor adds a feature&#39;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        value: </span><span style="color:#032F62;">&#39;perf&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        name: </span><span style="color:#032F62;">&#39;perf:     性能提升 | A code change that improves performance&#39;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        value: </span><span style="color:#032F62;">&#39;test&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        name: </span><span style="color:#032F62;">&#39;test:     测试相关 | Adding missing tests or correcting existing tests&#39;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        value: </span><span style="color:#032F62;">&#39;build&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        name: </span><span style="color:#032F62;">&#39;build:    构建相关 | Changes that affect the build system or external dependencies&#39;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        value: </span><span style="color:#032F62;">&#39;ci&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        name: </span><span style="color:#032F62;">&#39;ci:       持续集成 | Changes to our CI configuration files and scripts&#39;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      { value: </span><span style="color:#032F62;">&#39;revert&#39;</span><span style="color:#24292E;">, name: </span><span style="color:#032F62;">&#39;revert:   回退代码 | Revert to a commit&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        value: </span><span style="color:#032F62;">&#39;chore&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        name: </span><span style="color:#032F62;">&#39;chore:    其他修改 | Other changes that do not modify src or test files&#39;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    useEmoji: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    emojiAlign: </span><span style="color:#032F62;">&#39;center&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    themeColorCode: </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    scopes: [],</span></span>
<span class="line"><span style="color:#24292E;">    allowCustomScopes: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    allowEmptyScopes: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    customScopesAlign: </span><span style="color:#032F62;">&#39;bottom&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    customScopesAlias: </span><span style="color:#032F62;">&#39;custom&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    emptyScopesAlias: </span><span style="color:#032F62;">&#39;empty&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    upperCaseSubject: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    markBreakingChangeMode: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    allowBreakingChanges: [</span><span style="color:#032F62;">&#39;feat&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;fix&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    breaklineNumber: </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    breaklineChar: </span><span style="color:#032F62;">&#39;|&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    skipQuestions: [],</span></span>
<span class="line"><span style="color:#24292E;">    issuePrefixs: [</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 如果使用 gitee 作为开发管理</span></span>
<span class="line"><span style="color:#24292E;">      { value: </span><span style="color:#032F62;">&#39;link&#39;</span><span style="color:#24292E;">, name: </span><span style="color:#032F62;">&#39;link:     链接 ISSUES 进行中&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">      { value: </span><span style="color:#032F62;">&#39;closed&#39;</span><span style="color:#24292E;">, name: </span><span style="color:#032F62;">&#39;closed:   标记 ISSUES 已完成&#39;</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    customIssuePrefixsAlign: </span><span style="color:#032F62;">&#39;top&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    emptyIssuePrefixsAlias: </span><span style="color:#032F62;">&#39;skip&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    customIssuePrefixsAlias: </span><span style="color:#032F62;">&#39;custom&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    allowCustomIssuePrefixs: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    allowEmptyIssuePrefixs: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    confirmColorize: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    maxHeaderLength: </span><span style="color:#005CC5;">Infinity</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    maxSubjectLength: </span><span style="color:#005CC5;">Infinity</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    minSubjectLength: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    scopeOverrides: </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    defaultBody: </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    defaultIssues: </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    defaultScope: </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    defaultSubject: </span><span style="color:#032F62;">&#39;&#39;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><ul><li>commit你的代码</li></ul><pre><code>git cz

# 或

npm run commit
</code></pre><h2 id="_5-自动生成changelog" tabindex="-1">5. 自动生成changelog <a class="header-anchor" href="#_5-自动生成changelog" aria-label="Permalink to &quot;5. 自动生成changelog&quot;">​</a></h2><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;changelog&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0 &amp;&amp; git add CHANGELOG.md&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">},</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;scripts&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;changelog&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0 &amp;&amp; git add CHANGELOG.md&quot;</span></span>
<span class="line"><span style="color:#24292E;">},</span></span></code></pre></div><h2 id="测试" tabindex="-1">测试 <a class="header-anchor" href="#测试" aria-label="Permalink to &quot;测试&quot;">​</a></h2><ul><li>初始化 <code>pre-push</code></li></ul><pre><code>npx husky add .husky/pre-push &quot;npm test&quot;
</code></pre><ul><li>安装 vitest</li></ul><pre><code>npm install -D vitest
</code></pre><ul><li>创建<code>vitest.config.ts</code></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { defineConfig } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vitest/config&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineConfig</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  test: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { defineConfig } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vitest/config&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineConfig</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  test: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><ul><li>添加命令</li></ul><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;test&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;vitest&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;coverage&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;vitest run --coverage&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;scripts&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;test&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;vitest&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;coverage&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;vitest run --coverage&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,43),e=[o];function t(c,r,E,i,y,u){return n(),a("div",null,e)}const m=s(p,[["render",t]]);export{d as __pageData,m as default};
