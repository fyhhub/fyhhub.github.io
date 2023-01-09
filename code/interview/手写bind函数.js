Function.prototype.mybind = function (context) {
  const self = this;
  const args = [].slice.call(arguments, 1);
  const fnoop = function () {};
  const fn = function () {
    const _args = [].slice.call(arguments);
    return self.apply(
      this instanceof fnoop ? this : context,
      args.concat(_args)
    );
  };

  fnoop.prototype = self.prototype;
  fn.prototype = new fnoop();
  return fn;
};
