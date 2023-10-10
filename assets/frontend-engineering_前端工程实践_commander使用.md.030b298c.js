import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.3d945e71.js";const m=JSON.parse('{"title":"commander 使用","description":"","frontmatter":{},"headers":[],"relativePath":"frontend-engineering/前端工程实践/commander使用.md","filePath":"frontend-engineering/前端工程实践/commander使用.md","lastUpdated":1696903260000}'),l={name:"frontend-engineering/前端工程实践/commander使用.md"},o=p(`<h1 id="commander-使用" tabindex="-1">commander 使用 <a class="header-anchor" href="#commander-使用" aria-label="Permalink to &quot;commander 使用&quot;">​</a></h1><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#! /usr/bin/env node</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">commander</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;commander&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pkg</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;../package.json&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 获取commander的单例</span></span>
<span class="line"><span style="color:#6A737D;">// const { program } = commander</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 手动实例化commander实例</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">program</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> commander.</span><span style="color:#B392F0;">Command</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// leek-test -h</span></span>
<span class="line"><span style="color:#6A737D;">// leek-test -d</span></span>
<span class="line"><span style="color:#6A737D;">// leek-test -e &lt;envName&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">program</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 命令名称</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">(Object.</span><span style="color:#B392F0;">keys</span><span style="color:#E1E4E8;">(pkg.bin)[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">])</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 命令用法</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">usage</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&lt;command&gt; [options]&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 版本</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">version</span><span style="color:#E1E4E8;">(pkg.version)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 创建option -d</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">option</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;-d, --debug&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;是否开启调试模式&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 创建option -e</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">option</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;-e, --env &lt;envName&gt;&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;获取环境变量名称&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// leek-test clone source destination --force</span></span>
<span class="line"><span style="color:#E1E4E8;">program</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">command</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;clone &lt;source&gt; [destination]&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">description</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;clone a repository into a newly created directory&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">option</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;-f, --force&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;是否强制克隆&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">action</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">source</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">destination</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">cmdObj</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(source, destination, cmdObj.force);</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// leek-test service start 8080</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">service</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> commander.</span><span style="color:#B392F0;">Command</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;service&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">service</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">command</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;start [port]&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">description</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;start service at some port&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">action</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">port</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(port);</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">program.</span><span style="color:#B392F0;">addCommand</span><span style="color:#E1E4E8;">(service); </span><span style="color:#6A737D;">// 关键</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 调用其他脚手架命令</span></span>
<span class="line"><span style="color:#E1E4E8;">program</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">command</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;install [name]&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;install package&quot;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    executableFile: </span><span style="color:#9ECBFF;">&quot;leek&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// leek-test install 相当于执行 leek 命令</span></span>
<span class="line"><span style="color:#E1E4E8;">    isDefault: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 执行 leek-test 默认会走到这里</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">alias</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;i&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 匹配所有命令</span></span>
<span class="line"><span style="color:#E1E4E8;">program</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">arguments</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&lt;cmd&gt; [options]&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">description</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;test command&quot;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    cmd: </span><span style="color:#9ECBFF;">&quot;command to run&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    options: </span><span style="color:#9ECBFF;">&quot;options for command&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 所有命令的参数都会经过这里</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">action</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">cmd</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">env</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(cmd, env);</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 自定义help</span></span>
<span class="line"><span style="color:#E1E4E8;">program.</span><span style="color:#B392F0;">helpInformation</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">program.</span><span style="color:#B392F0;">on</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;--help&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;help info&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#6A737D;">// 方式二</span></span>
<span class="line"><span style="color:#E1E4E8;">program.</span><span style="color:#B392F0;">helpInformation</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;help info&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 监听debug option</span></span>
<span class="line"><span style="color:#E1E4E8;">program.</span><span style="color:#B392F0;">on</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;option:debug&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (program.debug) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    p<wbr>rocess.env.</span><span style="color:#79B8FF;">LOG_LEVEL</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;verbose&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 监听所有命令</span></span>
<span class="line"><span style="color:#E1E4E8;">program.</span><span style="color:#B392F0;">on</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;command:*&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;未知的命令&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> obj[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">]);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 获取所有命令</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(program.commands[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">].name);</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 监听所有选项</span></span>
<span class="line"><span style="color:#E1E4E8;">program.</span><span style="color:#B392F0;">on</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;option:*&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">program.</span><span style="color:#B392F0;">parse</span><span style="color:#E1E4E8;">(process.argv);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#! /usr/bin/env node</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">commander</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;commander&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pkg</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;../package.json&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 获取commander的单例</span></span>
<span class="line"><span style="color:#6A737D;">// const { program } = commander</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 手动实例化commander实例</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">program</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> commander.</span><span style="color:#6F42C1;">Command</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// leek-test -h</span></span>
<span class="line"><span style="color:#6A737D;">// leek-test -d</span></span>
<span class="line"><span style="color:#6A737D;">// leek-test -e &lt;envName&gt;</span></span>
<span class="line"><span style="color:#24292E;">program</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 命令名称</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">(Object.</span><span style="color:#6F42C1;">keys</span><span style="color:#24292E;">(pkg.bin)[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">])</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 命令用法</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">usage</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&lt;command&gt; [options]&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 版本</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">version</span><span style="color:#24292E;">(pkg.version)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 创建option -d</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">option</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;-d, --debug&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;是否开启调试模式&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 创建option -e</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">option</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;-e, --env &lt;envName&gt;&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;获取环境变量名称&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// leek-test clone source destination --force</span></span>
<span class="line"><span style="color:#24292E;">program</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">command</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;clone &lt;source&gt; [destination]&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">description</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;clone a repository into a newly created directory&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">option</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;-f, --force&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;是否强制克隆&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">action</span><span style="color:#24292E;">((</span><span style="color:#E36209;">source</span><span style="color:#24292E;">, </span><span style="color:#E36209;">destination</span><span style="color:#24292E;">, </span><span style="color:#E36209;">cmdObj</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(source, destination, cmdObj.force);</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// leek-test service start 8080</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">service</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> commander.</span><span style="color:#6F42C1;">Command</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;service&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">service</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">command</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;start [port]&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">description</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;start service at some port&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">action</span><span style="color:#24292E;">((</span><span style="color:#E36209;">port</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(port);</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">program.</span><span style="color:#6F42C1;">addCommand</span><span style="color:#24292E;">(service); </span><span style="color:#6A737D;">// 关键</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 调用其他脚手架命令</span></span>
<span class="line"><span style="color:#24292E;">program</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">command</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;install [name]&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;install package&quot;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    executableFile: </span><span style="color:#032F62;">&quot;leek&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// leek-test install 相当于执行 leek 命令</span></span>
<span class="line"><span style="color:#24292E;">    isDefault: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 执行 leek-test 默认会走到这里</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">alias</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;i&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 匹配所有命令</span></span>
<span class="line"><span style="color:#24292E;">program</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">arguments</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&lt;cmd&gt; [options]&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">description</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;test command&quot;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    cmd: </span><span style="color:#032F62;">&quot;command to run&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    options: </span><span style="color:#032F62;">&quot;options for command&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 所有命令的参数都会经过这里</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">action</span><span style="color:#24292E;">((</span><span style="color:#E36209;">cmd</span><span style="color:#24292E;">, </span><span style="color:#E36209;">env</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(cmd, env);</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 自定义help</span></span>
<span class="line"><span style="color:#24292E;">program.</span><span style="color:#6F42C1;">helpInformation</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">program.</span><span style="color:#6F42C1;">on</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;--help&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;help info&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#6A737D;">// 方式二</span></span>
<span class="line"><span style="color:#24292E;">program.</span><span style="color:#6F42C1;">helpInformation</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;help info&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 监听debug option</span></span>
<span class="line"><span style="color:#24292E;">program.</span><span style="color:#6F42C1;">on</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;option:debug&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (program.debug) {</span></span>
<span class="line"><span style="color:#24292E;">    p<wbr>rocess.env.</span><span style="color:#005CC5;">LOG_LEVEL</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;verbose&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 监听所有命令</span></span>
<span class="line"><span style="color:#24292E;">program.</span><span style="color:#6F42C1;">on</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;command:*&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;未知的命令&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> obj[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">]);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 获取所有命令</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(program.commands[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">].name);</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 监听所有选项</span></span>
<span class="line"><span style="color:#24292E;">program.</span><span style="color:#6F42C1;">on</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;option:*&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">program.</span><span style="color:#6F42C1;">parse</span><span style="color:#24292E;">(process.argv);</span></span></code></pre></div>`,2),e=[o];function c(t,r,E,y,i,F){return n(),a("div",null,e)}const d=s(l,[["render",c]]);export{m as __pageData,d as default};
