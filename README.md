# 鸿影 | AI Agent 开发工程师

## 基本信息

<!--
基本信息部分支持的字段：
个人信息: 姓名、年龄、性别、生日
职业信息: 职位、工作经验、学历、专业
联系方式: 手机、邮箱、微信、QQ
位置信息: 期望城市、期望薪资
在线平台: 网站、GitHub、Gitee、技术博客、LinkedIn
其他信息: 求职状态、其他

格式：- **字段名**: 内容
示例：- **姓名**: 张三
-->

- **姓名**: 鸿影（Honlnk）
- **年龄**: 22岁
- **职位**: AI Agent 开发工程师（智能体 / MCP 方向）
- **期望薪资**: 13-16K（具体可面议）
- **学历**: 山东商业职业技术大学
- **期望城市**: 北京
- **工作经验**: 1.5年
- **求职状态**: 离职-随时到岗
- **手机**: 19563491369
- **微信**: q3251099516
- **邮箱**: honlnk@qq.com
- **网站**: https://www.honlnk.com
- **GitHub**: https://github.com/honlnk

## 核心优势

### 智能体与 Harness 工程

- 研读 DeepSeek Harness 的实现并逐项落地到自有项目：Agent Loop、Tool Use、Memory、RAG、渐进式披露（progressive disclosure）
- 自研生产级 MCP Server ×2（联网搜索 linkseek、视觉识别 picsense），覆盖 stdio 与 Streamable HTTP 传输，日常自用并在线运行
- Prompt / Context / Harness Engineering 与 LLM API 工程实战：滚动摘要防记忆漂移、长上下文压缩组装；SSE 流式解析、中断与超时治理，OpenAI / Anthropic / Gemini 多协议适配

### AI 协作开发

- 一人 + AI 协作产出约 20 万行可维护代码：契约文档先行、ADR 决策留档、100+ 测试文件与 CI 全绿门禁，AI 产出可审计可回溯
- 前端出身，在 AI 辅助下进入传统行业实现互联网赋能：独立交付企业平台 Java 后端 / 管理端 / 前台 / 部署全链路（已上线）

### Agent 产品高强度用户

- 代码类 / 通用类 Agent 深度融入日常工作流，多 Agent 并行施工是常态；对模型行为有品味与判断力，对开发者体验有强感知
- 把使用体感做成产品：dsh-input-assist、NovAI、MD Opener 均源于自己作为重度用户的真实痛点

### 开源贡献与全栈交付

- 开源社区深度参与：GitHub 38 个公开仓库、4 个 npm 包与 Docker 镜像发布；dsh 官方讨论区双语发布帖，收录 PR 均合并
- 小团队快速迭代：2026.04 至今 7 个项目从 0 做到上线并有真实用户，同一套核心代码交付纯浏览器 / CLI / Docker / 桌面端四种形态

## 项目经历

### dsh-input-assist — DeepSeek Harness 输入助手插件

**角色**: 独立开发 | **时间**: 2026.08 - 至今

**链接**: [GitHub](https://github.com/honlnk/dsh-input-assist) | [官网 / 演示](https://honlnk.github.io/dsh-input-assist/)

- **定位**: 探索一个尚无成熟参照的开放问题——如何让 AI 在用户打字过程中帮上忙而不打断思路（Claude Code / Codex / Cursor 均未做输入框内辅助）：为 dsh（DeepSeek Harness）Web UI 做的输入助手插件，Copilot 式流式补全 + 中英错别字检查，dsh 生态首个输入框增强实现
- 实现：ghost text 流式补全（FIM + SSE 逐字渐显、中文按词采纳、在途请求取消）+ 错别字双层检测（本地词典即时标红 + LLM 上下文校对，红字波浪线逐条修正、绝不全量替换）
- 交付与验证：双名 npm 发布（OIDC 免 token）、跨 dsh 0.1.1 → 0.1.5 三个大版本适配；awesome / deepseek1024 收录 PR 均已合并，月下载 3,100+
- **探索中**: 交互形态已立，「好用」未达成——瓶颈不在交互而在上下文：模型只看得到输入框里的只言片语，不理解对话上文与用户真实意图，补全与纠错的质量还不够像样。正在实验上下文注入与触发时机的方案，尚无满意答案；同一实现已内置进 NovAI（见下文），正在真实小说创作中检验它能带来多少实际帮助

**技术栈**: TypeScript | DeepSeek FIM | SSE | dsh 插件体系（cordis）| tsdown

### NovAI — 长篇小说 AI 创作工作台（文件 Agent + RAG）

**角色**: 独立开发 | **时间**: 2026.04 - 至今

**链接**: [GitHub](https://github.com/honlnk/NovAI) | [在线体验](https://novai.honlnk.com)

- **定位**: 为长篇创作原生设计的 Agent 工作台——主流 AI 写作产品仍停留在「续写」级别，而想要 agentic 体验的作者只能借用为代码设计的编程 Agent
- **形态**: NovAI 把 Agent Loop 带进纯浏览器：零安装、本地文件夹即小说项目，Agent 直接读写章节文件，验证「文件 + RAG」替代聊天记忆，聊天只是控制面板
- **工具系统与安全执行**: 不赋 shell 能力——Agent 只能经结构化文件工具读写项目内文件，路径防逃逸、删除只进回收站，破坏面架构性收敛在用户授权的单个文件夹内；联网搜索工具接入自托管 linkseek，Agent 可自主查证写作资料
- **设定资产积累（与编程 Agent 的本质差异）**: 代码可 grep，但「人物性格」「伏笔走向」无文本可匹配——长篇的上下文必须沉淀为资产：LLM 从章节抽取六类要素入结构化 Markdown 库，向量索引只索引要素而非正文以控噪声，Agent 自主决定何时 RagSearch 召回而非每轮全量注入

**技术栈**: TypeScript | Vue 3 | Orama | File System Access API | Agent Loop

### gpt-image-studio — AI 图片创作工作台（旗舰项目|已结项）

**角色**: 独立开发（产品 / 架构 / 实现） | **时间**: 2026.05 - 2026.09

**链接**: [GitHub](https://github.com/honlnk/gpt-image-studio) | [在线体验](https://image.honlnk.com)

- **定位**: 一套核心代码交付四种形态——纯浏览器 / 本地 CLI（npm 已发布）/ Docker 服务端 / macOS 桌面端（Tauri）；另有 qiankun 微前端嵌入形态，已在企业生产管理台落地
- **规模实证**: 从 0 到上线独立维护的完整产品——443 次提交、5.6 万行 TypeScript / Vue、95 个测试文件，CI 门禁（typecheck + test + build）全程全绿
- **真实用户**: npm 累计下载 5,500+、Docker 镜像拉取 470+、GitHub 23★；桌面端三平台 CI 构建发布 + 免签名分发（curl|sh 一键安装）
- **产品能力**: 聊天式创作 + partial_image 渐进预览、浏览器内遮罩编辑、四档提示词模式 + 防改写、图片库批量管理与 ZIP 备份（密钥永不入备份）
- **结项**: 同类成熟产品众多、差异化空间有限，验证目标达成后主动结项转入维护，精力转向 dsh-input-assist 与 NovAI

**技术栈**: TypeScript | Vue 3 | Pinia | Vite | Fastify | SQLite | Tauri | Qiankun | Docker

### 更多开源项目

- **duet** — 多智能体自主对话聊天室：给几个 AI 话题与身份让它们自己聊，独立记忆 + 滚动摘要防漂移 + 双层成本控制。[GitHub](https://github.com/honlnk/duet) · [在线体验](https://duet.honlnk.com)
- **linkseek** — 自托管 MCP 联网搜索服务：为 AI 工具提供联网搜索与网页抓取，SSRF 三层防线 + 用量统计管理后台，日常自用运营中。[GitHub](https://github.com/honlnk/linkseek) · [在线体验](https://linkseek.honlnk.com)
- **picsense** — 视觉识别 MCP Server：给纯文本模型「装眼睛」，图片 / 视频抽帧 / 文档插图识别，支持会话内多轮追问细节。[GitHub](https://github.com/honlnk/picsense) · [在线体验](https://picsense.honlnk.com) · [npm](https://www.npmjs.com/package/@honlnk/picsense)
- **zcode-prompt-sanitizer** — prompt 清洗反向代理：从真实 Bug 做成的通用工具，请求体改写 + SSE 逐块透传，npm / Docker / 可编程 API 三种交付。[GitHub](https://github.com/honlnk/zcode-prompt-sanitizer) · [在线体验](https://sanitize.honlnk.com) · [npm](https://www.npmjs.com/package/@honlnk/zcode-prompt-sanitizer)
- **MD Opener** — 零联网权限的移动端 Markdown 查看器：系统级 .md 文件关联、GB18030 编码回退（中文老文件不乱码）、导出 PDF；Android / iOS 双端单仓库，共享同一套渲染资产。[GitHub](https://github.com/honlnk/MDOpener) · [官网](https://mdopener.honlnk.com)

## 工作经历

### 山东易宏达照明电器有限公司

**职位**: 全栈开发工程师（独立负责平台） | **时间**: 2026.03 - 2026.08

#### 数字化平台（激光灯素材网 · 企业门户 · 灯具商城）

**角色**: 独立设计与开发 | **时间**: 2026.03 - 2026.08

- 传统照明企业（景区亮化行业）的数字化平台，一人负责全链路：后端 API（Java / RuoYi-Vue-Plus）、管理端（Vben）、前台站点（Nuxt 3 SSR）、部署与发布工程
- 激光灯素材网、企业门户、灯具商城均已交付上线——商城打通素材 / 订单 / 支付 / 下载授权的交易闭环
- 设计三层 Git 子模块拓扑（根仓库 → 框架仓库 → 业务仓库，共 9 仓库）：业务与开源基座彻底分层，上游框架可同步、业务可整体迁移，提交前守卫保证不改基座源码
- 建立 tag 驱动发布流程：release tag 锚定版本、流水线构建直达生产、按版本参数回滚；云效 Flow + 阿里云 ACR / OSS / CDN
- 架构升级「方案 - 决策记录 - Runbook」三层文档先行：10 项编号决策留档、7 阶段执行手册逐步骤含验收标准与回滚方法

**技术栈**: Spring Boot 3 | RuoYi-Vue-Plus | Vben Admin | Nuxt 3 | MySQL | Redis | Docker | 云效 | 阿里云

### 山东麦田科技有限公司

**职位**: 前端开发工程师 | **时间**: 2025.03 - 2026.03

#### 主要成就

- 企业级前端项目群（教学资源平台 / AI 智能笔记 / 文件管理系统）核心开发：AI 对话界面与 SSE 流式、Qiankun 微前端集成 3D 编辑器、独立 Markdown 渲染器子应用，pnpm monorepo 管理 8 个子应用

## 教育背景

**学校**: 山东商业职业技术大学 | **专业**: 软件技术（专科） | **时间**: 2022 - 2025

- 2023 年起项目实践：首个完整项目「志愿之舟·高考志愿填报系统」（3 人团队，前端核心）获国家级奖项 1 项、省级奖项多项
- 云计算实训中心学生负责人（1.5 年）；创建 200+ 人技术社群，组织技术分享 15 次
- 在校独立开发「逐雁排程·智能排班系统」并上线运营 1 年，服务 300+ 用户

## 附加价值

### 🚀 开源产出与在线运行

- [GitHub 38 个公开仓库](https://github.com/honlnk)，本人项目代码约 20 万行；4 个 npm 包与 Docker 镜像公开发布
- 多个项目在线运行：[image.honlnk.com](https://image.honlnk.com)、[novai.honlnk.com](https://novai.honlnk.com)、[linkseek.honlnk.com](https://linkseek.honlnk.com)、[duet.honlnk.com](https://duet.honlnk.com)、[picsense.honlnk.com](https://picsense.honlnk.com)、[sanitize.honlnk.com](https://sanitize.honlnk.com)、[mdopener.honlnk.com](https://mdopener.honlnk.com)，个人门户 [honlnk.com](https://www.honlnk.com)
- 2026 年 4 月至今高强度开源输出：7 个主力项目均在此期间从 0 做到上线

### 🛠️ 工程习惯

- 决策留档：ADR、逐 PR 演进记录、「方案 - 决策记录 - Runbook」方法论，定期自我评审
- AI 协作方法论：契约文档先行 + 测试兜底 + CI 门禁——目标是让 AI 产出的代码可审计、可回溯
