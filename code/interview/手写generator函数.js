function $gen(context) {
  while (1) {
    switch ((context.prev = context.next)) {
      case 0:
        _context.next = 2;
        return "result1";

      case 2:
        _context.next = 4;
        return "result2";

      case 4:
        _context.next = 6;
        return "result3";

      case 6:
      case "end":
        return _context.stop();
    }
  }
}
const context = {
  prev: 0,
  next: 0,
  done: false,
};
const gen = function () {
  return {
    next: function () {
      return {
        value: context.done ? undefined : $gen(context),
        done: context.done,
      };
    },
  };
};
