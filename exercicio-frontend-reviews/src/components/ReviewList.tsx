import type { LoadStatus, Review } from '../types'
import { ReviewItem } from './ReviewItem'

interface ReviewListProps {
  reviews: Review[]
  status: LoadStatus
  error: string | null
}

export function ReviewList({ reviews, status, error }: ReviewListProps) {
  if (status === 'loading') {
    return <div className="list__state">Carregando avaliacoes...</div>
  }

  if (status === 'error') {
    return <div className="list__state list__state--error">{error}</div>
  }

  if (reviews.length === 0) {
    return <div className="list__state">Ainda nao ha avaliacoes.</div>
  }

  return (
    <ul className="list">
      {reviews.map((review, index) => (
        <ReviewItem key={index} review={review} />
      ))}
    </ul>
  )
}
