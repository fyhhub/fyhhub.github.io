
# Rust知识点梳理



## 语法
### 1. ref是什么语法
ref可以直接创建一个引用：
```rust
fn main() {
  let ref a = String::from("value");
  // 或可变引用
  let ref mut a = String::from("value");

  let c = a;

  let b = a;
}
```

等价于:

```rust
fn main() {
  let a = String::from("value");
  let c = &a;

  let b = &a;
}
```

## 生命周期

### 1. &'static 和 T: 'static


+ &'static 对于生命周期有着非常强的要求：一个引用必须要活得跟剩下的程序一样久，才能被标注为 &'static。一般来讲字符串字面量是`'static`
+ &'static 生命周期针对的仅仅是引用，而不是持有该引用的变量，对于变量来说，还是要遵循相应的作用域规则

例如这段代码， “Hello World” 是字符串字面量，因此它的生命周期是 `'static`， 但是string这个变量在函数执行完后就释放了。然而字符串字面量会一直存活
```rust
fn get_memory_location() -> (usize, usize) {
  let string = "Hello World!";
  // `string` 在这里被 drop 释放
  // 虽然变量被释放，无法再被访问，但是数据依然还会继续存活
}
```

+ `T: 'static` 可以理解为 T 变量必须活得跟剩下的程序一样久这样的特征，并且T具有变量的所有权
+ `'static` 说明一个值活得跟剩下的程序一样久，可以认为它是一个Trait
+ `&'static` 说明一个引用活的跟剩下的程序一样久，这样的一个Trait

**关键点回顾**

- `T: 'a` 比 `&'a T` 更泛化，更灵活
- `T: 'a` 接受所有权类型，内部含有引用的所有权类型，和引用
- `&'a T` 只接受引用
- 若 `T: 'static` 则 `T: 'a` 因为对于所有 `'a` 都有 `'static` >= `'a`

## 智能指针

### 1. Box
**使用 Box\<T\> 可以将数据存储在堆上**

```rust
fn main() {
    let a = Box::new(3);
    println!("a = {}", a); // a = 3

    // 下面一行代码将报错
    // let b = a + 1; // cannot add `{integer}` to `Box<{integer}>`
}
```
以上代码，可以使用`*a`来解引用， 而`println!("a = {}", a)`之所以能够直接获取到`a`的值，是因为它实现了`Drop`特征


在 Rust 中，想实现不同类型组成的数组只有两个办法：枚举和特征对象，前者限制较多，因此后者往往是最常用的解决办法。
```rust
trait Draw {
    fn draw(&self);
}

struct Button {
    id: u32,
}
impl Draw for Button {
    fn draw(&self) {
        println!("这是屏幕上第{}号按钮", self.id)
    }
}

struct Select {
    id: u32,
}

impl Draw for Select {
    fn draw(&self) {
        println!("这个选择框贼难用{}", self.id)
    }
}

fn main() {
    let elems: Vec<Box<dyn Draw>> = vec![Box::new(Button { id: 1 }), Box::new(Select { id: 2 })];

    for e in elems {
        e.draw()
    }
}
```

**Box 中还提供了一个非常有用的关联函数：`Box::leak`, 你需要一个在运行期初始化的值，但是可以全局有效，也就是和整个程序活得一样久，那么就可以使用 Box::leak**




### 2. Rc 和 Arc
`Rc`其实就是一个引用计数,它允许多个变量指针指向同一个`堆的的值`，正常来讲一个值只能拥有一个变量，每次`Rc::clone(&T)`克隆一个引用，它的引用计数就会`加1`。

**希望在堆上分配一个对象供程序的多个部分使用且无法确定哪个部分最后一个结束时，就可以使用 Rc 成为数据值的所有者**

比如下面的代码中，如果不使用Rc来作为结构体内部的引用，还需要声明生命周期。

```rust
#![allow(dead_code)]

use std::rc::Rc;

fn main() {
    let booty = Rc::new(Treasure { dubloons: 1000 });

    let my_map = TreasureMap::new(booty);
    let your_map = my_map.clone();
    println!("{:?}", my_map);
    println!("{:?}", your_map);
}

#[derive(Debug)]
struct Treasure {
    dubloons: u32,
}

#[derive(Clone, Debug)]
struct TreasureMap {
    treasure: Rc<Treasure>,
}

impl TreasureMap {
    fn new(treasure: Rc<Treasure>) -> Self {
        TreasureMap { treasure }
    }
}
```

**总结**

- `Rc/Arc` 是不可变引用，你无法修改它指向的值，只能进行读取，如果要修改，需要配合内部可变性 `RefCell` 或互斥锁 `Mutex`
- 一旦最后一个拥有者消失，则资源会自动被回收，这个生命周期是在编译期就确定下来的
- `Rc` 只能用于同一线程内部，想要用于线程之间的对象共享，你需要使用 `Arc`
- `Rc<T>` 是一个智能指针，实现了 `Deref` 特征，因此你无需先解开 `Rc` 指针，再使用里面的 `T`，而是可以直接使用 `T`


### 3. Cell 和 RefCell
它可以在拥有不可变引用的同时修改目标数据，对于正常的代码实现来说，这个是不可能做到的


Cell 和 RefCell 在功能上没有区别，区别在于 Cell\<T\> 适用于 T 实现 Copy 的情况：
```rust
use std::cell::Cell;
fn main() {
  let c = Cell::new("asdf");
  let one = c.get();
  c.set("qwer");
  let two = c.get();
  println!("{},{}", one, two);
}
```
如果这么写就会报错
```rust
let c = Cell::new(String::from("asdf"));
```
原因是String没有实现Copy特征, 由于 Cell 类型针对的是实现了 Copy 特征的值类型，因此在实际开发中，Cell 使用的并不多，因为我们要解决的往往是可变、不可变引用共存导致的问题，此时就需要借助于 `RefCell` 来达成目的

```rust
use std::cell::RefCell;
fn main() {
  let s = RefCell::new(String::from("hello, world"));
  let s1 = s.borrow();
  let s2 = s.borrow_mut();

  println!("{},{}", s1, s2);
}
```

然而，`RefCell` 在编译期间不会出现可变和不可变同时存在的报错，只会在运行时报错

**Rc + RefCell 组合使用**
在 Rust 中，一个常见的组合就是 Rc 和 RefCell 在一起使用，前者可以实现一个数据拥有多个所有者，后者可以实现数据的可变性：
```rust
use std::cell::RefCell;
use std::rc::Rc;
fn main() {
  let s = Rc::new(RefCell::new("我很善变，还拥有多个主人".to_string()));

  let s1 = s.clone();
  let s2 = s.clone();
  // let mut s2 = s.borrow_mut();
  s2.borrow_mut().push_str(", oh yeah!");

  println!("{:?}\n{:?}\n{:?}", s, s1, s2);
}
```


### 4. Mutex
一般在多线程中，为了实现共享数据，会使用到`Mutex`, 例如:
```rust
use std::{
    sync::{Arc, Mutex},
    thread,
};

// Arc<Mutex<T>> 可以多线程共享且修改数据
fn arc_mutext_is_send_sync() {
    let a = Arc::new(Mutex::new(1));
    let b = a.clone();
    let c = a.clone();
    let handle = thread::spawn(move || {
        let mut g = c.lock().unwrap();
        *g += 1;
    });

    {
        let mut g = b.lock().unwrap();
        *g += 1;
    }

    handle.join().unwrap();
    println!("a= {:?}", a);
}

fn main() {
    arc_mutext_is_send_sync();
}
```

### 5. Deref
```rust
use std::ops::Deref;

struct MyBox<T>(T);

impl<T> MyBox<T> {
  fn new(val: T) -> Self {
    MyBox(val)
  }
}

impl<T> Deref for MyBox<T> {
  type Target = T;

  fn deref(&self) -> &Self::Target {
    &self.0
  }
}

fn main() {
  let y = MyBox::new(123);

  println!("{}", *y);
}
```
实现`Deref`特征，才可以正常的通过`*T`来获取一个引用的实际值。


另外一个例子：
```rust
fn main() {
    let s = MyBox::new(String::from("hello world"));
    display(&s)
    // 等价于 display(&(*s))
}

fn display(s: &str) {
    println!("{}",s);
}
```

**这里我们使用了之前自定义的智能指针 MyBox，并将其通过连续的隐式转换变成 &str 类型：首先 MyBox 被 Deref 成 String 类型，结果并不能满足 display 函数参数的要求，编译器发现 String 还可以继续 Deref 成 &str，最终成功的匹配了函数参数。**


## 枚举
### 1. Cow
Cow（Clone-on-Write）是 Rust 中一个很有意思且很重要的数据结构。它就像 Option 一样，在返回数据的时候，提供了一种可能：要么返回一个借用的数据（只读），要么返回一个拥有所有权的数据（可写）。

```rust
pub enum Cow<'a, B: ?Sized + 'a> where B: ToOwned,
{
  // 借用的数据
  Borrowed(&'a B),
  // 拥有的数据
  Owned(<B as ToOwned>::Owned),
}
```


## 特征
### 1. ToOwned
[ToOwned](https://doc.rust-lang.org/std/borrow/trait.ToOwned.html) 是一个 trait，它可以把借用的数据克隆出一个拥有所有权的数据。

### 2. Send/Sync
Send/Sync 是 Rust 并发安全的基础：
+ 如果一个类型 T 实现了 `Send trait`，意味着 T 可以安全地从一个线程移动到另一个线程，也就是说所有权可以在线程间移动。
+ 如果一个类型 T 实现了 `Sync trait`，则意味着 &T 可以安全地在多个线程中共享。一个类型 T 满足 Sync trait，当且仅当 &T 满足 Send trait。

标准库中，不支持 Send / Sync 的数据结构主要有：
+ 裸指针 *const T / *mut T。它们是不安全的，所以既不是 Send 也不是 Sync。
+ UnsafeCell\<T\> 不支持 Sync。也就是说，任何使用了 Cell 或者 RefCell 的数据结构不支持 Sync。
+ 引用计数 Rc 不支持 Send 也不支持 Sync。所以 Rc 无法跨线程。


### 3. From / Into
一般用于类型转换：

```rust
pub trait From<T> {
    fn from(T) -> Self;
}

pub trait Into<T> {
    fn into(self) -> T;
}
```
在实现 From 的时候会自动实现 Into。这是因为：
```rust
// 实现 From 会自动实现 Into
impl<T, U> Into<U> for T where U: From<T> {
    fn into(self) -> U {
        U::from(self)
    }
}
```

在下面的例子中，`Person` 实现了 `From`, 自然就自动实现了 `Into`
```rust
#[derive(Debug)]
struct Person {
  name: String
}

impl From<String> for Person {
    fn from(value: String) -> Self {
      Self { name: value }
    }
}

fn main() {
  let person = Person::from(String::from("123"));
  let it: Person = String::from("123").into();
  println!("{:?}", it);
}
```


### 4. Deref / DerefMut

```rust
pub trait Deref {
    // 解引用出来的结果类型
    type Target: ?Sized;
    fn deref(&self) -> &Self::Target;
}

pub trait DerefMut: Deref {
    fn deref_mut(&mut self) -> &mut Self::Target;
}
```

例子：
```rust
use std::ops::{Deref, DerefMut};

#[derive(Debug)]
struct Buffer<T>(Vec<T>);

impl<T> Buffer<T> {
    pub fn new(v: impl Into<Vec<T>>) -> Self {
        Self(v.into())
    }
}

impl<T> Deref for Buffer<T> {
    type Target = [T];

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl<T> DerefMut for Buffer<T> {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

fn main() {
    let mut buf = Buffer::new([1, 3, 2, 4]);
    // 因为实现了 Deref 和 DerefMut，这里 buf 可以直接访问 Vec<T> 的方法
    // 下面这句相当于：(&mut buf).deref_mut().sort()，也就是 (&mut buf.0).sort()
    buf.sort();
    println!("buf: {:?}", buf);
}
```
由于`Buffer` 实现了`Deref 和 DerefMut`, 所以buf 可以直接访问和操作数组



### 5. TryFrom 反向转换enum
```rust
use std::convert::TryFrom;

impl TryFrom<i32> for MyEnum {
    type Error = ();

    fn try_from(v: i32) -> Result<Self, Self::Error> {
        match v {
            x if x == MyEnum::A as i32 => Ok(MyEnum::A),
            x if x == MyEnum::B as i32 => Ok(MyEnum::B),
            x if x == MyEnum::C as i32 => Ok(MyEnum::C),
            _ => Err(()),
        }
    }
}
```
以上代码定义了从i32到MyEnum的转换，接着就可以使用TryInto来实现转换：
```rust
use std::convert::TryInto;

fn main() {
    let x = MyEnum::C as i32;

    match x.try_into() {
        Ok(MyEnum::A) => println!("a"),
        Ok(MyEnum::B) => println!("b"),
        Ok(MyEnum::C) => println!("c"),
        Err(_) => eprintln!("unknown number"),
    }
}
```

但是实现比较繁琐，可以使用 [num_enum](https://docs.rs/num_enum/latest/num_enum/)

也可以自己实现一个宏
```rust
#[macro_export]
macro_rules! back_to_enum {
    ($(#[$meta:meta])* $vis:vis enum $name:ident {
        $($(#[$vmeta:meta])* $vname:ident $(= $val:expr)?,)*
    }) => {
        $(#[$meta])*
        $vis enum $name {
            $($(#[$vmeta])* $vname $(= $val)?,)*
        }

        impl std::convert::TryFrom<i32> for $name {
            type Error = ();

            fn try_from(v: i32) -> Result<Self, Self::Error> {
                match v {
                    $(x if x == $name::$vname as i32 => Ok($name::$vname),)*
                    _ => Err(()),
                }
            }
        }
    }
}

back_to_enum! {
    enum MyEnum {
        A = 1,
        B,
        C,
    }
}

```

## 文件操作

### 1. 路径操作

+ 获取当前正在编写的rust文件路径: `std::file!()`
+ 获取当前正在执行的文件: `current_exe()`
+ 获取当前正在执行的目录: `current_dir()`





