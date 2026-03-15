export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-orbs">
        <span />
        <span />
        <span />
      </div>
      <p className="loading-text">Fetching weather data</p>
    </div>
  )
}