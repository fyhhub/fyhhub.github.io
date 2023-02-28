# 如何实现扁平转 Tree 结构

```js
function buildTree(data) {
  const map = {};
  const roots = [];

  // 第一遍循环，将所有节点添加到 map 对象中
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    map[item.id] = { ...item, children: [] };
  }

  // 第二遍循环，构建树形结构
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const parent = map[item.pid];
    if (parent) {
      parent.children.push(map[item.id]);
    } else {
      roots.push(map[item.id]);
    }
  }

  return roots;
}

const arr = [
  { id: 4, name: "部门4", pid: 3 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 5, name: "部门5", pid: 4 },
  { id: 1, name: "部门1", pid: 0 },
];

const tree = buildTree(arr);
console.log(tree);
```
