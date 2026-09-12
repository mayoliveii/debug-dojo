import { useState, type FormEvent } from 'react'
import type { NewReviewInput } from '../types'
import { RatingInput } from './RatingInput'

interface ReviewFormProps {
  onSubmit: (input: NewReviewInput) => void
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    onSubmit({ author, rating, comment })

    setAuthor('')
    setRating(0)
    setComment('')
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">Deixe sua avaliação</h2>

      <div className="form__row">
        <label htmlFor="author">Seu nome</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Como devemos te chamar?"
        />
      </div>

      <div className="form__row">
        <span className="form__label">Nota</span>
        <RatingInput value={rating} onChange={setRating} />
      </div>

      <div className="form__row">
        <label htmlFor="comment">Comentario</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Conte como foi sua experiência com o produto"
          rows={4}
        />
      </div>

      <
        button className="form__submit" type="submit"
        disabled={author === '' || rating === 0 || comment === ''}
      >
        Publicar avaliação
      </button>

    </form>
  )
}
