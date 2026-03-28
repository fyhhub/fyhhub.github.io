import { pluginAutoNavSidebar } from '@rspress/plugin-auto-nav-sidebar';

export default {
  title: "AI进阶之路",
  description: '前端成长记录、知识体系、AI Agent 学习笔记',
  plugins: [pluginAutoNavSidebar()],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Agent', link: '/agent/' },
      { text: 'GitHub', link: 'https://github.com/fyhhub/fyhhub.github.io' },
    ],
    outline: 3,
    search: {},
  },
};
