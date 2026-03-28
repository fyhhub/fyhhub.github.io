# VSCode 自动任务

## 自动 Merge

需要搭配以下工具

- glab
- Gitlab WorkFlows VSCode 插件

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "git-mr",
      "type": "shell",
      "command": "glab",
      "args": [
        "mr",
        "new",
        "-b",
        "${input:target}",
        "-d",
        "merge",
        "-t",
        "${input:message}"
      ],
      "problemMatcher": []
    },
    {
      "label": "git-ml",
      "type": "shell",
      "command": "glab",
      "args": ["mr", "list"],
      "problemMatcher": []
    },
    {
      "label": "git-close",
      "type": "shell",
      "command": "glab",
      "args": ["mr", "close", "${input:mrid}"],
      "problemMatcher": []
    },
    {
      "label": "git-merge",
      "type": "shell",
      "command": "glab",
      "args": ["mr", "merge", "${input:mrid}"],
      "problemMatcher": []
    }
  ],
  "inputs": [
    {
      "id": "target",
      "type": "pickString",
      "options": ["buildwork", "buildtuhutest", "buildut", "master"],
      "description": "请输入目标分支"
    },
    {
      "id": "mrid",
      "type": "promptString",
      "description": "请输入merge id"
    },
    {
      "id": "message",
      "type": "promptString",
      "description": "请输入merge信息"
    }
  ]
}
```

## 参考文章

[【手把手】学会 VS Code"任务"神技，成为项目组最靓的崽！](https://juejin.cn/post/7035448197883363359)
