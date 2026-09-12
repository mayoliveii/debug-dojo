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
        {summary.total > 0 && (
          <div className="summary__count">
            {summary.total} avaliações
          </div>
        )}
        {summary.total === 0 && (
          <div className="summary__count">
            Nenhuma avaliação
          </div>
        )
        }
        {summary.total === 1 && (
          <div className="summary__count">
            1 avaliação
          </div>
        )
        }
      </div>
    </div>
  )
}
