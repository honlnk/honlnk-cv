<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { gsap } from 'gsap'

interface Props {
  markdown: string
  speed?: number // 打字速度（毫秒/字符）
  autoStart?: boolean // 是否自动开始
  showCursor?: boolean // 是否显示光标
  showSkipButton?: boolean // 是否显示跳过按钮
  showProgress?: boolean // 是否显示进度条
  forceRestart?: boolean // 是否强制重新开始（用于重置）
}

interface Emits {
  (e: 'typing-start'): void
  (e: 'typing-complete'): void
  (e: 'typing-pause'): void
  (e: 'typing-resume'): void
}

const props = withDefaults(defineProps<Props>(), {
  speed: 30,
  autoStart: true,
  showCursor: true,
  showSkipButton: true,
  showProgress: false,
  forceRestart: false,
})

const emit = defineEmits<Emits>()

// 状态管理
const isTyping = ref(false)
const isPaused = ref(false)
const isCompleted = ref(false)
const displayedContent = ref('')
const typewriterRef = ref<HTMLElement>()
const cursorRef = ref<HTMLElement>()
const progressRef = ref<HTMLElement>()

// 进度相关
const typingProgress = ref(0) // 0-100

// 当前内容追踪
let currentMarkdown = ''

// 动画相关
let typewriterTimeline: gsap.core.Timeline | null = null
let currentCharIndex = 0
let htmlContent = ''
let plainTextChars: string[] = []

// 配置 marked 选项
marked.setOptions({
  breaks: true, // 支持换行
  gfm: true, // GitHub Flavored Markdown
})

// 将 HTML 转换为纯文本字符数组（用于打字效果）
function extractTextChars(html: string): string[] {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html

  const walkText = (node: Node): string[] => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent?.split('') || []
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element
      const tagName = element.tagName.toLowerCase()
      let chars: string[] = []

      // 处理不同的 HTML 标签
      if (tagName === 'br') {
        chars.push('\n')
      } else if (['p', 'div', 'li'].includes(tagName)) {
        // 块级元素前可能需要换行
        chars = ['\n', ...walkTextChildren(element)]
      } else if (tagName === 'li') {
        // 列表项添加 bullet
        chars = ['• ', ...walkTextChildren(element)]
      } else {
        chars = walkTextChildren(element)
      }

      return chars
    }

    return []
  }

  const walkTextChildren = (element: Element): string[] => {
    let chars: string[] = []
    element.childNodes.forEach(child => {
      chars = chars.concat(walkText(child))
    })
    return chars
  }

  return walkText(tempDiv)
}

/**
 * 清理文本字符数组，移除开头和结尾的空白字符
 */
function cleanTextChars(chars: string[]): string[] {
  if (!chars || chars.length === 0) return chars

  let startIndex = 0
  let endIndex = chars.length

  // 找到第一个非空白字符
  while (startIndex < endIndex && /\s/.test(chars[startIndex])) {
    startIndex++
  }

  // 找到最后一个非空白字符
  while (endIndex > startIndex && /\s/.test(chars[endIndex - 1])) {
    endIndex--
  }

  // 返回清理后的字符数组
  return chars.slice(startIndex, endIndex)
}

// 初始化打字机
async function initializeTypewriter() {
  if (!props.markdown) return

  try {
    // 设置当前内容
    currentMarkdown = props.markdown

    // 解析 Markdown 为 HTML
    htmlContent = await marked(props.markdown)

    // 安全处理 HTML
    let sanitizedHtml = DOMPurify.sanitize(htmlContent)

    // 清理 HTML 内容，移除开头和结尾的空白
    sanitizedHtml = sanitizedHtml.replace(/^[\s\n\r]+|[\s\n\r]+$/g, '')

    // 提取纯文本字符用于打字效果
    plainTextChars = extractTextChars(sanitizedHtml)

    // 进一步清理文本字符数组
    plainTextChars = cleanTextChars(plainTextChars)

    currentCharIndex = 0
    displayedContent.value = ''
    isCompleted.value = false
  } catch (error) {
    console.error('TypewriterMarkdown: 初始化失败', error)
    plainTextChars = []
    currentCharIndex = 0
    displayedContent.value = ''
    isCompleted.value = true
  }
}

// 开始打字
async function startTyping() {
  if (!typewriterRef.value || isTyping.value || plainTextChars.length === 0) {
    return
  }

  isTyping.value = true
  isPaused.value = false
  typingProgress.value = 0
  emit('typing-start')

  // 创建 GSAP 时间线
  typewriterTimeline = gsap.timeline()

  // 逐字符添加
  for (let i = 0; i < plainTextChars.length; i++) {
    typewriterTimeline.to({}, {
      duration: props.speed / 1000,
      onStart: () => {
        if (!isPaused.value) {
          displayedContent.value += plainTextChars[i]
          currentCharIndex++

          // 更新进度
          typingProgress.value = Math.round((currentCharIndex / plainTextChars.length) * 100)

          // 滚动到底部（如果需要）
          nextTick(() => {
            if (typewriterRef.value) {
              typewriterRef.value.scrollTop = typewriterRef.value.scrollHeight
            }
          })
        }
      },
    })
  }

  // 完成回调
  typewriterTimeline.eventCallback('onComplete', () => {
    isTyping.value = false
    isCompleted.value = true
    typingProgress.value = 100
    emit('typing-complete')
  })
}

// 暂停打字
function pauseTyping() {
  if (!typewriterTimeline || !isTyping.value) return

  isPaused.value = true
  typewriterTimeline.pause()
  emit('typing-pause')
}

// 恢复打字
function resumeTyping() {
  if (!typewriterTimeline || !isTyping.value) return

  isPaused.value = false
  typewriterTimeline.resume()
  emit('typing-resume')
}

// 跳过到结尾
function skipToEnd() {
  if (!typewriterTimeline) return

  typewriterTimeline.progress(1)
  displayedContent.value = plainTextChars.join('')
  currentCharIndex = plainTextChars.length
  isTyping.value = false
  isPaused.value = false
  isCompleted.value = true
  emit('typing-complete')
}

// 重新开始
async function restart() {
  if (typewriterTimeline) {
    typewriterTimeline.kill()
  }

  await initializeTypewriter()
  if (props.autoStart) {
    await startTyping()
  }
}

// 监听 markdown 变化
watch(() => props.markdown, async () => {
  await restart()
}, { immediate: true })

// 检查是否需要重新初始化（当markdown内容变化时）
function shouldReinitialize(newMarkdown: string): boolean {
  if (currentMarkdown !== newMarkdown) {
    currentMarkdown = newMarkdown
    return true
  }
  return props.forceRestart
}

// 暴露方法给父组件
defineExpose({
  startTyping,
  pauseTyping,
  resumeTyping,
  skipToEnd,
  restart,
  isTyping,
  isPaused,
  isCompleted,
  shouldReinitialize,
})

// 光标动画
onMounted(() => {
  if (cursorRef.value && props.showCursor) {
    gsap.to(cursorRef.value, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    })
  }
})
</script>

<template>
  <div class="typewriter-markdown">
    <!-- 进度条 -->
    <div
      v-if="showProgress && (isTyping || isPaused)"
      class="typewriter-progress mb-3"
    >
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs text-text-secondary">正在输入...</span>
        <span class="text-xs text-text-secondary">{{ typingProgress }}%</span>
      </div>
      <div class="progress-bar h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          ref="progressRef"
          class="progress-fill h-full bg-primary transition-all duration-300 ease-out"
          :style="{ width: `${typingProgress}%` }"
        ></div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div
      ref="typewriterRef"
      class="typewriter-content whitespace-pre-wrap"
      v-html="displayedContent"
    ></div>

    <!-- 打字光标 -->
    <span
      v-if="showCursor && !isCompleted"
      ref="cursorRef"
      class="typewriter-cursor text-primary"
    >|</span>

    <!-- 控制按钮 -->
    <div
      v-if="showSkipButton && (isTyping || isPaused)"
      class="typewriter-controls mt-3 flex gap-2"
    >
      <button
        v-if="isPaused"
        @click="resumeTyping"
        class="control-btn px-3 py-1 text-sm bg-secondary text-white rounded hover:bg-secondary-hover transition-colors"
      >
        继续
      </button>
      <button
        v-else-if="isTyping"
        @click="pauseTyping"
        class="control-btn px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
      >
        暂停
      </button>
      <button
        @click="skipToEnd"
        class="control-btn px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary-hover transition-colors"
      >
        跳过
      </button>
    </div>
  </div>
</template>

<style scoped>
.typewriter-markdown {
  position: relative;
}

.typewriter-content {
  line-height: 1.6;
}

.typewriter-content :deep(p:first-child) {
  margin-top: 0;
}

.typewriter-content :deep(ul:first-child),
.typewriter-content :deep(ol:first-child) {
  margin-top: 0;
}

.typewriter-content :deep(p:last-child) {
  margin-bottom: 0;
}

.typewriter-cursor {
  display: inline-block;
  font-weight: bold;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* 控制按钮样式 */
.typewriter-controls {
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.typewriter-controls:hover {
  opacity: 1;
}

.control-btn {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
}

.control-btn:focus {
  box-shadow: 0 0 0 2px rgba(var(--color-primary), 0.3);
}

/* 进度条样式 */
.typewriter-progress {
  opacity: 0.8;
}

.progress-bar {
  background-color: rgb(var(--color-gray-200));
}

.progress-fill {
  background-color: rgb(var(--color-primary));
}

/* 基础 Markdown 样式 */
.typewriter-content :deep(p) {
  margin: 0.5em 0;
}

.typewriter-content :deep(ul),
.typewriter-content :deep(ol) {
  margin: 0.5em 0;
  padding-left: 1.5em;
}

.typewriter-content :deep(li) {
  margin: 0.25em 0;
}

.typewriter-content :deep(strong) {
  font-weight: 600;
  color: rgb(var(--color-primary));
}

.typewriter-content :deep(em) {
  font-style: italic;
}

.typewriter-content :deep(code) {
  background-color: rgb(var(--color-gray-100));
  padding: 0.1em 0.3em;
  border-radius: 0.25em;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.9em;
}

.typewriter-content :deep(a) {
  color: rgb(var(--color-primary));
  text-decoration: underline;
}

.typewriter-content :deep(a:hover) {
  text-decoration: none;
}
</style>