import { useState, type FormEvent } from 'react'
import type { DiscountType, NewCouponInput, RequestStatus } from '../types'

interface CouponFormProps {
  onSubmit: (input: NewCouponInput) => void
  status: RequestStatus
  error: string | null
}

export function CouponForm({ onSubmit, status, error }: CouponFormProps) {
  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')
  const [discountType, setDiscountType] = useState<DiscountType>('percent')
  const [amount, setAmount] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const parsedAmount = Number(amount)

    onSubmit({
      code,
      description,
      discountType,
      amount: parsedAmount
    })

    setCode('')
    setDescription('')
    setAmount('')
    setDiscountType('percent')
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">Novo cupom</h2>

      <div className="form__row">
        <label htmlFor="code">Código</label>
        <input
          id="code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Ex.: PROMO20"
        />
      </div>

      <div className="form__row">
        <label htmlFor="description">Descrição</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex.: 20% off em toda a loja"
        />
      </div>

      <div className="form__row">
        <label htmlFor="discountType">Tipo</label>
        <select
          id="discountType"
          value={discountType}
          onChange={(e) => setDiscountType(e.target.value as DiscountType)}
        >
          <option value="percent">Percentual (%)</option>
          <option value="fixed">Valor fixo (centavos)</option>
        </select>
      </div>

      <div className="form__row">
        <label htmlFor="amount">
          {discountType === 'percent' ? 'Percentual (0-100)' : 'Valor (centavos)'}
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={discountType === 'percent' ? '20' : '2500'}
        />
      </div>

      {status === 'error' && error && (
        <p className="form__error">{error}</p>
      )}

      {status === 'success' && (
        <p className="form__success">Cupom criado com sucesso!</p>
      )}

      <button className="form__submit" type="submit">
        Criar cupom
      </button>
    </form>
  )
}
