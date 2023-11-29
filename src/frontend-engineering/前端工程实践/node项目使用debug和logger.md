# node项目使用debug


## debug
先在bin中加入以下代码：

```js
#!/usr/bin/env node
const debugIndex = process.argv.findIndex(arg => /^(?:-d|--debug)$/.test(arg));
const filterIndex = process.argv.findIndex(arg =>
  /^(?:-f|--filter)$/.test(arg)
);
if (debugIndex > 0) {
  let value = process.argv[debugIndex + 1];
  if (!value || value.startsWith('-')) {
    value = 'xdoc:*';
  } else {
    // support debugging multiple flags with comma-separated list
    value = value
      .split(',')
      .map(v => `xdoc:${v}`)
      .join(',');
  }
  process.env.DEBUG = `${
    process.env.DEBUG ? process.env.DEBUG + ',' : ''
  }${value}`;

  if (filterIndex > 0) {
    const filter = process.argv[filterIndex + 1];
    if (filter && !filter.startsWith('-')) {
      process.env.XDOC_DEBUG_FILTER = filter;
    }
  }
}
```


创建debugger
```ts
import type debug from 'debug';

export type XDocDebugScope = `xdoc:${string}`;

interface DebuggerOptions {
  onlyWhenFocused?: boolean | string;
}

const DEBUG = process.env.DEBUG;
const filter = process.env.XDOC_DEBUG_FILTER;

export function createDebugger(
  namespace: XDocDebugScope,
  options: DebuggerOptions = {}
): debug.Debugger['log'] {
  const log = require('debug').debug(namespace);
  const { onlyWhenFocused } = options;

  let enabled = log.enabled;
  if (enabled && onlyWhenFocused) {
    const ns =
      typeof onlyWhenFocused === 'string' ? onlyWhenFocused : namespace;
    enabled = !!DEBUG?.includes(ns);
  }
  if (enabled) {
    return (...args: [string, ...[]]) => {
      if (!filter || args.some(a => a?.includes?.(filter))) {
        log(...args);
      }
    };
  }
  return () => {
    // empty
  };
}

```


## logger
```ts
/* eslint no-console: 0 */

import colors from 'picocolors';
import readline from 'readline';

export type LogType = 'error' | 'warn' | 'info';
export type LogLevel = LogType | 'silent';
export interface Logger {
  info(msg: string, options?: LogOptions): void;
  warn(msg: string, options?: LogOptions): void;
  warnOnce(msg: string, options?: LogOptions): void;
  error(msg: string, options?: LogErrorOptions): void;
  clearScreen(type: LogType): void;
  hasErrorLogged(error: Error): boolean;
  hasWarned: boolean;
  log(msg: unknown): void;
}

export interface LogOptions {
  clear?: boolean;
  timestamp?: boolean;
}

export interface LogErrorOptions extends LogOptions {
  error?: Error | null;
}

export const LogLevels: Record<LogLevel, number> = {
  silent: 0,
  error: 1,
  warn: 2,
  info: 3
};

let lastType: LogType | undefined;
let lastMsg: string | undefined;
let sameCount = 0;

function clearScreen() {
  const repeatCount = process.stdout.rows - 2;
  const blank = repeatCount > 0 ? '\n'.repeat(repeatCount) : '';
  console.log(blank);
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
}

export interface LoggerOptions {
  prefix?: string;
  allowClearScreen?: boolean;
}

export function createLogger(
  level: LogLevel = 'info',
  options: LoggerOptions = {}
): Logger {
  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
  const loggedErrors = new WeakSet<Error>();
  const { prefix = '[xDoc]', allowClearScreen = true } = options;
  const thresh = LogLevels[level];
  const canClearScreen =
    allowClearScreen && process.stdout.isTTY && !process.env.CI;
  const clear = canClearScreen ? clearScreen : () => {};

  function output(type: LogType, msg: string, options: LogErrorOptions = {}) {
    if (thresh >= LogLevels[type]) {
      const method = type === 'info' ? 'log' : type;
      msg =
        type === 'info'
          ? msg
          : type === 'warn'
            ? colors.yellow(colors.bold(msg))
            : colors.red(colors.bold(msg));
      const format = () => {
        if (options.timestamp) {
          const tag =
            type === 'info'
              ? colors.cyan(colors.bold(prefix))
              : type === 'warn'
                ? colors.yellow(colors.bold(prefix))
                : colors.red(colors.bold(prefix));
          return `${colors.dim(
            timeFormatter.format(new Date())
          )} ${tag} ${msg}`;
        } else {
          return msg;
        }
      };
      if (options.error) {
        loggedErrors.add(options.error);
      }
      if (canClearScreen) {
        if (type === lastType && msg === lastMsg) {
          sameCount++;
          clear();
          console[method](format(), colors.yellow(`(x${sameCount + 1})`));
        } else {
          sameCount = 0;
          lastMsg = msg;
          lastType = type;
          if (options.clear) {
            clear();
          }
          console[method](format());
        }
      } else {
        console[method](format());
      }
    }
  }

  const warnedMessages = new Set<string>();

  const logger: Logger = {
    hasWarned: false,
    info(msg, opts) {
      output('info', msg, opts);
    },
    warn(msg, opts) {
      logger.hasWarned = true;
      output('warn', msg, opts);
    },
    warnOnce(msg, opts) {
      if (warnedMessages.has(msg)) return;
      logger.hasWarned = true;
      output('warn', msg, opts);
      warnedMessages.add(msg);
    },
    error(msg, opts) {
      logger.hasWarned = true;
      output('error', msg, opts);
    },
    clearScreen(type) {
      if (thresh >= LogLevels[type]) {
        clear();
      }
    },
    hasErrorLogged(error) {
      return loggedErrors.has(error);
    },
    log(msg) {
      console.log(msg);
    }
  };

  return logger;
}

```