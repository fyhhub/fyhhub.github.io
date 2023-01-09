# vscode调试配置

.vscode/launch.json

```json
{
  // 使用 IntelliSense 了解相关属性。 
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
      {
          "type": "lldb",
          "request": "launch",
          "name": "C++ debug",
          "program": "${fileDirname}/${fileBasenameNoExtension}",
          "args": [],
          "cwd": "${workspaceFolder}",
          "preLaunchTask": "C/C++: g++ 生成活动文件"
      }
  ]
}
```


.vscode/tasks.json
```json
{
  "tasks": [
      {
          "type": "cppbuild",
          "label": "C/C++: g++ 生成活动文件",
          "command": "/usr/bin/g++",
          "args": [
              "-std=c++17",
              "-stdlib=libc++",
              "-fdiagnostics-color=always",
              "-g",
              "-Wall",
              "${file}",
              "-o",
              "${fileDirname}/${fileBasenameNoExtension}"
          ],
          "options": {
              "cwd": "${fileDirname}"
          },
          "problemMatcher": [
              "$gcc"
          ],
          "group": {
              "kind": "build",
              "isDefault": true
          },
          "detail": "调试器生成的任务。"
      }
  ],
  "version": "2.0.0"
}

```