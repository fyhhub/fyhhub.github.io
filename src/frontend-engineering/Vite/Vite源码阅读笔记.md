# Vite 源码阅读笔记

## 一、 框架设计

### 1.1、 日志

```js
try {
  const server = await createServer({
    root,
    base: options.base,
    mode: options.mode,
    configFile: options.config,
    logLevel: options.logLevel,
    clearScreen: options.clearScreen,
    server: cleanOptions(options) as ServerOptions
  })
  await server.listen()
} catch (e) {
  createLogger(options.logLevel).error(
    chalk.red(`error when starting dev server:\n${e.stack}`)
  )
  process.exit(1)
}
```

1. 通过 logLevel 控制日志展示哪些信息
2. 在入口处`try catch`

```js
createLogger(options.logLevel).error(
  chalk.red(`error when starting dev server:\n${e.stack}`)
);
process.exit(1);
```

#### 1.1.1、 实现

:::details 日志系统实现

```js

import chalk from 'chalk'
import readline from 'readline'
import os from 'os'
import { Hostname } from './utils'

export type LogType = 'error' | 'warn' | 'info'
export type LogLevel = LogType | 'silent'
export interface Logger {
  info(msg: string, options?: LogOptions): void
  warn(msg: string, options?: LogOptions): void
  warnOnce(msg: string, options?: LogOptions): void
  error(msg: string, options?: LogOptions): void
  clearScreen(type: LogType): void
  hasWarned: boolean
}

export interface LogOptions {
  clear?: boolean
  timestamp?: boolean
}

export const LogLevels: Record<LogLevel, number> = {
  silent: 0,
  error: 1,
  warn: 2,
  info: 3
}

let lastType: LogType | undefined
let lastMsg: string | undefined
let sameCount = 0

function clearScreen() {
  const repeatCount = process.stdout.rows - 2
  const blank = repeatCount > 0 ? '\n'.repeat(repeatCount) : ''
  console.log(blank)
  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)
}

export interface LoggerOptions {
  prefix?: string
  allowClearScreen?: boolean
}

export function createLogger(
  level: LogLevel = 'info',
  options: LoggerOptions = {}
): Logger {
  // 日志前缀
  const { prefix = '[vite]', allowClearScreen = true } = options

  // 获取logLevel对应的数值
  const thresh = LogLevels[level]

  // 清屏函数
  const clear =
    allowClearScreen && process.stdout.isTTY && !process.env.CI
      ? clearScreen
      : () => {}

  function output(type: LogType, msg: string, options: LogOptions = {}) {
    if (thresh >= LogLevels[type]) {
      const method = type === 'info' ? 'log' : type
      const format = () => {
        if (options.timestamp) {
          const tag =
            type === 'info'
              ? chalk.cyan.bold(prefix)
              : type === 'warn'
              ? chalk.yellow.bold(prefix)
              : chalk.red.bold(prefix)
          return `${chalk.dim(new Date().toLocaleTimeString())} ${tag} ${msg}`
        } else {
          return msg
        }
      }
      if (type === lastType && msg === lastMsg) {
        sameCount++
        clear()
        console[method](format(), chalk.yellow(`(x${sameCount + 1})`))
      } else {
        sameCount = 0
        lastMsg = msg
        lastType = type
        if (options.clear) {
          clear()
        }
        console[method](format())
      }
    }
  }

  // 警告信息
  const warnedMessages = new Set<string>()

  // 返回logger
  const logger: Logger = {
    hasWarned: false,
    info(msg, opts) {
      output('info', msg, opts)
    },
    warn(msg, opts) {
      logger.hasWarned = true
      output('warn', msg, opts)
    },
    warnOnce(msg, opts) {
      if (warnedMessages.has(msg)) return
      logger.hasWarned = true
      output('warn', msg, opts)
      warnedMessages.add(msg)
    },
    error(msg, opts) {
      logger.hasWarned = true
      output('error', msg, opts)
    },
    clearScreen(type) {
      if (thresh >= LogLevels[type]) {
        clear()
      }
    }
  }

  return logger
}
```

:::

### 1.2、debug

```ts
import debug from "debug";
interface DebuggerOptions {
  onlyWhenFocused?: boolean | string;
}

const filter = process.env.VITE_DEBUG_FILTER;
const DEBUG = process.env.DEBUG;

export function createDebugger(
  ns: string,
  options: DebuggerOptions = {}
): debug.Debugger["log"] {
  const log = debug(ns);
  const { onlyWhenFocused } = options;
  const focus = typeof onlyWhenFocused === "string" ? onlyWhenFocused : ns;
  return (msg: string, ...args: any[]) => {
    if (filter && !msg.includes(filter)) {
      return;
    }
    if (onlyWhenFocused && !DEBUG?.includes(focus)) {
      return;
    }
    log(msg, ...args);
  };
}
```

```ts
const debugResolve = createDebugger("vite:resolve");
debugResolve(
  `${timeFrom(resolveStart)} ${chalk.cyan(rawId)} -> ${chalk.dim(id)}`
);
```

### 1.3、如何实现基于 rollup 的插件系统

```ts
import {
  // ...
  PluginContext as RollupPluginContext,
} from "rollup"; // 底层基于rollup

export async function createPluginContainer(
  { plugins, logger, root, build: { rollupOptions } }: ResolvedConfig,
  watcher?: FSWatcher
): Promise<PluginContainer> {
  // 覆盖和增加一些 插件上下文方法
  class Context implements PluginContext {}

  // 覆盖和增加一些 插件上下文方法
  class TransformContext extends Context {}

  // 覆盖和增加一些 插件方法
  const container: PluginContainer = {
    // ...
  };
}
```

## 主流程

### 初始化阶段

1. `resolveConfig`解析配置文件与默认配置合并

```js

```

2. `resolveHttpsConfig`解析`https`配置
3. 使用`http`模块创建 Server，并初始化一些`middlewares`
4. `createWebSocketServer`创建 WebSocket，主要用于 hmr
5. `createPluginContainer` 创建插件容器，用于覆盖 rollup 的插件 hook 实现
6. 生成 server 配置
7. 监听文件变化，例如文件删除，修改，增加等

## Hook 执行

### 1. configureServer

执行插件：

- cssPlugin

  ```js
  configureServer(_server) {
    server = _server
  }
  ```

- esbuildPlugin

  ```js
  configureServer(_server) {
    server = _server
    server.watcher
      .on('add', reloadOnTsconfigChange)
      .on('change', reloadOnTsconfigChange)
      .on('unlink', reloadOnTsconfigChange)
  }
  ```

- importAnalysisPlugin

  ```js
  configureServer(_server) {
    server = _server
  }
  ```

- preAliasPlugin

  ```js
  configureServer(_server) {
    server = _server
  }
  ```

- resolvePlugin

  ```js
  configureServer(_server) {
    server = _server
  }
  ```

### 2. buildStart

执行插件：

- assetPlugin

  ```js
  buildStart() {
    assetCache.set(config, new Map())
    emittedHashMap.set(config, new Set())
  }
  ```

- cssPlugin

  ```js
  buildStart() {
    // Ensure a new cache for every build (i.e. rebuilding in watch mode)
    moduleCache = new Map<string, Record<string, string>>()
    cssModulesCache.set(config, moduleCache)

    removedPureCssFilesCache.set(config, new Map<string, RenderedChunk>())
  }
  ```

- dataURIPlugin

  ```js
  buildStart() {
    resolved = {}
  }
  ```

- htmlInlineScriptProxyPlugin

  ```js
  buildStart() {
    htmlProxyMap.set(config, new Map())
  }
  ```

## 优化依赖
