const flat = (arr) =>
  arr.reduce((a, b) => a.concat(Array.isArray(b) ? flat(b) : b), []);
