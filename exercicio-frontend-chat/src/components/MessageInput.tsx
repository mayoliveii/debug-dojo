import { useState, type FormEvent } from 'react'

interface MessageInputProps {
  onSend: (text: string) => void
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSend(text)
    setText('')
  }
  const disabled = text.trim() === ''
  return (
    <form className="composer" onSubmit={handleSubmit}>
      <input
        className="composer__input"
        type="text"
        placeholder="Escreva uma mensagem..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="composer__send" type="submit" disabled={disabled}>
        Enviar
      </button>
    </form>
  )
}
