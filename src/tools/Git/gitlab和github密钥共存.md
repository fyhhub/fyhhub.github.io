# gitlab和github密钥共存


## 创建密钥

```shell
$ ssh-keygen -t rsa -C "注册的gitlab邮箱"  // 设置 为id_rsa_gitlab
$ ssh-keygen -t rsa -C "注册的github邮箱" // 设置key  为id_rsa_github
```-*

## 创建config

```shell
cd ~/.ssh
touch config
```

```shell
# gitlab
Host gitlab.com
HostName gitlab.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_gitlab

# github
Host github.com  // 链接的服务器地址
Hostname ssh.github.com //服务器地址
User *******  //用户
PreferredAuthentications publickey //验证方式
IdentityFile ~/.ssh/id_rsa_github   //指定连接使用的密钥文件
Port 443  //端口
```



## 验证是否配置成功
```shell
ssh -T git@github.com
ssh -T git@gitlab.com
```