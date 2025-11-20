# Run Web

这是一个基于 [Next.js](https://nextjs.org) 构建的跑步数据追踪和分析应用，使用现代Web技术栈开发。

## 功能特性

- **首页**: 显示跑步统计数据和表格
- **比赛页面**: 展示比赛信息列表
- **配速计算器**: 计算和分析跑步配速
- **训练计划**: 制定和管理跑步训练计划
- **响应式设计**: 使用 Tailwind CSS 和 DaisyUI 构建现代化界面
- **动画效果**: 集成 Framer Motion 提供流畅动效

## 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript, React 19
- **样式**: Tailwind CSS, DaisyUI
- **动画**: Framer Motion
- **图标**: React Icons
- **查询字符串处理**: query-string
- **包管理**: pnpm

## 开始使用

首先，启动开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 项目结构

```
src/
├── app/                 # 页面路由
│   ├── game/           # 比赛相关页面
│   ├── pace/           # 配速计算器页面
│   ├── schedule/       # 训练计划页面
│   └── globals.css     # 全局样式
├── components/         # 可复用组件
├── data/              # 数据文件
└── utils/             # 工具函数
```

## 主要组件

- `Stat`: 统计数据显示组件
- `StatTable`: 统计数据表格组件
- `Greeting`: 欢迎信息组件
- `Loading`: 加载状态组件
- `Header`/`Footer`: 页头和页脚组件

## 构建与部署

构建项目：

```bash
npm run build
```

启动生产服务器：

```bash
npm start
```

## 学习资源

- [Next.js 官方文档](https://nextjs.org/docs) - 了解 Next.js 特性和 API
- [学习 Next.js](https://nextjs.org/learn) - 互动式 Next.js 教程
- [Tailwind CSS 文档](https://tailwindcss.com) - 样式框架
- [DaisyUI 文档](https://daisyui.com) - UI 组件库