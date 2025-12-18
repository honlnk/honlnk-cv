import { ref } from 'vue'
// 全局延迟
const time = 10
const activeTimers = ref<{ [key: number]: number[] }>({})
const removeTimers = ref<{ [key: number]: number[] }>({})

/**
 * 初始化模板
 * @param template 模板容器
 * @param defaultValue 参考容器
 */
export function initTemplate(
  template: string[][],
  defaultValue: DefaultValue[],
  heightDict: Record<number, number>
): void {
  // 清空模板
  template.length = 0
  defaultValue.forEach((value: DefaultValue, index: number) => {
    template.push(value.highlights.map(() => ''))
    heightDict[index] = 0
  })
}
/**
 * 显示模板
 * @param template 模板容器
 * @param defaultValue 参考容器
 * @param selectIndex 选中的索引
 *
 */
export async function showTemplate(
  template: string[][],
  defaultValue: DefaultValue[],
  selectIndex: number,
  heightElement: HTMLElement,
  heightDict: Record<number, number>
): Promise<void> {
  // 初始化模板
  template[selectIndex] = defaultValue[selectIndex].highlights.map(() => '')
  // 清空指定索引的删除定时器
  if (removeTimers.value[selectIndex] != undefined) {
    removeTimers.value[selectIndex].forEach(timer => clearTimeout(timer))
  }

  // 初始化指定索引的添加定时器
  activeTimers.value[selectIndex] = []

  // 遍历每一行
  for (const [row, line] of defaultValue[selectIndex].highlights.entries()) {
    const promiseList: Promise<void>[] = []
    // 遍历每一字符
    line.split('').forEach((char, ip) => {
      promiseList.push(
        new Promise<void>(resolve => {
          const timer = setTimeout(() => {
            // 获取显示模板同位置显示的字符串
            const text = template[selectIndex][row]
            // 追加字符
            template[selectIndex][row] = text + char
            heightDict[selectIndex] = heightElement.scrollHeight
            resolve()
          }, time * ip)
          // 存入定时器ID
          activeTimers.value[selectIndex].push(timer)
        })
      )
    })
    // 在下一次循环前,等待所有计时器完成
    await Promise.all(promiseList)
  }
}

/**
 * 隐藏模板
 * @param template 模板容器
 * @param selectIndex 选择的模板索引
 * @param delay 延迟时间后停止
 */
export async function hideTemplate(
  template: string[][],
  defaultValue: DefaultValue[],
  selectIndex: number,
  heightDict: Record<number, number>,
  delay: number = 500
): Promise<void> {
  heightDict[selectIndex] = 0
  // 获取该模板的长度
  const templateLen = template[selectIndex].length

  // 请求输入定时器
  if (activeTimers.value[selectIndex] != undefined) {
    activeTimers.value[selectIndex].forEach(timer => clearTimeout(timer))
  }
  // 清空指定索引的删除定时器
  removeTimers.value[selectIndex] = []

  // 指定时间后,清空指定索引的删除定时器,用于结束动画结束后快速停止剩余定时器
  setTimeout(() => {
    if (removeTimers.value[selectIndex] != undefined) {
      removeTimers.value[selectIndex].forEach(timer => clearTimeout(timer))
      template[selectIndex] = defaultValue[selectIndex].highlights.map(() => '')
    }
  }, delay)

  // 遍历每一行
  for (let row = 0; row < templateLen; row++) {
    const promiseList: Promise<void>[] = []

    // 获取模板最后一个元素
    const text = template[selectIndex][templateLen - 1 - row]
    if (text) {
      text.split('').forEach((char, i) => {
        promiseList.push(
          new Promise(resolve => {
            const timer = setTimeout(() => {
              template[selectIndex][templateLen - 1 - row] = text.slice(0, text.length - 1 - i)
              resolve()
            }, i * time)
            removeTimers.value[selectIndex].push(timer)
          })
        )
      })
      await Promise.all(promiseList)
    }
  }
}

interface DefaultValue {
  title: string
  highlights: string[]
}
