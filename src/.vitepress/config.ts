import { defineConfig } from 'vitepress';
import path from 'path';
import sidebar from './sidebar';
import { nav } from './theme';
import { SearchPlugin } from 'vitepress-plugin-search';
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'


export default defineConfig({
  title: "fyhub's blog",
  base: '/',
  outDir: path.resolve(__dirname, '../../docs'),
  lastUpdated: true,
  vite: {
    server: {
      port: 5175,
      host: '127.0.0.1'
    },
    plugins: [
      // SearchPlugin() as any,
      demoblockVitePlugin()
    ]
  },
  markdown: {
    config: (md) => {
      md.use(demoblockPlugin)
    }
  },
  ignoreDeadLinks: true,
  themeConfig: {
    sidebar,
    nav,
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    }
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
});
