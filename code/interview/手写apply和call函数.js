Function.prototype.myapply = function (ctx, args) {
  ctx.fn = this;
  var res;
  if (!args) {
    res = ctx.fn();
  } else {
    var arr = [];
    for (var i = 0; i < args.length; i++) {
      arr.push("args[" + i + "]");
    }
    res = eval("ctx.fn(" + arr + ")");
  }
  delete ctx.fn;
  return res;
};
Function.prototype.mycall = function (ctx) {
  ctx.fn = this;
  var res;
  var arr = [];
  for (var i = 1; i < arguments.length; i++) {
    arr.push("arguments[" + i + "]");
  }
  res = eval("ctx.fn(" + arr + ")");
  delete ctx.fn;
  return res;
};

function Person() {
  console.log(this.name);
  return this.name;
}
Person.prototype.name = "jake";

const person = {
  name: "jack",
};
Person.mycall(person, 1, 2);
