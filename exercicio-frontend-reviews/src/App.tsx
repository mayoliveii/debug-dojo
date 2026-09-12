import { useReviews } from './hooks/useReviews'
import { ReviewSummary } from './components/ReviewSummary'
import { ReviewForm } from './components/ReviewForm'
import { ReviewList } from './components/ReviewList'
import { ErrorToast } from './components/ErrorToast'

export function App() {
  const {
    reviews,
    summary,
    loadStatus,
    loadError,
    addReview,
    submitError,
    submitStatus
  } = useReviews()

  return (
    <div className="app">
      <header className="app__header">
        <div className="product">
          <div className="product__thumb">🎧</div>
          <div>
            <h1 className="product__name">Fone Aurora Pro</h1>
            <p className="product__tagline">Cancelamento de ruido e 40h de bateria</p>
          </div>
        </div>
        <ReviewSummary summary={summary} />
      </header>

      <main className="app__content">
        <section className="app__col app__col--list">
          <h2 className="section__title">O que estão dizendo</h2>
          <ReviewList
            reviews={reviews}
            status={loadStatus}
            error={loadError}
          />
        </section>

        <section className="app__col app__col--form">
          <ReviewForm onSubmit={addReview} />
        </section>
      </main>
      {submitStatus === 'error' && (
        <ErrorToast message={submitError} />
      )}
    </div>
  )
}

