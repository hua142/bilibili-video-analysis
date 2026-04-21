<<<<<<< HEAD
# bilibili-video-analysis
B站视频数据分析平台 - 实时监控与分析B站视频数据
=======
# B站视频数据分析平台

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2.4-black?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19.2.4-blue?style=flat-square&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind CSS-4.2.3-38bdf8?style=flat-square&logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Recharts-3.8.1-pink?style=flat-square" alt="Recharts">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
</div>

## 📖 项目简介

这是一个基于 Next.js 开发的 **B站（Bilibili）视频数据分析平台**，用于爬取、分析和可视化展示B站视频的各项数据指标，包括播放量、点赞量、评论数、分享数等核心数据。

## ✨ 功能特性

### 📊 数据分析功能
- **总览页面**：展示所有核心指标的综合数据概览
- **浏览量分析**：详细的播放数据分析、趋势图、分类统计
- **点赞量分析**：互动指标分析、点赞率对比、雷达图展示
- **评论分析**：评论趋势、情感分析、时间分布统计
- **分享分析**：分享渠道分布、传播效果评估、时段分析

### 🎨 界面设计
- 🎀 采用B站主题色（粉色 #fb7299）
- 📱 响应式设计，完美适配各种设备
- ✨ 现代化的卡片式布局和动画效果
- 📈 使用 Recharts 实现丰富的数据可视化

## 🛠️ 技术栈

- **框架**: Next.js 16.2.4 (App Router)
- **UI库**: React 19.2.4
- **样式**: Tailwind CSS 4.2.3
- **图表**: Recharts 3.8.1
- **图标**: Lucide React
- **语言**: TypeScript 5.9.3

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
# 使用 pnpm 安装（推荐）
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:5000 查看应用。

### 构建生产版本

```bash
pnpm build
```

### 启动生产服务器

```bash
pnpm start
```

## 📁 项目结构

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # 总览页面
│   │   ├── views/page.tsx     # 浏览量分析
│   │   ├── likes/page.tsx     # 点赞量分析
│   │   ├── comments/page.tsx  # 评论分析
│   │   ├── shares/page.tsx    # 分享分析
│   │   ├── layout.tsx         # 根布局
│   │   └── globals.css        # 全局样式
│   ├── components/             # React 组件
│   │   ├── Navbar.tsx         # 导航栏
│   │   └── StatCard.tsx       # 统计卡片
│   └── lib/                    # 工具库和数据
│       └── data.ts            # 模拟数据
├── public/                     # 静态资源
├── .coze                       # 部署配置
├── package.json
├── tsconfig.json
└── README.md
```

## 📈 数据说明

本项目使用模拟数据进行演示。实际应用中，可以：

1. **B站官方API**：申请B站开发者账号，使用官方API获取真实数据
2. **爬虫采集**：使用Python/Node.js编写爬虫程序采集数据
3. **数据存储**：将采集的数据存储到数据库中

> ⚠️ 注意：请遵守B站的使用协议和robots.txt规定，不要进行大规模数据爬取。

## 🎯 主要页面预览

### 总览页面
展示所有核心指标的统计数据，包括总播放量、总点赞数、总评论数等，以及趋势图和分类分布图。

### 浏览量分析
- 播放量趋势图
- 视频播放量排名
- 各分类播放分布
- 详细的播放数据表格

### 点赞量分析
- 用户互动指标雷达图
- 互动率对比分析
- 点赞量排名柱状图
- 点赞率详细数据

### 评论分析
- 评论趋势图
- 评论时间分布
- 评论情感分析
- 评论量排名

### 分享分析
- 分享趋势图
- 分享渠道分布饼图
- 分享时段分布
- 传播效果评估

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📝 License

本项目采用 MIT License - 详见 [LICENSE](LICENSE) 文件

## 👨‍💻 作者

[B站数据分析团队]

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Recharts](https://recharts.org/) - 图表库
- [Lucide](https://lucide.dev/) - 图标库
- [B站](https://www.bilibili.com/) - 数据来源

---

⭐ 如果这个项目对你有帮助，请给个 Star！
>>>>>>> 78ac132 (feat: 完成B站视频数据分析平台)
