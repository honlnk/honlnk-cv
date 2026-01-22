import { marked } from 'marked'
import DOMPurify from 'dompurify'
import type { ListItem } from '@/types/types'

/**
 * 配置 marked 实例
 */
marked.setOptions({
  breaks: true, // 支持换行符
  gfm: true, // 启用 GitHub Flavored Markdown
})

/**
 * 简单的内联 Markdown 渲染函数（同步）
 * @param content - Markdown 文本内容
 * @returns 渲染后的 HTML 字符串
 */
export function renderInlineMarkdown(content: string): string {
  if (!content) return ''

  try {
    // 简单的正则替换来处理常见的 Markdown 语法
    let html = content

    // 处理粗体 **text** 和 __text__
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>')

    // 处理斜体 *text* 和 _text_
    html = html.replace(/\*(?!\*)(.*?)\*/g, '<em>$1</em>')
    html = html.replace(/_(?!_)(.*?)_/g, '<em>$1</em>')

    // 处理行内代码 `code`
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

    // 处理删除线 ~~text~~
    html = html.replace(/~~(.*?)~~/g, '<del>$1</del>')

    // 使用 DOMPurify 清理 HTML，防止 XSS 攻击
    const cleanHtml = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['strong', 'b', 'em', 'i', 'u', 's', 'del', 'ins', 'a', 'span', 'code'],
      ALLOWED_ATTR: ['href', 'title', 'target', 'class'],
      ALLOW_DATA_ATTR: false
    })

    return cleanHtml
  } catch (error) {
    console.error('内联 Markdown 渲染失败:', error)
    // 渲染失败时返回原始文本（转义 HTML）
    return content.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
}

/**
 * 渲染嵌套列表结构（支持 ListItem 类型）
 * @param items - ListItem 数组
 * @returns 渲染后的 HTML 字符串（已净化）
 */
export function renderNestedList(items: ListItem[]): string {
  if (!items || items.length === 0) return ''

  let html = '<ul class="nested-list">'

  for (const item of items) {
    html += '<li class="nested-list-item">'

    // 渲染当前项的内容（使用 renderInlineMarkdown 进行净化）
    const sanitizedContent = renderInlineMarkdown(item.content)
    html += `<span class="list-content">${sanitizedContent}</span>`

    // 递归渲染子列表
    if (item.children && item.children.length > 0) {
      html += renderNestedList(item.children)
    }

    html += '</li>'
  }

  html += '</ul>'

  // 最终净化整个 HTML 结构
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['ul', 'li', 'span', 'strong', 'b', 'em', 'i', 'code', 'a'],
    ALLOWED_ATTR: ['class', 'href', 'title', 'target'],
    ALLOW_DATA_ATTR: false
  })
}

/**
 * 完整的 Markdown 渲染函数（异步）
 * @param content - Markdown 文本内容
 * @returns 渲染后的 HTML 字符串
 */
export async function renderMarkdown(content: string): Promise<string> {
  if (!content) return ''

  try {
    // 使用 marked 解析 Markdown
    const html = await marked(content)

    // 使用 DOMPurify 清理 HTML，防止 XSS 攻击
    const cleanHtml = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'del', 'ins',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li',
        'a', 'span', 'code', 'pre',
        'blockquote', 'hr'
      ],
      ALLOWED_ATTR: ['href', 'title', 'target', 'class'],
      ALLOW_DATA_ATTR: false
    })

    return cleanHtml
  } catch (error) {
    console.error('Markdown 渲染失败:', error)
    // 渲染失败时返回原始文本（转义 HTML）
    return content.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
}

/**
 * 检查文本是否包含 Markdown 语法
 * @param content - 文本内容
 * @returns 是否包含 Markdown 语法
 */
export function hasMarkdownSyntax(content: string): boolean {
  if (!content) return false

  // 检查常见的 Markdown 语法模式
  const markdownPatterns = [
    /\*\*.*?\*\*/, // 粗体 **text**
    /\*.*?\*/, // 斜体 *text*
    /_.*?_/, // 斜体 _text_
    /`.*?`/, // 行内代码 `code`
    /\[.*?\]\(.*?\)/, // 链接 [text](url)
    /^#{1,6}\s+/m, // 标题 # Heading
    /^\s*[-*+]\s+/m, // 无序列表
    /^\s*\d+\.\s+/m, // 有序列表
  ]

  return markdownPatterns.some(pattern => pattern.test(content))
}