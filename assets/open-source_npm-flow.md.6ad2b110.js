import{_ as s,o as a,c as n,Q as e}from"./chunks/framework.3d945e71.js";const h=JSON.parse('{"title":"@viwo/npm-flow","description":"","frontmatter":{},"headers":[],"relativePath":"open-source/npm-flow.md","filePath":"open-source/npm-flow.md","lastUpdated":1713452287000}'),l={name:"open-source/npm-flow.md"},o=e(`<h1 id="viwo-npm-flow" tabindex="-1">@viwo/npm-flow <a class="header-anchor" href="#viwo-npm-flow" aria-label="Permalink to &quot;@viwo/npm-flow&quot;">​</a></h1><p>基于<code>father</code>二次开发，支持了<code>vue2和vue3</code>的 <code>bundless</code> 编译</p><h1 id="config" tabindex="-1">Config <a class="header-anchor" href="#config" aria-label="Permalink to &quot;Config&quot;">​</a></h1><p>支持以下配置项。</p><h2 id="公共配置" tabindex="-1">公共配置 <a class="header-anchor" href="#公共配置" aria-label="Permalink to &quot;公共配置&quot;">​</a></h2><h3 id="alias" tabindex="-1">alias <a class="header-anchor" href="#alias" aria-label="Permalink to &quot;alias&quot;">​</a></h3><ul><li>类型：<code>Record&lt;string, string&gt;</code></li><li>默认值：<code>undefined </code></li></ul><p>指定源码编译/转换过程中需要处理的别名，其中 Bundles 模式会自动将 <code>.js</code>、<code>.d.ts</code> 产物中本地路径的别名转换为相对路径。</p><h3 id="define" tabindex="-1">define <a class="header-anchor" href="#define" aria-label="Permalink to &quot;define&quot;">​</a></h3><ul><li>类型：<code>Record&lt;string, string&gt;</code></li><li>默认值：<code>undefined</code></li></ul><p>指定源码编译/转换过程中需要替换的变量，用法与 Webpack <a href="https://webpack.js.org/plugins/define-plugin/#usage" target="_blank" rel="noreferrer">DefinePlugin</a> 一致。</p><h3 id="extends" tabindex="-1">extends <a class="header-anchor" href="#extends" aria-label="Permalink to &quot;extends&quot;">​</a></h3><ul><li>类型：<code>string</code></li><li>默认值：<code>undefined</code></li></ul><p>指定继承的父配置文件路径。</p><h3 id="extrababelplugins" tabindex="-1">extraBabelPlugins <a class="header-anchor" href="#extrababelplugins" aria-label="Permalink to &quot;extraBabelPlugins&quot;">​</a></h3><ul><li>类型：<code>string[]</code></li><li>默认值：<code>undefined</code></li></ul><p>指定要额外挂载的 babel 插件。</p><blockquote><p>注：在 Bundless 模式下、且 <code>transformer</code> 为 <code>esbuild</code> 或 <code>swc</code> 时，该配置不生效。</p></blockquote><h3 id="extrababelpresets" tabindex="-1">extraBabelPresets <a class="header-anchor" href="#extrababelpresets" aria-label="Permalink to &quot;extraBabelPresets&quot;">​</a></h3><ul><li>类型：<code>string[]</code></li><li>默认值：<code>undefined</code></li></ul><p>指定要额外挂载的 babel 插件集。</p><blockquote><p>注：在 Bundless 模式下、且 <code>transformer</code> 为 <code>esbuild</code> 或 <code>swc</code> 时，该配置不生效。</p></blockquote><h3 id="platform" tabindex="-1">platform <a class="header-anchor" href="#platform" aria-label="Permalink to &quot;platform&quot;">​</a></h3><ul><li>类型：<code>browser</code> | <code>node</code></li><li>默认值：<code>&lt;auto&gt;</code></li></ul><p>指定构建产物的目标平台，其中 <code>esm</code> 与 <code>umd</code> 产物的默认 <code>platform</code> 为 <code>browser</code>，<code>cjs</code> 产物的默认 <code>platform</code> 为 <code>node</code>；指定为 <code>browser</code> 时产物默认兼容至 IE11，指定为 <code>node</code> 时产物默认兼容至 Node.js v14。</p><blockquote><p>注：Bundless 模式下，如果手动将 <code>transformer</code> 指定为 <code>esbuild</code>，那么 <code>browser</code> 产物默认兼容性为 Chrome51 而不是 IE11。</p></blockquote><h3 id="sourcemap" tabindex="-1">sourcemap <a class="header-anchor" href="#sourcemap" aria-label="Permalink to &quot;sourcemap&quot;">​</a></h3><ul><li>类型：<code>boolean</code></li><li>默认值：<code>false</code></li></ul><p>为 JavaScript 构建产物生成 <code>sourcemap</code> 文件。</p><blockquote><p>注：Bundless 模式下 map 对象的 file 字段为空</p></blockquote><h3 id="targets" tabindex="-1">targets <a class="header-anchor" href="#targets" aria-label="Permalink to &quot;targets&quot;">​</a></h3><ul><li>类型: <code>Record&lt;string, number&gt;</code></li><li>默认值：<code>&lt;auto&gt;</code></li></ul><p>指定源码编译产物的兼容性，不同目标平台和编译模式下的默认值如下：</p><table><thead><tr><th><code>platform</code></th><th><code>transformer</code></th><th>default value</th></tr></thead><tbody><tr><td><code>browser</code></td><td><code>babel</code></td><td><code>{ ie: 11 }</code></td></tr><tr><td><code>browser</code></td><td><code>esbuild</code></td><td><code>{ chrome: 51 }</code></td></tr><tr><td><code>browser</code></td><td><code>swc</code></td><td><code>{ ie: 11 }</code></td></tr><tr><td><code>node</code></td><td><code>babel</code></td><td><code>{ node: 14 }</code></td></tr><tr><td><code>node</code></td><td><code>esbuild</code></td><td><code>{ node: 14 }</code></td></tr><tr><td><code>node</code></td><td><code>swc</code></td><td><code>{ node: 14 }</code></td></tr></tbody></table><h2 id="构建配置" tabindex="-1">构建配置 <a class="header-anchor" href="#构建配置" aria-label="Permalink to &quot;构建配置&quot;">​</a></h2><p>father 以构建产物类型划分构建配置，其中 <code>esm</code>、<code>cjs</code> 产物为 Bundless 构建模式，<code>umd</code> 产物为 Bundle 构建模式，另外依赖预打包 <code>prebundle</code> 产物也为 Bundle 构建模式。</p><h3 id="esm-cjs" tabindex="-1">esm/cjs <a class="header-anchor" href="#esm-cjs" aria-label="Permalink to &quot;esm/cjs&quot;">​</a></h3><ul><li>类型：<code>object</code></li><li>默认值：<code>undefined</code></li></ul><p>配置将源码转换为 ESModule/CommonJS 产物，支持以下子配置项，也支持覆盖外部的公共配置项。</p><h4 id="input" tabindex="-1">input <a class="header-anchor" href="#input" aria-label="Permalink to &quot;input&quot;">​</a></h4><ul><li>类型：<code>string</code></li><li>默认值：<code>src</code></li></ul><p>指定要转换的源码目录。</p><h4 id="output" tabindex="-1">output <a class="header-anchor" href="#output" aria-label="Permalink to &quot;output&quot;">​</a></h4><ul><li>类型：<code>string</code></li><li>默认值：<code>&lt;auto&gt;</code></li></ul><p>指定产物的输出目录，<code>esm</code> 产物的默认输出目录为 <code>dist/esm</code>，<code>cjs</code> 产物的默认输出目录为 <code>dist/cjs</code>。</p><h4 id="transformer" tabindex="-1">transformer <a class="header-anchor" href="#transformer" aria-label="Permalink to &quot;transformer&quot;">​</a></h4><ul><li>类型：<code>babel</code> | <code>esbuild</code> | <code>swc</code></li><li>默认值：<code>&lt;auto&gt;</code></li></ul><p>指定源码的编译工具，当 <code>platform</code> 为 <code>node</code> 时，默认值为 <code>esbuild</code>，当 <code>platform</code> 为 <code>browser</code> 时，默认值为 <code>babel</code>。</p><h4 id="overrides" tabindex="-1">overrides <a class="header-anchor" href="#overrides" aria-label="Permalink to &quot;overrides&quot;">​</a></h4><ul><li>类型：<code>object</code></li><li>默认值：<code>undefined</code></li></ul><p>为指定源码子目录覆盖构建配置，例如：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  esm: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    overrides: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 将 server 文件夹下的源码以 node 为目标平台进行编译</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;src/server&#39;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        platform: </span><span style="color:#9ECBFF;">&#39;node&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  esm: {</span></span>
<span class="line"><span style="color:#24292E;">    overrides: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 将 server 文件夹下的源码以 node 为目标平台进行编译</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;src/server&#39;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        platform: </span><span style="color:#032F62;">&#39;node&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h4 id="ignores" tabindex="-1">ignores <a class="header-anchor" href="#ignores" aria-label="Permalink to &quot;ignores&quot;">​</a></h4><ul><li>类型：<code>string[]</code></li><li>默认值：<code>undefined</code></li></ul><p>配置转换过程中需要忽略的文件，支持 glob 表达式，被匹配的文件将不会输出到产物目录。另外，father 会默认忽略源码目录中所有的 Markdown 文件和测试文件。</p><h3 id="umd" tabindex="-1">umd <a class="header-anchor" href="#umd" aria-label="Permalink to &quot;umd&quot;">​</a></h3><ul><li>类型：<code>object</code></li><li>默认值：<code>undefined</code></li></ul><p>配置将源码打包为 UMD 产物，支持以下子配置项，也支持覆盖外部的公共配置项。</p><h4 id="name" tabindex="-1">name <a class="header-anchor" href="#name" aria-label="Permalink to &quot;name&quot;">​</a></h4><ul><li>类型：<code>string</code></li><li>默认值：无</li></ul><p>指定 umd 包的导出 library 名称，例如：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  umd: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;fatherDemo&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  umd: {</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;fatherDemo&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><p>默认是全量导出 member exports，需要拆解 <code>default</code> 的话，可以通过 <code>chainWebpack</code> 配置修改 <code>libraryExport</code>，例如：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  umd: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&#39;fatherDemo&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">chainWebpack</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">memo</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      memo.output.</span><span style="color:#B392F0;">libraryExport</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;default&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> memo;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  umd: {</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&#39;fatherDemo&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">chainWebpack</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">memo</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      memo.output.</span><span style="color:#6F42C1;">libraryExport</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;default&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> memo;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h4 id="extractcss" tabindex="-1">extractCSS <a class="header-anchor" href="#extractcss" aria-label="Permalink to &quot;extractCSS&quot;">​</a></h4><ul><li>类型：<code>boolean</code></li><li>默认值：<code>true</code></li></ul><p>指定是否提取 CSS 为单独的文件，可通过设置 <code>extractCSS: false</code> 关闭。</p><h4 id="entry" tabindex="-1">entry <a class="header-anchor" href="#entry" aria-label="Permalink to &quot;entry&quot;">​</a></h4><ul><li>类型：<code>string</code> | <code>Record&lt;string, Config&gt;</code></li><li>默认值：<code>src/index</code></li></ul><p>指定要打包的源码入口文件，支持配置多入口、并为每个入口文件单独覆盖构建配置，例如：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  umd: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    entry: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;src/browser&#39;</span><span style="color:#E1E4E8;">: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;src/server&#39;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        platform: </span><span style="color:#9ECBFF;">&#39;node&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  umd: {</span></span>
<span class="line"><span style="color:#24292E;">    entry: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;src/browser&#39;</span><span style="color:#24292E;">: {},</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;src/server&#39;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        platform: </span><span style="color:#032F62;">&#39;node&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h4 id="output-1" tabindex="-1">output <a class="header-anchor" href="#output-1" aria-label="Permalink to &quot;output&quot;">​</a></h4><ul><li>类型：<code>string</code> | <code>{ path?: string; filename?: string }</code></li><li>默认值：<code>dist/umd</code></li></ul><p>指定产物的输出目录及输出文件名，输出目录的默认值为 <code>dist/umd</code>，输出文件名在单 <code>entry</code> 时默认以 NPM 包名命名、多 <code>entry</code> 时默认与源码文件同名。</p><h4 id="externals" tabindex="-1">externals <a class="header-anchor" href="#externals" aria-label="Permalink to &quot;externals&quot;">​</a></h4><ul><li>类型：<code>Record&lt;string, string&gt;</code></li><li>默认值：<code>undefined</code></li></ul><p>配置源码打包过程中需要处理的外部依赖。</p><h4 id="chainwebpack" tabindex="-1">chainWebpack <a class="header-anchor" href="#chainwebpack" aria-label="Permalink to &quot;chainWebpack&quot;">​</a></h4><ul><li>类型：<code>function</code></li><li>默认值：<code>undefined</code></li></ul><p>使用 <code>webpack-chain</code> 自定义源码打包的 Webpack 配置。</p><h4 id="postcssoptions" tabindex="-1">postcssOptions <a class="header-anchor" href="#postcssoptions" aria-label="Permalink to &quot;postcssOptions&quot;">​</a></h4><ul><li>类型：<code>object</code></li><li>默认值：<code>undefined</code></li></ul><p>配置源码打包过程中额外的 <a href="https://webpack.js.org/loaders/postcss-loader/#postcssoptions" target="_blank" rel="noreferrer">PostCSS 配置项</a>。</p><h4 id="autoprefixer" tabindex="-1">autoprefixer <a class="header-anchor" href="#autoprefixer" aria-label="Permalink to &quot;autoprefixer&quot;">​</a></h4><p>配置源码打包过程中额外的 <a href="https://github.com/postcss/autoprefixer#options" target="_blank" rel="noreferrer">Autoprefixer 配置项</a>。</p><h4 id="theme" tabindex="-1">theme <a class="header-anchor" href="#theme" aria-label="Permalink to &quot;theme&quot;">​</a></h4><p>配置 Less 源码打包过程中要注入的 Less 变量。</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  theme: { </span><span style="color:#9ECBFF;">&#39;primary-color&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;#1890ff&#39;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  theme: { </span><span style="color:#032F62;">&#39;primary-color&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;#1890ff&#39;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h3 id="prebundle" tabindex="-1">prebundle <a class="header-anchor" href="#prebundle" aria-label="Permalink to &quot;prebundle&quot;">​</a></h3><p>配置项目需要预打包的三方依赖，仅用于 Node.js 工具或框架项目降低安装体积、提升项目稳定性，例如 Umi 这类前端开发框架。</p><p>预打包支持以下配置项。</p><h4 id="output-2" tabindex="-1">output <a class="header-anchor" href="#output-2" aria-label="Permalink to &quot;output&quot;">​</a></h4><ul><li>类型：<code>string</code></li><li>默认值：<code>compiled</code></li></ul><p>指定预打包产物的输出目录，默认输出到<code>compiled</code>目录。</p><h4 id="deps" tabindex="-1">deps <a class="header-anchor" href="#deps" aria-label="Permalink to &quot;deps&quot;">​</a></h4><ul><li>类型：<code>string[]</code> | <code>Record&lt;string, { minify?: boolean; dts?: boolean }&gt;</code></li><li>默认值：<code>undefined</code></li></ul><p>配置需要预打包的三方依赖，默认开启代码压缩、打包类型声明文件（如果是 TypeScript 项目且包含类型声明），且将每个依赖的打包产物输出到 <code>[output]/[package_name]</code> 目录下。</p><p>也可以单独对每个依赖进行配置，例如：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  prebundle: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 只配置要预打包的依赖</span></span>
<span class="line"><span style="color:#E1E4E8;">    deps: [</span><span style="color:#9ECBFF;">&#39;rimraf&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 配置预打包的依赖并指定详细配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    deps: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      rimraf: { minify: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  prebundle: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 只配置要预打包的依赖</span></span>
<span class="line"><span style="color:#24292E;">    deps: [</span><span style="color:#032F62;">&#39;rimraf&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 配置预打包的依赖并指定详细配置</span></span>
<span class="line"><span style="color:#24292E;">    deps: {</span></span>
<span class="line"><span style="color:#24292E;">      rimraf: { minify: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h4 id="extradtsdeps" tabindex="-1">extraDtsDeps <a class="header-anchor" href="#extradtsdeps" aria-label="Permalink to &quot;extraDtsDeps&quot;">​</a></h4><ul><li>类型：<code>string[]</code></li><li>默认值：<code>undefined</code></li></ul><p>配置仅需要打包 <code>d.ts</code> 类型声明文件的依赖。</p><h4 id="extraexternals" tabindex="-1">extraExternals <a class="header-anchor" href="#extraexternals" aria-label="Permalink to &quot;extraExternals&quot;">​</a></h4><ul><li>类型：<code>Record&lt;string, string&gt;</code></li><li>默认值：<code>undefined</code></li></ul><p>配置预打包过程中要额外处理的外部依赖。father 会默认对以下两类依赖做 external：</p><ol><li>预打包的所有目标依赖，并自动 external 到输出目录</li><li>当前项目 <code>package.json</code> 中声明的 <code>dependencies</code></li></ol><h2 id="其他配置" tabindex="-1">其他配置 <a class="header-anchor" href="#其他配置" aria-label="Permalink to &quot;其他配置&quot;">​</a></h2><h3 id="plugins" tabindex="-1">plugins <a class="header-anchor" href="#plugins" aria-label="Permalink to &quot;plugins&quot;">​</a></h3><ul><li>类型：<code>string[]</code></li><li>默认值：<code>undefined</code></li></ul><p>配置额外的 father 插件，可以是插件的路径或者 NPM 包名，如果是相对路径则会从项目根目录开始找。</p><p>插件编写方式与 Umi 插件类似，可以在插件函数体中接收 <code>api</code> 参数来控制 father 的行为，例如写一个插件修改默认配置：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// plugin.ts</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> { IApi } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;father&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">api</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IApi</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  api.</span><span style="color:#B392F0;">modifyConfig</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">memo</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 修改 father 配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> memo;</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// .fatherrc.ts</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { defineConfig } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;father&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineConfig</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span><span style="color:#9ECBFF;">&#39;./plugin.ts&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// plugin.ts</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">type</span><span style="color:#24292E;"> { IApi } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;father&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">api</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IApi</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  api.</span><span style="color:#6F42C1;">modifyConfig</span><span style="color:#24292E;">((</span><span style="color:#E36209;">memo</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 修改 father 配置</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> memo;</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// .fatherrc.ts</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { defineConfig } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;father&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineConfig</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span><span style="color:#032F62;">&#39;./plugin.ts&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><h3 id="presets" tabindex="-1">presets <a class="header-anchor" href="#presets" aria-label="Permalink to &quot;presets&quot;">​</a></h3><ul><li>类型：<code>string[]</code></li><li>默认值：<code>undefined</code></li></ul><p>配置额外的 father 插件集，可以是插件集的路径或者 NPM 包名，如果是相对路径则会从项目根目录开始找。</p><p>插件集的编写方式与 Umi 插件集类似，可以在插件集函数中返回插件配置，例如：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// preset.ts</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> { IApi } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;father&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">api</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IApi</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    presets: [require.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./other-preset&#39;</span><span style="color:#E1E4E8;">)],</span></span>
<span class="line"><span style="color:#E1E4E8;">    plugins: [require.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./plugin-a&#39;</span><span style="color:#E1E4E8;">), require.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./plugin-b&#39;</span><span style="color:#E1E4E8;">)],</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// preset.ts</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">type</span><span style="color:#24292E;"> { IApi } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;father&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">api</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IApi</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    presets: [require.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./other-preset&#39;</span><span style="color:#24292E;">)],</span></span>
<span class="line"><span style="color:#24292E;">    plugins: [require.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./plugin-a&#39;</span><span style="color:#24292E;">), require.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./plugin-b&#39;</span><span style="color:#24292E;">)],</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div>`,117),p=[o];function c(t,r,i,d,E,y){return a(),n("div",null,p)}const b=s(l,[["render",c]]);export{h as __pageData,b as default};
