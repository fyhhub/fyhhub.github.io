// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';
import codeblocksFold from 'vitepress-plugin-codeblocks-fold'; // 导入方法
import 'vitepress-plugin-codeblocks-fold/style/index.scss'; // 导入样式
import { AntDesignContainer, ElementPlusContainer, NaiveUIContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx);
        ctx.app.component('demo-preview', ElementPlusContainer)
    },
    setup() {
        // 获取前言和路由
        const { frontmatter } = useData();
        const route = useRoute();
        // 评论组件 - https://giscus.app/
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
        });
        codeblocksFold({ route, frontmatter }, true, 400);
    }
};