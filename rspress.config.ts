import { pluginAutoNavSidebar } from '@rspress/plugin-auto-nav-sidebar';

export default {
  title: "AI进阶之路",
  description: '前端成长记录、知识体系、AI Agent 学习笔记',
  plugins: [pluginAutoNavSidebar()],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'AI进阶之路', link: '/agent/' },
      { text: '前端成长记录', link: '/frontend-basic/' },
      { text: 'AI知识体系', link: '/agent/' },
      { text: 'GitHub', link: 'https://github.com/fyhhub/fyhhub.github.io' },
    ],
    outline: 3,
    search: {},
  },
};
