# Node 多进程

## child_process 用法

### exec

```js
const cp = require("child_process");
const path = require("path");

// 1. 直接执行命令
cp.exec(
  "ls -al",
  {
    cwd: path.resolve(".."), // 设置命令在上级目录执行
  },
  function (err, stdout, stderr) {
    // 错误，输出，输出错误
    console.log(err, stdout, stderr);
  }
);

// 2. 执行shell文件
cp.execFile(
  path.resolve(__dirname, "test.shell"),
  ["-al", "-bl"],
  function (err, stdout, stderr) {
    // 错误，输出，输出错误
    console.log(err, stdout, stderr);
  }
);
// 执行test.shell
// echo $1  # 输出-al
// echo $2  # 输出-bl
```

### spawn

```js
// 使用spawn执行shell文件
const child = cp.spawn(path.resolve(__dirname, "test.shell"), ["-al", "-bl"], {
  cwd: process.cwd(),
  stdio: "inherit", // 不需要下面的监听 也能看到日志输出
});

child.stdout.on("data", function (chunk) {
  console.log(chunk.toString()); // 输出结果
});

child.stderr.on("data", function (chunk) {
  console.log(chunk.toString()); // 输出错误结果
});

//  stdio: 'inherit'情况下使用
child.on("error", (e) => {
  console.log(e.message);
  process.exit(1);
});
child.on("exit", (e) => {
  console.log("命令执行成功");
  process.exit(1);
});
```

### fork

```js
const child = cp.fork(path.resolve(__dirname, "child.js"));
child.send("向子进程发送信息", () => {});
child.on("message", () => {});
console.log(process.pid);
```

```js
// child.js 子进程监听消息
process.on("message", (msg) => {
  console.log(msg);
});
```
