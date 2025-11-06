export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
}

export interface ChatRequest {
  message: string
  history?: Message[]
}

export interface ChatResponse {
  reply: string
  timestamp: number
}
