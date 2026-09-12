export interface Review {
  id: string
  author: string
  rating: number
  comment: string
  createdAt: number
  /** Marca uma avaliação ainda não confirmada pelo servidor. */
  pending?: boolean
}

export interface NewReviewInput {
  author: string
  rating: number
  comment: string
}

export interface ReviewSummary {
  average: number
  total: number
}

export type LoadStatus = 'idle' | 'loading' | 'ready' | 'error'
export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'
