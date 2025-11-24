#!/bin/bash

set -e

echo "🔧 在服务器上安装生产依赖..."

# 确保 pnpm 已安装
if ! command -v pnpm &> /dev/null; then
  echo "⚠️ pnpm 未安装，正在安装..."
  curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
fi

# 安装生产依赖（跳过 devDependencies）
pnpm install --prod

# 安装 PM2（若未安装）
if ! command -v pm2 &> /dev/null; then
  pnpm add -g pm2
fi

# 设置 Node 内存限制（适用于低配服务器）
export NODE_OPTIONS="--max-old-space-size=800"

# 重启应用
pm2 delete run-web 2>/dev/null || true
pm2 start "pnpm start" --name "run-web"

echo "✅ Next.js 应用已在 PM2 中启动"
