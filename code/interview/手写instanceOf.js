function instanceOf(source, target) {
  let proto = source.__proto__;
  while (proto) {
    if (proto === target) {
      return true;
    } else {
      proto = proto.__proto__;
    }
  }
  return false;
}
