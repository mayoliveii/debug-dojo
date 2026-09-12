import { useChat } from './hooks/useChat'
import { MessageList } from './components/MessageList'
import { MessageInput } from './components/MessageInput'
import React from 'react'

function scrollToBottom() {
  const list = document.querySelector('.list')
  if (list) {
    list.scrollTop = list.scrollHeight
  }
}

export function App(): JSX.Element {
  const { messages, historyStatus, historyError, sendMessage, retryMessage } = useChat()

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="app">
      <div className="chat">
        <header className="chat__header">
          <div className="chat__avatar">A</div>
          <div>
            <div className="chat__title">Suporte Aurora</div>
            <div className="chat__subtitle">Normalmente responde em minutos</div>
          </div>
        </header>

        <MessageList
          messages={messages}
          status={historyStatus}
          error={historyError}
          retryMessage={retryMessage}
        />

        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  )
}
