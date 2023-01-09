# 前端开发工具链

## 1. 代码检查工具

```
npm i eslint -D
npx eslint --init
```

## 2. 代码格式化

+ 安装插件
  ```
  npm i prettier eslint-config-prettier eslint-plugin-prettier -D
  ```

+ 配置`eslintrc.js`

  ```js
  {
    extends: ['plugin:prettier/recommended']
  }
  ```
+ 创建`.prettierrc`

  ```js
  {
    "semi": true,
    "tabWidth": 2,
    "trailingComma": "none",
    "singleQuote": true,
    "arrowParens": "avoid"
  }
  ```

## 3. Git Hook

### 初始化husky
  ```js
  // package.json
  {
    "scripts": {
      "prepare": "husky install"
    }
  }
  ```

  ```
  npm i husky -D
  npm run prepare
  ```


### pre-commit

+ 初始化
```
npx husky add .husky/pre-commit "npx lint-staged"
```

+ 使用lint等工具规范你的代码



```json
// package.json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "prettier --write ./src",
    "eslint  --fix"
  ],
  "*.md": [
    "prettier --write"
  ]
},
```

### commit-msg hook

+ 初始化
```
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

+ 使用commitlint 校验你的commit message

```
npm i commitlint @commitlint/config-conventional -D
```

+ 创建`commitlint.config.js`
```js
module.exports = {
  extends: ['@commitlint/config-conventional']
};
```

### pre-push message


## 4. commitizen 让你的commit 更优雅

+ 安装

最好全局安装`commitizen`

```
npm install -D cz-git
npm i -g commitizen
```

+ 修改package.json

```json
{
  "scripts": {
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

+ 修改`commitlint.config.js`

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    alias: { fd: 'docs: fix typos' },
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixsSelect: '选择关联issue前缀（可选）:',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?'
    },
    types: [
      { value: 'feat', name: 'feat:     新增功能 | A new feature' },
      { value: 'fix', name: 'fix:      修复缺陷 | A bug fix' },
      {
        value: 'docs',
        name: 'docs:     文档更新 | Documentation only changes'
      },
      {
        value: 'style',
        name: 'style:    代码格式 | Changes that do not affect the meaning of the code'
      },
      {
        value: 'refactor',
        name: 'refactor: 代码重构 | A code change that neither fixes a bug nor adds a feature'
      },
      {
        value: 'perf',
        name: 'perf:     性能提升 | A code change that improves performance'
      },
      {
        value: 'test',
        name: 'test:     测试相关 | Adding missing tests or correcting existing tests'
      },
      {
        value: 'build',
        name: 'build:    构建相关 | Changes that affect the build system or external dependencies'
      },
      {
        value: 'ci',
        name: 'ci:       持续集成 | Changes to our CI configuration files and scripts'
      },
      { value: 'revert', name: 'revert:   回退代码 | Revert to a commit' },
      {
        value: 'chore',
        name: 'chore:    其他修改 | Other changes that do not modify src or test files'
      }
    ],
    useEmoji: false,
    emojiAlign: 'center',
    themeColorCode: '',
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixs: [
      // 如果使用 gitee 作为开发管理
      { value: 'link', name: 'link:     链接 ISSUES 进行中' },
      { value: 'closed', name: 'closed:   标记 ISSUES 已完成' }
    ],
    customIssuePrefixsAlign: 'top',
    emptyIssuePrefixsAlias: 'skip',
    customIssuePrefixsAlias: 'custom',
    allowCustomIssuePrefixs: true,
    allowEmptyIssuePrefixs: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: ''
  }
};
```



+ commit你的代码

```
git cz

# 或

npm run commit
```

## 5. 自动生成changelog
```json
"scripts": {
  "changelog": "npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0 && git add CHANGELOG.md"
},
```
## 测试

+ 初始化 `pre-push`
```
npx husky add .husky/pre-push "npm test"
```

+ 安装 vitest
```
npm install -D vitest
```

+ 创建`vitest.config.ts`

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // ...
  },
})
```


+ 添加命令

```json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```