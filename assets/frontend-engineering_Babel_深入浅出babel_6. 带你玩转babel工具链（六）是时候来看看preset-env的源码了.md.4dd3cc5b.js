import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.3d945e71.js";const g=JSON.parse('{"title":"带你玩转 babel 工具链（六）是时候来看看 preset-env 的源码了","description":"","frontmatter":{},"headers":[],"relativePath":"frontend-engineering/Babel/深入浅出babel/6. 带你玩转babel工具链（六）是时候来看看preset-env的源码了.md","filePath":"frontend-engineering/Babel/深入浅出babel/6. 带你玩转babel工具链（六）是时候来看看preset-env的源码了.md","lastUpdated":1700358838000}'),p={name:"frontend-engineering/Babel/深入浅出babel/6. 带你玩转babel工具链（六）是时候来看看preset-env的源码了.md"},o=l(`<h1 id="带你玩转-babel-工具链-六-是时候来看看-preset-env-的源码了" tabindex="-1">带你玩转 babel 工具链（六）是时候来看看 preset-env 的源码了 <a class="header-anchor" href="#带你玩转-babel-工具链-六-是时候来看看-preset-env-的源码了" aria-label="Permalink to &quot;带你玩转 babel 工具链（六）是时候来看看 preset-env 的源码了&quot;">​</a></h1><h2 id="一、前言" tabindex="-1">一、前言 <a class="header-anchor" href="#一、前言" aria-label="Permalink to &quot;一、前言&quot;">​</a></h2><p>本文将带你学习<code>preset-env</code>源码，彻底理解这些配置后的含义。</p><p>往期回顾：</p><ul><li><p><a href="https://juejin.cn/post/7112733626589577230" target="_blank" rel="noreferrer">带你玩转工具链（一）@babel/parser</a></p></li><li><p><a href="https://juejin.cn/post/7113800415057018894" target="_blank" rel="noreferrer">带你玩转 babel 工具链（二）@babel/traverse</a></p></li><li><p><a href="https://juejin.cn/post/7113841261399769102" target="_blank" rel="noreferrer">带你玩转 babel 工具链（三）@babel/generator</a></p></li><li><p><a href="https://juejin.cn/post/7114175523160326175" target="_blank" rel="noreferrer">带你玩转 babel 工具链（四）babel 插件和 preset</a></p></li><li><p><a href="https://juejin.cn/post/7114486435487023112" target="_blank" rel="noreferrer">带你玩转 babel 工具链（五）彻底理解@babel/helpers 与 @babel/runtime</a></p></li></ul><h2 id="二、基本配置" tabindex="-1">二、基本配置 <a class="header-anchor" href="#二、基本配置" aria-label="Permalink to &quot;二、基本配置&quot;">​</a></h2><p>在<code>preset-env</code>的配置中，添加了<code>core-js</code>的 polyfill 的支持。<code>useBuiltIns</code>指定按需加载。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm i @babel</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">preset</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">env core</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">js@</span><span style="color:#79B8FF;">3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm i @babel</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">preset</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">env core</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">js@</span><span style="color:#005CC5;">3</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;presets&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#9ECBFF;">&quot;@babel/preset-env&quot;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;useBuiltIns&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;usage&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;corejs&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">    }]</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;presets&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#032F62;">&quot;@babel/preset-env&quot;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;useBuiltIns&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;usage&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;corejs&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">    }]</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>简单使用一下，我们写了一段<code>includes</code>的 api,看看打包后的代码是如何<code>polyfill</code>的</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">([].</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;1&quot;</span><span style="color:#E1E4E8;">));</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">([].</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;1&quot;</span><span style="color:#24292E;">));</span></span></code></pre></div><p><code>@babel/preset-env</code>帮我们在顶部添加了一段导入代码。实现了<code>includes</code>的 api</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02316b2cced74978819cf4e8bc3a3a42~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>以上就是一个简单的例子，下面介绍下参数详细的作用</p><h2 id="三、通过参数分析源码过程" tabindex="-1">三、通过参数分析源码过程 <a class="header-anchor" href="#三、通过参数分析源码过程" aria-label="Permalink to &quot;三、通过参数分析源码过程&quot;">​</a></h2><p>我们以上面的代码为例</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;presets&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#9ECBFF;">&quot;@babel/preset-env&quot;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;useBuiltIns&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;xxx&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;corejs&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">    }]</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;presets&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#032F62;">&quot;@babel/preset-env&quot;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;useBuiltIns&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;xxx&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;corejs&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">    }]</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">([].</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;1&quot;</span><span style="color:#E1E4E8;">));</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">([].</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;1&quot;</span><span style="color:#24292E;">));</span></span></code></pre></div><p><strong>注意：在下面的例子中，将统一使用<code>corejs@3</code></strong></p><p>下面我将一一演示<code>preset-env</code>的参数帮助理解，并且对大家以后的项目配置也有一定的帮助。大家耐心看完~</p><p>大家先打开源码位置: <code>node_modules/@babel/preset-env/lib/index.js</code></p><h3 id="参数-1-forcealltransforms" tabindex="-1">参数 1：forceAllTransforms <a class="header-anchor" href="#参数-1-forcealltransforms" aria-label="Permalink to &quot;参数 1：forceAllTransforms&quot;">​</a></h3><p><strong>源码</strong>：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">  (</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, _semver.lt)(api.version, </span><span style="color:#9ECBFF;">&quot;7.13.0&quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">  opts.targets </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">  opts.configPath </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">  opts.browserslistEnv </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">  opts.ignoreBrowserslistConfig</span></span>
<span class="line"><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> hasUglifyTarget </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (optionsTargets </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> optionsTargets.uglify) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      hasUglifyTarget </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">delete</span><span style="color:#E1E4E8;"> optionsTargets.uglify;</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">The uglify target has been deprecated. Set the top level</span></span>
<span class="line"><span style="color:#9ECBFF;">option </span><span style="color:#79B8FF;">\\\`</span><span style="color:#9ECBFF;">forceAllTransforms: true</span><span style="color:#79B8FF;">\\\`</span><span style="color:#9ECBFF;"> instead.</span></span>
<span class="line"><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  targets </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getLocalTargets</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    optionsTargets,</span></span>
<span class="line"><span style="color:#E1E4E8;">    ignoreBrowserslistConfig,</span></span>
<span class="line"><span style="color:#E1E4E8;">    configPath,</span></span>
<span class="line"><span style="color:#E1E4E8;">    browserslistEnv</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 需要转换的目标环境 如果为true 就全部转换</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">transformTargets</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> forceAllTransforms </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> hasUglifyTarget </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> {} </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> targets;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">  (</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, _semver.lt)(api.version, </span><span style="color:#032F62;">&quot;7.13.0&quot;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">  opts.targets </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">  opts.configPath </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">  opts.browserslistEnv </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">  opts.ignoreBrowserslistConfig</span></span>
<span class="line"><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> hasUglifyTarget </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (optionsTargets </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> optionsTargets.uglify) {</span></span>
<span class="line"><span style="color:#24292E;">      hasUglifyTarget </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">delete</span><span style="color:#24292E;"> optionsTargets.uglify;</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">The uglify target has been deprecated. Set the top level</span></span>
<span class="line"><span style="color:#032F62;">option </span><span style="color:#005CC5;">\\\`</span><span style="color:#032F62;">forceAllTransforms: true</span><span style="color:#005CC5;">\\\`</span><span style="color:#032F62;"> instead.</span></span>
<span class="line"><span style="color:#032F62;">\`</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  targets </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getLocalTargets</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    optionsTargets,</span></span>
<span class="line"><span style="color:#24292E;">    ignoreBrowserslistConfig,</span></span>
<span class="line"><span style="color:#24292E;">    configPath,</span></span>
<span class="line"><span style="color:#24292E;">    browserslistEnv</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 需要转换的目标环境 如果为true 就全部转换</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">transformTargets</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> forceAllTransforms </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> hasUglifyTarget </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> {} </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> targets;</span></span></code></pre></div><p>在<code>preset-env</code>中，在一开始会调用<code>getLocalTargets</code>获取当前你配置的<code>targets</code>。</p><p>例如我配置:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;targets&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;last 2 versions&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;targets&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;last 2 versions&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><p>经过<code>getLocalTargets</code>处理后，<code>targets</code>如下</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/817d67ef7236417d800292f31dc81071~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>它会列出，浏览器所能支持的最低版本。</p><p>当你在<code>preset-env</code>中配置上<code>forceAllTransforms: true</code>，那么代表所有的代码都需要<code>polyfill</code></p><p>我们跟着源码继续往下看~</p><h3 id="参数-2-include、exclude" tabindex="-1">参数 2：include、exclude <a class="header-anchor" href="#参数-2-include、exclude" aria-label="Permalink to &quot;参数 2：include、exclude&quot;">​</a></h3><p><strong>源码</strong>：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 1. 指定包含的插件，比如配置targets之后，有些插件被排除了，但是我就是想用这个插件</span></span>
<span class="line"><span style="color:#6A737D;">// 2. 指定要包含的corejs polyfill语法，例如es.map, es.set等</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">include</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">transformIncludesAndExcludes</span><span style="color:#E1E4E8;">(optionsInclude);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 1. 指定排除的插件，比如配置targets之后，有些插件被包含了，但是我想排除它</span></span>
<span class="line"><span style="color:#6A737D;">// 2. 指定要排除的corejs polyfill语法，例如es.map, es.set等</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">exclude</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">transformIncludesAndExcludes</span><span style="color:#E1E4E8;">(optionsExclude);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 1. 指定包含的插件，比如配置targets之后，有些插件被排除了，但是我就是想用这个插件</span></span>
<span class="line"><span style="color:#6A737D;">// 2. 指定要包含的corejs polyfill语法，例如es.map, es.set等</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">include</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">transformIncludesAndExcludes</span><span style="color:#24292E;">(optionsInclude);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 1. 指定排除的插件，比如配置targets之后，有些插件被包含了，但是我想排除它</span></span>
<span class="line"><span style="color:#6A737D;">// 2. 指定要排除的corejs polyfill语法，例如es.map, es.set等</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">exclude</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">transformIncludesAndExcludes</span><span style="color:#24292E;">(optionsExclude);</span></span></code></pre></div><p><code>include</code>和<code>exclude</code>是相对立的，支持配置两种模式</p><ul><li>插件名称，例如<code>@babel/plugin-transform-xxx</code></li><li>polyfill 名, 例如<code>es.array.includes</code></li></ul><p><strong>什么场景需要这种配置呢</strong>？我们知道<code>preset-env</code>是支持<code>targets</code>配置的，但是不一定非常准确，有时候可能会把我们需要支持的<code>语言特性</code>排除掉了，所以这时候就需要<code>include</code>，来单独添加插件或<code>polyfill</code>。同样的<code>exclude</code>使用来排除，浏览器支持的语言特性。</p><p>在下面的配置中，我添加了<code>targets</code>配置，设置当前环境为<code>chrome</code>最新的两个版本。那么对于上面的例子来讲，是不会被 polyfill 的。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;presets&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      [</span><span style="color:#9ECBFF;">&quot;@babel/preset-env&quot;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;useBuiltIns&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;usage&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;corejs&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;targets&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&quot;last 2 Chrome versions&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        ]</span></span>
<span class="line"><span style="color:#E1E4E8;">      }]</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;presets&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">      [</span><span style="color:#032F62;">&quot;@babel/preset-env&quot;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;useBuiltIns&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;usage&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;corejs&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;targets&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&quot;last 2 Chrome versions&quot;</span></span>
<span class="line"><span style="color:#24292E;">        ]</span></span>
<span class="line"><span style="color:#24292E;">      }]</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>结果如我们预期那样：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e0a67c455104dab8909f3a68c98332e~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>这时候我添加一个配置</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;presets&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      [</span><span style="color:#9ECBFF;">&quot;@babel/preset-env&quot;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;useBuiltIns&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;usage&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;corejs&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;targets&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&quot;last 2 Chrome versions&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        ],</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#9ECBFF;">&quot;include&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&quot;es.array.includes&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 这里添加了配置</span></span>
<span class="line"><span style="color:#E1E4E8;">       ]</span></span>
<span class="line"><span style="color:#E1E4E8;">      }]</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;presets&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">      [</span><span style="color:#032F62;">&quot;@babel/preset-env&quot;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;useBuiltIns&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;usage&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;corejs&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;targets&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&quot;last 2 Chrome versions&quot;</span></span>
<span class="line"><span style="color:#24292E;">        ],</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#032F62;">&quot;include&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&quot;es.array.includes&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 这里添加了配置</span></span>
<span class="line"><span style="color:#24292E;">       ]</span></span>
<span class="line"><span style="color:#24292E;">      }]</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>重新打包看下，发现已经能正常的 polyfill 了</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19b85793332a4f0783bcddbf66e4896c~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>当然，你也可以配置插件，例如：你的浏览器其实不支持<code>for of</code>语法，但被<code>targets</code>排除掉了。这种情况就可以配置上插件名。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;presets&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#9ECBFF;">&quot;@babel/preset-env&quot;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;useBuiltIns&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;usage&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;corejs&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;targets&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;last 2 Chrome versions&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      ],</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;include&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 在这里配置</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;@babel/plugin-transform-for-of&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }]</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;presets&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#032F62;">&quot;@babel/preset-env&quot;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;useBuiltIns&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;usage&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;corejs&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;targets&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;last 2 Chrome versions&quot;</span></span>
<span class="line"><span style="color:#24292E;">      ],</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;include&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 在这里配置</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;@babel/plugin-transform-for-of&quot;</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    }]</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>以上就是<code>include</code>的作用，<code>exclude</code>想必不用多说了~</p><h3 id="参数-3-targets" tabindex="-1">参数 3：targets <a class="header-anchor" href="#参数-3-targets" aria-label="Permalink to &quot;参数 3：targets&quot;">​</a></h3><p><code>targets</code>的写法大家可以参考这篇文章<a href="https://www.jianshu.com/p/91157aa64244" target="_blank" rel="noreferrer">Browser list 详解</a></p><p><strong>源码：</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 获取所有插件对应的环境</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">compatData</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getPluginList</span><span style="color:#E1E4E8;">(shippedProposals, bugfixes);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 获取所有插件对应的环境</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">compatData</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getPluginList</span><span style="color:#24292E;">(shippedProposals, bugfixes);</span></span></code></pre></div><p>我们先看下<code>compatData</code>长什么样？</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c609ddc00b2c492794f6e1200f7bec95~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>可以发现<code>preset-env</code>中，列出了所有插件对应的浏览器最低可以支持的版本。在后面将通过<code>targets</code>做进一步的筛选。</p><p>其实<code>babel</code>在<code>@babel/compat-data</code>中维护了一套配置。 我们定位到这个目录</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">node_modules</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">@babel</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">compat</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">data</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">data</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">plugins.json</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">node_modules</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">@babel</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">compat</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">data</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">data</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">plugins.json</span></span></code></pre></div><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17651f65e1f9453a885f463e6230aafc~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>在<code>core-js</code>中，也同样维护了一份<code>polyfill</code>的<code>targets</code>配置</p><p><code>node_modules/core-js-compat/data.json</code></p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9c788da35204b3b980e90fa97bb7c4e~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><h3 id="参数-4-modules" tabindex="-1">参数 4：modules <a class="header-anchor" href="#参数-4-modules" aria-label="Permalink to &quot;参数 4：modules&quot;">​</a></h3><p><strong>源码</strong>：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">shouldSkipExportNamespaceFrom</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">  (modules </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;auto&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">    (api.caller </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> api.</span><span style="color:#B392F0;">caller</span><span style="color:#E1E4E8;">(supportsExportNamespaceFrom))) </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">  (modules </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, _helperCompilationTargets.isRequired)(</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;proposal-export-namespace-from&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      transformTargets,</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        compatData,</span></span>
<span class="line"><span style="color:#E1E4E8;">        includes: include.plugins,</span></span>
<span class="line"><span style="color:#E1E4E8;">        excludes: exclude.plugins,</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// modules如果是umd这些模块规范，就会加载下面这些插件</span></span>
<span class="line"><span style="color:#6A737D;">// proposal-dynamic-import</span></span>
<span class="line"><span style="color:#6A737D;">// proposal-export-namespace-from</span></span>
<span class="line"><span style="color:#6A737D;">// syntax-top-level-await</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// modules: false</span></span>
<span class="line"><span style="color:#6A737D;">// 只支持语法，不进行转换</span></span>
<span class="line"><span style="color:#6A737D;">// syntax-dynamic-import</span></span>
<span class="line"><span style="color:#6A737D;">// syntax-export-namespace-from</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">modulesPluginNames</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getModulesPluginNames</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  modules,</span></span>
<span class="line"><span style="color:#E1E4E8;">  transformations: _moduleTransformations.default,</span></span>
<span class="line"><span style="color:#E1E4E8;">  shouldTransformESM:</span></span>
<span class="line"><span style="color:#E1E4E8;">    modules </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;auto&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">(api.caller </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> api.</span><span style="color:#B392F0;">caller</span><span style="color:#E1E4E8;">(supportsStaticESM)),</span></span>
<span class="line"><span style="color:#E1E4E8;">  shouldTransformDynamicImport:</span></span>
<span class="line"><span style="color:#E1E4E8;">    modules </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;auto&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">(api.caller </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> api.</span><span style="color:#B392F0;">caller</span><span style="color:#E1E4E8;">(supportsDynamicImport)),</span></span>
<span class="line"><span style="color:#E1E4E8;">  shouldTransformExportNamespaceFrom: </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">shouldSkipExportNamespaceFrom,</span></span>
<span class="line"><span style="color:#E1E4E8;">  shouldParseTopLevelAwait: </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">api.caller </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> api.</span><span style="color:#B392F0;">caller</span><span style="color:#E1E4E8;">(supportsTopLevelAwait),</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">shouldSkipExportNamespaceFrom</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">  (modules </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;auto&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">    (api.caller </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> api.</span><span style="color:#6F42C1;">caller</span><span style="color:#24292E;">(supportsExportNamespaceFrom))) </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">  (modules </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, _helperCompilationTargets.isRequired)(</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;proposal-export-namespace-from&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      transformTargets,</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        compatData,</span></span>
<span class="line"><span style="color:#24292E;">        includes: include.plugins,</span></span>
<span class="line"><span style="color:#24292E;">        excludes: exclude.plugins,</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// modules如果是umd这些模块规范，就会加载下面这些插件</span></span>
<span class="line"><span style="color:#6A737D;">// proposal-dynamic-import</span></span>
<span class="line"><span style="color:#6A737D;">// proposal-export-namespace-from</span></span>
<span class="line"><span style="color:#6A737D;">// syntax-top-level-await</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// modules: false</span></span>
<span class="line"><span style="color:#6A737D;">// 只支持语法，不进行转换</span></span>
<span class="line"><span style="color:#6A737D;">// syntax-dynamic-import</span></span>
<span class="line"><span style="color:#6A737D;">// syntax-export-namespace-from</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">modulesPluginNames</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getModulesPluginNames</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  modules,</span></span>
<span class="line"><span style="color:#24292E;">  transformations: _moduleTransformations.default,</span></span>
<span class="line"><span style="color:#24292E;">  shouldTransformESM:</span></span>
<span class="line"><span style="color:#24292E;">    modules </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;auto&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">(api.caller </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> api.</span><span style="color:#6F42C1;">caller</span><span style="color:#24292E;">(supportsStaticESM)),</span></span>
<span class="line"><span style="color:#24292E;">  shouldTransformDynamicImport:</span></span>
<span class="line"><span style="color:#24292E;">    modules </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;auto&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">(api.caller </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> api.</span><span style="color:#6F42C1;">caller</span><span style="color:#24292E;">(supportsDynamicImport)),</span></span>
<span class="line"><span style="color:#24292E;">  shouldTransformExportNamespaceFrom: </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">shouldSkipExportNamespaceFrom,</span></span>
<span class="line"><span style="color:#24292E;">  shouldParseTopLevelAwait: </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">api.caller </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> api.</span><span style="color:#6F42C1;">caller</span><span style="color:#24292E;">(supportsTopLevelAwait),</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>在上面的代码中，我们可以看到，都有一段这样的代码：<code>api.caller</code></p><p>它的作用是什么呢，我们先看看文档：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a9138151b094f9796c30daafa01dbb9~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>意思就是，我们可以告诉<code>babel</code>，我们已经支持了部分语言特性，例如<code>webpack</code>它自身已经可以识别<code>esm</code>, <code>动态import</code>, <code>top-level-await</code>了，并且还自己实现了。那么我们可以告诉<code>babel</code>, 你不需要自己去编译了~剩下交给我。。</p><p>所以我们能打开<code>babel-loader</code>, 看下它的配置</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3187479e3452458b839ea7edb762149e~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>告诉<code>babel</code>以上的语法都是支持的。</p><p>这样，在下面的源码里，就可以做到按需添加模块转换插件</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getModulesPluginNames</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ({</span></span>
<span class="line"><span style="color:#E1E4E8;">  modules,</span></span>
<span class="line"><span style="color:#E1E4E8;">  transformations,</span></span>
<span class="line"><span style="color:#E1E4E8;">  shouldTransformESM, </span><span style="color:#6A737D;">// 是否转换esm</span></span>
<span class="line"><span style="color:#E1E4E8;">  shouldTransformDynamicImport, </span><span style="color:#6A737D;">// 是否转换动态import</span></span>
<span class="line"><span style="color:#E1E4E8;">  shouldTransformExportNamespaceFrom, </span><span style="color:#6A737D;">// 是否转换命名导出 export * as ns from &quot;mod&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">  shouldParseTopLevelAwait, </span><span style="color:#6A737D;">// 是否编译toplevel await</span></span>
<span class="line"><span style="color:#E1E4E8;">}) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">modulesPluginNames</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (modules </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> transformations[modules]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (shouldTransformESM) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      modulesPluginNames.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(transformations[modules]);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">      shouldTransformDynamicImport </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">      shouldTransformESM </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">      modules </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;umd&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      modulesPluginNames.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;proposal-dynamic-import&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (shouldTransformDynamicImport) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&quot;Dynamic import can only be supported when transforming ES modules&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&quot; to AMD, CommonJS or SystemJS. Only the parser plugin will be enabled.&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        );</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      modulesPluginNames.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;syntax-dynamic-import&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    modulesPluginNames.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;syntax-dynamic-import&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (shouldTransformExportNamespaceFrom) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    modulesPluginNames.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;proposal-export-namespace-from&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    modulesPluginNames.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;syntax-export-namespace-from&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (shouldParseTopLevelAwait) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    modulesPluginNames.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;syntax-top-level-await&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> modulesPluginNames;</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getModulesPluginNames</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ({</span></span>
<span class="line"><span style="color:#24292E;">  modules,</span></span>
<span class="line"><span style="color:#24292E;">  transformations,</span></span>
<span class="line"><span style="color:#24292E;">  shouldTransformESM, </span><span style="color:#6A737D;">// 是否转换esm</span></span>
<span class="line"><span style="color:#24292E;">  shouldTransformDynamicImport, </span><span style="color:#6A737D;">// 是否转换动态import</span></span>
<span class="line"><span style="color:#24292E;">  shouldTransformExportNamespaceFrom, </span><span style="color:#6A737D;">// 是否转换命名导出 export * as ns from &quot;mod&quot;;</span></span>
<span class="line"><span style="color:#24292E;">  shouldParseTopLevelAwait, </span><span style="color:#6A737D;">// 是否编译toplevel await</span></span>
<span class="line"><span style="color:#24292E;">}) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">modulesPluginNames</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (modules </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> transformations[modules]) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (shouldTransformESM) {</span></span>
<span class="line"><span style="color:#24292E;">      modulesPluginNames.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(transformations[modules]);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">      shouldTransformDynamicImport </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">      shouldTransformESM </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">      modules </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;umd&quot;</span></span>
<span class="line"><span style="color:#24292E;">    ) {</span></span>
<span class="line"><span style="color:#24292E;">      modulesPluginNames.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;proposal-dynamic-import&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (shouldTransformDynamicImport) {</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&quot;Dynamic import can only be supported when transforming ES modules&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&quot; to AMD, CommonJS or SystemJS. Only the parser plugin will be enabled.&quot;</span></span>
<span class="line"><span style="color:#24292E;">        );</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      modulesPluginNames.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;syntax-dynamic-import&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    modulesPluginNames.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;syntax-dynamic-import&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (shouldTransformExportNamespaceFrom) {</span></span>
<span class="line"><span style="color:#24292E;">    modulesPluginNames.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;proposal-export-namespace-from&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    modulesPluginNames.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;syntax-export-namespace-from&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (shouldParseTopLevelAwait) {</span></span>
<span class="line"><span style="color:#24292E;">    modulesPluginNames.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;syntax-top-level-await&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> modulesPluginNames;</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><p>另外，还会根据你的<code>modules</code>配置，去添加对应的模块转换插件, 可以看到默认是<code>auto</code>,使用了<code>commonjs</code>模块转换插件</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">auto</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;transform-modules-commonjs&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">amd</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;transform-modules-amd&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">commonjs</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;transform-modules-commonjs&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">cjs</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;transform-modules-commonjs&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">systemjs</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;transform-modules-systemjs&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">umd</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;transform-modules-umd&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">auto</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;transform-modules-commonjs&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">amd</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;transform-modules-amd&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">commonjs</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;transform-modules-commonjs&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">cjs</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;transform-modules-commonjs&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">systemjs</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;transform-modules-systemjs&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">umd</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;transform-modules-umd&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>总结一下：</strong></p><ol><li><p>获取当前环境是否支持命名空间导出，例如<code>export * as xxx from &#39;xxx&#39;</code></p></li><li><p>获取对应的模块插件，如果还支持<code>top-level-await</code>就返回<code>syntax-top-level-await</code>, 如果有动态 import, 就返回<code>syntax-dynamic-import</code>（其中有一些细节，不详细展开了）</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// node_modules/@babel/preset-env/lib/module-transformations.js</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">auto</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;transform-modules-commonjs&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">amd</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;transform-modules-amd&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">commonjs</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;transform-modules-commonjs&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">cjs</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;transform-modules-commonjs&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">systemjs</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;transform-modules-systemjs&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">umd</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;transform-modules-umd&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// node_modules/@babel/preset-env/lib/module-transformations.js</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">auto</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;transform-modules-commonjs&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">amd</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;transform-modules-amd&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">commonjs</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;transform-modules-commonjs&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">cjs</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;transform-modules-commonjs&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">systemjs</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;transform-modules-systemjs&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">umd</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;transform-modules-umd&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>如果配置<code>modules: false</code>，其实不需要做转换了，只需要支持语法 ，以下是配置<code>modules: false</code>之后所需的插件。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/185be6399c004da08455eda428da4a31~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p></li></ol><p>由于<code>modules</code>默认值为<code>auto</code>, 所以默认的模块规范就是<code>commonjs</code>, 进而使用<code>@babel/transform-modules-commonjs</code>进行转换。</p><p>其他配置同理~</p><h3 id="参数-5-usebuiltins" tabindex="-1">参数 5：useBuiltIns <a class="header-anchor" href="#参数-5-usebuiltins" aria-label="Permalink to &quot;参数 5：useBuiltIns&quot;">​</a></h3><blockquote><p>该配置必须和<code>corejs</code>搭配使用</p></blockquote><p><strong>源码</strong>：</p><p>前面说到<code>babel</code>维护了一套<code>compactData</code>配置。</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17651f65e1f9453a885f463e6230aafc~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>下面就会根据环境配置，筛选出需要的插件</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 根据目标环境 筛选出需要的插件</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pluginNames</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, _helperCompilationTargets.filterItems)(</span></span>
<span class="line"><span style="color:#E1E4E8;">  compatData,</span></span>
<span class="line"><span style="color:#E1E4E8;">  include.plugins,</span></span>
<span class="line"><span style="color:#E1E4E8;">  exclude.plugins,</span></span>
<span class="line"><span style="color:#E1E4E8;">  transformTargets,</span></span>
<span class="line"><span style="color:#E1E4E8;">  modulesPluginNames,</span></span>
<span class="line"><span style="color:#E1E4E8;">  (</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, _getOptionSpecificExcludes.default)({</span></span>
<span class="line"><span style="color:#E1E4E8;">    loose,</span></span>
<span class="line"><span style="color:#E1E4E8;">  }),</span></span>
<span class="line"><span style="color:#E1E4E8;">  _shippedProposals.pluginSyntaxMap</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 根据目标环境 筛选出需要的插件</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pluginNames</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, _helperCompilationTargets.filterItems)(</span></span>
<span class="line"><span style="color:#24292E;">  compatData,</span></span>
<span class="line"><span style="color:#24292E;">  include.plugins,</span></span>
<span class="line"><span style="color:#24292E;">  exclude.plugins,</span></span>
<span class="line"><span style="color:#24292E;">  transformTargets,</span></span>
<span class="line"><span style="color:#24292E;">  modulesPluginNames,</span></span>
<span class="line"><span style="color:#24292E;">  (</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, _getOptionSpecificExcludes.default)({</span></span>
<span class="line"><span style="color:#24292E;">    loose,</span></span>
<span class="line"><span style="color:#24292E;">  }),</span></span>
<span class="line"><span style="color:#24292E;">  _shippedProposals.pluginSyntaxMap</span></span>
<span class="line"><span style="color:#24292E;">);</span></span></code></pre></div><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1ae9903546241b8b475ed337288f670~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>获取到需要的插件后，就到达很关键的地方了， 我们看下<code>polyfill</code>是如何添加的</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 获取polyfill插件</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">polyfillPlugins</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getPolyfillPlugins</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  useBuiltIns,</span></span>
<span class="line"><span style="color:#E1E4E8;">  corejs,</span></span>
<span class="line"><span style="color:#E1E4E8;">  polyfillTargets: targets,</span></span>
<span class="line"><span style="color:#E1E4E8;">  include: include.builtIns,</span></span>
<span class="line"><span style="color:#E1E4E8;">  exclude: exclude.builtIns,</span></span>
<span class="line"><span style="color:#E1E4E8;">  proposals,</span></span>
<span class="line"><span style="color:#E1E4E8;">  shippedProposals,</span></span>
<span class="line"><span style="color:#E1E4E8;">  regenerator: pluginNames.</span><span style="color:#B392F0;">has</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;transform-regenerator&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">  debug,</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 获取polyfill插件</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">polyfillPlugins</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getPolyfillPlugins</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  useBuiltIns,</span></span>
<span class="line"><span style="color:#24292E;">  corejs,</span></span>
<span class="line"><span style="color:#24292E;">  polyfillTargets: targets,</span></span>
<span class="line"><span style="color:#24292E;">  include: include.builtIns,</span></span>
<span class="line"><span style="color:#24292E;">  exclude: exclude.builtIns,</span></span>
<span class="line"><span style="color:#24292E;">  proposals,</span></span>
<span class="line"><span style="color:#24292E;">  shippedProposals,</span></span>
<span class="line"><span style="color:#24292E;">  regenerator: pluginNames.</span><span style="color:#6F42C1;">has</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;transform-regenerator&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">  debug,</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getPolyfillPlugins</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ({</span></span>
<span class="line"><span style="color:#E1E4E8;">  useBuiltIns,</span></span>
<span class="line"><span style="color:#E1E4E8;">  corejs,</span></span>
<span class="line"><span style="color:#E1E4E8;">  polyfillTargets,</span></span>
<span class="line"><span style="color:#E1E4E8;">  include,</span></span>
<span class="line"><span style="color:#E1E4E8;">  exclude,</span></span>
<span class="line"><span style="color:#E1E4E8;">  proposals,</span></span>
<span class="line"><span style="color:#E1E4E8;">  shippedProposals,</span></span>
<span class="line"><span style="color:#E1E4E8;">  regenerator,</span></span>
<span class="line"><span style="color:#E1E4E8;">  debug,</span></span>
<span class="line"><span style="color:#E1E4E8;">}) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">polyfillPlugins</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (useBuiltIns </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;usage&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> useBuiltIns </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;entry&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pluginOptions</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      method: </span><span style="color:#9ECBFF;">\`\${</span><span style="color:#E1E4E8;">useBuiltIns</span><span style="color:#9ECBFF;">}-global\`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      version: corejs </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> corejs.</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      targets: polyfillTargets,</span></span>
<span class="line"><span style="color:#E1E4E8;">      include,</span></span>
<span class="line"><span style="color:#E1E4E8;">      exclude,</span></span>
<span class="line"><span style="color:#E1E4E8;">      proposals,</span></span>
<span class="line"><span style="color:#E1E4E8;">      shippedProposals,</span></span>
<span class="line"><span style="color:#E1E4E8;">      debug,</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 判断是否配置corejs</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (corejs) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (useBuiltIns </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;usage&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (corejs.major </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 添加 babel-plugin-polyfill-corejs2 和 babel-polyfill 插件</span></span>
<span class="line"><span style="color:#E1E4E8;">          polyfillPlugins.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">            [pluginCoreJS2, pluginOptions],</span></span>
<span class="line"><span style="color:#E1E4E8;">            [</span></span>
<span class="line"><span style="color:#E1E4E8;">              _babelPolyfill.default,</span></span>
<span class="line"><span style="color:#E1E4E8;">              {</span></span>
<span class="line"><span style="color:#E1E4E8;">                usage: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              },</span></span>
<span class="line"><span style="color:#E1E4E8;">            ]</span></span>
<span class="line"><span style="color:#E1E4E8;">          );</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 添加 babel-plugin-polyfill-corejs3 插件 和 babel-polyfill 插件</span></span>
<span class="line"><span style="color:#E1E4E8;">          polyfillPlugins.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">            [pluginCoreJS3, pluginOptions],</span></span>
<span class="line"><span style="color:#E1E4E8;">            [</span></span>
<span class="line"><span style="color:#E1E4E8;">              _babelPolyfill.default,</span></span>
<span class="line"><span style="color:#E1E4E8;">              {</span></span>
<span class="line"><span style="color:#E1E4E8;">                usage: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                deprecated: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              },</span></span>
<span class="line"><span style="color:#E1E4E8;">            ]</span></span>
<span class="line"><span style="color:#E1E4E8;">          );</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 添加 babel-plugin-polyfill-regenerator 插件</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (regenerator) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          polyfillPlugins.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">([</span></span>
<span class="line"><span style="color:#E1E4E8;">            pluginRegenerator,</span></span>
<span class="line"><span style="color:#E1E4E8;">            {</span></span>
<span class="line"><span style="color:#E1E4E8;">              method: </span><span style="color:#9ECBFF;">&quot;usage-global&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              debug,</span></span>
<span class="line"><span style="color:#E1E4E8;">            },</span></span>
<span class="line"><span style="color:#E1E4E8;">          ]);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (corejs.major </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// babel-polyfill 插件（全局引入）、babel-plugin-polyfill-corejs2插件</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 注意插件执行顺序，先执行的babel-polyfill</span></span>
<span class="line"><span style="color:#E1E4E8;">          polyfillPlugins.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">            [</span></span>
<span class="line"><span style="color:#E1E4E8;">              _babelPolyfill.default,</span></span>
<span class="line"><span style="color:#E1E4E8;">              {</span></span>
<span class="line"><span style="color:#E1E4E8;">                regenerator,</span></span>
<span class="line"><span style="color:#E1E4E8;">              },</span></span>
<span class="line"><span style="color:#E1E4E8;">            ],</span></span>
<span class="line"><span style="color:#E1E4E8;">            [pluginCoreJS2, pluginOptions]</span></span>
<span class="line"><span style="color:#E1E4E8;">          );</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 添加 babel-plugin-polyfill-corejs3 插件 和 babel-polyfill 插件</span></span>
<span class="line"><span style="color:#E1E4E8;">          polyfillPlugins.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">            [pluginCoreJS3, pluginOptions],</span></span>
<span class="line"><span style="color:#E1E4E8;">            [</span></span>
<span class="line"><span style="color:#E1E4E8;">              _babelPolyfill.default,</span></span>
<span class="line"><span style="color:#E1E4E8;">              {</span></span>
<span class="line"><span style="color:#E1E4E8;">                deprecated: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              },</span></span>
<span class="line"><span style="color:#E1E4E8;">            ]</span></span>
<span class="line"><span style="color:#E1E4E8;">          );</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">regenerator) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            polyfillPlugins.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">([_regenerator.default, pluginOptions]);</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> polyfillPlugins;</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getPolyfillPlugins</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ({</span></span>
<span class="line"><span style="color:#24292E;">  useBuiltIns,</span></span>
<span class="line"><span style="color:#24292E;">  corejs,</span></span>
<span class="line"><span style="color:#24292E;">  polyfillTargets,</span></span>
<span class="line"><span style="color:#24292E;">  include,</span></span>
<span class="line"><span style="color:#24292E;">  exclude,</span></span>
<span class="line"><span style="color:#24292E;">  proposals,</span></span>
<span class="line"><span style="color:#24292E;">  shippedProposals,</span></span>
<span class="line"><span style="color:#24292E;">  regenerator,</span></span>
<span class="line"><span style="color:#24292E;">  debug,</span></span>
<span class="line"><span style="color:#24292E;">}) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">polyfillPlugins</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (useBuiltIns </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;usage&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> useBuiltIns </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;entry&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pluginOptions</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      method: </span><span style="color:#032F62;">\`\${</span><span style="color:#24292E;">useBuiltIns</span><span style="color:#032F62;">}-global\`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      version: corejs </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> corejs.</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      targets: polyfillTargets,</span></span>
<span class="line"><span style="color:#24292E;">      include,</span></span>
<span class="line"><span style="color:#24292E;">      exclude,</span></span>
<span class="line"><span style="color:#24292E;">      proposals,</span></span>
<span class="line"><span style="color:#24292E;">      shippedProposals,</span></span>
<span class="line"><span style="color:#24292E;">      debug,</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 判断是否配置corejs</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (corejs) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (useBuiltIns </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;usage&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (corejs.major </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 添加 babel-plugin-polyfill-corejs2 和 babel-polyfill 插件</span></span>
<span class="line"><span style="color:#24292E;">          polyfillPlugins.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">            [pluginCoreJS2, pluginOptions],</span></span>
<span class="line"><span style="color:#24292E;">            [</span></span>
<span class="line"><span style="color:#24292E;">              _babelPolyfill.default,</span></span>
<span class="line"><span style="color:#24292E;">              {</span></span>
<span class="line"><span style="color:#24292E;">                usage: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              },</span></span>
<span class="line"><span style="color:#24292E;">            ]</span></span>
<span class="line"><span style="color:#24292E;">          );</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 添加 babel-plugin-polyfill-corejs3 插件 和 babel-polyfill 插件</span></span>
<span class="line"><span style="color:#24292E;">          polyfillPlugins.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">            [pluginCoreJS3, pluginOptions],</span></span>
<span class="line"><span style="color:#24292E;">            [</span></span>
<span class="line"><span style="color:#24292E;">              _babelPolyfill.default,</span></span>
<span class="line"><span style="color:#24292E;">              {</span></span>
<span class="line"><span style="color:#24292E;">                usage: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                deprecated: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              },</span></span>
<span class="line"><span style="color:#24292E;">            ]</span></span>
<span class="line"><span style="color:#24292E;">          );</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 添加 babel-plugin-polyfill-regenerator 插件</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (regenerator) {</span></span>
<span class="line"><span style="color:#24292E;">          polyfillPlugins.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">([</span></span>
<span class="line"><span style="color:#24292E;">            pluginRegenerator,</span></span>
<span class="line"><span style="color:#24292E;">            {</span></span>
<span class="line"><span style="color:#24292E;">              method: </span><span style="color:#032F62;">&quot;usage-global&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              debug,</span></span>
<span class="line"><span style="color:#24292E;">            },</span></span>
<span class="line"><span style="color:#24292E;">          ]);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (corejs.major </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// babel-polyfill 插件（全局引入）、babel-plugin-polyfill-corejs2插件</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 注意插件执行顺序，先执行的babel-polyfill</span></span>
<span class="line"><span style="color:#24292E;">          polyfillPlugins.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">            [</span></span>
<span class="line"><span style="color:#24292E;">              _babelPolyfill.default,</span></span>
<span class="line"><span style="color:#24292E;">              {</span></span>
<span class="line"><span style="color:#24292E;">                regenerator,</span></span>
<span class="line"><span style="color:#24292E;">              },</span></span>
<span class="line"><span style="color:#24292E;">            ],</span></span>
<span class="line"><span style="color:#24292E;">            [pluginCoreJS2, pluginOptions]</span></span>
<span class="line"><span style="color:#24292E;">          );</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 添加 babel-plugin-polyfill-corejs3 插件 和 babel-polyfill 插件</span></span>
<span class="line"><span style="color:#24292E;">          polyfillPlugins.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">            [pluginCoreJS3, pluginOptions],</span></span>
<span class="line"><span style="color:#24292E;">            [</span></span>
<span class="line"><span style="color:#24292E;">              _babelPolyfill.default,</span></span>
<span class="line"><span style="color:#24292E;">              {</span></span>
<span class="line"><span style="color:#24292E;">                deprecated: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              },</span></span>
<span class="line"><span style="color:#24292E;">            ]</span></span>
<span class="line"><span style="color:#24292E;">          );</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">regenerator) {</span></span>
<span class="line"><span style="color:#24292E;">            polyfillPlugins.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">([_regenerator.default, pluginOptions]);</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> polyfillPlugins;</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><p>我们可以总结如下几点</p><ul><li><p>存在 corejs 配置</p><ul><li><p><strong>useBuiltIns: usage</strong></p><ul><li><p>如果配置 core-js@3</p><ul><li>添加 babel-plugin-polyfill-corejs3 插件</li><li>添加 babel-polyfill 插件 (@babel/preset-env/lib/polyfills/babel-polyfill.js)</li></ul></li><li><p>如果配置 core-js@2</p><ul><li>添加 babel-plugin-polyfill-corejs2 插件</li><li>添加 babel-polyfill 插件 (@babel/preset-env/lib/polyfills/babel-polyfill.js)</li></ul></li><li><p>如果配置 transform-regenerator</p><ul><li>添加 babel-plugin-polyfill-regenerator 插件</li></ul></li></ul></li><li><p><strong>useBuiltIns: entry | false</strong></p><ul><li><p>如果配置 core-js@3</p><ul><li>添加 babel-plugin-polyfill-corejs3 插件</li><li>添加 babel-polyfill 插件 (@babel/preset-env/lib/polyfills/babel-polyfill.js)</li></ul></li><li><p>如果配置 core-js@2</p><ul><li>添加 babel-plugin-polyfill-corejs2</li><li>添加 babel-polyfill 插件 (@babel/preset-env/lib/polyfills/babel-polyfill.js)</li></ul></li><li><p>如果没有配置 transform-regenerator 插件</p><ul><li>添加 regenerator 插件删除 regenerator 导入（@babel/preset-env/lib/polyfills/regenerator.js）</li></ul></li></ul></li></ul></li></ul><p><strong>使用</strong>:</p><p>好的，上面就是<code>polyfill</code>插件的具体添加过程，下面我们来看看<code>useBuiltIns</code>是如何使用的。</p><ul><li><p>在<code>useBuiltIns: &quot;usage&quot;</code>的配置下，打包结果如下 <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6ca9f9d0f6745f88b91d74a3ca681e0~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"> 可以看到能够实现按需引入</p></li><li><p>在<code>useBuiltIns: &quot;entry&quot;</code>的配置下，还需要在入口文件中添加<code>core-js</code>的导入，如何你还想支持<code>async</code>语法，还需要引入<code>regenerator-runtime/runtime.js</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;core-js&quot;</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 其他语言特性支持</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;regenerator-runtime/runtime.js&quot;</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 支持async</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">([].</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;1&quot;</span><span style="color:#E1E4E8;">));</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;core-js&quot;</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 其他语言特性支持</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;regenerator-runtime/runtime.js&quot;</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 支持async</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">([].</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;1&quot;</span><span style="color:#24292E;">));</span></span></code></pre></div><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/abede275b27c447682ca4b0ec538bff6~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>可以看到，会把所有的 polyfill 都引入进来，所以<code>entry</code>的配置并不推荐使用，会<code>全量引入</code>。</p></li><li><p>在<code>useBuiltIns: false</code>配置下，<code>core-js</code>配置将失效，不会帮助引入<code>polyfill</code></p></li></ul><h3 id="参数-6-corejs" tabindex="-1">参数 6：corejs <a class="header-anchor" href="#参数-6-corejs" aria-label="Permalink to &quot;参数 6：corejs&quot;">​</a></h3><p>corejs 就比较简单了，指定 corejs 的版本就可以了，但是必须搭配<code>useBuiltIns</code>使用哦~</p><h3 id="参数-7-debug" tabindex="-1">参数 7：debug <a class="header-anchor" href="#参数-7-debug" aria-label="Permalink to &quot;参数 7：debug&quot;">​</a></h3><p><strong>源码</strong>：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (debug) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;@babel/preset-env: \`DEBUG\` option&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">Using targets:&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">      (</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, _helperCompilationTargets.prettifyTargets)(targets),</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">Using modules transform: \${</span><span style="color:#E1E4E8;">modules</span><span style="color:#9ECBFF;">.</span><span style="color:#B392F0;">toString</span><span style="color:#9ECBFF;">()</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">Using plugins:&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  pluginNames.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">pluginName</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    (</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, _debug.logPlugin)(pluginName, targets, compatData);</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">useBuiltIns) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">Using polyfills: No polyfills were added, since the \`useBuiltIns\` option was not set.&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    );</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (debug) {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;@babel/preset-env: \`DEBUG\` option&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">Using targets:&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">      (</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, _helperCompilationTargets.prettifyTargets)(targets),</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">Using modules transform: \${</span><span style="color:#24292E;">modules</span><span style="color:#032F62;">.</span><span style="color:#6F42C1;">toString</span><span style="color:#032F62;">()</span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">Using plugins:&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  pluginNames.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">((</span><span style="color:#E36209;">pluginName</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    (</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, _debug.logPlugin)(pluginName, targets, compatData);</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">useBuiltIns) {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">Using polyfills: No polyfills were added, since the \`useBuiltIns\` option was not set.&quot;</span></span>
<span class="line"><span style="color:#24292E;">    );</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>使用</strong>:</p><p>当配置上<code>debug: true</code>后，控制台就能看见你使用了哪些插件</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f4629fc62fc4703a7955e6884aba690~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><h2 id="四、babel-plugin-polyfill-corejs3" tabindex="-1">四、babel-plugin-polyfill-corejs3 <a class="header-anchor" href="#四、babel-plugin-polyfill-corejs3" aria-label="Permalink to &quot;四、babel-plugin-polyfill-corejs3&quot;">​</a></h2><p>我正在参与掘金技术社区创作者签约计划招募活动，<a href="https://juejin.cn/post/7112770927082864653" target="_blank" rel="noreferrer">点击链接报名投稿</a></p><p>helper-define-polyfill-provider</p>`,107),e=[o];function c(t,r,E,y,i,u){return n(),a("div",null,e)}const F=s(p,[["render",c]]);export{g as __pageData,F as default};
