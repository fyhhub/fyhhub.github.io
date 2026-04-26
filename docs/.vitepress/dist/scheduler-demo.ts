/**
 * 定时任务最小化实现完整代码
 * 基于 OpenCode Scheduler 架构
 *
 * 运行方式: npx ts-node scheduler-demo.ts
 * 或: bun run scheduler-demo.ts
 */

// ==================== 1. 类型定义 ====================

type Task = {
  id: string
  interval: number
  run: () => Promise<void>
  scope: "instance" | "global"
}

type Timer = ReturnType<typeof setInterval>

type Entry = {
  tasks: Map<string, Task>
  timers: Map<string, Timer>
}

type TaskStatus =
  | "queued"
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "aborted"

type TaskInput = {
  id: string
  data: unknown
  onProgress?: (step: string, message: string) => void
}

type TaskContext = {
  id: string
  status: TaskStatus
  input: TaskInput
  startedAt?: number
  completedAt?: number
  result?: unknown
  error?: string
  progress: { step: string; message: string }[]
}

type Executor = (ctx: TaskContext, input: TaskInput) => Promise<void>

// ==================== 2. Scheduler 核心 ====================

const records = new Map<string, Entry>()

function createEntry(): Entry {
  return { tasks: new Map(), timers: new Map() }
}

function getOrCreate(key: string): Entry {
  if (!records.has(key)) records.set(key, createEntry())
  return records.get(key)!
}

const Scheduler = {
  register(task: Task, scopeKey = "default") {
    const entry = getOrCreate(scopeKey)

    if (task.scope === "global" && entry.timers.has(task.id)) {
      console.log(`[Scheduler] 全局任务 ${task.id} 已存在，跳过`)
      return
    }

    if (entry.timers.has(task.id)) {
      clearInterval(entry.timers.get(task.id)!)
    }

    entry.tasks.set(task.id, task)
    const timer = setInterval(async () => {
      try {
        await task.run()
      } catch (err) {
        console.error(`[Scheduler] 任务 ${task.id} 失败:`, err)
      }
    }, task.interval)

    timer.unref()
    entry.timers.set(task.id, timer)
    console.log(`[Scheduler] 注册 ${task.id}, 间隔 ${task.interval}ms`)
    task.run().catch((err) => console.error(`[Scheduler] 初始执行失败:`, err))
  },

  unregister(taskId: string, scopeKey = "default") {
    const entry = records.get(scopeKey)
    if (!entry) return
    if (entry.timers.has(taskId)) clearInterval(entry.timers.get(taskId)!)
    entry.tasks.delete(taskId)
    entry.timers.delete(taskId)
  },

  dispose(scopeKey = "default") {
    const entry = records.get(scopeKey)
    if (!entry) return
    for (const t of entry.timers.values()) clearInterval(t)
    entry.tasks.clear()
    entry.timers.clear()
    records.delete(scopeKey)
  },
}

// ==================== 3. TaskQueue 核心 ====================

type QueueItem = { id: string; input: TaskInput }

class TaskQueue {
  private queues = new Map<string, { running: string | null; pending: QueueItem[] }>()
  private contexts = new Map<string, TaskContext>()
  private executor: Executor

  constructor(executor: Executor) {
    this.executor = executor
  }

  enqueue(input: TaskInput, branchKey = "default"): TaskContext {
    const ctx: TaskContext = {
      id: input.id,
      status: "queued",
      input,
      progress: [],
    }
    this.contexts.set(input.id, ctx)

    const q = this.getOrCreate(branchKey)
    q.pending.push({ id: input.id, input })
    ctx.progress.push({ step: "queued", message: `位置 ${q.pending.length}` })
    console.log(`[Queue] 入队 ${input.id}, 分支 ${branchKey}`)

    if (!q.running) this.processNext(branchKey)
    return ctx
  }

  getContext(id: string) {
    return this.contexts.get(id)
  }

  getStatus(branchKey = "default") {
    const q = this.queues.get(branchKey)
    return q ? { running: q.running, pending: q.pending.length } : { running: null, pending: 0 }
  }

  private getOrCreate(k: string) {
    if (!this.queues.has(k)) this.queues.set(k, { running: null, pending: [] })
    return this.queues.get(k)!
  }

  private update(ctx: TaskContext, status: TaskStatus, msg: string) {
    ctx.status = status
    ctx.progress.push({ step: status, message: msg })
    ctx.input.onProgress?.(status, msg)
  }

  private async processNext(branchKey: string) {
    const q = this.queues.get(branchKey)
    if (!q || q.running) return
    const item = q.pending.shift()
    if (!item) return

    const ctx = this.contexts.get(item.id)!
    q.running = item.id
    ctx.startedAt = Date.now()
    this.update(ctx, "running", "开始执行")

    try {
      await this.executor(ctx, item.input)
      ctx.status = "completed"
      ctx.completedAt = Date.now()
      this.update(ctx, "completed", "完成")
    } catch (err) {
      ctx.status = "failed"
      ctx.error = err instanceof Error ? err.message : String(err)
      ctx.completedAt = Date.now()
      this.update(ctx, "failed", ctx.error)
    } finally {
      q.running = null
      if (q.pending.length) this.processNext(branchKey)
    }
  }
}

// ==================== 4. 模拟执行器 ====================

const taskExecutor: Executor = async (ctx, input) => {
  ctx.progress.push({ step: "preparing", message: "准备" })
  await new Promise((r) => setTimeout(r, 500))

  ctx.progress.push({ step: "processing", message: `处理: ${input.data}` })
  await new Promise((r) => setTimeout(r, 1000))

  ctx.result = { success: true, output: `Done: ${input.data}` }
  ctx.progress.push({ step: "completed", message: "完成" })
}

// ==================== 5. 主程序 ====================

const taskQueue = new TaskQueue(taskExecutor)

// 定时任务示例
Scheduler.register(
  { id: "health-check", interval: 10_000, scope: "instance", run: async () => {
    const mem = process.memoryUsage()
    console.log(`[健康检查] 堆内存: ${Math.round(mem.heapUsed / 1e6)}MB`)
  }},
  "demo-project"
)

// 任务队列示例
taskQueue.enqueue({ id: "task-001", data: "任务一", onProgress: (s, m) => console.log(`  [${s}] ${m}`) }, "feature")
taskQueue.enqueue({ id: "task-002", data: "任务二", onProgress: (s, m) => console.log(`  [${s}] ${m}`) }, "feature")
taskQueue.enqueue({ id: "task-003", data: "任务三", onProgress: (s, m) => console.log(`  [${s}] ${m}`) }, "feature")

// 3 秒后查看状态
setTimeout(() => {
  console.log("\n--- 队列状态 ---")
  console.log(taskQueue.getStatus("feature"))
  console.log(taskQueue.getContext("task-001")?.progress)
}, 3000)

// 10 秒后清理
setTimeout(() => {
  Scheduler.dispose("demo-project")
  process.exit(0)
}, 10_000)
