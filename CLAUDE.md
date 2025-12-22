# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个个人简历网站项目，使用 Vue 3 + TypeScript + Vite + UnoCSS 技术栈开发。项目采用组件化架构，以 Markdown 驱动的设计模式，支持动态字段配置和主题切换。

## 常用开发命令

```bash
# 开发服务器
pnpm dev

# 构建项目（包含类型检查）
pnpm build

# 仅构建（跳过类型检查）
pnpm build-only

# 类型检查
pnpm type-check

# 代码检查和修复
pnpm lint

# 代码格式化
pnpm format

# 预览构建结果
pnpm preview
```

## 项目架构

### 核心技术栈

- **前端框架**: Vue 3 + Composition API + `<script setup>`
- **构建工具**: Vite 6.0.11
- **语言**: TypeScript 5.7.3
- **样式系统**: UnoCSS + 自定义 CSS 设计令牌
- **动画库**: GSAP + @vueuse/motion
- **包管理器**: pnpm

### 数据驱动架构

**数据源**: README.md 文件作为简历数据的单一来源，支持工作经历、项目经历、教育背景等模块
**数据流**: README.md → `useResumeData` composable → Vue 组件
**类型定义**: `src/types/types.ts` 提供完整的 TypeScript 类型系统
**字段配置**: `src/config/basic-info-fields.ts` 支持动态字段配置
**组件特性**: 支持多项目同时展开、抽屉式工作经历展示、动画过渡效果

### 目录结构

```
src/
├── components/           # Vue 组件
│   ├── Header.vue          # 个人信息展示
│   ├── CoreAdvantages.vue  # 核心优势
│   ├── ProjectExperience.vue # 项目经历
│   ├── WorkExperience.vue  # 工作经历
│   ├── EducationBackground.vue # 教育背景
│   ├── AdditionalValue.vue  # 附加价值
│   ├── ThemeToggle.vue     # 主题切换组件
│   └── GitHubButton.vue    # GitHub 按钮组件
├── composables/         # 组合式函数
│   ├── useResumeData.ts   # 简历数据解析和管理
│   └── useTheme.ts        # 主题状态管理
├── types/               # TypeScript 类型定义
│   └── types.ts           # 完整的简历数据类型
├── config/             # 配置文件
│   └── basic-info-fields.ts # 基本信息字段配置
├── utils/              # 工具函数
│   ├── basic-info-parser.ts # 基本信息解析
│   └── emoji-parser.ts    # emoji 解析工具
├── styles/             # 样式系统
│   ├── main.css          # 主样式文件
│   ├── theme/
│   │   └── tokens.css     # CSS 设计令牌（色彩、间距、圆角等）
│   └── base/              # 基础样式
├── App.vue             # 根组件
└── main.ts             # 应用入口
```

### 样式系统架构

1. **设计令牌**: `src/styles/theme/tokens.css` 定义完整的设计变量系统
2. **UnoCSS**: 原子化 CSS，使用 Wind3 预设和自定义快捷方式
3. **组件样式**: 模块化 CSS 文件组织，支持主题切换
4. **响应式设计**: 移动端适配和断点系统

### 架构模式

1. **Markdown 驱动**: README.md 作为数据源，支持实时更新
2. **组合式函数**: 使用 composables 实现逻辑复用和状态管理
3. **组件化**: 高度模块化的 Vue 组件，Props 传递数据
4. **类型安全**: 完整的 TypeScript 接口定义和验证
5. **主题系统**: 支持亮色/暗色模式切换

### 关键配置文件

- `vite.config.ts`: Vite 构建配置，UnoCSS 插件，路径别名
- `tsconfig.json`: TypeScript 项目引用分离配置（app/node）
- `eslint.config.ts`: Vue + TypeScript 扁平配置
- `uno.config.ts`: UnoCSS 配置，Wind3 预设 + 自定义规则
- `vitest.config.ts`: 测试配置，JSDOM 环境
- `.vscode/extensions.json`: VS Code 插件推荐

## 开发注意事项

1. **数据修改**: 简历内容应在项目根目录的 README.md 中修改
2. **组件开发**: 使用 Composition API 和 `<script setup>` 语法
3. **样式开发**: 优先使用 UnoCSS 类和 CSS 设计令牌
4. **类型安全**: 严格遵循 TypeScript 类型定义
5. **代码规范**: 提交前运行 `pnpm lint` 和 `pnpm type-check`
6. **字段配置**: 新增字段需在 `src/config/basic-info-fields.ts` 中配置

## 组件特性

### 交互体验

- **工作经历**: 抽屉式展开/收起动画，支持多个工作经历同时展开
- **项目经历**: 可展开卡片设计，支持高度自适应和平滑过渡动画
- **主题切换**: 亮色/暗色模式无缝切换，使用 CSS 变量系统
- **响应式设计**: 移动端适配，断点系统和弹性布局

### 动画系统

- **@vueuse/motion**: 提供滚动触发动画，支持延迟和弹性效果
- **CSS Transitions**: 组件状态切换的平滑过渡
- **GSAP 集成**: 复杂动画序列的支持

## 技术特点

- 现代化的 Vue 3 + Vite + TypeScript + UnoCSS 技术栈
- Markdown 驱动的内容管理，支持实时更新
- 完整的设计令牌系统和主题切换
- 高度模块化的组件架构和组合式函数
- 完善的工程化配置（ESLint、Prettier、Vitest）
- 动态字段配置和数据验证机制
- 丰富的交互动画和用户体验优化
