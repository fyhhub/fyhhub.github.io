# tsconfig 不常见的配置

## compilerOptions

- **forceConsistentCasingInFileNames：** import 文件名，是否区分大小写，设置为 true 后，强制区分大小写

  ```js
  // 包含一个App.tsx文件

  import "./app.tsx"; // 错误

  import "./App.tsx"; // 正确
  ```

- **allowSyntheticDefaultImports：** 是否支持合成默认导出

  ```js
  // allowSyntheticDefaultImports: true
  import React from "react"; // 正确
  import * as React from "react"; // 正确, 但是不能直接使用默认导出  需要React.default

  // allowSyntheticDefaultImports: false
  import React from "react"; // 错误
  import * as React from "react"; // 正确
  ```

  **注意：** 如果你配置`esModuleInterop: true`, `allowSyntheticDefaultImports`将默认开启

- **isolatedModules：** 文件是否必须有导出

  ```js
  // isolatedModules: true

  // index.ts
  import "a.tsx"; // 提示报错，没有导出！

  // a.tsx
  // 啥也没有 或者 没写export，文件报错！
  ```

  ```js
  // isolatedModules: false

  // index.ts
  import "a.tsx"; // 不报错！

  // a.tsx
  // 啥也没有 或者 没写export，文件不报错！
  ```

- **useDefineForClassFields**

  ```js
  // useDefineForClassFields: true
  class C {
    foo = 100;
    bar: string;
  }
  // 编译为：
  class C {
    constructor() {
      Object.defineProperty(this, "foo", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 100,
      });
      Object.defineProperty(this, "bar", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0,
      });
    }
  }
  ```

  ```js
  // useDefineForClassFields: false
  class C {
    foo = 100;
    bar: string;
  }
  class C {
    constructor() {
      this.foo = 100;
    }
  }
  ```

- **noErrorTruncation**

  ts 类型异常如果太多太长，可能会被隐藏，配置此选项后能全部展示。

- **composite**

  如果配置了 true, 默认`rootDir`为`tsconfig.json`那一层目录, 并且默认开启`declaretion`
