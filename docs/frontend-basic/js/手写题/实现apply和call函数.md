# 实现 apply 和 call 函数

## 实现思路

1. 将方法赋值给要绑定对象的`fn`上
2. 收集参数
3. eval 执行
4. 删除`fn`
5. 返回结果

## apply 实现

```js
Function.prototype.myapply = function (context, args) {
  var context = context || window;
  context.fn = this;
  var res;
  if (!args) {
    res = context.fn();
  } else {
    const arr = [];
    for (var i = 0; i < args.length; i++) {
      arr.push("args[" + i + "]");
    }
    res = eval("context.fn(" + arr + ")");
  }
  delete context.fn;
  return res;
};
```

## call 实现

```js
Function.prototype.mycall = function (context) {
  var context = context || window;
  context.fn = this;

  const arr = [];
  for (var i = 1; i < arguments.length; i++) {
    arr.push("arguments[" + i + "]");
  }
  var res = eval("context.fn(" + arr + ")");
  delete context.fn;
  return res;
};
```
