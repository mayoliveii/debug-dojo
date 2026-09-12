import type { Coupon, NewCouponInput } from '../types'

/**
 * API simulada em memória.
 *
 * Simula latência de rede variável e falhas ocasionais, como uma API real.
 * NÃO altere os tempos/erros deste arquivo: ele representa o backend e o
 * comportamento da rede que o front precisa suportar.
 */

let coupons: Coupon[] = [
  {
    id: 'c_1001',
    code: 'BEMVINDO10',
    description: 'Boas-vindas: 10% off na primeira compra',
    discountType: 'percent',
    amount: 10,
    active: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30
  },
  {
    id: 'c_1002',
    code: 'FRETEGRATIS',
    description: 'R$ 25 de desconto em frete',
    discountType: 'fixed',
    amount: 2500,
    active: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12
  },
  {
    id: 'c_1003',
    code: 'BLACK50',
    description: 'Black Friday: 50% off',
    discountType: 'percent',
    amount: 50,
    active: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5
  },
  {
    id: 'c_1004',
    code: 'VOLTA15',
    description: 'Volta às aulas: 15% off',
    discountType: 'percent',
    amount: 15,
    active: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2
  },
  {
    id: 'c_1005',
    code: 'APP5',
    description: 'R$ 5 off exclusivo do app',
    discountType: 'fixed',
    amount: 500,
    active: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1
  }
]

function delay<T>(value: T, ms: number): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

/** Latência variável entre ~150ms e ~1200ms. */
function randomLatency(): number {
  return 150 + Math.floor(Math.random() * 1050)
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

export const couponService = {
  async list(query: string): Promise<Coupon[]> {
    const q = query.trim().toLowerCase()
    const result = coupons
      .filter((c) => {
        if (!q) return true
        return (
          c.code.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
        )
      })
      .sort((a, b) => b.createdAt - a.createdAt)
    return delay(clone(result), randomLatency())
  },

  async create(input: NewCouponInput): Promise<Coupon> {
    await delay(null, randomLatency())

    const exists = coupons.some(
      (c) => c.code.toLowerCase() === input.code.trim().toLowerCase()
    )
    if (exists) {
      throw new Error(`Já existe um cupom com o código "${input.code}".`)
    }

    const created: Coupon = {
      id: 'c_' + Math.floor(1000 + Math.random() * 9000),
      code: input.code,
      description: input.description,
      discountType: input.discountType,
      amount: input.amount,
      active: true,
      createdAt: Date.now()
    }
    coupons = [created, ...coupons]
    return clone(created)
  },

  async toggleActive(id: string): Promise<Coupon> {
    await delay(null, randomLatency())

    // A troca de estado no "servidor" falha de vez em quando.
    if (Math.random() < 0.35) {
      throw new Error('Falha ao atualizar o status do cupom. Tente novamente.')
    }

    const target = coupons.find((c) => c.id === id)
    if (!target) {
      throw new Error('Cupom não encontrado.')
    }
    target.active = !target.active
    return clone(target)
  }
}
