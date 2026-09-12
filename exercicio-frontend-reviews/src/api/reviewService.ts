import type { NewReviewInput, Review } from '../types'

/**
 * API simulada de avaliacoes (backend).
 *
 * Simula latencia de rede variavel e falhas ocasionais no envio, como um
 * servico real. NAO altere latencias/erros: este arquivo representa o servidor
 * e a rede que a aplicacao precisa suportar.
 */

const reviews: Review[] = [
  {
    id: 'r_1',
    author: 'Camila R.',
    rating: 5,
    comment: 'Superou minhas expectativas. Chegou antes do prazo e a qualidade e otima.',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9
  },
  {
    id: 'r_2',
    author: 'Bruno T.',
    rating: 2,
    comment: 'O produto e bom, mas veio com um arranhao na lateral. Suporte demorou pra responder.',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6
  },
  {
    id: 'r_3',
    author: 'Ana L.',
    rating: 4,
    comment: 'Custo-beneficio muito bom. Recomendo, mas a bateria poderia durar mais.',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3
  },
  {
    id: 'r_4',
    author: 'Diego M.',
    rating: 5,
    comment: 'Uso todos os dias, nao troco por nada. Melhor compra do ano.',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1
  }
]

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function randomLatency(): number {
  return 500 + Math.floor(Math.random() * 900)
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

let serverSeq = 100

export const reviewService = {
  async loadReviews(): Promise<Review[]> {
    await delay(randomLatency())
    return clone(reviews).sort((a, b) => b.createdAt - a.createdAt)
  },

  async addReview(input: NewReviewInput): Promise<Review> {
    await delay(randomLatency())

    if (Math.random() < 0.25) {
      throw new Error('Nao foi possivel publicar sua avaliacao. Tente novamente.')
    }

    serverSeq += 1
    const saved: Review = {
      id: `r_srv_${serverSeq}`,
      author: input.author,
      rating: input.rating,
      comment: input.comment,
      createdAt: Date.now()
    }
    reviews.push(saved)
    return clone(saved)
  }
}
