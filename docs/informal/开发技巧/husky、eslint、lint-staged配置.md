# husky、eslint、lint-staged 配置

```json

// package.json
{
	"husky": {
    "hooks": {
      "pre-commit": "npm run format",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.js": [
      "prettier --write"
    ],
    "*.ts": [
      "prettier --parser=typescript --write",
      "eslint"
    ]
  },
"devDependencies": {
    "@commitlint/cli": "^13.2.1",
    "@commitlint/config-conventional": "^13.2.0",
    "@typescript-eslint/parser": "^5.2.0",
    "eslint": "^8.1.0",
    "eslint-plugin-prettier": "^4.0.0",
    "husky": "^4.3.8",  // 注意这里版本 高版本会不起作用
    "lint-staged": "^11.2.6",
    "prettier": "^2.4.1"

}
```

```json
// commitlint.config.js
const types = [
  'build',
  'ci',
  'chore',
  'docs',
  'feat',
  'fix',
  'pref',
  'refactor',
  'revert',
  'style',
  'test'
];

typeEnum = {
  rules: {
    'type-enum': [2, 'always', types]
  },
  value: () => types
};

module.exports = {
  extends: [
    "@commitlint/config-conventional"
  ],
  rules: {
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
    'type-enum': typeEnum.rules['type-enum']
  }
};
```

```jsx
// .eslintrc.js
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "no-unused-vars": ["error"],
    "no-restricted-syntax": [
      "error",
      "ObjectExpression > SpreadElement",
      "ObjectPattern > RestElement",
      "AwaitExpression",
    ],
    semi: ["error", "always"],
  },
};
```

```jsx
// .prettierrc
semi: true;
singleQuote: true;
printWidth: 80;
trailingComma: "none";
arrowParens: "avoid";
```
