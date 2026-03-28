# 你还不知道Whistle？打造最舒适的抓包环境！

## 前言

大家好，本次分享的内容是Whistle抓包工具。

其实大家都有各自习惯使用的抓包工具。

常见的抓包工具，诸如`fiddler`、`charles`, 其实都不错，但是一直都不是我心中满意的抓包工具。虽然有些功能确实很强，但是其他方面又比较薄弱（比如mock功能）。再加上版权收费机制，更加劝退了白嫖党。


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d0bf8704e5848318f07849b4f8691b1~tplv-k3u1fbpfcp-watermark.image?)

下面我就分享一下`whistle`的强大功能吧。



## 一、安装
开局，先全局安装`whistle`

```js
npm i -g whistle
```

下载完成后启动
```js
w2 start
```


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92ea9d2af4104c39a4573c09145286a4~tplv-k3u1fbpfcp-watermark.image?)

然后就可以打开`http://127.0.0.1:8899`的本地站点。

<img width="100%" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/866b18e292e94698b5d305eb3136ae27~tplv-k3u1fbpfcp-watermark.image?"/>

非常nice~ 但是现在还不能抓包，因为还没有安装证书。

### 1. 电脑安装证书
想要抓包https请求，那当然得先安装证书了。

<img width="50%" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f14fdec92604855b738e300a4e78fce~tplv-k3u1fbpfcp-watermark.image?"/>

**注意都要勾选**

<img width="50%" src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/625330b7ccd44867b76de5645b0f114d~tplv-k3u1fbpfcp-watermark.image?"/>


由于本人使用的mac电脑，就只给大家展示mac上如何配置，window可以: [参考文章](https://blog.csdn.net/weixin_42290966/article/details/122673654)

点击下载后，直接双击打开

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97f153662c074242b4f4a5d95bd94d1e~tplv-k3u1fbpfcp-watermark.image?)

输入密码后，找到whistle证书，并设置始终信任
<img width="50%" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/509243ee5b414aa0b1ddb1ac80ec88de~tplv-k3u1fbpfcp-watermark.image?"/>

### 2. 手机安装证书
手机设置代理步骤如下：

1. 设置代理 电脑ip:端口
2. 扫描上面的二维码，安装证书
3. 信任证书（此处由于各个手机型号不同，就不详细说明了，可以自行百度）



## 二、UI界面的使用

### 1. 工具栏
首先我们看一下工具栏有哪些功能：

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b7e9e3114f848ca9f67b23b41088f37~tplv-k3u1fbpfcp-watermark.image?" alt="" width="100%" />

+ **record** 开启或关闭请求的记录，如果关闭就看不到请求了
+ **import** 可以导入别人发给你的请求记录。实现共享！后面会介绍`nohost`，功能更加强大。
+ **export** 可以导出当前鼠标选中的某个请求记录。
+ **clear** 用来清除抓包记录的。
+ **replay** 重新发送当前选中的请求
+ **compose** 用于修改当前的请求数据
    
+ **setting** 可以设置抓包的展示
  
  <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f565991709db4400b6c94ed7a1a7a432~tplv-k3u1fbpfcp-watermark.image?" alt="" width="50%" />
  
  在`Exclude Filter`和`Include Filter`中，支持多种写法

  ```
     
     /url1 /url2 /url3 # 用url过滤
     h:header1 header2 # 用header过滤
     s:200 # 用状态码过滤
     i:11 77 # 用ip过滤
     m:get # 用请求方法过滤
     b:keyword1 keyword2 # 用请求体或响应体过滤
  ```
  
  `h:`、`m:`、`s:`、`i:`、`b:` 分别表示匹配`请求响应头`、`请求方法`、`响应状态码`、`ClientIP 及 ServerIP`、`请求响应内容`、`其它表示匹配 url(以上匹配都不区分大小写)`，同一行内容多个匹配用空格隔开，最多支持 3 个，表示对应的内容要同时匹配这三个关键字，不同行表示或的关系。
  
+ **Files** 可以将请求下载成json文件
+ **weinre** 远程调试h5页面，功能有bug，不好用，可忽略
+ **https** 下载证书
+ **help** 文档



### 2. Network网络面板


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e79476e026a4120aed810d464472853~tplv-k3u1fbpfcp-watermark.image?)

抓包时可以使用下方的筛选工具栏，快速筛选出我们想找的请求，同样支持多种匹配方式：

+ 默认模糊匹配url筛选
+ `h:keyword` 搜索请求头和响应头
+ `c:keyword` 搜索内容
+ `p:keyword` 搜索请求协议
+ `i:keyword` 搜索ip
+ `m:keyword` 搜索method
+ `s:keyword` 搜索状态码

### 3. 右键工具栏


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/410b1204c6b142619bef1c2c593a56b3~tplv-k3u1fbpfcp-watermark.image?)

whistle除了顶部的工具栏还支持右键工具，特别是`拷贝cURL`，还有生成二维码都非常方便。下面大概罗列下：

+ **open** 相当于快捷操作，可以打开顶部工具栏或右侧的抓包视图
+ **copy** 这个功能是用来拷贝请求中的一些信息，比较有用的是拷贝`cURL`。
+ **file** 可以将请求的一些信息下载成文件
+ **remove** 快捷删除其他不必要的请求记录
+ **filter** 快捷筛选请求，会被保存到`setting`的配置里
+ **actions** 可以重新发送请求，标记请求等。。
+ **import、export** 导入或导出请求文件
+ **other** 该功能只有在`nohost`中才能使用，可以分享请求给其他人，非常方便。

  <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9f0b3fcc5c34ac2b59d83a4aa0d01ec~tplv-k3u1fbpfcp-watermark.image?" alt="" width="50%" />



**由于功能较多，推荐大家都上手操作一下！！**


### 4. 抓包查看


#### 4.1 请求概览


  <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/305f0d67df54410ba73f34d9a4c646b7~tplv-k3u1fbpfcp-watermark.image?" alt="" width="50%" />
  
在这里我们主要可以看到两部分：
1. 请求的概览

2. 命中了哪些规则
   
   **这个就非常有用了，能知道你的规则有没有写对，否则不会匹配上**


那什么是规则呢？这里先跳过，后面会讲到

#### 4.2 请求查看

  <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e48ddb7911ba4e13b3b2d4e2a0aaf84b~tplv-k3u1fbpfcp-watermark.image?" alt="" width="70%" />

在这里我们能看到请求的所有信息。但是大家注意，可以把鼠标放到请求响应那里，我们会看到右上角有一些小功能。

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41794572a3fd4e83920e25611e6c9922~tplv-k3u1fbpfcp-watermark.image?" alt="" width="70%" />

+ **Copy** 可以直接拷贝响应值
+ **Download** 下载响应内容
+ **Key**

  什么是`Key`呢？
  
  首先**whistle**会将你的请求路径中最后一段，设置为这个数据的`Key`。然后将该数据保存到最左边的`Values`中。如下图：
  
    <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32a85faf4d4f42e5aaf6396e54c821f4~tplv-k3u1fbpfcp-watermark.image?" alt="" width="100%" />
    
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a48d36b771bd4b91b0a22aa01c0bb851~tplv-k3u1fbpfcp-watermark.image?" alt="" width="60%" />
  
  这块的作用，后续会讲~
    
+ **Text** 直接展示格式化后的响应文本。推荐大家使用这种模式，不需要手动展开。


#### 4.3 Timeline、Composer
详细用法就不多介绍了，也很简单~
+ **Timeline** 查看请求时间线
+ **Composer** 修改请求，并重新发送。


#### 4.4 Tools
Tools的功能就比较强大了，能直接看到页面的console.xx日志、以及一些实用工具。

+ **Console**

支持查看页面的log日志，但是需要一些配置

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2197c4d1dee0490eb68924e424accc44~tplv-k3u1fbpfcp-watermark.image?" alt="" width="60%" />

在你的规则中添加如下代码, 前面是你的页面路径，正常直接填域名就可以了。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1eeb26b2b02b4d058b44241925b3b1f3~tplv-k3u1fbpfcp-watermark.image?" alt="" width="60%" />

```js
www.baidu.com log://
```

+ **Server**
  可以查看服务端的日志，一般不用
  
+ **Toolbox** 
  
  一些常用工具集合，如二维码生成，编码和解码等
  
  <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48a79dd469ec442182686b5efade1eaa~tplv-k3u1fbpfcp-watermark.image?" alt="" width="60%" />
  
## 三、什么是Whistle规则?

**在whistle中，规则是它最为核心的功能，可以实现非常多有用的抓包功能。**

我们可以在`Rules`中编写规则

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a462ab66df8e45319b7a8201b112bcc1~tplv-k3u1fbpfcp-watermark.image?" alt="" width="100%" />

以`hosts`为例，正常需要找到电脑中的`hosts`的文件，然后编写映射,然而，在`whislte`中你可以这么写, 并且实现了同样的效果。如：
```
127.0.0.1 www.baidu.com
```



免除了我们找配置文件的麻烦，并且它的强大远不止于此。

Whistle的规则支持两种写法：

1.  **默认方式**

    默认是将匹配模式写在左边，操作uri写在右边

    ```
     pattern operatorURI
    ```

    whistle将请求url与pattern匹配，如果匹配到就执行operatorURI对应的操作

2.  **组合方式**

    传统hosts的配置对多个域名对于同一个ip可以采用这种方式：

    ```
     127.0.0.1  www.test1.com www.test2.com www.testN.com
    ```

    whistle完全兼容传统hosts配置方式，且支持更多的组合方式：

    ```
     # 传统组合方式
     pattern operatorURI1 operatorURI2 operatorURIN

     # 如果pattern部分为路径或域名，且operatorURI为域名或路径
     # 这种情况下也支持一个操作对应多个pattern
     operatorURI pattern1 pattern2 patternN
    ```
    
## 四、匹配模式
whistle的匹配模式(`pattern`)大体可以分成 **域名、路径、正则、通配符匹配**：

### 1. 域名匹配

```
# 匹配域名www.test.com下的所有请求，包括http、https、ws、wss，tunnel
www.test.com operatorURI

# 匹配域名www.test.com下的所有http请求
http://www.test.com operatorURI

# 匹配域名www.test.com下的所有https请求
https://www.test.com operatorURI

# 上述匹配也可以限定域名的端口号
www.test.com:8888 operatorURI # 8888端口
www.test.com/ operatorURI # http为80端口，其它443端口
```

### 2. 路径匹配

```
# 限定请求协议，只能匹配http请求
http://www.test.com/xxx operatorURI
http://www.test.com:8080/xxx operatorURI

# 匹配指定路径下的所有请求
www.test.com/xxx operatorURI
www.test.com:8080/xxx operatorURI
```
### 3. 正则匹配

```
#匹配所有请求
* operatorURI

#匹配url里面包含多个关键字的请求，且忽略大小写
/keyword/i operatorURI

# 利用子匹配把url里面的参数带到匹配的操作uri
# 下面正则将把请求里面的文件名称，带到匹配的操作uri
# 最多支持10个子匹配 $0...9，其中$0表示整个请求url，其它跟正则的子匹配一样
/[^?#]/([^/]+).html/ protocol://...$1...
```

### 4. 通配符匹配

```js
# 以www开头
^www.example.com/test/*** referer://http://www.test.com/$1

# 限定结束位置，以www开头，以test结尾
^www.example.com/test/***test$ referer://http://www.test.com/$1
```


## 五、Whistle常用操作汇总

### 1. 数据Mock

#### 方式1：Key-Values

创建一个名为resData的Value

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e33c9fe2d4e14f82892d9a25831b0556~tplv-k3u1fbpfcp-watermark.image?" alt="" width="70%" />

然后再Rules中编写规则如下：
<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5b0bfbaa83045aa8f4f0d3c441ec6a3~tplv-k3u1fbpfcp-watermark.image?" alt="" width="70%" />

```
/api/getInfo resBody://{resData}
```
在括号中，填写上`resData`就可以mock你在`Values`中填写的数据了。

**注意，括号里的名字是自己随便取的，要和Values中的Key对应上**

#### 方式2：模板写法

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/915dca0e331b4e9490a8dd25026562fb~tplv-k3u1fbpfcp-watermark.image?" alt="" width="80%" />

直接在规则里面添加\`\`\`反引号，后面跟一个变量名, 就可以定义一个模板变量（**变量名一定要对应上**）


#### 方式3：模板变量写法


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d785ca446aa4903a0104939f10f9846~tplv-k3u1fbpfcp-watermark.image?)

可以看到，我们在模板中使用了一些变量，例如`url`、`port`、`method`。其实这些都是whislte帮我们注入的，也就是说我们能在返回值中，直接引用请求的一些属性参数等。


#### 方式4：automock插件
虽然上面的mock方式已经够简洁了，但是还不够，我们安装一个插件（注意：如果你是非前端开发者，需要安装[Node环境](https://nodejs.org/)）


首先命令行中全局安装下面的插件：

```
npm i -g whistle.automock
```

找到`Plugins`里的`automock`并打开

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e910209377143de8731db4d815316a2~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c97826a4503497db4a4754e5714f81e~tplv-k3u1fbpfcp-watermark.image?)

但是此时还不能使用，你需要去编写规则，我们以掘金为例：

```js
/api.juejin.cn/ automock://href
```

> 这里我用了正则表达式匹配，你也可以使用前面提到的其他方式


点击打开`Mock开关`, 然后就可以直接修改响应内容并保存了~ 相关细节大家可以自己摸索

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ac44fdd804142e895bc3ee49b23b6de~tplv-k3u1fbpfcp-watermark.image?)


### 2. 响应状态码Mock
```
/api.juejin.cn\/xxx/ replaceStatus://200
```


### 3. 修改、替换JS

#### 场景1：添加sourcemap并debug线上原始代码

继续以掘金为例，找到一个js文件资源

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a60090bf6d247deaf3b087bb4007f53~tplv-k3u1fbpfcp-watermark.image?)


```
//# sourceMappingURL=https://xxxx/obj/static/xxxx/e66b202.js.map
```

我们可以为它最后添加sourcemap, **当然, 这里仅仅是个例子，需要你手动build线上的项目，获取到它的sourcemap文件。**





**Rules中的配置：**
<pre class="language-text" copy-code-registered><code class="hljs language-bash"># 这一步为js文件插入了sourceMappingURL
/app\.990d7bb3\.js/ jsAppend://`{sourcemap}` 

```sourcemap
//# sourceMappingURL=${url}.map
```

/app\.990d7bb3\.js\.map/ file://{sourcemapfile}
</code></pre>

其实就两步：
+ 注入sourceMappingURL注释
+ 请求sourceMappingURL的文件时，返回对应的map.

这里需要你在`Values`创建一个`Key`, 名为`sourcemapfile`, 里面填上你的sourcemap代码即可。

最后的效果如下：

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b02c9fcf308406686da85a2f8fa7eac~tplv-k3u1fbpfcp-watermark.image?" alt="" width="100%" />

然后你就可以愉快的调试线上代码了~

#### 场景2：修改线上代码查看运行结果
<pre class="language-text" copy-code-registered><code class="hljs language-bash">/e66b202\.js/ jsBody://{source}

```source
// 这里填写拷贝过来的线上代码， 然后可以直接修改
```
</code></pre>




### 4. 修改、替换CSS

#### 场景1：替换CSS文件

例如`xxx.css`的内容替换为`cssContent`中的内容
<pre class="language-text" copy-code-registered><code class="hljs language-bash">
/xxx.css/ cssBody://{cssContent}

```cssContent
div {
  color: red
}
```
</code></pre>

#### 场景2：添加CSS内容

使用`cssAppend`和`cssPrepend`就可以在css代码的后面和前面插入代码。
<pre class="language-text" copy-code-registered><code class="hljs language-bash">/xxx.css/ cssAppend://{cssContent}

```cssContent
div {
  color: red
}
```
</code></pre>


### 5. 修改、替换HTML

#### 场景1：注入vConsole

这里使用了`htmlAppend`

<pre class="language-text" copy-code-registered><code class="hljs language-bash">www.baidu.com htmlAppend://{injectConsole}

```injectConsole
&lt;script src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
  var vConsole = new window.VConsole();
&lt;/script&gt
```
</code></pre>


<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb174c0a1b9249d9a00e44daa41ef1d6~tplv-k3u1fbpfcp-watermark.image?" alt="" width="100%" />

#### 场景2：注入神策或其他需要尽早执行的SDK

这里使用了`htmlPrepend`

<pre class="language-text" copy-code-registered><code class="hljs language-bash">juejin.cn htmlPrepend://{injectConsole}

```injectConsole
&lt;script src="https://cdn.bootcdn.net/ajax/libs/vConsole/3.14.7/vconsole.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
  var vConsole = new window.VConsole();
&lt;/script&gt
```
</code></pre>


### 7. 请求转发

#### 场景1：测试环境代理到本地

<pre class="language-text" copy-code-registered><code class="hljs language-bash"># 先把请求转到test环境
xxx.dev.cn xxx.test.cn

# 替换dev环境请求中的token
xxx.dev.cn reqHeaders://{testTodev}
```testTodev
authorization: 这里可以填写test环境的token
```
</code></pre>



### 8. log调试

#### 方式1：inspect插件

安装`inspect`插件，可以注入`vConsole`、`mdebug`等Log日志工具

```
npm i -g whistle.inspect
```

编写规则
```js
# 默认 vConsole
juejin.cn whistle.inspect://

# 注入vConsole
juejin.cn whistle.inspect://vConsole

# 注入mdebug
juejin.cn whistle.inspect://mdebug

# 注入eruda
juejin.cn whistle.inspect://mdebug
```

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f295267ce304c179e128040ca4cd714~tplv-k3u1fbpfcp-watermark.image?" alt="" width="60%" />


#### 方式2：log规则

```
juejin.cn log://
```

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8768bc2768374503a0ea7756ffab7b9d~tplv-k3u1fbpfcp-watermark.image?" alt="" width="80%" />


#### 方式3：chii插件
这个插件内置了`Chrome DevTools`, 可以直接使用chrome调试页面。

首先安装`whistle.chii`插件
```
npm i -g whistle.chii
```

然后编写规则
```
juejin.cn whistle.chii://
```

按如下步骤操作。

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21ef4911443c4df587be3a7513a3caf6~tplv-k3u1fbpfcp-watermark.image?" alt="" width="100%" />

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff29b6dd0a48439fa332231a24543764~tplv-k3u1fbpfcp-watermark.image?" alt="" width="60%" />

点击inspect后就能看到调试页面（不支持debug源码）

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d54b666db8f43f280036d587289d8c5~tplv-k3u1fbpfcp-watermark.image?" alt="" width="100%" />


### 9. 设置跨域

通过代理，在开发环境中，我们就不需要后端去设置cors了。

```
xxx.dev.cn resCors://*
```

### 10. 延迟返回

延迟1000ms返回
```js
xxx.dev.cn/api/info resDelay://10000
```


## 六、Nohost 抓包调试平台


Nohost 是基于 Whistle 实现的环境配置与抓包调试平台支持多账号、多独立环境。现在已经在我们的团队中部署, 效率确实有一定的提高。它的用法我就不多阐述了。下面是github和相关文档：

+ [github地址](https://github.com/Tencent/nohost)
+ [官方文档](https://nohost.pro/)


### nohost的功能亮点
nohost除了提供了Whislte基础的功能以外，还实现了很多实用的功能，下面来简单介绍一下

#### 功能1：分享链接

这个功能就很方便了，不管对方是开发还是测试，都可以通过链接获取完整的请求和响应信息

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bcd59b9cbbaa43c29c67b6cee3b5c215~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4c17d8f48914fe9804ce611c3463e9e~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84f87d2e01d24c65adf004c7b7c8343e~tplv-k3u1fbpfcp-watermark.image?)


#### 功能2：共享规则

在`Rules`中输入`@`符号，就有相应的提示，能直接使用别人写好的规则，非常方便~

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df9913922fe7425089688af0a067cd43~tplv-k3u1fbpfcp-watermark.image?)



## 参考

+ [Whistle文档](https://wproxy.org/whistle/)
