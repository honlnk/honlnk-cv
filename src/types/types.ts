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
