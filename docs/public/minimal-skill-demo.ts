/**
 * SKILL 系统 - 最小化实现示例
 *
 * 这是一个完整可运行的最小化 SKILL 实现
 * 演示了核心原理：Markdown 文件定义技能 → 自动扫描加载 → AI 调用
 *
 * 运行方式:
 *   bun run minimal-skill-demo.ts
 *   或
 *   npx ts-node minimal-skill-demo.ts
 */

import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"

// ==================== 类型定义 ====================

interface SkillInfo {
  name: string
  description: string
  location: string
  content: string
}

// ==================== 核心实现 ====================

/**
 * 解析 SKILL.md 文件
 */
async function parseSkill(filePath: string): Promise<SkillInfo | null> {
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

/**
 * 技能管理器 - 核心类
 */
class SkillManager {
  private skills: Map<string, SkillInfo> = new Map()
  private roots: string[] = []
  private loaded = false

  constructor(...roots: string[]) {
    this.roots = roots
  }

  /**
   * 扫描并加载所有技能
   */
  async load(): Promise<void> {
    if (this.loaded) return

    console.log("🔍 Scanning for skills in:", this.roots)

    for (const root of this.roots) {
      try {
        await this.scanDirectory(root)
      } catch (err) {
        console.warn(`⚠️  Failed to scan ${root}:`, err)
      }
    }

    this.loaded = true
    console.log(`✅ Loaded ${this.skills.size} skill(s)\n`)
  }

  /**
   * 扫描单个目录
   */
  private async scanDirectory(dir: string): Promise<void> {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        // 检查是否有 SKILL.md
        const skillPath = path.join(fullPath, "SKILL.md")
        try {
          const stat = await fs.stat(skillPath)
          if (stat.isFile()) {
            await this.addSkill(skillPath)
          }
        } catch {
          // 不是技能目录，递归扫描
          await this.scanDirectory(fullPath)
        }
      } else if (entry.name === "SKILL.md") {
        // SKILL.md 在根目录
        await this.addSkill(fullPath)
      }
    }
  }

  /**
   * 添加技能
   */
  private async addSkill(filePath: string): Promise<void> {
    const skill = await parseSkill(filePath)
    if (!skill) return

    if (this.skills.has(skill.name)) {
      console.warn(`⚠️  Duplicate skill: ${skill.name} (${filePath})`)
    }

    this.skills.set(skill.name, skill)
    console.log(`  📦 Found: ${skill.name}`)
  }

  /**
   * 获取单个技能
   */
  get(name: string): SkillInfo | undefined {
    return this.skills.get(name)
  }

  /**
   * 获取所有技能
   */
  all(): SkillInfo[] {
    return Array.from(this.skills.values())
  }

  /**
   * 获取技能列表（用于 AI 选择）
   */
  list(): Array<{ name: string; description: string }> {
    return this.all().map((s) => ({
      name: s.name,
      description: s.description,
    }))
  }
}

/**
 * 技能工具 - AI Agent 调用接口
 */
function createSkillTool(manager: SkillManager) {
  return {
    /**
     * 调用技能
     */
    async call(name: string): Promise<string> {
      const skill = manager.get(name)

      if (!skill) {
        const available = manager.list()
        throw new Error(
          `Skill "${name}" not found.\n` +
          `Available: ${available.map((s) => s.name).join(", ") || "none"}`
        )
      }

      // 格式化输出
      return [
        `## Skill: ${skill.name}`,
        `**Description**: ${skill.description}`,
        `**Location**: ${skill.location}`,
        "",
        skill.content,
      ].join("\n")
    },

    /**
     * 获取可用技能列表
     */
    available(): Array<{ name: string; description: string }> {
      return manager.list()
    },
  }
}

// ==================== 演示 ====================

async function demo() {
  console.log("=".repeat(60))
  console.log("SKILL 系统 - 最小化实现演示")
  console.log("=".repeat(60))
  console.log()

  // 创建示例技能目录
  const demoDir = path.join(__dirname, "demo-skills")
  await setupDemoSkills(demoDir)

  // 创建技能管理器
  const manager = new SkillManager(demoDir)

  // 创建工具接口
  const tool = createSkillTool(manager)

  // 加载技能
  await manager.load()

  // 列出可用技能
  console.log("📋 Available Skills:")
  tool.available().forEach((s) => {
    console.log(`   ${s.name}`)
    console.log(`   └─ ${s.description}`)
  })
  console.log()

  // 模拟 AI Agent 调用技能
  console.log("-".repeat(60))
  console.log("🤖 Simulating AI Agent calling skills:\n")

  // 场景 1: 文件操作
  console.log(">>> Agent needs help with file operations:")
  const result1 = await tool.call("bun-file-io")
  console.log(result1)
  console.log()

  // 场景 2: Git 操作
  console.log(">>> Agent needs help with git:")
  const result2 = await tool.call("git-commands")
  console.log(result2)
  console.log()

  // 场景 3: 不存在的技能
  console.log(">>> Agent asks for non-existent skill:")
  try {
    await tool.call("non-existent-skill")
  } catch (err) {
    console.log(`❌ Error: ${err.message}`)
  }

  // 清理
  await fs.rm(demoDir, { recursive: true, force: true })
}

/**
 * 创建演示用的技能文件
 */
async function setupDemoSkills(dir: string): Promise<void> {
  await fs.mkdir(dir, { recursive: true })

  // 技能 1: Bun 文件操作
  await fs.mkdir(path.join(dir, "bun-file-io"), { recursive: true })
  await fs.writeFile(
    path.join(dir, "bun-file-io", "SKILL.md"),
    `---
name: bun-file-io
description: Use when working with file operations - reading, writing, scanning, or deleting files.
---

## Bun File APIs

- \`Bun.file(path)\` creates a lazy file reference
- Call \`.text()\`, \`.json()\`, \`.stream()\` to read
- \`Bun.write(dest, input)\` for writing strings, buffers, files
- \`Bun.file().delete()\` deletes a file

## Glob Pattern Matching

\`\`\`typescript
const glob = new Bun.Glob("**/*.ts")
for await (const file of glob.scan({ cwd: "./src" })) {
  console.log(file)
}
\`\`\`

## When to Use node:fs

Use \`node:fs/promises\` for:
- Directory operations: \`mkdir\`, \`readdir\`, \`rm\`
- Recursive operations

## Quick Checklist

- [ ] Prefer Bun APIs for file access
- [ ] Use \`path.join()\` for paths
- [ ] Check \`Bun.file().exists()\` before reading
`
  )

  // 技能 2: Git 命令
  await fs.mkdir(path.join(dir, "git-commands"), { recursive: true })
  await fs.writeFile(
    path.join(dir, "git-commands", "SKILL.md"),
    `---
name: git-commands
description: Use when working with git - commits, branches, merging, or resolving conflicts.
---

## Common Git Commands

### Basic Operations
- \`git status\` - Check current state
- \`git add <file>\` - Stage changes
- \`git commit -m "message"\` - Commit staged changes
- \`git push\` - Push to remote

### Branching
- \`git branch\` - List branches
- \`git checkout -b <name>\` - Create and switch
- \`git merge <branch>\` - Merge branch

### Reviewing
- \`git log --oneline -10\` - Recent commits
- \`git diff\` - Unstaged changes
- \`git diff --staged\` - Staged changes

## Best Practices

1. Always check \`git status\` before committing
2. Write meaningful commit messages
3. Pull before pushing to avoid conflicts
`
  )

  // 技能 3: API 设计
  await fs.mkdir(path.join(dir, "api-design"), { recursive: true })
  await fs.writeFile(
    path.join(dir, "api-design", "SKILL.md"),
    `---
name: api-design
description: Use when designing or reviewing REST APIs.
---

## REST API Design Principles

### URL Structure
- \`/users\` - Collection of users
- \`/users/:id\` - Specific user
- Use nouns, not verbs: \`GET /users\` not \`GET /getUsers\`

### HTTP Methods
- \`GET\` - Retrieve resources
- \`POST\` - Create new resource
- \`PUT\` - Update entire resource
- \`PATCH\` - Partial update
- \`DELETE\` - Remove resource

### Status Codes
- \`200\` - Success
- \`201\` - Created
- \`400\` - Bad Request
- \`404\` - Not Found
- \`500\` - Server Error

## Example

\`\`\`
POST /users
{
  "name": "John",
  "email": "john@example.com"
}

Response: 201 Created
{
  "id": 1,
  "name": "John",
  "email": "john@example.com"
}
\`\`\`
`
  )
}

// 运行演示
demo().catch(console.error)
