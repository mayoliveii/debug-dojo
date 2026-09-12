interface StarsProps {
  value: number
}

/** Exibe uma nota de 1 a 5 em estrelas (somente leitura). */
export function Stars({ value }: StarsProps) {
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`stars__star ${n <= value ? 'stars__star--on' : ''}`}
        >
          ★
        </span>
      ))}
    </span>
  )
}
