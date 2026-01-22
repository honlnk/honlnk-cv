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
  duration: string
  role: string
  highlights: string[]
  techStack: string[]
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

export interface ProjectDetail {
  /** 项目名称 */
  title: string
  /** 项目职责列表（支持嵌套结构） */
  responsibilities: ListItem[]
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
  /** 项目列表（新的层级结构） */
  projects: ProjectDetail[]
  /** 公司级主要成就（可选） */
  companyAchievements?: string[]
  /**
   * @deprecated 使用 projects 替代
   * 保留旧字段以兼容
   */
  responsibilities?: string[]
  /**
   * @deprecated 使用 companyAchievements 或 projects[].achievements 替代
   * 保留旧字段以兼容
   */
  achievements?: string[]
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
  /** 图标（内置，用户不需要在README中写emoji） */
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
