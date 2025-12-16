/**
 * 基本信息字段配置
 * 定义简历中支持的基本信息字段类型、图标和验证规则
 */

import type { BasicInfoField } from '@/types/types'

/** 基本信息字段配置 */
export const BASIC_INFO_FIELDS: BasicInfoField[] = [
  // 个人信息
  {
    key: 'name',
    label: '姓名',
    icon: '👤',
    required: true,
    group: 'personal'
  },
  {
    key: 'age',
    label: '年龄',
    icon: '🎂',
    group: 'personal'
  },
  {
    key: 'position',
    label: '职位',
    icon: '💼',
    required: true,
    group: 'professional'
  },
  {
    key: 'experience',
    label: '工作经验',
    icon: '💪',
    group: 'professional'
  },
  {
    key: 'education',
    label: '学历',
    icon: '🎓',
    group: 'professional'
  },

  // 联系方式
  {
    key: 'phone',
    label: '手机号',
    icon: '📱',
    group: 'contact',
    validation: {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入有效的手机号'
    }
  },
  {
    key: 'email',
    label: '邮箱',
    icon: '✉️',
    group: 'contact',
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '请输入有效的邮箱地址'
    }
  },
  {
    key: 'wechat',
    label: '微信号',
    icon: '💬',
    group: 'contact'
  },

  // 位置信息
  {
    key: 'location',
    label: '期望城市',
    icon: '📍',
    group: 'location'
  },
  {
    key: 'salary',
    label: '期望薪资',
    icon: '💰',
    group: 'location'
  },

  // 在线平台
  {
    key: 'website',
    label: '个人网站',
    icon: '🌐',
    group: 'online'
  },
  {
    key: 'github',
    label: 'GitHub',
    icon: '🐙',
    group: 'online'
  },
  {
    key: 'gitee',
    label: 'Gitee',
    icon: '🐱',
    group: 'online'
  },
  {
    key: 'blog',
    label: '技术博客',
    icon: '📝',
    group: 'online'
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: '💼',
    group: 'online'
  },

  // 其他信息
  {
    key: 'status',
    label: '求职状态',
    icon: '🚀',
    group: 'other'
  },
  {
    key: 'other',
    label: '其他',
    icon: '📌',
    group: 'other'
  }
]

/** 获取字段配置 */
export function getFieldConfig(key: string): BasicInfoField | null {
  return BASIC_INFO_FIELDS.find(field => field.key === key) || null
}

/** 获取字段图标 */
export function getFieldIcon(key: string): string {
  const field = getFieldConfig(key)
  return field?.icon || '📌'
}

/** 按分组获取字段 */
export function getFieldsByGroup(group?: string): BasicInfoField[] {
  return group
    ? BASIC_INFO_FIELDS.filter(field => field.group === group)
    : BASIC_INFO_FIELDS
}

/** 验证字段值 */
export function validateFieldValue(key: string, value: string): { valid: boolean; message?: string } {
  const field = getFieldConfig(key)
  if (!field) {
    return { valid: true }
  }

  const { validation } = field
  if (!validation) {
    return { valid: true }
  }

  if (validation.minLength && value.length < validation.minLength) {
    return { valid: false, message: validation.message || `${field.label}长度不足` }
  }

  if (validation.maxLength && value.length > validation.maxLength) {
    return { valid: false, message: validation.message || `${field.label}长度超限` }
  }

  if (validation.pattern && !validation.pattern.test(value)) {
    return { valid: false, message: validation.message || `${field.label}格式不正确` }
  }

  return { valid: true }
}