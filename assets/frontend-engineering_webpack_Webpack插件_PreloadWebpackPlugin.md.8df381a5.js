import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.3d945e71.js";const k=JSON.parse('{"title":"PreloadWebpackPlugin 插件实现","description":"","frontmatter":{},"headers":[],"relativePath":"frontend-engineering/webpack/Webpack插件/PreloadWebpackPlugin.md","filePath":"frontend-engineering/webpack/Webpack插件/PreloadWebpackPlugin.md","lastUpdated":1697531581000}'),p={name:"frontend-engineering/webpack/Webpack插件/PreloadWebpackPlugin.md"},o=l(`<h1 id="preloadwebpackplugin-插件实现" tabindex="-1">PreloadWebpackPlugin 插件实现 <a class="header-anchor" href="#preloadwebpackplugin-插件实现" aria-label="Permalink to &quot;PreloadWebpackPlugin 插件实现&quot;">​</a></h1><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HtmlWebpackPlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;html-webpack-plugin&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PreloadWebpackPlugin</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">options</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.options </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> options;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">compiler</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    compiler.hooks.compilation.</span><span style="color:#B392F0;">tap</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;PreloadWebpackPlugin&quot;</span><span style="color:#E1E4E8;">, (</span><span style="color:#FFAB70;">compilation</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 在准备生成资源标签之前执行</span></span>
<span class="line"><span style="color:#E1E4E8;">      HtmlWebpackPlugin.</span><span style="color:#B392F0;">getHooks</span><span style="color:#E1E4E8;">(compilation).beforeAssetTagGeneration.</span><span style="color:#B392F0;">tapAsync</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;PreloadWebpackPlugin&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        (</span><span style="color:#FFAB70;">htmlData</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">callback</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">generateLinks</span><span style="color:#E1E4E8;">(compilation, htmlData, callback);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      );</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    compiler.hooks.compilation.</span><span style="color:#B392F0;">tap</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;PreloadWebpackPlugin&quot;</span><span style="color:#E1E4E8;">, (</span><span style="color:#FFAB70;">compilation</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      HtmlWebpackPlugin.</span><span style="color:#B392F0;">getHooks</span><span style="color:#E1E4E8;">(compilation).alterAssetTags.</span><span style="color:#B392F0;">tap</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;PreloadWebpackPlugin&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        (</span><span style="color:#FFAB70;">htmlData</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">resourceHints</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (resourceHints) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 修改生成的标签</span></span>
<span class="line"><span style="color:#E1E4E8;">            htmlData.assetTags.styles </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">resourceHints,</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">htmlData.assetTags.styles,</span></span>
<span class="line"><span style="color:#E1E4E8;">            ];</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> htmlData;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      );</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">generateLinks</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">compilation</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">htmlData</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">callback</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">rel</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">include</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.options;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//本次编译产出的代码块</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> chunks </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">compilation.chunks];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (include </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> include </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;asyncChunks&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">//如果chunk.canBeInitial()为true,说明这是一个入口代码块</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">//过滤一下，只留下异步代码块</span></span>
<span class="line"><span style="color:#E1E4E8;">      chunks </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> chunks.</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">chunk</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">chunk.</span><span style="color:#B392F0;">canBeInitial</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 筛选异步代码块对应的文件</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> allFiles </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> chunks.</span><span style="color:#B392F0;">reduce</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">accumulated</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">chunk</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> accumulated.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">chunk.files);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }, </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Set</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">links</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 创建Link标签对象数组</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">file</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">of</span><span style="color:#E1E4E8;"> allFiles.</span><span style="color:#B392F0;">values</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      links.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        tagName: </span><span style="color:#9ECBFF;">&quot;link&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        attributes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          rel, </span><span style="color:#6A737D;">//preload prefetch</span></span>
<span class="line"><span style="color:#E1E4E8;">          href: file,</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">      });</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.resourceHints </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> links;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">callback</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> PreloadWebpackPlugin;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HtmlWebpackPlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;html-webpack-plugin&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PreloadWebpackPlugin</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(</span><span style="color:#E36209;">options</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.options </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> options;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">(</span><span style="color:#E36209;">compiler</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    compiler.hooks.compilation.</span><span style="color:#6F42C1;">tap</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;PreloadWebpackPlugin&quot;</span><span style="color:#24292E;">, (</span><span style="color:#E36209;">compilation</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 在准备生成资源标签之前执行</span></span>
<span class="line"><span style="color:#24292E;">      HtmlWebpackPlugin.</span><span style="color:#6F42C1;">getHooks</span><span style="color:#24292E;">(compilation).beforeAssetTagGeneration.</span><span style="color:#6F42C1;">tapAsync</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;PreloadWebpackPlugin&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        (</span><span style="color:#E36209;">htmlData</span><span style="color:#24292E;">, </span><span style="color:#E36209;">callback</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">generateLinks</span><span style="color:#24292E;">(compilation, htmlData, callback);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      );</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    compiler.hooks.compilation.</span><span style="color:#6F42C1;">tap</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;PreloadWebpackPlugin&quot;</span><span style="color:#24292E;">, (</span><span style="color:#E36209;">compilation</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      HtmlWebpackPlugin.</span><span style="color:#6F42C1;">getHooks</span><span style="color:#24292E;">(compilation).alterAssetTags.</span><span style="color:#6F42C1;">tap</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;PreloadWebpackPlugin&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        (</span><span style="color:#E36209;">htmlData</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">resourceHints</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (resourceHints) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 修改生成的标签</span></span>
<span class="line"><span style="color:#24292E;">            htmlData.assetTags.styles </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">resourceHints,</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">htmlData.assetTags.styles,</span></span>
<span class="line"><span style="color:#24292E;">            ];</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> htmlData;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      );</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">generateLinks</span><span style="color:#24292E;">(</span><span style="color:#E36209;">compilation</span><span style="color:#24292E;">, </span><span style="color:#E36209;">htmlData</span><span style="color:#24292E;">, </span><span style="color:#E36209;">callback</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">rel</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">include</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.options;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//本次编译产出的代码块</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> chunks </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">compilation.chunks];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (include </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> include </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;asyncChunks&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">//如果chunk.canBeInitial()为true,说明这是一个入口代码块</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">//过滤一下，只留下异步代码块</span></span>
<span class="line"><span style="color:#24292E;">      chunks </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> chunks.</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">((</span><span style="color:#E36209;">chunk</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">chunk.</span><span style="color:#6F42C1;">canBeInitial</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 筛选异步代码块对应的文件</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> allFiles </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> chunks.</span><span style="color:#6F42C1;">reduce</span><span style="color:#24292E;">((</span><span style="color:#E36209;">accumulated</span><span style="color:#24292E;">, </span><span style="color:#E36209;">chunk</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> accumulated.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">chunk.files);</span></span>
<span class="line"><span style="color:#24292E;">    }, </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Set</span><span style="color:#24292E;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">links</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 创建Link标签对象数组</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">file</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">of</span><span style="color:#24292E;"> allFiles.</span><span style="color:#6F42C1;">values</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">      links.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        tagName: </span><span style="color:#032F62;">&quot;link&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        attributes: {</span></span>
<span class="line"><span style="color:#24292E;">          rel, </span><span style="color:#6A737D;">//preload prefetch</span></span>
<span class="line"><span style="color:#24292E;">          href: file,</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">      });</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.resourceHints </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> links;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">callback</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> PreloadWebpackPlugin;</span></span></code></pre></div>`,2),e=[o];function c(t,r,E,y,i,F){return n(),a("div",null,e)}const A=s(p,[["render",c]]);export{k as __pageData,A as default};
