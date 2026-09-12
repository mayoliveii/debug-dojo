import { useCallback, useEffect, useState } from 'react'
import { couponService } from '../api/couponService'
import type { Coupon, NewCouponInput, RequestStatus } from '../types'

interface UseCouponsResult {
  coupons: Coupon[]
  listStatus: RequestStatus
  listError: string | null

  createStatus: RequestStatus
  createError: string | null
  createCoupon: (input: NewCouponInput) => Promise<void>

  toggleActive: (id: string) => Promise<void>
  togglingId: string | null

  query: string
  setQuery: (value: string) => void
}

const DEBOUNCE_MS = 300

export function useCoupons(): UseCouponsResult {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [listStatus, setListStatus] = useState<RequestStatus>('idle')
  const [listError, setListError] = useState<string | null>(null)

  const [createStatus, setCreateStatus] = useState<RequestStatus>('idle')
  const [createError, setCreateError] = useState<string | null>(null)

  const [togglingId, setTogglingId] = useState<string | null>(null)

  const [query, setQuery] = useState('')

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    timer = setTimeout(() => {
      setListStatus('loading')
      setListError(null)

      couponService
        .list(query)
        .then((result) => {
          setCoupons(result)
          setListStatus('success')
        })
        .catch((err: unknown) => {
          setListError(err instanceof Error ? err.message : 'Erro ao carregar cupons.')
          setListStatus('error')
        })
    }, DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [query])

  const createCoupon = useCallback(
    async (input: NewCouponInput) => {
      if (createStatus === 'loading') return

      setCreateStatus('loading')
      setCreateError(null)

      try {
        const created = await couponService.create(input)
        setCoupons((prev) => [created, ...prev])
        setCreateStatus('success')
      } catch (err: unknown) {
        setCreateError(err instanceof Error ? err.message : 'Erro ao criar cupom.')
        setCreateStatus('error')
      }
    },
    [createStatus]
  )

  const toggleActive = useCallback(async (id: string) => {
    setTogglingId(id)

    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    )

    try {
      await couponService.toggleActive(id)
    } catch {
      // mantém a UI responsiva
    } finally {
      setTogglingId(null)
    }
  }, [])

  return {
    coupons,
    listStatus,
    listError,
    createStatus,
    createError,
    createCoupon,
    toggleActive,
    togglingId,
    query,
    setQuery
  }
}
