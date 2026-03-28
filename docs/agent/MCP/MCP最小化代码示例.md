# MCP 最小化代码示例

> 基于官方 @modelcontextprotocol/sdk 的实战代码

## 目录

1. [环境准备](#环境准备)
2. [MCP 服务器实现](#mcp-服务器实现)
3. [MCP 客户端实现](#mcp-客户端实现)
4. [三种传输方式详解](#三种传输方式详解)
5. [完整工具调用示例](#完整工具调用示例)
6. [OAuth 认证示例](#oauth-认证示例)
7. [常见问题与调试](#常见问题与调试)

---

## 环境准备

### 安装依赖

```bash
# MCP SDK
npm install @modelcontextprotocol/sdk

# AI SDK (用于工具转换)
npm install ai
```

### SDK 导入

```typescript
// 服务端
import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"

// 客户端
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js"
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js"

// 认证
import { OAuthClientProvider } from "@modelcontextprotocol/sdk/client/auth.js"
```

---

## MCP 服务器实现

### 最小化 Stdio 服务器

```typescript
// server-minimal.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"

const server = new Server(
  {
    name: "minimal-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},  // 声明支持工具调用
    },
  }
)

// 处理工具列表请求
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "hello",
        description: "Say hello to someone",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name to greet",
            },
          },
          required: ["name"],
        },
      },
    ],
  }
})

// 处理工具调用请求
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  if (name === "hello") {
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${args.name}!`,
        },
      ],
    }
  }

  return {
    content: [{ type: "text", text: `Unknown tool: ${name}` }],
    isError: true,
  }
})

// 启动服务器
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error("MCP Server started")
}

main()
```

### 运行服务器

```bash
# 直接运行
npx ts-node server-minimal.ts

# 或编译后运行
npx tsc server-minimal.ts && node server-minimal.js
```

---

## MCP 客户端实现

### 最小化 Stdio 客户端

```typescript
// client-stdio-minimal.ts
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js"
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js"

async function main() {
  // 创建传输层 (连接到本地服务器)
  const transport = new StdioClientTransport({
    command: "npx",
    args: ["ts-node", "server-minimal.ts"],
  })

  // 创建客户端
  const client = new Client(
    {
      name: "minimal-client",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  )

  // 连接
  await client.connect(transport)
  console.log("Connected to MCP server")

  // 获取工具列表
  const { tools } = await client.request(
    ListToolsRequestSchema,
    {}  // 空参数
  )
  console.log("Available tools:", tools)

  // 调用工具
  const result = await client.request(
    CallToolRequestSchema,
    {
      name: "hello",
      arguments: { name: "World" },
    }
  )
  console.log("Tool result:", result)

  // 关闭连接
  await client.close()
}

main().catch(console.error)
```

### HTTP Streamable 客户端

```typescript
// client-http-minimal.ts
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js"
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js"

async function main() {
  // 创建 HTTP 传输层
  const transport = new StreamableHTTPClientTransport(
    new URL("http://localhost:3000/mcp")
  )

  // 创建客户端
  const client = new Client(
    {
      name: "http-client",
      version: "1.0.0",
    },
    {
      capabilities: { tools: {} },
    }
  )

  // 连接
  await client.connect(transport)

  // 获取工具列表
  const { tools } = await client.request(ListToolsRequestSchema, {})

  // 调用工具
  const result = await client.request(CallToolRequestSchema, {
    name: "hello",
    arguments: { name: "HTTP Client" },
  })

  console.log("Result:", result)
}

main().catch(console.error)
```

### SSE 客户端

```typescript
// client-sse-minimal.ts
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js"
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js"

async function main() {
  // 创建 SSE 传输层
  const transport = new SSEClientTransport(
    new URL("http://localhost:3000/mcp/events")
  )

  // 创建客户端
  const client = new Client(
    {
      name: "sse-client",
      version: "1.0.0",
    },
    {
      capabilities: { tools: {} },
    }
  )

  // 连接
  await client.connect(transport)

  // 获取工具列表
  const { tools } = await client.request(ListToolsRequestSchema, {})

  // 调用工具
  const result = await client.request(CallToolRequestSchema, {
    name: "hello",
    arguments: { name: "SSE Client" },
  })

  console.log("Result:", result)
}

main().catch(console.error)
```

---

## 三种传输方式详解

### 传输方式对比表

| 特性 | Stdio | HTTP Streamable | SSE |
|------|-------|-----------------|-----|
| **通信介质** | stdin/stdout | HTTP POST + Response | HTTP + EventStream |
| **连接类型** | 持久子进程 | 请求-响应（可复用） | 长连接（持续推送） |
| **延迟** | ★★★★★ (最低) | ★★★☆☆ | ★★★☆☆ |
| **远程支持** | ❌ | ✅ | ✅ |
| **认证支持** | 环境变量 | OAuth/HTTP Auth | OAuth/HTTP Auth |
| **实时推送** | 原生支持 | 需要轮询 | ✅ 原生支持 |
| **适用场景** | 本地 CLI 工具 | RESTful API | 需服务端推送 |

### 1. Stdio 传输详解

**原理**：通过标准输入输出流与子进程通信

```
┌──────────────┐     stdin     ┌──────────────┐
│              │◄─────────────│              │
│   Client     │              │  MCP Server  │
│   (Parent)   │─────────────►│  (Child)     │
│              │    stdout    │              │
└──────────────┘              └──────────────┘
        │  stderr (日志)
        ▼
    捕获并记录
```

**适用场景**：
- 本地文件系统操作
- 本地 Git 操作
- 需要访问本地环境的工具

**示例配置**：
```json
{
  "mcp": {
    "filesystem": {
      "type": "local",
      "command": ["npx", "-y", "@modelcontextprotocol/server-filesystem", "/home/user"],
      "environment": { "NODE_ENV": "production" }
    }
  }
}
```

### 2. HTTP Streamable 传输详解

**原理**：基于 HTTP POST 的请求-响应模式，支持流式响应

```
┌──────────────┐                    ┌──────────────┐
│              │  POST /mcp        │              │
│   Client     │───────────────────►│   Server     │
│              │                    │              │
│              │◄───────────────────│              │
│              │  200 + chunked     │              │
└──────────────┘                    └──────────────┘
```

**适用场景**：
- 远程 API 调用
- 需要 OAuth 认证
- 企业内网服务
- 需要 Bearer Token 认证

**示例配置**：
```json
{
  "mcp": {
    "github": {
      "type": "remote",
      "url": "https://api.github.com/mcp",
      "oauth": {
        "clientId": "xxx",
        "scope": "repo user"
      }
    },
    "slack": {
      "type": "remote",
      "url": "https://api.slack.com/mcp",
      "headers": {
        "Authorization": "Bearer xoxb-xxx"
      }
    }
  }
}
```

### 3. SSE 传输详解

**原理**：服务端通过单个 HTTP 连接持续推送事件

```
┌──────────────┐                    ┌──────────────┐
│              │  GET /events      │              │
│   Client     │───────────────────►│   Server     │
│              │                    │              │
│              │◄───────────────────│              │
│              │  text/event-stream│              │
└──────────────┘                    └──────────────┘

事件格式:
event: message
data: {"jsonrpc":"2.0","result":{...},"id":1}

event: notification
data: {"method":"notifications/tools/changed"}
```

**适用场景**：
- 实时工具列表更新
- 需要服务端主动推送
- 监控/通知场景

**示例配置**：
```json
{
  "mcp": {
    "realtime": {
      "type": "remote",
      "url": "https://api.example.com/mcp/events"
    }
  }
}
```

### 自动选择最佳传输方式

```typescript
// OpenCode 的实现策略
const transports = [
  {
    name: "StreamableHTTP",
    transport: new StreamableHTTPClientTransport(url, { authProvider }),
  },
  {
    name: "SSE",
    transport: new SSEClientTransport(url, { authProvider }),
  },
]

for (const { name, transport } of transports) {
  try {
    await client.connect(transport)
    console.log(`Connected via ${name}`)
    break
  } catch (error) {
    console.log(`${name} failed, trying next...`)
  }
}
```

### 选择建议

```
                    ┌─────────────────────┐
                    │   需要连接什么？      │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                │                ▼
      ┌───────────────┐        │        ┌───────────────┐
      │  本地进程/CLI  │        │        │   远程服务器   │
      └───────┬───────┘        │        └───────┬───────┘
              │                 │                │
              ▼                 │                ▼
      ┌───────────────┐        │        ┌───────────────────┐
      │    Stdio      │        │        │ 需要推送/通知？    │
      └───────────────┘        │        └─────────┬─────────┘
                               │                  │
                               │         ┌───────┴───────┐
                               │         ▼               ▼
                               │   ┌─────────┐     ┌─────────────┐
                               │   │   SSE   │     │ HTTP Stream │
                               │   └─────────┘     └─────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  需要 OAuth 认证？   │
                    └──────────┬──────────┘
                               │
                      ┌────────┴────────┐
                      ▼                 ▼
              ┌─────────────┐   ┌─────────────┐
              │ HTTP Stream │   │ HTTP Stream │
              │ + OAuth     │   │ + API Key   │
              └─────────────┘   └─────────────┘
```

---

## 完整工具调用示例

### 带错误处理的完整客户端

```typescript
// client-complete.ts
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import {
  StreamableHTTPClientTransport,
} from "@modelcontextprotocol/sdk/client/streamableHttp.js"
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"

class MCPClient {
  private client: Client
  private transport: StreamableHTTPClientTransport

  constructor(serverUrl: string) {
    this.transport = new StreamableHTTPClientTransport(new URL(serverUrl))

    this.client = new Client(
      {
        name: "complete-client",
        version: "1.0.0",
      },
      {
        capabilities: { tools: {} },
      }
    )
  }

  async connect(timeout = 30000): Promise<void> {
    await Promise.race([
      this.client.connect(this.transport),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Connection timeout")), timeout)
      ),
    ])
    console.log("Connected successfully")
  }

  async listTools() {
    try {
      const response = await this.client.request(ListToolsRequestSchema, {})
      return response.tools
    } catch (error) {
      console.error("Failed to list tools:", error)
      return []
    }
  }

  async callTool(name: string, args: Record<string, unknown>) {
    try {
      const result = await this.client.request(CallToolRequestSchema, {
        name,
        arguments: args,
      })

      // 解析结果
      if (result.isError) {
        throw new Error((result.content[0] as { text: string }).text)
      }

      return result.content
    } catch (error) {
      console.error(`Failed to call tool ${name}:`, error)
      throw error
    }
  }

  async close(): Promise<void> {
    await this.client.close()
    console.log("Connection closed")
  }
}

// 使用示例
async function main() {
  const mcp = new MCPClient("http://localhost:3000/mcp")

  try {
    await mcp.connect()

    // 列出所有工具
    const tools = await mcp.listTools()
    console.log(`Found ${tools.length} tools:`)
    tools.forEach((tool) => {
      console.log(`  - ${tool.name}: ${tool.description}`)
    })

    // 调用第一个工具
    if (tools.length > 0) {
      const result = await mcp.callTool(tools[0].name, { name: "Test" })
      console.log("Result:", result)
    }
  } catch (error) {
    console.error("Error:", error)
  } finally {
    await mcp.close()
  }
}

main()
```

### 转换为 AI SDK 工具

```typescript
// client-with-ai-sdk.ts
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js"
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js"
import { dynamicTool, jsonSchema, type Tool } from "ai"

// MCP 工具定义类型
type MCPTool = {
  name: string
  description: string
  inputSchema: object
}

// MCP 客户端类
class MCPClient {
  private client: Client
  private transport: StreamableHTTPClientTransport
  private tools: MCPTool[] = []

  constructor(serverUrl: string) {
    this.transport = new StreamableHTTPClientTransport(new URL(serverUrl))
    this.client = new Client(
      { name: "ai-sdk-client", version: "1.0.0" },
      { capabilities: { tools: {} } }
    )
  }

  async connect() {
    await this.client.connect(this.transport)
    await this.loadTools()
  }

  private async loadTools() {
    const response = await this.client.request(ListToolsRequestSchema, {})
    this.tools = response.tools
  }

  // 将 MCP 工具转换为 AI SDK 工具
  toAISDKTool(mcpTool: MCPTool): Tool {
    return dynamicTool({
      id: mcpTool.name,
      description: mcpTool.description,
      inputSchema: jsonSchema(mcpTool.inputSchema as any),
      execute: async (args) => {
        const result = await this.client.request(CallToolRequestSchema, {
          name: mcpTool.name,
          arguments: args as Record<string, unknown>,
        })

        // 提取文本内容
        if (result.content && Array.isArray(result.content)) {
          return result.content
            .map((c) => ("text" in c ? c.text : ""))
            .join("\n")
        }

        return String(result)
      },
    })
  }

  // 获取所有 AI SDK 工具
  getTools(): Tool[] {
    return this.tools.map((t) => this.toAISDKTool(t))
  }

  async close() {
    await this.client.close()
  }
}

// 使用示例
async function main() {
  const mcp = new MCPClient("http://localhost:3000/mcp")
  await mcp.connect()

  // 获取 AI SDK 格式的工具
  const tools = mcp.getTools()
  console.log(`Loaded ${tools.length} tools`)

  // 可以在 AI SDK 的 generateText 或 streamText 中使用
  // import { generateText } from "ai"
  //
  // const result = await generateText({
  //   model: yourModel,
  //   tools,
  //   toolChoice: "auto",
  //   prompt: "Use the hello tool to greet Alice",
  // })

  await mcp.close()
}

main()
```

---

## OAuth 认证示例

### 自定义 OAuth Provider

```typescript
// oauth-provider-example.ts
import { OAuthClientProvider } from "@modelcontextprotocol/sdk/client/auth.js"
import type { OAuthClientMetadata, OAuthTokens, OAuthClientInformation } from "@modelcontextprotocol/sdk/shared/auth.js"
import fs from "fs"

const CREDENTIALS_FILE = "./mcp-credentials.json"

interface StoredCredentials {
  clientId?: string
  clientSecret?: string
  accessToken?: string
  refreshToken?: string
  expiresAt?: number
}

function loadCredentials(): StoredCredentials {
  try {
    return JSON.parse(fs.readFileSync(CREDENTIALS_FILE, "utf-8"))
  } catch {
    return {}
  }
}

function saveCredentials(creds: StoredCredentials) {
  fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(creds, null, 2))
}

export class MyOAuthProvider implements OAuthClientProvider {
  get redirectUrl(): string {
    return "http://localhost:19876/mcp/oauth/callback"
  }

  get clientMetadata(): OAuthClientMetadata {
    return {
      redirect_uris: [this.redirectUrl],
      client_name: "MyMCPClient",
      client_uri: "https://myapp.com",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
    }
  }

  async clientInformation(): Promise<OAuthClientInformation | undefined> {
    const creds = loadCredentials()
    if (creds.clientId) {
      return {
        client_id: creds.clientId,
        client_secret: creds.clientSecret,
      }
    }
    return undefined
  }

  async saveClientInformation(info: any): Promise<void> {
    const creds = loadCredentials()
    creds.clientId = info.client_id
    creds.clientSecret = info.client_secret
    if (info.client_id_issued_at) {
      // 保存颁发时间
    }
    saveCredentials(creds)
  }

  async tokens(): Promise<OAuthTokens | undefined> {
    const creds = loadCredentials()
    if (!creds.accessToken) return undefined

    // 检查是否过期
    if (creds.expiresAt && creds.expiresAt < Date.now() / 1000) {
      // Token 已过期，可能需要刷新
      return undefined
    }

    return {
      access_token: creds.accessToken,
      token_type: "Bearer",
      refresh_token: creds.refreshToken,
      expires_in: creds.expiresAt ? Math.floor(creds.expiresAt - Date.now() / 1000) : undefined,
    }
  }

  async saveTokens(tokens: OAuthTokens): Promise<void> {
    const creds = loadCredentials()
    creds.accessToken = tokens.access_token
    creds.refreshToken = tokens.refresh_token ?? undefined
    if (tokens.expires_in) {
      creds.expiresAt = Date.now() / 1000 + tokens.expires_in
    }
    saveCredentials(creds)
  }

  async redirectToAuthorization(url: URL): Promise<void> {
    console.log("Please open this URL in your browser:")
    console.log(url.toString())

    // 自动打开浏览器 (需要用户确认)
    // import open from "open"
    // await open(url.toString())
  }
}
```

### 使用自定义 Provider

```typescript
// client-with-oauth.ts
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js"
import { ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js"
import { MyOAuthProvider } from "./oauth-provider-example"

async function main() {
  const authProvider = new MyOAuthProvider()

  const transport = new StreamableHTTPClientTransport(
    new URL("https://api.example.com/mcp"),
    { authProvider }
  )

  const client = new Client(
    { name: "oauth-client", version: "1.0.0" },
    { capabilities: { tools: {} } }
  )

  try {
    await client.connect(transport)
    console.log("Connected with OAuth!")

    const { tools } = await client.request(ListToolsRequestSchema, {})
    console.log(`Found ${tools.length} tools`)
  } catch (error) {
    console.error("Connection failed:", error)
  }
}

main()
```

---

## 常见问题与调试

### 1. 连接超时

```typescript
import { withTimeout } from "./utils"

const CONNECT_TIMEOUT = 30_000

try {
  await withTimeout(client.connect(transport), CONNECT_TIMEOUT)
} catch (error) {
  if (error.message.includes("timeout")) {
    console.error("Connection timed out. Check if server is running.")
  }
}
```

### 2. 工具调用超时

```typescript
const TOOL_TIMEOUT = 10_000

try {
  const result = await withTimeout(
    client.request(CallToolRequestSchema, {
      name: "slow_tool",
      arguments: {},
    }),
    TOOL_TIMEOUT
  )
} catch (error) {
  console.error("Tool execution timed out")
}
```

### 3. 调试日志

```typescript
// 启用 MCP SDK 调试日志
process.env.DEBUG = "mcp:*"

// 或者手动记录
const originalRequest = client.request.bind(client)
client.request = async (schema: any, params: any) => {
  console.log(`[MCP Request] ${schema.method || "unknown"}:`, params)
  try {
    const result = await originalRequest(schema, params)
    console.log(`[MCP Response]:`, result)
    return result
  } catch (error) {
    console.error(`[MCP Error]:`, error)
    throw error
  }
}
```

### 4. 验证工具 schema

```typescript
import { z } from "zod"

function validateToolSchema(schema: object) {
  try {
    // 验证 schema 结构
    z.object({
      type: z.literal("object"),
      properties: z.record(z.any()).optional(),
      required: z.array(z.string()).optional(),
    }).parse(schema)
    return true
  } catch {
    return false
  }
}

// 使用
const { tools } = await client.request(ListToolsRequestSchema, {})
for (const tool of tools) {
  if (!validateToolSchema(tool.inputSchema)) {
    console.warn(`Tool ${tool.name} has invalid schema`)
  }
}
```

### 5. 错误处理最佳实践

```typescript
class MCPError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message)
    this.name = "MCPError"
  }
}

async function safeCallTool(
  client: Client,
  name: string,
  args: Record<string, unknown>
) {
  try {
    const result = await client.request(CallToolRequestSchema, {
      name,
      arguments: args,
    })

    if (result.isError) {
      const text = (result.content[0] as any).text
      throw new MCPError(text, "TOOL_ERROR")
    }

    return result
  } catch (error) {
    if (error instanceof MCPError) {
      throw error
    }

    // 转换其他错误
    if (error instanceof Error) {
      throw new MCPError(error.message, "INTERNAL_ERROR", { cause: error })
    }

    throw new MCPError(String(error), "UNKNOWN_ERROR")
  }
}
```

---

## 测试 MCP 服务器

### 使用 MCP Inspector

```bash
# 安装 inspector
npm install -g @modelcontextprotocol/inspector

# 启动 inspector (会自动启动服务器)
npx @modelcontextprotocol/inspector npx ts-node server-minimal.ts
```

### 手动测试

```bash
# 直接运行服务器并发送 JSON-RPC 请求
echo '{"jsonrpc":"2.0","method":"tools/list","id":1}' | npx ts-node server-minimal.ts
```

---

## 总结

本文档提供了 MCP 协议实现的最小化代码示例：

| 示例 | 文件 | 用途 |
|------|------|------|
| 最小服务器 | `server-minimal.ts` | 学习服务端实现 |
| Stdio 客户端 | `client-stdio-minimal.ts` | 连接本地服务器 |
| HTTP Streamable 客户端 | `client-http-minimal.ts` | 连接远程 HTTP 服务器 |
| SSE 客户端 | `client-sse-minimal.ts` | 连接 SSE 实时推送服务器 |
| 完整客户端 | `client-complete.ts` | 生产级客户端 |
| AI SDK 集成 | `client-with-ai-sdk.ts` | LLM 集成 |
| OAuth Provider | `oauth-provider-example.ts` | 认证支持 |

### 快速选择

```
本地 CLI 工具  ────►  StdioClientTransport
                            │
远程 HTTP API ────►  StreamableHTTPClientTransport
                            │
实时推送场景 ────►  SSEClientTransport
                            │
需要 OAuth  ────►  StreamableHTTPClientTransport + OAuthProvider
```

建议按顺序学习，从最小示例开始，逐步增加功能。
