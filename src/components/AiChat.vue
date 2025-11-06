<template>
  <div class="ai-chat-wrapper" :class="{ 'dark-mode': isDarkMode }">
    <!-- 侧边栏 -->
    <aside class="sidebar" :class="{ 'collapsed': isSidebarCollapsed }">
      <div class="sidebar-header">
        <div class="logo">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#gradient1)"/>
            <path d="M2 17L12 22L22 17" stroke="url(#gradient1)" stroke-width="2"/>
            <path d="M2 12L12 17L22 12" stroke="url(#gradient1)" stroke-width="2"/>
            <defs>
              <linearGradient id="gradient1" x1="2" y1="2" x2="22" y2="22">
                <stop offset="0%" stop-color="#667eea"/>
                <stop offset="100%" stop-color="#764ba2"/>
              </linearGradient>
            </defs>
          </svg>
          <span v-if="!isSidebarCollapsed">AI 助手</span>
        </div>
        <button @click="toggleSidebar" class="toggle-sidebar-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      </div>

      <div v-if="!isSidebarCollapsed" class="sidebar-content">
        <button @click="startNewChat" class="new-chat-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          新对话
        </button>

        <div class="chat-history">
          <h3>对话历史</h3>
          <div class="history-list">
            <div class="history-item active">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
              当前对话
            </div>
          </div>
        </div>
      </div>

      <div class="sidebar-footer" v-if="!isSidebarCollapsed">
        <button @click="toggleDarkMode" class="theme-toggle-btn">
          <svg v-if="!isDarkMode" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
          {{ isDarkMode ? '浅色模式' : '深色模式' }}
        </button>
      </div>
    </aside>

    <!-- 主聊天区域 -->
    <div class="main-content">
      <!-- 顶部标题栏 -->
      <header class="chat-header">
        <button v-if="isSidebarCollapsed" @click="toggleSidebar" class="menu-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>
        <h1>AI 智能问答助手</h1>
        <div class="header-actions">
          <button @click="clearChat" class="icon-btn" title="清空对话">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            </svg>
          </button>
        </div>
      </header>

      <!-- 消息区域 -->
      <div class="chat-messages" ref="messagesContainer">
        <!-- 空状态 -->
        <div v-if="messages.length === 0" class="empty-state">
          <div class="empty-icon">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="url(#gradient2)" opacity="0.1"/>
              <path d="M30 45 Q50 55 70 45" stroke="url(#gradient2)" stroke-width="3" fill="none" stroke-linecap="round"/>
              <circle cx="37" cy="35" r="3" fill="url(#gradient2)"/>
              <circle cx="63" cy="35" r="3" fill="url(#gradient2)"/>
              <defs>
                <linearGradient id="gradient2" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stop-color="#667eea"/>
                  <stop offset="100%" stop-color="#764ba2"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2>你好！我是 AI 助手</h2>
          <p>我可以帮你解答问题、编写代码、创意写作等</p>

          <div class="suggestions">
            <button
              v-for="suggestion in suggestions"
              :key="suggestion"
              @click="handleSuggestion(suggestion)"
              class="suggestion-card"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              {{ suggestion }}
            </button>
          </div>
        </div>

        <!-- 消息列表 -->
        <div
          v-for="message in messages"
          :key="message.id"
          :class="['message-wrapper', `message-${message.role}`]"
        >
          <div class="message-container">
            <div class="message-avatar">
              <div class="avatar" :class="`avatar-${message.role}`">
                <span v-if="message.role === 'user'">U</span>
                <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                  <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
            </div>
            <div class="message-content">
              <div class="message-header">
                <span class="message-role">{{ message.role === 'user' ? '你' : 'AI 助手' }}</span>
                <span class="message-time">{{ formatTime(message.timestamp) }}</span>
              </div>
              <div class="message-text" v-html="renderMarkdown(message.content)"></div>
            </div>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="isLoading" class="message-wrapper message-assistant">
          <div class="message-container">
            <div class="message-avatar">
              <div class="avatar avatar-assistant">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                  <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
            </div>
            <div class="message-content">
              <div class="message-header">
                <span class="message-role">AI 助手</span>
              </div>
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="chat-input-area">
        <form @submit.prevent="handleSubmit" class="input-form">
          <div class="input-wrapper">
            <textarea
              v-model="inputMessage"
              @keydown.enter.exact.prevent="handleSubmit"
              :disabled="isLoading"
              placeholder="输入消息... (Enter 发送, Shift+Enter 换行)"
              class="message-input"
              rows="1"
              ref="inputRef"
            ></textarea>
            <div class="input-actions">
              <button
                type="submit"
                :disabled="!inputMessage.trim() || isLoading"
                class="send-button"
              >
                <svg v-if="!isLoading" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
                <div v-else class="loading-spinner"></div>
              </button>
            </div>
          </div>
        </form>
        <div class="input-footer">
          <span class="tip">AI 可能会犯错，请核实重要信息</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, onMounted } from 'vue'
import { sendChatMessage } from '../api/chat'
import type { Message } from '../types/chat'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

// Markdown 渲染器配置
const md: MarkdownIt = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  highlight: function (str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
      } catch (__) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})

// 状态管理
const messages = ref<Message[]>([])
const inputMessage = ref('')
const isLoading = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLTextAreaElement | null>(null)
const isDarkMode = ref(false)
const isSidebarCollapsed = ref(window.innerWidth < 768)

const suggestions = [
  '什么是 Vue3 Composition API？',
  '如何优化前端性能？',
  '解释一下 TypeScript 的泛型',
  '介绍一下 Vite 的优势'
]

// Markdown 渲染
const renderMarkdown = (content: string): string => {
  return md.render(content)
}

// 切换深色模式
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value ? 'true' : 'false')
}

// 切换侧边栏
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

// 开始新对话
const startNewChat = () => {
  if (messages.value.length > 0) {
    if (confirm('确定要开始新对话吗？当前对话内容将被清空。')) {
      messages.value = []
    }
  }
}

// 自动调整输入框高度
watch(inputMessage, () => {
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.style.height = 'auto'
      inputRef.value.style.height = `${Math.min(inputRef.value.scrollHeight, 200)}px`
    }
  })
})

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// 格式化时间
const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  // 小于1分钟
  if (diff < 60000) {
    return '刚刚'
  }

  // 小于1小时
  if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}分钟前`
  }

  // 今天
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // 其他日期
  return date.toLocaleDateString('zh-CN', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 处理建议点击
const handleSuggestion = (suggestion: string) => {
  inputMessage.value = suggestion
  handleSubmit()
}

// 发送消息
const handleSubmit = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return

  const userMessage: Message = {
    id: `user-${Date.now()}`,
    role: 'user',
    content: inputMessage.value.trim(),
    timestamp: Date.now()
  }

  messages.value.push(userMessage)
  const currentMessage = inputMessage.value
  inputMessage.value = ''
  isLoading.value = true

  // 重置输入框高度
  if (inputRef.value) {
    inputRef.value.style.height = 'auto'
  }

  scrollToBottom()

  try {
    const response = await sendChatMessage({
      message: currentMessage,
      history: messages.value
    })

    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: response.reply,
      timestamp: response.timestamp
    }

    messages.value.push(assistantMessage)
  } catch (error) {
    console.error('发送消息失败:', error)
    const errorMessage: Message = {
      id: `error-${Date.now()}`,
      role: 'assistant',
      content: '抱歉，发生了一些错误。请稍后重试。',
      timestamp: Date.now()
    }
    messages.value.push(errorMessage)
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

// 清空对话
const clearChat = () => {
  if (messages.value.length > 0) {
    if (confirm('确定要清空所有对话记录吗？')) {
      messages.value = []
    }
  }
}

// 初始化
onMounted(() => {
  // 恢复深色模式设置
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode === 'true') {
    isDarkMode.value = true
  }

  // 聚焦输入框
  inputRef.value?.focus()

  // 响应式侧边栏
  const handleResize = () => {
    if (window.innerWidth < 768) {
      isSidebarCollapsed.value = true
    }
  }

  window.addEventListener('resize', handleResize)

  // 清理
  return () => {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style scoped>
/* CSS 变量定义 */
:root {
  --primary-color: #667eea;
  --primary-dark: #764ba2;
  --sidebar-width: 260px;
  --sidebar-collapsed-width: 60px;
  --header-height: 60px;
}

/* 浅色模式 */
.ai-chat-wrapper {
  --bg-primary: #f9fafb;
  --bg-secondary: #ffffff;
  --bg-tertiary: #f3f4f6;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-tertiary: #9ca3af;
  --border-color: #e5e7eb;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --user-msg-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --assistant-msg-bg: #ffffff;
}

/* 深色模式 */
.ai-chat-wrapper.dark-mode {
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --bg-tertiary: #374151;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --text-tertiary: #9ca3af;
  --border-color: #374151;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
  --assistant-msg-bg: #1f2937;
}

/* 主容器 */
.ai-chat-wrapper {
  display: flex;
  height: 100vh;
  width: 100%;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* ============ 侧边栏样式 ============ */
.sidebar {
  width: var(--sidebar-width);
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
  z-index: 10;
}

.sidebar.collapsed {
  width: var(--sidebar-collapsed-width);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  height: var(--header-height);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--text-primary);
}

.logo svg {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.toggle-sidebar-btn {
  padding: 0.5rem;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-sidebar-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.sidebar.collapsed .toggle-sidebar-btn svg {
  transform: rotate(180deg);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.new-chat-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--user-msg-bg);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
  margin-bottom: 1rem;
}

.new-chat-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.chat-history h3 {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.history-item {
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.history-item:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.history-item.active {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  font-weight: 500;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid var(--border-color);
}

.theme-toggle-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.theme-toggle-btn:hover {
  background: var(--bg-primary);
}

/* ============ 主内容区域 ============ */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 顶部标题栏 */
.chat-header {
  height: var(--header-height);
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  padding: 0 2rem;
  gap: 1rem;
  box-shadow: var(--shadow-sm);
}

.menu-btn {
  padding: 0.5rem;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
}

.menu-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.chat-header h1 {
  flex: 1;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.icon-btn {
  padding: 0.5rem;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
}

.icon-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

/* ============ 消息区域 ============ */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: var(--text-tertiary);
}

/* 空状态 */
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.empty-icon {
  width: 120px;
  height: 120px;
  margin-bottom: 2rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.empty-state h2 {
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.empty-state p {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.suggestions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  max-width: 800px;
  width: 100%;
}

.suggestion-card {
  padding: 1.25rem 1.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  box-shadow: var(--shadow-sm);
}

.suggestion-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.suggestion-card svg {
  flex-shrink: 0;
  color: var(--primary-color);
  margin-top: 2px;
}

/* 消息样式 */
.message-wrapper {
  margin-bottom: 2rem;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-container {
  display: flex;
  gap: 1rem;
  max-width: 900px;
}

.message-wrapper.message-user .message-container {
  margin-left: auto;
  flex-direction: row-reverse;
}

.message-avatar {
  flex-shrink: 0;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
}

.avatar-user {
  background: var(--user-msg-bg);
  color: white;
}

.avatar-assistant {
  background: var(--bg-tertiary);
  color: var(--primary-color);
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.message-role {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-primary);
}

.message-time {
  font-size: 0.75rem;
  color: var(--text-tertiary);
}

.message-text {
  background: var(--assistant-msg-bg);
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  line-height: 1.6;
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
  word-wrap: break-word;
}

.message-user .message-text {
  background: var(--user-msg-bg);
  color: white;
}

/* Markdown 样式 */
.message-text :deep(p) {
  margin: 0.75rem 0;
}

.message-text :deep(p:first-child) {
  margin-top: 0;
}

.message-text :deep(p:last-child) {
  margin-bottom: 0;
}

.message-text :deep(code) {
  background: var(--bg-tertiary);
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
}

.message-text :deep(pre) {
  background: var(--bg-tertiary);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.message-text :deep(pre code) {
  background: none;
  padding: 0;
  font-size: 0.875rem;
}

.message-text :deep(ul),
.message-text :deep(ol) {
  margin: 0.75rem 0;
  padding-left: 1.5rem;
}

.message-text :deep(li) {
  margin: 0.25rem 0;
}

.message-text :deep(a) {
  color: var(--primary-color);
  text-decoration: none;
}

.message-text :deep(a:hover) {
  text-decoration: underline;
}

/* 打字指示器 */
.typing-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 1rem 1.25rem;
  background: var(--assistant-msg-bg);
  border-radius: 0.75rem;
  box-shadow: var(--shadow-sm);
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-tertiary);
  animation: bounce 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: 0s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.7;
  }
  30% {
    transform: translateY(-8px);
    opacity: 1;
  }
}

/* ============ 输入区域 ============ */
.chat-input-area {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: 1.5rem 2rem;
}

.input-form {
  max-width: 900px;
  margin: 0 auto;
}

.input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  background: var(--bg-primary);
  border: 1.5px solid var(--border-color);
  border-radius: 1.5rem;
  padding: 0.75rem 1rem;
  transition: all 0.2s;
}

.input-wrapper:focus-within {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.message-input {
  flex: 1;
  border: none;
  background: transparent;
  color: var(--text-primary);
  font-size: 1rem;
  line-height: 1.5;
  resize: none;
  outline: none;
  font-family: inherit;
  min-height: 24px;
  max-height: 200px;
}

.message-input::placeholder {
  color: var(--text-tertiary);
}

.input-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.send-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--user-msg-bg);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.send-button:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: var(--shadow-md);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.input-footer {
  text-align: center;
  margin-top: 0.75rem;
}

.tip {
  font-size: 0.75rem;
  color: var(--text-tertiary);
}

/* ============ 响应式设计 ============ */
@media (max-width: 1024px) {
  .chat-header {
    padding: 0 1.5rem;
  }

  .chat-messages {
    padding: 1.5rem;
  }

  .chat-input-area {
    padding: 1rem 1.5rem;
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 100;
  }

  .sidebar.collapsed {
    left: calc(var(--sidebar-width) * -1);
  }

  .chat-header {
    padding: 0 1rem;
  }

  .chat-header h1 {
    font-size: 1.125rem;
  }

  .chat-messages {
    padding: 1rem;
  }

  .message-container {
    max-width: 100%;
  }

  .chat-input-area {
    padding: 1rem;
  }

  .suggestions {
    grid-template-columns: 1fr;
  }

  .empty-state h2 {
    font-size: 1.5rem;
  }

  .empty-icon {
    width: 80px;
    height: 80px;
  }
}
</style>
