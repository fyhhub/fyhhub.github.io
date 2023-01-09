# React 的 diff 算法

React 中 Diff 算法的本质是对比，`current fiber`和`JSX对象`, 然后生成`workInProgress fiber`

## React diff 的限制

- 只对同级元素进行 Diff。如果一个 DOM 节点在前后两次更新中`跨越了层级`，那么 React`不会尝试复用`他。
- 两个不同类型的元素会产生出不同的树。如果元素由`div变为p`，React 会`销毁`div 及其子孙节点，并新建 p 及其子孙节点。
- 开发者可以通过 key prop 来暗示哪些子元素在不同的渲染下能保持稳定

## 单节点的 diff

### mount 时

`current fiber`为 Null

直接根据`jsx element`创建`workInProgress fiber`

### update 时

`current fiber`存在

**遍历 current fiber 和兄弟节点**

- `current fiber`和`jsx element`的 key**相同**

  - 两者的节点 type`相同`
    - 当前层级只有一个 fiber, 需要删除其他多余的兄弟 fiber
    - useFiber 复用`current fiber`, 返回`workInProgress fiber`
  - 两者的节点 type`不相同`
    - 标记删除该`current fiber`, 以及它所有的兄弟节点

- `current fiber`和`jsx element`的 key**不相同**
  只标记删除该`current fiber`

- 如果以上对比后，还是没法复用，就使用`jsx element`创建新的`workInProgress fiber`

## 多节点的 diff

Diff 算法的整体逻辑会经历两轮遍历：

第一轮遍历：处理`更新`的节点。

第二轮遍历：处理剩下的`不属于更新`的节点

### 情况

:::: tabs
@tab 节点更新

```html
// 之前
<ul>
  <li key="0" className="before">0</li>
  <li></li>
  <li key="1">1</li>
  <li></li>
</ul>

// 之后 情况1 —— 节点属性变化
<ul>
  <li key="0" className="after">0</li>
  <li></li>
  <li key="1">1</li>
  <li></li>
</ul>

// 之后 情况2 —— 节点类型更新
<ul>
  <div key="0">0</div>
  <li key="1">1</li>
  <li></li>
</ul>
```

@tab 节点新增或减少

```html
// 之前
<ul>
  <li key="0">0</li>
  <li></li>
  <li key="1">1</li>
  <li></li>
</ul>

// 之后 情况1 —— 新增节点
<ul>
  <li key="0">0</li>
  <li></li>
  <li key="1">1</li>
  <li></li>
  <li key="2">2</li>
  <li></li>
</ul>

// 之后 情况2 —— 删除节点
<ul>
  <li key="1">1</li>
  <li></li>
</ul>
```

@tab 节点位置变化

```html
<ul>
  <li key="0">0</li>
  <li></li>
  <li key="1">1</li>
  <li></li>
</ul>

// 之后
<ul>
  <li key="1">1</li>
  <li></li>
  <li key="0">0</li>
  <li></li>
</ul>
```

::::

### 第一轮遍历
