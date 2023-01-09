# 实现 new

```js
function New() {
  var obj = new Object();
  var Ctor = [].shift.call(arguments);
  obj.__proto__ = Ctor.prototype;
  var res = Ctor.apply(obj, arguments);
  return typeof res === "object" ? res : obj;
}
```
