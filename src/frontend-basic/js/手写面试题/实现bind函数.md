# 实现 bind 函数

```js
Function.prototype.mybind = function (context) {
  const self = this;
  const args = [].slice.call(arguments, 1);
  const fnoop = function () {};

  const fbind = function () {
    const _args = [].slice.call(arguments);
    // this instanceof f ? this : context   如果使用new操作符创建bind返回的函数对象，this就指向这个对象，否则指向绑定的对象
    return self.apply(
      this instanceof fnoop ? this : context,
      args.concat(_args)
    );
  };
  // fbind 继承要绑定函数
  fnoop.prototype = this.prototype;
  fbind.prototype = new fnoop();
  return fbind;
};
```
