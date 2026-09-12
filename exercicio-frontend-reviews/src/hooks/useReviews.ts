import { useCallback, useEffect, useState } from 'react'
import { reviewService } from '../api/reviewService'
import type {
  LoadStatus,
  NewReviewInput,
  Review,
  ReviewSummary,
  SubmitStatus
} from '../types'

interface UseReviewsResult {
  reviews: Review[]
  summary: ReviewSummary
  loadStatus: LoadStatus
  loadError: string | null

  submitStatus: SubmitStatus
  submitError: string | null
  addReview: (input: NewReviewInput) => void
}

function computeSummary(list: Review[]): ReviewSummary {
  if (list.length === 0) {
    return { average: 0, total: 0 }
  }
  const sum = list.reduce((acc, r) => acc + r.rating, 0)
  return { average: sum / list.length, total: list.length }
}

export function useReviews(): UseReviewsResult {
  const [reviews, setReviews] = useState<Review[]>([])
  const [summary, setSummary] = useState<ReviewSummary>({ average: 0, total: 0 })
  const [loadStatus, setLoadStatus] = useState<LoadStatus>('idle')
  const [loadError, setLoadError] = useState<string | null>(null)

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    setLoadStatus('loading')
    reviewService
      .loadReviews()
      .then((data) => {
        setReviews(data)
        setSummary(computeSummary(data))
        setLoadStatus('ready')
      })
      .catch((err: unknown) => {
        setLoadError(
          err instanceof Error ? err.message : 'Erro ao carregar avaliacoes.'
        )
        setLoadStatus('error')
      })
  }, [])

  useEffect(() => {
    setSummary(computeSummary(reviews))
  }, [reviews])

  const addReview = useCallback((input: NewReviewInput) => {
    const optimistic: Review = {
      id: `local_${Date.now()}`,
      author: input.author,
      rating: input.rating,
      comment: input.comment,
      createdAt: Date.now(),
      pending: true
    }

    setSubmitStatus('submitting')
    setSubmitError(null)
    setReviews((prev) => [optimistic, ...prev])

    reviewService
      .addReview(input)
      .then((saved) => {
        setReviews((prev) =>
          prev.map((r) => (r.id === optimistic.id ? saved : r))
        )
        setSubmitStatus('success')
      })
      .catch((err: unknown) => {
        setReviews((prev) => prev.filter((r) => r.id !== optimistic.id))
        console.log('Erro ao publicar avaliacao', err)
        setSubmitError(
          err instanceof Error ? err.message : 'Erro ao publicar avaliacao.'
        )
        setSubmitStatus('error')
      })
  }, [])

  return {
    reviews,
    summary,
    loadStatus,
    loadError,
    submitStatus,
    submitError,
    addReview
  }
}
