# AGENTS.md

面向在此仓库工作的 AI 编码助手的项目指引。更详细的架构说明可参考 `CLAUDE.md`（内容与项目实际一致）。

## 项目概述

个人简历在线展示系统：Vue 3 + TypeScript + Vite + UnoCSS + SCSS。核心特色是 **Markdown 驱动**——根目录 README.md 是简历数据的唯一来源，构建时通过 `import readmeContent from 'README.md?raw'` 静态导入，解析后渲染为简历页面。

## 常用命令

包管理器固定用 pnpm（`pnpm@10.21.0`，CI 安装用 `--frozen-lockfile`）。

```bash
pnpm dev          # 开发服务器，固定端口 8976（strictPort，被占用直接报错）
pnpm build        # 类型检查 + 构建，提交前必须通过
pnpm build-only   # 仅构建，跳过类型检查
pnpm type-check   # vue-tsc 类型检查
pnpm lint         # ESLint 检查并自动修复
pnpm format       # Prettier 格式化
```

仓库当前没有测试用例（vitest 已安装但无 test script），验收依赖 type-check + build。

## 核心架构：Markdown 驱动数据流

README.md → `src/composables/useResumeData.ts`（解析）→ Vue 组件（渲染）

- **简历内容一律改 README.md**，不要把内容硬编码进 Vue 组件。基本信息格式为 `- **字段名**: 内容`，其他章节参考 README.md 现有格式。
- 解析管道：`src/utils/basic-info-parser.ts` → `emoji-parser.ts`（仅从标题提取 emoji 做图标映射，不渲染 emoji 本身）→ `markdown-renderer.ts`（marked + dompurify，含中英文自动空格）。
- 新增基本信息字段：先在 `src/config/basic-info-fields.ts` 添加字段配置（key / label / icon / group / validation），再在 README.md「基本信息」章节添加内容，解析器会自动识别。
- 类型集中定义在 `src/types/types.ts`，组件 Props 必须显式类型，避免 `any`。

### 目录速览

- `src/components/` — 各章节组件：Header、CoreAdvantages、WorkExperience、ProjectExperience、EducationBackground、AdditionalValue、BaseProjectCard 等
- `src/composables/` — `useResumeData`（简历数据）、`useTheme`（亮/暗/自动主题）
- `src/config/basic-info-fields.ts` — 基本信息字段配置
- `src/utils/` — 解析器链
- `src/styles/` — SCSS 分层：`theme/_tokens.scss`（设计令牌）、`base/`、`components/`
- `docs/` — Obsidian 设计笔记；改样式系统前先读 `docs/颜色主题与样式系统.md`

路径别名：`@` → `./src`。

## 编码与样式规范

组件使用 `<script setup>` + Composition API。

样式分工：**简单样式（布局、间距、定位）用 UnoCSS 工具类写在模板里，复杂样式写 SCSS**。

- 设计令牌只在 `src/styles/theme/_tokens.scss` 定义，暗色变量加入 `theme-dark` mixin；颜色通过 CSS 变量 + `data-theme` 属性切换（light / dark / auto）。
- 正文配色只用灰阶；全站单一强调色（青绿）仅用于链接、hover、章节编号、角色徽章、行内代码。
- 图标一律用 UnoCSS presetIcons：`i-lucide:*`（UI 图标）、`i-simple-icons:*`（品牌 logo），不使用 emoji。图标类名若写在 TS 文件中，依赖 `uno.config.ts` 的 `content.pipeline.include` 扫描 `.ts` 生成，新增后需确认能被扫到。
- 动效只用 150–300ms CSS Transitions 做交互反馈（hover、按压），不加滚动入场动画。
- 所有改动需在亮色和暗色两种主题下都可读。

格式化遵循 `.prettierrc.json`：无分号、单引号、2 空格缩进、printWidth 100、LF。

## Git 与部署

- 提交信息格式：gitmoji + type(scope): 中文描述，如 `✨ feat(resume): ...`、`📝 docs(README): ...`。
- GitHub remote 使用 SSH，不要改成 HTTPS。
- 推送 `master` 触发 `.github/workflows/deploy.yml` 自动部署 GitHub Pages（Node 22 + pnpm，type-check 和 build 全通过才出包）；PR 仅构建预览，不部署。
