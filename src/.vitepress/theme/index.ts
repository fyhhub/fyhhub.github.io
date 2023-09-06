// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import { useComponents } from './useComponents'
import Playground from '../../../vitepress-plugin-vue-repl/components/Playground.vue'
import './custom.css'
export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx);
        useComponents(ctx.app)
        ctx.app.component('VuePlayground', Playground);
    },
    setup() {
        // 获取前言和路由
        const { frontmatter } = useData();
        const route = useRoute();
        giscusTalk({
            repo: 'fyhhub/fyhhub.github.io',
            repoId: 'R_kgDOGcGXUw',
            category: 'General', // 默认: `General`
            categoryId: 'DIC_kwDOGcGXU84CQ1aV',
            mapping: 'pathname', // 默认: `pathname`
            inputPosition: 'top', // 默认: `top`
            lang: 'zh-CN', // 默认: `zh-CN`
        }, {
            frontmatter, route
        } as any);
    }
};