export type Author = 'me' | 'support'

export type MessageStatus = 'sending' | 'sent' | 'failed'

export interface Message {
  id: string
  author: Author
  text: string
  createdAt: number
  /** Só se aplica a mensagens enviadas por mim. */
  status?: MessageStatus
}

export type HistoryStatus = 'idle' | 'loading' | 'ready' | 'error'
