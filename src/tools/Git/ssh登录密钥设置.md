# ssh登录密钥设置

1. 设置用户名和邮箱

```shell
git config –global user.name "fyhhub"
git config –global user.email "1131153523@qq.com"
```

2. 生成秘钥

```
ssh-keygen -t rsa -C "1131153523@qq.com"
```
然后连续回车

3. 找到`.ssh/id_rsa.pub` 并复制.

4. github上创建ssh [new ssh](https://github.com/settings/ssh/new), 将刚才复制的内容粘贴上去，title随便取个名字