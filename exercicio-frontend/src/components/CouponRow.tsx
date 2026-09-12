import type { Coupon } from '../types'

interface CouponRowProps {
  coupon: Coupon
  onToggle: (id: string) => void
  toggling: boolean
}

function formatDiscount(coupon: Coupon): string {
  if (coupon.discountType === 'percent') {
    return `${coupon.amount}%`
  }
  return `R$ ${(coupon.amount / 100).toFixed(2)}`
}

export function CouponRow({ coupon, onToggle, toggling }: CouponRowProps) {
  return (
    <li className={`row ${coupon.active ? 'row--active' : 'row--inactive'}`}>
      <div className="row__main">
        <span className="row__code">{coupon.code}</span>
        <span className="row__desc">{coupon.description}</span>
      </div>

      <div className="row__side">
        <span className="row__discount">{formatDiscount(coupon)}</span>
        <span className="row__status">
          {coupon.active ? 'Ativo' : 'Inativo'}
        </span>
        <button
          className="row__toggle"
          onClick={() => onToggle(coupon.id)}
          disabled={toggling}
        >
          {coupon.active ? 'Desativar' : 'Ativar'}
        </button>
      </div>
    </li>
  )
}
