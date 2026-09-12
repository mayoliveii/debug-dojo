import type { HistoryStatus, Message } from '../types'
import { MessageBubble } from './MessageBubble'

interface MessageListProps {
  messages: Message[]
  status: HistoryStatus
  error: string | null
  retryMessage: (text: string) => void
}

export function MessageList({ messages, status, error, retryMessage }: MessageListProps) {
  if (status === 'loading') {
    return <div className="list__state">Carregando conversa...</div>
  }

  if (status === 'error') {
    return <div className="list__state list__state--error">{error}</div>
  }

  return (
    <div className="list">
      {messages.map((message, index) => (
        <MessageBubble key={index} message={message} retryMessage={retryMessage} />
      ))}
    </div>
  )
}
