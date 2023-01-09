# yargs 使用

```js
#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers')
const cli = yargs()
const argv = process.argv.slice(2);
const context = {
  leekVersion: '1.0.0'
}
cli
  .usage('leek [command] <options>')        // 用法
  .demandCommand(1, '最少需要一个命令')        // 最少要输入的命令个数 例如 直接执行 leek，会提示
  .alias('h', 'help')                       // 别名  leek -h
  .alias('v', 'version')                    // 别名 leek -v
  .recommendCommands()                      // 命令输入错误，会推荐命令
  .wrap(cli.terminalWidth())                // 设置打印出来命令行的宽度, terminalWidth可以获取命令行完整的宽度
  .epilogue('页脚')                          // 设置页脚
  .strict()                                 // 严格模式
  .fail((err, msg) => {
    // 命令执行失败处理
  })
  .options({                                // 添加多个选项
    debug: {
      type: 'boolean',  // 类型
      describe: '启动debug模式', // 描述
      defaultDescription: 'info', // 默认值
      alias: 'd' // 别名
    }
  })

  .option('registry', {                     // 添加单个选项
    hidden: true // 命令行看不到  但是能接收到该参数
    type: 'string',
    describe: '定义全局仓库地址',
    defaultDescription: 'www.baidu.com',
    alias: 'r'
  })

  .group(['debug'], 'Dev Options:')         // 将debug加入到 Dev Options: 分组下

  .command('init [name]', '初始化项目', (yargs) => { // 添加命令
    yargs.option('name', {
      type: 'string',
      describe: '项目名称'
    })
  }, (argv) => {
    // leek init xxx
    // argv: { _: [ 'init' ], '$0': 'leek', name: 'xxx' }
  })
  .command({                                // 添加命令
    command: 'list',
    aliases: ['ls'],
    describe: 'list描述',
    builder: (yargs) => {
      // 同上
    },
    handler: (argv) => {
    }
  })
  .parse(argv, context) // context 被注入到argv


// Dev Options:
// -d, --debug  启动debug模式                                                                                                                        [布尔] [默认值: info]
// 选项：
// -r, --registry  定义全局仓库地址                                                                                                       [字符串] [默认值: www.baidu.com]
// -h, --help      显示帮助信息                                                                                                                                     [布尔]
// -v, --version   显示版本号
```
