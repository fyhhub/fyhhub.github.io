import { defineConfig } from 'vitepress';
import path from 'path';
import sidebar from './sidebar';
import { nav } from './theme';
import { SearchPlugin } from 'vitepress-plugin-search';
import { withMermaid } from "vitepress-plugin-mermaid";
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;
export default withMermaid(defineConfig({
  title: "fyhub's blog",
  base: '/',
  outDir: path.resolve(__dirname, '../../docs'),
  mermaid: {},
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  vite: {
    server: {
      port: 5175,
      host: '127.0.0.1'
    },
    plugins: [
      SearchPlugin() as any
    ]
  },
  ignoreDeadLinks: true,
  themeConfig: {
    sidebar,
    nav
  },
  // {
  //   provider: "Giscus",
  //   repo: "fyhhub/fyhhub.github.io",
  //   repoId: "R_kgDOGcGXUw",
  //   category: "General",
  //   categoryId: "DIC_kwDOGcGXU84CQ1aV",
  //   inputPosition: "bottom",
  // }
  // theme,
  // shouldPrefetch: false,
  // plugins: [
  //   searchPlugin({
  //     locales: {
  //       '/': {
  //         placeholder: 'Search',
  //       },
  //       '/zh/': {
  //         placeholder: '搜索',
  //       },
  //     },
  //   })
  // ],
  // bundler: viteBundler({
  //   viteOptions: {
  //     build: {
  //       rollupOptions: {
  //         output: {
  //           // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
  //           sanitizeFileName(fileName) {
  //             const match = DRIVE_LETTER_REGEX.exec(fileName);
  //             const driveLetter = match ? match[0] : "";
  //             return (
  //               driveLetter +
  //               fileName.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "")
  //             );
  //           },
  //         },
  //       },
  //     }
  //   }
  // }),
  head: [
    [
      'script',
      {},
      `
    var hm1
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
    }
  `
    ]
  ]
}));
