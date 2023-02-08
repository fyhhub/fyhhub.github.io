function curry(fn, args) {
  args = args || [];
  const length = fn.length;
  return function () {
    const allArgs = args.concat([].slice.call(arguments));
    return allArgs.length < length
      ? curry.call(this, fn, allArgs)
      : fn.apply(this, allArgs);
  };
}

function curry(fn, args) {
  args = args || [];
  const length = arguments.length
  return function() {
    const _args = args.concat([].slice.call(arguments))
    if (_args < length) {
      return curry.call(this, fn, _args)
    } else {
      return fn.apply(this, _args)
    }
  }
}
