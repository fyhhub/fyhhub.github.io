import { remarkMermaid } from '@theguild/remark-mermaid';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';

export default {
  title: "AI进阶之路",
  description: '前端成长记录、知识体系、AI Agent 学习笔记',
  builderConfig: {
    plugins: [pluginNodePolyfill()],
  },
  markdown: {
    mdxRs: false,
    remarkPlugins: [[remarkMermaid]],
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Agent', link: '/agent/' },
      { text: 'GitHub', link: 'https://github.com/fyhhub/fyhhub.github.io' },
    ],
    sidebar: {
      '/agent/': [
        { text: 'Agent', link: '/agent/', items: ['/agent/Agent核心实现原理', '/agent/Agent架构图'] },
        { text: '定时任务', link: '/agent/SCHEDULER/', collapsed: false, items: ['/agent/SCHEDULER/定时任务实现原理详解', '/agent/SCHEDULER/定时任务最小化实现'] },
        { text: 'MCP', link: '/agent/MCP/', collapsed: false, items: ['/agent/MCP/MCP实现原理学习指南', '/agent/MCP/MCP最小化代码示例', '/agent/MCP/快速参考'] },
        { text: 'SKILL', link: '/agent/SKILL/', collapsed: false, items: ['/agent/SKILL/SKILL实现原理'] },
        { text: '⭐ Star 分类', link: '/agent/star/', collapsed: false },
      ],
    },
    outline: 3,
    search: {},
  },
};
