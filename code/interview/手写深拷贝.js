function getType(source) {
  return Object.prototype.toString.call(source);
}

function deepCopy(source, memory = new WeakMap()) {
  const isPrimitive = (value) => {
    return /Number|Boolean|String|Null|Undefined|Symbol|Function/.test(
      Object.prototype.toString.call(value)
    );
  };
  let result;

  if (isPrimitive(source)) {
    result = source;
  } else if (Array.isArray(source)) {
    result = source.map((value) => deepCopy(value, memory));
  } else if (getType(source) === "[object Date]") {
    result = new Date(source);
  } else if (getType(source) === "[object Regex]") {
    result = new Regex(source);
  } else if (getType(source) === "[object Set]") {
    result = new Set();
    for (const value of source) {
      result.add(deepClone(value, memory));
    }
  } else if (getType(source) === "[object Map]") {
    result = new Map();
    for (const [key, val] of source) {
      result.set(key, deepCopy(val, memory));
    }
  } else {
    if (memory.has(source)) {
      result = memory.get(source);
    } else {
      result = Object.create(null);
      memory.set(source, result);
      Object.keys(source).forEach((key) => {
        const value = source[key];
        result[key] = deepClone(value, memory);
      });
    }
  }

  return result;
}
