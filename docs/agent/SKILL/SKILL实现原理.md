# SKILL 系统实现原理详解

> 基于 OpenCode 源码分析

## 目录

1. [概述](#概述)
2. [核心概念](#核心概念)
3. [架构设计](#架构设计)
4. [源码解析](#源码解析)
5. [数据流分析](#数据流分析)
6. [最小化实现](#最小化实现)
7. [使用示例](#使用示例)

---

## 概述

SKILL 是 OpenCode 中的**技能系统**，允许开发者通过 Markdown 文件定义专业领域的技能和知识，供 AI Agent 在特定场景下调用。它本质上是一种**知识注入机制**，让 AI 能够获取项目特定的规范、最佳实践和工作流程。

### 设计目标

- **知识封装**：将项目特定知识封装为可复用的 Markdown 文件
- **自动发现**：系统自动扫描并加载所有可用的技能
- **权限控制**：支持基于 Agent 权限的技能访问控制
- **市场生态**：提供技能市场，支持安装/卸载/分享技能

---

## 核心概念

### 1. SKILL.md 文件格式

Skill 的内容存储在 `SKILL.md` 文件中，采用 **YAML Front Matter** 格式：

```markdown
---
name: skill-name
description: 技能描述，说明何时应该使用此技能
---

## 使用场景

这里是技能的详细内容和指导...
```

**Front Matter 必填字段：**
| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 技能唯一名称 |
| `description` | string | 简短描述，供 AI 判断何时使用 |

### 2. 技能存储位置

系统支持多层次的技能扫描（优先级从高到低）：

```
~/.claude/skills/          # 全局技能（用户级别）
.claude/skills/            # 项目级技能（从当前目录向上查找）
.opencode/skill/           # OpenCode 专用技能目录
自定义路径                  # 配置中指定的额外路径
```

---

## 架构设计

### 整体架构图

```
┌─────────────────────────────────────────────────────────────┐
│                        CLI 入口                              │
│                    (packages/opencode/src/index.ts)          │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                     Command 系统                             │
│              (packages/opencode/src/command/)                 │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Skill.all() → 加载所有技能作为可调用命令                 │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                      Skill 系统                              │
│              (packages/opencode/src/skill/)                  │
│  ┌───────────────────────┬────────────────────────────────┐ │
│  │   skill.ts            │   market.ts                     │ │
│  │   - 技能加载/扫描      │   - 技能市场管理                │ │
│  │   - 状态管理          │   - 安装/卸载/启用/禁用          │ │
│  └───────────────────────┴────────────────────────────────┘ │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                      Tool 系统                               │
│              (packages/opencode/src/tool/)                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  SkillTool - AI Agent 调用技能的接口                     │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 核心模块

| 模块 | 文件 | 职责 |
|------|------|------|
| **Skill** | `skill.ts` | 核心：扫描、加载、管理技能 |
| **SkillMarket** | `market.ts` | 市场：技能的安装/卸载/分享 |
| **SkillTool** | `tool/skill.ts` | 工具：AI Agent 调用接口 |
| **Command** | `command/index.ts` | 命令：将技能注册为命令 |
| **Routes** | `server/routes/skill.ts` | API：HTTP 接口 |

---

## 源码解析

### 1. 核心类型定义

**文件：** `packages/opencode/src/skill/skill.ts`

```typescript
export namespace Skill {
  // 技能信息结构
  export const Info = z.object({
    name: z.string(),        // 技能名称（唯一标识）
    description: z.string(), // 技能描述
    location: z.string(),    // 文件路径
    content: z.string(),      // Markdown 正文内容
  })
  export type Info = z.infer<typeof Info>
}
```

### 2. 技能扫描机制

**核心代码：** `Skill.state` 懒加载状态

```typescript
// Instance.state 是懒加载的核心入口
// 它基于 State.create 实现，返回一个函数

// 文件：packages/opencode/src/project/instance.ts
export const Instance = {
  // state 签名：传入 init 函数和可选的 dispose 函数
  // 返回 () => S 类型的函数
  state<S>(
    init: () => S,
    dispose?: (state: Awaited<S>) => Promise<void>
  ): () => S {
    return State.create(
      () => Instance.key,  // 用实例 key 作为根标识
      init,
      dispose
    )
  }
}

// Skill.state 的实际使用
export const state = Instance.state(async () => {
  const skills: Record<string, Info> = {}

  // 1. 扫描 .claude/skills/ 目录（兼容 Claude Code）
  const claudeDirs = await Array.fromAsync(
    Filesystem.up({
      targets: [".claude"],
      start: Instance.directory,
      stop: Instance.worktree,
    }),
  )
  // 也包含全局 ~/.claude/skills/
  const globalClaude = `${Global.Path.home}/.claude`
  if (await Filesystem.isDir(globalClaude)) {
    claudeDirs.push(globalClaude)
  }

  // 使用 Glob 模式扫描所有 SKILL.md 文件
  const matches = await Array.fromAsync(
    CLAUDE_SKILL_GLOB.scan({
      cwd: dir,
      absolute: true,
      onlyFiles: true,
      followSymlinks: true,
      dot: true,
    }),
  )

  // 2. 扫描 .opencode/skill/ 目录
  for (const dir of await Config.directories()) {
    for await (const match of OPENCODE_SKILL_GLOB.scan({ cwd: dir, ... })) {
      await addSkill(match)
    }
  }

  // 3. 扫描配置中指定的额外路径
  const config = await Config.get()
  for (const skillPath of config.skills?.paths ?? []) {
    // 支持 ~ 展开和相对路径
    const resolved = path.resolve(...)
    for await (const match of SKILL_GLOB.scan({ cwd: resolved, ... })) {
      await addSkill(match)
    }
  }

  return skills
})
```

**扫描流程图：**

```
开始扫描
    │
    ▼
┌─────────────────────┐
│ 扫描 .claude/skills │ ───→ Glob("skills/**/SKILL.md")
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 扫描 .opencode/skill│ ───→ Glob("{skill,skills}/**/SKILL.md")
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 扫描自定义路径       │ ───→ Glob("**/SKILL.md")
└──────────┬──────────┘
           │
           ▼
    ┌──────┴──────┐
    │ 解析每个文件 │
    │  - Front Matter (name, description)
    │  - 正文内容 (content)
    └──────┬──────┘
           │
           ▼
    ┌──────────────┐
    │ 存入 Record  │
    │ { name: Info }│
    └──────────────┘
```

### 3. 技能市场 (SkillMarket)

**文件：** `packages/opencode/src/skill/market.ts`

市场系统负责：
- 与远程市场服务交互（通过 `mdskills` CLI）
- 管理本地安装的技能
- 处理技能的安装/卸载/启用/禁用

```typescript
export namespace SkillMarket {
  // 状态文件：记录已安装技能
  const stateFile = path.join(Global.Path.state, "skills-market.json")

  // 市场根目录
  const marketRoot = path.join(Global.Path.config, "skills", "market")
  const localRoot = path.join(Global.Path.config, "skills", "local")

  // 核心 API
  export async function list()        // 列出已安装和推荐技能
  export async function detail(value) // 获取技能详情
  export async function install(value)    // 从市场安装
  export async function uninstall(value)   // 卸载技能
  export async function enable(value)      // 启用技能
  export async function disable(value)    // 禁用技能
  export async function create(input)      // 创建本地技能
}
```

### 4. 技能作为工具 (SkillTool)

**文件：** `packages/opencode/src/tool/skill.ts`

SkillTool 定义了 AI Agent 如何调用技能：

```typescript
export const SkillTool = Tool.define("skill", async (ctx) => {
  const skills = await Skill.all()

  // 权限过滤：根据 Agent 权限决定可访问的技能
  const accessibleSkills = agent
    ? skills.filter((skill) => {
        const rule = PermissionNext.evaluate("skill", skill.name, agent.permission)
        return rule.action !== "deny"
      })
    : skills

  // 返回可用技能列表
  const description = [
    "Load a skill to get detailed instructions...",
    "Only the skills listed here are available:",
    "<available_skills>",
    ...accessibleSkills.map((skill) => `
      <skill>
        <name>${skill.name}</name>
        <description>${skill.description}</description>
      </skill>
    `),
    "</available_skills>",
  ].join(" ")

  // 执行：加载指定技能的内容
  async execute(params, ctx) {
    const skill = await Skill.get(params.name)
    const output = [
      `## Skill: ${skill.name}`,
      `**Base directory**: ${path.dirname(skill.location)}`,
      skill.content.trim()
    ].join("\n")
    return { title: `Loaded skill: ${skill.name}`, output }
  }
})
```

### 5. 技能作为命令 (Command)

**文件：** `packages/opencode/src/command/index.ts`

技能也被注册为可调用的命令：

```typescript
// 将所有技能注册为命令
for (const skill of await Skill.all()) {
  result[skill.name] = {
    name: skill.name,
    description: skill.description,
    source: "skill",
    get template() {
      return skill.content  // 技能内容作为命令模板
    },
    hints: [],
  }
}
```

---

## 数据流分析

### 启动加载流程

```
┌────────────┐     ┌────────────┐     ┌────────────┐
│   CLI 启动  │ ──→ │ Config加载 │ ──→ │ 技能扫描   │
└────────────┘     └────────────┘     └────────────┘
                                            │
                                            ▼
┌────────────┐     ┌────────────┐     ┌────────────┐
│  Agent运行  │ ←── │ 工具注册   │ ←── │ 状态缓存   │
└────────────┘     └────────────┘     └────────────┘
```

### 请求调用流程

```
用户/Agent 调用 skill("bun-file-io")
            │
            ▼
┌─────────────────────────────────┐
│  1. Skill.get("bun-file-io")   │
│     └─→ 从缓存状态获取技能信息   │
└─────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────┐
│  2. 权限检查 (PermissionNext)   │
│     └─→ 验证 Agent 是否有权限    │
└─────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────┐
│  3. 返回技能内容                 │
│     {                           │
│       name: "bun-file-io",      │
│       content: "## Use this..."  │
│     }                           │
└─────────────────────────────────┘
```

---

## 最小化实现

以下是 SKILL 系统的核心简化实现，保留最关键的功能：

### 1. 技能信息类型

```typescript
// skill-types.ts
import { z } from "zod"
import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"

// 技能信息结构
export const SkillInfo = z.object({
  name: z.string(),
  description: z.string(),
  location: z.string(),
  content: z.string(),
})
export type SkillInfo = z.infer<typeof SkillInfo>

// 加载并解析 SKILL.md 文件
export async function parseSkill(filePath: string): Promise<SkillInfo | null> {
  try {
    const content = await fs.readFile(filePath, "utf-8")
    const { data, content: body } = matter(content)

    return {
      name: data.name || path.basename(path.dirname(filePath)),
      description: data.description || "",
      location: filePath,
      content: body.trim(),
    }
  } catch {
    return null
  }
}
```

### 2. 技能管理器（核心）

```typescript
// skill-manager.ts
import { Glob } from "bun"
import { parseSkill, type SkillInfo } from "./skill-types"

export class SkillManager {
  private skills: Map<string, SkillInfo> = new Map()
  private cache: Promise<Map<string, SkillInfo>> | null = null

  // 技能扫描根目录
  private roots: string[] = []

  constructor(...roots: string[]) {
    this.roots = roots
  }

  // 懒加载：扫描并缓存所有技能
  async load(): Promise<Map<string, SkillInfo>> {
    if (this.cache) return this.cache

    this.cache = this.scanAll()
    return this.cache
  }

  private async scanAll(): Promise<Map<string, SkillInfo>> {
    const glob = new Glob("**/SKILL.md")
    const skills = new Map<string, SkillInfo>()

    for (const root of this.roots) {
      for await (const file of glob.scan({ cwd: root, absolute: true })) {
        const skill = await parseSkill(file)
        if (skill) {
          // 警告重复
          if (skills.has(skill.name)) {
            console.warn(`Duplicate skill: ${skill.name}`)
          }
          skills.set(skill.name, skill)
        }
      }
    }

    return skills
  }

  // 获取单个技能
  async get(name: string): Promise<SkillInfo | undefined> {
    const skills = await this.load()
    return skills.get(name)
  }

  // 获取所有技能
  async all(): Promise<SkillInfo[]> {
    const skills = await this.load()
    return Array.from(skills.values())
  }

  // 列出所有技能名称
  async names(): Promise<string[]> {
    const skills = await this.load()
    return Array.from(skills.keys())
  }
}
```

### 3. 技能工具（AI Agent 接口）

```typescript
// skill-tool.ts
import { SkillManager } from "./skill-manager"
import { z } from "zod"

export function createSkillTool(skillManager: SkillManager) {
  // 工具定义（类似 OpenCode 的 Tool.define）
  return {
    name: "skill",
    description: "Load a skill to get detailed instructions for a specific task.",

    parameters: z.object({
      name: z.string().describe("The skill identifier from available_skills"),
    }),

    // 执行函数
    async execute(params: { name: string }) {
      const skill = await skillManager.get(params.name)

      if (!skill) {
        const available = await skillManager.names()
        throw new Error(
          `Skill "${params.name}" not found. Available: ${available.join(", ")}`
        )
      }

      // 返回格式化输出
      return {
        title: `Skill: ${skill.name}`,
        output: [
          `## ${skill.name}`,
          `**Description**: ${skill.description}`,
          `**Location**: ${skill.location}`,
          "",
          skill.content,
        ].join("\n"),
      }
    },

    // 获取可用技能列表（用于构建描述）
    async getAvailableSkills() {
      const skills = await skillManager.all()
      return skills.map((s) => ({
        name: s.name,
        description: s.description,
      }))
    },
  }
}
```

### 4. 完整示例：最小化 Skill 系统

```typescript
// minimal-skill-system.ts
import { SkillManager } from "./skill-manager"
import { createSkillTool } from "./skill-tool"

// ==================== 完整示例 ====================

async function main() {
  // 1. 创建技能管理器，指定扫描目录
  const manager = new SkillManager(
    "./skills",           // 本地技能
    "./.claude/skills",    // Claude Code 兼容
    "/home/user/skills",   // 全局技能
  )

  // 2. 创建工具接口
  const skillTool = createSkillTool(manager)

  // 3. 列出所有可用技能
  const available = await skillTool.getAvailableSkills()
  console.log("Available Skills:")
  available.forEach((s) => {
    console.log(`  - ${s.name}: ${s.description}`)
  })

  // 4. AI Agent 调用技能
  console.log("\n--- Calling skill('bun-file-io') ---")
  const result = await skillTool.execute({ name: "bun-file-io" })
  console.log(result.output)
}

main().catch(console.error)
```

### 5. 示例 SKILL.md 文件

创建 `./skills/bun-file-io/SKILL.md`：

```markdown
---
name: bun-file-io
description: Use this when working with file operations like reading, writing, or scanning files.
---

## Bun File APIs

- `Bun.file(path)` creates a lazy file reference
- Call `.text()`, `.json()`, `.stream()` to read
- `Bun.write(dest, input)` for writing
- `Bun.Glob` for pattern matching

## When to use node:fs

Use `node:fs/promises` for directory operations:
- `mkdir`, `readdir`, `rm` (recursive)

## Quick Checklist

- [ ] Prefer Bun APIs over Node `fs` for file access
- [ ] Use `path.join()` for path construction
- [ ] Check `Bun.file().exists()` before reading
```

---

## 使用示例

### 1. 在项目中使用

```typescript
// 在 Agent 初始化时加载技能
import { SkillManager } from "./skill-manager"

const skillManager = new SkillManager(
  "./skills",
  ".claude/skills"
)

// 初始化技能
await skillManager.load()

// Agent 可以根据上下文自动选择技能
async function agentTask(task: string) {
  // 模拟：根据任务选择技能
  if (task.includes("file")) {
    const skill = await skillManager.get("bun-file-io")
    console.log("Loaded skill:", skill.content)
  }
}
```

### 2. 自定义技能扫描

```typescript
// 扫描特定路径
const manager = new SkillManager(
  path.join(process.env.HOME!, ".myapp/skills"),
  "./team-skills",
)

// 增量加载新技能
async function reloadSkill(skillPath: string) {
  const skill = await parseSkill(skillPath)
  if (skill) {
    const skills = await manager.load()
    skills.set(skill.name, skill)
  }
}
```

### 3. 权限控制集成

```typescript
// 简单的权限检查
function canAccessSkill(skillName: string, allowedSkills: string[]): boolean {
  return allowedSkills.includes(skillName)
}

// 使用
const allowed = ["bun-file-io", "git-commands"]
const skill = await skillManager.get("secret-skill")

if (!canAccessSkill(skill.name, allowed)) {
  throw new Error(`Access denied to skill: ${skill.name}`)
}
```

---

## 关键设计模式

### 1. 懒加载状态 (核心实现)

这是 SKILL 系统最核心的设计，使用了巧妙的 **Promise 缓存 + 实例隔离** 模式。

#### 1.1 State.create 核心实现

**文件：** `packages/opencode/src/project/state.ts`

```typescript
export namespace State {
  // 全局状态存储：按根 key 分组
  const recordsByKey = new Map<string, Map<any, Entry>>()

  interface Entry {
    state: any           // 存储的是 Promise！
    dispose?: (state) => Promise<void>
  }

  /**
   * 创建一个懒加载状态
   *
   * @param root - 返回唯一标识的函数（如实例 key）
   * @param init - 初始化函数（async）
   * @param dispose - 可选的清理函数
   * @returns 一个函数，调用时返回状态
   */
  export function create<S>(
    root: () => string,
    init: () => S,
    dispose?: (state: Awaited<S>) => Promise<void>
  ) {
    return () => {
      const key = root()  // 获取当前实例的唯一 key

      // 获取或创建该 key 对应的 entries Map
      let entries = recordsByKey.get(key)
      if (!entries) {
        entries = new Map<string, Entry>()
        recordsByKey.set(key, entries)
      }

      // 关键！用 init 函数本身作为子 key
      // 同一实例多次调用，如果 init 是同一个函数引用，就返回缓存
      const exists = entries.get(init)
      if (exists) return exists.state as S  // 直接返回缓存的 Promise

      // 首次调用：执行 init（可能是 async 函数）
      const state = init()  // 返回 Promise

      entries.set(init, { state, dispose })
      return state
    }
  }
}
```

#### 1.2 Skill.state 的使用方式

**文件：** `packages/opencode/src/skill/skill.ts`

```typescript
export namespace Skill {
  // 注意：init 是 async 函数，返回 Promise
  export const state = Instance.state(async () => {
    const skills: Record<string, Info> = {}

    // ... 扫描所有 SKILL.md 文件 ...

    return skills  // 返回 Map<string, Info>
  })

  // 使用方式：每次都是通过 .then() 获取结果
  export async function get(name: string) {
    return state().then((x) => x[name])
  }

  export async function all() {
    return state().then((x) => Object.values(x))
  }
}
```

#### 1.3 懒加载流程图解

```
┌─────────────────────────────────────────────────────────────────┐
│                    首次调用 Skill.all()                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  state() 被调用                                                 │
│    │                                                           │
│    ▼                                                           │
│  key = Instance.key  ──→ "user123:/path/to/project"            │
│    │                                                           │
│    ▼                                                           │
│  entries = recordsByKey.get(key)  ──→ undefined (新建 Map)       │
│    │                                                           │
│    ▼                                                           │
│  exists = entries.get(init)  ──→ undefined (首次)               │
│    │                                                           │
│    ▼                                                           │
│  state = init()  ──→ 执行 async 扫描函数，返回 Promise          │
│    │                                                           │
│    ▼                                                           │
│  entries.set(init, { state })  ──→ 缓存 Promise                 │
│    │                                                           │
│    ▼                                                           │
│  return Promise<Record<string, SkillInfo>>                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    第二次调用 Skill.all()                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  state() 被调用                                                 │
│    │                                                           │
│    ▼                                                           │
│  key = Instance.key  ──→ "user123:/path/to/project"            │
│    │                                                           │
│    ▼                                                           │
│  entries = recordsByKey.get(key)  ──→ 已有 Map                  │
│    │                                                           │
│    ▼                                                           │
│  exists = entries.get(init)  ──→ 已缓存的 Promise ✓             │
│    │                                                           │
│    ▼                                                           │
│  return 缓存的 Promise (不再执行 init)                          │
└─────────────────────────────────────────────────────────────────┘
```

#### 1.4 为什么存储 Promise 而不是 resolved 值？

```typescript
// 这是关键设计选择

// 方案 A: 存储 resolved 值（错误）
const state = await init()  // 等待完成
entries.set(init, state)
return state

// 问题：第一次调用会阻塞，其他调用也必须等待

// 方案 B: 存储 Promise（正确）⭐
const state = init()  // 不等待
entries.set(init, { state })
return state

// 优点：
// 1. 首次调用立即返回 Promise，不阻塞
// 2. Promise 只能 resolved 一次，后续调用共享同一个结果
// 3. 所有 .then() 回调都会得到相同的结果
```

#### 1.5 实例隔离

```typescript
// 不同项目/用户有独立的状态缓存

// 实例 1: /project/a
State.create(
  () => "user1:/project/a",
  async () => { /* 扫描 project/a 的 skills */ }
)

// 实例 2: /project/b
State.create(
  () => "user1:/project/b",
  async () => { /* 扫描 project/b 的 skills */ }
)

// 实例 3: 不同用户
State.create(
  () => "user2:/project/a",
  async () => { /* 扫描另一个用户的 project/a */ }
)

// 每个实例独立缓存，互不影响
```

#### 1.6 最小化懒加载实现

```typescript
// 如果你只需要简单的懒加载，不需要实例隔离

class LazyState<T> {
  private cache: Promise<T> | null = null

  constructor(private init: () => Promise<T>) {}

  get(): Promise<T> {
    if (!this.cache) {
      this.cache = this.init()  // 首次调用时执行
    }
    return this.cache  // 后续调用返回缓存的 Promise
  }
}

// 使用
const skillState = new LazyState(async () => {
  console.log("Scanning skills...")  // 只打印一次
  const skills = await scanSkills()
  return skills
})

// 多次调用
skillState.get().then(...)  // 触发扫描
skillState.get().then(...)  // 使用缓存
skillState.get().then(...)  // 使用缓存
```

#### 1.7 懒加载的优势

| 特性 | 说明 |
|------|------|
| **按需加载** | 只有实际用到技能时才扫描文件系统 |
| **避免重复** | 多次调用只执行一次初始化 |
| **性能优化** | 减少启动时的 I/O 操作 |
| **内存缓存** | 已加载的技能常驻内存，快速访问 |
| **实例隔离** | 不同项目/用户有独立的状态 |

### 2. 多根扫描

```typescript
// 支持多个扫描根目录
const roots = [
  "./.claude",      // 项目级
  globalHome,       // 全局级
  ...configRoots,   // 配置指定
]

for (const root of roots) {
  for await (const file of glob.scan({ cwd: root })) {
    await addSkill(file)
  }
}
```

### 3. Front Matter 解析

```typescript
import matter from "gray-matter"

const { data, content } = matter(markdownContent)
// data.name, data.description 来自 YAML
// content 是 Markdown 正文
```

### 4. 权限评估

```typescript
// 基于规则的权限检查
const rule = PermissionNext.evaluate("skill", skillName, agent.permission)
if (rule.action === "deny") {
  throw new Error("Access denied")
}
```

---

## 总结

SKILL 系统是一个简洁而强大的知识注入机制：

| 特性 | 实现 |
|------|------|
| **存储格式** | Markdown + YAML Front Matter |
| **扫描机制** | Glob 模式匹配多目录 |
| **核心抽象** | `Skill.Info` 类型 + 懒加载状态 |
| **访问接口** | Tool API + Command API |
| **扩展性** | 配置路径 + 市场安装 |
| **安全** | 权限评估系统 |

通过 SKILL.md 文件，开发者可以轻松定义项目特定的知识和规范，让 AI Agent 在合适的场景下自动加载并应用这些知识。
