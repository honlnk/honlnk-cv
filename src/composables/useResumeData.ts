import { ref, computed } from 'vue'
import type { ResumeData } from '@/data/resume-data'
import type { ParsedBasicInfo } from '@/utils/basic-info-parser'
import { parseTitleWithEmoji } from '@/utils/emoji-parser'
import { parseBasicInfo } from '@/utils/basic-info-parser'

// 定义项目类型
interface ProjectData {
  title: string
  role: string
  duration: string
  highlights: string[]
  techStack: string[]
}

// 定义优势类型
interface AdvantageData {
  title: string
  items: string[]
}

// 定义附加价值类型
interface AdditionalValueData {
  icon: string
  title: string
  content: string[]
}

// 定义教育背景类型
interface EducationData {
  school: string
  major: string
  duration: string
  experiences: string[]
}

export function useResumeData() {
  const resumeData = ref<ResumeData>()
  const isLoading = ref(false)
  const error = ref<string>()

  async function loadResumeData() {
    isLoading.value = true
    error.value = ''

    try {
      // 在开发环境中，我们可以使用README.md文件
      // 在生产环境中，我们可以使用静态数据或从API获取
      if (import.meta.env.DEV) {
        // 开发环境：尝试从README.md解析
        try {
          const response = await fetch('/README.md')
          const markdown = await response.text()
          resumeData.value = parseResumeFromMarkdown(markdown)
        } catch {
          console.warn('无法加载README.md，使用备用数据')
          // 退回到静态数据
          const { resumeData: staticData } = await import('@/data/resume-data')
          resumeData.value = staticData
        }
      } else {
        // 生产环境：直接使用静态数据
        const { resumeData: staticData } = await import('@/data/resume-data')
        resumeData.value = staticData
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '加载数据失败'
      console.error('加载简历数据失败:', err)
    } finally {
      isLoading.value = false
    }
  }

  function parseResumeFromMarkdown(markdown: string): ResumeData {
    const lines = markdown.split('\n')

    // 使用新的基本信息解析器
    const basicInfoSection: string[] = []
    const otherLines: string[] = []
    let inBasicInfoSection = false
    let inCommentBlock = false

    // 分离基本信息部分和其他内容
    for (const line of lines) {
      const trimmed = line.trim()

      // 处理注释块
      if (trimmed === '<!--') {
        inCommentBlock = true
        continue
      } else if (trimmed === '-->') {
        inCommentBlock = false
        continue
      }

      if (inCommentBlock) continue

      // 检测章节
      if (trimmed.startsWith('## ')) {
        if (trimmed === '## 基本信息') {
          inBasicInfoSection = true
          continue
        } else {
          inBasicInfoSection = false
        }
      }

      // 分离基本信息和其他内容
      if (inBasicInfoSection && trimmed.startsWith('- **')) {
        basicInfoSection.push(line)
      } else if (!inBasicInfoSection) {
        otherLines.push(line)
      }
    }

    // 解析基本信息
    const basicInfo = parseBasicInfo(basicInfoSection)

    // 解析其他内容
    const otherContent = otherLines.join('\n')
    const otherData = parseOtherContent(otherContent, basicInfo)

    return {
      basicInfo,
      ...otherData
    }
  }

  function parseOtherContent(markdown: string, basicInfo: ParsedBasicInfo): Omit<ResumeData, 'basicInfo'> {
    const lines = markdown.split('\n')

    const data = {
      name: String(basicInfo.name || ''),
      position: String(basicInfo.position || ''),
      contact: {
        phone: String(basicInfo.phone || ''),
        email: String(basicInfo.email || ''),
        location: String(basicInfo.location || ''),
        salary: String(basicInfo.salary || ''),
        website: String(basicInfo.website || ''),
        gitee: String(basicInfo.gitee || '')
      },
      coreAdvantages: [] as AdvantageData[],
      projects: [] as ProjectData[],
      education: {
        school: '',
        major: '',
        duration: '',
        experiences: [] as string[]
      } as EducationData,
      additionalValues: [] as AdditionalValueData[]
    }

    let currentSection = ''
    let currentAdvantage: AdvantageData | null = null
    let currentProject: ProjectData | null = null
    let currentValue: AdditionalValueData | null = null

    for (const line of lines) {
      const trimmed = line.trim()

      // 解析标题
      if (trimmed.startsWith('# ')) {
        const title = trimmed.substring(2).trim()
        const parts = title.split('|').map((p: string) => p.trim())
        data.name = String(basicInfo.name || parts[0] || '')
        data.position = String(basicInfo.position || parts[1] || '')
      }
      // 解析二级标题（章节）
      else if (trimmed.startsWith('## ')) {
        currentSection = trimmed.substring(3).trim()
      }
      // 解析三级标题
      else if (trimmed.startsWith('### ')) {
        const title = trimmed.substring(4).trim()

        if (currentSection === '核心优势') {
          if (currentAdvantage) {
            data.coreAdvantages.push(currentAdvantage)
          }
          currentAdvantage = { title, items: [] }
        } else if (currentSection === '项目经历') {
          if (currentProject) {
            data.projects.push(currentProject)
          }
          currentProject = {
            title,
            role: '',
            duration: '',
            highlights: [],
            techStack: []
          }
        } else if (currentSection === '附加价值') {
          if (currentValue) {
            data.additionalValues.push(currentValue)
          }
          // 使用通用的emoji解析函数
          const { emoji, cleanTitle } = parseTitleWithEmoji(title)
          currentValue = { icon: emoji, title: cleanTitle, content: [] }
        } else if (currentSection === '教育背景' && trimmed.startsWith('### 校园经历')) {
          // 校园经历的开始
        }
      }
      // 解析核心优势内容
      else if (currentSection === '核心优势' && trimmed.startsWith('- ') && currentAdvantage) {
        currentAdvantage.items.push(trimmed.substring(2))
      }
      // 解析项目角色和时间
      else if (currentSection === '项目经历' && trimmed.includes('**角色**:') && currentProject) {
        const roleMatch = trimmed.match(/\*\*角色\*\*:\s*(.+?)(?:\s*\|\s*|$)/)
        const timeMatch = trimmed.match(/\*\*时间\*\*:\s*(.+)/)

        if (roleMatch) currentProject.role = roleMatch[1]
        if (timeMatch) currentProject.duration = timeMatch[1]
      }
      // 解析项目亮点和技术栈
      else if (currentSection === '项目经历' && trimmed.startsWith('- ') && currentProject) {
        const content = trimmed.substring(2)

        if (content.includes('**技术栈**:')) {
          const techStackText = content.replace('**技术栈**:', '').trim()
          currentProject.techStack = techStackText.split(/[+,、，]/).map(t => t.trim())
        } else {
          currentProject.highlights.push(content)
        }
      }
      // 解析单独的技术栈行
      else if (currentSection === '项目经历' && trimmed.includes('**技术栈**:') && currentProject) {
        const techStackText = trimmed.replace('**技术栈**:', '').trim()
        currentProject.techStack = techStackText.split(/[+,、，]/).map(t => t.trim())
      }
      // 解析教育背景
      else if (currentSection === '教育背景' && trimmed.includes('**学校**:') && trimmed.includes('**专业**:') && trimmed.includes('**时间**:')) {
        const schoolMatch = trimmed.match(/\*\*学校\*\*:\s*(.+?)(?:\s*\|\s*|$)/)
        const majorMatch = trimmed.match(/\*\*专业\*\*:\s*(.+?)(?:\s*\|\s*|$)/)
        const timeMatch = trimmed.match(/\*\*时间\*\*:\s*(.+)/)

        if (schoolMatch) data.education.school = schoolMatch[1]
        if (majorMatch) data.education.major = majorMatch[1]
        if (timeMatch) data.education.duration = timeMatch[1]
      }
      // 解析校园经历
      else if (currentSection === '教育背景' && trimmed.startsWith('- ')) {
        data.education.experiences.push(trimmed.substring(2))
      }
      // 解析附加价值内容
      else if (currentSection === '附加价值' && trimmed.startsWith('- ') && currentValue) {
        currentValue.content.push(trimmed.substring(2))
      }
    }

    // 处理最后的项目
    if (currentAdvantage) {
      data.coreAdvantages.push(currentAdvantage)
    }
    if (currentProject) {
      data.projects.push(currentProject)
    }
    if (currentValue) {
      data.additionalValues.push(currentValue)
    }

    return data
  }

  const hasError = computed(() => !!error.value)
  const isEmpty = computed(() => !resumeData.value || !resumeData.value.name)

  return {
    resumeData,
    isLoading,
    error,
    hasError,
    isEmpty,
    loadResumeData
  }
}
