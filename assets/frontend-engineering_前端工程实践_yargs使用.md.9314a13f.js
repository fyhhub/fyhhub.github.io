import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.3d945e71.js";const g=JSON.parse('{"title":"yargs 使用","description":"","frontmatter":{},"headers":[],"relativePath":"frontend-engineering/前端工程实践/yargs使用.md","filePath":"frontend-engineering/前端工程实践/yargs使用.md","lastUpdated":1712455947000}'),p={name:"frontend-engineering/前端工程实践/yargs使用.md"},o=l(`<h1 id="yargs-使用" tabindex="-1">yargs 使用 <a class="header-anchor" href="#yargs-使用" aria-label="Permalink to &quot;yargs 使用&quot;">​</a></h1><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/env node</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">yargs</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;yargs/yargs&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">hideBin</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;yargs/helpers&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">cli</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">yargs</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">argv</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> process.argv.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">context</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  leekVersion: </span><span style="color:#9ECBFF;">&#39;1.0.0&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">cli</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">usage</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;leek [command] &lt;options&gt;&#39;</span><span style="color:#E1E4E8;">)        </span><span style="color:#6A737D;">// 用法</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">demandCommand</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;最少需要一个命令&#39;</span><span style="color:#E1E4E8;">)        </span><span style="color:#6A737D;">// 最少要输入的命令个数 例如 直接执行 leek，会提示</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">alias</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;h&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;help&#39;</span><span style="color:#E1E4E8;">)                       </span><span style="color:#6A737D;">// 别名  leek -h</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">alias</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;v&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;version&#39;</span><span style="color:#E1E4E8;">)                    </span><span style="color:#6A737D;">// 别名 leek -v</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">recommendCommands</span><span style="color:#E1E4E8;">()                      </span><span style="color:#6A737D;">// 命令输入错误，会推荐命令</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">wrap</span><span style="color:#E1E4E8;">(cli.</span><span style="color:#B392F0;">terminalWidth</span><span style="color:#E1E4E8;">())                </span><span style="color:#6A737D;">// 设置打印出来命令行的宽度, terminalWidth可以获取命令行完整的宽度</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">epilogue</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;页脚&#39;</span><span style="color:#E1E4E8;">)                          </span><span style="color:#6A737D;">// 设置页脚</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">strict</span><span style="color:#E1E4E8;">()                                 </span><span style="color:#6A737D;">// 严格模式</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">fail</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">err</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">msg</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 命令执行失败处理</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">options</span><span style="color:#E1E4E8;">({                                </span><span style="color:#6A737D;">// 添加多个选项</span></span>
<span class="line"><span style="color:#E1E4E8;">    debug: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&#39;boolean&#39;</span><span style="color:#E1E4E8;">,  </span><span style="color:#6A737D;">// 类型</span></span>
<span class="line"><span style="color:#E1E4E8;">      describe: </span><span style="color:#9ECBFF;">&#39;启动debug模式&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 描述</span></span>
<span class="line"><span style="color:#E1E4E8;">      defaultDescription: </span><span style="color:#9ECBFF;">&#39;info&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 默认值</span></span>
<span class="line"><span style="color:#E1E4E8;">      alias: </span><span style="color:#9ECBFF;">&#39;d&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 别名</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">option</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;registry&#39;</span><span style="color:#E1E4E8;">, {                     </span><span style="color:#6A737D;">// 添加单个选项</span></span>
<span class="line"><span style="color:#E1E4E8;">    hidden: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 命令行看不到  但是能接收到该参数</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: </span><span style="color:#9ECBFF;">&#39;string&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    describe: </span><span style="color:#9ECBFF;">&#39;定义全局仓库地址&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    defaultDescription: </span><span style="color:#9ECBFF;">&#39;www.baidu.com&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    alias: </span><span style="color:#9ECBFF;">&#39;r&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">group</span><span style="color:#E1E4E8;">([</span><span style="color:#9ECBFF;">&#39;debug&#39;</span><span style="color:#E1E4E8;">], </span><span style="color:#9ECBFF;">&#39;Dev Options:&#39;</span><span style="color:#E1E4E8;">)         </span><span style="color:#6A737D;">// 将debug加入到 Dev Options: 分组下</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">command</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;init [name]&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;初始化项目&#39;</span><span style="color:#E1E4E8;">, (</span><span style="color:#FFAB70;">yargs</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> { </span><span style="color:#6A737D;">// 添加命令</span></span>
<span class="line"><span style="color:#E1E4E8;">    yargs.</span><span style="color:#B392F0;">option</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;name&#39;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&#39;string&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      describe: </span><span style="color:#9ECBFF;">&#39;项目名称&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, (</span><span style="color:#FFAB70;">argv</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// leek init xxx</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// argv: { _: [ &#39;init&#39; ], &#39;$0&#39;: &#39;leek&#39;, name: &#39;xxx&#39; }</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">command</span><span style="color:#E1E4E8;">({                                </span><span style="color:#6A737D;">// 添加命令</span></span>
<span class="line"><span style="color:#E1E4E8;">    command: </span><span style="color:#9ECBFF;">&#39;list&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    aliases: [</span><span style="color:#9ECBFF;">&#39;ls&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    describe: </span><span style="color:#9ECBFF;">&#39;list描述&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">builder</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">yargs</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 同上</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">handler</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">argv</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">parse</span><span style="color:#E1E4E8;">(argv, context) </span><span style="color:#6A737D;">// context 被注入到argv</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Dev Options:</span></span>
<span class="line"><span style="color:#6A737D;">// -d, --debug  启动debug模式                                                                                                                        [布尔] [默认值: info]</span></span>
<span class="line"><span style="color:#6A737D;">// 选项：</span></span>
<span class="line"><span style="color:#6A737D;">// -r, --registry  定义全局仓库地址                                                                                                       [字符串] [默认值: www.baidu.com]</span></span>
<span class="line"><span style="color:#6A737D;">// -h, --help      显示帮助信息                                                                                                                                     [布尔]</span></span>
<span class="line"><span style="color:#6A737D;">// -v, --version   显示版本号</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/env node</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">yargs</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;yargs/yargs&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">hideBin</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;yargs/helpers&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">cli</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">yargs</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">argv</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> process.argv.</span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">context</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  leekVersion: </span><span style="color:#032F62;">&#39;1.0.0&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">cli</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">usage</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;leek [command] &lt;options&gt;&#39;</span><span style="color:#24292E;">)        </span><span style="color:#6A737D;">// 用法</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">demandCommand</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;最少需要一个命令&#39;</span><span style="color:#24292E;">)        </span><span style="color:#6A737D;">// 最少要输入的命令个数 例如 直接执行 leek，会提示</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">alias</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;h&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;help&#39;</span><span style="color:#24292E;">)                       </span><span style="color:#6A737D;">// 别名  leek -h</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">alias</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;v&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;version&#39;</span><span style="color:#24292E;">)                    </span><span style="color:#6A737D;">// 别名 leek -v</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">recommendCommands</span><span style="color:#24292E;">()                      </span><span style="color:#6A737D;">// 命令输入错误，会推荐命令</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">wrap</span><span style="color:#24292E;">(cli.</span><span style="color:#6F42C1;">terminalWidth</span><span style="color:#24292E;">())                </span><span style="color:#6A737D;">// 设置打印出来命令行的宽度, terminalWidth可以获取命令行完整的宽度</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">epilogue</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;页脚&#39;</span><span style="color:#24292E;">)                          </span><span style="color:#6A737D;">// 设置页脚</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">strict</span><span style="color:#24292E;">()                                 </span><span style="color:#6A737D;">// 严格模式</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">fail</span><span style="color:#24292E;">((</span><span style="color:#E36209;">err</span><span style="color:#24292E;">, </span><span style="color:#E36209;">msg</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 命令执行失败处理</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">options</span><span style="color:#24292E;">({                                </span><span style="color:#6A737D;">// 添加多个选项</span></span>
<span class="line"><span style="color:#24292E;">    debug: {</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&#39;boolean&#39;</span><span style="color:#24292E;">,  </span><span style="color:#6A737D;">// 类型</span></span>
<span class="line"><span style="color:#24292E;">      describe: </span><span style="color:#032F62;">&#39;启动debug模式&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 描述</span></span>
<span class="line"><span style="color:#24292E;">      defaultDescription: </span><span style="color:#032F62;">&#39;info&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 默认值</span></span>
<span class="line"><span style="color:#24292E;">      alias: </span><span style="color:#032F62;">&#39;d&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 别名</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">option</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;registry&#39;</span><span style="color:#24292E;">, {                     </span><span style="color:#6A737D;">// 添加单个选项</span></span>
<span class="line"><span style="color:#24292E;">    hidden: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 命令行看不到  但是能接收到该参数</span></span>
<span class="line"><span style="color:#24292E;">    type: </span><span style="color:#032F62;">&#39;string&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    describe: </span><span style="color:#032F62;">&#39;定义全局仓库地址&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    defaultDescription: </span><span style="color:#032F62;">&#39;www.baidu.com&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    alias: </span><span style="color:#032F62;">&#39;r&#39;</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">group</span><span style="color:#24292E;">([</span><span style="color:#032F62;">&#39;debug&#39;</span><span style="color:#24292E;">], </span><span style="color:#032F62;">&#39;Dev Options:&#39;</span><span style="color:#24292E;">)         </span><span style="color:#6A737D;">// 将debug加入到 Dev Options: 分组下</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">command</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;init [name]&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;初始化项目&#39;</span><span style="color:#24292E;">, (</span><span style="color:#E36209;">yargs</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> { </span><span style="color:#6A737D;">// 添加命令</span></span>
<span class="line"><span style="color:#24292E;">    yargs.</span><span style="color:#6F42C1;">option</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;name&#39;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&#39;string&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      describe: </span><span style="color:#032F62;">&#39;项目名称&#39;</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  }, (</span><span style="color:#E36209;">argv</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// leek init xxx</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// argv: { _: [ &#39;init&#39; ], &#39;$0&#39;: &#39;leek&#39;, name: &#39;xxx&#39; }</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">command</span><span style="color:#24292E;">({                                </span><span style="color:#6A737D;">// 添加命令</span></span>
<span class="line"><span style="color:#24292E;">    command: </span><span style="color:#032F62;">&#39;list&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    aliases: [</span><span style="color:#032F62;">&#39;ls&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    describe: </span><span style="color:#032F62;">&#39;list描述&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">builder</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">yargs</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 同上</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">handler</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">argv</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">parse</span><span style="color:#24292E;">(argv, context) </span><span style="color:#6A737D;">// context 被注入到argv</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Dev Options:</span></span>
<span class="line"><span style="color:#6A737D;">// -d, --debug  启动debug模式                                                                                                                        [布尔] [默认值: info]</span></span>
<span class="line"><span style="color:#6A737D;">// 选项：</span></span>
<span class="line"><span style="color:#6A737D;">// -r, --registry  定义全局仓库地址                                                                                                       [字符串] [默认值: www.baidu.com]</span></span>
<span class="line"><span style="color:#6A737D;">// -h, --help      显示帮助信息                                                                                                                                     [布尔]</span></span>
<span class="line"><span style="color:#6A737D;">// -v, --version   显示版本号</span></span></code></pre></div>`,2),e=[o];function c(t,r,E,y,i,F){return n(),a("div",null,e)}const D=s(p,[["render",c]]);export{g as __pageData,D as default};
