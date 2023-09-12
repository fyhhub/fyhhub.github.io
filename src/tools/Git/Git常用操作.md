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

1. 全量拉取所有代码和commit
```markdown
git clone git@xxx.git
```

2. 我们只克隆下包含最近一次commit的一个分支，这样这个项目文件就不会很大。

**使用场景：你只是想clone最新版本来使用或学习，而不是参与整个项目的开发工作**
```markdown
git clone --depth 1 git@xxxxx.git
```

3. 可以选择只拉取某个分支
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

- 新需求和特性：   feature-模块名-姓名缩写
- bug修复（待确定）：  fix-模块名-姓名缩写
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

1. 基于master切了一个分支`feature-test`
2. 删除一行代码，然后提交产生了`Commit(C)`
3. 执行git revert xx之后，代码会自动反向修改，恢复那一行代码，产生Merge Commit(D)

此时的git树如下:
![](https://cdn.nlark.com/yuque/0/2022/jpeg/22194783/1669716543616-856dd450-ac7b-441f-b70f-ce1a4be01160.jpeg)

下面来介绍回退代码的几种操作
### （1）回退某一个commit

```bash
git revert 产生新commit（推荐）
git log # 通过日志，找到你想回退代码的commitid

git revert 425e6dd10b86783 # 回退某个commit
```
![16945128530041694512852094.png](https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16945128530041694512852094.png)
在你执行`git revert`后，会产生一个新的commitId, 并且会出现一个message编辑器, 你可以修改revert产生的commit message


### （2）回退多个commit
有如下两个commitid， `A`和`B`
![16945129020031694512901092.png](https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16945129020031694512901092.png)

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
![](https://cdn.nlark.com/yuque/0/2022/jpeg/22194783/1669623030395-1eef6692-a60f-48cb-b08f-85346e7b5127.jpeg)

然后继续执行如下命令：
```bash
git revert -m 1 83e2776
```
这里`-m 1`其实就是保留目标分支，回退`feature分支`上的代码。所以，一般来讲，我们都用`-m 1`即可。

## 3. 回退本地代码 ⚠️
### （1）git reset
此处有三个`commit`, 如果我想回退掉`前面两个commit`
![16945129970051694512996416.png]()

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

![](https://cdn.nlark.com/yuque/0/2022/jpeg/22194783/1669621043110-aa701cb8-3db7-45c0-8163-e3ded4706377.jpeg)

使用 merge 是很好的方式，因为它是一种 **非破坏性的** 操作。现有分支不会以任何方式被更改。这避免了 rebase 操作所产生的潜在缺陷（下面讨论）。
另一方面，这也意味着 feature 分支每次需要合并上游更改时，它都将产生一个额外的合并提交。如果master 提交非常活跃，这可能会严重污染你的 feature 分支历史记录。尽管可以使用高级选项 git log 缓解此问题，**但它可能使其他开发人员难以理解项目的历史记录（此处仅做讨论，组内规范仍然使用merge流程）**
## 2. git rebase
可以理解为“重新设置基线”（重新设置分支比较的起点commit），并将“新基线”以后的commit拷贝到指定的分支上。所有当前分支上在“新基线”以后的commit会被copy一份存储到一个临时区域，然后按顺序应用到指定分支上

```bash
git checkout feature
git rebase master
```

![](https://cdn.nlark.com/yuque/0/2022/jpeg/22194783/1669621383536-13a2236e-cfdd-4826-b360-cbc956667c95.jpeg)

大家可能注意到了，`master`是落后于`feature`的，需要我们在`master` 上将`feature`分支合并过来。当然，你也可以使用Gitlab可视界面合并。
```bash
git checkout master

git merge feature
```


# 四、强大的git rebase
## 1. git rebase 注意事项 ⚠️
使用git rebase的注意事项，请一定遵守。

1. **公共分支不rebase**
2. **已经push的部分不rebase**



线上提交执行变基会导致什么结果：
（1）你在本地对部分线上提交进行了变基，这部分提交我们称之为a，a在变基之后commit id 发生了变化
（2）你在本地改变的这些提交有可能存在于你的同事的开发分支中，我们称之为b，他们与a的内容相同，commit id 不同
（3）如果你把变基结果强行push 到远程仓库后，你的同事在本地执行git pull 的时候会导致a 和b 发生融合，且都出现在了历史提交中，导致你的变基行为无效

## 2. 修改commit顺序 
![16945130650061694513064428.png](https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16945130650061694513064428.png)

如果你想处理从 commit A 到最新的commit, 你需要获取这个范围外的第一条，也就是图上的最后一条commit
```bash
git rebase -i 086cbb47628be91b3cc2407056d231fe8c75a120
```

第一条是最老的commit记录。最后一条是最新的。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22194783/1669623730871-76064ab3-c4c3-4a78-8d3a-ec35670bddf2.png#averageHue=%232d3037&clientId=u2337ac98-fe9a-4&from=paste&height=313&id=u0ca46ff6&originHeight=626&originWidth=1358&originalType=binary&ratio=1&rotation=0&showTitle=false&size=195006&status=done&style=none&taskId=u40096985-d534-47db-a5a5-43c53b63533&title=&width=679)
然后交换位置后， `:wq`保存。
![16945131010071694513100146.png](https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16945131010071694513100146.png)

可以看到，两条commit顺序变了。
![16945131340081694513133790.png](https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16945131340081694513133790.png)
## 3. 回退commit
注意：日常不推荐使用，会导致落后于master分支，你的更改将不会产生新的merge。
```bash
git rebase -i 086cbb47628be91b3cc2407056d231fe8c75a120
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22194783/1669623817769-9f55b259-32bf-4fce-b1b1-149e6cf2d4e6.png#averageHue=%232c2f36&clientId=u2337ac98-fe9a-4&from=paste&height=51&id=u33317f87&originHeight=102&originWidth=578&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16391&status=done&style=none&taskId=ub8e6c76f-0bc2-42a9-bd64-0adbe1252c7&title=&width=289)
与上面的操作一样，你需要把`pick`改成`d`或者`drop`, 你也可以直接删除这一行，保存之后就会回退commit, 但是这条commit会被删除，请谨慎操作。
## 4. 修改commit
```bash
git rebase -i 086cbb47628be91b3cc2407056d231fe8c75a120
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22194783/1669624130756-dff6aba1-960c-4441-8041-82bd43d55a82.png#averageHue=%232d2f36&clientId=u2337ac98-fe9a-4&from=paste&height=55&id=u04996407&originHeight=110&originWidth=454&originalType=binary&ratio=1&rotation=0&showTitle=false&size=15782&status=done&style=none&taskId=uc0ade963-9718-491b-934c-bfe574c8fa8&title=&width=227)
将`pick`改成`e`或`edit`。然后`:wq`保存和退出编辑。
控制台会打印如下内容：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22194783/1669624189564-b2313c69-77bc-44df-b287-5a8774e6765c.png#averageHue=%232c2f36&clientId=u2337ac98-fe9a-4&from=paste&height=169&id=ube06709b&originHeight=338&originWidth=992&originalType=binary&ratio=1&rotation=0&showTitle=false&size=68104&status=done&style=none&taskId=u5aa3f293-0671-4474-8317-d751bb79e68&title=&width=496)
此时你会进入编辑commit的状态，这时候你修改代码。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22194783/1669624233336-8235afcf-7ec9-4da5-813b-78172e362490.png#averageHue=%232b2f36&clientId=u2337ac98-fe9a-4&from=paste&height=102&id=u95992ba0&originHeight=204&originWidth=1476&originalType=binary&ratio=1&rotation=0&showTitle=false&size=40685&status=done&style=none&taskId=u6622a1c1-ba0e-44de-bc8c-a3085bcef91&title=&width=738)
再执行：
```bash
git add .
git rebase --continue
```
然后会进入编辑commit message的状态, 在这一步你可以修改commit message
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22194783/1669624323245-3403076c-89c6-47ee-a7f3-f1dd305bf5c4.png#averageHue=%232c2f36&clientId=u2337ac98-fe9a-4&from=paste&height=213&id=u28bb8fdd&originHeight=566&originWidth=1212&originalType=binary&ratio=1&rotation=0&showTitle=false&size=137422&status=done&style=none&taskId=uabfe7acf-15bb-4b81-913c-17d65f8e76c&title=&width=456)
保存后，你的commit就被修改了。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22194783/1669624356177-8f8b3668-0d24-4459-aaba-c98a9ade409b.png#averageHue=%232e3138&clientId=u2337ac98-fe9a-4&from=paste&height=83&id=u37d820a6&originHeight=166&originWidth=1098&originalType=binary&ratio=1&rotation=0&showTitle=false&size=50062&status=done&style=none&taskId=ufa0538a7-4a4e-4a3e-b606-9d0802637b1&title=&width=549)
## 5. 合并commit
如果你想让自己的commit好看一点，你可以把你这次需求所有的commit进行合并。有如下三个commit
![16945131890091694513188285.png](https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16945131890091694513188285.png)
```bash
git rebase -i 086cbb47628be91b3cc2407056d231fe8c75a120
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22194783/1669624590786-3455ae80-6d5a-4022-b5e4-2db6a40f0d87.png#averageHue=%232d3037&clientId=u2337ac98-fe9a-4&from=paste&height=360&id=u331ecff0&originHeight=720&originWidth=1386&originalType=binary&ratio=1&rotation=0&showTitle=false&size=226865&status=done&style=none&taskId=u0474975a-480a-48b3-8bff-2c5277c6d5c&title=&width=693)
修改一下：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22194783/1669624620094-e56fbce1-3891-4d78-a0f8-c0d7d38c048c.png#averageHue=%232d3037&clientId=u2337ac98-fe9a-4&from=paste&height=64&id=u1e610267&originHeight=128&originWidth=522&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22204&status=done&style=none&taskId=u159481af-6d2d-4230-9baf-aa6c2a08f98&title=&width=261)
将`pick`改成`s`或`squash`, 这个意思是把commit合并到前一个commit。在上面的例子中，都被合并到了commit A
git会将三个commit 的message也进行合并, 你也可以编辑commit A的 message
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22194783/1669624722484-cb4b09f1-e6a7-4a88-8030-7df309b30a8b.png#averageHue=%232a2d34&clientId=u2337ac98-fe9a-4&from=paste&height=229&id=ue7ade54a&originHeight=458&originWidth=1190&originalType=binary&ratio=1&rotation=0&showTitle=false&size=61244&status=done&style=none&taskId=uac2c4d9c-985f-4e72-9595-88f76e9afdd&title=&width=595)
最后只剩下一个 commit
![16945132900121694513289777.png](https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16945132900121694513289777.png)

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
![16945133630151694513362864.png](https://fastly.jsdelivr.net/gh/fyhhub/imgs@main/16945133630151694513362864.png)
# 七、VSCode插件推荐

## 1. Gitlen
非常推荐安装
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22194783/1669688940052-2fedf562-f963-4798-a73e-fe00122dc2d9.png#averageHue=%23292b31&clientId=uaf499048-96f3-4&from=paste&height=55&id=ub9b28548&originHeight=71&originWidth=357&originalType=binary&ratio=1&rotation=0&showTitle=false&size=15852&status=done&style=none&taskId=u87efdac4-9dc3-41a3-be99-1821dadaafa&title=&width=277.5)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22194783/1669689000762-0bf6e471-5867-47ea-85ef-7e75bd0dfe2e.png#averageHue=%2330343d&clientId=uaf499048-96f3-4&from=paste&height=105&id=ucfcb7d7e&originHeight=210&originWidth=366&originalType=binary&ratio=1&rotation=0&showTitle=false&size=14027&status=done&style=none&taskId=u8a5fd5ef-f773-4c79-b135-b00e61b8203&title=&width=183)
可以看到每一行，每一个文件的commit记录。鼠标放在代码上也可以看到最近谁更改了这一行
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22194783/1669689045611-95708f8a-cebf-4775-a51e-2bfeeca9f189.png#averageHue=%23262930&clientId=uaf499048-96f3-4&from=paste&height=37&id=ue0e74643&originHeight=73&originWidth=435&originalType=binary&ratio=1&rotation=0&showTitle=false&size=7956&status=done&style=none&taskId=u473e3d10-2b91-4eb6-b6f5-9024843b84f&title=&width=217.5)

## 2. Gitlab Workflow
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22194783/1669689139715-bdfc05d6-1c6c-49fe-8c65-fb4923853d2c.png#averageHue=%23292b31&clientId=uaf499048-96f3-4&from=paste&height=60&id=u54da679c&originHeight=75&originWidth=367&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11581&status=done&style=none&taskId=ue716a814-9e5c-4995-9636-34a4ac3ea9b&title=&width=293.5)
可以一键创建MR
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22194783/1669689154380-d19eabc9-5c7f-4207-bf23-9d5188fdcefa.png#averageHue=%23272a30&clientId=uaf499048-96f3-4&from=paste&height=67&id=uf6595aaa&originHeight=54&originWidth=153&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3610&status=done&style=none&taskId=ud901eb5f-3727-4e3b-83bc-9dd4528aee7&title=&width=190.5)
并且支持在VSCode上看MR记录
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22194783/1669689181142-266ba00f-664c-4f59-adc7-c8cfb2a8d619.png#averageHue=%2325272d&clientId=uaf499048-96f3-4&from=paste&height=128&id=ud208700f&originHeight=256&originWidth=367&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22706&status=done&style=none&taskId=ufb1cebed-9533-4167-8121-de40aa7d95c&title=&width=183.5)
