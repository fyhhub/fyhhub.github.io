:::tips
本文摘抄自文章：https://juejin.cn/post/7350934681830686774
:::

# git config介绍

作为现代软件开发中不可或缺的工具之一，Git 不仅提供了强大的版本控制功能，还允许用户根据自己的需求进行个性化配置。其中，`git config` 命令是我们最常用的管理 Git 配置的工具。

### git config的作用域

Git 配置存储了用户和仓库的特定配置项，例如用户名、邮箱、默认编辑器、远程仓库地址等。这些配置信息存储在三个不同的地方，对不同的范围生效：

- **系统级别配置-system**：适用于整个系统的配置，这个很少见。通常存储在 `/etc/gitconfig` 文件中。
- **全局配置-global**：适用于当前用户的配置，我们最常用的配置。通常存储在 `~/.gitconfig` 文件中。
- **仓库级别配置-local**：适用于当前 Git 仓库的配置，每个项目的仓库中都有一个。通常存储在仓库的 `.git/config` 文件中。

> 以上三个配置优先级：**仓库级 > 全局 > 系统级**

### git config常用配置项

1. **user.name**：这个配置项设置了提交代码时使用的用户名，它将被包含在每个提交记录中，以标识谁做了哪些更改。
2. **user.email**：这个配置项设置了提交代码时使用的邮箱地址，用来与用户名一起标识提交者的身份。
3. **core.editor**：设置默认的文本编辑器。当需要编辑提交消息或解决合并冲突时，Git 会自动调用这个编辑器。**默认是nano,也可以设置为vim、gedit、notepad++、vscode等，nano我用起来不太习惯，vim、vscode都还可以**
4. **core.ignorecase**：控制文件名在 Git 中的大小写敏感性。**默认是False，如果设置为 true，Git 将会忽略文件名的大小写差异。**
5. **color.ui**：启用或禁用 Git 输出的彩色显示，使得在终端中更易于区分不同部分。**默认是False，通过设置 `color.ui` 为 `true`，就可以启用全局的 Git 控制台颜色，同时也支持自定义 Git 控制台的颜色方案。**
6. **alias.**：通过设置别名，你可以为常用的 Git 命令创建简短的快捷方式，从而提高工作效率。**默认没有，类似linux的alias**
7. **http.proxy**：当需要通过代理服务器访问远程仓库时，可以使用此配置项指定 HTTP 代理。**默认没有，这个貌似比较适合挂外网和公司的梯子，不过我没用过。**
8. **http.postBuffer**：缓存区大小，如果文件过大rpc失败可以调大此配置。**默认是1 MB，根本不够用的，推荐设置成1048576000，1个G**
9. **http.sslVerify**：控制是否验证远程仓库的 SSL 证书。在一些情况下，可能**默认是true,必要情况下需要禁用 SSL 验证也可以设置成false，但这会增加安全风险。**
10. **push.default**：设置推送行为，默认情况下，它确定了在不指定分支名称时 Git 应该推送的分支。
11. **credential.helper**：用于设置 Git 如何存储和检索认证信息，例如用户名和密码，以便于在与远程仓库通信时使用。**默认NONE，可设置`cache`, `store`，`osxkeychai`**
12. **fetch.prune**：设置是否在拉取远程分支时删除本地不存在的远程分支。**默认false**
13. **diff.tool**：设置默认的文件差异比较工具，用于比较文件之间的差异。
14. **merge.tool**：类似于 `diff.tool`，这个配置项设置了默认的合并工具，用于解决代码合并时的冲突。
15. **remote.origin.url**：设置远程仓库的 URL，用于指定与之通信的远程地址。
16. **remote.origin.fetch**：设置从远程仓库拉取的默认分支。
17. **init.defaultBranch**：设置新建仓库时的默认分支名称。
18. **gc.auto**：设置自动垃圾回收的触发条件。
19. **rerere.enabled**：启用或禁用 Git 中的 Rerere 功能，它可以帮助自动重用先前解决的合并冲突。

**以下是global和local的默认配置：**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a52d63a34d8c4c899d6fadf29d9eeb5f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=297&h=135&s=22828&e=png&b=030303)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fa9af6ce0784bc480833a36b1381377~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=470&h=342&s=64553&e=png&b=010101)

### git config的操作指令

> [Git---git config操作大全 查看和操作配置参数\_git config --list-CSDN博客](https://link.juejin.cn/?target=https%3A%2F%2Fblog.csdn.net%2FHO1_K%2Farticle%2Fdetails%2F121038247 "https://blog.csdn.net/HO1_K/article/details/121038247")

`git config` 命令是 Git 中用来配置参数的主要工具。通过它，你可以在全局、当前用户、或者当前仓库级别设置各种配置项。以下是一些常见的 `git config` 命令行操作示例：

1. 查看当前配置

要查看当前 Git 配置的所有项及其对应的值，可以使用 `--list`或 `-l`参数。仅查看，不可编辑。**对于nano编辑器，单击q可退出**

> 查看默认配置，目录在哪里就显示哪里的配置。


```
git config --list
```

> 查看系统配置


```
git config --system --list
``` 

> 查看全局配置



```
git config --global --list
``` 

> 查看本地配置

```
git config --local --list
``` 

2. 查看特定配置项

如果只想查看特定的配置项，可以直接指定它的名称进行查看：


```
git config user.name
``` 

3. 设置配置项

也可以直接制定名称设置 Git 配置：

```
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"` 
```
4. 清除配置项

如果想清除某个配置项的值：


```
git config --unset user.name
``` 

5. 编辑配置项


```
git config --local -e
``` 

## 常见的缓存区限制问题

事情的起因是我想要将一个接近**800MB**的数据上传的gitee的仓库中，但是报错如下：


```
error: RPC failed; curl 56 Recv failure: Connection reset by peer fetch-pack: 
unexpected disconnect while reading sideband packet fatal: early EOF fatal: 
fetch-pack: invalid index-pack output
``` 

**"error: RPC failed; curl 56 Recv failure" 是一个常见的 Git 错误消息，通常表明 Git 在与远程仓库通信时发生了问题。这个错误的原因可能有很多，一般导致这个错误的原因就是以下几种：**

1. **网络问题**：这是最常见的原因之一。可能是网络连接不稳定或者与远程仓库之间存在防火墙或代理问题。
2. **远程服务器问题**：远程仓库服务器可能存在问题，导致无法完成通信。在这种情况下，只能等待远程服务器恢复正常。
3. **SSL证书问题**：可能是由于 SSL 证书的问题，导致无法建立安全连接。尝试在 Git 命令中使用 `-c http.sslVerify=false` 参数来禁用 SSL 验证，以查看问题是否与证书有关。
4. **文件大小限制**：可能是由于 Git 客户端或服务器配置了文件大小限制，导致无法传输大文件。可以尝试增加 Git 客户端的缓冲区大小。

> 参考博客：[git拉代码时报错error: RPC failed； curl 56 Recv failure: Connection reset by peer  fatal: The remote end hu\_error: rpc failed; curl 56 recv failure: connectio\_enoshxu的博客-CSDN博客](https://link.juejin.cn/?target=https%3A%2F%2Fblog.csdn.net%2Fqq_31752115%2Farticle%2Fdetails%2F108118260 "https://blog.csdn.net/qq_31752115/article/details/108118260")

根据我的排查，我在做小的变动时和这个仓库连接都没有问题，所以只可能是缓存区太小，不能传输过大的数据。 同样的，git clone代码时，如果项目总大小比较小时克隆代码没问题，占用内存比较大时就会如上报错。



```
git config --global http.postBuffer
``` 

通过命令查看到当前缓存区过小 ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9cf770aa2a5d41ec83fe4b752319ea7b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=588&h=64&s=19586&e=png&b=010101)



```
git config --global http.postBuffer 1048576000
``` 

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6fc1b3fe7cbe44b19664060ee0a5fa65~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=670&h=99&s=37793&e=png&b=010101)

此时再进行git push即可成功。