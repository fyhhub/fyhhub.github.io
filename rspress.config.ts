import { pluginAutoNavSidebar } from '@rspress/plugin-auto-nav-sidebar';

export default {
  title: "fyhub's blog",
  description: '前端成长记录、知识体系',
  plugins: [pluginAutoNavSidebar()],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'GitHub', link: 'https://github.com/fyhhub/fyhhub.github.io' },
    ],
    outline: 3,
    search: {},
  },
};
