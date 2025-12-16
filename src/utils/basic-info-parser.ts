import type { BasicInfoField, ParsedBasicInfo } from '@/types/types'
import { getFieldConfig, getFieldsByGroup } from '@/config/basic-info-fields'

/**
 * 解析基本信息部分
 * 支持格式：- **字段名**: 内容
 */
export function parseBasicInfo(lines: string[]): ParsedBasicInfo {
  const info: ParsedBasicInfo = {}

  for (const line of lines) {
    const trimmed = line.trim()

    // 匹配格式：- **字段名**: 内容
    const match = trimmed.match(/^- \*\*([^*]+)\*\*:\s*(.*)$/)
    if (match) {
      const [, fieldName, content] = match
      const normalizedFieldName = normalizeFieldName(fieldName.trim())

      // 检查是否为支持的字段
      const fieldConfig = getFieldConfig(normalizedFieldName)
      if (fieldConfig) {
        info[normalizedFieldName] = content.trim()
      } else {
        // 未知字段归类为 "other"
        if (!info.other) info.other = ''
        info.other = info.other
          ? `${info.other}, ${fieldName}: ${content.trim()}`
          : `${fieldName}: ${content.trim()}`
      }
    }
  }

  return info
}

/**
 * 标准化字段名称
 * 将用户输入的字段名转换为标准字段标识符
 */
export function normalizeFieldName(userInput: string): string {
  const fieldNameMap: Record<string, string> = {
    // 个人信息
    姓名: 'name',
    年龄: 'age',
    性别: 'gender',
    生日: 'birthday',

    // 职业信息
    职位: 'position',
    岗位: 'position',
    工作: 'position',
    工作经验: 'experience',
    工作年限: 'experience',
    学历: 'education',
    专业: 'major',

    // 联系方式
    手机: 'phone',
    手机号: 'phone',
    电话: 'phone',
    邮箱: 'email',
    电子邮件: 'email',
    微信: 'wechat',
    微信号: 'wechat',
    qq: 'qq',

    // 位置信息
    城市: 'location',
    地址: 'location',
    期望城市: 'location',
    所在地: 'location',
    薪资: 'salary',
    期望薪资: 'salary',

    // 在线平台
    网站: 'website',
    个人网站: 'website',
    主页: 'website',
    github: 'github',
    gitee: 'gitee',
    博客: 'blog',
    技术博客: 'blog',
    blog: 'blog',
    linkedin: 'linkedin',
    领英: 'linkedin',

    // 其他信息
    状态: 'status',
    求职状态: 'status',
    其他: 'other',
    备注: 'other',
    简介: 'other',
  }

  // 直接匹配
  if (fieldNameMap[userInput]) {
    return fieldNameMap[userInput]
  }

  // 模糊匹配
  for (const [key, value] of Object.entries(fieldNameMap)) {
    if (userInput.includes(key) || key.includes(userInput)) {
      return value
    }
  }

  // 未找到匹配，返回小写的原始输入
  return userInput.toLowerCase()
}

/**
 * 获取分组后的基本信息显示数据
 */
export function getGroupedBasicInfo(info: ParsedBasicInfo): Array<{
  group: string
  fields: Array<{
    key: string
    label: string
    icon: string
    value: string | number
  }>
}> {
  const result: Array<{
    group: string
    fields: Array<{
      key: string
      label: string
      icon: string
      value: string
    }>
  }> = []

  const groups = ['personal', 'professional', 'contact', 'location', 'online', 'other']

  for (const group of groups) {
    const fieldsConfig = getFieldsByGroup(group)
    const fields = fieldsConfig
      .map(field => ({
        key: field.key,
        label: field.label,
        icon: field.icon,
        value: String(info[field.key] || ''),
      }))
      .filter(field => field.value) // 只显示有值的字段

    if (fields.length > 0) {
      result.push({ group, fields })
    }
  }

  return result
}

/**
 * 验证基本信息数据
 */
export function validateBasicInfo(info: ParsedBasicInfo): {
  valid: boolean
  errors: Array<{ field: string; message: string }>
} {
  const errors: Array<{ field: string; message: string }> = []

  // 检查必填字段
  const requiredFields = getFieldsByGroup().filter(field => field.required)
  for (const field of requiredFields) {
    if (!info[field.key] || String(info[field.key]).trim() === '') {
      errors.push({
        field: field.key,
        message: `${field.label}是必填项`,
      })
    }
  }

  // 检查字段格式
  for (const [key, value] of Object.entries(info)) {
    if (value) {
      const fieldConfig = getFieldConfig(key)
      if (fieldConfig?.validation) {
        const { valid, message } = validateFieldValueWithConfig(fieldConfig, String(value))
        if (!valid && message) {
          errors.push({
            field: key,
            message: message,
          })
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * 使用配置验证字段值
 */
function validateFieldValueWithConfig(
  field: BasicInfoField,
  value: string
): {
  valid: boolean
  message?: string
} {
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
