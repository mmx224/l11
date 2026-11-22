import './StatusBar.css'

export default function StatusBar({ status }) {
  return (
    <p className="status" role="status" aria-live="polite">
      {status}
    </p>
  )
}
