import axios from 'axios'
import type { ChatRequest, ChatResponse } from '../types/chat'

// 配置你的 AI API 端点
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 模拟 AI 响应（如果没有后端）
const mockAiResponse = async (message: string): Promise<ChatResponse> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000))

  // 简单的模拟响应逻辑
  const responses = [
    '这是一个很好的问题！让我来帮你分析一下...',
    '根据你的描述，我建议...',
    '我理解你的需求。这里有几个要点：',
    '很高兴能帮助你！关于这个问题...',
  ]

  const randomResponse = responses[Math.floor(Math.random() * responses.length)]

  return {
    reply: `${randomResponse}\n\n针对"${message}"，我的回答是：这是一个模拟响应。请配置真实的 AI API 来获得智能回复。`,
    timestamp: Date.now()
  }
}

/**
 * 发送聊天消息到 AI
 */
export const sendChatMessage = async (data: ChatRequest): Promise<ChatResponse> => {
  try {
    // 尝试调用真实 API
    const response = await apiClient.post<ChatResponse>('/chat', data)
    return response.data
  } catch (error) {
    console.warn('API 调用失败，使用模拟响应:', error)
    // 如果 API 调用失败，使用模拟响应
    return mockAiResponse(data.message)
  }
}

/**
 * 流式响应版本（可选）
 */
export const sendChatMessageStream = async (
  data: ChatRequest,
  onChunk: (chunk: string) => void
): Promise<void> => {
  try {
    const response = await apiClient.post('/chat/stream', data, {
      responseType: 'stream'
    })

    // 处理流式响应
    const reader = response.data.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      onChunk(chunk)
    }
  } catch (error) {
    console.error('流式 API 调用失败:', error)
    // 降级到模拟响应
    const mockResponse = await mockAiResponse(data.message)
    onChunk(mockResponse.reply)
  }
}
