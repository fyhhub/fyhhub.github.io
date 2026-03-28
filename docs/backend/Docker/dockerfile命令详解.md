# dockerfile命令详解

## ARG
可以指定变量:
```bash
ARG  CODE_VERSION=latest
FROM base:${CODE_VERSION}
CMD  /code/run-app

FROM extras:${CODE_VERSION}
CMD  /code/run-extras
```
也可以参数传入
```bash
docker build --build-arg aaa=3 --build-arg bbb=4 -t arg-test -f 333.Dockerfile .
```

```bash
FROM node:18-alpine3.14

ARG aaa
ARG bbb

WORKDIR /app

COPY ./test.js .

ENV aaa=${aaa} \
    bbb=${bbb}

CMD ["node", "/app/test.js"]
```

## FROM
+ 指明当前的镜像基于哪个镜像构建
+ dockerfile 必须以 FROM 开头，除了 ARG 命令可以在 FROM 前面

  ```
  FROM [--platform=<platform>] <image> [AS <name>]

  FROM [--platform=<platform>] <image>[:<tag>] [AS <name>]

  FROM [--platform=<platform>] <image>[@<digest>] [AS <name>]
  ```

+ 一个 dockerfile 可以有多个 FROM， 通过 as 指定阶段名称， `Copy`通过--from指定阶段

  ```bash
  FROM tiangolo/uvicorn-gunicorn:python3.9 as requirements-stage # 通过as 指定阶段名称

  COPY --from=requirements-stage /tmp/requirements.txt /code/requirements.txt # --from指定阶段
  ```


## LABEL
可以给镜像增加一些标签
```bash
LABEL com.example.label-with-value="foo"
LABEL version="1.0"

# 换行
LABEL description="This text illustrates \
that label-values can span multiple lines."

# 一行添加多个 key=value
LABEL multi.label1="value1" multi.label2="value2" other="value3"
```

通过 docker inspect 查看添加的元数据
```bash
docker image inspect --format='' myimage
```


## WORKDIR
+ 切换到镜像中的指定路径，设置工作目录
+ 在 WORKDIR 中需要使用绝对路径，如果镜像中对应的路径不存在，会自动创建此目录
+ 一般用 WORKDIR 来替代  切换目录进行操作的指令


将宿主机的 test.txt 文件复制到 镜像的 /tmp/test.txt:
```bash
WORKDIR /tmp
COPY test.txt .
```

如果提供了相对路径，它将相对于前一个 WORKDIR 指令的路径:
```bash
WORKDIR /a
WORKDIR b
WORKDIR c
RUN pwd
```

## RUN

运行命令

```bash
RUN /bin/bash -c 'source $HOME/.bashrc; echo $HOME' # shell模式

RUN ["executable", "param1", "param2"] # exec 模式
```


## CMD
```bash
#  exec 形式，推荐
CMD ["executable","param1","param2"]
CMD ["可执行命令", "参数1", "参数2"...]

# 作为ENTRYPOINT的默认参数
CMD ["param1","param2"]

# shell
CMD 命令 param1 param2
 
```
+ 一个 Dockerfile 只有一个 CMD 指令，若有多个，只有最后一个 CMD 指令生效
+ CMD 主要目的：为容器提供默认执行的命令，这个默认值可以包含可执行文件
+ 也可以不包含可执行文件，意味着必须指定 ENTRYPOINT 指令（第二种写法）


**RUN 和 CMD区别：**

+ RUN 可以在构建阶段运行很多个命令，而且每运行一个命令都会单独提交结果
+ CMD 在构建阶段不执行任何操作，而是指定镜像默认执行的命令


## EXPOSE
```bash
EXPOSE 端口号
EXPOSE 端口号/协议
```

## ENV
定义环境变量
```bash
ENV <key>=<value> ...

# 但只能设置一个环境变量
ENV MY_VAR my-value

# 使用
WORKDIR ${MY_VAR}
# 或者
WORKDIR $MY_VAR

```

通过 ENV 指令可以声明环境变量，可以在以下指令中使用环境变量

+ ADD
+ COPY
+ ENV
+ EXPOSE
+ FROM
+ LABEL
+ STOPSIGNAL
+ USER
+ VOLUME
+ WORKDIR
+ ONBUILD

**ARG 和 ENV 的区别**
+ ARG 定义的变量只会存在于镜像构建过程，启动容器后并不保留这些变量
+ ENV 定义的变量在启动容器后仍然保留


## VOLUME
运行容器时可以从本地主机或其他容器挂载数据卷，一般用来存放数据库和需要保持的数据等

```bash
VOLUME ["/data"] 
```

这里的 /data 目录就会在运行时自动挂载为匿名卷，任何向 /data 中写入的信息都不会记录进容器存储层，从而保证了容器存储层的无状态化

## COPY、ADD

```bash
FROM node:18-alpine3.14

ADD ./aaa.tar.gz /aaa

COPY ./aaa.tar.gz /bbb
```
ADD、COPY 都可以用于把目录下的文件复制到容器内的目录下。但是 ADD 还可以解压 tar.gz 文件。
## 打包镜像
```bash
docker build -t aaa:ccc .
```
aaa 是镜像名，ccc 是镜像的标签

## 常见示例


### Node静态服务镜像
```
dir
  - dockerfile
  - index.html
```

```bash
FROM node:latest

WORKDIR /app

COPY index.html .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "-p", "8080"]
```
将`index.html`拷贝到容器的`/app`目录下，并且在工作目录下执行`http-server`命令


### Nest镜像
+ 新建个项目：
```bash
nest new dockerfile-test -p npm
```

+ 编写 .dockerignore：

```bash
*.md
node_modules/
.git/
.DS_Store
.vscode/
.dockerignore
```

+ 编写 Dockerfile：
```bash
FROM node:18.0-alpine3.14 as build-stage

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:18.0-alpine3.14 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]
```

+ 执行 docker build, 镜像名为 nest、标签为 first，构建上下文是当前目录

```bash
docker build -t nest:first .
```
如果你 build 的时候报这个错误, 那需要加一行：
```bash
RUN ln -s /sbin/runc /usr/bin/runc
```
## 参考
[小菠萝测试笔记](https://cloud.tencent.com/developer/user/7440717/articles)

感谢该作者，本文基本复制的，做了汇总