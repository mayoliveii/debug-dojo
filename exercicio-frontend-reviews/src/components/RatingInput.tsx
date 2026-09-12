import { useState } from 'react'

interface RatingInputProps {
  value: number
  onChange: (value: number) => void
}

/** Seletor de nota de 1 a 5 estrelas. */
export function RatingInput({ value, onChange }: RatingInputProps) {
  const [hover, setHover] = useState(0)

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= (hover || value)
        return (
          <span
            key={n}
            className={`rating__star ${active ? 'rating__star--on' : ''}`}
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        )
      })}
    </div>
  )
}
