# 一、完整的Git Workflow

## 1. ssh登录设置

设置用户名和邮箱

```bash
git config –global user.name "xxx"
git config –global user.email "xxxx@xx.xx"
```

生成密钥

```bash
ssh-keygen -t rsa -C "xxx@xxx.cn"
```

找到`~/.ssh/id_rsa.pub`并复制内容。
gitlab上创建ssh将刚才复制的内容粘贴上去，title随便取个名字。

## 2. git clone

**有如下几种克隆代码的形式：**

1.  全量拉取所有代码和commit

```markdown
git clone git@xxx.git
```

2.  我们只克隆下包含最近一次commit的一个分支，这样这个项目文件就不会很大。

**使用场景：你只是想clone最新版本来使用或学习，而不是参与整个项目的开发工作**

```markdown
git clone --depth 1 git@xxxxx.git
```

3.  可以选择只拉取某个分支

```markdown
git clone -b feature-xxx  git@xxxxx.git
```

## 3. 创建并切换分支

创建 + 切换分支

```bash
git checkout -b feature-xxx
```

切换分支

```bash
git checkout feature-xxx
```

分支命名规范

*   新需求和特性：   feature-模块名-姓名缩写
*   bug修复（待确定）：  fix-模块名-姓名缩写

## 4. git add

```bash
git add 1.txt # 添加1.txt到暂存区

git add . # 添加所有文件到暂存区
```

## 5. git commit -m "xxx"

```bash
git commit -m "xxx" # 提交commit
```

## 6. git log

```bash
git log # 查看log日志

git log --stat # 查看大致改动，可以看到修改的文件
```

## 7. git show

```bash
git show 70f68aa8fcfcea1054fb790ab9879f48c2598aa4 # 查看commit详情
```

## 6. git push

```bash
git push # 上传commit

git push --force # 强制上传commit
```

## 7. git pull

```bash
git pull # 拉取当前分支的远程代码

git pull origin master # 拉取master的远程代码
```

## 8. 创建merge request

## 9. 解决冲突

（1）假设当前处于 `feature-xxx` 的分支, 你即将合并`test`分支
（2）创建merge request后发现有merge conflict
（3）首先你需要 `创建并切换 或 直接切换`到 `test-conflict`这个解决冲突的分支

```bash
git checkout test-conflict

# 如果没有这个分支，就创建并切换过去
git checkout -b test-conflict
```

（4）当前处于`test-conflict`分支, 你需要如下操作

```bash
git pull # 拉取当前最新远程代码

git pull origin test # 拉取 test 的代码

git pull origin feature-xxx # 拉取你自己的代码

git add .

git commit -m "merge: reolve conflict" # 创建commit

git push
```

（5）创建Merge request, 此时是从`test-conflict`合并到`test`

相信到这里你已经明白如何处理了，其他环境同理。
**简单理解下来，其实解决分支冲突，核心在于需要你为目标分支再切换出来一个分支，避免污染分支。**

## 10. 删除分支

在开发完成后，可以考虑删除当前的分支

```bash
git checkout xxx # 先切换到别的分支，再删除
git push origin --delete [branch_name] # 删除远程
git branch -D [branch_name] # 删除本地分支
```

# 二、危险操作

## 1. 拉取work、test、ut环境分支代码 ❌

禁止拉取work、test、ut环境分支，如果合并到线上，可能会导致线上代码被污染出现Bug!

```bash
git pull origin test # 错误操作
```

## 2. 回退远程代码 ⚠️

通常我们在网上看到的回退操作，有不少是通过`git reset`进行完成的，但是这个操作是比较危险的，经常会出现你明明修改了代码，但是你merge上去之后，什么也没更改。
**所以，在回退代码方面，推荐大家使用**`git revert`**操作。**

回退代码的原理，其实就是把你之前的代码修改，再进行反向修改。例如你进行了如下操作：

1.  基于master切了一个分支`feature-test`
2.  删除一行代码，然后提交产生了`Commit(C)`
3.  执行git revert xx之后，代码会自动反向修改，恢复那一行代码，产生Merge Commit(D)

此时的git树如下:
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f9a6c0217284b67ae7794347896c687~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1189\&h=603\&s=31847\&e=jpg\&b=ffffff)

下面来介绍回退代码的几种操作

### （1）回退某一个commit

```bash
git revert 产生新commit（推荐）
git log # 通过日志，找到你想回退代码的commitid

git revert 425e6dd10b86783 # 回退某个commit
```

![16945128530041694512852094.png转存失败，建议直接上传图片文件](https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16945128530041694512852094.png)

在你执行`git revert`后，会产生一个新的commitId, 并且会出现一个message编辑器, 你可以修改revert产生的commit message

### （2）回退多个commit

有如下两个commitid， `A`和`B`
![16945129020031694512901092.png转存失败，建议直接上传图片文件](https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16945129020031694512901092.png)

可通过如下命令回退多个commit

```bash
git revert OLDER_COMMIT^..NEWER_COMMIT # 回退几个commit就产生几个新commit

git -n revert OLDER_COMMIT^..NEWER_COMMIT # 回退的commit, 合并成一个
```

在上面的例子中，我们执行如下命令

```bash
git revert -n 82e9029759976b9bbba6d47adf68f6a2eeafea88^..64b4646ec1ff9e3d608e583563fefd834a23b062
```

然后你还需要重新commit, 这样你就回退了

```bash
git commit -m "revert: A, B"
```

### （3）回退merge

如果你按照上面学习到的，`git revert xxx`回退一个merge, 那么一定会出现如下问题：

```bash
git revert 83e2776
error: commit 83e2776adb7a47617fbd181228906e52ada396ac is a merge but no -m option was given.
fatal: revert failed
```

为什么呢？因为此时git不知道要做什么。merge commit是两个分支的汇合点。本质上这两个分支地位是完全相等的。例如下面的图中，master在合并后，从`Commit(B)`移动到了`Commit(Merge)`, 此时的指针是与`feature-test`重叠的。
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/623f24b8c0914df18beb91f026498836~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1798\&h=634\&s=52297\&e=jpg\&b=ffffff)

然后继续执行如下命令：

```bash
git revert -m 1 83e2776
```

这里`-m 1`其实就是保留目标分支，回退`feature分支`上的代码。所以，一般来讲，我们都用`-m 1`即可。

## 3. 回退本地代码 ⚠️

### （1）git reset

此处有三个`commit`, 如果我想回退掉`前面两个commit`

![16945129970051694512996416.png转存失败，建议直接上传图片文件](https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16945129970051694512996416.png)

获取最下面的`commitid`, 然后执行：

```bash
git reset --soft 3ffc7c6856e207d45ee71d4dd1fd53f215c9d008 # 先回退
```

回退完成后，你会发现你的工作区多出了被回退的代码，此时如果你想push上去，是不行的，需要强制push。

```bash
git push --force
```

如果你后悔了刚才的回退操作, 就需要重新commit工作区的代码。

### （2）git rebase 方式

请参考后面 `git rebase`的相关用法

# 三、git rebase VS git merge

不知怎么，`git rebase` 一直被认为初学者不应该学习它，但它实际上可以让开发团队在使用时更加轻松。我们将 `git rebase` 与 `git merge` 命令进行比较。在 Git 工作流中，说明所有可以使用 rebase 的场景

## 1. git merge

**注意：一般我们合并代码，直接使用Gitlab可视界面即可。**
最简单的方式是通过以下命令将 master 分支合并到 feature 分支中：

```bash
git checkout feature
git merge master
```

或者，你可以将其浓缩为一行命令：

```bash
git merge feature master
```

这会在 feature 分支中创建一个新的 **merge commit**，它将两个分支的历史联系在一起，请看如下所示的分支结构：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f76bb7ab03fb43c2ad06b30f44b10420~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1919\&h=928\&s=50526\&e=jpg\&b=ffffff)

使用 merge 是很好的方式，因为它是一种 **非破坏性的** 操作。现有分支不会以任何方式被更改。这避免了 rebase 操作所产生的潜在缺陷（下面讨论）。
另一方面，这也意味着 feature 分支每次需要合并上游更改时，它都将产生一个额外的合并提交。如果master 提交非常活跃，这可能会严重污染你的 feature 分支历史记录。尽管可以使用高级选项 git log 缓解此问题，**但它可能使其他开发人员难以理解项目的历史记录（此处仅做讨论，组内规范仍然使用merge流程）**

## 2. git rebase

可以理解为“重新设置基线”（重新设置分支比较的起点commit），并将“新基线”以后的commit拷贝到指定的分支上。所有当前分支上在“新基线”以后的commit会被copy一份存储到一个临时区域，然后按顺序应用到指定分支上

```bash
git checkout feature
git rebase master
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80295d6d477a4943950832fe379d1f64~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1818\&h=855\&s=45574\&e=jpg\&b=ffffff)

大家可能注意到了，`master`是落后于`feature`的，需要我们在`master` 上将`feature`分支合并过来。当然，你也可以使用Gitlab可视界面合并。

```bash
git checkout master

git merge feature
```

# 四、强大的git rebase

## 1. git rebase 注意事项 ⚠️

使用git rebase的注意事项，请一定遵守。

1.  **公共分支不rebase**
2.  **已经push的部分不rebase**

线上提交执行变基会导致什么结果：
（1）你在本地对部分线上提交进行了变基，这部分提交我们称之为a，a在变基之后commit id 发生了变化
（2）你在本地改变的这些提交有可能存在于你的同事的开发分支中，我们称之为b，他们与a的内容相同，commit id 不同
（3）如果你把变基结果强行push 到远程仓库后，你的同事在本地执行git pull 的时候会导致a 和b 发生融合，且都出现在了历史提交中，导致你的变基行为无效

## 2. 修改commit顺序

![16945130650061694513064428.png转存失败，建议直接上传图片文件](https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16945130650061694513064428.png)

如果你想处理从 commit A 到最新的commit, 你需要获取这个范围外的第一条，也就是图上的最后一条commit

```bash
git rebase -i 086cbb47628be91b3cc2407056d231fe8c75a120
```

第一条是最老的commit记录。最后一条是最新的。
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0b81d3873ac4d40bf4bd265a6de8584~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1358\&h=626\&s=195006\&e=png\&b=292c33)
然后交换位置后， `:wq`保存。
![16945131010071694513100146.png转存失败，建议直接上传图片文件](https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16945131010071694513100146.png)

可以看到，两条commit顺序变了。
![16945131340081694513133790.png转存失败，建议直接上传图片文件](https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16945131340081694513133790.png)

## 3. 回退commit

注意：日常不推荐使用，会导致落后于master分支，你的更改将不会产生新的merge。

```bash
git rebase -i 086cbb47628be91b3cc2407056d231fe8c75a120
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f01e4cd416f34a9b87574b90e1c197bf~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=578\&h=102\&s=16391\&e=png\&b=292c33)
与上面的操作一样，你需要把`pick`改成`d`或者`drop`, 你也可以直接删除这一行，保存之后就会回退commit, 但是这条commit会被删除，请谨慎操作。

## 4. 修改commit

```bash
git rebase -i 086cbb47628be91b3cc2407056d231fe8c75a120
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b286e3593fb4835bfbfa20f3890089c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=454\&h=110\&s=15782\&e=png\&b=292c33)
将`pick`改成`e`或`edit`。然后`:wq`保存和退出编辑。
控制台会打印如下内容：
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b62aaca53f740e69ea1d75af1dd2e19~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=992\&h=338\&s=68104\&e=png\&b=292c33)
此时你会进入编辑commit的状态，这时候你修改代码。
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1aaf38473a844a20976d2fc1516aa14b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1476\&h=204\&s=40685\&e=png\&b=2a2d34)
再执行：

```bash
git add .
git rebase --continue
```

然后会进入编辑commit message的状态, 在这一步你可以修改commit message
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56f23370c0504d9e953caa71bef289a9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1212\&h=566\&s=137422\&e=png\&b=292c33)
保存后，你的commit就被修改了。
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea286bdfa2f84366989a90ae6b1dac4e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1098\&h=166\&s=50062\&e=png\&b=292c33)

## 5. 合并commit

如果你想让自己的commit好看一点，你可以把你这次需求所有的commit进行合并。有如下三个commit
![16945131890091694513188285.png转存失败，建议直接上传图片文件](https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16945131890091694513188285.png)

```bash
git rebase -i 086cbb47628be91b3cc2407056d231fe8c75a120
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4eeefc284564417e804c8393ece79d93~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1386\&h=720\&s=226865\&e=png\&b=292c33)
修改一下：
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a99f6efffe3f4fa086d2d4c7bf61419c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=522\&h=128\&s=22204\&e=png\&b=292c33)
将`pick`改成`s`或`squash`, 这个意思是把commit合并到前一个commit。在上面的例子中，都被合并到了commit A
git会将三个commit 的message也进行合并, 你也可以编辑commit A的 message
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2dc2b7b592be4084820da305a86a5c53~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1190\&h=458\&s=61244\&e=png\&b=292c33)
最后只剩下一个 commit
![16945132900121694513289777.png转存失败，建议直接上传图片文件](https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16945132900121694513289777.png)

如果你闲麻烦，想直接合并，省略掉编辑message的过程，可以这样：

```bash
pick xxx feat: A

# 改成

f xxx feat: A
```

##

#

# 五、git cherry-pick

`git cherry-pick`命令的作用，就是将指定的提交（commit）应用于其他分支。
比如，你的`feature-A`分支上产生了一个commit (086cbb47628be91b3cc2407056d231fe8c75a120)
另一位同学`feature-B`也想用你的这份代码，但是其他的代码并不想要，可以这么操作

```bash
git checkout feature-B
git cherry-pick 086cbb47628be91b3cc2407056d231fe8c75a120
```

也支持同时多个cmmit

```bash
git cherry-pick A B C
```

支持某个范围

```bash
git cherry-pick A^..B # A是最老的commit
```

# 六、git stash

你可能会遇到这样的场景：在`feature-A`分支上开发，突然来了另一个需求，但是我不想 commit提交我的代码，想直接进入`feature-B`的开发。正常来讲这肯定是不行的，但是我们可以用`git stash`临时将代码存放起来。

`git stash`的用法相当简单：

```bash
git stash # 先临时存起来

git checkout feature-B # 切换到另外的分支
```

开发完成后，再恢复过来:

```bash
git checkout feature-A # 切换回来

git stash list # 可以查看stash 记录
git stash apply # 恢复代码
```

当然，你也可以用可视界面操作：
![16945133630151694513362864.png转存失败，建议直接上传图片文件](<转存失败，建议直接上传图片文件 https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16945133630151694513362864.png>)

# 七、VSCode插件推荐

## 1. Gitlen

非常推荐安装

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/315ef9a492574548a3b06897375fdd89~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=357\&h=71\&s=15852\&e=png\&b=202227)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db39c6b199cc4811b2d7a75676180f0b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=366\&h=210\&s=14027\&e=png\&b=2e3139)
可以看到每一行，每一个文件的commit记录。鼠标放在代码上也可以看到最近谁更改了这一行
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66be2ed764fc471dbc8f03ca46f08420~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=435\&h=73\&s=7956\&e=png\&b=262930)

## 2. Gitlab Workflow

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86979707c01f426db4c061d8283f1de2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=367\&h=75\&s=11581\&e=png\&b=24262c)

可以一键创建MR

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15ac89c4bf544232a0e227c03b8c9cc8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=153\&h=54\&s=3610\&e=png\&b=24272d)

并且支持在VSCode上看MR记录

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1873adf5dc6c49a0b8b4531f3541c567~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=367\&h=256\&s=22706\&e=png\&b=202227)
