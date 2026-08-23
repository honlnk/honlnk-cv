/**
 * 简历数据类型定义
 */

// ============================================================================
// 主要数据类型
// ============================================================================

export interface ResumeData {
  /** 基本信息 - 支持灵活的字段结构 */
  basicInfo: {
    [key: string]: string | number
  }

  coreAdvantages: AdvantageData[]
  projects: ProjectData[]
  workExperience: WorkExperienceData[]
  education: EducationData
  additionalValues: AdditionalValueData[]
}

// ============================================================================
// 子类型定义
// ============================================================================

export interface ProjectData {
  title: string
  role?: string
  duration?: string
  highlights: ListItem[]
  techStack?: string[]
}

export interface AdvantageData {
  title: string
  items: string[]
}

export interface AdditionalValueData {
  icon: string
  title: string
  content: string[]
}

export interface ListItem {
  /** 列表项内容（纯文本或 Markdown） */
  content: string
  /** 子列表项（支持多层嵌套） */
  children?: ListItem[]
}

export interface WorkExperienceData {
  company: string
  position: string
  duration: string
  /** 项目列表 */
  projects: ProjectData[]
  /** 公司级主要成就（可选） */
  companyAchievements?: string[]
}

export interface EducationData {
  school: string
  major: string
  duration: string
  experiences: string[]
}

export interface ParsedBasicInfo {
  [key: string]: string | number
}

export interface BasicInfoField {
  /** 字段标识符 */
  key: string
  /** 显示名称 */
  label: string
  /** 图标（UnoCSS presetIcons 类名，如 i-lucide:mail；用户不需要在 README 中写 emoji） */
  icon: string
  /** 是否必填字段 */
  required?: boolean
  /** 字段分组，用于显示组织 */
  group?: 'personal' | 'contact' | 'professional' | 'location' | 'online' | 'other'
  /** 验证规则 */
  validation?: {
    pattern?: RegExp
    minLength?: number
    maxLength?: number
    message?: string
  }
}
