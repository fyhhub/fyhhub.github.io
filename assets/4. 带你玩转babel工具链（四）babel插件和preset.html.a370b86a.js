const e=JSON.parse('{"key":"v-34b82720","path":"/frontend-engineering/Babel/%E6%B7%B1%E5%85%A5%E6%B5%85%E5%87%BAbabel/4.%20%E5%B8%A6%E4%BD%A0%E7%8E%A9%E8%BD%ACbabel%E5%B7%A5%E5%85%B7%E9%93%BE%EF%BC%88%E5%9B%9B%EF%BC%89babel%E6%8F%92%E4%BB%B6%E5%92%8Cpreset.html","title":"\u5E26\u4F60\u73A9\u8F6C babel \u5DE5\u5177\u94FE\uFF08\u56DB\uFF09babel \u63D2\u4EF6\u548C preset","lang":"en-US","frontmatter":{"summary":"\u5E26\u4F60\u73A9\u8F6C babel \u5DE5\u5177\u94FE\uFF08\u56DB\uFF09babel \u63D2\u4EF6\u548C preset \u4E00\u3001\u524D\u8A00 \u5728\u524D\u9762\u4E09\u7AE0\uFF0C\u6211\u4EEC\u4E32\u8054\u4E86\u6574\u4E2A\u7684\u4EE3\u7801\u8F6C\u6362\u6D41\u7A0B: parse, transform, generator\u3002\u8FD9\u4E5F\u662Fbabel\u63D2\u4EF6\u6700\u6838\u5FC3\u7684\u5185\u5BB9\uFF0C\u90FD\u662F\u57FA\u4E8E\u4E0A\u9762\u7684\u8FC7\u7A0B\u5B9E\u73B0\u7684\u3002\u672C\u6587\u5C06\u5E26\u5927\u5BB6\uFF0C\u8BE6\u7EC6\u4E86\u89E3\u63D2\u4EF6\u7684\u7528\u6CD5\u3001\u6267\u884C\u673A\u5236\u4EE5\u53CA\u4E00\u4E9B\u7EC6\u8282\u3002 \u5F80\u671F\u56DE\u987E\uFF1A \u5E26\u4F60\u73A9\u8F6C\u5DE5\u5177\u94FE\uFF08\u4E00\uFF09@babel/parser; \u5E26","head":[["meta",{"property":"og:url","content":"https://fyhhub.github.io/frontend-engineering/Babel/%E6%B7%B1%E5%85%A5%E6%B5%85%E5%87%BAbabel/4.%20%E5%B8%A6%E4%BD%A0%E7%8E%A9%E8%BD%ACbabel%E5%B7%A5%E5%85%B7%E9%93%BE%EF%BC%88%E5%9B%9B%EF%BC%89babel%E6%8F%92%E4%BB%B6%E5%92%8Cpreset.html"}],["meta",{"property":"og:title","content":"\u5E26\u4F60\u73A9\u8F6C babel \u5DE5\u5177\u94FE\uFF08\u56DB\uFF09babel \u63D2\u4EF6\u548C preset"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-01-11T13:35:51.000Z"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"article:modified_time","content":"2023-01-11T13:35:51.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"\u4E00\u3001\u524D\u8A00","slug":"\u4E00\u3001\u524D\u8A00","link":"#\u4E00\u3001\u524D\u8A00","children":[]},{"level":2,"title":"\u4E8C\u3001\u63D2\u4EF6\u548C preset \u7684\u57FA\u672C\u914D\u7F6E","slug":"\u4E8C\u3001\u63D2\u4EF6\u548C-preset-\u7684\u57FA\u672C\u914D\u7F6E","link":"#\u4E8C\u3001\u63D2\u4EF6\u548C-preset-\u7684\u57FA\u672C\u914D\u7F6E","children":[]},{"level":2,"title":"\u4E09\u3001\u63D2\u4EF6\u548C preset \u7684\u6267\u884C\u987A\u5E8F","slug":"\u4E09\u3001\u63D2\u4EF6\u548C-preset-\u7684\u6267\u884C\u987A\u5E8F","link":"#\u4E09\u3001\u63D2\u4EF6\u548C-preset-\u7684\u6267\u884C\u987A\u5E8F","children":[]},{"level":2,"title":"\u56DB\u3001\u63D2\u4EF6\u7684\u5206\u7C7B","slug":"\u56DB\u3001\u63D2\u4EF6\u7684\u5206\u7C7B","link":"#\u56DB\u3001\u63D2\u4EF6\u7684\u5206\u7C7B","children":[{"level":3,"title":"\u8BED\u6CD5\u63D2\u4EF6","slug":"\u8BED\u6CD5\u63D2\u4EF6","link":"#\u8BED\u6CD5\u63D2\u4EF6","children":[]},{"level":3,"title":"\u8F6C\u6362\u63D2\u4EF6","slug":"\u8F6C\u6362\u63D2\u4EF6","link":"#\u8F6C\u6362\u63D2\u4EF6","children":[]},{"level":3,"title":"proposal \u63D2\u4EF6","slug":"proposal-\u63D2\u4EF6","link":"#proposal-\u63D2\u4EF6","children":[]}]},{"level":2,"title":"\u4E94\u3001\u63D2\u4EF6\u548C preset \u7684\u57FA\u672C\u5199\u6CD5","slug":"\u4E94\u3001\u63D2\u4EF6\u548C-preset-\u7684\u57FA\u672C\u5199\u6CD5","link":"#\u4E94\u3001\u63D2\u4EF6\u548C-preset-\u7684\u57FA\u672C\u5199\u6CD5","children":[{"level":3,"title":"\u63D2\u4EF6","slug":"\u63D2\u4EF6","link":"#\u63D2\u4EF6","children":[]},{"level":3,"title":"preset","slug":"preset","link":"#preset","children":[]}]},{"level":2,"title":"\u516D\u3001\u63D2\u4EF6\u4E0A\u4E0B\u6587","slug":"\u516D\u3001\u63D2\u4EF6\u4E0A\u4E0B\u6587","link":"#\u516D\u3001\u63D2\u4EF6\u4E0A\u4E0B\u6587","children":[]},{"level":2,"title":"\u603B\u7ED3","slug":"\u603B\u7ED3","link":"#\u603B\u7ED3","children":[]},{"level":2,"title":"\u53C2\u8003","slug":"\u53C2\u8003","link":"#\u53C2\u8003","children":[]}],"git":{"createdTime":1673444151000,"updatedTime":1673444151000,"contributors":[{"name":"fanyihui","email":"fanyihui@tuhu.cn","commits":1}]},"readingTime":{"minutes":6.78,"words":2034},"filePathRelative":"frontend-engineering/Babel/\u6DF1\u5165\u6D45\u51FAbabel/4. \u5E26\u4F60\u73A9\u8F6Cbabel\u5DE5\u5177\u94FE\uFF08\u56DB\uFF09babel\u63D2\u4EF6\u548Cpreset.md","localizedDate":"January 11, 2023"}');export{e as data};
