import { defineConfig } from 'rspress';

export default defineConfig({
  title: "fyhub's blog",
  description: '前端成长记录、知识体系',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '算法', link: '/algorithm/' },
      { text: '前端基础', link: '/frontend-basic/' },
      { text: '前端进阶', link: '/frontend-advanced/' },
      { text: '前端工程化', link: '/frontend-engineering/' },
      { text: '计算机基础', link: '/basic/' },
      { text: '后端', link: '/backend/' },
      { text: 'Rust', link: '/rust-learn/' },
      { text: '面试', link: '/interview/' },
      { text: '工具', link: '/tools/' },
      { text: '随笔', link: '/informal/' },
      { text: '掘金文章', link: 'https://juejin.cn/user/4406498334867783/posts' },
      { text: 'GitHub', link: 'https://github.com/fyhhub/fyhhub.github.io' },
    ],
    sidebar: {
      '/algorithm/': [{ text: '算法', link: '/algorithm/' }],
      '/frontend-basic/': [{ text: '前端基础', link: '/frontend-basic/' }],
      '/frontend-advanced/': [{ text: '前端进阶', link: '/frontend-advanced/' }],
      '/frontend-engineering/': [{ text: '前端工程化', link: '/frontend-engineering/' }],
      '/basic/': [{ text: '计算机基础', link: '/basic/' }],
      '/backend/': [{ text: '后端', link: '/backend/' }],
      '/rust-learn/': [{ text: 'Rust', link: '/rust-learn/' }],
      '/tools/': [{ text: '开发工具', link: '/tools/' }],
      '/informal/': [{ text: '随笔', link: '/informal/' }],
    },
    outline: 3,
    search: {},
  },
});
