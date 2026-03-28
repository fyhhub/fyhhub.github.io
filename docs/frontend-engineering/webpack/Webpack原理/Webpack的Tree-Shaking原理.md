# Webpack 的 Tree-Shaking 原理

## 一、FlagDependencyExportsPlugin

finish 阶段触发 finishModules Hook

1. 遍历模块树
2. 遍历模块下所有的`HarmonyExportXXXDependency 依赖`，并记录到 `exportsSpecsFromDependencies` 的 Map 对象(module => export deps)中
3. 遍历所有 export dep，调用`ExportsInfo`对象（注意这里是 Exports）上的`getExportInfo`方法, 并创建`ExportInfo`对象, 建立`exportsInfo`和`exportInfo`的相互关系。
4. 以上动作完成后，moduleGraph 上每个模块的 exports 都包含其导出信息

## 二、FlagDependencyUsagePlugin

seal 阶段触发 optimizeDependencies Hook

1. 从入口模块遍历模块树
2. 获取模块的`exportsInfo`对象，遍历其内部的`exportInfo`对象
3. `setUsedConditionally` 方法在`_usedInRuntime`中记录 export 是如何被使用, 最终存储在 exportInfo.\_usedInRuntime

## 三、生成模板阶段

HarmonyExportSpecifierDependency.Template 在模板生成时，会根据导出是否使用，创建不同的`HarmonyExportInitFragment`

1. 获取 used（导出变量名是否被使用）
2. 根据模块是否使用的情况，分别创建`HarmonyExportInitFragment`对象，保存到`initFragments`中
3. 在模板渲染时，遍历 initFragment，生成代码

## 四、删除无用代码

最终未被使用的代码，将不会被`__webpack_exports__`导出，并被`Terser`去除
