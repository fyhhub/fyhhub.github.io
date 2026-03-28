# OpenCode Agent 核心实现原理

> 基于源码分析，版本截止 2026-03-28

---

## 目录

1. [整体架构总览](#1-整体架构总览)
2. [Agent 核心定义](#2-agent-核心定义)
3. [主子 Agent 调度原理](#3-主子-agent-调度原理)
4. [会话循环 SessionPrompt.loop](#4-会话循环-sessionpromptloop)
5. [TaskTool：子 Agent 调用机制](#5-tasktool子-agent-调用机制)
6. [权限系统 PermissionNext](#6-权限系统-permissionnext)
7. [Agent 配置加载](#7-agent-配置加载)
8. [最小化实现示例](#8-最小化实现示例)
9. [关键源码文件索引](#9-关键源码文件索引)

---

## 1. 整体架构总览

### 1.1 架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                         用户交互层                               │
│   CLI / TUI / Web API  ──▶ SessionPrompt.prompt()              │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      会话调度层 (Session)                       │
│                                                                  │
│  ┌──────────────────┐        ┌──────────────────┐              │
│  │  SessionPrompt   │        │    Session       │              │
│  │    .prompt()     │───────▶│    管理消息      │              │
│  │    .loop()       │        └──────────────────┘              │
│  └────────┬─────────┘                 ▲                        │
│           │                           │                        │
│           ▼                           │                        │
│  ┌──────────────────┐        ┌────────┴────────┐               │
│  │ SessionProcessor │        │   MessageV2     │               │
│  │   .process()     │        │   消息存储      │               │
│  └────────┬─────────┘        └─────────────────┘               │
└───────────┼────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      LLM 执行层                                  │
│  LLM.stream() ──▶ Provider (模型适配) ──▶ AI SDK               │
└─────────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      工具执行层                                  │
│  ToolRegistry ──▶ Tool (Bash/Edit/Read/Grep...) ──▶ TaskTool   │
│                                              (子Agent调用)       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      Agent 管理层                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Agent Namespace                       │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐              │   │
│  │  │  build   │  │   plan   │  │ explore  │              │   │
│  │  │ (primary)│  │ (primary)│  │(subagent)│              │   │
│  │  └──────────┘  └──────────┘  └──────────┘              │   │
│  │  ┌──────────┐  ┌──────────┐                             │   │
│  │  │ general  │  │ compact  │  (内置 + 可扩展)            │   │
│  │  │(subagent)│  │ (hidden)  │                             │   │
│  │  └──────────┘  └──────────┘                             │   │
│  └─────────────────────────────────────────────────────────┘   │
│  PermissionNext ──▶ Ruleset (allow/ask/deny)                   │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 核心组件关系

```
用户输入
    │
    ▼
SessionPrompt.prompt() ──────────────────── 创建用户消息
    │                                          │
    │                                          ▼
    │                                   createUserMessage()
    │                                        │
    ▼                                        ▼
SessionPrompt.loop() ◀───────────────── 消息存入 MessageV2
    │
    ├── 步骤 1: 检查 pending subtask ──▶ TaskTool.execute()
    │                                          │
    │                                          ▼
    │                                   SessionPrompt.prompt()
    │                                   (子Agent子会话) ──▶ 返回结果
    │
    ├── 步骤 2: 检查 compaction ──▶ SessionCompaction
    │
    └── 步骤 3: 正常处理 ──▶ SessionProcessor.process()
                                          │
                                          ▼
                                   LLM.stream() + tools
                                          │
                                          ▼
                                   返回结果 / 继续循环
```

---

## 2. Agent 核心定义

### 2.1 Agent.Info 类型定义

**源码位置**: `packages/opencode/src/agent/agent.ts`

```typescript
// Agent 核心信息结构
Agent.Info = {
  name: string,                    // Agent 唯一标识名
  description?: string,            // Agent 描述（供用户/LLM 选择）
  mode: "subagent" | "primary" | "all",  // 运行模式
  native?: boolean,               // 是否内置 Agent
  hidden?: boolean,                // 是否对用户隐藏
  topP?: number,                  // 采样参数
  temperature?: number,            // 生成温度
  color?: string,                 // UI 显示颜色
  permission: PermissionNext.Ruleset,  // 权限规则集
  model?: {                        // 可选：指定模型
    modelID: string,
    providerID: string,
  },
  variant?: string,               // 模型变体
  prompt?: string,                 // 自定义系统提示
  welcome_message?: string,        // 欢迎消息
  options: Record<string, any>,   // 扩展选项
  steps?: number,                  // 最大迭代步数
}
```

### 2.2 Agent 的三种模式

| 模式 | 说明 | 示例 |
|------|------|------|
| `primary` | 主 Agent，处理用户主对话 | `build`, `plan` |
| `subagent` | 子 Agent，通过 TaskTool 被调用 | `explore`, `general` |
| `all` | 既可做主 Agent 也可做子 Agent | 自定义 Agent |

### 2.3 内置 Agent 详解

```typescript
// packages/opencode/src/agent/agent.ts 第 74-200 行

// 1. build - 默认主 Agent，拥有所有工具权限
build: {
  name: "build",
  description: "The default agent. Executes tools based on configured permissions.",
  mode: "primary",
  native: true,
  permission: PermissionNext.merge(
    defaults,
    { question: "allow", plan_enter: "allow" },
    user
  )
}

// 2. plan - 计划模式，拒绝所有编辑工具
plan: {
  name: "plan",
  description: "Plan mode. Disallows all edit tools.",
  mode: "primary",
  native: true,
  permission: PermissionNext.merge(
    defaults,
    {
      question: "allow",
      plan_exit: "allow",
      edit: { "*": "deny", "*.md": "allow" }  // 只允许编辑 markdown
    }
  )
}

// 3. explore - 快速代码探索子 Agent（只读）
explore: {
  name: "explore",
  mode: "subagent",
  native: true,
  permission: PermissionNext.merge(
    defaults,
    {
      "*": "deny",
      grep: "allow", glob: "allow", list: "allow",
      bash: "allow", webfetch: "allow", read: "allow"
    }
  )
}

// 4. general - 通用任务子 Agent
general: {
  name: "general",
  mode: "subagent",
  native: true,
  permission: PermissionNext.merge(
    defaults,
    { todoread: "deny", todowrite: "deny" }
  )
}
```

---

## 3. 主子 Agent 调度原理

### 3.1 调度流程概览

```
┌──────────────────────────────────────────────────────────────────┐
│                      主 Agent 调度流程                           │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  用户消息 ──▶ SessionPrompt.prompt()                             │
│                  │                                                │
│                  ▼                                                │
│  判断是否有 @agent 引用 ──┬── 有 ──▶ 解析 AgentPart              │
│                         │                                         │
│                         └── 无 ──▶ 使用默认 Agent                │
│                                      (Agent.defaultAgent())      │
│                                                                  │
│  SessionPrompt.loop() 循环                                        │
│       │                                                           │
│       ├── 检测 SubtaskPart (子 Agent 任务)                       │
│       │      │                                                    │
│       │      ▼                                                    │
│       │   TaskTool.execute() ──▶ 创建子会话 ──▶ 递归调用         │
│       │                                                    SessionPrompt.prompt(subagent)
│       │                                                    │
│       ├── 检测 CompactionPart (上下文压缩)                       │
│       │      │                                                    │
│       │      ▼                                                    │
│       │   SessionCompaction.process()                            │
│       │                                                            │
│       └── 正常处理                                                │
│              │                                                    │
│              ▼                                                    │
│          SessionProcessor.process()                               │
│              │                                                    │
│              ├── LLM.stream() + Agent 配置                       │
│              ├── 工具调用 + 权限检查                              │
│              └── 循环直到完成                                     │
└──────────────────────────────────────────────────────────────────┘
```

### 3.2 用户显式调用 Agent (@提及机制)

**源码位置**: `packages/opencode/src/session/prompt.ts` 第 602-604 行

```typescript
// 用户通过 @agentname 显式指定 Agent
const lastUserMsg = msgs.findLast((m) => m.info.role === "user")
const bypassAgentCheck = lastUserMsg?.parts.some((p) => p.type === "agent") ?? false
```

当用户输入 `@explore帮我查找某个函数` 时：

1. `createUserMessage()` 解析出 `AgentPart`
2. 在消息中添加提示文本，指示 LLM 调用 TaskTool
3. 设置 `bypassAgentCheck = true`，跳过权限检查

### 3.3 子 Agent 调用（TaskTool）

**源码位置**: `packages/opencode/src/tool/task.ts`

```typescript
// TaskTool.execute() 核心逻辑
const result = await SessionPrompt.prompt({
  messageID,
  sessionID: session.id,     // 新建子会话
  model: { ... },
  agent: agent.name,          // 指定子 Agent
  tools: {                    // 禁用递归调用
    todowrite: false,
    todoread: false,
    task: false,              // 防止子 Agent 继续调用子 Agent
  },
  parts: promptParts,
})
```

### 3.4 Session 层级结构

```
Root Session (用户主会话)
│
├── Session.id = "sess_xxx"
├── Session.parentID = undefined
│
├── Message 1 (user)
│   └── Part: SubtaskPart { agent: "explore", prompt: "..." }
│
└── Message 2 (assistant)
    └── Part: ToolPart { tool: "task", state: { output: "..." } }
            │
            └── TaskTool 创建子 Session
                │
                ├── Session.id = "sess_yyy"
                ├── Session.parentID = "sess_xxx"  ◀── 关联父会话
                │
                └── Message 1 (user) - explore 执行
                    │
                    └── Message 2 (assistant) - explore 结果
```

---

## 4. 会话循环 SessionPrompt.loop

### 4.1 Loop 核心代码

**源码位置**: `packages/opencode/src/session/prompt.ts` 第 305-693 行

```typescript
export const loop = fn(Identifier.schema("session"), async (sessionID) => {
  const abort = start(sessionID)
  let step = 0

  while (true) {
    step++

    // 1. 加载消息历史
    let msgs = await MessageV2.filterCompacted(MessageV2.stream(sessionID))

    // 2. 提取最后一条用户消息和助手消息
    let lastUser, lastAssistant, lastFinished
    let tasks: (CompactionPart | SubtaskPart)[] = []
    for (const msg of msgs) {
      if (!lastUser && msg.info.role === "user") lastUser = msg.info
      if (!lastAssistant && msg.info.role === "assistant") lastAssistant = msg.info
      if (!lastFinished && msg.info.finish) lastFinished = msg.info
      const task = msg.parts.filter(p => p.type === "compaction" || p.type === "subtask")
      if (task.length) tasks.push(...task)
    }

    // 3. 检查是否退出循环
    if (lastFinished && !["tool-calls", "unknown"].includes(lastFinished.finish)) {
      break  // 正常完成
    }

    // 4. 处理 pending subtask（子 Agent 调用）
    const task = tasks.pop()
    if (task?.type === "subtask") {
      await executeSubtask(task, lastUser)
      continue
    }

    // 5. 处理 pending compaction（上下文压缩）
    if (task?.type === "compaction") {
      await SessionCompaction.process({ messages: msgs, ... })
      continue
    }

    // 6. 检查是否需要自动压缩
    if (await SessionCompaction.isOverflow({ tokens: lastFinished.tokens, model })) {
      await SessionCompaction.create({ auto: true })
      continue
    }

    // 7. 正常处理流程
    const agent = await Agent.get(lastUser.agent)
    const processor = SessionProcessor.create({ ... })
    const tools = await resolveTools({ agent, ... })

    const result = await processor.process({
      user: lastUser,
      agent,
      system: [...],
      messages: [...],
      tools,
      model,
    })

    if (result === "stop") break
    if (result === "compact") { /* 触发压缩 */ }
  }
})
```

### 4.2 Loop 流程图

```
                    ┌─────────────────┐
                    │   loop() 开始   │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  step++         │
                    │  加载消息历史    │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        ┌──────────┐  ┌────────────┐  ┌──────────┐
        │ Subtask? │  │Compaction? │  │Overflow? │
        └────┬─────┘  └─────┬──────┘  └────┬─────┘
             │              │              │
          Yes│           Yes│           Yes│
             ▼              ▼              ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │执行子Agent│  │上下文压缩 │  │自动压缩  │
        └────┬─────┘  └────┬─────┘  └────┬─────┘
             │             │              │
             └─────────────┴──────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ 正常处理流程    │
                    │ processor.      │
                    │ process()       │
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                    ▼                 ▼
              ┌──────────┐     ┌──────────┐
              │ result = │     │ result = │
              │ "stop"   │     │"continue"│
              └────┬─────┘     └────┬─────┘
                   │                │
                   │              Continue
                   │                │
                   │                ▼
                   │         loop() 循环
                   ▼
            ┌─────────────────┐
            │   loop() 结束   │
            └─────────────────┘
```

---

## 5. TaskTool：子 Agent 调用机制

### 5.1 TaskTool 定义

**源码位置**: `packages/opencode/src/tool/task.ts`

```typescript
const parameters = z.object({
  description: z.string(),     // 任务简短描述
  prompt: z.string(),         // 任务详细提示
  subagent_type: z.string(),  // 子 Agent 类型名
  session_id: z.string().optional(),  // 继续已有会话
  command: z.string().optional(),
})

export const TaskTool = Tool.define("task", async (ctx) => {
  // 1. 获取可用的子 Agent 列表
  const agents = await Agent.list().then(x => x.filter(a => a.mode !== "primary"))

  // 2. 过滤基于权限可访问的 Agent
  const caller = ctx?.agent
  const accessibleAgents = caller
    ? agents.filter(a => PermissionNext.evaluate("task", a.name, caller.permission).action !== "deny")
    : agents

  return {
    description: description.replace("{agents}", accessibleAgents.map(...).join("\n")),
    parameters,

    async execute(params, ctx) {
      // 3. 权限检查（除非用户显式调用）
      if (!ctx.extra?.bypassAgentCheck) {
        await ctx.ask({
          permission: "task",
          patterns: [params.subagent_type],
          always: ["*"],
        })
      }

      // 4. 获取目标 Agent
      const agent = await Agent.get(params.subagent_type)

      // 5. 创建子会话
      const session = await Session.create({
        parentID: ctx.sessionID,  // 关联父会话
        title: params.description + ` (@${agent.name} subagent)`,
        permission: [/* 限制权限 */],
      })

      // 6. 调用子 Agent
      const result = await SessionPrompt.prompt({
        messageID,
        sessionID: session.id,
        model: { modelID: agent.model?.modelID, providerID: agent.model?.providerID },
        agent: agent.name,
        tools: { todowrite: false, todoread: false, task: false },
        parts: promptParts,
      })

      // 7. 返回结果
      return {
        title: params.description,
        output: text + "\n\n<task_metadata>...",
        metadata: { sessionId: session.id, summary, model },
      }
    }
  }
})
```

### 5.2 子 Agent 调用时序图

```
主 Agent                    TaskTool                  子 Agent
   │                           │                         │
   │  LLM: 调用 task 工具      │                         │
   │──────────────────────────▶│                         │
   │                           │                         │
   │                           │  1. 权限检查             │
   │                           │────────────────────────▶│
   │                           │                         │
   │                           │  2. 创建子会话           │
   │                           │  Session.create()        │
   │                           │────────────────────────▶│
   │                           │                         │
   │                           │  3. SessionPrompt.prompt()
   │                           │────────────────────────▶│
   │                           │                         │
   │                           │                         │ 循环处理...
   │                           │                         │
   │                           │  4. 返回结果              │
   │                           │◀────────────────────────│
   │                           │                         │
   │  5. 工具执行结果           │                         │
   │◀──────────────────────────│                         │
   │                           │                         │
```

---

## 6. 权限系统 PermissionNext

### 6.1 权限模型

**源码位置**: `packages/opencode/src/permission/next.ts`

```
┌─────────────────────────────────────────────────────────────┐
│                    PermissionNext Ruleset                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Rule = {                                                    │
│    permission: string,   // 权限名称 (tool name)              │
│    pattern: string,     // 匹配模式 (* 或具体路径)            │
│    action: "allow" | "ask" | "deny"                          │
│  }                                                          │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                     权限检查流程                        │  │
│  │                                                       │  │
│  │  工具调用 ──▶ PermissionNext.ask()                     │  │
│  │                │                                       │  │
│  │                ▼                                       │  │
│  │         evaluate(permission, pattern, ruleset)        │  │
│  │                │                                       │  │
│  │         ┌──────┴──────┐                               │  │
│  │         ▼             ▼                               │  │
│  │     action =       action =                           │  │
│  │     "allow"       "ask"/"deny"                       │  │
│  │         │             │                               │  │
│  │         ▼             ▼                               │  │
│  │     直接执行    弹出用户确认/拒绝                      │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 默认权限规则

```typescript
// packages/opencode/src/agent/agent.ts 第 54-71 行

const defaults = PermissionNext.fromConfig({
  "*": "allow",                 // 默认允许所有
  doom_loop: "ask",             // 死循环检测需要询问
  external_directory: {        // 外部目录访问
    "*": "ask",
    [Truncate.GLOB]: "allow",  // glob 模式允许
  },
  question: "deny",            // 禁止提问
  plan_enter: "deny",          // 禁止进入计划模式
  plan_exit: "deny",           // 禁止退出计划模式
  read: {                      // 读文件权限
    "*": "allow",
    "*.env": "ask",            // .env 文件需要确认
    "*.env.*": "ask",
    "*.env.example": "allow",
  },
})
```

### 6.3 权限检查实现

```typescript
// packages/opencode/src/permission/next.ts 第 231-238 行

export function evaluate(
  permission: string,
  pattern: string,
  ...rulesets: Ruleset[]
): Rule {
  const merged = merge(...rulesets)

  // 从后往前查找最后一个匹配的规则
  const match = merged.findLast(
    rule => Wildcard.match(permission, rule.permission) &&
            Wildcard.match(pattern, rule.pattern)
  )

  // 没有匹配的规则时，默认询问
  return match ?? { action: "ask", permission, pattern: "*" }
}
```

### 6.4 权限与 Agent 的关系

```
Agent.permission (Ruleset)
    │
    ├── 合并: PermissionNext.merge(agent.permission, session.permission)
    │
    └── 用于:
        1. 工具过滤 - ToolRegistry 根据权限决定暴露哪些工具
        2. 运行时检查 - Tool 执行前调用 PermissionNext.ask()
        3. 子 Agent 过滤 - TaskTool 根据权限决定可调用哪些子 Agent
```

---

## 7. Agent 配置加载

### 7.1 配置优先级（低 → 高）

```
1. builtInsConfig (内置默认配置)
         │
         ▼
2. Remote .well-known/opencode (组织默认)
         │
         ▼
3. ~/.config/opencode/opencode.json (全局用户配置)
         │
         ▼
4. OPENCODE_CONFIG 环境变量指定的文件
         │
         ▼
5. opencode.json / opencode.jsonc (项目配置)
         │
         ▼
6. .opencode/ 目录 (项目 + 用户)
         │
         ▼
7. OPENCODE_CONFIG_CONTENT 环境变量 (内联配置)
         │
         ▼
8. Managed config (/Library/Application Support/opencode)
         (企业/管理员控制，最高优先级)
```

### 7.2 配置 Schema

**源码位置**: `packages/opencode/src/config/config.ts`

```typescript
// Agent 配置在 opencode.json 中的格式
Agent = {
  model?: string,              // "provider/model"
  variant?: string,            // 模型变体
  temperature?: number,        // 生成温度
  top_p?: number,              // top-p 采样
  prompt?: string,             // 自定义系统提示
  disable?: boolean,          // 禁用内置 Agent
  description?: string,        // Agent 描述
  mode?: "subagent" | "primary" | "all",  // 运行模式
  hidden?: boolean,            // 对用户隐藏
  options?: Record<string, any>,  // 扩展选项
  color?: string,               // "#FF5733" 颜色
  steps?: number,               // 最大迭代步数
  permission?: Permission      // 权限规则
}

// Permission 格式
Permission = {
  "tool-name": "allow" | "ask" | "deny",
  "tool-name": { "pattern": "allow" | "ask" | "deny" },
}
```

### 7.3 opencode.json 配置示例

```jsonc
{
  "agent": {
    // 禁用内置 build agent
    "build": {
      "disable": true
    },

    // 自定义主 Agent
    "coder": {
      "description": "专业代码助手",
      "mode": "primary",
      "model": "anthropic/claude-3-5-sonnet",
      "temperature": 0.7,
      "steps": 50,
      "permission": {
        "*": "allow",
        "bash": "ask",
        "external_directory": "deny"
      }
    },

    // 自定义子 Agent
    "reviewer": {
      "description": "代码审查专家",
      "mode": "subagent",
      "prompt": "你是一个专业的代码审查员...",
      "permission": {
        "read": "allow",
        "grep": "allow",
        "glob": "allow",
        "*": "deny"
      }
    }
  }
}
```

---

## 8. 最小化实现示例

### 8.1 最小化 Agent 系统

以下是一个简化版的主子 Agent 调度系统，便于理解核心原理：

```typescript
// minimal_agent.ts - 最小化 Agent 实现

import { z } from "zod"

// ============ 1. Agent 定义 ============

interface AgentInfo {
  name: string
  mode: "primary" | "subagent"
  permission: Rule[]
}

interface Rule {
  permission: string
  action: "allow" | "deny" | "ask"
}

// 内置 Agent
const agents: Record<string, AgentInfo> = {
  build: {
    name: "build",
    mode: "primary",
    permission: [{ permission: "*", action: "allow" }]
  },
  explore: {
    name: "explore",
    mode: "subagent",
    permission: [
      { permission: "read", action: "allow" },
      { permission: "grep", action: "allow" },
      { permission: "task", action: "deny" }  // 子 Agent 不能调用其他子 Agent
    ]
  },
  general: {
    name: "general",
    mode: "subagent",
    permission: [{ permission: "*", action: "allow" }]
  }
}

// 获取 Agent
function getAgent(name: string): AgentInfo | undefined {
  return agents[name]
}

// 获取默认主 Agent
function defaultAgent(): AgentInfo {
  return agents["build"]
}

// ============ 2. 工具定义 ============

type ToolExecute = (args: any, ctx: ToolContext) => Promise<ToolResult>

interface ToolContext {
  agent: string
  sessionID: string
  abort: AbortSignal
}

interface ToolResult {
  output: string
  metadata?: any
}

interface Tool {
  id: string
  description: string
  parameters: z.ZodType
  execute: ToolExecute
}

// Task 工具 - 用于调用子 Agent
const taskTool: Tool = {
  id: "task",
  description: "调用子 Agent 执行任务",

  parameters: z.object({
    description: z.string(),
    prompt: z.string(),
    subagent_type: z.string()
  }),

  async execute(args, ctx) {
    const { description, prompt, subagent_type } = args

    // 1. 获取目标 Agent
    const agent = getAgent(subagent_type)
    if (!agent) throw new Error(`Unknown agent: ${subagent_type}`)

    // 2. 权限检查
    const canCall = evaluatePermission("task", agent.name, ctx.agent)
    if (canCall === "deny") throw new Error("Permission denied")

    if (canCall === "ask") {
      // 实际场景中这里会弹出用户确认
      console.log(`[权限] 询问是否允许调用 ${subagent_type}`)
    }

    // 3. 创建子会话并执行
    const subSession = {
      id: `sess_${Date.now()}`,
      parentID: ctx.sessionID,
      agent: agent.name
    }

    console.log(`[子Agent] 创建会话 ${subSession.id}, agent: ${agent.name}`)

    // 4. 递归调用主循环（子 Agent 模式）
    const result = await mainLoop(prompt, agent, subSession)

    return {
      output: result + `\n\n<subagent_result session="${subSession.id}">`,
      metadata: { sessionId: subSession.id }
    }
  }
}

// 其他工具
const tools: Record<string, Tool> = {
  task: taskTool,
  read: { id: "read", description: "读取文件", parameters: z.any(), async execute() {} },
  bash: { id: "bash", description: "执行命令", parameters: z.any(), async execute() {} },
}

// ============ 3. 权限检查 ============

function evaluatePermission(permission: string, pattern: string, agentName: string): "allow" | "ask" | "deny" {
  const agent = getAgent(agentName)
  if (!agent) return "ask"

  // 从后往前找匹配的规则
  for (let i = agent.permission.length - 1; i >= 0; i--) {
    const rule = agent.permission[i]
    if (matches(rule.permission, permission) && matches(rule.pattern, pattern)) {
      return rule.action
    }
  }

  return "ask"  // 默认询问
}

function matches(pattern: string, value: string): boolean {
  if (pattern === "*") return true
  return pattern === value
}

// ============ 4. 主循环 ============

async function mainLoop(
  userInput: string,
  agent: AgentInfo,
  session: { id: string; parentID?: string }
): Promise<string> {
  console.log(`[主循环] session=${session.id}, agent=${agent.name}`)
  console.log(`[用户] ${userInput}`)

  // 模拟 LLM 决定调用工具
  // 实际场景中这里调用 LLM API

  // 检查是否需要调用子 Agent
  if (userInput.includes("@explore") || userInput.includes("@general")) {
    const match = userInput.match(/@(explore|general)\s+(.*)/)
    if (match) {
      const [, agentName, prompt] = match

      const result = await taskTool.execute({
        description: "子任务",
        prompt,
        subagent_type: agentName
      }, {
        agent: agent.name,
        sessionID: session.id,
        abort: new AbortController().signal
      })

      return `[父Agent] 子Agent ${agentName} 结果: ${result.output}`
    }
  }

  // 正常处理
  return `[${agent.name}] 处理: ${userInput}`
}

// ============ 5. 入口点 ============

async function main() {
  // 场景 1: 主 Agent 单独处理
  console.log("\n=== 场景 1: 主 Agent 单独处理 ===")
  const result1 = await mainLoop(
    "帮我读取文件 src/index.ts",
    defaultAgent(),
    { id: "main_1" }
  )
  console.log(`[结果] ${result1}\n`)

  // 场景 2: 主 Agent 调用子 Agent
  console.log("=== 场景 2: 主 Agent 调用子 Agent ===")
  const result2 = await mainLoop(
    "@explore 查找所有包含 'Agent' 的文件",
    defaultAgent(),
    { id: "main_2" }
  )
  console.log(`[结果] ${result2}\n`)

  // 场景 3: 嵌套调用（子 Agent 再调用其他）
  console.log("=== 场景 3: 子 Agent 嵌套调用测试 ===")
  try {
    await mainLoop(
      "调用 task tool",
      getAgent("explore")!,
      { id: "sub_1", parentID: "main_2" }
    )
  } catch (e) {
    console.log(`[预期错误] ${e.message}`)
  }
}

main()
```

### 8.2 运行结果预期

```
=== 场景 1: 主 Agent 单独处理 ===
[主循环] session=main_1, agent=build
[用户] 帮我读取文件 src/index.ts
[结果] [build] 处理: 帮我读取文件 src/index.ts

=== 场景 2: 主 Agent 调用子 Agent ===
[主循环] session=main_2, agent=build
[用户] @explore 查找所有包含 'Agent' 的文件
[子Agent] 创建会话 sess_xxx, agent: explore
[主循环] session=sess_xxx, agent=explore
[用户] 查找所有包含 'Agent' 的文件
[结果] [父Agent] 子Agent explore 结果: [explore] 处理: 查找所有包含 'Agent' 的文件...

=== 场景 3: 子 Agent 嵌套调用测试 ===
[主循环] session=sub_1, agent=explore
[用户] 调用 task tool
[权限] 询问是否允许调用...
[预期错误] Permission denied
```

### 8.3 核心概念对应

| 概念 | 简化实现 | 实际源码 |
|------|---------|---------|
| Agent 定义 | `agents` 对象 | `Agent.Info` + `Agent.state()` |
| 主 Agent | `build` | `build` in `agent.ts` |
| 子 Agent | `explore`, `general` | `explore`, `general` in `agent.ts` |
| 权限检查 | `evaluatePermission()` | `PermissionNext.evaluate()` |
| 子 Agent 调用 | `taskTool.execute()` | `TaskTool.execute()` |
| 会话循环 | `mainLoop()` | `SessionPrompt.loop()` |
| 消息存储 | 直接处理 | `MessageV2` |

---

## 9. 关键源码文件索引

### 9.1 核心文件

| 文件 | 职责 | 关键代码行 |
|------|------|-----------|
| `src/agent/agent.ts` | Agent 定义和加载 | 22-337 |
| `src/session/prompt.ts` | 会话提示处理和主循环 | 57-1996 |
| `src/session/processor.ts` | LLM 响应处理和工具执行 | 20-436 |
| `src/tool/task.ts` | TaskTool 子 Agent 调用 | 23-193 |
| `src/permission/next.ts` | 权限系统实现 | 13-280 |
| `src/config/config.ts` | 配置加载 | 33-200+ |

### 9.2 消息相关

| 文件 | 职责 |
|------|------|
| `src/session/message-v2.ts` | 消息类型定义（User/Assistant/Part） |
| `src/session/index.ts` | Session 管理 |
| `src/session/compaction.ts` | 上下文压缩 |

### 9.3 LLM 相关

| 文件 | 职责 |
|------|------|
| `src/session/llm.ts` | LLM 流式调用 |
| `src/provider/provider.ts` | 模型提供商管理 |
| `src/provider/transform.ts` | 模型请求转换 |

### 9.4 工具相关

| 文件 | 职责 |
|------|------|
| `src/tool/registry.ts` | 工具注册表 |
| `src/tool/tool.ts` | 工具基类定义 |
| `src/tool/read.ts` | 读文件工具 |
| `src/tool/bash.ts` | 命令执行工具 |

---

## 10. 常见问题解析

### Q1: 子 Agent 为什么不支持递归调用？

```typescript
// TaskTool.execute() 中
tools: {
  todowrite: false,
  todoread: false,
  task: false,  // ◀ 禁用 task 工具，防止递归
}
```

**原因**：
1. 防止无限递归调用
2. 子 Agent 设计为单次任务执行
3. 避免复杂的作用域嵌套

### Q2: Session 的 parentID 有什么用？

```typescript
// 创建子会话时
const session = await Session.create({
  parentID: ctx.sessionID,  // ◀ 关联父会话
  ...
})
```

**用途**：
1. 追踪调用链，便于调试
2. 权限继承（可选）
3. 结果汇总和展示

### Q3: Agent 和 Session 是什么关系？

```
Session ── 一次会话，可以切换 Agent
  │
  └── Agent ── 当前使用的 Agent 配置
        │
        ├── permission: 工具权限
        ├── model: 使用的模型
        └── prompt: 系统提示
```

一个 Session 可以多次切换 Agent，但同一时刻只有一个 Agent 生效。

---

## 附录：关键类型定义

```typescript
// MessageV2 核心类型
namespace MessageV2 {
  interface User {
    id: string
    role: "user"
    agent: string      // 当前使用的 Agent
    model: Model
    parts: Part[]
  }

  interface Assistant {
    id: string
    role: "assistant"
    agent: string
    mode: string       // Agent 名称
    finish?: string    // 完成状态
    parts: Part[]
  }

  type Part = TextPart | ToolPart | SubtaskPart | AgentPart | ...

  interface SubtaskPart {
    type: "subtask"
    agent: string       // 子 Agent 名称
    prompt: string
    description: string
    command?: string
  }

  interface AgentPart {
    type: "agent"
    name: string        // @mentioned agent
  }
}

// Session 核心类型
namespace Session {
  interface Info {
    id: string
    parentID?: string    // 父会话 ID（子会话才有）
    agent?: string
    permission: PermissionNext.Ruleset
    // ...
  }
}
```

---

> 文档生成时间: 2026-03-28
