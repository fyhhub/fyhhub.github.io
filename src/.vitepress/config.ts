import { defineConfig } from 'vitepress';
import path from 'path';
import sidebar from './sidebar';
import { nav } from './theme';
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'
import { VueReplMdPlugin } from 'vitepress-plugin-vue-repl';

export default defineConfig({
  title: "fyhub's blog",
  base: '/',
  outDir: path.resolve(__dirname, '../../docs'),
  lastUpdated: true,

  vite: {
    server: {
      host: '127.0.0.1',
      port: 5175
    },
    plugins: [
      // SearchPlugin() as any,
      demoblockVitePlugin()
    ],
    optimizeDeps: {
      // include: ['@vue/repl']
    }
  },
  markdown: {
    config: (md) => {
      md.use(demoblockPlugin)
      md.use(VueReplMdPlugin)
    }
  },
  ignoreDeadLinks: true,
  themeConfig: {
    sidebar,
    nav,
    outline: 'deep',
    editLink: {
      pattern: 'https://github.com/fyhhub/fyhhub.github.io/tree/main/src/:path',
      text: '编辑此页面'
    },
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
  head: [
    [
      'meta',
      {
        name: 'referrer',
        content: 'never'
      },
    ],
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
