# commander 使用

```js
#! /usr/bin/env node
const commander = require("commander");
const pkg = require("../package.json");

// 获取commander的单例
// const { program } = commander

// 手动实例化commander实例
const program = new commander.Command();

// leek-test -h
// leek-test -d
// leek-test -e <envName>
program
  // 命令名称
  .name(Object.keys(pkg.bin)[0])
  // 命令用法
  .usage("<command> [options]")
  // 版本
  .version(pkg.version)
  // 创建option -d
  .option("-d, --debug", "是否开启调试模式", false)
  // 创建option -e
  .option("-e, --env <envName>", "获取环境变量名称");

// leek-test clone source destination --force
program
  .command("clone <source> [destination]")
  .description("clone a repository into a newly created directory")
  .option("-f, --force", "是否强制克隆")
  .action((source, destination, cmdObj) => {
    console.log(source, destination, cmdObj.force);
  });

// leek-test service start 8080
const service = new commander.Command("service");
service
  .command("start [port]")
  .description("start service at some port")
  .action((port) => {
    console.log(port);
  });
program.addCommand(service); // 关键

// 调用其他脚手架命令
program
  .command("install [name]", "install package", {
    executableFile: "leek", // leek-test install 相当于执行 leek 命令
    isDefault: true, // 执行 leek-test 默认会走到这里
  })
  .alias("i");

// 匹配所有命令
program
  .arguments("<cmd> [options]")
  .description("test command", {
    cmd: "command to run",
    options: "options for command",
  })
  // 所有命令的参数都会经过这里
  .action((cmd, env) => {
    console.log(cmd, env);
  });

// 自定义help
program.helpInformation = function () {
  return "";
};
program.on("--help", function () {
  console.log("help info");
});
// 方式二
program.helpInformation = function () {
  return "help info";
};

// 监听debug option
program.on("option:debug", function () {
  if (program.debug) {
    process.env.LOG_LEVEL = "verbose";
  }
});

// 监听所有命令
program.on("command:*", function () {
  console.error("未知的命令" + obj[0]);
  // 获取所有命令
  console.log(program.commands[0].name);
});

// 监听所有选项
program.on("option:*", function () {});

program.parse(process.argv);
```
