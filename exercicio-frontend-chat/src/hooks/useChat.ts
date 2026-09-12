import { useCallback, useEffect, useState } from 'react'
import { chatService } from '../api/chatService'
import type { HistoryStatus, Message } from '../types'

interface UseChatResult {
  messages: Message[]
  historyStatus: HistoryStatus
  historyError: string | null

  sendMessage: (text: string) => void
  retryMessage: (text: string) => void
}

export function useChat(): UseChatResult {
  const [messages, setMessages] = useState<Message[]>([])
  const [historyStatus, setHistoryStatus] = useState<HistoryStatus>('idle')
  const [historyError, setHistoryError] = useState<string | null>(null)

  useEffect(() => {
    setHistoryStatus('loading')
    chatService
      .loadHistory()
      .then((history) => {
        setMessages(history)
        setHistoryStatus('ready')
      })
      .catch((err: unknown) => {
        setHistoryError(
          err instanceof Error ? err.message : 'Erro ao carregar o histórico.'
        )
        setHistoryStatus('error')
      })
  }, [])

  const sendMessage = useCallback((text: string) => {
    const optimistic: Message = {
      id: `local_${Date.now()}`,
      author: 'me',
      text,
      createdAt: Date.now(),
      status: 'sending'
    }

    setMessages([...messages, optimistic])

    chatService
      .send(text)
      .then((confirmed) => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === optimistic.id ? confirmed : msg
          )
        )
      })
      .catch(() => {
        setMessages([
          ...messages,
          { ...optimistic, status: 'failed' }
        ])
      })
  }, [messages])

  const retryMessage = useCallback((text: string) => {
    sendMessage(text)
  }, [sendMessage])

  return {
    messages,
    historyStatus,
    historyError,
    sendMessage,
    retryMessage
  }
}
