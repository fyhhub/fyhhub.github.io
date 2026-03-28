# MCP (Model Context Protocol) 实现原理学习指南

> 基于 OpenCode 项目源码的深度解析

## 目录

1. [概述](#概述)
2. [核心架构](#核心架构)
3. [传输层实现](#传输层实现)
4. [消息协议](#消息协议)
5. [工具调用机制](#工具调用机制)
6. [OAuth 认证流程](#oauth-认证流程)
7. [配置管理](#配置管理)
8. [状态管理](#状态管理)
9. [Marketplace 集成](#marketplace-集成)
10. [最小化实现示例](#最小化实现示例)
11. [关键源码文件索引](#关键源码文件索引)

---

## 概述

### 什么是 MCP？

MCP (Model Context Protocol) 是一个标准化协议，用于在 LLM 应用和外部工具/数据源之间建立通信。它允许 AI 模型调用外部工具、访问资源和获取上下文信息。

### OpenCode 中的 MCP 实现

本项目实现了完整的 MCP 客户端功能，支持：
- **本地 MCP 服务器**：通过标准 I/O (stdio) 通信
- **远程 MCP 服务器**：通过 HTTP/SSE 协议通信
- **OAuth 认证**：支持需要认证的远程服务器
- **工具集成**：将 MCP 工具无缝转换为 AI SDK 工具格式

---

## 核心架构

### 架构图

```
┌─────────────────────────────────────────────────────────────┐
│                        OpenCode                              │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  AI SDK     │  │  MCP SDK    │  │  MCP Namespace       │ │
│  │  (Tool)     │◄─┤  (Client)    │◄─┤  - create()         │ │
│  │             │  │             │  │  - connect()       │ │
│  │             │  │             │  │  - disconnect()     │ │
│  └─────────────┘  └─────────────┘  │  - tools()         │ │
│                                     │  - prompts()       │ │
│                                     │  - resources()     │ │
│                                     └─────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                      Transport Layer                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │
│  │ StdioClient │  │ Streamable  │  │ SSEClient        │   │
│  │ Transport   │  │ HTTPClient   │  │ Transport        │   │
│  │ (本地进程)   │  │ (远程 HTTP)  │  │ (远程 SSE)       │   │
│  └─────────────┘  └─────────────┘  └─────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                    Auth Layer                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │
│  │ McpAuth     │  │ McpOAuth     │  │ McpOAuth        │   │
│  │ (凭证存储)   │  │ Provider     │  │ Callback        │   │
│  │             │  │ (OAuth流程)   │  │ (回调处理)       │   │
│  └─────────────┘  └─────────────┘  └─────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                   MCP Servers                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │
│  │ Local       │  │ Remote      │  │ MCP Registry    │   │
│  │ (stdio)     │  │ (HTTP/SSE)  │  │ (Marketplace)   │   │
│  └─────────────┘  └─────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 核心模块职责

| 模块 | 文件 | 职责 |
|------|------|------|
| MCP | `mcp/index.ts` | 核心命名空间，管理客户端生命周期 |
| McpAuth | `mcp/auth.ts` | OAuth 凭证存储与管理 |
| McpOAuthProvider | `mcp/oauth-provider.ts` | OAuth 2.0 流程实现 |
| McpOAuthCallback | `mcp/oauth-callback.ts` | OAuth 回调服务器 |
| McpMarket | `mcp/market.ts` | MCP 服务器市场集成 |

---

## 传输层实现

### 三种传输方式对比

| 特性 | Stdio | HTTP Streamable | SSE |
|------|-------|-----------------|-----|
| **用途** | 本地进程通信 | 远程 HTTP API | 远程 HTTP API |
| **传输层** | 标准输入/输出流 | HTTP POST + 流式响应 | HTTP + Server-Sent Events |
| **连接方式** | 持久连接（子进程） | 请求-响应（可复用） | 长连接（持续推送） |
| **适用场景** | 本地 CLI 工具 | RESTful 风格 API | 需要服务端推送 |

### 快速选择指南

```
┌────────────────────────────────────────────────────────────────┐
│                        传输方式对比                             │
├─────────────────┬──────────────────┬────────────────────────────┤
│      Stdio     │  HTTP Streamable │           SSE              │
├─────────────────┼──────────────────┼────────────────────────────┤
│   通信介质      │   stdin/stdout   │   HTTP POST + Response    │
│   连接类型      │   持久进程       │   请求-响应（可复用）      │
│   延迟         │   ★★★★★         │   ★★★☆☆                  │
│   可扩展性      │   ★☆☆☆☆        │   ★★★★★                 │
│   认证支持      │   环境变量       │   OAuth/HTTP Auth         │
│   远程支持      │   ❌            │   ✅                      │
│   实时推送      │   原生支持      │   原生支持（SSE）          │
│   典型工具      │   本地 CLI      │   远程 API                 │
└─────────────────┴──────────────────┴────────────────────────────┘
```

**何时用哪种？**

| 场景 | 推荐方式 |
|------|----------|
| 本地文件系统操作 | **Stdio** |
| 本地 Git 操作 | **Stdio** |
| 远程 API（GitHub、Slack） | **HTTP Streamable** |
| 需要 OAuth 认证 | **HTTP Streamable** |
| 实时工具列表更新 | **SSE** |
| 企业内网服务 | **HTTP Streamable** |

简单记忆：**本地用 Stdio，远程用 HTTP/SSE**！

### 1. StdioClientTransport (本地服务器)

**原理**：通过操作系统的标准输入输出流与子进程通信

```
┌──────────────┐     stdin     ┌──────────────┐
│              │◄─────────────│              │
│   OpenCode   │              │  MCP Server  │
│   (Parent)   │─────────────►│  (Child      │
│              │    stdout    │   Process)   │
│              │              │              │
└──────────────┘              └──────────────┘
```

```typescript
// 源码位置: mcp/index.ts, line 408-449
const [cmd, ...args] = mcp.command
const cwd = Instance.directory
const transport = new StdioClientTransport({
  stderr: "pipe",
  command: cmd,
  args,
  cwd,
  env: {
    ...process.env,
    ...(cmd === "opencode" ? { BUN_BE_BUN: "1" } : {}),
    ...mcp.environment,
  },
})

const client = new Client({ name: "opencode", version: VERSION })
await client.connect(transport)
```

**特点**：
- ✅ 简单直接，适合本地工具
- ✅ 启动/停止由客户端控制
- ✅ 低延迟，无网络开销
- ❌ 只能在同一台机器上运行
- ❌ 子进程健壮性依赖客户端管理

**典型场景**：
```bash
# 本地文件系统工具
npx -y @modelcontextprotocol/server-filesystem /home/user/projects

# 本地 Git 工具
opencode mcp-server-git /path/to/repo
```

### 2. StreamableHTTPClientTransport (远程服务器)

**原理**：基于 HTTP POST 请求，支持流式响应体

```
┌──────────────┐                    ┌──────────────┐
│              │  POST /mcp         │              │
│   OpenCode   │───────────────────►│   MCP Server │
│   (Client)   │                    │   (Remote)   │
│              │◄───────────────────│              │
│              │  200 OK + Stream   │              │
└──────────────┘                    └──────────────┘

请求体 (JSON-RPC):
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": { "name": "search", "arguments": {...} },
  "id": 1
}

响应体 (流式):
HTTP/1.1 200 OK
Content-Type: application/json
Transfer-Encoding: chunked

{"jsonrpc":"2.0","result":{...},"id":1}
```

```typescript
// 源码位置: mcp/index.ts, line 328-335
const transport = new StreamableHTTPClientTransport(new URL(mcp.url), {
  authProvider,      // OAuth 认证提供者
  requestInit: {
    headers: mcp.headers  // 自定义请求头
  },
})
```

**特点**：
- ✅ 支持网络远程调用
- ✅ 有状态连接（可身份认证）
- ✅ 支持 OAuth 等认证机制
- ✅ 响应可以是流式的（传输大结果）
- ❌ 需要服务端部署
- ❌ 需要处理网络错误和重连

**典型场景**：
```json
// 配置文件
{
  "mcp": {
    "github": {
      "type": "remote",
      "url": "https://api.github.com/mcp",
      "oauth": {
        "clientId": "xxx",
        "scope": "repo user"
      }
    }
  }
}
```

### 3. SSEClientTransport (Server-Sent Events)

**原理**：服务端通过单个 HTTP 连接持续推送事件

```
┌──────────────┐                    ┌──────────────┐
│              │  GET /mcp/events   │              │
│   OpenCode   │───────────────────►│   MCP Server │
│   (Client)   │                    │   (Remote)   │
│              │◄───────────────────│              │
│              │  text/event-stream │              │
└──────────────┘                    └──────────────┘

SSE 事件流:
event: message
data: {"jsonrpc":"2.0","method":"tool/list",...}

event: message
data: {"jsonrpc":"2.0","result":{...},"id":1}

event: notification
data: {"method":"notifications/tools/changed"}
```

```typescript
// 源码位置: mcp/index.ts, line 336-342
const transport = new SSEClientTransport(new URL(mcp.url), {
  authProvider,
  requestInit: {
    headers: mcp.headers
  },
})
```

**特点**：
- ✅ 适合**单向推送**场景（服务端主动通知）
- ✅ 自动重连机制
- ✅ 比 WebSocket 轻量
- ✅ 适合实时更新（工具列表变更通知）
- ❌ 只支持服务端→客户端推送
- ❌ 客户端请求仍需另外的 HTTP 请求

### 传输层选择策略

```typescript
// 源码位置: mcp/index.ts, line 328-405
const transports = [
  { name: "StreamableHTTP", transport: new StreamableHTTPClientTransport(...) },
  { name: "SSE", transport: new SSEClientTransport(...) },
]

for (const { name, transport } of transports) {
  try {
    await client.connect(transport)
    status = { status: "connected" }
    break
  } catch (error) {
    // 尝试下一个传输方式
  }
}
```

**策略**：按优先级尝试不同的传输方式，优先使用 StreamableHTTP，失败则降级到 SSE。

---

## 消息协议

### MCP 协议消息类型

MCP 使用 JSON-RPC 2.0 作为消息格式：

#### 请求消息
```typescript
{
  jsonrpc: "2.0",
  method: "tools/list",      // 方法名
  params: {                 // 参数
    cursor?: string
  },
  id: 1                     // 请求 ID
}
```

#### 响应消息
```typescript
{
  jsonrpc: "2.0",
  result: {                 // 结果
    tools: [
      {
        name: "tool_name",
        description: "工具描述",
        inputSchema: {
          type: "object",
          properties: {...}
        }
      }
    ]
  },
  id: 1
}
```

#### 通知消息
```typescript
{
  jsonrpc: "2.0",
  method: "notifications/tools/list_changed",  // 通知方法
  params: {}
}
```

### 核心协议方法

| 方法 | 方向 | 描述 |
|------|------|------|
| `initialize` | Client → Server | 初始化连接 |
| `tools/list` | Client → Server | 获取工具列表 |
| `tools/call` | Client → Server | 调用工具 |
| `prompts/list` | Client → Server | 获取提示列表 |
| `prompts/get` | Client → Server | 获取指定提示 |
| `resources/list` | Client → Server | 获取资源列表 |
| `resources/read` | Client → Server | 读取资源内容 |
| `notifications/tools/list_changed` | Server → Client | 工具列表变更通知 |

### 初始化流程

```typescript
// 源码位置: mcp/index.ts, line 349-355
const client = new Client({
  name: "opencode",
  version: Installation.VERSION,
})
await withTimeout(client.connect(transport), connectTimeout)
registerNotificationHandlers(client, serverName)

// SDK 自动处理 initialize 握手
```

---

## 工具调用机制

### 工具定义转换

MCP 工具转换为 AI SDK 工具格式：

```typescript
// 源码位置: mcp/index.ts, line 120-148
async function convertMcpTool(mcpTool: MCPToolDef, client: MCPClient, timeout?: number): Promise<Tool> {
  const inputSchema = mcpTool.inputSchema

  const schema: JSONSchema7 = {
    ...(inputSchema as JSONSchema7),
    type: "object",
    properties: (inputSchema.properties ?? {}) as JSONSchema7["properties"],
    additionalProperties: false,
  }

  return dynamicTool({
    description: mcpTool.description ?? "",
    inputSchema: jsonSchema(schema),
    execute: async (args: unknown) => {
      return client.callTool(
        {
          name: mcpTool.name,
          arguments: (args || {}) as Record<string, unknown>,
        },
        CallToolResultSchema,
        {
          resetTimeoutOnProgress: true,
          timeout,
        },
      )
    },
  })
}
```

### 工具收集

```typescript
// 源码位置: mcp/index.ts, line 566-602
export async function tools() {
  const result: Record<string, Tool> = {}
  const s = await state()
  const clientsSnapshot = await clients()

  for (const [clientName, client] of Object.entries(clientsSnapshot)) {
    // 只收集已连接的 MCP 服务器的工具
    if (s.status[clientName]?.status !== "connected") {
      continue
    }

    const toolsResult = await client.listTools()
    for (const mcpTool of toolsResult.tools) {
      const sanitizedClientName = clientName.replace(/[^a-zA-Z0-9_-]/g, "_")
      const sanitizedToolName = mcpTool.name.replace(/[^a-zA-Z0-9_-]/g, "_")
      result[sanitizedClientName + "_" + sanitizedToolName] = await convertMcpTool(...)
    }
  }
  return result
}
```

### 工具名称冲突处理

```typescript
// 工具名称格式: {客户端名}_{工具名}
// 例如: filesystem_read_file, filesystem_write_file
// 特殊字符被替换为下划线
const sanitizedClientName = clientName.replace(/[^a-zA-Z0-9_-]/g, "_")
const sanitizedToolName = mcpTool.name.replace(/[^a-zA-Z0-9_-]/g, "_")
const key = sanitizedClientName + "_" + sanitizedToolName
```

### MCP 工具注册到 AI 的完整流程

**每个 MCP 工具都需要经过以下流程才能被 LLM 使用：**

```
┌─────────────────────────────────────────────────────────────────────┐
│                    工具注册流程                                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────┐                                                    │
│  │ 1. 获取内置  │    ToolRegistry.tools()                           │
│  │    工具列表  │──────────────►                                    │
│  └─────────────┘           │                                        │
│           │                 ▼                                        │
│           │        ┌─────────────────┐                               │
│           │        │  工具对象数组    │                               │
│           │        │  [tool1, tool2] │                               │
│           │        └────────┬────────┘                               │
│           │                 │                                        │
│           ▼                 ▼                                        │
│  ┌─────────────────┐  ┌─────────────────┐                           │
│  │ 2. 获取 MCP    │  │ 3. 转换为 AI    │                           │
│  │    工具列表    │  │    SDK Tool     │                           │
│  │   MCP.tools()  │  │  dynamicTool()  │                           │
│  └────────┬────────┘  └────────┬────────┘                           │
│           │                    │                                     │
│           └────────┬───────────┘                                     │
│                    ▼                                                 │
│           ┌────────────────┐                                         │
│           │ 4. 合并到 tools │                                        │
│           │    字典         │                                        │
│           │ {id: Tool, ...} │                                        │
│           └────────┬────────┘                                         │
│                    │                                                  │
│                    ▼                                                  │
│           ┌────────────────┐                                         │
│           │ 5. 传给 LLM    │                                        │
│           │ generateText() │                                        │
│           └────────────────┘                                         │
└─────────────────────────────────────────────────────────────────────┘
```

**源码位置**：`session/prompt.ts` 第 749-786 行

```typescript
// 步骤 1: 从内置 ToolRegistry 获取工具
for (const item of await ToolRegistry.tools(
  { modelID: input.model.api.id, providerID: input.model.providerID },
  input.agent,
)) {
  // 转换为 AI SDK 格式
  tools[item.id] = tool({
    id: item.id,
    description: item.description,
    inputSchema: jsonSchema(schema),
    execute: async (args, options) => {
      // ...执行逻辑
    },
  })
}

// 步骤 2: 从 MCP 获取工具 (第 786 行)
for (const [key, item] of Object.entries(await MCP.tools())) {
  // key = "filesystem_read_file" 格式
  // item = AI SDK Tool 对象

  // 直接使用 already-converted tool
  tools[key] = item  // ← 已经是 AI SDK Tool 格式！
}
```

**关键点**：

| 问题 | 答案 |
|------|------|
| **在哪里注册？** | `session/prompt.ts` 第 749-786 行 |
| **MCP.tools() 返回什么？** | 已经是 AI SDK 的 `Tool` 格式 |
| **工具 ID 格式？** | `{MCP服务器名}_{工具名}`，如 `filesystem_read_file` |
| **何时获取工具？** | 每次 LLM 调用前，动态获取 |

**最终传给 LLM**：

```typescript
// 合并后的 tools 对象
const tools = {
  // 内置工具
  "bash": Tool,
  "write": Tool,

  // MCP 工具 (已经转换好)
  "filesystem_read_file": Tool,
  "filesystem_write_file": Tool,
  "github_get_issue": Tool,
}

// 传给 AI SDK
const result = await generateText({
  model,
  tools,        // ← 这里！
  toolChoice: "auto",
  messages,
})
```

---

## OAuth 认证流程

### OAuth 2.0 流程图

```
┌──────────┐         ┌──────────────┐         ┌─────────────┐         ┌──────────────┐
│  Client  │         │ OpenCode     │         │ MCP Server  │         │ Auth Server  │
└────┬─────┘         └──────┬───────┘         └──────┬──────┘         └──────┬───────┘
     │                      │                         │                       │
     │  1. connect()        │                         │                       │
     │─────────────────────►│                         │                       │
     │                      │  2. 401 Unauthorized    │                       │
     │                      │◄────────────────────────│                       │
     │                      │                         │                       │
     │                      │  3. startAuth()         │                       │
     │                      │──┐                      │                       │
     │                      │  │                      │                       │
     │                      │  ▼                      │                       │
     │                      │  4. Dynamc Client Reg   │                       │
     │                      │──────────────────────────────────────────────►│
     │                      │                         │     5. client_id      │
     │                      │◄───────────────────────────────────────────────│
     │                      │                         │                       │
     │                      │  6. authorization_url  │                       │
     │                      │◄────────────────────────│                       │
     │                      │                         │                       │
     │                      │  7. Open browser       │                       │
     │                      │◄────────────────────────│                       │
     │                      │                         │                       │
     │                      │                         │  8. /authorize        │
     │                      │◄──────────────────────────────────────────────►│
     │                      │                         │                       │
     │                      │  9. /callback?code=xxx   │◄──────────────────────│
     │                      │                         │                       │
     │                      │  10. finishAuth(code)   │                       │
     │                      │                         │  11. /token           │
     │                      │                         │──────────────────────►│
     │                      │                         │     12. access_token  │
     │                      │                         │◄──────────────────────│
     │                      │                         │                       │
     │                      │  13. Reconnect with token                       │
     │                      │────────────────────────►│                       │
     │                      │                         │                       │
     │                      │  14. connected!         │                       │
     │◄─────────────────────│                         │                       │
```

### OAuth Provider 实现

```typescript
// 源码位置: mcp/oauth-provider.ts
export class McpOAuthProvider implements OAuthClientProvider {
  constructor(
    private mcpName: string,
    private serverUrl: string,
    private config: McpOAuthConfig,
    private callbacks: McpOAuthCallbacks,
  ) {}

  // 获取重定向 URL
  get redirectUrl(): string {
    return `http://127.0.0.1:${OAUTH_CALLBACK_PORT}${OAUTH_CALLBACK_PATH}`
  }

  // 客户端元数据
  get clientMetadata(): OAuthClientMetadata {
    return {
      redirect_uris: [this.redirectUrl],
      client_name: "OpenCode",
      client_uri: "https://opencode.ai",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      token_endpoint_auth_method: this.config.clientSecret ? "client_secret_post" : "none",
    }
  }

  // 获取已注册的客户端信息
  async clientInformation(): Promise<OAuthClientInformation | undefined> {
    // 优先使用配置中的 clientId
    if (this.config.clientId) {
      return { client_id: this.config.clientId, client_secret: this.config.clientSecret }
    }

    // 从存储中获取动态注册的客户端信息
    const entry = await McpAuth.getForUrl(this.mcpName, this.serverUrl)
    if (entry?.clientInfo) {
      // 检查客户端密钥是否过期
      if (entry.clientInfo.clientSecretExpiresAt < Date.now() / 1000) {
        return undefined  // 需要重新注册
      }
      return { client_id: entry.clientInfo.clientId, client_secret: entry.clientInfo.clientSecret }
    }
    return undefined  // 需要动态注册
  }

  // 保存动态注册的客户端信息
  async saveClientInformation(info: OAuthClientInformationFull): Promise<void> {
    await McpAuth.updateClientInfo(this.mcpName, {
      clientId: info.client_id,
      clientSecret: info.client_secret,
      clientIdIssuedAt: info.client_id_issued_at,
      clientSecretExpiresAt: info.client_secret_expires_at,
    }, this.serverUrl)
  }

  // 获取存储的令牌
  async tokens(): Promise<OAuthTokens | undefined> {
    const entry = await McpAuth.getForUrl(this.mcpName, this.serverUrl)
    if (!entry?.tokens) return undefined

    return {
      access_token: entry.tokens.accessToken,
      token_type: "Bearer",
      refresh_token: entry.tokens.refreshToken,
      expires_in: entry.tokens.expiresAt
        ? Math.max(0, Math.floor(entry.tokens.expiresAt - Date.now() / 1000))
        : undefined,
      scope: entry.tokens.scope,
    }
  }

  // 保存令牌
  async saveTokens(tokens: OAuthTokens): Promise<void> {
    await McpAuth.updateTokens(this.mcpName, {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: tokens.expires_in ? Date.now() / 1000 + tokens.expires_in : undefined,
      scope: tokens.scope,
    }, this.serverUrl)
  }
}
```

### OAuth 回调处理

```typescript
// 源码位置: mcp/oauth-callback.ts
export namespace McpOAuthCallback {
  let server: ReturnType<typeof Bun.serve> | undefined
  const pendingAuths = new Map<string, PendingAuth>()

  export async function ensureRunning(): Promise<void> {
    if (server) return

    server = Bun.serve({
      port: OAUTH_CALLBACK_PORT,
      fetch(req) {
        const url = new URL(req.url)
        const code = url.searchParams.get("code")
        const state = url.searchParams.get("state")
        const error = url.searchParams.get("error")

        // 验证 state 参数防止 CSRF
        if (!state || !pendingAuths.has(state)) {
          return new Response(HTML_ERROR("Invalid state"), { status: 400 })
        }

        const pending = pendingAuths.get(state)!
        clearTimeout(pending.timeout)
        pendingAuths.delete(state)
        pending.resolve(code)

        return new Response(HTML_SUCCESS, { headers: { "Content-Type": "text/html" } })
      },
    })
  }

  export function waitForCallback(oauthState: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        pendingAuths.delete(oauthState)
        reject(new Error("OAuth callback timeout"))
      }, CALLBACK_TIMEOUT_MS)

      pendingAuths.set(oauthState, { resolve, reject, timeout })
    })
  }
}
```

### 完整认证流程

```typescript
// 源码位置: mcp/index.ts

// 1. 开始认证
export async function startAuth(mcpName: string): Promise<{ authorizationUrl: string }> {
  // 生成随机的 state 参数
  const oauthState = Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
  await McpAuth.updateOAuthState(mcpName, oauthState)

  const authProvider = new McpOAuthProvider(...)

  try {
    await client.connect(transport)
    // 已认证
    return { authorizationUrl: "" }
  } catch (error) {
    if (error instanceof UnauthorizedError && capturedUrl) {
      return { authorizationUrl: capturedUrl.toString() }
    }
    throw error
  }
}

// 2. 完成认证
export async function authenticate(mcpName: string): Promise<Status> {
  const { authorizationUrl } = await startAuth(mcpName)

  // 打开浏览器
  await open(authorizationUrl)

  // 等待回调
  const code = await McpOAuthCallback.waitForCallback(oauthState)

  // 验证 state
  const storedState = await McpAuth.getOAuthState(mcpName)
  if (storedState !== oauthState) {
    throw new Error("OAuth state mismatch - potential CSRF attack")
  }

  return finishAuth(mcpName, code)
}

// 3. 完成认证
export async function finishAuth(mcpName: string, authorizationCode: string): Promise<Status> {
  const transport = pendingOAuthTransports.get(mcpName)
  await transport.finishAuth(authorizationCode)
  await McpAuth.clearCodeVerifier(mcpName)

  // 重新连接
  return add(mcpName, mcpConfig)
}
```

---

## 配置管理

### 配置类型定义

```typescript
// 源码位置: config/config.ts, line 510-571

// 本地 MCP 服务器配置
export const McpLocal = z.object({
  type: z.literal("local"),
  command: z.string().array(),           // 命令和参数
  environment: z.record(z.string(), z.string()).optional(),  // 环境变量
  enabled: z.boolean().optional(),        // 是否启用
  timeout: z.number().int().positive().optional(),  // 超时时间(ms)
})

// OAuth 配置
export const McpOAuth = z.object({
  clientId: z.string().optional(),        // OAuth 客户端 ID
  clientSecret: z.string().optional(),    // OAuth 客户端密钥
  scope: z.string().optional(),           // OAuth 作用域
})

// 远程 MCP 服务器配置
export const McpRemote = z.object({
  type: z.literal("remote"),
  url: z.string(),                        // 服务器 URL
  enabled: z.boolean().optional(),
  headers: z.record(z.string(), z.string()).optional(),  // 自定义请求头
  oauth: z.union([McpOAuth, z.literal(false)]).optional(),  // OAuth 配置
  timeout: z.number().int().positive().optional(),
})

// 统一配置
export const Mcp = z.discriminatedUnion("type", [McpLocal, McpRemote])
```

### 配置示例

```jsonc
// opencode.jsonc
{
  "mcp": {
    // 本地服务器示例
    "filesystem": {
      "type": "local",
      "command": ["opencode", "x", "@modelcontextprotocol/server-filesystem", "/tmp"],
      "enabled": true,
      "timeout": 5000
    },

    // 远程服务器示例 (无认证)
    "remote-api": {
      "type": "remote",
      "url": "https://api.example.com/mcp",
      "headers": {
        "X-API-Key": "your-api-key"
      }
    },

    // 远程服务器示例 (OAuth 认证)
    "github": {
      "type": "remote",
      "url": "https://api.github.com/mcp",
      "oauth": {
        "clientId": "your-client-id",
        "clientSecret": "your-client-secret",
        "scope": "repo user"
      }
    },

    // 禁用 OAuth
    "no-auth-server": {
      "type": "remote",
      "url": "https://example.com/mcp",
      "oauth": false
    }
  }
}
```

---

## 状态管理

### 连接状态类型

```typescript
// 源码位置: mcp/index.ts, line 66-109
export const Status = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("connected"),      // 已连接
  }),
  z.object({
    status: z.literal("disabled"),        // 已禁用
  }),
  z.object({
    status: z.literal("failed"),
    error: z.string(),                    // 连接失败
  }),
  z.object({
    status: z.literal("needs_auth"),     // 需要认证
  }),
  z.object({
    status: z.literal("needs_client_registration"),
    error: z.string(),                    // 需要客户端注册
  }),
])
```

### 状态流转图

```
                    ┌─────────────┐
                    │   初始状态   │
                    └──────┬──────┘
                           │
                           ▼
              ┌────────────────────────┐
              │       enabled?         │
              └───────────┬────────────┘
                   Yes    │    No
          ┌───────────────┴───────────────┐
          ▼                               ▼
   ┌─────────────┐                 ┌─────────────┐
   │  尝试连接   │                 │   disabled  │
   └──────┬──────┘                 └─────────────┘
          │
          ▼
   ┌────────────────────────┐
   │      连接成功?          │
   └───────────┬────────────┘
        Yes    │    No
        ┌──────┴──────┐
        ▼             ▼
 ┌───────────┐  ┌────────────────────────┐
 │ connected │  │      需要认证?          │
 └───────────┘  └───────────┬────────────┘
                     Yes    │    No
              ┌──────────────┴──────────────┐
              ▼                            ▼
      ┌───────────────┐              ┌─────────────┐
      │  needs_auth   │              │    failed   │
      │ (OAuth)       │              │   error     │
      └───────┬───────┘              └─────────────┘
              │ 认证成功
              ▼
      ┌───────────────┐
      │   connected   │
      └───────────────┘
```

### 状态存储

```typescript
// 源码位置: mcp/index.ts, line 163-210
const state = Instance.state(
  async () => {
    const cfg = await Config.get()
    const config = cfg.mcp ?? {}
    const clients: Record<string, MCPClient> = {}
    const status: Record<string, Status> = {}

    await Promise.all(
      Object.entries(config).map(async ([key, mcp]) => {
        if (!isMcpConfigured(mcp)) return

        if (mcp.enabled === false) {
          status[key] = { status: "disabled" }
          return
        }

        const result = await create(key, mcp).catch(() => undefined)
        if (!result) return

        status[key] = result.status
        if (result.mcpClient) {
          clients[key] = result.mcpClient
        }
      }),
    )

    return { status, clients }
  },
  async (state) => {
    // 清理：关闭所有客户端连接
    await Promise.all(
      Object.values(state.clients).map((client) => client.close())
    )
  },
)
```

---

## Marketplace 集成

### MCP Registry API

```typescript
// 源码位置: mcp/market.ts
const registryURL = "https://registry.modelcontextprotocol.io"

// 获取服务器列表
export async function list(input?: ListInput) {
  return ServerListResponse.parse(
    await request("/v0/servers", {
      search: query.search,
      cursor: query.cursor,
      limit: query.limit ?? 24,
      version: "latest",
    })
  )
}

// 获取服务器详情
export async function get(id: string) {
  return ServerResponse.parse(
    await request(`/v0/servers/${encodeURIComponent(id)}/versions/latest`)
  )
}

// 安装服务器
export async function install(id: string) {
  const detail = await get(id)
  await Config.updateGlobal({
    mcp: {
      ...(current.mcp ?? {}),
      [id]: detail.config,
    },
  })
}

// 卸载服务器
export async function uninstall(id: string) {
  const next = { ...(current.mcp ?? {}) }
  delete next[id]
  await Config.updateGlobal({ mcp: next })
}
```

### 服务器配置解析

```typescript
// 源码位置: mcp/market.ts

// 本地服务器配置解析
function local(pkg: Package): Config.Mcp | undefined {
  const cmd = binary(pkg)  // npx, uvx, docker 等
  const runtime = pkg.registryType === "npm" && cmd === "npx" ? [cmd, "-y"] : [cmd]
  const base = pkg.registryType === "oci" && cmd === "docker"
    ? [...runtime, "run", "-i", "--rm"]
    : runtime

  return Config.Mcp.parse({
    type: "local",
    command: [...base, ...args(pkg.runtimeArguments), identifier(pkg), ...args(pkg.packageArguments)],
    environment: record(pkg.environmentVariables),
  })
}

// 远程服务器配置解析
function remote(transport: Transport): Config.Mcp | undefined {
  if (!transport.url) return
  return Config.Mcp.parse({
    type: "remote",
    url: fill(transport.url, transport.variables),
    headers: record(transport.headers),
  })
}
```

---

## 最小化实现示例

### 1. MCP 客户端最小实现

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js"

// 创建客户端
const client = new Client({
  name: "my-mcp-client",
  version: "1.0.0",
})

// 创建传输层
const transport = new StreamableHTTPClientTransport(
  new URL("http://localhost:3000/mcp")
)

// 连接并获取工具
await client.connect(transport)
const { tools } = await client.listTools()

// 调用工具
const result = await client.callTool({
  name: "my_tool",
  arguments: { arg1: "value1" }
})

console.log(result)
```

### 2. MCP 服务器最小实现

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

// 创建服务器
const server = new Server(
  { name: "my-mcp-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
)

// 注册工具
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "my_tool",
        description: "A sample tool",
        inputSchema: {
          type: "object",
          properties: {
            message: { type: "string", description: "Message to echo" }
          }
        }
      }
    ]
  }
})

// 处理工具调用
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  if (name === "my_tool") {
    return { content: [{ type: "text", text: `Hello, ${args.message}!` }] }
  }

  throw new Error(`Unknown tool: ${name}`)
})

// 启动服务器
const transport = new StdioServerTransport()
await server.connect(transport)
```

### 3. 带 OAuth 的 MCP 客户端

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js"
import { OAuthClientProvider } from "@modelcontextprotocol/sdk/client/auth.js"

// 自定义 OAuth Provider
class MyOAuthProvider implements OAuthClientProvider {
  async clientInformation() {
    return { client_id: "my-client-id", client_secret: "my-client-secret" }
  }

  async tokens() {
    return { access_token: "stored-token", token_type: "Bearer" }
  }

  async saveTokens(tokens) {
    console.log("保存 tokens:", tokens)
  }

  async redirectToAuthorization(url) {
    console.log("打开浏览器:", url)
  }
}

// 创建带认证的客户端
const transport = new StreamableHTTPClientTransport(
  new URL("http://localhost:3000/mcp"),
  { authProvider: new MyOAuthProvider() }
)

const client = new Client({ name: "my-client", version: "1.0.0" })
await client.connect(transport)
```

### 4. 动态工具注册

```typescript
import { dynamicTool } from "ai"
import type { Tool } from "ai"

// MCP 工具转 AI SDK 工具
function convertMcpTool(mcpTool: MCPToolDef, client: MCPClient): Tool {
  return dynamicTool({
    description: mcpTool.description ?? "",
    inputSchema: jsonSchema(mcpTool.inputSchema),
    execute: async (args) => {
      const result = await client.callTool({
        name: mcpTool.name,
        arguments: args
      })
      return result
    }
  })
}

// 收集所有 MCP 工具
async function getAllTools(clients: MCPClient[]): Promise<Record<string, Tool>> {
  const tools: Record<string, Tool> = {}

  for (const client of clients) {
    const { tools: mcpTools } = await client.listTools()
    for (const tool of mcpTools) {
      tools[`${client.name}_${tool.name}`] = convertMcpTool(tool, client)
    }
  }

  return tools
}
```

---

## 关键源码文件索引

| 文件路径 | 描述 |
|----------|------|
| `packages/opencode/src/mcp/index.ts` | 核心 MCP 实现 |
| `packages/opencode/src/mcp/auth.ts` | OAuth 凭证存储 |
| `packages/opencode/src/mcp/oauth-provider.ts` | OAuth Provider 实现 |
| `packages/opencode/src/mcp/oauth-callback.ts` | OAuth 回调服务器 |
| `packages/opencode/src/mcp/market.ts` | MCP 市场集成 |
| `packages/opencode/src/config/config.ts` | 配置类型定义 (line 510-571) |
| `packages/opencode/src/server/routes/mcp.ts` | MCP API 路由 |
| `packages/opencode/src/cli/cmd/mcp.ts` | MCP CLI 命令 |
| `packages/app/src/components/settings-mcp.tsx` | MCP 设置界面 |
| `packages/app/src/components/dialog-select-mcp.tsx` | MCP 选择对话框 |

---

## 总结

### MCP 核心要点

1. **协议基础**：基于 JSON-RPC 2.0，实现标准化工具调用
2. **传输层**：支持 stdio、HTTP Streamable、SSE 三种传输方式
3. **认证**：完整的 OAuth 2.0 流程，支持动态客户端注册
4. **集成**：无缝转换为 AI SDK 工具格式
5. **状态管理**：清晰的连接状态和生命周期管理

### 学习建议

1. 从 `mcp/index.ts` 开始，理解核心架构
2. 阅读 `oauth-provider.ts` 理解 OAuth 流程
3. 查看 `mcp.ts` CLI 命令了解用户体验
4. 参考 `@modelcontextprotocol/sdk` 官方文档

---

> 文档生成时间: 2026-03-28
> 基于 OpenCode 源码分析
