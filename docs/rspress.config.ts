import { defineConfig } from 'rspress';

export default defineConfig({
  title: "fyhub's blog",
  description: '前端成长记录、知识体系',
  icon: '/public/favicon.ico',
  // 插件
  plugins: [],
  // 修复 rsbuild/rspack 构建兼容性问题
  docBuildConfig: {
    tools: {
      esbuild: {
        define: {
          'process.env.NODE_ENV': JSON.stringify('production'),
        },
        target: 'es2015',
      },
    },
  },
  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      {
        text: '算法',
        link: '/algorithm/',
      },
      {
        text: '前端基础',
        link: '/frontend-basic/',
      },
      {
        text: '前端进阶',
        link: '/frontend-advanced/',
      },
      {
        text: '前端工程化',
        link: '/frontend-engineering/',
      },
      {
        text: '计算机基础',
        link: '/basic/',
      },
      {
        text: '后端',
        link: '/backend/',
      },
      {
        text: 'Rust',
        link: '/rust-learn/',
      },
      {
        text: '面试',
        link: '/interview/',
      },
      {
        text: '工具',
        link: '/tools/',
      },
      {
        text: '随笔',
        link: '/informal/',
      },
      { text: '掘金文章', link: 'https://juejin.cn/user/4406498334867783/posts' },
      { text: 'GitHub', link: 'https://github.com/fyhhub/fyhhub.github.io' },
    ],
    sidebar: {
      '/algorithm/': [
        {
          text: '算法',
          link: '/algorithm/',
          children: [
            {
              text: '二叉树',
              link: '/algorithm/二叉树/',
            },
            {
              text: '动态规划',
              link: '/algorithm/动态规划/',
            },
            {
              text: '回溯',
              link: '/algorithm/回溯/',
            },
            {
              text: '数组',
              link: '/algorithm/数组/',
            },
            {
              text: '链表',
              link: '/algorithm/链表/',
            },
          ],
        },
      ],
      '/frontend-basic/': [
        {
          text: '前端基础',
          link: '/frontend-basic/',
          children: [
            {
              text: 'CSS',
              link: '/frontend-basic/css/',
            },
            {
              text: 'HTML',
              link: '/frontend-basic/html/',
            },
            {
              text: 'JavaScript',
              link: '/frontend-basic/js/',
            },
          ],
        },
      ],
      '/frontend-advanced/': [
        {
          text: '前端进阶',
          link: '/frontend-advanced/',
          children: [
            {
              text: 'React',
              link: '/frontend-advanced/React/',
            },
            {
              text: 'Vue',
              link: '/frontend-advanced/vue/',
            },
            {
              text: 'TypeScript',
              link: '/frontend-advanced/typescript/',
            },
            {
              text: 'Node',
              link: '/frontend-advanced/node/',
            },
            {
              text: '浏览器原理',
              link: '/frontend-advanced/浏览器原理/',
            },
            {
              text: '微前端',
              link: '/frontend-advanced/微前端/',
            },
            {
              text: '设计稿转代码',
              link: '/frontend-advanced/设计稿转代码/',
            },
          ],
        },
      ],
      '/frontend-engineering/': [
        {
          text: '前端工程化',
          link: '/frontend-engineering/',
          children: [
            {
              text: 'Babel',
              link: '/frontend-engineering/Babel/',
            },
            {
              text: 'ESLint',
              link: '/frontend-engineering/ESLint/',
            },
            {
              text: 'Vite',
              link: '/frontend-engineering/Vite/',
            },
            {
              text: 'Webpack',
              link: '/frontend-engineering/webpack/',
            },
            {
              text: 'Rollup',
              link: '/frontend-engineering/rollup/',
            },
            {
              text: '前端工程实践',
              link: '/frontend-engineering/前端工程实践/',
            },
            {
              text: '前端性能优化',
              link: '/frontend-engineering/前端性能优化/',
            },
            {
              text: '工程化工具',
              link: '/frontend-engineering/工程化工具/',
            },
          ],
        },
      ],
      '/basic/': [
        {
          text: '计算机基础',
          link: '/basic/',
          children: [
            {
              text: '操作系统',
              link: '/basic/操作系统/',
            },
            {
              text: '计算机网络',
              link: '/basic/计算机网络/',
            },
          ],
        },
      ],
      '/backend/': [
        {
          text: '后端',
          link: '/backend/',
          children: [
            {
              text: 'Docker',
              link: '/backend/Docker/',
            },
            {
              text: 'MySQL',
              link: '/backend/MySql/',
            },
            {
              text: 'Nest',
              link: '/backend/Nest/',
            },
          ],
        },
      ],
      '/rust-learn/': [
        {
          text: 'Rust 学习',
          link: '/rust-learn/',
          children: [
            {
              text: 'Rust 知识点梳理',
              link: '/rust-learn/Rust知识点梳理/',
            },
            {
              text: '数据类型',
              link: '/rust-learn/1.数据类型/',
            },
            {
              text: '流程控制',
              link: '/rust-learn/2.流程控制/',
            },
            {
              text: '异常处理',
              link: '/rust-learn/3.异常处理/',
            },
            {
              text: '迭代器',
              link: '/rust-learn/4.迭代器/',
            },
            {
              text: '多线程',
              link: '/rust-learn/5.多线程/',
            },
            {
              text: '笔记',
              link: '/rust-learn/笔记/',
            },
            {
              text: 'napi-rs',
              link: '/rust-learn/napi-rs/',
            },
          ],
        },
      ],
      '/tools/': [
        {
          text: '开发工具',
          link: '/tools/',
          children: [
            {
              text: 'Git',
              link: '/tools/Git/',
            },
            {
              text: 'npm',
              link: '/tools/npm/',
            },
          ],
        },
      ],
      '/informal/': [
        {
          text: '随笔',
          link: '/informal/',
          children: [
            {
              text: '其他',
              link: '/informal/其他/',
            },
            {
              text: '开发技巧',
              link: '/informal/开发技巧/',
            },
            {
              text: '读书笔记',
              link: '/informal/读书笔记/',
            },
            {
              text: '踩坑记录',
              link: '/informal/踩坑记录/',
            },
          ],
        },
      ],
    },
    // 编辑链接
    editLink: {
      pattern: 'https://github.com/fyhhub/fyhhub.github.io/tree/main/docs/:path',
      text: '编辑此页面',
    },
    // 文档目录深度
    outlineTitle: '目录',
    outline: 3,
    // 搜索
    search: {
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
        },
      },
    },
    // 社交链接
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/fyhhub/fyhhub.github.io' },
    ],
  },
  head: [
    ['meta', { name: 'referrer', content: 'never' }],
    [
      'script',
      {},
      `
      var hm1;
      (function() {
        hm1 = document.createElement("script");
        hm1.src = "https://www.googletagmanager.com/gtag/js?id=G-BWGLYWG03M";
        var s1 = document.getElementsByTagName("script")[0];
        s1.parentNode.insertBefore(hm1, s1);
      })();
      hm1.onload = function() {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-BWGLYWG03M');
      };
      `,
    ],
  ],
});
