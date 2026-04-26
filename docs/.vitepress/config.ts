import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "AI进阶之路",
  description: '前端成长记录、知识体系、AI Agent 学习笔记',
  cleanUrls: true,

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Agent', link: '/agent/' },
      { text: 'GitHub', link: 'https://github.com/fyhhub/fyhhub.github.io' },
    ],

    sidebar: {
      '/agent/': [
        {
          text: 'Agent',
          link: '/agent/',
          items: [
            { text: '核心实现原理', link: '/agent/Agent核心实现原理' },
            { text: '架构图', link: '/agent/Agent架构图' },
          ],
        },
        {
          text: '定时任务',
          link: '/agent/SCHEDULER/',
          collapsed: false,
          items: [
            { text: '实现原理详解', link: '/agent/SCHEDULER/定时任务实现原理详解' },
            { text: '最小化实现', link: '/agent/SCHEDULER/定时任务最小化实现' },
          ],
        },
        {
          text: 'MCP',
          link: '/agent/MCP/',
          collapsed: false,
          items: [
            { text: '实现原理学习指南', link: '/agent/MCP/MCP实现原理学习指南' },
            { text: '最小化代码示例', link: '/agent/MCP/MCP最小化代码示例' },
            { text: '快速参考', link: '/agent/MCP/快速参考' },
          ],
        },
        {
          text: 'SKILL',
          link: '/agent/SKILL/',
          collapsed: false,
          items: [
            { text: '实现原理', link: '/agent/SKILL/SKILL实现原理' },
          ],
        },
        {
          text: '⭐ Star 分类',
          link: '/agent/star/',
          collapsed: false,
        },
      ],
    },

    outline: { level: [2, 3] },
    search: { provider: 'local' },
  },
})
