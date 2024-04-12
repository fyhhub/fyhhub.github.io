import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.3d945e71.js";const F=JSON.parse('{"title":"通关前端工程化（二）如何发布一个现代化的NPM包","description":"","frontmatter":{},"headers":[],"relativePath":"frontend-engineering/前端工程实践/通关前端工程化（二）如何发布一个现代化的NPM包.md","filePath":"frontend-engineering/前端工程实践/通关前端工程化（二）如何发布一个现代化的NPM包.md","lastUpdated":1712884586000}'),l={name:"frontend-engineering/前端工程实践/通关前端工程化（二）如何发布一个现代化的NPM包.md"},o=p(`<h1 id="通关前端工程化-二-如何发布一个现代化的npm包" tabindex="-1">通关前端工程化（二）如何发布一个现代化的NPM包 <a class="header-anchor" href="#通关前端工程化-二-如何发布一个现代化的npm包" aria-label="Permalink to &quot;通关前端工程化（二）如何发布一个现代化的NPM包&quot;">​</a></h1><p>大家好，继上次发出的ESLint解析文章, 有一段时间了，本次主要想分享一下如何发布一个现代化的npm包，让我们在开发lib库时有更好的<code>开发体验</code>和<code>规范化的流程</code>。</p><p>以Vite源码为例，你知道下面<code>scripts</code>中，每个命令的作用吗？一个npm库为何做的如此复杂？我们要了解哪些知识？</p><table><thead><tr><th></th><th></th></tr></thead><tbody><tr><td><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af8975940869443493edb9dce4e154ac~tplv-k3u1fbpfcp-watermark.image?" alt="" width="70%"></td><td><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b3dac342ceb47f9b41bb0a079a94155~tplv-k3u1fbpfcp-watermark.image?" alt="" width="50%"></td></tr></tbody></table><p>下面跟着我一起来学习吧~</p><p>历史文章：</p><ul><li><a href="https://juejin.cn/post/7131934363679195144" target="_blank" rel="noreferrer">通关前端工程化（一）ESLint全方位解析，让你不再面向搜索引擎配置</a></li></ul><h2 id="_1-包管理器的选择" tabindex="-1">1. 包管理器的选择 <a class="header-anchor" href="#_1-包管理器的选择" aria-label="Permalink to &quot;1. 包管理器的选择&quot;">​</a></h2><p>作为工程化必备工具，我们经常跟包管理器打交道，最常用的当然是<code>npm</code>了，也是前端领域使用量最多的包管理器工具。当然，还有其他非常优秀的包管理器工具，如：</p><ul><li>yarn</li><li>pnpm</li><li>cnpm</li><li>...</li></ul><p>作为一个前端er，当然紧随潮流，<code>pnpm</code>是目前非常🔥的一款包管理工具，个人觉得它最大的优势是这么几点：</p><ul><li>节省磁盘空间：pnpm使用硬链接和符号链接将依赖项安装到项目中</li><li>更好的内存管理</li><li>更快的安装速度</li><li>...</li></ul><p>这也是我推荐它的原因。当然如果公司不支持pnpm, 下位替代也可以使用<code>npm</code>或者<code>yarn</code>。</p><p>说完这些，跟我一起初始化一个项目，一步步发布npm包吧。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">modern-npm</span></span>
<span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">modern-npm</span></span>
<span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">init</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#032F62;">modern-npm</span></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">modern-npm</span></span>
<span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">init</span></span></code></pre></div><p>先来初始化一下项目</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57b94ec9588d402a9259060459930d72~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>再来初始下.git目录</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">init</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">init</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.</span></span></code></pre></div><h2 id="_2-你应该知道的package-json属性" tabindex="-1">2. 你应该知道的package.json属性 <a class="header-anchor" href="#_2-你应该知道的package-json属性" aria-label="Permalink to &quot;2. 你应该知道的package.json属性&quot;">​</a></h2><p>表面上看，<code>package.json</code>似乎要改的东西不多。</p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6fce3e4fefa04f4496bf20ba9f56a652~tplv-k3u1fbpfcp-watermark.image?" alt="" width="70%"><p>不难发现，要用的无非这么几个属性：<code>name</code>, <code>version</code>, <code>description</code>, <code>scripts</code>，<code>bin</code>, <code>module</code>, <code>main</code>。其他东西对于一个lib库来讲真的重要吗？</p><p>no, 其实<code>package.json</code>被我们忽略的东西可太多了。</p><h4 id="_1-1-module、main、browser" tabindex="-1">1.1 module、main、browser <a class="header-anchor" href="#_1-1-module、main、browser" aria-label="Permalink to &quot;1.1 module、main、browser&quot;">​</a></h4><p><code>module</code>、<code>main</code> 想必大家并不陌生, 作为一个Lib库的必备属性，绝大部分npm库都会有。</p><p>简单说明下用法：</p><ul><li><p><strong>module:</strong> 通过<code>import</code>导入npm包时（即esm模块导入），该从哪个文件导入代码。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;module&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;dist/vue.esm.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Vue </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#6A737D;">// 编译后，实际导入</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Vue </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;node_modules/vue/dist/vue.esm.js&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;module&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;dist/vue.esm.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Vue </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#6A737D;">// 编译后，实际导入</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Vue </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;node_modules/vue/dist/vue.esm.js&#39;</span></span></code></pre></div></li><li><p><strong>main:</strong> 通过<code>require</code>导入npm包时（即commonjs模块导入），该从哪个文件导入代码。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;main&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;dist/vue.cjs.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Vue </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#6A737D;">// 编译后，实际导入</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Vue </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;node_modules/vue/dist/vue.cjs.js&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;main&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;dist/vue.cjs.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Vue </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#6A737D;">// 编译后，实际导入</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Vue </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;node_modules/vue/dist/vue.cjs.js&#39;</span></span></code></pre></div></li><li><p><strong>browser:</strong> 通过配置 <code>browser</code> 为一个单一的字符串时它会替换 <code>main</code> 字段作为浏览器环境下的包入口文件。</p><ul><li><p>在浏览器环境下（<code>target: web</code>），默认取值是这样的：<code>mainFields: [&#39;browser&#39;, &#39;module&#39;, &#39;main&#39;]</code>。这是一段webpack配置，可以指定优先使用哪种入口。</p></li><li><p>还有一种用法是路径映射，例如:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;browser&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;./server.js&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./client.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;browser&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;./server.js&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./client.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>当我导入<code>server.js</code>时，实际引入的是<code>client.js</code>.</p></li><li><p>另外我们还可以通过如下方式来避免打包服务端代码：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">&quot;browser&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#6A737D;">// 打包时，浏览器环境下不会将该包的 /src/server.js 模块内容打包进去</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">&quot;./server.js&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">     }</span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#032F62;">&quot;browser&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#6A737D;">// 打包时，浏览器环境下不会将该包的 /src/server.js 模块内容打包进去</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#032F62;">&quot;./server.js&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">     }</span></span>
<span class="line"><span style="color:#24292E;"> }</span></span></code></pre></div></li></ul></li></ul><h4 id="_1-2-types-和-typings" tabindex="-1">1.2 types 和 typings <a class="header-anchor" href="#_1-2-types-和-typings" aria-label="Permalink to &quot;1.2 types 和 typings&quot;">​</a></h4><p>通过<code>types</code>和<code>typings</code>属性，可以指定我们的npm包的类型声明文件的入口, 一般一起写就可以了：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;types&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./dist/types&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;typings&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./dist/types&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;types&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./dist/types&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;typings&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./dist/types&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="_1-3-exports" tabindex="-1">1.3 exports <a class="header-anchor" href="#_1-3-exports" aria-label="Permalink to &quot;1.3 exports&quot;">​</a></h4><p>在 <code>Node.js 12.16.0</code> 及更高版本中，可以使用<code>exports</code>字段来定义模块的导出方式。</p><p><code>exports</code>字段的作用是让模块的作者可以更精确地控制模块的导出方式，从而提高代码的可维护性和可读性。下面是<code>exports</code>字段的一些用途：</p><ul><li><p><strong>路径写法</strong></p><p>可以使用<code>exports</code>字段来指定模块的默认导出, 例如：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;my-package&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;exports&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./lib/index.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 等价于</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;my-package&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;exports&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;.&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./lib/index.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;my-package&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;exports&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./lib/index.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 等价于</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;my-package&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;exports&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;.&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./lib/index.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>还可以这么写：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;my-package&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;exports&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;.&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./lib/index.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;./sub&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./lib/sub.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> sub </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;my-package/sub&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;my-package&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;exports&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;.&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./lib/index.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;./sub&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./lib/sub.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> sub </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;my-package/sub&#39;</span></span></code></pre></div></li><li><p><strong>条件导出</strong></p><p>在 <code>exports</code> 字段中同时为我们提供了条件判断：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;exports&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// ESM 引入时的入口文件</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;import&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./my-module.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// CJS 方式引入时寻找的路径</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;require&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./my-require.cjs&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 等价于</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;exports&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;import&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&quot;.&quot;</span><span style="color:#E1E4E8;">:  </span><span style="color:#9ECBFF;">&quot;./my-module.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;require&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&quot;.&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./my-require.cjs&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;exports&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// ESM 引入时的入口文件</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;import&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./my-module.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// CJS 方式引入时寻找的路径</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;require&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./my-require.cjs&quot;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 等价于</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;exports&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;import&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&quot;.&quot;</span><span style="color:#24292E;">:  </span><span style="color:#032F62;">&quot;./my-module.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;require&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&quot;.&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./my-require.cjs&quot;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>以上等价于<code>module</code>和<code>main</code>字段。</p><p>还有一种写法：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;my-package&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;exports&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;.&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&quot;import&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;xxx&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&quot;require&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;xxx&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;./sub&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&quot;import&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;xxx&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&quot;require&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;xxx&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> sub </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;my-package/sub&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;my-package&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;exports&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;.&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&quot;import&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;xxx&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&quot;require&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;xxx&quot;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;./sub&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&quot;import&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;xxx&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&quot;require&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;xxx&quot;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> sub </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;my-package/sub&#39;</span></span></code></pre></div></li><li><p><strong>嵌套条件</strong></p><p>同样 <code>exports</code> 还支持多层嵌套，<strong>支持在运行环境中嵌套不同的引入方式从而进行有条件的导出。</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;exports&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;node&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;import&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./feature-node.mjs&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;require&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./feature-node.cjs&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;default&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./feature.mjs&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;exports&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;node&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;import&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./feature-node.mjs&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;require&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./feature-node.cjs&quot;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;default&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./feature.mjs&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></li><li><p><strong>exports key</strong></p><p>当然，除了上述 Node 中支持的 <code>exports</code> key 的条件。比如上述我们提到的 <code>import</code>、<code>require</code>、<code>node</code>、<code>default</code> 等。</p><p>同样，<code>exports</code> 的 Key 也支持许多社区中的成熟关键字条件，比如：</p><ul><li><code>&quot;types&quot;</code>- typescipt 可以使用它来解析给定导出的类型定义文件</li><li><code>&quot;deno&quot;</code>- 表示 Deno 平台的关键 key。</li><li><code>&quot;browser&quot;</code>- 任何 Web 浏览器环境。</li><li><code>&quot;development&quot;</code>- 可用于定义仅开发环境入口点，例如提供额外的调试上下文。</li><li><code>&quot;production&quot;</code>- 可用于定义生产环境入口点。<em>必须始终与 互斥<code>&quot;development&quot;</code>。</em></li></ul></li></ul><p>看了上面的讲解，我们还是来找个实际的例子更好。</p><p>下面是Vue3 源码中<code>package.json</code>的<code>exports</code>配置：</p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7c4078c55d74b0d9a8ba6decec27c78~tplv-k3u1fbpfcp-watermark.image?" alt="" width="50%"><p>怎么样是不是很熟悉呢~</p><h4 id="_1-4-license" tabindex="-1">1.4 license <a class="header-anchor" href="#_1-4-license" aria-label="Permalink to &quot;1.4 license&quot;">​</a></h4><p>如果你想开源你的代码，并且你的代码带来的影响比较大，建议一定要选择好自己的开源协议。</p><ul><li><code>&quot;MIT&quot;</code>：MIT 开源协议，允许代码的商业使用、修改、复制、分发和私人使用，只需要在代码中包含版权声明和许可声明即可。</li><li><code>&quot;ISC&quot;</code>：ISC 开源协议，与 MIT 协议类似，但简化了许可证文本，因此更容易理解。</li><li><code>&quot;Apache-2.0&quot;</code>：Apache 开源协议 2.0 版本，允许商业使用、修改、复制、分发和私人使用，但需要在修改后的代码中包含原版权声明、许可声明和贡献声明，同时需要附带 Apache 2.0 许可证文本。</li><li><code>&quot;BSD-2-Clause&quot;</code>：BSD 开源协议 2 条款，允许商业使用、修改、复制和分发，但需要在代码中包含版权声明和许可声明。</li><li><code>&quot;BSD-3-Clause&quot;</code>：BSD 开源协议 3 条款，与 BSD 2 条款类似，但包含更多限制和规定，比如需要在修改后的代码中包含原版权声明、许可声明和贡献声明等。</li><li><code>&quot;GPL-2.0&quot;</code>：GPL 开源协议 2.0 版本，允许商业使用、修改和分发，但需要在修改后的代码中包含原版权声明、许可声明和贡献声明，并且必须以相同的 GPL 2.0 许可证分发代码。</li><li><code>&quot;GPL-3.0&quot;</code>：GPL 开源协议 3.0 版本，与 GPL 2.0 类似，但包含更多限制和规定，比如需要在修改后的代码中包含原版权声明、许可声明和贡献声明等，同时可以选择使用更宽松的 LGPL 许可证分发代码。</li><li><code>&quot;UNLICENSED&quot;</code>：未授权许可，表示代码未经许可，不能被复制、分发或商业使用。</li></ul><p>比较常用的就是 <code>MIT</code> 和 <code>ISC</code>协 议了。</p><h4 id="_1-5-version" tabindex="-1">1.5 version <a class="header-anchor" href="#_1-5-version" aria-label="Permalink to &quot;1.5 version&quot;">​</a></h4><p>版本号一般有三个部分，以<code>.</code>隔开，就像<code>X.Y.Z</code>，其中</p><ul><li>X(major)：主版本号，不兼容的大改动</li><li>Y(minor)：次版本号，功能性的改动</li><li>Z(patch)：修订版本号，问题修复</li></ul><p>另外，还存在几种先行版本：</p><ul><li><code>1.1.1-alpha.1</code> 1.1.1版本内测的第一个版本</li><li><code>1.1.1-beta.1</code> 1.1.1版本灰度测试的第一个版本</li><li><code>1.1.1-rc.1</code> 1.1.1版本生产候选的第一个版本</li></ul><p><code>1.1.1-alpha.1</code> &lt; <code>1.1.1-beta.1</code> &lt; <code>1.1.1-rc.1</code> &lt; <code>1.1.1</code></p><p>使用<code>npm version release</code>可以帮助我们自增版本。</p><h4 id="_1-6-bin" tabindex="-1">1.6 bin <a class="header-anchor" href="#_1-6-bin" aria-label="Permalink to &quot;1.6 bin&quot;">​</a></h4><p>这个相信写过脚手架的同学比较清楚，可以定义我们脚手架的命令行。</p><pre><code>{
    &quot;name&quot;: &quot;my-pkg&quot;,
    &quot;bin&quot;: {
        &quot;my-pkg&quot;: &quot;./bin.js&quot;
    }
}
</code></pre><p>当我们执行<code>npm link</code>后，<code>my-pkg</code>就会作为一个全局命令，注册到全局环境变量中。</p><p>当然，可以通过<code>npm unlink</code>来解除关联。</p><h4 id="_1-7-files" tabindex="-1">1.7 files <a class="header-anchor" href="#_1-7-files" aria-label="Permalink to &quot;1.7 files&quot;">​</a></h4><p>这个字段可以指定哪些文件夹或文件会被发布到npm, 比如常见的<code>dist</code>等，一些打包后的产物。</p><h4 id="_1-8-sideeffects" tabindex="-1">1.8 sideEffects <a class="header-anchor" href="#_1-8-sideeffects" aria-label="Permalink to &quot;1.8 sideEffects&quot;">​</a></h4><p>这是一个不怎么常用，但是往往使用起来会有奇效的属性。它可以指定，我们的代码中哪些文件不存在副作用，例如：</p><p>指定所有的代码都没有副作用：</p><pre><code>{
    &quot;sideEffcts&quot;: false
}
</code></pre><p>指定有副作用的代码：</p><pre><code>{
    &quot;sideEffcts&quot;: [&quot;*.css&quot;]
}
</code></pre><p>这在webpack项目中，如果处于esm模块下去导入npm代码，可以天然实现按需引入。</p><h2 id="_3-构建工具选型" tabindex="-1">3. 构建工具选型 <a class="header-anchor" href="#_3-构建工具选型" aria-label="Permalink to &quot;3. 构建工具选型&quot;">​</a></h2><p>常见的构建工具太多了， <code>webpack</code>, <code>rollup</code>, <code>vite</code>, <code>typescript</code>, <code>tsup</code>等等。可选择的太多，反而会造成代码的可维护性降低。</p><p>下面，我会根据自己的使用体验，来推荐不同场景下该使用哪些构件工具。</p><h4 id="_3-1-为什么不用webpack打包库代码" tabindex="-1">3.1 为什么不用webpack打包库代码 <a class="header-anchor" href="#_3-1-为什么不用webpack打包库代码" aria-label="Permalink to &quot;3.1 为什么不用webpack打包库代码&quot;">​</a></h4><p>为什么呢？难道webpack速度不快？配置繁琐? 其实并不是，webpack的产物相信大家也见过，存在很多自己的的运行时代码。而且对代码的<code>treeshaking</code>远没有<code>rollup</code>强悍，故不考虑在内。再者配置相比rollup等工具还是繁琐一点。</p><p><strong>以下默认都是TS代码开发，不考虑JS</strong></p><h4 id="_3-2-尽量选择更纯粹的构建工具" tabindex="-1">3.2 尽量选择更纯粹的构建工具 <a class="header-anchor" href="#_3-2-尽量选择更纯粹的构建工具" aria-label="Permalink to &quot;3.2 尽量选择更纯粹的构建工具&quot;">​</a></h4><p>我们先来看，如果你是纯粹的 <code>Node代码</code> 或 <code>前端逻辑</code>，那么其实不必用<code>rollup</code>, <code>webpack</code>等，推荐方案：</p><ul><li><p>可以直接用<code>tsc</code>编译，只需要tsconfig即可，比如工具库，因为它是纯粹的ts代码，<code>typescript</code>完全可以cover所有场景。</p></li><li><p>想提升一下开发体验，增强编译速度，推荐<code>tsup（基于esbuild）</code>，当然还有最近很火的<code>unbuild</code>。</p></li></ul><h4 id="_3-3-选择合适的构建工具" tabindex="-1">3.3 选择合适的构建工具 <a class="header-anchor" href="#_3-3-选择合适的构建工具" aria-label="Permalink to &quot;3.3 选择合适的构建工具&quot;">​</a></h4><p>那么再来看，如果代码中存在<code>vue</code>， <code>css</code>, <code>tsx</code>等这些代码，且浏览器支持ES6+，推荐使用<code>vite</code>编译，毕竟目前vite在库模式构建方面，还是完美支持的。但是有个点要注意： <strong>Vite不支持ES6+语法转ES5的编译，并且没有降级插件（@vitejs/plugin-legacy不对库模式起效）这是由于esbuild限制。</strong> 所以这又要看你的需求是否需要，再做考虑。</p><p>如果代码中存在<code>vue</code>， <code>css</code>, <code>tsx</code>等这些代码，且想支持到es5，那么我还是推荐老老实实用<code>rollup</code> + <code>babel</code>来编译你的库代码。当然，如果想提升开发体验，可以使用<code>swc</code>增强编译js的速度。</p><h4 id="_3-4-通用npm构建工具如何选型" tabindex="-1">3.4 通用npm构建工具如何选型 <a class="header-anchor" href="#_3-4-通用npm构建工具如何选型" aria-label="Permalink to &quot;3.4 通用npm构建工具如何选型&quot;">​</a></h4><p>目前有些二次封装的工具可以支持打包各种场景下的代码，例如<a href="https://www.npmjs.com/package/father" target="_blank" rel="noreferrer">father</a>， 可以通过简单配置就能打包<code>react</code>, <code>node</code>, <code>vue</code>等代码，最后生成esm, cjs产物。使用起来挺方便。</p><p>不难发现，<code>father</code>是基于 <code>webpack + babel/swc</code>来进行编译的。针对不同场景，可以随意切换，但是如果自己要开发一个通用构建工具，其实rollup + babel/swc 完全够用了。</p><h2 id="_4-eslint规范代码" tabindex="-1">4. ESLint规范代码 <a class="header-anchor" href="#_4-eslint规范代码" aria-label="Permalink to &quot;4. ESLint规范代码&quot;">​</a></h2><p>如果你还在为eslint的头疼，其实大可不必。因为<code>eslint</code>已经支持命令行自动配置了，你只需要执行如下命令：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">eslint</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--init</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">eslint</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--init</span></span></code></pre></div><p>然后就可以跟着引导一步步来：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1970f3845aa24a59a57d0940df1f448c~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>最后会帮你自动安装和生成配置。</p><p>那么如何搭配<code>prettier</code>的格式化功能来使用呢？ 你只需按我这样配置即可：</p><p>先安装</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">prettier</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">eslint-config-prettier</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">eslint-plugin-prettier</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">prettier</span><span style="color:#24292E;"> </span><span style="color:#032F62;">eslint-config-prettier</span><span style="color:#24292E;"> </span><span style="color:#032F62;">eslint-plugin-prettier</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span></span></code></pre></div><p>配置<code>eslintrc.js</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 添加extends</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">extends</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&#39;plugin:prettier/recommended&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 添加extends</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">extends</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&#39;plugin:prettier/recommended&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>创建<code>.prettierrc</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
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
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_5-规范提交记录" tabindex="-1">5. 规范提交记录 <a class="header-anchor" href="#_5-规范提交记录" aria-label="Permalink to &quot;5. 规范提交记录&quot;">​</a></h2><p>规范<code>commit message</code>可以借助<code>git hook</code>来实现，现有的工具中, 使用<code>husky</code>是最简单的，跟着步骤来操作即可：</p><h4 id="_5-1-初始化husky" tabindex="-1">5.1 初始化husky <a class="header-anchor" href="#_5-1-初始化husky" aria-label="Permalink to &quot;5.1 初始化husky&quot;">​</a></h4><pre><code>// package.json
{
  &quot;scripts&quot;: {
    &quot;prepare&quot;: &quot;husky install&quot;
  }
}
</code></pre><pre><code>pnpm i husky -D
pnpm prepare
</code></pre><p>以上安装和初始化了husky</p><h4 id="_5-2-注册-pre-commit-钩子" tabindex="-1">5.2 注册 pre-commit 钩子 <a class="header-anchor" href="#_5-2-注册-pre-commit-钩子" aria-label="Permalink to &quot;5.2 注册 pre-commit 钩子&quot;">​</a></h4><p>注册这个钩子是为了，在提交你的代码前，对代码进行检查和格式化。避免手动更改浪费时间。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">npx</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">husky</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.husky/pre-commit</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;npx lint-staged&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">npx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">husky</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.husky/pre-commit</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;npx lint-staged&quot;</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// package.json</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;lint-staged&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;*.{js,jsx,ts,tsx}&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;prettier --write ./src&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;eslint  --fix&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      ],</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;*.md&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;prettier --write&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// package.json</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;lint-staged&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;*.{js,jsx,ts,tsx}&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;prettier --write ./src&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;eslint  --fix&quot;</span></span>
<span class="line"><span style="color:#24292E;">      ],</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;*.md&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;prettier --write&quot;</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="_5-3-注册-commit-msg-钩子" tabindex="-1">5.3 注册 commit-msg 钩子 <a class="header-anchor" href="#_5-3-注册-commit-msg-钩子" aria-label="Permalink to &quot;5.3 注册 commit-msg 钩子&quot;">​</a></h4><p>这一步是为了检查commit message是否符合规范，常见的commit message规范如下：</p><pre><code># 主要type
feat:     增加新功能
fix:      修复bug

# 特殊type
docs:     只改动了文档相关的内容
style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
build:    构造工具的或者外部依赖的改动，例如webpack，npm
refactor: 代码重构时使用
revert:   执行git revert打印的message

# 暂不使用type
test:     添加测试或者修改现有测试
perf:     提高性能的改动
ci:       与CI（持续集成服务）有关的改动
chore:    不修改src或者test的其余修改，例如构建过程或辅助工具的变动
</code></pre><p>然后我们来安装初始化一下：</p><pre><code>npx husky add .husky/commit-msg &#39;npx --no-install commitlint --edit &quot;$1&quot;&#39;
</code></pre><pre><code>pnpm i commitlint @commitlint/config-conventional -D
</code></pre><p>这里要创建一下<code>commitlint.config.js</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// commitlint.config.js</span></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  extends: [</span><span style="color:#9ECBFF;">&#39;@commitlint/config-conventional&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// commitlint.config.js</span></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  extends: [</span><span style="color:#032F62;">&#39;@commitlint/config-conventional&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h4 id="_5-4-更优雅的提交方式" tabindex="-1">5.4 更优雅的提交方式 <a class="header-anchor" href="#_5-4-更优雅的提交方式" aria-label="Permalink to &quot;5.4 更优雅的提交方式&quot;">​</a></h4><p>借助一些工具，我们能实现这样的效果：</p><p><img src="https://user-images.githubusercontent.com/40693636/188255006-b9df9837-4678-4085-9395-e2905d7ec7de.gif" alt="image.png"> 我们先来安装一下：</p><pre><code>npm install -D cz-git
npm i -g commitizen
</code></pre><p>修改<code>package.json</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;commit&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;git-cz&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;config&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;commitizen&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;path&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;node_modules/cz-git&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;scripts&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;commit&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;git-cz&quot;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;config&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;commitizen&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;path&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;node_modules/cz-git&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>修改<code>commitlint.config.js</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
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
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h2 id="_6-自动维护changelog" tabindex="-1">6. 自动维护changelog <a class="header-anchor" href="#_6-自动维护changelog" aria-label="Permalink to &quot;6. 自动维护changelog&quot;">​</a></h2><p>维护一个changelog想必是一个头疼的事情，少一点还好，当参与开源的人多起来，手动书写的成本就比较高了。</p><p>我们同样可以借助工具帮我们生成，只需一行命令：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">&quot;scripts&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">&quot;changelog&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0 &amp;&amp; git add CHANGELOG.md&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">},</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">&quot;scripts&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">&quot;changelog&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0 &amp;&amp; git add CHANGELOG.md&quot;</span></span>
<span class="line"><span style="color:#24292E;">},</span></span></code></pre></div><pre><code>pnpm changelog
</code></pre><h2 id="_7-单元测试" tabindex="-1">7. 单元测试 <a class="header-anchor" href="#_7-单元测试" aria-label="Permalink to &quot;7. 单元测试&quot;">​</a></h2><p>Vitest 是目前比较火的单元测试框架，基于Vite的速度极大提高了单元测试的开发效率。我们将其作为项目的单元测试方案：</p><pre><code>pnpm i vitest -D
</code></pre><p>创建 <code>vitest.config.ts</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { defineConfig } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vitest/config&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineConfig</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  test: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    environment: </span><span style="color:#9ECBFF;">&#39;node&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    passWithNoTests: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    exclude: [</span><span style="color:#9ECBFF;">&#39;**/node_modules/**&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;**/dist/**&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    threads: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { defineConfig } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vitest/config&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineConfig</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  test: {</span></span>
<span class="line"><span style="color:#24292E;">    environment: </span><span style="color:#032F62;">&#39;node&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    passWithNoTests: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    exclude: [</span><span style="color:#032F62;">&#39;**/node_modules/**&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;**/dist/**&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    threads: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>新建测试文件 <code>src/__test__/index.test.ts</code>。然后写一个简单的测试例子：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { expect, test } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vitest&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;add&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toBe</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;map&#39;</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)).</span><span style="color:#B392F0;">toMatchSnapshot</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;&quot;ap&quot;&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;map&#39;</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)).</span><span style="color:#B392F0;">toMatchInlineSnapshot</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;&quot;ap&quot;&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { expect, test } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vitest&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;add&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toBe</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;map&#39;</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)).</span><span style="color:#6F42C1;">toMatchSnapshot</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;&quot;ap&quot;&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;map&#39;</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)).</span><span style="color:#6F42C1;">toMatchInlineSnapshot</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;&quot;ap&quot;&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>添加测试脚本：</p><pre><code>{
  &quot;scripts&quot;: {
      &quot;test&quot;: &quot;vitest run&quot;
  }
}
</code></pre><p>另外你也可以用ui界面来查看测试结果：</p><pre><code>pnpm i @vitest/ui -D
</code></pre><pre><code>{
  &quot;scripts&quot;: {
      &quot;test:ui&quot;: &quot;vitest --ui&quot;
  }
}
</code></pre><img src="https://user-images.githubusercontent.com/11247099/171992267-5cae2fa0-b927-400a-8eb1-da776974cb61.png" alt=""><p>详情见<a href="https://vitest.dev/guide/ui.html" target="_blank" rel="noreferrer">Vitest 文档</a></p><h2 id="_8-自动发布-npm" tabindex="-1">8. 自动发布 npm <a class="header-anchor" href="#_8-自动发布-npm" aria-label="Permalink to &quot;8. 自动发布 npm&quot;">​</a></h2><p>我们知道，正常发布个npm包，需要我们手动执行<code>npm login</code>, <code>npm publish</code>等命令，有时在发布前还要执行测试命令，确保整体测试通过后再发布npm。那么有没有办法自动执行测试命令，然后发布呢？</p><p>答案是有的，<a href="https://www.npmjs.com/package/release-it" target="_blank" rel="noreferrer">release-it</a>可以帮你解决。</p><img src="https://raw.githubusercontent.com/release-it/release-it/HEAD/docs/assets/release-it.svg?raw=true" alt="" width="100%"><p>一键帮你执行如下操作：</p><ul><li>lint</li><li>test</li><li>git commit</li><li>git tag</li><li>git push</li><li>..</li></ul><p>我们先来安装一下：</p><pre><code>pnpm i release-it -D
</code></pre><p>执行命令，根据步骤操作即可</p><pre><code>npx release-it
</code></pre><p>更多用法，大家可以参考文档：<a href="https://www.npmjs.com/package/release-it" target="_blank" rel="noreferrer">release-it</a></p><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h2><ul><li><a href="https://juejin.cn/post/7126394898445500423" target="_blank" rel="noreferrer">从 package.json 来聊聊如何管理一款优秀的 Npm 包</a></li></ul>`,150),e=[o];function t(c,r,E,i,y,u){return n(),a("div",null,e)}const m=s(l,[["render",t]]);export{F as __pageData,m as default};
