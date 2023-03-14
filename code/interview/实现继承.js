// 构造函数继承
function Parent() {
  this.names = ['a'];
}
Parent.prototype.bb = 1;

function Child() {
  // 实例上的方法和属性
  Parent.call(this);
}

// 原型上的方法和属性
Child.prototype = new Parent();
