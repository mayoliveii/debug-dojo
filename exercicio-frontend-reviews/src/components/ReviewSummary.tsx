import type { ReviewSummary as Summary } from '../types'
import { Stars } from './Stars'

interface ReviewSummaryProps {
  summary: Summary
}

export function ReviewSummary({ summary }: ReviewSummaryProps) {
  return (
    <div className="summary">
      <div className="summary__score">{summary.average.toFixed(1)}</div>
      <div className="summary__details">
        <Stars value={Math.round(summary.average)} />
        <div className="summary__count">
          {summary.total} avaliacao(oes)
        </div>
      </div>
    </div>
  )
}
