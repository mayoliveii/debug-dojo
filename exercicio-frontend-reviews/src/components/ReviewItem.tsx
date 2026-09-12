import type { Review } from '../types'
import { Stars } from './Stars'

interface ReviewItemProps {
  review: Review
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short'
  })
}

export function ReviewItem({ review }: ReviewItemProps) {
  return (
    <li className={`review ${review.pending ? 'review--pending' : ''}`}>
      <div className="review__head">
        <span className="review__author">{review.author}</span>
        <Stars value={review.rating} />
      </div>
      <p className="review__comment">{review.comment}</p>
      <div className="review__meta">
        {review.pending ? 'publicando...' : formatDate(review.createdAt)}
      </div>
    </li>
  )
}
