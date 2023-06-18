import { hopeTheme, navbar } from "vuepress-theme-hope";

const nav = navbar([
  "/",
  {
    text: "前端开发",
    icon: 'html',
    children: [
      {
        text: '前端基础',
        children: [
          {
            icon: 'css',
            text: 'CSS',
            link: '/frontend-basic/css'
          },
          {
            icon: 'html',
            text: 'HTML',
            link: '/frontend-basic/html'
          },
          {
            icon: 'javascript',
            text: 'JS',
            link: '/frontend-basic/js'
          }
        ]
      },
      {
        text: '前端进阶',
        // link: '/frontend-advanced/'
        children: [
          {
            text: '浏览器原理',
            icon: 'chrome',
            link: '/frontend-advanced/浏览器原理/'
          },
          {
            text: '微前端',
            icon: 'workingDirectory',
            link: '/frontend-advanced/微前端/'
          },
          {
            text: 'JavaScript',
            icon: 'javascript',
            link: '/frontend-advanced/Javascript/'
          },
          {
            text: 'Node',
            icon: 'nodeJS',
            link: '/frontend-advanced/Node/'
          },
          {
            text: 'React',
            icon: 'react',
            link: '/frontend-advanced/React/'
          },
          {
            text: 'Typescript',
            icon: 'typescript',
            link: '/frontend-advanced/Typescript/'
          },
          {
            text: 'Vue',
            icon: 'vue',
            link: '/frontend-advanced/Vue/'
          }
        ]
      },
      {
        text: '前端工程化',
        children: [
          {
            text: '前端工程实践',
            icon: 'app',
            link: '/frontend-engineering/前端工程实践'
          },
          {
            text: '前端性能优化',
            icon: 'align',
            link: '/frontend-engineering/前端性能优化'
          },
          {
            text: 'Babel',
            icon: '/babel.svg',
            link: '/frontend-engineering/Babel'
          },
          {
            text: 'ESLint',
            icon: '/eslint.svg',
            link: '/frontend-engineering/ESLint'
          },
          {
            text: 'rollup',
            icon: '/rollup.svg',
            link: '/frontend-engineering/rollup'
          },
          {
            text: 'Vite',
            icon: '/vite.svg',
            link: '/frontend-engineering/Vite'
          },
          {
            text: 'webpack',
            icon: '/webpack.svg',
            link: '/frontend-engineering/webpack'
          }
        ]
      },
    ],
  },
  { text: "开发工具", link: "/tools/", icon: 'tool' },
  { text: "算法", link: "/algorithm/", icon: 'state' },
  { text: "计算机基础", link: "/basic/", icon: 'code' },
  { text: "随笔", link: "/informal/", icon: 'write' },
  { text: "面经", link: "/interview/", icon: 'strong' },
  { text: "Rust", link: "/rust/", icon: 'copyright' },
  { text: "留言板", link: "/comment/", icon: 'comment' },
]);
export default hopeTheme({
  hostname: "https://fyhhub.github.io",
  author: {
    name: "fyhub",
    url: "",
  },
  iconAssets: "iconfont",
  logo: "/logo.svg",
  repo: "fyhhub/fyhhub.github.io",
  repoLabel: "GitHub",
  docsDir: "docs",
  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],
  blog: {
    name: '前端菜13',
    avatar: '/avatar.jpeg',
    medias: {
      GitHub: "https://github.com/fyhhub",
      QQ: '1131153523@qq.com'
    },
  },
  sidebar: {
    '/frontend-basic/': 'structure',
    '/frontend-advanced/': 'structure',
    '/frontend-engineering/': 'structure',
    '/tools/': 'structure',
    '/algorithm/': 'structure',
    '/basic/': 'structure',
    '/comment/': 'structure',
    '/informal/': 'structure',
    '/interview/': 'structure',
    '/c/': 'structure',
  },
  editLink: false,
  navbar: nav,
  plugins: {
    blog: {
      autoExcerpt: true,
    },
    comment: {
      provider: "Giscus",
      repo: "fyhhub/fyhhub.github.io",
      repoId: "R_kgDOGcGXUw",
      category: "General",
      categoryId: "DIC_kwDOGcGXU84CQ1aV",
      inputPosition: "bottom",
    },
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      flowchart: true,
      gfm: true,
      imageSize: true,
      include: true,
      katex: true,
      lazyLoad: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      sub: true,
      sup: true,
      tabs: true,
      vpre: true,
      vuePlayground: true,
    },
  },
});
