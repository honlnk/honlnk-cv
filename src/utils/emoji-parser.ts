import type { ResumeData } from '@/data/resume-data'

/**
 * Emoji 解析工具函数
 * 用于提取和处理字符串中的emoji字符
 */

/**
 * 从字符串开头提取emoji
 * @param str 输入字符串
 * @returns 包含emoji和剩余文本的对象
 */
export function extractEmojiFromStart(str: string): { emoji: string; text: string } {
  if (!str || str.trim().length === 0) {
    return { emoji: '', text: str }
  }

  // 更简单的emoji正则表达式，匹配常见emoji字符
  const baseEmojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F018}-\u{1F270}]/u

  // 更复杂的模式，支持emoji修饰符和零宽连字
  const complexEmojiPattern = '^(' + baseEmojiRegex.source + '(?:\\uFE0F|\\u200D(?:' + baseEmojiRegex.source + '))*)+'

  // 尝试匹配字符串开头的连续emoji
  const match = str.match(new RegExp(complexEmojiPattern, 'u'))

  if (match && match.index === 0) {
    const emoji = match[0]
    const text = str.substring(emoji.length).trim()
    return { emoji, text }
  }

  return { emoji: '', text: str.trim() }
}

/**
 * 检查字符串是否包含有效的emoji
 * @param str 要检查的字符串
 * @returns 是否包含有效emoji
 */
export function hasValidEmoji(str: string): boolean {
  if (!str) return false

  // 检查是否包含无效字符
  if (str.includes('�')) return false

  // 检查是否包含emoji
  const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F018}-\u{1F270}]/u
  return emojiRegex.test(str)
}

/**
 * 获取安全的emoji显示
 * @param emoji 原始emoji
 * @param fallbackEmoji fallback emoji
 * @returns 安全的emoji
 */
export function getSafeEmoji(emoji: string, fallbackEmoji: string = '⭐'): string {
  if (!emoji) return fallbackEmoji

  // 检查是否包含无效字符
  if (emoji.includes('�')) return fallbackEmoji

  // 检查是否为有效的emoji字符
  if (!hasValidEmoji(emoji)) return fallbackEmoji

  return emoji
}

/**
 * 解析标题字符串，提取开头的emoji和剩余文本
 * @param title 标题字符串
 * @returns 包含emoji和清理后标题的对象
 */
export function parseTitleWithEmoji(title: string): { emoji: string; cleanTitle: string } {
  const { emoji, text } = extractEmojiFromStart(title.trim())

  return {
    emoji: getSafeEmoji(emoji),
    cleanTitle: text
  }
}

/**
 * 联系方式emoji映射配置
 */
const CONTACT_EMOJI_MAP: Record<string, keyof ResumeData['contact']> = {
  '📱': 'phone',
  '✉': 'email',
  '📧': 'email',
  '🌐': 'website',
  '🔗': 'website',
  '🐱': 'gitee',
  '🐙': 'gitee',
  '📍': 'location',
  '💰': 'salary'
}

/**
 * 解析联系方式行，提取emoji和联系信息
 * @param line 联系方式行文本
 * @returns 包含联系方式和值的对象
 */
export function parseContactLine(line: string): { type: keyof ResumeData['contact'] | null; value: string } {
  if (!line || line.trim().length === 0) {
    return { type: null, value: '' }
  }

  const { emoji, text } = extractEmojiFromStart(line.trim())

  if (!emoji) {
    // 尝试查找行中的任何emoji
    const baseEmojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F018}-\u{1F270}]/u
    const complexEmojiPattern = '(' + baseEmojiRegex.source + '(?:\\uFE0F|\\u200D(?:' + baseEmojiRegex.source + '))*)+'
    const emojiMatch = line.match(new RegExp(complexEmojiPattern, 'u'))

    if (emojiMatch) {
      const foundEmoji = emojiMatch[0]
      const contactType = CONTACT_EMOJI_MAP[foundEmoji]
      if (contactType) {
        return {
          type: contactType,
          value: line.replace(foundEmoji, '').replace(/^[\s-:]*/, '').trim()
        }
      }
    }

    return { type: null, value: line.trim() }
  }

  const contactType = CONTACT_EMOJI_MAP[emoji]

  return {
    type: contactType || null,
    value: text
  }
}

/**
 * 检查行是否为联系方式行
 * @param line 文本行
 * @param currentSection 当前解析的章节
 * @returns 是否为联系方式行
 */
export function isContactLine(line: string, currentSection: string): boolean {
  const trimmed = line.trim()

  // 如果明确是基本信息章节，检查是否包含联系方式emoji
  if (currentSection === '基本信息') {
    const { type } = parseContactLine(trimmed)
    return type !== null
  }

  // 检查是否为列表项且包含联系方式emoji
  if (trimmed.startsWith('-') || trimmed.includes('联系方式:')) {
    const { type } = parseContactLine(trimmed)
    return type !== null
  }

  return false
}
