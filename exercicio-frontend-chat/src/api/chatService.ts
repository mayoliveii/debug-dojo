import type { Message } from '../types'

/**
 * API simulada de chat (backend).
 *
 * Simula latência de rede e falhas ocasionais no envio, como um serviço real.
 * NÃO altere latências/erros: este arquivo representa o servidor e a rede que a
 * aplicação precisa suportar.
 */

const history: Message[] = [
  {
    id: 'm_1',
    author: 'support',
    text: 'Olá! Aqui é o suporte da Aurora. Como posso ajudar?',
    createdAt: Date.now() - 1000 * 60 * 6
  },
  {
    id: 'm_2',
    author: 'me',
    text: 'Oi! Minha última fatura veio com um valor diferente do combinado.',
    createdAt: Date.now() - 1000 * 60 * 5,
    status: 'sent'
  },
  {
    id: 'm_3',
    author: 'support',
    text: 'Entendi. Consegue me confirmar o e-mail cadastrado na conta?',
    createdAt: Date.now() - 1000 * 60 * 4
  }
]

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function randomLatency(): number {
  return 400 + Math.floor(Math.random() * 900)
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

let serverSeq = 100

export const chatService = {
  async loadHistory(): Promise<Message[]> {
    await delay(randomLatency())
    return clone(history)
  },

  /**
   * Envia uma mensagem. Retorna a mensagem "confirmada" pelo servidor
   * (com id definitivo). Falha de vez em quando.
   */
  async send(text: string): Promise<Message> {
    await delay(randomLatency())

    if (Math.random() < 0.25) {
      throw new Error('Não foi possível enviar a mensagem. Verifique sua conexão.')
    }

    serverSeq += 1
    const confirmed: Message = {
      id: `m_srv_${serverSeq}`,
      author: 'me',
      text,
      createdAt: Date.now(),
      status: 'sent'
    }
    return clone(confirmed)
  }
}
