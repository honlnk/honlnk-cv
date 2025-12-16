/**
 * 基本信息字段配置
 * 定义简历中支持的基本信息字段类型、图标和验证规则
 */

export interface BasicInfoField {
  /** 字段标识符 */
  key: string
  /** 显示名称 */
  label: string
  /** 图标（内置，用户不需要在README中写emoji） */
  icon: string
  /** 是否必填字段 */
  required?: boolean
  /** 字段类型，用于验证和格式化 */
  type: 'text' | 'url' | 'email' | 'phone' | 'number' | 'date'
  /** 字段分组，用于显示组织 */
  group?: 'personal' | 'contact' | 'professional' | 'location' | 'online' | 'other'
  /** 排序权重，数字越小越靠前 */
  order?: number
  /** 字段描述/占位符 */
  placeholder?: string
  /** 验证规则 */
  validation?: {
    pattern?: RegExp
    minLength?: number
    maxLength?: number
    message?: string
  }
}

/** 基本信息字段配置 */
export const BASIC_INFO_FIELDS: BasicInfoField[] = [
  // 个人信息
  {
    key: 'name',
    label: '姓名',
    icon: '👤',
    required: true,
    type: 'text',
    group: 'personal',
    order: 1,
    placeholder: '张三'
  },
  {
    key: 'age',
    label: '年龄',
    icon: '🎂',
    type: 'number',
    group: 'personal',
    order: 2,
    placeholder: '25'
  },
  {
    key: 'position',
    label: '职位',
    icon: '💼',
    required: true,
    type: 'text',
    group: 'professional',
    order: 1,
    placeholder: '前端开发工程师'
  },
  {
    key: 'experience',
    label: '工作经验',
    icon: '💪',
    type: 'text',
    group: 'professional',
    order: 2,
    placeholder: '3年'
  },
  {
    key: 'education',
    label: '学历',
    icon: '🎓',
    type: 'text',
    group: 'professional',
    order: 3,
    placeholder: '本科'
  },

  // 联系方式
  {
    key: 'phone',
    label: '手机号',
    icon: '📱',
    type: 'phone',
    group: 'contact',
    order: 1,
    placeholder: '13800138000',
    validation: {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入有效的手机号'
    }
  },
  {
    key: 'email',
    label: '邮箱',
    icon: '✉️',
    type: 'email',
    group: 'contact',
    order: 2,
    placeholder: 'example@email.com',
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '请输入有效的邮箱地址'
    }
  },
  {
    key: 'wechat',
    label: '微信号',
    icon: '💬',
    type: 'text',
    group: 'contact',
    order: 3,
    placeholder: 'wechat_id'
  },

  // 位置信息
  {
    key: 'location',
    label: '期望城市',
    icon: '📍',
    type: 'text',
    group: 'location',
    order: 1,
    placeholder: '北京'
  },
  {
    key: 'salary',
    label: '期望薪资',
    icon: '💰',
    type: 'text',
    group: 'location',
    order: 2,
    placeholder: '15-25K'
  },

  // 在线平台
  {
    key: 'website',
    label: '个人网站',
    icon: '🌐',
    type: 'url',
    group: 'online',
    order: 1,
    placeholder: 'https://example.com'
  },
  {
    key: 'github',
    label: 'GitHub',
    icon: '🐙',
    type: 'url',
    group: 'online',
    order: 2,
    placeholder: 'https://github.com/username'
  },
  {
    key: 'gitee',
    label: 'Gitee',
    icon: '🐱',
    type: 'url',
    group: 'online',
    order: 3,
    placeholder: 'https://gitee.com/username'
  },
  {
    key: 'blog',
    label: '技术博客',
    icon: '📝',
    type: 'url',
    group: 'online',
    order: 4,
    placeholder: 'https://blog.example.com'
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: '💼',
    type: 'url',
    group: 'online',
    order: 5,
    placeholder: 'https://linkedin.com/in/username'
  },

  // 其他信息
  {
    key: 'status',
    label: '求职状态',
    icon: '🚀',
    type: 'text',
    group: 'other',
    order: 1,
    placeholder: '在职-考虑机会'
  },
  {
    key: 'other',
    label: '其他',
    icon: '📌',
    type: 'text',
    group: 'other',
    order: 999,
    placeholder: '其他自定义信息'
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
  const fields = group
    ? BASIC_INFO_FIELDS.filter(field => field.group === group)
    : BASIC_INFO_FIELDS

  return fields.sort((a, b) => (a.order || 999) - (b.order || 999))
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