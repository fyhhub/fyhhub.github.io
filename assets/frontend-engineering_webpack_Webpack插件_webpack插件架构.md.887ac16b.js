import{_ as e,o as s,c as a,Q as o}from"./chunks/framework.353e5930.js";const E=JSON.parse('{"title":"webpack插件架构","description":"","frontmatter":{},"headers":[],"relativePath":"frontend-engineering/webpack/Webpack插件/webpack插件架构.md","filePath":"frontend-engineering/webpack/Webpack插件/webpack插件架构.md"}'),l={name:"frontend-engineering/webpack/Webpack插件/webpack插件架构.md"},n=o(`<h1 id="webpack插件架构" tabindex="-1">webpack插件架构 <a class="header-anchor" href="#webpack插件架构" aria-label="Permalink to &quot;webpack插件架构&quot;">​</a></h1><p>Webpack5 暴露了多达 200+ 个 Hook，基本上覆盖了整个构建流程的所有环节 —— 这也就意味着通过编写插件，我们几乎可以改写 Webpack 的所有执行逻辑</p><h2 id="compiler" tabindex="-1">Compiler <a class="header-anchor" href="#compiler" aria-label="Permalink to &quot;Compiler&quot;">​</a></h2><p>全局构建管理器，Webpack 启动后会首先创建 compiler 对象，负责管理配置信息、Loader、Plugin 等。从启动构建到结束，compiler 大致上会触发如下钩子：</p><p><img src="https://raw.githubusercontent.com/fyhhub/imgs/main/imgs20220905163959.png" alt="20220905163959"></p><ul><li><code>createChildCompiler</code>：创建子 compiler 对象，子对象将继承原始 Compiler 对象的所有配置数据；</li><li><code>createCompilation</code>：创建 compilation 对象，可以借此实现并行编译；</li><li><code>close</code>：结束编译；</li><li><code>getCache</code>：获取缓存接口，可借此复用 Webpack5 的缓存功能；</li><li><code>getInfrastructureLogger</code>：获取日志对象； 等等。</li></ul><h2 id="compilation" tabindex="-1">Compilation <a class="header-anchor" href="#compilation" aria-label="Permalink to &quot;Compilation&quot;">​</a></h2><p>单次构建过程的管理器，负责遍历模块，执行编译操作； 当 watch = true 时，每次文件变更触发重新编译，都会创建一个新的 compilation 对象； compilation 生命周期中主要触发如下钩子：</p><p><img src="https://raw.githubusercontent.com/fyhhub/imgs/main/imgs20220905164116.png" alt="20220905164116"></p><ul><li><p><code>addModule</code>：用于添加模块，例如 Module 遍历出依赖之后，就会调用该接口将新模块添加到构建需求中；</p></li><li><p><code>addEntry</code>：添加新的入口模块，效果与直接定义 entry 配置相似；</p></li><li><p><code>emitAsset</code>：用于添加产物文件，效果与 Loader Context 的 emitAsset 相同；</p></li><li><p><code>getDependencyReference</code>：从给定模块返回对依赖项的引用，常用于计算模块引用关系；</p></li><li><p><code>assets</code>: 产物列表, 调用 asset.source() 方法读取产物内容</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">assetSource</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> asset.</span><span style="color:#B392F0;">source</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">compilation.assets[filename] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RawSource</span><span style="color:#E1E4E8;">(xxx)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">assetSource</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> asset.</span><span style="color:#6F42C1;">source</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">compilation.assets[filename] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RawSource</span><span style="color:#24292E;">(xxx)</span></span></code></pre></div></li><li><p><code>warnings</code>， <code>errors</code>：收集日志</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">compilation.warnings.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;xxx&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">compilation.errors.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;xxx&#39;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">compilation.warnings.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;xxx&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">compilation.errors.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;xxx&#39;</span><span style="color:#24292E;">)</span></span></code></pre></div></li></ul><h2 id="module" tabindex="-1">Module <a class="header-anchor" href="#module" aria-label="Permalink to &quot;Module&quot;">​</a></h2><p>资源模块，有诸如 <code>NormalModule/RawModule/ContextModule</code> 等子类型，其中 NormalModule 使用频率较高，提供如下接口：</p><ul><li><code>identifier</code>：读取模块的唯一标识符；</li><li><code>getCurrentLoader</code>：获取当前正在执行的 Loader 对象；</li><li><code>originalSource</code>：读取模块原始内容；</li><li><code>serialize/deserialize</code>：模块序列化与反序列化函数，用于实现持久化缓存，一般不需要调用；</li><li><code>issuer</code>：模块的引用者；</li><li><code>isEntryModule</code>：用于判断该模块是否为入口文件； 等等。</li></ul><h2 id="chunk" tabindex="-1">Chunk <a class="header-anchor" href="#chunk" aria-label="Permalink to &quot;Chunk&quot;">​</a></h2><p>模块封装容器，提供如下接口：</p><ul><li><code>addModule</code>：添加模块，之后该模块会与 Chunk 中其它模块一起打包，生成最终产物；</li><li><code>removeModule</code>：删除模块；</li><li><code>containsModule</code>：判断是否包含某个特定模块；</li><li><code>size</code>：推断最终构建出的产物大小；</li><li><code>hasRuntime</code>：判断 Chunk 中是否包含运行时代码；</li><li><code>updateHash</code>：计算 Hash 值。</li></ul>`,16),p=[n];function c(t,i,r,d,u,h){return s(),a("div",null,p)}const m=e(l,[["render",c]]);export{E as __pageData,m as default};
