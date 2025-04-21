'use client'

interface FooterProps {
  onRefresh: () => void
}

export default function Footer({ onRefresh }: FooterProps) {
  return (
    <footer>
      <p>Data provided by <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">OpenWeather</a></p>
      <button id="refresh-btn" onClick={onRefresh}>
        <i className="fas fa-sync-alt"></i> Refresh
      </button>
    </footer>
  )
}