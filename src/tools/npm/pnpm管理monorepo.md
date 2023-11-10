# pnpm管理monorepo

## 配置文件

```yml
# pnpm-workspace.yaml
packages:
  # 所有在 packages/  子目录下的 package
  - 'packages/**'
  # 不包括在 test 文件夹下的 package
  - '!**/test/**'
```

## 命令

+ `pnpm i typescript -w` 在根目录安装依赖
+ `pnpm i typescript -w -D` 在根目录安装开发依赖
+ `pnpm add express --filter @monorepo/http` 给某个包单独安装依赖
+ `pnpm add @monorepo/http@* --filter @monorepo/web` 项目包互相依赖，@monorepo/web 安装依赖 `@monorepo/http`
+ `pnpm why -r` 能够列出这个包的源码位置，被monorepo内部哪些项目引用了
+ `pnpm remove axios --filter  @monorepo/http` 删除某个包的依赖
+ `pnpm link --global <pkg>` 本地link包
+ `pnpm add lodash-test@npm:lodash@1.1` 给包取别名
+ `pnpm -r run build` 可以一次性执行所有包的`build`命令