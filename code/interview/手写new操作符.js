function New(Ctor, ...args) {
  const obj = new Object()
  obj.__proto__ = Ctor.prototype
  const res = Ctor.apply(obj, args)
  return typeof res === 'object' ? res : obj;
}