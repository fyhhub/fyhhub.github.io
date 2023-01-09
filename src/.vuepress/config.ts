import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import path from "path";
import { searchPlugin } from "@vuepress/plugin-search";
import { viteBundler } from '@vuepress/bundler-vite'

const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;
export default defineUserConfig({
  base: "/",
  dest: path.resolve(__dirname, "../../docs"),
  theme,
  shouldPrefetch: false,
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search',
        },
        '/zh/': {
          placeholder: '搜索',
        },
      },
    })
  ],
  bundler: viteBundler({
    viteOptions: {
      build: {
        rollupOptions: {
          output: {
            // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
            sanitizeFileName(fileName) {
              const match = DRIVE_LETTER_REGEX.exec(fileName);
              const driveLetter = match ? match[0] : "";
              return (
                driveLetter +
                fileName.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "")
              );
            },
          },
        },
      }
    }
  }),
  head: [
    [
      "script",
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
  `,
    ],
  ],
});
