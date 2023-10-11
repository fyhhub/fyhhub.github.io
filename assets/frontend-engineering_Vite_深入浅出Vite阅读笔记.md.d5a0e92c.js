import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.3d945e71.js";const g=JSON.parse('{"title":"深入浅出 Vite 阅读笔记","description":"","frontmatter":{},"headers":[],"relativePath":"frontend-engineering/Vite/深入浅出Vite阅读笔记.md","filePath":"frontend-engineering/Vite/深入浅出Vite阅读笔记.md","lastUpdated":1696991368000}'),p={name:"frontend-engineering/Vite/深入浅出Vite阅读笔记.md"},o=l(`<h1 id="深入浅出-vite-阅读笔记" tabindex="-1">深入浅出 Vite 阅读笔记 <a class="header-anchor" href="#深入浅出-vite-阅读笔记" aria-label="Permalink to &quot;深入浅出 Vite 阅读笔记&quot;">​</a></h1><h2 id="声明" tabindex="-1">声明 <a class="header-anchor" href="#声明" aria-label="Permalink to &quot;声明&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>本文基于 <a href="https://juejin.cn/book/7050063811973218341" target="_blank" rel="noreferrer">深入浅出 Vite</a> 做了关键点总结。</p></div><h2 id="_1-vite-的优势" tabindex="-1">1. Vite 的优势 <a class="header-anchor" href="#_1-vite-的优势" aria-label="Permalink to &quot;1. Vite 的优势&quot;">​</a></h2><ol><li>模块化方面：不需要考虑各种模块规范，都统一转成 ESM</li><li>模块编译方面：webpack 冷启动需要递归打包依赖树，vite 基于浏览器 esm，能做到按需加载和编译。</li><li>基于 ESBuild：提前将三方模块打包编译，并且天然支持 TSX/JSX 的编译</li><li>基于 Rollup 的插件机制：vite 基于 rollup 的插件机制，扩展性更强，能直接复用 rollup 的各种插件</li></ol><p><strong>利用浏览器原生 ES 模块的支持，实现开发阶段的 Dev Server，进行模块的按需加载，而不是先整体打包再进行加载。相比 Webpack 这种必须打包再加载的传统构建模式，Vite 在开发阶段省略了繁琐且耗时的打包过程，这也是它为什么快的一个重要原因。</strong></p><p><strong>一个 import 对应一个请求</strong></p><h2 id="_2-为什么-vite-打包前要执行-tsc" tabindex="-1">2. 为什么 Vite 打包前要执行 tsc <a class="header-anchor" href="#_2-为什么-vite-打包前要执行-tsc" aria-label="Permalink to &quot;2. 为什么 Vite 打包前要执行 tsc&quot;">​</a></h2><p><strong>这里的作用主要是用来做类型检查</strong></p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;compilerOptions&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 省略其他配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. noEmit 表示只做类型检查，而不会输出产物文件</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 这行配置与 tsc --noEmit 命令等效</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;noEmit&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;compilerOptions&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 省略其他配置</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. noEmit 表示只做类型检查，而不会输出产物文件</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 这行配置与 tsc --noEmit 命令等效</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;noEmit&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_3-vite-配置" tabindex="-1">3. Vite 配置 <a class="header-anchor" href="#_3-vite-配置" aria-label="Permalink to &quot;3. Vite 配置&quot;">​</a></h2><h3 id="_3-1-配置预处理器" tabindex="-1">3.1 配置预处理器 <a class="header-anchor" href="#_3-1-配置预处理器" aria-label="Permalink to &quot;3.1 配置预处理器&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pnpm i sass </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pnpm i sass </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">D</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { normalizePath } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vite&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">// 如果类型报错，需要安装 @types/node: pnpm i @types/node -D</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> path </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;path&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 全局 scss 文件的路径</span></span>
<span class="line"><span style="color:#6A737D;">// 用 normalizePath 解决 window 下的路径问题</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">variablePath</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">normalizePath</span><span style="color:#E1E4E8;">(path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./src/variable.scss&#39;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineConfig</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// css 相关的配置</span></span>
<span class="line"><span style="color:#E1E4E8;">  css: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    preprocessorOptions: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      scss: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// additionalData 的内容会在每个 scss 文件的开头自动注入</span></span>
<span class="line"><span style="color:#E1E4E8;">        additionalData: </span><span style="color:#9ECBFF;">\`@import &quot;\${</span><span style="color:#E1E4E8;">variablePath</span><span style="color:#9ECBFF;">}&quot;;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { normalizePath } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vite&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">// 如果类型报错，需要安装 @types/node: pnpm i @types/node -D</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> path </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;path&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 全局 scss 文件的路径</span></span>
<span class="line"><span style="color:#6A737D;">// 用 normalizePath 解决 window 下的路径问题</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">variablePath</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">normalizePath</span><span style="color:#24292E;">(path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./src/variable.scss&#39;</span><span style="color:#24292E;">));</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineConfig</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// css 相关的配置</span></span>
<span class="line"><span style="color:#24292E;">  css: {</span></span>
<span class="line"><span style="color:#24292E;">    preprocessorOptions: {</span></span>
<span class="line"><span style="color:#24292E;">      scss: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// additionalData 的内容会在每个 scss 文件的开头自动注入</span></span>
<span class="line"><span style="color:#24292E;">        additionalData: </span><span style="color:#032F62;">\`@import &quot;\${</span><span style="color:#24292E;">variablePath</span><span style="color:#032F62;">}&quot;;\`</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span></code></pre></div><h3 id="_3-2-css-配置" tabindex="-1">3.2 CSS 配置 <a class="header-anchor" href="#_3-2-css-配置" aria-label="Permalink to &quot;3.2 CSS 配置&quot;">​</a></h3><h4 id="_3-2-1-配置-css-module" tabindex="-1">3.2.1 配置 CSS Module <a class="header-anchor" href="#_3-2-1-配置-css-module" aria-label="Permalink to &quot;3.2.1 配置 CSS Module&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  css: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    modules: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 其中，name 表示当前文件名，local 表示类名</span></span>
<span class="line"><span style="color:#E1E4E8;">      generateScopedName: </span><span style="color:#9ECBFF;">&quot;[name]__[local]___[hash:base64:5]&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    preprocessorOptions: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 省略预处理器配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  css: {</span></span>
<span class="line"><span style="color:#24292E;">    modules: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 其中，name 表示当前文件名，local 表示类名</span></span>
<span class="line"><span style="color:#24292E;">      generateScopedName: </span><span style="color:#032F62;">&quot;[name]__[local]___[hash:base64:5]&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    preprocessorOptions: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 省略预处理器配置</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h4 id="_3-2-2-配置-postcss" tabindex="-1">3.2.2 配置 postcss <a class="header-anchor" href="#_3-2-2-配置-postcss" aria-label="Permalink to &quot;3.2.2 配置 postcss&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pnpm i autoprefixer </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pnpm i autoprefixer </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">D</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts 增加如下的配置</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> autoprefixer </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;autoprefixer&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  css: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 进行 PostCSS 配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    postcss: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">autoprefixer</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 指定目标浏览器</span></span>
<span class="line"><span style="color:#E1E4E8;">          overrideBrowserslist: [</span><span style="color:#9ECBFF;">&quot;Chrome &gt; 40&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;ff &gt; 31&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;ie 11&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">        }),</span></span>
<span class="line"><span style="color:#E1E4E8;">      ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts 增加如下的配置</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> autoprefixer </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;autoprefixer&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  css: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 进行 PostCSS 配置</span></span>
<span class="line"><span style="color:#24292E;">    postcss: {</span></span>
<span class="line"><span style="color:#24292E;">      plugins: [</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">autoprefixer</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 指定目标浏览器</span></span>
<span class="line"><span style="color:#24292E;">          overrideBrowserslist: [</span><span style="color:#032F62;">&quot;Chrome &gt; 40&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;ff &gt; 31&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;ie 11&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">        }),</span></span>
<span class="line"><span style="color:#24292E;">      ],</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h4 id="_3-2-3-css-原子化框架" tabindex="-1">3.2.3 CSS 原子化框架 <a class="header-anchor" href="#_3-2-3-css-原子化框架" aria-label="Permalink to &quot;3.2.3 CSS 原子化框架&quot;">​</a></h4><h4 id="_3-2-4-windi-css-接入" tabindex="-1">3.2.4 Windi CSS 接入 <a class="header-anchor" href="#_3-2-4-windi-css-接入" aria-label="Permalink to &quot;3.2.4 Windi CSS 接入&quot;">​</a></h4><pre><code>pnpm i windicss vite-plugin-windicss -D
</code></pre><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> windi </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vite-plugin-windicss&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 省略其它插件</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">windi</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// main.tsx</span></span>
<span class="line"><span style="color:#6A737D;">// 用来注入 Windi CSS 所需的样式，一定要加上！</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;virtual:windi.css&quot;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> windi </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vite-plugin-windicss&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 省略其它插件</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">windi</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// main.tsx</span></span>
<span class="line"><span style="color:#6A737D;">// 用来注入 Windi CSS 所需的样式，一定要加上！</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;virtual:windi.css&quot;</span><span style="color:#24292E;">;</span></span></code></pre></div><h4 id="_3-2-5-tailwind-css" tabindex="-1">3.2.5 Tailwind CSS <a class="header-anchor" href="#_3-2-5-tailwind-css" aria-label="Permalink to &quot;3.2.5 Tailwind CSS&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pnpm install </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">D</span><span style="color:#E1E4E8;"> tailwindcss postcss autoprefixer</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pnpm install </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">D</span><span style="color:#24292E;"> tailwindcss postcss autoprefixer</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// tailwind.config.js</span></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  content: [</span><span style="color:#9ECBFF;">&quot;./index.html&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;./src/**/*.{vue,js,ts,jsx,tsx}&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  theme: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    extend: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [],</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// postcss.config.js</span></span>
<span class="line"><span style="color:#6A737D;">// 从中你可以看到，Tailwind CSS 的编译能力是通过 PostCSS 插件实现的</span></span>
<span class="line"><span style="color:#6A737D;">// 而 Vite 本身内置了 PostCSS，因此可以通过 PostCSS 配置接入 Tailwind CSS</span></span>
<span class="line"><span style="color:#6A737D;">// 注意: Vite 配置文件中如果有 PostCSS 配置的情况下会覆盖掉 post.config.js 的内容!</span></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    tailwindcss: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">    autoprefixer: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// tailwind.config.js</span></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  content: [</span><span style="color:#032F62;">&quot;./index.html&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;./src/**/*.{vue,js,ts,jsx,tsx}&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  theme: {</span></span>
<span class="line"><span style="color:#24292E;">    extend: {},</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [],</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// postcss.config.js</span></span>
<span class="line"><span style="color:#6A737D;">// 从中你可以看到，Tailwind CSS 的编译能力是通过 PostCSS 插件实现的</span></span>
<span class="line"><span style="color:#6A737D;">// 而 Vite 本身内置了 PostCSS，因此可以通过 PostCSS 配置接入 Tailwind CSS</span></span>
<span class="line"><span style="color:#6A737D;">// 注意: Vite 配置文件中如果有 PostCSS 配置的情况下会覆盖掉 post.config.js 的内容!</span></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  plugins: {</span></span>
<span class="line"><span style="color:#24292E;">    tailwindcss: {},</span></span>
<span class="line"><span style="color:#24292E;">    autoprefixer: {},</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><p>接着在项目的入口 CSS 中引入必要的样板代码:</p><div class="language-less vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">less</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@tailwind base;</span></span>
<span class="line"><span style="color:#E1E4E8;">@tailwind components;</span></span>
<span class="line"><span style="color:#E1E4E8;">@tailwind utilities;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@tailwind base;</span></span>
<span class="line"><span style="color:#24292E;">@tailwind components;</span></span>
<span class="line"><span style="color:#24292E;">@tailwind utilities;</span></span></code></pre></div><h3 id="_3-3-静态资源配置" tabindex="-1">3.3 静态资源配置 <a class="header-anchor" href="#_3-3-静态资源配置" aria-label="Permalink to &quot;3.3 静态资源配置&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> path </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;path&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 别名配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">alias</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;@assets&#39;</span><span style="color:#E1E4E8;">: path.</span><span style="color:#B392F0;">join</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;src/assets&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> path </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;path&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 别名配置</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">alias</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;@assets&#39;</span><span style="color:#24292E;">: path.</span><span style="color:#6F42C1;">join</span><span style="color:#24292E;">(__dirname, </span><span style="color:#032F62;">&#39;src/assets&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="_3-3-1-svg-组件方式加载" tabindex="-1">3.3.1 SVG 组件方式加载 <a class="header-anchor" href="#_3-3-1-svg-组件方式加载" aria-label="Permalink to &quot;3.3.1 SVG 组件方式加载&quot;">​</a></h4><ul><li>Vue2 项目中可以使用 vite-plugin-vue2-svg 插件。</li><li>Vue3 项目中可以引入 vite-svg-loader。</li><li>React 项目使用 vite-plugin-svgr 插件。</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pnpm i vite</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">plugin</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">svgr </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pnpm i vite</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">plugin</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">svgr </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">D</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> svgr </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vite-plugin-svgr&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">plugins</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 其它插件省略</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">svgr</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">  ];</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> svgr </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vite-plugin-svgr&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">plugins</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 其它插件省略</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">svgr</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">  ];</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>随后注意要在 tsconfig.json 添加如下配置，否则会有类型错误:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;compilerOptions&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 省略其它配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;types&quot;</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;vite-plugin-svgr/client&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;compilerOptions&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 省略其它配置</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;types&quot;</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;vite-plugin-svgr/client&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="_3-3-2-静态资源公共域名配置" tabindex="-1">3.3.2 静态资源公共域名配置 <a class="header-anchor" href="#_3-3-2-静态资源公共域名配置" aria-label="Permalink to &quot;3.3.2 静态资源公共域名配置&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// .env 文件</span></span>
<span class="line"><span style="color:#E1E4E8;">VITE_IMG_BASE_URL=https:</span><span style="color:#6A737D;">//my-image-cdn.com</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// .env 文件</span></span>
<span class="line"><span style="color:#24292E;">VITE_IMG_BASE_URL=https:</span><span style="color:#6A737D;">//my-image-cdn.com</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// src/vite-env.d.ts</span></span>
<span class="line"><span style="color:#6A737D;">/// &lt;</span><span style="color:#85E89D;">reference</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">types</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;vite/client&quot;</span><span style="color:#6A737D;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ImportMetaEnv</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">VITE_APP_TITLE</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 自定义的环境变量</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">VITE_IMG_BASE_URL</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ImportMeta</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">env</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ImportMetaEnv</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// src/vite-env.d.ts</span></span>
<span class="line"><span style="color:#6A737D;">/// &lt;</span><span style="color:#22863A;">reference</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">types</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;vite/client&quot;</span><span style="color:#6A737D;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ImportMetaEnv</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;"> </span><span style="color:#E36209;">VITE_APP_TITLE</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 自定义的环境变量</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;"> </span><span style="color:#E36209;">VITE_IMG_BASE_URL</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ImportMeta</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;"> </span><span style="color:#E36209;">env</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ImportMetaEnv</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">img</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">{new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">URL(</span><span style="color:#FDAEB7;font-style:italic;">&#39;./logo.png&#39;,</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">i<wbr>mport.meta.env.VITE_IMG_BASE_URL).href}</span><span style="color:#E1E4E8;"> /&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">img</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">{new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">URL(</span><span style="color:#B31D28;font-style:italic;">&#39;./logo.png&#39;,</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">i<wbr>mport.meta.env.VITE_IMG_BASE_URL).href}</span><span style="color:#24292E;"> /&gt;</span></span></code></pre></div><h4 id="_3-3-3-图片压缩" tabindex="-1">3.3.3 图片压缩 <a class="header-anchor" href="#_3-3-3-图片压缩" aria-label="Permalink to &quot;3.3.3 图片压缩&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pnpm i vite</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">plugin</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">imagemin </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pnpm i vite</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">plugin</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">imagemin </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">D</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//vite.config.ts</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> viteImagemin </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vite-plugin-imagemin&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">plugins</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 忽略前面的插件</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">viteImagemin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 无损压缩配置，无损压缩下图片质量不会变差</span></span>
<span class="line"><span style="color:#E1E4E8;">      optipng: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        optimizationLevel: </span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 有损压缩配置，有损压缩下图片质量可能会变差</span></span>
<span class="line"><span style="color:#E1E4E8;">      pngquant: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        quality: [</span><span style="color:#79B8FF;">0.8</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0.9</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// svg 优化</span></span>
<span class="line"><span style="color:#E1E4E8;">      svgo: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">          {</span></span>
<span class="line"><span style="color:#E1E4E8;">            name: </span><span style="color:#9ECBFF;">&quot;removeViewBox&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          },</span></span>
<span class="line"><span style="color:#E1E4E8;">          {</span></span>
<span class="line"><span style="color:#E1E4E8;">            name: </span><span style="color:#9ECBFF;">&quot;removeEmptyAttrs&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            active: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          },</span></span>
<span class="line"><span style="color:#E1E4E8;">        ],</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    }),</span></span>
<span class="line"><span style="color:#E1E4E8;">  ];</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//vite.config.ts</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> viteImagemin </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vite-plugin-imagemin&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">plugins</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 忽略前面的插件</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">viteImagemin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 无损压缩配置，无损压缩下图片质量不会变差</span></span>
<span class="line"><span style="color:#24292E;">      optipng: {</span></span>
<span class="line"><span style="color:#24292E;">        optimizationLevel: </span><span style="color:#005CC5;">7</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 有损压缩配置，有损压缩下图片质量可能会变差</span></span>
<span class="line"><span style="color:#24292E;">      pngquant: {</span></span>
<span class="line"><span style="color:#24292E;">        quality: [</span><span style="color:#005CC5;">0.8</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0.9</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// svg 优化</span></span>
<span class="line"><span style="color:#24292E;">      svgo: {</span></span>
<span class="line"><span style="color:#24292E;">        plugins: [</span></span>
<span class="line"><span style="color:#24292E;">          {</span></span>
<span class="line"><span style="color:#24292E;">            name: </span><span style="color:#032F62;">&quot;removeViewBox&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          },</span></span>
<span class="line"><span style="color:#24292E;">          {</span></span>
<span class="line"><span style="color:#24292E;">            name: </span><span style="color:#032F62;">&quot;removeEmptyAttrs&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            active: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          },</span></span>
<span class="line"><span style="color:#24292E;">        ],</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    }),</span></span>
<span class="line"><span style="color:#24292E;">  ];</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="_3-3-4-雪碧图优化" tabindex="-1">3.3.4 雪碧图优化 <a class="header-anchor" href="#_3-3-4-雪碧图优化" aria-label="Permalink to &quot;3.3.4 雪碧图优化&quot;">​</a></h4><p>在实际的项目中我们还会经常用到各种各样的 svg 图标，虽然 svg 文件一般体积不大，但 Vite 中对于 svg 文件会始终打包成单文件，大量的图标引入之后会导致网络请求增加，大量的 HTTP 请求会导致网络解析耗时变长，页面加载性能直接受到影响。这个问题怎么解决呢？</p><p>Vite 中提供了 i<wbr>mport.meta.glob 的语法糖来解决这种批量导入的问题，如上述的 import 语句可以写成下面这样:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">icons</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">meta</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">glob</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;../../assets/icons/logo-*.svg&quot;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">icons</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">meta</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">glob</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;../../assets/icons/logo-*.svg&quot;</span><span style="color:#24292E;">);</span></span></code></pre></div><p>在这里我们只需要同步加载即可，可以使用 i<wbr>mport.meta.globEager 来完成:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">icons</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">meta</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">globEager</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;../../assets/icons/logo-*.svg&quot;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">icons</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">meta</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">globEager</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;../../assets/icons/logo-*.svg&quot;</span><span style="color:#24292E;">);</span></span></code></pre></div><p>合并图标的方案也叫雪碧图，我们可以通过 vite-plugin-svg-icons 来实现这个方案，首先安装一下这个插件:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pnpm i vite</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">plugin</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">svg</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">icons </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pnpm i vite</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">plugin</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">svg</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">icons </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">D</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createSvgIconsPlugin } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vite-plugin-svg-icons&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">plugins</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 省略其它插件</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">createSvgIconsPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      iconDirs: [path.</span><span style="color:#B392F0;">join</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&quot;src/assets/icons&quot;</span><span style="color:#E1E4E8;">)],</span></span>
<span class="line"><span style="color:#E1E4E8;">    }),</span></span>
<span class="line"><span style="color:#E1E4E8;">  ];</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { createSvgIconsPlugin } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vite-plugin-svg-icons&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">plugins</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 省略其它插件</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">createSvgIconsPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      iconDirs: [path.</span><span style="color:#6F42C1;">join</span><span style="color:#24292E;">(__dirname, </span><span style="color:#032F62;">&quot;src/assets/icons&quot;</span><span style="color:#24292E;">)],</span></span>
<span class="line"><span style="color:#24292E;">    }),</span></span>
<span class="line"><span style="color:#24292E;">  ];</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_4-vite-预构建" tabindex="-1">4. Vite 预构建 <a class="header-anchor" href="#_4-vite-预构建" aria-label="Permalink to &quot;4. Vite 预构建&quot;">​</a></h2><h3 id="_4-1-配置-include-的场景" tabindex="-1">4.1 配置 include 的场景 <a class="header-anchor" href="#_4-1-配置-include-的场景" aria-label="Permalink to &quot;4.1 配置 include 的场景&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#B392F0;">optimizeDeps</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 配置为一个字符串数组，将 \`lodash-es\` 和 \`vue\`两个包强制进行预构建</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">include</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;lodash-es&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;vue&quot;</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#6F42C1;">optimizeDeps</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 配置为一个字符串数组，将 \`lodash-es\` 和 \`vue\`两个包强制进行预构建</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">include</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;lodash-es&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;vue&quot;</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="_4-1-1-场景一-动态-import" tabindex="-1">4.1.1 场景一: 动态 import <a class="header-anchor" href="#_4-1-1-场景一-动态-import" aria-label="Permalink to &quot;4.1.1 场景一: 动态 import&quot;">​</a></h4><p>在某些动态 import 的场景下，由于 Vite 天然按需加载的特性，经常会导致某些依赖只能在运行时被识别出来。导致<code>二次预构建</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// src/locales/zh_CN.js</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> objectAssign </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;object-assign&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(objectAssign);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// main.tsx</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">importModule</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">m</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`./locales/\${</span><span style="color:#E1E4E8;">m</span><span style="color:#9ECBFF;">}.ts\`</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#B392F0;">importModule</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;zh_CN&quot;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// src/locales/zh_CN.js</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> objectAssign </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;object-assign&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(objectAssign);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// main.tsx</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">importModule</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">m</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`./locales/\${</span><span style="color:#24292E;">m</span><span style="color:#032F62;">}.ts\`</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6F42C1;">importModule</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;zh_CN&quot;</span><span style="color:#24292E;">);</span></span></code></pre></div><p>二次预构建的成本也比较大。我们不仅需要把预构建的流程重新运行一遍，还得重新刷新页面，并且需要重新请求所有的模块。</p><p>可以通过 include 参数提前声明需要按需加载的依赖:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">optimizeDeps</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">include</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 按需加载的依赖都可以声明到这个数组里</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;object-assign&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    ];</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">optimizeDeps</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">include</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 按需加载的依赖都可以声明到这个数组里</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;object-assign&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    ];</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="_4-1-2-场景二-某些包被手动-exclude" tabindex="-1">4.1.2 场景二: 某些包被手动 exclude <a class="header-anchor" href="#_4-1-2-场景二-某些包被手动-exclude" aria-label="Permalink to &quot;4.1.2 场景二: 某些包被手动 exclude&quot;">​</a></h4><p>在预构建中排除某个包的情况，需要注意它所依赖的包是否具有 ESM 格式</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">optimizeDeps</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">exclude</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;@loadable/component&quot;</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">optimizeDeps</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">exclude</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;@loadable/component&quot;</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到浏览器控制台会出现如下的报错:</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e72fecff62ec477686aeb539ee66aa4e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?" alt="1"></p><p>这是为什么呢? 我们刚刚手动 exclude 的包@loadable/component 本身具有 ESM 格式的产物，但它的某个依赖 hoist-non-react-statics 的产物并没有提供 ESM 格式，导致运行时加载失败。</p><p>强制对<code>hoist-non-react-statics</code>这个间接依赖进行预构建:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">optimizeDeps</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">include</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 间接依赖的声明语法，通过\`&gt;\`分开, 如\`a &gt; b\`表示 a 中依赖的 b</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;@loadable/component &gt; hoist-non-react-statics&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    ];</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">optimizeDeps</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">include</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 间接依赖的声明语法，通过\`&gt;\`分开, 如\`a &gt; b\`表示 a 中依赖的 b</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;@loadable/component &gt; hoist-non-react-statics&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    ];</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="_4-2-第三方包出现问题" tabindex="-1">4.2 第三方包出现问题 <a class="header-anchor" href="#_4-2-第三方包出现问题" aria-label="Permalink to &quot;4.2 第三方包出现问题&quot;">​</a></h3><h4 id="_4-2-1-patch-package" tabindex="-1">4.2.1 patch-package <a class="header-anchor" href="#_4-2-1-patch-package" aria-label="Permalink to &quot;4.2.1 patch-package&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pnpm i @milahu</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">patch</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">package </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pnpm i @milahu</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">patch</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">package </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">D</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>注意: 要改动的包在 package.json 中必须声明确定的版本，不能有~或者^的前缀。</p></div><p>接着，我们进入第三方库的代码中进行修改，先删掉无用的 import 语句，再在命令行输入</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npx patch</span><span style="color:#F97583;">-package</span><span style="color:#E1E4E8;"> react</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">virtualized</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npx patch</span><span style="color:#D73A49;">-package</span><span style="color:#24292E;"> react</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">virtualized</span></span></code></pre></div><p>现在根目录会多出 patches 目录记录第三方包内容的更改，随后我们在 package.json 的 scripts 中增加如下内容：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 省略其它 script</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;postinstall&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;patch-package&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;scripts&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 省略其它 script</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;postinstall&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;patch-package&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="_4-2-2-esbuild-插件" tabindex="-1">4.2.2 Esbuild 插件 <a class="header-anchor" href="#_4-2-2-esbuild-插件" aria-label="Permalink to &quot;4.2.2 Esbuild 插件&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">esbuildPatchPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  name: </span><span style="color:#9ECBFF;">&quot;react-virtualized-patch&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">build</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    build.</span><span style="color:#B392F0;">onLoad</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        filter:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">react-virtualized</span><span style="color:#85E89D;font-weight:bold;">\\/</span><span style="color:#DBEDFF;">dist</span><span style="color:#85E89D;font-weight:bold;">\\/</span><span style="color:#DBEDFF;">es</span><span style="color:#85E89D;font-weight:bold;">\\/</span><span style="color:#DBEDFF;">WindowScroller</span><span style="color:#85E89D;font-weight:bold;">\\/</span><span style="color:#DBEDFF;">utils</span><span style="color:#85E89D;font-weight:bold;">\\/</span><span style="color:#DBEDFF;">onScroll</span><span style="color:#79B8FF;">.</span><span style="color:#DBEDFF;">js</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">text</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> fs.promises.</span><span style="color:#B392F0;">readFile</span><span style="color:#E1E4E8;">(args.path, </span><span style="color:#9ECBFF;">&quot;utf8&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          contents: text.</span><span style="color:#B392F0;">replace</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&#39;import { bpfrpt_proptype_WindowScroller } from &quot;../WindowScroller.js&quot;;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">          ),</span></span>
<span class="line"><span style="color:#E1E4E8;">        };</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    );</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 插件加入 Vite 预构建配置</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">optimizeDeps</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">esbuildOptions</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">plugins</span><span style="color:#E1E4E8;">: [esbuildPatchPlugin];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">esbuildPatchPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  name: </span><span style="color:#032F62;">&quot;react-virtualized-patch&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">(</span><span style="color:#E36209;">build</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    build.</span><span style="color:#6F42C1;">onLoad</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        filter:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">/react-virtualized</span><span style="color:#22863A;font-weight:bold;">\\/</span><span style="color:#032F62;">dist</span><span style="color:#22863A;font-weight:bold;">\\/</span><span style="color:#032F62;">es</span><span style="color:#22863A;font-weight:bold;">\\/</span><span style="color:#032F62;">WindowScroller</span><span style="color:#22863A;font-weight:bold;">\\/</span><span style="color:#032F62;">utils</span><span style="color:#22863A;font-weight:bold;">\\/</span><span style="color:#032F62;">onScroll</span><span style="color:#005CC5;">.</span><span style="color:#032F62;">js</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">args</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">text</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> fs.promises.</span><span style="color:#6F42C1;">readFile</span><span style="color:#24292E;">(args.path, </span><span style="color:#032F62;">&quot;utf8&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          contents: text.</span><span style="color:#6F42C1;">replace</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&#39;import { bpfrpt_proptype_WindowScroller } from &quot;../WindowScroller.js&quot;;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">          ),</span></span>
<span class="line"><span style="color:#24292E;">        };</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    );</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 插件加入 Vite 预构建配置</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">optimizeDeps</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">esbuildOptions</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">plugins</span><span style="color:#24292E;">: [esbuildPatchPlugin];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_5-esbuild-和-rollup" tabindex="-1">5. ESBuild 和 rollup <a class="header-anchor" href="#_5-esbuild-和-rollup" aria-label="Permalink to &quot;5. ESBuild 和 rollup&quot;">​</a></h2><h3 id="_5-1-esbuild" tabindex="-1">5.1 esbuild <a class="header-anchor" href="#_5-1-esbuild" aria-label="Permalink to &quot;5.1 esbuild&quot;">​</a></h3><p>Esbuild 作为打包工具也有一些缺点:</p><ul><li>不支持<code>降级到 ES5</code> 的代码。这意味着在低端浏览器代码会跑不起来</li><li>不支持 <code>const enum</code> 等语法。这意味着单独使用这些语法在 esbuild 中会直接抛错。</li><li>不提供操作打包产物的接口，像 Rollup 中灵活<code>处理打包产物</code>的能力(如 renderChunk 钩子)在 Esbuild 当中完全没有。</li><li>不支持自定义 <code>Code Splitting</code> 策略。传统的 Webpack 和 Rollup 都提供了自定义拆包策略的 API，而 Esbuild 并未提供，从而降级了拆包优化的灵活性。</li><li>Esbuild 并没有实现 TS 的类型系统，在编译 TS(或者 TSX) 文件时仅仅抹掉了类型相关的代码，暂时没有能力实现类型检查</li></ul><p>Esbuild <code>转译 TS 或者 JSX</code> 的能力通过 Vite 插件提供, Vite 已经将 Esbuild 的 Transformer 能力用到了<code>生产环境</code>。</p><h3 id="_5-2-rollup" tabindex="-1">5.2 rollup <a class="header-anchor" href="#_5-2-rollup" aria-label="Permalink to &quot;5.2 rollup&quot;">​</a></h3><h4 id="_5-2-1-生产环境-bundle" tabindex="-1">5.2.1 生产环境 Bundle <a class="header-anchor" href="#_5-2-1-生产环境-bundle" aria-label="Permalink to &quot;5.2.1 生产环境 Bundle&quot;">​</a></h4><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">&lt;!-- 省略其它内容 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">&lt;!-- 入口 chunk --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;module&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">crossorigin</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;/assets/index.250e0340.js&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">&lt;!--  自动预加载入口 chunk 所依赖的 chunk--&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">link</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">rel</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;modulepreload&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">href</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;/assets/vendor.293dca09.js&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">&lt;!-- 省略其它内容 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">&lt;!-- 入口 chunk --&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;module&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">crossorigin</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;/assets/index.250e0340.js&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">&lt;!--  自动预加载入口 chunk 所依赖的 chunk--&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">link</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">rel</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;modulepreload&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">href</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;/assets/vendor.293dca09.js&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>一般情况下，Rollup 打包之后，会先请求 A，然后浏览器在加载 A 的过程中才决定请求和加载 C，但 Vite 进行优化之后，请求 A 的同时会自动预加载 C，通过优化 Rollup 产物依赖加载方式节省了不必要的网络开销。</p><h4 id="_5-2-2-兼容插件机制" tabindex="-1">5.2.2 兼容插件机制 <a class="header-anchor" href="#_5-2-2-兼容插件机制" aria-label="Permalink to &quot;5.2.2 兼容插件机制&quot;">​</a></h4><p>无论是开发阶段还是生产环境，Vite 都根植于 Rollup 的插件机制和生态</p><h2 id="_6-插件开发" tabindex="-1">6. 插件开发 <a class="header-anchor" href="#_6-插件开发" aria-label="Permalink to &quot;6. 插件开发&quot;">​</a></h2><h3 id="_6-1-虚拟模块" tabindex="-1">6.1 虚拟模块 <a class="header-anchor" href="#_6-1-虚拟模块" aria-label="Permalink to &quot;6.1 虚拟模块&quot;">​</a></h3><p>我们来尝试一下如何通过虚拟模块来读取内存中的变量</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Plugin, ResolvedConfig } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vite&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">virtualEnvModuleId</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;virtual:env&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">resolvedEnvVirtualModuleId</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;</span><span style="color:#79B8FF;">\\0</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> virtualEnvModuleId;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">virtualFibModulePlugin</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Plugin</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> config</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ResolvedConfig</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;vite-plugin-virtual-fib-module&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">configResolved</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">c</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ResolvedConfig</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      config </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> c;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">resolveId</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">id</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (id </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> virtualEnvModuleId) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> resolvedEnvVirtualModuleId;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">load</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">id</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (id </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> resolvedEnvVirtualModuleId) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`export default \${</span><span style="color:#79B8FF;">JSON</span><span style="color:#9ECBFF;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#9ECBFF;">(</span><span style="color:#E1E4E8;">config</span><span style="color:#F97583;">!</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">env</span><span style="color:#9ECBFF;">)</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Plugin, ResolvedConfig } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vite&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">virtualEnvModuleId</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;virtual:env&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">resolvedEnvVirtualModuleId</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;</span><span style="color:#005CC5;">\\0</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> virtualEnvModuleId;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">virtualFibModulePlugin</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Plugin</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> config</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ResolvedConfig</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;vite-plugin-virtual-fib-module&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">configResolved</span><span style="color:#24292E;">(</span><span style="color:#E36209;">c</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ResolvedConfig</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      config </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> c;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">resolveId</span><span style="color:#24292E;">(</span><span style="color:#E36209;">id</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (id </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> virtualEnvModuleId) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> resolvedEnvVirtualModuleId;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">load</span><span style="color:#24292E;">(</span><span style="color:#E36209;">id</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (id </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> resolvedEnvVirtualModuleId) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`export default \${</span><span style="color:#005CC5;">JSON</span><span style="color:#032F62;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#032F62;">(</span><span style="color:#24292E;">config</span><span style="color:#D73A49;">!</span><span style="color:#032F62;">.</span><span style="color:#24292E;">env</span><span style="color:#032F62;">)</span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// main.tsx</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> env </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;virtual:env&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(env);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// main.tsx</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> env </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;virtual:env&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(env);</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// types/shim.d.ts</span></span>
<span class="line"><span style="color:#F97583;">declare</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">module</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;virtual:*&#39;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> any;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// types/shim.d.ts</span></span>
<span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">module</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;virtual:*&#39;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> any;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="_6-2-调试技巧" tabindex="-1">6.2 调试技巧 <a class="header-anchor" href="#_6-2-调试技巧" aria-label="Permalink to &quot;6.2 调试技巧&quot;">​</a></h3><p>另外，在开发调试插件的过程，我推荐大家在本地装上 vite-plugin-inspect 插件，并在 Vite 中使用它:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> inspect </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vite-plugin-inspect&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 返回的配置</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">plugins</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 省略其它插件</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">inspect</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">  ];</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> inspect </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vite-plugin-inspect&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 返回的配置</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">plugins</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 省略其它插件</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">inspect</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">  ];</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,100),e=[o];function t(c,r,E,i,y,d){return n(),a("div",null,e)}const F=s(p,[["render",t]]);export{g as __pageData,F as default};
