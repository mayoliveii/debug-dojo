// create a toast component that shows an error message when submitError is not null

interface ErrorToastProps {
  message: string | null
}

export function ErrorToast({ message }: ErrorToastProps) {
  if (!message) return null


  return (
    <div className="error-toast">
      <p>{message}</p>
    </div>
  )
}