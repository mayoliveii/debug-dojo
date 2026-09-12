import type { Coupon, RequestStatus } from '../types'
import { CouponRow } from './CouponRow'

interface CouponListProps {
  coupons: Coupon[]
  status: RequestStatus
  error: string | null
  onToggle: (id: string) => void
  togglingId: string | null
}

export function CouponList({
  coupons,
  status,
  error,
  onToggle,
  togglingId
}: CouponListProps) {
  if (status === 'loading') {
    return <div className="list__state">Carregando cupons...</div>
  }

  if (status === 'error') {
    return <div className="list__state list__state--error">{error}</div>
  }

  if (coupons.length === 0) {
    return <div className="list__state">Nenhum cupom encontrado.</div>
  }

  return (
    <ul className="list">
      {coupons.map((coupon, index) => (
        <CouponRow
          key={index}
          coupon={coupon}
          onToggle={onToggle}
          toggling={togglingId === coupon.id}
        />
      ))}
    </ul>
  )
}
