import { useCoupons } from './hooks/useCoupons'
import { CouponSearch } from './components/CouponSearch'
import { CouponForm } from './components/CouponForm'
import { CouponList } from './components/CouponList'

export function App() {
  const {
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
  } = useCoupons()

  return (
    <div className="app">
      <header className="app__header">
        <h1>Painel de Cupons</h1>
        <p>Gerencie os cupons de desconto da loja.</p>
      </header>

      <main className="app__content">
        <section className="app__col app__col--list">
          <CouponSearch
            query={query}
            onQueryChange={setQuery}
            resultCount={coupons.length}
            loading={listStatus === 'loading'}
          />
          <CouponList
            coupons={coupons}
            status={listStatus}
            error={listError}
            onToggle={toggleActive}
            togglingId={togglingId}
          />
        </section>

        <section className="app__col app__col--form">
          <CouponForm
            onSubmit={createCoupon}
            status={createStatus}
            error={createError}
          />
        </section>
      </main>
    </div>
  )
}
