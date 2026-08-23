# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个个人简历在线展示系统，采用 Vue 3 + TypeScript + Vite + UnoCSS 技术栈开发。项目核心特色是 **Markdown 驱动** 的内容管理方式，以 README.md 作为简历数据的单一来源，支持实时更新和 CI/CD 自动化部署。

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

### 核心设计模式：Markdown 驱动的数据流

**数据源**: README.md → **解析层**: `useResumeData.ts` → **组件层**: Vue 组件

1. **README.md 作为单一数据源**: 所有简历内容（工作经历、项目经验、教育背景等）都在根目录 README.md 中维护
2. **静态导入 + Vite 处理**: 使用 `import readmeContent from '../../README.md?raw'` 在构建时静态导入，无需运行时请求
3. **解析器链**: `basic-info-parser.ts` → `emoji-parser.ts`（仅从 README 标题提取 emoji 供图标映射，不再渲染 emoji 本身）→ `markdown-renderer.ts`（含中英文自动空格）组成解析管道
4. **类型安全**: 完整的 TypeScript 类型定义（`src/types/types.ts`）确保数据结构的类型安全

### 技术栈特点

- **前端框架**: Vue 3.5.13 + Composition API + `<script setup>` 语法
- **构建工具**: Vite 6.0.11，支持 HMR 和快速冷启动
- **样式系统**:
  - **UnoCSS（twcss 工具类）**: 原子化 CSS，Wind3 预设，负责模板内的简单样式（布局、间距、定位等），主题色映射到 CSS 设计令牌
  - **SCSS**: 负责复杂样式，`src/styles/` 目录分层组织（设计令牌 + mixins + 基础样式 + 组件样式）
  - **CSS Design Tokens**: `src/styles/theme/_tokens.scss` 定义完整的设计变量系统，暗色模式变量通过 SCSS mixin 复用
  - **主题切换**: 支持亮色/暗色模式，使用 CSS 变量和 `data-theme` 属性
- **动画系统**: 克制的 CSS Transitions 反馈动效（hover、按压），无滚动入场动画
- **图标系统**: UnoCSS presetIcons 纯 CSS 图标（Lucide UI 图标 + Simple Icons 品牌 logo），不使用 emoji
- **类型系统**: TypeScript 5.7.3，采用项目引用分离配置（app/node）

### 关键配置文件

- `vite.config.ts`: UnoCSS 插件、Vue 插件、路径别名（`@` → `./src`）
- `uno.config.ts`: Wind3 预设 + Icons 预设 + 主题色映射；`content.pipeline.include` 显式包含 `.ts` 文件（图标类名集中在 TS 配置中）
- `tsconfig.json`: 项目引用分离（`tsconfig.app.json` + `tsconfig.node.json`）
- `eslint.config.ts`: Vue + TypeScript 扁平配置
- `vitest.config.ts`: 测试配置，JSDOM 环境
- `.github/workflows/deploy.yml`: CI/CD 自动化部署到 GitHub Pages

## 数据流架构

### 1. 基本信息字段配置系统

**配置文件**: `src/config/basic-info-fields.ts`

- 定义了支持的所有个人信息字段（姓名、职位、联系方式等）
- 每个字段包含：`key`（标识符）、`label`（显示名）、`icon`（图标）、`group`（分组）、`validation`（验证规则）
- 支持动态字段扩展，新增字段只需在此配置文件中添加

**解析器**: `src/utils/basic-info-parser.ts`

- 从 README.md 的"基本信息"章节提取字段
- 支持格式：`- **字段名**: 内容`
- 自动验证字段值的合法性（如手机号格式、邮箱格式）
- 返回类型安全的 `ParsedBasicInfo` 对象

### 2. Markdown 渲染引擎

**核心文件**: `src/utils/markdown-renderer.ts`

- 使用 `marked` 库解析 Markdown 语法
- 集成 `dompurify` 进行 XSS 防护
- 支持粗体、斜体、代码、链接等常见语法
- 自定义渲染规则以适配简历展示需求

### 3. 组合式函数（Composables）

**`useResumeData.ts`**: 简历数据管理

- `loadResumeData()`: 加载并解析 README.md
- `parseResumeFromMarkdown()`: 核心解析函数，处理所有章节
- 提供响应式状态：`resumeData`、`isLoading`、`error`、`hasError`、`isEmpty`

**`useTheme.ts`**: 主题状态管理

- 支持三种模式：`light`、`dark`、`auto`（跟随系统）
- 自动检测系统主题偏好（`prefers-color-scheme`）
- LocalStorage 持久化用户偏好
- 提供 `toggleTheme()`、`setTheme()`、`getThemeIcon()` 等工具函数

## 组件架构

### 组件树结构

```
App.vue (根组件)
├── GitHubButton.vue (GitHub 仓库链接)
├── ThemeToggle.vue (主题切换)
├── Header.vue (个人信息展示)
│   └── 使用 basic-info-fields.ts 配置动态渲染字段
├── CoreAdvantages.vue (核心优势)
│   └── 展示多组优势类别和项目列表
├── WorkExperience.vue (工作经历)
│   └── 列表行布局，嵌套 BaseProjectCard 展示公司项目
├── ProjectExperience.vue (项目经历)
│   └── BaseProjectCard 始终展开：标题 + 时间 + 亮点 + 技术栈
├── EducationBackground.vue (教育背景)
│   └── 学校信息 + 校园经历列表
└── AdditionalValue.vue (附加价值)
    └── 图标 + 标题 + 内容列表
```

### 组件特性

- **工作经历/项目经历**: 编辑式列表排版（标题行 + 等宽字体时间段 + 描边角色徽章），内容始终展开
- **主题切换**: 亮色/暗色模式无缝切换，使用 CSS 变量系统
- **响应式设计**: 移动端适配，断点系统（480px, 768px）
- **动画效果**: 仅保留交互反馈（hover 变色/位移、主题过渡），时长 150–300ms

## 样式系统

### CSS 设计令牌（Design Tokens）

**文件**: `src/styles/theme/_tokens.scss`

定义了完整的设计变量系统：

- **色彩系统**: 中性灰阶 + 全站单一强调色（青绿，亮暗双主题各自取值）+ 语义色（仅状态提示）
- **排印系统**: 字体族（含中文回退）、字号、字重、行高
- **间距系统**: `--spacing-xs` 到 `--spacing-3xl`（4px - 64px）
- **动画系统**: 时长、缓动函数
- **阴影系统**: 少量表面阴影（状态框、悬浮按钮）
- **边框系统**: 宽度、圆角、hairline 细分割线
- **效果系统**: 背景环境光晕、透明度

### 主题切换实现

- **亮色模式**: `data-theme="light"`
- **暗色模式**: `data-theme="dark"`
- **自动模式**: 不设置 `data-theme`，使用 `@media (prefers-color-scheme: dark)`
- 所有颜色通过 CSS 变量定义，切换主题时只需改变变量值

### UnoCSS 主题色映射

定义在 `uno.config.ts` 中：主题色（primary/secondary/accent/warning 等）映射到 CSS 设计令牌变量，`text-primary` 等颜色工具类由 UnoCSS 生成。图标统一使用 `i-lucide:*`（UI 图标）与 `i-simple-icons:*`（品牌 logo），TS 配置文件中以字面量书写的图标类名会被 UnoCSS 扫描生成。

## CI/CD 部署

**GitHub Actions 工作流**: `.github/workflows/deploy.yml`

### 触发条件

- 推送到 `master` 分支 → 构建并部署到 GitHub Pages
- Pull Request → 仅构建预览，不部署
- 手动触发 → 构建并部署

### 部署流程

1. 检出代码
2. 设置 pnpm 和 Node.js 20
3. 安装依赖（`pnpm install --frozen-lockfile`）
4. 类型检查（`pnpm run type-check`）
5. 构建项目（`pnpm run build`）
6. 上传构建产物（`./dist` 目录）
7. 部署到 GitHub Pages

### 特点

- 并发控制：同一分支的多次推送仅保留最新部署
- 权限管理：自动配置 GITHUB_TOKEN 权限
- PR 预览：为 Pull Request 提供构建预览，但不部署

## 开发注意事项

### 修改简历内容

**重要**: 简历内容应在项目根目录的 `README.md` 中修改，而不是在 Vue 组件中。

**基本信息格式**:

```markdown
## 基本信息

- **姓名**: 张三
- **职位**: 前端开发工程师
- **手机**: 13800138000
- **邮箱**: example@email.com
```

**其他章节格式**: 参考 README.md 中的现有格式，遵循 Markdown 语法规范。

### 新增字段

1. 在 `src/config/basic-info-fields.ts` 中添加字段配置
2. 在 README.md 的"基本信息"章节添加对应内容
3. 解析器会自动识别并渲染新字段

### 组件开发规范

- 使用 `<script setup>` 语法
- 使用 Composition API 和 `defineProps`、`defineEmits`
- 优先使用 UnoCSS 类和 CSS 设计令牌
- 遵循 TypeScript 类型定义
- 动效只用 CSS Transitions 做交互反馈，不添加滚动入场动画

### 样式开发规范

样式分工约定：**简单样式用 twcss 工具类，复杂样式用 SCSS**。

- 简单样式（布局、间距、定位、字号等）直接在模板中使用 UnoCSS 工具类
- 复杂样式（章节排版、列表体系、状态组件、设计令牌驱动的多状态样式）写入 `src/styles/` 对应 SCSS 模块
- 组件私有复杂样式使用 `<style scoped lang="scss">`，善用嵌套和 `&`
- 新增设计令牌在 `src/styles/theme/_tokens.scss` 中定义，暗色模式变量加入 `theme-dark` mixin
- 正文配色只使用灰阶；强调色仅用于链接、hover、章节编号、角色徽章、行内代码
- 确保样式在亮色和暗色模式下都可读

### 类型安全

- 所有数据结构都在 `src/types/types.ts` 中定义
- 组件 Props 必须指定类型
- 避免使用 `any` 类型
- 运行 `pnpm type-check` 进行类型检查

### 代码质量

- 提交前运行 `pnpm lint` 检查代码规范
- 运行 `pnpm format` 格式化代码
- 确保类型检查通过（`pnpm type-check`）
- 构建成功（`pnpm build`）后再提交

## 项目特色

1. **Markdown 驱动**: README.md 作为数据源，支持实时更新，无需修改组件代码
2. **动态字段配置**: 灵活的基本信息字段系统，支持扩展和验证
3. **完整的主题系统**: 亮色/暗色/自动模式，完整的设计令牌系统
4. **高度模块化**: 组件化架构，组合式函数，逻辑复用性强
5. **类型安全**: 完整的 TypeScript 类型定义和验证
6. **CI/CD 自动化**: GitHub Actions 自动构建和部署
7. **编辑式排版**: 单一强调色 + hairline 分隔 + 统一 SVG 图标，克制的交互反馈动效
8. **响应式设计**: 移动端适配，多断点支持
