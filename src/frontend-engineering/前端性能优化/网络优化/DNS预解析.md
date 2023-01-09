# DNS 预解析

## 回顾：DNS 解析过程

**DNS** ，全称 **Domain Name System** 。采用 **client/server** 模式，**DNS client** 发出查询请求，**DNS server** 响应请求。**DNS client** 通过查询 **DNS server** 获得主机的 **IP 地址**，进而完成后续的 **TCP/IP** 通信过程。

### DNS 域名组成

![](https://pic3.zhimg.com/80/v2-d5aab5cbd37ede88a27a28d165abe1fc_1440w.jpg?source=1940ef5c)

---

![](https://pic3.zhimg.com/80/v2-0d8ed8870fa1fc4e5f0275e08b510444_1440w.jpg?source=1940ef5c)

### DNS 对www.baidu.com解析过程

![](https://pic3.zhimg.com/80/v2-2e3c4a5086b77c9dc2fa88c55e12e689_1440w.jpg?source=1940ef5c)

以上过程都是在没有`浏览器缓存`，`系统缓存`，`路由器花奴才能`,

1. **DNS 客户端**向**本地域名服务器**发送请求，查询 www.baidu.com 主机的 IP 地址；

2. 本地域名服务器查询数据库，发现没有域名为 www.baidu.com 的主机，于是将请求发送给根域名服务器；

3. **根域名服务器**查询数据库，发现没有这个主机域名记录，但是根域名服务器知道 **com 域名服务器**可以解析这个域名，于是将**com 域名服务器**的 IP 地址返回给**本地域名服务器**；

4. **本地域名服务器**向 **com 域名服务器**查询 www.baidu.com 主机的 IP 地址；

5. **com 域名服务器**查询数据库，也没有相关记录，但是知道 baidu.com 域名服务器可以解析这个域名，于是将 baidu.com 域名服务器的 IP 地址返回给本地域名服务器；

6. **本地域名服务器**再向 **baidu.com 域名服务器**查询 www.baidu.com 主机 IP 地址；

7. **baidu.com 域名服务器**查询数据库，也没有相关记录，但是知道 **www.baidu.com 域名服务器**可以解析这个域名，于是将 www.baidu.com 的域名服务器 IP 地址返回给本地域名服务器；
8. **本地域名服务器**向 **www.baidu.com 域名服务器**查询 www.baidu.com 主机的 IP 地址；

9. **www.baidu.com域名服务器**查询数据库，发现有主机域名记录，于是给**本地域名服务器**返回 www.baidu.com 对应的 IP 地址；

10. 最后**本地域名服务器**将 www.baidu.com 的 IP 地址返回给客户端，整个解析过程完成。

## DNS 预解析优化

**DNS Prefetching 能够提前解析域名**，当用户去访问该域名时就能直接获取到 ip，减少等待时间，提升用户体验

**如果想对页面中没有出现的域进行预获取，那么就要使用显示的 DNS Prefetch 了**

```html
<!-- 用meta信息来告知浏览器, 当前页面要做DNS预解析 -->
<!-- content="on" or content="off" -->
<meta http-equiv="x-dns-prefetch-control" content="on" />

<!-- 在页面header中使用link标签来强制对DNS预解析 -->
<link rel="dns-prefetch" href="//www.zhix.net" />
<link rel="dns-prefetch" href="//api.share.zhix.net" />
<link rel="dns-prefetch" href="//bdimg.share.zhix.net" />
```

**注意：dns-prefetch 需慎用，多页面重复 DNS 预解析会增加重复 DNS 查询次数**

## 参考

[DNS 解析的过程是什么，求详细的？](https://www.zhihu.com/question/23042131/answer/66571369)

[DNS 预解析 dns-prefetch 提升页面载入速度优化前端性能](https://www.cnblogs.com/goloving/p/9368965.html)
