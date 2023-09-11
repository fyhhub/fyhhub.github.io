# 什么是IOC,有什么优势

IOC 中文名反转控制 （Inverse Of Control），在后端系统中，有很多对象，例如：

+ Controller 对象：接收 http 请求，调用 Service，返回响应
+ Service 对象：实现业务逻辑
+ Repository 对象：实现对数据库的增删改查
+ DataSource对象等

以上这些对象，存在依赖关系，需要按一定的顺序创建对象。`IOC`实现的就是，根据我声明的依赖，帮助我自动创建对象，并注入依赖的对象。


在`nest.js`中，可以通过`@Injectable` 来声明这个类是可以`被注入` 和 `注入` 的, 也可以使用`@Controller`来声明一个请求控制器，但是只能`被注入`