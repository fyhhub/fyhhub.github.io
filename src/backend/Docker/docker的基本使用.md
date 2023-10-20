# docker的基本使用

## 1. docker命令汇总
Docker 提供了各种命令来管理容器、镜像、网络、卷以及其他 Docker 相关的操作。以下是一些常见的 Docker 命令以及它们的用途：

**容器命令:**

1. `docker run`: 创建并启动一个容器。

2. `docker start`: 启动一个已经创建的容器。

3. `docker stop`: 停止一个正在运行的容器。

4. `docker restart`: 重启一个容器。

5. `docker pause`: 暂停一个容器的执行。

6. `docker unpause`: 恢复一个暂停的容器。

7. `docker exec`: 在正在运行的容器中执行命令。

8. `docker attach`: 连接到正在运行的容器的标准输入、输出和错误流。

9. `docker rm`: 删除一个或多个容器。

10. `docker ps`: 列出正在运行的容器。

11. `docker ps -a`: 列出所有容器，包括已停止的容器。

**镜像命令:**

12. `docker images` 或 `docker image ls`: 列出本地存储的 Docker 镜像。

13. `docker pull`: 拉取一个 Docker 镜像到本地。

14. `docker push`: 推送一个本地镜像到 Docker 镜像仓库。

15. `docker build`: 基于 Dockerfile 创建一个新的 Docker 镜像。

16. `docker rmi`: 删除一个或多个本地 Docker 镜像。

**网络命令:**

17. `docker network ls`: 列出 Docker 网络。

18. `docker network create`: 创建一个新的 Docker 网络。

19. `docker network connect`: 将容器连接到一个网络。

20. `docker network disconnect`: 将容器从一个网络断开连接。

**卷命令:**

21. `docker volume ls`: 列出 Docker 卷。

22. `docker volume create`: 创建一个新的 Docker 卷。

23. `docker volume rm`: 删除一个或多个 Docker 卷。

**系统和信息命令:**

24. `docker version`: 显示 Docker 版本信息。

25. `docker info`: 显示 Docker 系统信息。

26. `docker inspect`: 获取有关容器、镜像、卷、网络等的详细信息。

27. `docker logs`: 获取容器的日志。

28. `docker events`: 显示 Docker 事件流。

这些是一些常见的 Docker 命令，Docker 还提供了许多其他命令和选项，用于执行更多复杂的操作和配置。你可以在终端中输入 `docker --help` 或 `docker <command> --help` 来获取有关特定命令的详细帮助信息。

## 2. 镜像
### 2.1 拉取镜像
```shell
docker pull nginx # 拉取最新版本镜像
docker pull nginx:1.21 # 拉取指定版本
docker pull registry.example.com/my-image # 拉取指定仓库的镜像
```

### 2.2 查看镜像
```shell
docker images
```

### 2.3 删除镜像
```shell
docker rmi nginx # 删除镜像
docker rmi 镜像id # 指定镜像id后，删除镜像
```


## 3. 容器


### 3.1 启动容器

```shell
docker run [选项] `<镜像名称>`
```

- `[选项]` 是可选的容器运行选项，如端口映射、卷挂载等。
- `<镜像名称>` 是要使用的 Docker 镜像的名称。



1. `-d` 或 `--detach`: 以后台（守护进程）模式运行容器，使容器在后台运行，不占用当前终端会话。

2. `--name <容器名称>`: 为容器指定一个自定义的名称。

3. `-p <主机端口>:<容器端口>`: 将容器的端口映射到主机的端口，允许从主机访问容器内的服务。

4. `-v <主机路径>:<容器路径>`: 挂载卷，将主机文件或目录挂载到容器内，以实现数据持久性或共享数据。

5. `-e` 或 `--env`: 设置容器的环境变量，可以用来配置容器内应用程序的行为,例如：
```shell
docker run -e VAR1=value1 -e VAR2=value2 -e VAR3=value3 my_image
```

6. `--rm`: 当容器停止时自动删除容器。通常用于临时容器，以避免在容器停止后留下未使用的容器。

7. `--network <网络名称>`: 将容器连接到指定的 Docker 网络，允许容器之间进行通信。

8. `--link <容器名称或ID>:<别名>`: 连接到其他容器，使容器能够通过别名访问其他容器的服务。

9. `-i` 或 `--interactive`: 保持容器的标准输入（stdin）打开，通常与 `-t` 一起使用以获得交互式 shell。

10. `-t` 或 `--tty`: 分配一个伪终端（tty），通常与 `-i` 一起使用以获得交互式 shell。
11. `--entrypoint <覆盖默认入口命令>`: 覆盖容器的默认入口命令。
12. `--user <用户名或UID>`: 指定容器中运行应用程序的用户。
13. `--workdir <工作目录>`: 设置容器中应用程序的工作目录。
14. `-c` 或 `--cpu-shares`: 为容器分配 CPU 资源的权重。
15. `--memory`: 限制容器使用的内存量。
16. `--restart <策略>`: 配置容器的重启策略，包括无、总是、故障时等选项。


**启动一个nginx**

```shell
docker run -d -p 8081:80 -v /tmp/nginx-temp:/usr/share/nginx/html -e "NGINX_TEST=123"  nginx
```


### 3.2 查看容器

`docker ps` 命令用于列出容器的信息，包括正在运行的容器。以下是一些常用的 `docker ps` 命令的用法和选项：

1. `-a` 或 `--all`: 列出所有容器，包括已停止的容器。默认情况下，只显示正在运行的容器。
    
2. `-q` 或 `--quiet`: 仅显示容器的ID，而不显示容器的详细信息。
    
3. `--no-trunc`: 显示完整的容器命令，而不截断长命令。
    
4. `-n <number>`: 仅显示最后N个容器，例如，`-n 5` 会显示最后5个容器。
    
5. `-f` 或 `--filter`: 使用过滤器来过滤容器，例如，`-f "status=running"` 可以列出状态为运行中的容器。
    
6. `--format`: 自定义输出格式，允许你定义输出中显示的字段和格式。例如，`--format "table {{.ID}}\t{{.Names}}\t{{.Status}}"`。
    
7. `--last <number>`: 仅显示最后N个容器的信息，类似于 `-n` 选项，但逆序列出容器。
    
8. `--latest`, `-l` 或 `--last`: 列出最后一个创建的容器，通常是最后一个启动的容器。
    
9. `--no-trunc`: 显示完整的容器命令，而不截断长命令。
    
10. `--size`: 显示容器的大小信息，包括文件系统和卷的大小。


**查看容器详情**
```shell
docker inspect <容器id>
```

### 3.3 容器交互

- **使用 `docker exec` 进入容器**：
    ```shell
    docker exec -it <容器ID或名称> /bin/bash
    ```
- **使用 `docker attach` 连接到容器**：
    ```shell
    docker attach <容器ID或名称>
    ```

### 3.4 停止容器
```shell
docker stop <容器id>
```

### 3.5 启动停止的容器
```shell
docker start <容器id>
```

### 3.6 删除容器
```shell
docker rm <容器id>
```

### 3.7 卷操作
Docker 卷（Docker Volumes）是用于在容器之间共享和持久化数据的机制。Docker 卷允许你将数据挂载到容器，以便在容器启动、停止、删除或迁移时保留数据。以下是使用 Docker 卷的基本方法：

1. **创建 Docker 卷**:
   ```bash
   docker volume create my_volume
   ```
   这将创建一个名为 `my_volume` 的 Docker 卷。

2. **查看 Docker 卷列表**:
   ```bash
   docker volume ls
   ```

3. **挂载 Docker 卷到容器**:
   ```bash
   docker run -d -v my_volume:/app/data my_image
   ```

   这将启动一个容器，并将 `my_volume` 卷挂载到容器内的 `/app/data` 目录。

4. **查看 Docker 卷的详细信息**:
   ```bash
   docker volume inspect my_volume
   ```

5. **删除 Docker 卷**:
   ```bash
   docker volume rm my_volume
   ```
   请注意，只有当没有容器使用该卷时才能成功删除。

6. **卷的持久性**:

   Docker 卷是持久的，这意味着数据在容器被删除后仍然存在，可以供其他容器使用。这使得数据共享和数据持久性成为可能，尤其在容器编排和微服务架构中非常有用。

7. **卷的备份和恢复**:

   你可以使用备份工具或命令来备份 Docker 卷的数据，以便在需要时进行恢复。一种常见的方法是使用 `docker cp` 命令将卷的数据复制到本地文件系统，然后进行备份。
