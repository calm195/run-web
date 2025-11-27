# Run Web

这是一个基于 [Next.js](https://nextjs.org) 构建的华南理工大学百鲤跑者协会网页

## 功能特性

- **首页**: 显示协会理念与现状
- **比赛页面**: 展示比赛信息列表
- **配速计算器**: 计算和分析跑步配速
- **训练计划**: 跑步训练计划
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
- **代码规范**: Prettier, ESLint, TypeScript

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
├── api/                # 请求后端
├── app/                 # 页面路由
│   ├── game/           # 比赛相关页面
│   ├── pace/           # 配速计算器页面
│   ├── schedule/       # 训练计划页面
│   └── globals.css     # 全局样式
├── components/         # 可复用组件
├── data/              # 数据文件
└── utils/             # 工具函数
```

## 构建与部署

构建项目：

```bash
pm run build
```

启动生产服务器：

```bash
pm start
```

## 许可证

该项目采用 [MIT 许可证](LICENSE)。

## 联系方式

如有问题或建议，请提交 Issue
