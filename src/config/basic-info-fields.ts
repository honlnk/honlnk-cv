/**
 * 基本信息字段配置
 * 定义简历中支持的基本信息字段类型、图标和验证规则
 * 图标使用 UnoCSS presetIcons 类名（i-lucide:* / i-simple-icons:*），
 * 在模板中通过 :class 绑定；图标类名以字面量出现在本文件中，会被 UnoCSS 扫描到
 */

import type { BasicInfoField } from '@/types/types'

/** 基本信息字段配置 */
export const BASIC_INFO_FIELDS: BasicInfoField[] = [
  // 个人信息
  {
    key: 'name',
    label: '姓名',
    icon: 'i-lucide:user',
    required: true,
    group: 'personal',
  },
  {
    key: 'age',
    label: '年龄',
    icon: 'i-lucide:cake',
    group: 'personal',
  },
  {
    key: 'position',
    label: '职位',
    icon: 'i-lucide:briefcase',
    required: true,
    group: 'professional',
  },
  {
    key: 'experience',
    label: '工作经验',
    icon: 'i-lucide:history',
    group: 'professional',
  },
  {
    key: 'education',
    label: '学历',
    icon: 'i-lucide:graduation-cap',
    group: 'professional',
  },

  // 联系方式
  {
    key: 'phone',
    label: '手机号',
    icon: 'i-lucide:smartphone',
    group: 'contact',
    validation: {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入有效的手机号',
    },
  },
  {
    key: 'email',
    label: '邮箱',
    icon: 'i-lucide:mail',
    group: 'contact',
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '请输入有效的邮箱地址',
    },
  },
  {
    key: 'wechat',
    label: '微信号',
    icon: 'i-lucide:message-circle',
    group: 'contact',
  },

  // 位置信息
  {
    key: 'location',
    label: '期望城市',
    icon: 'i-lucide:map-pin',
    group: 'location',
  },
  {
    key: 'salary',
    label: '期望薪资',
    icon: 'i-lucide:banknote',
    group: 'location',
  },

  // 在线平台
  {
    key: 'website',
    label: '个人网站',
    icon: 'i-lucide:globe',
    group: 'online',
  },
  {
    key: 'github',
    label: 'GitHub',
    icon: 'i-lucide:github',
    group: 'online',
  },
  {
    key: 'gitee',
    label: 'Gitee',
    icon: 'i-simple-icons:gitee',
    group: 'online',
  },
  {
    key: 'blog',
    label: '技术博客',
    icon: 'i-lucide:rss',
    group: 'online',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: 'i-lucide:linkedin',
    group: 'online',
  },

  // 其他信息
  {
    key: 'status',
    label: '求职状态',
    icon: 'i-lucide:rocket',
    group: 'other',
  },
  {
    key: 'other',
    label: '其他',
    icon: 'i-lucide:pin',
    group: 'other',
  },
]

/** 获取字段配置 */
export function getFieldConfig(key: string): BasicInfoField | null {
  return BASIC_INFO_FIELDS.find(field => field.key === key) || null
}

/** 获取字段图标（UnoCSS 图标类名） */
export function getFieldIcon(key: string): string {
  const field = getFieldConfig(key)
  return field?.icon || 'i-lucide:pin'
}

/** 按分组获取字段 */
export function getFieldsByGroup(group?: string): BasicInfoField[] {
  return group ? BASIC_INFO_FIELDS.filter(field => field.group === group) : BASIC_INFO_FIELDS
}

/** 验证字段值 */
export function validateFieldValue(
  key: string,
  value: string
): { valid: boolean; message?: string } {
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
