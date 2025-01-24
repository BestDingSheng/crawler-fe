# GitHub Actions + Docker 自动化部署指南

## 目录
- [前期准备](#前期准备)
- [阿里云配置](#阿里云配置)
- [服务器配置](#服务器配置)
- [项目配置](#项目配置)
- [GitHub 配置](#github-配置)
- [部署验证](#部署验证)

## 前期准备

确保你已经有：
- GitHub 账号
- 阿里云账号
- 一台服务器（已安装宝塔面板）
- 本地项目代码

## 阿里云配置

### 1. 创建 RAM 用户
1. 登录阿里云控制台
2. 点击右上角头像，选择 "AccessKey 管理"
3. 选择 "开始使用子用户访问密钥"
4. 进入 RAM 访问控制 -> 用户 -> 创建用户
   - 设置登录名称（如：docker-deploy）
   - 选择 "OpenAPI 调用访问"
   - 保存生成的 AccessKey ID 和 AccessKey Secret

### 2. 配置 RAM 权限
1. 在 RAM 访问控制台
2. 找到刚创建的用户
3. 点击"添加权限"
4. 添加 `AliyunContainerRegistryFullAccess` 权限

### 3. 创建容器镜像仓库
1. 访问 [阿里云容器镜像服务](https://cr.console.aliyun.com/)
2. 创建个人版实例
3. 创建镜像仓库
   - 仓库名称：crawler-fe
   - 仓库类型：私有
   - 代码源：本地仓库
4. 记录下仓库地址（如：registry.cn-hangzhou.aliyuncs.com/your-namespace/crawler-fe）

## 服务器配置

### 1. 安装 Docker
```bash
# 更新包索引
sudo apt-get update

# 安装必要的依赖
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release

# 添加 Docker 的官方 GPG 密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 安装 Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
```

### 2. 安装 Docker Compose
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 3. 配置 Docker 镜像加速
```bash
sudo mkdir -p /etc/docker
sudo vim /etc/docker/daemon.json
```

添加以下内容：
```json
{
  "registry-mirrors": [
    "https://mirror.ccs.tencentyun.com"
  ]
}
```

重启 Docker：
```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 4. 创建项目目录
```bash
mkdir -p /www/wwwroot/crawler-fe
cd /www/wwwroot/crawler-fe
```

### 5. 创建 docker-compose.yml
```bash
vim docker-compose.yml
```

添加以下内容：
```yaml
version: '3'
services:
  crawler-fe:
    image: registry.cn-hangzhou.aliyuncs.com/your-namespace/crawler-fe:latest
    container_name: crawler-fe
    restart: always
    ports:
      - "80:80"
```

## 项目配置

### 1. 创建 Dockerfile
在项目根目录创建 `Dockerfile`：
```dockerfile
# 构建阶段
FROM node:18-alpine as builder
WORKDIR /app

# 设置 npm 国内镜像
RUN npm config set registry https://registry.npmmirror.com

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. 创建 nginx.conf
在项目根目录创建 `nginx.conf`：
```nginx
server {
    listen 80;
    server_name localhost;
    
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

### 3. 创建 GitHub Actions 配置
创建文件 `.github/workflows/docker-deploy.yml`：
```yaml
name: Docker Deploy

on:
  push:
    branches: [ main ]  # 当推送到main分支时触发
  workflow_dispatch:    # 支持手动触发

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Generate version
        id: version
        run: |
          echo "VERSION=$(date +'%Y.%m.%d')-${GITHUB_SHA::7}" >> $GITHUB_ENV

      - name: Login to Aliyun Container Registry
        uses: docker/login-action@v2
        with:
          registry: registry.cn-hangzhou.aliyuncs.com
          username: ${{ secrets.ALIYUN_ACCESS_KEY_ID }}
          password: ${{ secrets.ALIYUN_ACCESS_KEY_SECRET }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: |
            registry.cn-hangzhou.aliyuncs.com/your-namespace/crawler-fe:latest
            registry.cn-hangzhou.aliyuncs.com/your-namespace/crawler-fe:${{ env.VERSION }}

      - name: Deploy to Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USERNAME }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            cd /www/wwwroot/crawler-fe
            docker-compose pull
            docker-compose up -d --force-recreate
```

## GitHub 配置

### 1. 配置 GitHub Secrets
在仓库的 Settings -> Secrets and variables -> Actions 中添加以下密钥：

- `ALIYUN_ACCESS_KEY_ID`: RAM用户的 AccessKey ID
- `ALIYUN_ACCESS_KEY_SECRET`: RAM用户的 AccessKey Secret
- `SERVER_HOST`: 服务器IP
- `SERVER_USERNAME`: 服务器用户名
- `SERVER_SSH_KEY`: 服务器SSH私钥

### 2. 生成 SSH 密钥
在本地执行：
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

将生成的公钥（`~/.ssh/id_ed25519.pub`）添加到服务器的 `~/.ssh/authorized_keys` 文件中。
将私钥（`~/.ssh/id_ed25519`）的内容添加到 GitHub Secrets 的 `SERVER_SSH_KEY` 中。

## 部署验证

### 1. 手动触发部署
1. 在 GitHub 仓库页面
2. 进入 Actions 标签
3. 选择 "Docker Deploy" 工作流
4. 点击 "Run workflow"

### 2. 验证部署
在服务器上执行：
```bash
# 查看容器状态
docker ps

# 查看容器日志
docker logs crawler-fe

# 查看镜像
docker images
```

### 3. 常用命令
```bash
# 重启容器
docker-compose restart

# 查看日志
docker-compose logs

# 停止服务
docker-compose down

# 启动服务
docker-compose up -d

# 更新服务
docker-compose pull && docker-compose up -d
```

## 注意事项

1. 确保所有配置文件中的镜像地址与阿里云容器镜像服务中的地址一致
2. 定期更新 RAM 用户的 AccessKey
3. 保护好所有的密钥和敏感信息
4. 定期检查服务器日志和容器状态
5. 建议保留最近几个版本的镜像，以便需要时回滚 