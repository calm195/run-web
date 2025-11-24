#!/bin/bash

set -e

REMOTE_HOST="www.kurous.cn"
REMOTE_USER="root"
REMOTE_PATH="/root/run-web"
PROJECT_NAME="run-web"

echo "🚀 开始构建 Next.js 应用..."

# 1. 安装依赖 & 构建
pnpm install
pnpm build

# 2. 创建临时部署目录
DEPLOY_DIR="./deploy"
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"

# 3. 复制必要文件
cp -r .next public package.json pnpm-lock.yaml next.config.js "$DEPLOY_DIR/"
cp .env "$DEPLOY_DIR/.env"

# 4. 复制远程部署脚本
cp ./deploy.sh "$DEPLOY_DIR/"

echo "📦 打包完成，正在上传到服务器..."

# 5. 上传到远程服务器
tar -czf "${PROJECT_NAME}.tar.gz" -C "$DEPLOY_DIR" .
scp "${PROJECT_NAME}.tar.gz" "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/"

# 6. 在远程执行部署脚本
ssh "${REMOTE_USER}@${REMOTE_HOST}" "cd ${REMOTE_PATH} && tar -xzf ${PROJECT_NAME}.tar.gz && bash remote-deploy.sh"

echo "✅ 部署完成！"
