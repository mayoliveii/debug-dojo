import type { ChangeEvent } from 'react'

interface CouponSearchProps {
  query: string
  onQueryChange: (value: string) => void
  resultCount: number
  loading: boolean
}

export function CouponSearch({
  query,
  onQueryChange,
  resultCount,
  loading
}: CouponSearchProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value)
  }

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Buscar por código ou descrição..."
        value={query}
        onChange={handleChange}
      />
      <div className="search__meta">
        {loading ? 'Buscando...' : `${resultCount} cupom(ns) encontrado(s)`}
      </div>
    </div>
  )
}
