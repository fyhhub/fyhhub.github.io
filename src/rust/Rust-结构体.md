# Rust-结构体

## 普通的结构体
```rust
struct User {
  name: String,
  age: u16,
}
```

## 单元结构体
```rust
struct User;
```

## 元组结构体
```rust
// 一个值的元组
struct User(String);

// 两个值的元组
struct User(String, u32);
```

## 匿名结构体
```rust
{x:1,y:1}
```