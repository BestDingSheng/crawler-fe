# 87创业网前端项目需求文档

## 项目概述
本项目是一个教育资源分享平台的前端实现，使用 React + TypeScript + Vite 构建，采用 Ant Design 作为 UI 组件库，styled-components 进行样式管理。

## 技术栈
- React 18
- TypeScript
- Vite
- Ant Design
- styled-components
- react-router-dom

## 页面布局需求

### 1. 整体布局
- 页面最大宽度: 1200px
- 布局方式: 居中显示
- 响应式设计: 支持移动端和桌面端

### 2. 头部模块 (Header)
- Logo 展示
- 导航菜单
- 搜索框
- 用户功能区
  - 暗色/亮色模式切换
  - 消息通知
  - 登录/注册按钮
  - 充值按钮
  - 开通会员按钮

### 3. 内容模块 (Content)
- 顶部导航
  - "精品创业项目" 标题
  - "365x24h自动更新" 标签
  - 子导航菜单：中创网、福新论坛、曾港网、自学点才网
- 内容卡片列表
  - 两列布局
  - 每个卡片包含：
    - 缩略图
    - 标题
    - 描述
    - 作者信息
    - 互动数据（浏览量、点赞数）

### 4. 底部模块 (Footer)
- 关于我们
- 特色功能
- 用户服务
- 二维码（公众号、QQ）
- 用户数据统计
- 版权信息和备案信息

## 项目结构
```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Content.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   ├── common/
│   │   ├── Logo.tsx
│   │   ├── SearchBar.tsx
│   │   └── Card.tsx
│   └── auth/
│       └── LoginButton.tsx
├── pages/
│   └── Home.tsx
├── styles/
│   └── GlobalStyle.ts
└── routes/
    └── index.tsx
```

## 开发规范
1. 组件开发
   - 使用 TypeScript 编写所有组件
   - 使用函数式组件和 Hooks
   - 组件文件使用 PascalCase 命名

2. 样式开发
   - 使用 styled-components 管理样式
   - 遵循 BEM 命名规范
   - 支持暗色/亮色主题切换

3. 代码规范
   - 使用 ESLint 进行代码检查
   - 使用 Prettier 进行代码格式化
   - 遵循 React 最佳实践

## 性能要求
- 首屏加载时间 < 3s
- 页面切换流畅，无明显卡顿
- 图片懒加载
- 合理的代码分割

## 浏览器兼容性
- 支持主流现代浏览器的最新两个版本
- Chrome, Firefox, Safari, Edge

## 后续功能规划
1. 用户系统
   - 登录/注册
   - 个人中心
   - 会员系统

2. 内容管理
   - 内容发布
   - 内容编辑
   - 内容审核

3. 社交功能
   - 评论系统
   - 点赞功能
   - 分享功能
