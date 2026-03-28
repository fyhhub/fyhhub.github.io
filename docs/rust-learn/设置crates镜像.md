# 设置crates镜像

设置 crates.io 镜像， 修改配置 ~/.cargo/config, 如果是window就在`C:\Users\Administrator\.cargo` 下创建一个config文件，没有文件后缀

填写以下内容：

```bash
[source.crates-io]
replace-with = 'rsproxy-sparse'
[source.rsproxy]
registry = "https://rsproxy.cn/crates.io-index"
[source.rsproxy-sparse]
registry = "sparse+https://rsproxy.cn/index/"
[registries.rsproxy]
index = "https://rsproxy.cn/crates.io-index"
[net]
git-fetch-with-cli = true
```