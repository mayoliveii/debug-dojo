import type { Message } from '../types'

interface MessageBubbleProps {
  message: Message,
  retryMessage: (text: string) => void
}

function formatTime(ts: number): string {
  const d = new Date(ts)
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

export function MessageBubble({ message, retryMessage }: MessageBubbleProps) {
  const mine = message.author === 'me'

  return (
    <div className={`bubble ${mine ? 'bubble--mine' : 'bubble--support'}`}>
      <div className="bubble__text">{message.text}</div>
      <div className="bubble__meta">
        <span className="bubble__time">{formatTime(message.createdAt)}</span>
        {mine && message.status === 'sending' && (
          <span className="bubble__status">enviando...</span>
        )}
        {mine && message.status === 'failed' && (
          <span className="bubble__status bubble__status--failed">falhou</span>
        )}
        {mine && message.status === 'failed' && (
          <span onClick={() => retryMessage(message.text)} className="bubble__status bubble__status--retry">reenviar</span>
        )}
      </div>
    </div>
  )
}
