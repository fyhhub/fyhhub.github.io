# React 双缓存机制

在`React`中存在，两个 fiber 树。当前屏幕上展示的`fiber树`是`current fiber树`，正在内存中构建的是`worInProgress fiber树`

`current fiber`节点和`worInProgress fiber`节点使用`alternate`连接

React 应用的根节点通过使`current`指针在不同 Fiber 树的 rootFiber 间切换来完成`current Fiber树`指向的切换。

## 初次 mount 时

初次渲染时，`current`指向的 rootFiber 是没有子节点的，然后开始构建右边的`workInProgress树`, 通过`createWorkInProgress`,
创建`workInProgress树`的`rootFiber`, 也就是右边部分

![React双缓存机制.drawio.png](/React双缓存机制1.drawio.png)

## 初次 mount 完成

当`workInProgress树`构建完成后，current 指针将指向`右侧的workInProgress树`
![React双缓存机制.drawio.png](/React双缓存机制2.drawio.png)

## 更新时

更新状态下，current 已经存在，并且`alternate`上存在`workInProgress`, 那么会基于`current`树，再创建`workInProgress`自己的 fiber 节点，如下

![React双缓存机制.drawio.png](/React双缓存机制3.drawio.png)

## 更新完成

![React双缓存机制.drawio.png](/React双缓存机制4.drawio.png)

更新完成后 currnet 就指向了左边，那么在后续的过程中，双缓冲机制，会`不断切换current指向`，并复用之前已经创建好的 fiber 节点
