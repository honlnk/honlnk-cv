# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个个人简历网站项目，使用 Vue 3 + TypeScript + Vite 技术栈开发。项目采用组件化架构，数据驱动的设计模式。

## 常用开发命令

```bash
# 开发服务器
pnpm dev
# 或
npm run dev

# 构建项目（包含类型检查）
pnpm build
# 或
npm run build

# 仅构建（跳过类型检查）
pnpm build-only

# 类型检查
pnpm type-check

# 代码检查和修复
pnpm lint

# 预览构建结果
pnpm preview
```

## 项目架构

### 核心技术栈

- **前端框架**: Vue 3 + Composition API + `<script setup>`
- **构建工具**: Vite 6.0.11
- **语言**: TypeScript
- **包管理器**: pnpm（同时支持 npm）

### 目录结构

```
src/
├── components/           # 组件化模块
│   ├── Header.vue          # 头部组件（个人信息展示）
│   ├── CoreAdvantages.vue # 核心优势组件
│   ├── ProjectExperience.vue # 项目经历组件
│   ├── EducationBackground.vue # 教育背景组件
│   └── AdditionalValue.vue # 附加价值组件
├── data/
│   └── resume-data.ts     # 数据定义和简历数据
├── assets/
│   └── styles/
│       ├── main.css         # 主样式文件
│       └── variables.css   # CSS 变量定义
├── App.vue               # 根组件
└── main.ts               # 应用入口
```

### 架构模式

1. **组件化架构**: 每个功能模块都是独立的 Vue 组件，使用 Props 进行数据传递
2. **数据驱动**: 简历数据集中在 `src/data/resume-data.ts` 中管理，使用 TypeScript 接口定义数据结构
3. **样式架构**: 使用 CSS 变量实现主题化管理，样式文件按功能分离
4. **路径别名**: 配置了 `@` 指向 `src` 目录的路径别名

### 关键配置文件

- `vite.config.ts`: Vite 构建配置，包含 Vue 插件和开发工具插件
- `tsconfig.json`: TypeScript 主配置，使用项目引用分离配置
- `eslint.config.ts`: ESLint 代码规范配置
- `.editorconfig`: 编辑器配置
- `.vscode/extensions.json`: VS Code 插件推荐

## 开发注意事项

1. **组件开发**: 使用 Composition API 和 `<script setup>` 语法，保持组件的独立性和可复用性
2. **数据管理**: 简历数据修改应在 `src/data/resume-data.ts` 中进行
3. **样式开发**: 优先使用 CSS 变量，保持样式的一致性和可维护性
4. **TypeScript**: 严格遵循 TypeScript 类型定义，确保类型安全
5. **代码规范**: 提交前运行 `pnpm lint` 确保代码符合规范

## 技术特点

- 现代化的 Vue 3 + TypeScript + Vite 技术栈
- 高度模块化的组件设计
- 完善的工程化配置（ESLint、TypeScript、EditorConfig）
- 响应式设计，移动端友好
- 数据驱动的架构模式
