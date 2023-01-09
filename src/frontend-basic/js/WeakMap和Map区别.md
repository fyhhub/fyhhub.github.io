# WeakMap 和 Map 区别

1. WeakMap 只接受 key 为对象
2. WeakMap 的 key 所引用的对象是弱引用，只要对象其他引用被删除，就会被垃圾回收机制回收
3. WeakMap 没有 size 属性，因为成员数量不稳定
4. 没有 clear 方法
5. 不能遍历
