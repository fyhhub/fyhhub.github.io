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
